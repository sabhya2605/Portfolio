/**
 * Export Resume footer social icons from Figma (node 2641:163 = frame with image 1–5).
 * Exports child nodes 2641:164 (image 1), 2641:165 (image 2), 2641:166 (image 3),
 * 2641:167 (image 4), 2641:168 (image 5) to public/images/resume/
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=your_token node scripts/export-figma-resume-social.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const FILE_KEY = 're5Fauw1m9dJxYlIdR8Btn';
const TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const OUT_SUBDIR = 'resume';

const NODES = [
  { id: '2641-164', idKey: '2641:164', file: 'social-image-1.png' },
  { id: '2641-165', idKey: '2641:165', file: 'social-image-2.png' },
  { id: '2641-166', idKey: '2641:166', file: 'social-image-3.png' },
  { id: '2641-167', idKey: '2641:167', file: 'social-image-4.png' },
  { id: '2641-168', idKey: '2641:168', file: 'social-image-5.png' },
];

if (!TOKEN) {
  console.error('FIGMA_ACCESS_TOKEN is required.');
  process.exit(1);
}

function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Accept: 'application/json', ...headers } }, (res) => {
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
  const nodeIds = NODES.map((n) => n.id).join(',');
  const figmaUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${nodeIds}&format=png&scale=2`;

  console.log('Requesting image URLs from Figma (nodes 2641:164–168)...');
  const res = await getJson(figmaUrl, { 'X-Figma-Token': TOKEN });

  if (res.err) {
    console.error('Figma API error:', res.err);
    process.exit(1);
  }

  const images = res.images || {};
  const outDir = path.join(__dirname, '..', 'public', 'images', OUT_SUBDIR);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const node of NODES) {
    const { idKey, file } = node;
    const idHyphen = idKey.replace(':', '-');
    const url = images[idKey] || images[idHyphen];
    if (!url) {
      console.warn('No URL for node', idKey);
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
