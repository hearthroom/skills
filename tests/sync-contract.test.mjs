import { strict as assert } from "node:assert";
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

const upstream = "https://raw.githubusercontent.com/hearthroom/hearthroom/main/web/public/contracts/sandbox-contract.json";
const contract = { name: "hearthroom-sandbox-contract", protocolVersion: 2, stageCommit: "a".repeat(40) };

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "hearthroom-contract-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const script = join(root, "scripts", "sync-contract.mjs");
  mkdirSync(join(root, "scripts"));
  copyFileSync(new URL("../scripts/sync-contract.mjs", import.meta.url), script);
  writeFileSync(join(root, "scripts", "sandbox-contract.json"), JSON.stringify(contract));
  return (status, body) => {
    const stub = `globalThis.fetch = async (url) => {
      if (url !== ${JSON.stringify(upstream)}) throw new Error("wrong contract URL: " + url);
      return new Response(${JSON.stringify(JSON.stringify(body))}, { status: ${status} });
    };`;
    return spawnSync(process.execPath, ["--import", "data:text/javascript," + encodeURIComponent(stub), script, "--check"], {
      cwd: root, encoding: "utf8", env: { ...process.env, HEARTHROOM_CONTRACT_URL: "" },
    });
  };
}

test("sync reads the public website repository and accepts its exact Stage manifest", t => {
  const r = fixture(t)(200, contract);
  assert.equal(r.status, 0, r.stderr + r.stdout);
});

test("a missing or mismatched public source fails the CI comparison", t => {
  const run = fixture(t);
  const missing = run(404, {});
  assert.equal(missing.status, 1);
  assert.match(missing.stderr, /404/);
  const changed = run(200, { ...contract, stageCommit: "b".repeat(40) });
  assert.equal(changed.status, 1);
  assert.match(changed.stdout, /differs/);
});
