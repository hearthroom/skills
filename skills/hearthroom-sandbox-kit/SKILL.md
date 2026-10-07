---
name: hearthroom-sandbox-kit
description: Use when a sandbox card needs a status panel drawn from the model's block, choice buttons, a theme, a settings drawer or a pinned bar built with the toolkit's kit, when the local checker, replay report or offline preview should prove the screen, or when a sandbox script, save or rule misbehaves.
---

# Hearthroom sandbox kit

Build or repair the on-screen layer of a sandbox card with the toolkit's
kit (`../../assets/sandbox-kit/`), run the local checker before a push, and
see the card in the real chat shell offline. The presentation director
decides what the player should see and whether the UI is `assist` or
`core`; this skill makes it exist and proves it works. The kit is a
starting point, not a ceiling: anything the card needs beyond it goes into
`extra.js` or the card's own rules, under the same proof.

## Required references

Read `../../references/sandbox-kit.md` (the method), the sandbox section of
`../../references/platform-facts.md`, and `../../assets/sandbox-kit/README.md`
(the manual: block protocol, config, runtime API). The generated contract
`../../scripts/sandbox-contract.json` lists every capability, event, node,
variable and limit; cite it rather than memory. When neither explains a
misbehaviour, the chat page is open source: `platform-facts.md`, "Where
these facts come from", names the files and the cautions.

## Workflow

1. Take the state packet (`hearthroom-state-economist`) and the presentation
   packet (`uiRole`, threshold, choices mode). The kit draws, it does not
   instruct: the block's keys and cadence must end up in the output
   contract and the opening must end with a first block.
2. Create `kit.config.json` next to the card from `kit.config.example.json`:
   `uiRole`, `schema.fields` from the state packet (label, type, tone,
   section, `values`, `rule`, `volatile`, `hidden`), a preset, modes.
   Pinned bar only for one to three values the player must always see;
   dock only when there is a settings pane or panes of your own; `choices`
   draft (assist default) or send (core default).
3. `node <toolkit>/assets/sandbox-kit/build.mjs --config <dir>/kit.config.json
   --emit-contract` and paste the paragraph into `card.json` `outputContract`
   (or the definition); its example is the most ordinary turn. The config's
   `language` is the card's and every field has an `example` in it, so the
   emitted text is what the model should copy, not an English sample. End
   `welcome.md` with the block.
4. `node <toolkit>/assets/sandbox-kit/build.mjs --config <dir>/kit.config.json
   --card <dir>`: merges the kit rules into `rules.json`, keeps the author's
   other rules, sets `pageMode: sandbox`, refuses on a contrast failure or a
   replacement over 128 KiB.
5. `hearthroom card check <dir>`: fix every error; read every warning (a
   marker nobody tells the model to write, an attribute the sanitizer
   strips, an `await` before a send, a save key that is not a key, a core
   card with no declared threshold).
6. `card push <dir> --validate --json`, then `card render <dir> --json`:
   `hr-status` must be `applied` on the opening and `report.unsupported`
   empty.
7. `hearthroom card preview --check <dir>`: drives the real shell in headless
   Chrome, streams the samples from `preview/replies.md` (or
   `--from-history <play history>` for real replies), and writes
   `preview/shots/`: one screenshot per state (phone and desktop, both
   themes, rules on and off, first and last sample), `contact.png` with all
   of them captioned, and `findings.json` (block written but never drawn,
   panel drawn late, sideways overflow on the phone, console errors, story
   and UI share, choices and free input). Clear every error finding, then
   read `contact.png` yourself: does the panel belong to the card, is the
   story still the thing on screen, does rules-off read as prose. Change,
   run again; two rounds usually converge. `--open` is for a person at a
   browser; tapping a choice in its mode and opening the dock still need
   that.
8. Format probe: ten or more turns on a weak model with `hearthroom play
   --new-session --model …` (the block and the choices intact at every
   decision point), one strong-model run for emergence, then
   `hearthroom card check <dir> --replay <history>` (the text or `--json`
   output of `play --history`; CLI 0.5.0 read the JSON as one reply, 0.5.1
   fixed it) for the hit rate
   per key, drift types and the overhead ratio against the threshold; then
   `hearthroom-render-review`.

Card-specific behaviour (faces from a mood value, a map from a location,
badges) goes into `extra.js` and reads `HR.status.latest()` or
`HR.on('state')`; it never asks the model for extra markers. Record in the
dossier: schema, preset, modes, emitted contract placement, build result,
check and render results, preview evidence, probe and replay numbers, and
whether verified in simulation or on a device.

## Do not

- Do not put instructions to the model inside a rule's replacement or
  `extra.js`; the model never sees them.
- Do not ask the model to write `<button>` HTML for choices; use the
  `[choices]` block.
- Do not write `data-theme`, `data-*` attributes on your own elements, or
  `sdk.vars`; do not subscribe inside a `message:mount` handler, draw the
  first screen in `ready`, or `await` before `sdk.message.send` in a click.
- Do not call one play turn a format test.
