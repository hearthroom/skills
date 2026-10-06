---
name: hearthroom-sandbox-kit
description: Use when a Hearthroom card on the sandbox page needs a status panel drawn from a block the model writes, a theme with dark and light sides, a settings drawer, a pinned value bar, choice buttons that send a player line, or when a sandbox script, save or rule misbehaves and the kit, the local checker or the offline preview can show why.
---

# Hearthroom sandbox kit

Use this skill to build or repair the on-screen layer of a sandbox card with the toolkit's
own kit (`../../assets/sandbox-kit/`), to run the local checker before a push, and to see a
card in the real chat shell offline. The presentation director decides what the player
should see; this skill makes it exist and proves it works.

## Required references

Read `../../references/sandbox-kit.md` (the method), the sandbox section of
`../../references/platform-facts.md`, and `../../assets/sandbox-kit/README.md` (the manual:
block protocol, config, runtime API). The generated contract
`../../scripts/sandbox-contract.json` is the list of every capability, event, node, variable
and limit; cite it rather than memory.

## Workflow

1. Take the state packet (from `hearthroom-state-economist`) and the presentation packet.
   Confirm the block's keys, allowed values and cadence are written into the definition or
   the output contract and that the opening ends with a first block. If not, send that back
   first: the kit draws, it does not instruct.
2. Create `kit.config.json` next to the card from `kit.config.example.json`: `schema.fields`
   from the state packet (label, type, tone, section, hidden), a preset, modes. Pinned bar
   only for one to three values the player must always see; dock only when there is a
   settings pane or panes of your own; choices when replies offer them.
3. Build: `node <toolkit>/assets/sandbox-kit/build.mjs --config <dir>/kit.config.json --card <dir>`.
   It merges `hr-style`, `hr-kit`, `hr-status` (and `hr-pinned`) into `rules.json`, keeps
   the author's other rules, sets `pageMode: sandbox`, and refuses on a contrast failure or a
   replacement over 128 KiB.
4. Check: `node <toolkit>/scripts/check-card.mjs <dir>`. Fix every error; read every warning
   (a marker nobody tells the model to write, an attribute the sanitizer strips, an `await`
   before a send, a save key that is not a key).
5. Push and render: `hearthroom card push <dir> --validate --json`, then
   `hearthroom card render <dir> --json`; `hr-status` must be `applied` on the opening and
   `report.unsupported` must be empty.
6. Offline preview when the chat page's repository is available (facts sheet, "Offline
   preview"): stream a sample reply from `preview/replies.md`, confirm the panel hydrates
   after the stream, switch conversation, tap a choice, open the dock, both widths and both
   themes. Otherwise open `previewUrl` from the render report in a browser.
7. One paid turn with `hearthroom-chat-simulation` to see a real block from the model; then
   `hearthroom-render-review` for the repair decision.

Card-specific behaviour (faces from a mood value, a map from a location, badges) goes into
`extra.js` in the config and reads `HR.status.latest()` or subscribes to `HR.on('state')`;
it never asks the model for extra markers.

## Hand-off

```text
Sandbox kit:
- block keys (from the state packet):
- schema: (field, label, type, tone, section, hidden)
- preset / overrides:
- modes: status | pinned (keys) | dock (panes) | choices
- extra.js responsibilities:
- build result: rule ids and sizes
- check-card: errors / warnings and what was done
- render: hr-status applied | not; unsupported
- preview evidence: (what was seen, at which widths and themes)
- next skill:
```

## Do not

- Do not put instructions to the model inside a rule's replacement or `extra.js`; the model
  never sees them.
- Do not draw the status a second time in the function bar; a pinned bar is one line of at
  most three values.
- Do not write `data-theme`, `data-*` attributes on your own elements, or `sdk.vars`.
- Do not subscribe inside a `message:mount` handler, draw the first screen in `ready`, or
  `await` before `sdk.message.send` in a click.
- Do not copy another platform's kit files into the card; import its output through the CLI
  and run the checker.
