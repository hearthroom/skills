---
name: hearthroom-sandbox-kit
description: Use when a Hearthroom card on the sandbox page needs a status panel drawn from a block the model writes, choice buttons, a theme with dark and light sides, a settings drawer or a pinned value bar, or when a sandbox script, save or rule misbehaves and the kit, the local checker, the replay report or the offline preview can show why.
---

# Hearthroom sandbox kit

Use this skill to build or repair the on-screen layer of a sandbox card with
the toolkit's own kit (`../../assets/sandbox-kit/`), to run the local checker
before a push, and to see a card in the real chat shell offline. The
presentation director decides what the player should see and whether the UI
is `assist` or `core`; this skill makes it exist and proves it works.

## Required references

Read `../../references/sandbox-kit.md` (the method), the sandbox section of
`../../references/platform-facts.md`, and `../../assets/sandbox-kit/README.md`
(the manual: block protocol, config, runtime API). The generated contract
`../../scripts/sandbox-contract.json` is the list of every capability, event,
node, variable and limit; cite it rather than memory.

When the kit or a script misbehaves in a way neither the facts sheet nor the
contract explains, the chat page is open source: `platform-facts.md`, "Where
these facts come from", names the files to read and the cautions (read
`origin/main`, mind the host path versus the shell path, never depend on
internal nodes).

## Workflow

1. Take the state packet (from `hearthroom-state-economist`) and the
   presentation packet (`uiRole`, threshold, choices mode). The kit draws, it
   does not instruct: the block's keys and cadence must end up in the output
   contract and the opening must end with a first block.
2. Create `kit.config.json` next to the card from `kit.config.example.json`:
   `uiRole`, `schema.fields` from the state packet (label, type, tone,
   section, `values`, `rule`, `volatile`, `hidden`), a preset, modes. Pinned
   bar only for one to three values the player must always see; dock only
   when there is a settings pane or panes of your own; `choices` draft (assist
   default) or send (core default).
3. Generate the instruction: `node <toolkit>/assets/sandbox-kit/build.mjs
   --config <dir>/kit.config.json --emit-contract` and paste the paragraph
   into `card.json` `outputContract` (or the definition). Its example is the
   most ordinary turn in the canonical block format. End `welcome.md` with the
   block.
4. Build: `node <toolkit>/assets/sandbox-kit/build.mjs --config <dir>/kit.config.json --card <dir>`.
   It merges `hr-style`, `hr-kit`, `hr-status`, `hr-choices` (and `hr-pinned`)
   into `rules.json`, keeps the author's other rules, sets `pageMode: sandbox`,
   and refuses on a contrast failure or a replacement over 128 KiB.
5. Check: `hearthroom card check <dir>` (or `node <toolkit>/scripts/check-card.mjs <dir>`). Fix every error;
   read every warning (a marker nobody tells the model to write, an attribute
   the sanitizer strips, an `await` before a send, a save key that is not a
   key, a core card with no declared threshold).
6. Push and render: `hearthroom card push <dir> --validate --json`, then
   `hearthroom card render <dir> --json`; `hr-status` must be `applied` on
   the opening and `report.unsupported` must be empty.
7. Offline preview when the chat page's repository is available (facts
   sheet, "Offline preview"): stream a sample reply from `preview/replies.md`,
   confirm the panel hydrates after the stream, switch conversation, tap a
   choice in its mode, open the dock, both widths and both themes, and the
   same screens with the rules disabled. Accept on screenshots. Otherwise
   open `previewUrl` from the render report in a browser.
8. Format probe: 10 or more turns on a weak model with
   `hearthroom play --new-session --model …`; the block and the choices must
   be intact at every decision point. One strong-model run for emergence.
   Then `node <toolkit>/scripts/check-card.mjs <dir> --replay <history.json>`
   for the hit rate per key, the drift types and the overhead ratio against
   the declared threshold; then `hearthroom-render-review`.

Card-specific behaviour (faces from a mood value, a map from a location,
badges) goes into `extra.js` in the config and reads `HR.status.latest()` or
subscribes to `HR.on('state')`; it never asks the model for extra markers.

## Hand-off

```text
Sandbox kit:
- uiRole; overhead threshold:
- block keys (from the state packet); volatile keys:
- schema: (field, label, type, tone, section, hidden)
- preset / overrides (the object it skins):
- modes: status | pinned (keys) | dock (panes) | choices draft | send
- extra.js responsibilities:
- emitted contract: pasted into (outputContract | definition); chars:
- build result: rule ids and sizes
- check-card: errors / warnings and what was done
- render: hr-status applied | not; unsupported
- preview evidence: (what was seen, widths, themes, rules off)
- format probe: turns, models, block present N/N, choices present N/N
- replay: hit rate per key, overhead ratio / threshold
- verified: simulation | device
- next skill:
```

## Do not

- Do not put instructions to the model inside a rule's replacement or
  `extra.js`; the model never sees them.
- Do not draw the status a second time in the function bar; a pinned bar is
  one line of at most three values.
- Do not ask the model to write `<button>` HTML for choices; use the
  `[choices]` block.
- Do not write `data-theme`, `data-*` attributes on your own elements, or
  `sdk.vars`.
- Do not subscribe inside a `message:mount` handler, draw the first screen in
  `ready`, or `await` before `sdk.message.send` in a click.
- Do not copy another platform's kit files into a card; import its output
  through the CLI and run the checker.
- Do not call one play turn a format test.
