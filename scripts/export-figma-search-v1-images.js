/**
 * Export images from Figma for Search V1 (frame 2351:19, sections 2351:32, 2351:36).
 * Saves to public/images/search-v1/
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=your_token node scripts/export-figma-search-v1-images.js
 *
 * Get token: Figma → Settings → Personal access tokens
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const FILE_KEY = 're5Fauw1m9dJxYlIdR8Btn';
const TOKEN = process.env.FIGMA_ACCESS_TOKEN;
if (!TOKEN) {
  console.error('FIGMA_ACCESS_TOKEN is required. Usage: FIGMA_ACCESS_TOKEN=your_token node scripts/export-figma-search-v1-images.js');
  process.exit(1);
}

const DEFAULT_OUT_SUBDIR = 'search-v1';

// Node IDs for Search V1 (till selections 2351:32, 2351:36)
const NODES = [
  { id: '2351-39', idKey: '2351:39', file: 'previous-search-image.png' },
];

function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const opts = { headers: { Accept: 'application/json', ...headers } };
    lib.get(url, opts, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function getJson(url, headers = {}) {
  return get(url, headers).then((buf) => JSON.parse(buf.toString('utf8')));
}

function download(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, (res) => {
      if (res.statusCode === 302 && res.headers.location) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  const ids = NODES.map((n) => n.id).join(',');
  const figmaUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${ids}&format=png&scale=2`;

  console.log('Requesting image URLs from Figma...');
  const res = await getJson(figmaUrl, { 'X-Figma-Token': TOKEN });

  if (res.err) {
    console.error('Figma API error:', res.err);
    process.exit(1);
  }

  const images = res.images || {};
  const keys = Object.keys(images);
  if (keys.length === 0) {
    console.error('No image URLs returned. Response:', JSON.stringify(res, null, 2));
    process.exit(1);
  }

  for (const node of NODES) {
    const { id, idKey, file, outSubdir } = node;
    const url = images[idKey] || images[id];
    if (!url) {
      console.warn('No URL for node', id);
      continue;
    }
    const outDir = path.join(__dirname, '..', 'public', 'images', outSubdir || DEFAULT_OUT_SUBDIR);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    const outPath = path.join(outDir, file);
    console.log('Downloading', file, '...');
    const buf = await download(url);
    fs.writeFileSync(outPath, buf);
    console.log('Saved', outPath);
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
