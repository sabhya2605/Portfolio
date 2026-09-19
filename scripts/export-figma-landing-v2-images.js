/**
 * Export images for the v2 landing page (src/components/Landing.jsx) from
 * Figma frame 2087:228 in the Bento file.
 *
 * Provenance note: Figma's /v1/files/:key/nodes endpoint was rate limited when
 * these assets were first produced, so the per-image node ids are not known.
 * Instead this renders the whole frame at 2x through /v1/images (a different,
 * working endpoint) and crops each asset out by its measured position on the
 * 1440-wide design canvas. That keeps the step reproducible.
 *
 * If you later get the node tree, prefer exporting each image node directly —
 * a per-node export is sharper than a crop out of the flattened frame.
 *
 * Only the images with no higher-resolution original in the repo are cropped
 * here. The hero portrait, the four case-study images and the five exploration
 * tiles all reuse existing assets under src/images/ instead.
 *
 * Requires ImageMagick for the cropping step (`brew install imagemagick`).
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=your_token node scripts/export-figma-landing-v2-images.js
 *
 * The token is read from .env.local (preferred, gitignored), .env, or the
 * environment. It is never printed.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const FILE_KEY = process.env.FIGMA_FILE_KEY || 'N73elc9CS8iWr5S4VXLEcx';
const FRAME = '2087-228';
const SCALE = 2;
const OUT_DIR = path.join(__dirname, '..', 'src', 'images', 'landing-v2');

/*
 * Crop boxes in design pixels on the 1440-wide canvas: [left, top, right, bottom].
 * Measured off the rendered frame.
 */
const CROPS = [
  ['about-photo.jpg', [162, 2703, 1298, 3366]],
  ['recog-1.jpg', [150, 3789, 472, 4112]],
  ['recog-2.jpg', [558, 3789, 880, 4112]],
  ['recog-3.jpg', [966, 3789, 1288, 4112]],
];

function readToken() {
  if (process.env.FIGMA_ACCESS_TOKEN) return process.env.FIGMA_ACCESS_TOKEN.trim();
  for (const file of ['.env.local', '.env']) {
    const p = path.join(__dirname, '..', file);
    if (!fs.existsSync(p)) continue;
    const line = fs
      .readFileSync(p, 'utf8')
      .split('\n')
      .find((l) => /^\s*FIGMA_ACCESS_TOKEN\s*=/.test(l));
    if (!line) continue;
    const value = line.slice(line.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '');
    if (value) return value;
  }
  return null;
}

function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(get(res.headers.location, headers));
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const body = Buffer.concat(chunks);
          if (res.statusCode !== 200) {
            return reject(new Error(`HTTP ${res.statusCode}: ${body.toString('utf8').slice(0, 200)}`));
          }
          resolve(body);
        });
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

async function main() {
  const token = readToken();
  if (!token) {
    console.error(
      'No FIGMA_ACCESS_TOKEN found. Add it to .env.local (gitignored):\n' +
        '  FIGMA_ACCESS_TOKEN=your_token'
    );
    process.exit(1);
  }

  try {
    execFileSync('magick', ['-version'], { stdio: 'ignore' });
  } catch (err) {
    console.error('ImageMagick is required for cropping. Install it with: brew install imagemagick');
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`Rendering frame ${FRAME} at ${SCALE}x...`);
  const meta = JSON.parse(
    (
      await get(
        `https://api.figma.com/v1/images/${FILE_KEY}?ids=${FRAME}&format=png&scale=${SCALE}`,
        { 'X-Figma-Token': token }
      )
    ).toString('utf8')
  );
  if (meta.err) throw new Error(`Figma: ${meta.err}`);

  const url = meta.images[FRAME.replace('-', ':')];
  if (!url) throw new Error(`No render returned for ${FRAME}`);

  const framePath = path.join(OUT_DIR, '.frame.png');
  fs.writeFileSync(framePath, await get(url));
  console.log(`Frame saved (${(fs.statSync(framePath).size / 1024 / 1024).toFixed(1)} MB)`);

  for (const [name, [l, t, r, b]] of CROPS) {
    const w = (r - l) * SCALE;
    const h = (b - t) * SCALE;
    const out = path.join(OUT_DIR, name);
    execFileSync('magick', [
      framePath,
      '-crop', `${w}x${h}+${l * SCALE}+${t * SCALE}`,
      '+repage',
      '-quality', '84',
      out,
    ]);
    console.log(`  ${name}  ${w}x${h}`);
  }

  fs.unlinkSync(framePath);
  console.log(`\nDone. ${CROPS.length} images written to src/images/landing-v2/`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
