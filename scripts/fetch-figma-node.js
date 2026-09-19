/**
 * Fetch a Figma node tree through the REST API (not the MCP, which has a tiny
 * daily budget) and save it as JSON for inspection.
 *
 * The token is read from .env.local (preferred, gitignored), .env, or the
 * environment. It is never printed.
 *
 * Usage:
 *   node scripts/fetch-figma-node.js <nodeId> [outFile] [--depth=N]
 *
 * Example:
 *   node scripts/fetch-figma-node.js 1916:4638 /tmp/mobile.json --depth=8
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const FILE_KEY = process.env.FIGMA_FILE_KEY || 'N73elc9CS8iWr5S4VXLEcx';

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

function getJson(url, token) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'X-Figma-Token': token, Accept: 'application/json' } }, (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const body = Buffer.concat(chunks).toString('utf8');
          if (res.statusCode !== 200) {
            return reject(new Error(`Figma API ${res.statusCode}: ${body.slice(0, 200)}`));
          }
          try {
            resolve(JSON.parse(body));
          } catch (err) {
            reject(err);
          }
        });
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

async function main() {
  const [nodeArg, outArg] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const depthArg = process.argv.find((a) => a.startsWith('--depth='));
  if (!nodeArg) {
    console.error('Usage: node scripts/fetch-figma-node.js <nodeId> [outFile] [--depth=N]');
    process.exit(1);
  }

  const token = readToken();
  if (!token) {
    console.error(
      'No FIGMA_ACCESS_TOKEN found. Add it to .env.local (gitignored):\n' +
        '  FIGMA_ACCESS_TOKEN=your_token'
    );
    process.exit(1);
  }

  const ids = nodeArg.replace(/:/g, '-');
  const depth = depthArg ? `&depth=${depthArg.split('=')[1]}` : '';
  const url = `https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${ids}${depth}`;

  console.log(`Fetching ${nodeArg} from file ${FILE_KEY}...`);
  const data = await getJson(url, token);

  const out = outArg || path.join(__dirname, '..', `figma-${ids}.json`);
  fs.writeFileSync(out, JSON.stringify(data, null, 2));
  const node = data.nodes && data.nodes[nodeArg.replace(/-/g, ':')];
  console.log(`Saved ${out} (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`);
  if (node && node.document) {
    console.log(`Root: "${node.document.name}" (${node.document.type})`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
