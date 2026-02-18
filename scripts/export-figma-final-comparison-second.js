/**
 * Export the second image from Final Comparison section (node 2362:18788)
 * This re-exports the selection to ensure we have the latest version from Figma
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=your_token node scripts/export-figma-final-comparison-second.js
 *
 * Get token: Figma → Settings → Personal access tokens
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const FILE_KEY = 're5Fauw1m9dJxYlIdR8Btn';
const NODE_ID = '2362-18788';
const NODE_ID_KEY = '2362:18788';
const OUTPUT_FILE = 'final-comparison-selection.png';
const OUTPUT_SUBDIR = 'delivery-checkout';

const TOKEN = process.env.FIGMA_ACCESS_TOKEN;
if (!TOKEN) {
  console.error('FIGMA_ACCESS_TOKEN is required.');
  console.error('Usage: FIGMA_ACCESS_TOKEN=your_token node scripts/export-figma-final-comparison-second.js');
  console.error('Get token: Figma → Settings → Personal access tokens');
  process.exit(1);
}

function getJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Accept: 'application/json', ...headers } }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        try {
          resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
        } catch (e) {
          reject(e);
        }
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
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
  console.log(`Exporting node ${NODE_ID_KEY} from Figma...`);
  const figmaUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${NODE_ID}&format=png&scale=2`;
  
  const res = await getJson(figmaUrl, { 'X-Figma-Token': TOKEN });

  if (res.err) {
    console.error('Figma API error:', res.err);
    process.exit(1);
  }

  const url = res.images?.[NODE_ID_KEY] || res.images?.[NODE_ID];
  if (!url) {
    console.error('No image URL returned for node', NODE_ID_KEY);
    console.error('Response:', JSON.stringify(res, null, 2));
    process.exit(1);
  }

  const outDir = path.join(__dirname, '..', 'public', 'images', OUTPUT_SUBDIR);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, OUTPUT_FILE);
  
  console.log('Downloading image...');
  const buf = await download(url);
  fs.writeFileSync(outPath, buf);
  console.log(`✓ Saved: ${outPath}`);
  console.log(`✓ File size: ${(buf.length / 1024).toFixed(2)} KB`);
  console.log('Done.');
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
