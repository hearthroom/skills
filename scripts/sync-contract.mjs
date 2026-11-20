#!/usr/bin/env node
// Keeps scripts/sandbox-contract.json equal to the published author contract.
//
//   node scripts/sync-contract.mjs            # fetch and replace
//   node scripts/sync-contract.mjs --check    # exit 1 when the vendored copy differs
//   node scripts/sync-contract.mjs --from <path-to-hearthroom-checkout>   # copy from a local website checkout
//
// Hearthroom publishes the author-facing fields for its pinned Stage revision.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOCAL = path.join(ROOT, 'scripts/sandbox-contract.json');
const URL = process.env.HEARTHROOM_CONTRACT_URL || 'https://raw.githubusercontent.com/hearthroom/hearthroom/main/web/public/contracts/sandbox-contract.json';
const args = process.argv.slice(2);
const from = args.includes('--from') ? args[args.indexOf('--from') + 1] : null;

async function upstream() {
  if (from) return readFileSync(path.join(from, 'web/public/contracts/sandbox-contract.json'), 'utf8');
  const r = await fetch(URL);
  if (!r.ok) throw new Error(`${URL}: ${r.status}`);
  return await r.text();
}

const theirs = (await upstream()).trim();
const contract = JSON.parse(theirs);
if (contract.name !== 'hearthroom-sandbox-contract' || !/^[a-f0-9]{40}$/.test(contract.stageCommit ?? '')) {
  throw new Error('Expected the public Hearthroom sandbox contract with a Stage version');
}
let ours = '';
try { ours = readFileSync(LOCAL, 'utf8').trim(); } catch { /* first sync */ }
if (theirs === ours) { console.log('✔ sandbox-contract.json is current'); process.exit(0); }
if (args.includes('--check')) {
  console.log('✖ scripts/sandbox-contract.json differs from the chat page\'s contract; run node scripts/sync-contract.mjs, then npm test (facts-vs-contract) and update platform-facts.md');
  process.exit(1);
}
writeFileSync(LOCAL, theirs + '\n');
console.log(`✔ wrote ${LOCAL}; now run npm test and update references/platform-facts.md for any new name`);
