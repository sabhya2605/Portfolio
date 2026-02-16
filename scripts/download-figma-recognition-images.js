/**
 * Download recognition section images from Figma
 * Run: npm run download-figma-images
 * Requires: FIGMA_ACCESS_TOKEN in .env or: FIGMA_ACCESS_TOKEN=xxx npm run download-figma-images
 * Get token: Figma > Settings > Account > Personal access tokens
 */

try { require('dotenv').config(); } catch (_) {}

const fs = require('fs');
const path = require('path');
const https = require('https');

const FIGMA_FILE_KEY = 're5Fauw1m9dJxYlIdR8Btn';
const NODES = {
  uxindia: '2498:1470',   // Volunteer at UXINDIA2024 - Mask group (image area only: person at backdrop + conference stage)
  // MDI collage - individual image layers from Frame 1296720697
  mdiWhatsapp1: '2498:1485',   // WhatsApp Image 2024-12-11 at 4.53.26 PM (1) 1 - top-left
  mdiWhatsapp2: '2498:1486',   // WhatsApp Image 2024-12-11 at 4.53.26 PM (2) 1 - top-right
  mdiScreenshot1: '2498:1487', // Screenshot 2024-12-17 at 10.49.08 PM 1 - bottom-right
  mdiScreenshot2: '2498:1488', // Screenshot 2024-12-17 at 10.48.05 PM 1 - bottom-left
};

async function fetchFigmaExportUrls() {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    console.error('Error: FIGMA_ACCESS_TOKEN not set. Add it to .env or run:');
    console.error('  FIGMA_ACCESS_TOKEN=your-token node scripts/download-figma-recognition-images.js');
    process.exit(1);
  }

  const ids = Object.values(NODES).join(',');
  const url = `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?ids=${ids}&format=png&scale=2`;

  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: { 'X-Figma-Token': token }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Figma API error ${res.statusCode}: ${data}`));
          return;
        }
        resolve(JSON.parse(data));
      });
    });
    req.on('error', reject);
  });
}

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching Figma export URLs...');
  const data = await fetchFigmaExportUrls();
  if (data.err) throw new Error(data.err);

  const images = data.images || {};
  const outputDir = path.join(__dirname, '..', 'src', 'images');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const mappings = [
    { nodeId: NODES.uxindia, filename: 'uxindia-2024.png' },
    { nodeId: NODES.mdiWhatsapp1, filename: 'mdi-whatsapp1.png' },
    { nodeId: NODES.mdiWhatsapp2, filename: 'mdi-whatsapp2.png' },
    { nodeId: NODES.mdiScreenshot1, filename: 'mdi-screenshot1.png' },
    { nodeId: NODES.mdiScreenshot2, filename: 'mdi-screenshot2.png' },
  ];

  for (const { nodeId, filename } of mappings) {
    const url = images[nodeId];
    if (!url) {
      console.warn(`No URL for node ${nodeId}, skipping`);
      continue;
    }
    const outputPath = path.join(outputDir, filename);
    console.log(`Downloading ${filename}...`);
    const buffer = await downloadImage(url);
    fs.writeFileSync(outputPath, buffer);
    console.log(`  Saved to src/images/${filename}`);
  }
  console.log('Done!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
