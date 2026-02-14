/**
 * Export Opportunity mockup images from Figma (Selection 4, node 2362:17144)
 * and save to public/images/delivery-checkout-v1/
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=your_token node scripts/export-figma-delivery-checkout-v1-images.js
 *
 * Get token: Figma → Settings → Personal access tokens
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const FILE_KEY = 're5Fauw1m9dJxYlIdR8Btn';
const TOKEN = process.env.FIGMA_ACCESS_TOKEN || '[REDACTED]';

// Node IDs for the three phone mockups (Figma API accepts hyphen in request; response keys use colon)
// 2362:17170 = Discount highlight / EatFit → mockup-discount.png
// 2362:17154 = Progressive disclosure / MOJO Pizza → mockup-progressive.png
// 2362:17162 = Cognition / Sumo Chinese → mockup-cognition.png
const NODES = [
  { id: '2362-17170', idKey: '2362:17170', file: 'mockup-discount.png' },
  { id: '2362-17154', idKey: '2362:17154', file: 'mockup-progressive.png' },
  { id: '2362-17162', idKey: '2362:17162', file: 'mockup-cognition.png' },
  { id: '2362-17175', idKey: '2362:17175', file: 'things-working-for-us.png' },
  { id: '2362-17205', idKey: '2362:17205', file: 'competitor-analysis.png' },
  { id: '2362-17233', idKey: '2362:17233', file: 'one-clicks.png' },
];

const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'delivery-checkout-v1');

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
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

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

  for (const { id, idKey, file } of NODES) {
    const url = images[idKey] || images[id];
    if (!url) {
      console.warn('No URL for node', id);
      continue;
    }
    const outPath = path.join(OUT_DIR, file);
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
