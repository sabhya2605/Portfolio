/**
 * Export images from Figma for Aspora – Post-onboarding experience (file "yaprr", frame 136:250).
 * Saves to public/images/aspora-post-onboarding/
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=your_token node scripts/export-figma-aspora-post-onboarding-images.js
 *
 * Get token: Figma → Settings → Personal access tokens
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const FILE_KEY = '859OcVrbW6egRcOKPU1TTp';
const TOKEN = process.env.FIGMA_ACCESS_TOKEN;
if (!TOKEN) {
  console.error('FIGMA_ACCESS_TOKEN is required. Usage: FIGMA_ACCESS_TOKEN=your_token node scripts/export-figma-aspora-post-onboarding-images.js');
  process.exit(1);
}

const OUT_SUBDIR = 'aspora-post-onboarding';

const NODES = [
  { id: '136-298', idKey: '136:298', file: 'existing-flow.png' },
  { id: '136-321', idKey: '136:321', file: 'architecture-v1.png' },
  { id: '136-362', idKey: '136:362', file: 'account-home-1.png' },
  { id: '136-363', idKey: '136:363', file: 'account-home-2.png' },
  { id: '136-389', idKey: '136:389', file: 'new-iteration.png' },
  { id: '136-415', idKey: '136:415', file: 'screen-01.png' },
  { id: '136-424', idKey: '136:424', file: 'screen-02.png' },
  { id: '136-437', idKey: '136:437', file: 'screen-03.png' },
  { id: '136-449', idKey: '136:449', file: 'screen-04.png' },
  { id: '136-462', idKey: '136:462', file: 'screen-05.png' },
  { id: '136-471', idKey: '136:471', file: 'screen-06.png' },
  { id: '136-481', idKey: '136:481', file: 'screen-07.png' },
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
    const { id, idKey, file } = node;
    const url = images[idKey] || images[id];
    if (!url) {
      console.warn('No URL for node', id);
      continue;
    }
    const outDir = path.join(__dirname, '..', 'public', 'images', OUT_SUBDIR);
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
