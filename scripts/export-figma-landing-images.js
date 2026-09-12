/**
 * Export landing page images from Figma (file "yaprr", frame 172:142 "Web desktop" on page 161:2).
 * Saves to src/images/landing/ so Introduction.jsx can import them.
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=your_token node scripts/export-figma-landing-images.js
 *
 * The about photo renders ~1144 CSS px wide, so the default SCALE=2 keeps it retina-safe.
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
  console.error('FIGMA_ACCESS_TOKEN is required. Usage: FIGMA_ACCESS_TOKEN=your_token node scripts/export-figma-landing-images.js');
  process.exit(1);
}

const SCALE = process.env.SCALE || '2';

const NODES = [
  // About me: landscape photo (1144x670) that replaces the portrait rectangle7.png
  { id: '172-269', idKey: '172:269', file: 'about-photo.png' },
  // Case card images
  { id: '172-168', idKey: '172:168', file: 'case-aspora.png' },
  { id: '172-184', idKey: '172:184', file: 'case-search.png' },
  { id: '172-194', idKey: '172:194', file: 'case-checkout.png' },
  { id: '172-203', idKey: '172:203', file: 'case-magicpay.png' },
  { id: '172-220', idKey: '172:220', file: 'case-merchants.png' },
  // Recognitions: UXINDIA two-photo collage
  { id: '172-283', idKey: '172:283', file: 'uxindia-collage.png' },
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
  const figmaUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${ids}&format=png&scale=${SCALE}`;

  console.log(`Requesting image URLs from Figma (scale ${SCALE})...`);
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

  const outDir = path.join(__dirname, '..', 'src', 'images', 'landing');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const node of NODES) {
    const { id, idKey, file } = node;
    const url = images[idKey] || images[id];
    if (!url) {
      console.warn('No URL for node', id);
      continue;
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
