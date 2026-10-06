# Sandbox kit: status panels, themes and chrome on the sandbox page

Use this reference when a card needs a status panel, a theme, a settings drawer, pinned
values or choice buttons on the sandbox chat page, and when a sandbox script misbehaves.
The method here is what `assets/sandbox-kit/` implements; its manual is
`assets/sandbox-kit/README.md`. Every platform fact comes from `platform-facts.md`
(sandbox section) and from the generated contract `scripts/sandbox-contract.json`.

## Three constraints that shape everything

1. **The function bar is static.** `mountTrigger` is rendered once when the page loads; the
   rules run over the bar's own text, never over a reply. Anything in the bar that must
   change with the conversation is changed by a script. Trigger words in the bar exist to
   create `[data-slot="statusbar"]` and to let rules expand them once.
2. **Scripts run before the DOM, once per card, and `ready` is never replayed.** The first
   screen must be drawn from `message:mount` and `message:done`, which are replayed to late
   subscribers for every bubble still on screen. `ready` fires last on a cold start; a
   first-run animation that waits for it alone starts before the history has settled.
3. **There is no `sdk.off`, and the editor preview re-runs every script on each edit.** Every
   boot is re-entrant: tear down what the previous run mounted (by id), keep your own
   listener registry, never subscribe inside a `message:mount` handler.

Two more facts matter for status panels: the body of a bubble may not be final when `mount`
or `done` fires (rules run in a worker and the finished HTML is swapped in a moment later),
so hydrate again when the bubble changes; and the sanitizer strips unknown angle-bracket
tags, so a model-side marker is `[status]`, not `<status>`.

## One block, one renderer, in the bubble

The model writes one `[status]` block at the end of each reply; a display rule turns it into a
plain shell element (`<div class="hr-status hr-status--raw">$1</div>`); the script parses the
text inside and draws the panel in place. The rule never computes a width or a colour, and
the script never has to find the block in the raw reply.

- The panel lives **inside the bubble**: scrolling back shows the state as it was. There is
  no second copy of the panel in the function bar. A pinned bar shows one to three values on
  one line and nothing else.
- Parsing is tolerant line by line: a bad line is skipped, the block is never dropped. A
  value is drawn as a widget only when the whole value fits a known shape (the type ladder in
  the kit README); otherwise as text. A line of text is always better than a broken widget.
- The panel is derived from what the model already wrote. The screen never asks the model
  for anything a player would not read: faces, colours, badges and maps are computed from
  the values and the scene, not from extra markers.
- A **volatile** field (a scene-only value) has no fallback: when the model stops writing it,
  it disappears. Hidden fields are parsed but not drawn.

### Render rules are not generation rules

A rule that consumes `[status]` draws it; nothing in a rule reaches the model. The keys,
allowed values, update cadence and the instruction to end every reply with the block live in
the definition or the output contract (and, for a long card, in a constant Lorebook entry),
and the block appears in the opening so the first screen shows it. Without that, the panel
appears once and never updates. `scripts/check-card.mjs` reports the mismatch. The output
contract's example should show the most ordinary turn, not a rare event: weak models copy
examples every turn.

### One owner per value

A number the model narrates and a number a script keeps in `sdk.save` drift apart, and only
the model's rewinds with the conversation. Decide per value: the model owns it (it is in the
block), or the script owns it (badges, achievements, preferences) and the model never claims
it. Never both.

## Theme

- Tokens: the preset defines `--hr-*` on `[data-chat="root"][data-theme=dark]` and
  `[…][data-theme=light]` (specificity 0,2,0 beats the shell's 0,1,0; no `!important`).
  With `retheme` on, the platform's `--chat-*` variables are mapped to the same tokens, so
  bubbles, composer and modals follow the preset.
- Both sides, always. A card in MMD format is locked to dark by the platform and never sees
  `theme:change`; a card in tavern format follows the player. The kit draws correctly on
  either, so write both.
- Contrast is checked at build time: text on bg/surface ≥ 4.5:1, border and accent and tone
  colours ≥ 3:1, text on accent ≥ 4.5:1. The build refuses a preset that fails.
- The player changes only what the preset allows (text size, line height, motion, density);
  overrides are stored as deltas in one `sdk.save` key and validated field by field on read.
  Reset is always available. The platform owns dark/light; the kit reads `data-theme` and
  never writes it.
- Sizes use `--rpx` (the shell's design-width unit), font sizes use px.

## Chrome

- A dock tab sits in `[data-slot="left"]` or `[data-slot="right"]`, the shell's sidebar slots:
  zero-width positioned columns beside the message area, so the message column makes room.
  Its drawer holds panes; a single pane gets no tab bar; a dock with no panes is not drawn.
- The settings pane is one pane of the dock, never a second dock.
- Long-lived content that must survive virtualisation goes on the stage
  (`sdk.stage.open('content'|'full')`), not in a bubble. Read `stage.visible()`; your own
  `close()` does not emit `stage:close`.
- z-index inside the author band 3500–7999; the shell's own alert is at 9000.
- Choice buttons send on a trusted click, inside the click handler, with no `await` before
  `sdk.message.send`; otherwise the shell asks the player to confirm. While the model writes,
  a tap shows a toast. A set in an older reply is disabled once a newer reply exists.
- Drawers close when a new AI reply starts, so the text stays readable; the player reopens.

## Workflow

1. State first: `hearthroom-state-economist` decides the two to six fields. Write the
   contract (key, label, allowed values, cadence, play effect) into the definition or the
   output contract, and the first block into the opening.
2. Copy `kit.config.example.json` next to the card, fill `schema.fields` from the contract,
   pick a preset, decide modes (status on; pinned only for one to three values the player
   must always see; dock when there is a settings pane or your own panes; choices when the
   reply offers them).
3. `node build.mjs --config … --card <dir>` then `node scripts/check-card.mjs <dir>`.
4. `hearthroom card push --validate --json`, `card render --json`: the status rule must be
   `applied` on the opening.
5. Offline preview (the chat page's `bench/card-preview`, see the facts sheet): stream a
   sample reply, check the panel hydrates after the stream, switch conversation, tap a choice,
   open the dock, both themes, phone and desktop widths. Screenshot-based acceptance: a DOM
   count never shows two identical panels or a bar in the wrong colour.
6. One `play` turn with `--allow-spend` to see a real block from the model, then
   `hearthroom-render-review`.

## Pitfalls, each with its silent symptom

| Done wrong | What the player sees |
|---|---|
| `<status>` as the model marker | the panel draws, but a script reading the bubble later finds plain text |
| drawing the first screen in `ready` | nothing on a cold start with history |
| `sdk.on` inside a `message:mount` handler | handlers multiply; the panel redraws n times |
| the panel in the function bar as well as the bubble | two identical panels, one never updating |
| `await` before `sdk.message.send` in a click | a confirmation dialog on every button |
| a stat the model narrates and a script also stores | the numbers disagree after a rewind |
| `data-*` attributes on your own elements | gone after the sanitizer; selectors never match |
| `on*` inside `<svg>` | the icon button does nothing |
| reading `sdk.save` before saves load, without `try` | the whole script dies with HOST_DENIED |
| a pattern that can match the empty string | the rule is rolled back; the marker stays visible |
| a replacement over 128 KiB (UTF-8; CJK comments cost three bytes) | the push is refused |
| one `sdk.save` key per setting | RATE_LIMITED after twenty writes a minute; the tenth key fails |
| a path built as `"assets/" + id` | the file is never uploaded |
| `{{random:a|b}}` | the literal text; the engine wants `{{random:a::b}}` |

## Importing a kit written for another platform

A sandbox kit written for MMD's new-style page runs here, with these differences: no
`sdk.vars` / `<abc_vars>`; `user.get()` returns `nickname`; `sdk.text.*` exists here;
header and composer are standard components inside the shell; a six-key rules file imports
with `pageMode: sandbox` but its `personality` key is not read (the persona comes from the
separate text file) and the regex scripts' SillyTavern-only flags are dropped. After
`card import`, run `check-card.mjs` and `card render`; the only identifiers expected under
`report.unsupported` are `sdk.vars` and `<abc_vars>`.
