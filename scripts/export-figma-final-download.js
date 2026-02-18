/**
 * Export the "final download" layer from Figma node 2362:18788 (Final Comparison section).
 * Option A: Use FIGMA_ACCESS_TOKEN to find and export the layer via Figma API.
 * Option B: Use FIGD_TOKEN for direct download (if Figma provides a figd URL).
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=your_token node scripts/export-figma-final-download.js
 *   # or, if you have a direct figd URL token:
 *   FIGD_TOKEN=your_figd_token node scripts/export-figma-final-download.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const FILE_KEY = 're5Fauw1m9dJxYlIdR8Btn';
const PARENT_NODE_ID = '2362:18788';
const LAYER_NAME = 'final download';
const OUTPUT_FILE = 'final-download.png';
const OUTPUT_SUBDIR = 'delivery-checkout';

const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGD_TOKEN = process.env.FIGD_TOKEN;

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

function findNodeByName(node, name) {
  if (!node) return null;
  const searchName = name.toLowerCase();
  if (String(node.name || '').toLowerCase() === searchName) {
    return node;
  }
  const children = node.children || [];
  for (const child of children) {
    const found = findNodeByName(child, name);
    if (found) return found;
  }
  return null;
}

async function exportViaFigmaApi() {
  if (!FIGMA_TOKEN) {
    console.error('FIGMA_ACCESS_TOKEN is required for API export.');
    return null;
  }

  // 1. Get file nodes with depth to find children
  const fileUrl = `https://api.figma.com/v1/files/${FILE_KEY}?depth=10`;
  console.log('Fetching file structure from Figma...');
  const fileRes = await getJson(fileUrl, { 'X-Figma-Token': FIGMA_TOKEN });
  if (fileRes.err) {
    console.error('Figma API error:', fileRes.err);
    return null;
  }

  // 2. Find node 2362:18788 in the document
  function findNodeById(doc, targetId) {
    const norm = (id) => (id || '').replace(/-/g, ':');
    function walk(n) {
      if (!n) return null;
      if (norm(n.id) === norm(targetId)) return n;
      for (const c of n.children || []) {
        const w = walk(c);
        if (w) return w;
      }
      return null;
    }
    return walk(fileRes.document);
  }

  const parentNode = findNodeById(fileRes, PARENT_NODE_ID);
  if (!parentNode) {
    console.error('Could not find parent node', PARENT_NODE_ID);
    return null;
  }

  const targetNode = findNodeByName(parentNode, LAYER_NAME);
  if (!targetNode) {
    console.error('Could not find layer named "' + LAYER_NAME + '" under', PARENT_NODE_ID);
    console.log('Available child names:', (parentNode.children || []).map((c) => c.name));
    return null;
  }

  const nodeId = targetNode.id.replace(':', '-');
  console.log('Found layer "' + LAYER_NAME + '" with id', targetNode.id);

  // 3. Export the node
  const figmaUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${nodeId}&format=png&scale=2`;
  const res = await getJson(figmaUrl, { 'X-Figma-Token': FIGMA_TOKEN });
  if (res.err) {
    console.error('Figma export error:', res.err);
    return null;
  }

  const url = res.images?.[targetNode.id] || res.images?.[nodeId];
  if (!url) {
    console.error('No image URL returned. Response:', JSON.stringify(res, null, 2));
    return null;
  }

  return url;
}

async function tryFigdDirectDownload() {
  const urls = [
    `https://www.figma.com/api/figd/${FIGD_TOKEN}`,
    `https://www.figma.com/api/figd/${FIGD_TOKEN}/0`,
    `https://www.figma.com/figd/${FIGD_TOKEN}`,
  ];
  for (const url of urls) {
    try {
      const buf = await download(url);
      if (buf && buf.length > 100 && buf[0] === 0x89 && buf[1] === 0x50) {
        return buf; // PNG magic bytes
      }
      if (buf && buf.length > 100) {
        return buf;
      }
    } catch (e) {
      // try next
    }
  }
  return null;
}

async function main() {
  const outDir = path.join(__dirname, '..', 'public', 'images', OUTPUT_SUBDIR);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, OUTPUT_FILE);

  let imageBuffer = null;
  let imageUrl = null;

  // Try Figma API first
  if (FIGMA_TOKEN) {
    imageUrl = await exportViaFigmaApi();
    if (imageUrl) {
      console.log('Downloading from Figma export URL...');
      imageBuffer = await download(imageUrl);
    }
  }

  // Fallback: try direct figd download
  if (!imageBuffer && FIGD_TOKEN) {
    console.log('Trying direct figd token download...');
    imageBuffer = await tryFigdDirectDownload();
  }

  if (!imageBuffer || imageBuffer.length < 100) {
    console.error(
      'Could not download image. Ensure FIGMA_ACCESS_TOKEN is set (Figma → Settings → Personal access tokens) and the layer "final download" exists under node 2362:18788.'
    );
    process.exit(1);
  }

  fs.writeFileSync(outPath, imageBuffer);
  console.log('Saved', outPath);
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
