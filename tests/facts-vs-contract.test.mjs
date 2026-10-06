import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// The facts sheet is prose over the generated contract: every name the contract lists must be
// present in the facts sheet, so documentation cannot fall behind the chat page's source.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contract = JSON.parse(readFileSync(path.join(ROOT, 'scripts/sandbox-contract.json'), 'utf8'));
const facts = readFileSync(path.join(ROOT, 'references/platform-facts.md'), 'utf8');

test('every sdk capability, event and error code in the contract is named in the facts sheet', () => {
  const missing = [];
  for (const cap of contract.sdk.capabilities) {
    const [key, method] = cap.split('.');
    const ok = method ? new RegExp(`sdk\\.${key}\\.[\\w/]*\\b${method}\\b|\`${method}\`|/${method}\\b|\\b${method}/`).test(facts) : facts.includes(`sdk.${key}`);
    if (!ok) missing.push(cap);
  }
  for (const ev of contract.events.names) if (!facts.includes(`\`${ev}\``)) missing.push(ev);
  for (const code of contract.errorCodes) if (!facts.includes(`\`${code}\``)) missing.push(code);
  assert.deepEqual(missing, []);
});

test('every data-chat node, slot and --chat-* variable in the contract is named in the facts sheet', () => {
  const missing = [];
  for (const n of contract.nodes.dataChat) if (!facts.includes(`"${n}"`) && !facts.includes(`\`${n}\``) && !facts.includes(`${n}\``)) missing.push(`data-chat=${n}`);
  for (const s of contract.nodes.dataSlot) if (!facts.includes(`"${s}"`) && !facts.includes(`\`${s}\``)) missing.push(`data-slot=${s}`);
  for (const v of contract.css.chatVars) if (!facts.includes(v) && !facts.includes(`\`${v.replace('--chat-', '')}\``)) missing.push(v);
  assert.deepEqual(missing, []);
});

test('the not-provided list and the provider limits appear in the facts sheet', () => {
  for (const n of contract.sdk.notProvided) assert.ok(facts.includes(n), n);
  assert.ok(facts.includes('128 KB') || facts.includes('128 KiB'));
  assert.ok(facts.includes('32 MB') || facts.includes('32 MiB'));
  for (const r of contract.rules.rollbackReasons) assert.ok(facts.includes(`\`${r}\``), r);
});
