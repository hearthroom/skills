# Sandbox kit: status panels, themes and chrome on the sandbox page

Use this reference when a card needs a status panel, a theme, a settings
drawer, pinned values or choice buttons on the sandbox chat page, and when a
sandbox script misbehaves. The method here is what `assets/sandbox-kit/`
implements; its manual is `assets/sandbox-kit/README.md`. Every platform
fact comes from `platform-facts.md` (sandbox section) and from the generated
contract `scripts/sandbox-contract.json`.

## When not to use the kit

Story first (`presentation-design.md`). An `uiRole: assist` card often needs
only the status block drawn by one plain rule, or nothing at all: a scene
line in the prose does the orientation job, a sentence does the memory job.
Reach for the kit when a value must be read at a glance every turn, when the
player must pick from options the reply offers, or when the card is
`uiRole: core` and its mechanics live on the screen. Every pane and every
field must do one of UI's five jobs (memory, legible choices, pacing, the
world reacting, orientation); prefer a diegetic object (a ledger, a lantern,
a dossier: the kit's preset is a skin for that object, not a style name) to a
HUD. Report the status overhead ratio of the block on the sample replies
(`check-card.mjs --replay`) against the threshold the card declares in its
`README.md`.


## The kit is not the default

Most cards need no panel. Use the kit when the state packet says the player
acts on two to six values every turn and a diegetic form of those values (a
ledger line, a stamp, a letter) would cost the model more than it gives; if a
line of prose carries the state better, write the line. A card that opens
with a status panel because the toolkit has one has let the tool choose the
story. Skin it to the world (`preset` and `extra.css`); the shipped presets
are starting points, not looks.
## Three constraints that shape everything

1. **The function bar is static.** `mountTrigger` is rendered once when the
   page loads from its own text; the rules run over that text, never over a
   reply; a `<script>` in it is dropped and an `<img onerror>` boot runs
   (facts sheet, Vocabulary). Anything in the bar that must change with the
   conversation is changed by a rule script. Trigger words in the bar exist
   to create `[data-slot="statusbar"]` and to let rules expand them once.
2. **Scripts run before the DOM, once per card, and `ready` is never replayed.**
   The first screen must be drawn from `message:mount` and `message:done`,
   which are replayed to late subscribers for every bubble still on screen.
   `ready` fires last on a cold start; a first-run animation that waits for
   it alone starts before the history has settled.
3. **There is no `sdk.off`, and the editor preview re-runs every script on
   each edit.** Every boot is re-entrant: tear down what the previous run
   mounted (by id), keep your own listener registry, never subscribe inside
   a `message:mount` handler.

Two more facts matter for status panels: the body of a bubble may not be
final when `mount` or `done` fires (rules run in a worker and the finished
HTML is swapped in a moment later), so the kit hydrates again when the bubble
changes and binds buttons by delegation on `document`; and the sanitizer
strips unknown angle-bracket tags, so a model-side marker is `[status]`, not
`<status>`.

## One block, one renderer, in the bubble

The model ends each reply with one `[status]` block (canonical form in
`state-economy-design.md`); a display rule turns it into a plain shell
element (`<div class="hr-status hr-status--raw">$1</div>`); the script
parses the text inside and draws the panel in place. The rule never computes
a width or a colour, and the script never has to find the block in the raw
reply. The rule tolerates a missing closing marker (it matches to the end of
the reply), so a weak model that drops `[/status]` still gets a panel; the
parser tolerates full-width punctuation, list prefixes, bold keys and
duplicate keys.

- The panel lives **inside the bubble**: scrolling back shows the state as it
  was. There is no second copy of the panel in the function bar. A pinned
  bar shows one to three values on one line and nothing else.
- Parsing is tolerant line by line: a bad line is skipped, the block is never
  dropped. A value is drawn as a widget only when the whole value fits a
  known shape (the type ladder in the kit README); otherwise as text. A line
  of text is always better than a broken widget.
- The panel is derived from what the model already wrote. The screen never
  asks the model for anything a player would not read: faces, colours,
  badges and maps are computed from the values and the scene, not from
  extra markers.
- A **volatile** field (`volatile: true` in the schema) is a scene-only value
  with no fallback: when the model stops writing it, it disappears. The
  generated contract tells the model to write it only while it applies.
  Hidden fields are parsed but not drawn.

### Render rules are not generation rules

A rule that consumes `[status]` draws it; nothing in a rule reaches the
model. The keys, allowed values, update cadence and the instruction to end
every reply with the block live in the output contract or the definition
(and, for a long card, in a constant Lorebook entry), and the block appears
in the opening so the first screen shows it. `build.mjs --emit-contract`
generates that paragraph from the schema (always-present keys, volatile keys,
allowed values, the choices block, and an example of an ordinary turn) so the
rule and the instruction cannot drift apart; paste it into the output
contract. Without that, the panel appears once and never updates;
`scripts/check-card.mjs` reports the mismatch. The example shows the most
ordinary turn, not a rare event: weak models copy examples every turn.

A field that records events (the last patch, the last clue, the last deal) is
read as history: a concrete `example` there ("#1 armour patched") is treated
as something that already happened and shows up in play. Give such fields a
neutral example ("none yet") and a `rule` that says only events the player
caused are written.

Some models drift to half-width punctuation in Chinese prose. The text the
model reads back stays as written; a display rule can still show `,` `:` `?`
`!` between Chinese characters full-width (lookbehind and lookahead on
both sides, no space allowed, so `key: value` status lines are untouched).

### One owner per value

A number the model narrates and a number a script keeps in `sdk.save` drift
apart, and only the model's rewinds with the conversation. Decide per value:
the model owns it (it is in the block), or the script owns it (badges,
achievements, preferences) and the model never claims it. Never both.

## Choices

The model offers options as a block, not as HTML:

```
[choices]
- Ask about the keeper
- Say nothing
[/choices]
```

A display rule turns it into buttons and the kit adds "✎ write your own",
which only focuses the composer. Two modes, set by `modes.choices` in the
config and defaulting from `uiRole`: **draft** (the default for an assist
card) puts the line into the composer with `sdk.input.set` and focuses it,
so the player edits before sending; **send** (the default for a core card)
sends on a trusted tap, inside the click handler, with no `await` before
`sdk.message.send`. Choices are drafts, not rails: free input always works,
sets in older replies are disabled once a newer reply exists, and a tap
while the model writes shows a toast instead of sending.

## Theme

- Tokens: the preset defines `--hr-*` on `[data-chat="root"][data-theme=dark]`
  and `[…][data-theme=light]`. An unlayered author stylesheet beats the
  shell's `@layer lt-base` (facts sheet), so no `!important` is needed. With
  `retheme` on, the platform's `--chat-*` variables are mapped to the same
  tokens, so bubbles, composer and modals follow the preset.
- Both sides, always. A card in MMD format is locked to dark by the platform
  and never sees `theme:change`; a card in tavern format follows the player.
  The kit draws correctly on either, so write both.
- Contrast is checked at build time: text on bg/surface ≥ 4.5:1, border and
  accent and tone colours ≥ 3:1, text on accent ≥ 4.5:1. The build refuses a
  preset that fails.
- The player changes only what the preset allows (text size, line height,
  motion, density); overrides are stored as deltas in one `sdk.save` key and
  validated field by field on read. Reset is always available. The platform
  owns dark/light; the kit reads `data-theme` and never writes it.
- Sizes use `--rpx` (the shell's design-width unit), font sizes use px.
- A preset is a skin for the object the card's world would show its state
  on; pick or adjust it for that object, not for a mood word.

## Chrome

- A dock tab sits in `[data-slot="left"]` or `[data-slot="right"]`, the shell's
  sidebar slots: zero-width positioned columns beside the message area, so
  the message column makes room. Its drawer holds panes; a single pane gets
  no tab bar; a dock with no panes is not drawn.
- The settings pane is one pane of the dock, never a second dock.
- Long-lived content that must survive virtualisation goes on the stage
  (`sdk.stage.open('content'|'full')`), not in a bubble. Read
  `stage.visible()`; your own `close()` does not emit `stage:close`.
- z-index inside the author band 3500–7999; the shell's own alert is at 9000.
- The kit closes its drawers when a new AI reply starts, so the text stays
  readable; the player reopens.

## Workflow

1. State first: `hearthroom-state-economist` decides the two to six fields.
   Declare `uiRole` and the overhead threshold in `README.md`.
2. Copy `kit.config.example.json` next to the card, fill `schema.fields` from
   the state packet (label, type, tone, section, `values`, `rule`,
   `volatile`, `hidden`), set `uiRole`, pick a preset, decide modes (status
   on; pinned only for one to three values the player must always see; dock
   when there is a settings pane or your own panes; choices draft or send).
3. `node build.mjs --config … --emit-contract` and paste the paragraph into
   the output contract; end the opening with the block; then
   `node build.mjs --config … --card <dir>` and
   `node scripts/check-card.mjs <dir>`.
4. `hearthroom card push --validate --json`, `card render --json`: the status
   rule must be `applied` on the opening.
5. Offline preview (facts sheet, "Offline preview"): stream a sample reply,
   check the panel hydrates after the stream, switch conversation, tap a
   choice in each mode, open the dock, both widths and both themes, and the
   same screens with the rules disabled. Accept on screenshots: a DOM count
   never shows two identical panels or a bar in the wrong colour.
6. A format probe: 10 or more turns on a weak model with `--new-session`;
   the run fails if the block or the choices are missing or malformed at any
   decision point. Then one strong-model run for emergence. Feed the
   transcripts to `check-card.mjs --replay` for the hit rate per key and the
   overhead ratio, then `hearthroom-render-review`.

## Pitfalls, each with its silent symptom

| Done wrong | What the player sees |
|---|---|
| `<status>` as the model marker | the panel draws, but a script reading the bubble later finds plain text |
| drawing the first screen in `ready` | nothing on a cold start with history |
| `sdk.on` inside a `message:mount` handler | handlers multiply; the panel redraws n times |
| the panel in the function bar as well as the bubble | two identical panels, one never updating |
| `await` before `sdk.message.send` in a click | a confirmation dialog on every button |
| choices as model-written `<button>` HTML | the heaviest format, the first a weak model drops; use the `[choices]` block |
| a stat the model narrates and a script also stores | the numbers disagree after a rewind |
| `data-*` attributes on your own elements | gone after the sanitizer; selectors never match |
| `on*` inside `<svg>` | the icon button does nothing |
| reading `sdk.save` before saves load, without `try` | the whole script dies with HOST_DENIED |
| a pattern that can match the empty string | the rule is rolled back; the marker stays visible |
| a replacement over 128 KiB (UTF-8; CJK comments cost three bytes) | the push is refused |
| one `sdk.save` key per setting | RATE_LIMITED after twenty writes a minute; the eleventh key fails |
| a path built as `"assets/" + id` | the file is never uploaded |
| `{{random:a|b}}` | the literal text; the engine wants `{{random:a::b}}` |
| a block the model is never told to write | the panel shows on the opening and never again |
| `message:new` read as "a reply started" before the history settled | every stored message replays `new` on a cold start; the screen opens as if a reply were generating |
| a status value shown from the kit's parsed value | full-width punctuation becomes ASCII (`｜` → `|`); show text values from the block as written |

## Importing a kit written for another platform

A sandbox kit written for MMD's new-style page runs here, with these
differences: no `sdk.vars` / `<abc_vars>`; `user.get()` returns `nickname`;
`sdk.text.*` exists here; header and composer are standard components inside
the shell; a six-key rules file imports with `pageMode: sandbox` but its
`personality` key is not read (the persona comes from the separate text file)
and the regex scripts' SillyTavern-only flags are dropped. After
`card import`, run `check-card.mjs` and `card render`; the only identifiers
expected under `report.unsupported` are `sdk.vars` and `<abc_vars>`. An
author who also targets SillyTavern or MMD's older page can keep the
open-source `tavern-mmd` skill for those platforms; on Hearthroom this kit
is the route.

## Gated extras

Two things the kit can do only when the card says why (`gates.intro`, `gates.page` in
the config; the build refuses them otherwise): a first-open intro on the stage (one line
and one action, shown once, never a restatement of the opening) and a full-page reading
mode over the chat list (one page per reply, choices unlock at the end of the page, one
tap back to the chat). Both must pass the story-first numbers in the offline preview: the
text-only view still reads, the first screen shows more story than chrome, and the first
choice is reachable without hunting. A palette from a design tool becomes a preset with
`--preset-from`, through the same contrast checks as the shipped ones.
