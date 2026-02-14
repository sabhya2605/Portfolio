#!/usr/bin/env node
/**
 * Exports images from Figma for delivery-checkout-v1.
 * Figma: https://www.figma.com/design/re5Fauw1m9dJxYlIdR8Btn/Saurabh-Sabhya-Shared-file
 *
 * Usage: FIGMA_ACCESS_TOKEN=your_token node scripts/export-figma-opportunity-images.js
 *
 * Node ID mapping:
 * - 2362:17162 = Discount highlight and product upsell (Sumo Chinese)
 * - 2362:17170 = Progressive disclosure of payment details (EatFit)
 * - 2362:17154 = Cognition at checkout decision making (MOJO Pizza)
 * - 2362:17175 = Things that have been working for us (two phones with annotations)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const FIGMA_FILE_KEY = 're5Fauw1m9dJxYlIdR8Btn';
const NODES = {
  '2362:17162': 'mockup-discount.png',
  '2362:17170': 'mockup-progressive.png',
  '2362:17154': 'mockup-cognition.png',
  '2362:17175': 'things-working-for-us.png',
};
const OUT_DIR = path.join(__dirname, '..', 'src', 'images', 'delivery-checkout-v1');

async function fetchJson(url, token) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'X-Figma-Token': token } }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) resolve(JSON.parse(data));
          else reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function main() {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    console.error('Set FIGMA_ACCESS_TOKEN and run again.');
    process.exit(1);
  }

  const nodeIds = Object.keys(NODES).join(',');
  const apiUrl = `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?ids=${encodeURIComponent(nodeIds)}&format=png&scale=2`;

  console.log('Fetching image URLs from Figma...');
  const imgRes = await fetchJson(apiUrl, token);

  const { images } = imgRes;
  if (!images) {
    console.error('No images in response:', imgRes);
    process.exit(1);
  }

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const [nodeId, filename] of Object.entries(NODES)) {
    const url = images[nodeId];
    if (!url) {
      console.warn(`No URL for node ${nodeId}, skipping`);
      continue;
    }
    console.log(`Downloading ${nodeId} -> ${filename}...`);
    const buf = await download(url);
    fs.writeFileSync(path.join(OUT_DIR, filename), buf);
  }

  console.log('Done. Images saved to src/images/delivery-checkout-v1/');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
