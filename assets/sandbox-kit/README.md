# Hearthroom sandbox kit

A small, dependency-free kit for cards on the sandbox chat page: a status block the model
writes at the end of each reply, a panel that draws it inside the bubble, a choices block
drawn as buttons, a theme preset with a dark and a light side, a dock with a settings drawer,
and a pinned bar in the function bar. `build.mjs` turns one config into display rules and
can emit the model-side protocol from the same schema, so what the model is told to write and
what the screen draws cannot drift apart. It runs on the sandbox author API only.

The story comes first: the kit draws what the model already wrote and never asks for more.
Read `../../references/sandbox-kit.md` for the method (why the panel lives in the bubble,
why the function bar is static, why scripts must be re-entrant, when not to use the kit).
This file is the manual.

## Files

| Path | What |
|---|---|
| `kit/hr-core.js` | `window.HR`: event registry with unsubscribe, settled hook, DOM helpers, one durable store (`sdk.save` → `sdk.cache` → memory), `HR.send`, `HR.t` |
| `kit/hr-status.js` | the status and choices blocks: parser, type ladder, schema, renderer, hydration on mount/done and on later changes |
| `kit/hr-theme.js` | player preferences on top of the preset (text size, line height, motion, density) |
| `kit/hr-ui.js` | choices (draft or send), dock + drawer, settings pane, pinned bar, toast, stage helper |
| `kit/hr-base.css` | structure for all of the above; colours come from `--hr-*` tokens |
| `presets/*.json` | three presets, both sides, contrast-checked: `quiet-reading`, `dense-status`, `expressive` |
| `kit.config.example.json` | the build input, documented inline |
| `build.mjs` | config → rules merged into a card's `rules.json`; `--emit-contract` prints the model-side protocol |

## Use

```bash
cp <toolkit>/assets/sandbox-kit/kit.config.example.json my-card/kit.config.json   # edit it
node <toolkit>/assets/sandbox-kit/build.mjs --config my-card/kit.config.json --emit-contract   # paste into outputContract
node <toolkit>/assets/sandbox-kit/build.mjs --config my-card/kit.config.json --card my-card
node <toolkit>/scripts/check-card.mjs my-card
hearthroom card push my-card --validate --json && hearthroom card render my-card --json
```

`build.mjs` keeps every other rule in `rules.json`, puts the kit rules first (`hr-style`,
`hr-kit`, `hr-status`, `hr-choices`, and `hr-pinned` when pinned fields are set), sets
`pageMode: sandbox` when it is missing, and refuses to write when a replacement is over
128 KiB or a preset pair fails the contrast checks (`--force` overrides; `--check` only
checks). `--emit-contract` prints the paragraph for `card.json` `outputContract` (or the
definition): the required keys with their shapes, the volatile keys, how values move
(`rule` per field), the choices instruction, and an example of an ordinary turn, in the
card's language (`language` in the config: `en` or `zh-Hant`; a schema written in CJK is
taken as zh-Hant when the key is missing). On a non-English card give every field an
`example` in that language: a field without one gets a generic sample the model copies, and
the emitter warns. Put the same block at the end of `welcome.md`.

## The status block

The model ends a reply with:

```
[status]
hp: 72/100
mood: wary
allies: Mara=61, Tove=25
tags: poisoned, tired
[/status]
```

One `key: value` per line, square brackets, after the prose. The closing marker is optional
for the display rule (a model that drops it still gets a panel). The value's shape decides
how it is drawn (first match wins):

| Value | Drawn as | Example |
|---|---|---|
| number | number | `gold: 380` |
| `n%` or `a/b` | bar | `hp: 72/100`, `progress: 40%` |
| `name\|a/b` | level with a bar | `rank: Adept\|120/300` |
| `k:v\|k:v` | key-value list (`k:v:note` adds a note opened by tap) | `gear: head:hood\|body:cloak:+2 armour` |
| `k:v k:v` or `k:v, k:v` | stat chips | `stats: atk:12 def:8 agi:15` |
| `name=number, …` | entity chips | `trust: Mara=61, Tove=25` |
| `a, b, c` | tags | `tags: cold, watched` |
| `a > b > c` | path | `location: Harbor > North pier > Lamp room` |
| anything else | text | `mood: wary` |

Full-width punctuation and digits, list prefixes, bold keys, a missing closing marker,
duplicate keys (the later wins) and line breaks the Markdown pass turned into `<br>` are all
tolerated. A line without a colon is skipped. A single line `hp::85;;mood::shy` also parses,
so the same block can be drawn without any script by a rule that uses `$hp` and `$mood`.

The `schema` in the config names the fields to draw, in order, with `label`, forced `type`,
`tone` (`hp mp sp xp good warn bad`), `section`, `values` (allowed words for text fields),
`rule` (how the value moves, for the emitted contract), `hidden` (parsed, not drawn) and
`volatile` (scene-only: written while it applies, dropped when it stops; the emitted contract
lists it separately and the replay health does not count it as forgotten). Keys the schema
does not list are appended unless `strict` is true.

## The choices block

```
[choices]
- Ask about the keeper
- Light the lamp yourself
- Say nothing
[/choices]
```

One option per line (list markers and numbering are stripped). The display rule turns it
into buttons, plus a "✎ Write your own" button that only focuses the composer. Two modes,
set by `modes.choices` or by `uiRole` (`assist` → `draft`, `core` → `send`):

- `draft`: a tap puts the line into the composer and focuses it; the player edits or sends.
  Choices are drafts, not rails.
- `send`: a tap sends the line on the trusted click (no confirmation dialog). While the model
  writes, a tap shows a toast instead. A set in an older reply is disabled once a newer reply
  exists.

## Gated extras (off unless the config says why)

- `modes.intro: { title, line, begin, draft }` with `gates.intro: "<what the intro says that the opening does not>"`: a first-open screen on the full stage, shown once per card while the conversation has no player line (L2 only), one line and one button; never a restatement of the opening.
- `modes.page: "on" | "auto"` with `gates.page: "<why this card reads better as pages>"`: a full-page reading mode over the chat list (`hr-page.js`): one page per AI reply, the choices unlock at the bottom of the page, a page strip, a "writing…" indicator, one tap back to the chat. An assist card must still read well with it off; verify text-only and reading-first in the preview before shipping it.
- `node build.mjs --preset-from palette.json --name <name> [--out file]`: turns a flat palette (per side at least `bg`, `surface`, `text`, `accent`; `muted`, `border`, `on-accent` and the tones are derived) into a preset, refusing one that fails the contrast checks. Use it with a design system's export instead of hand-picking colours.

## Declarations the checker reads

`README.md` in the card folder (never sent) carries `uiRole: assist | core` and, for a core
card, `statusOverheadThreshold: <percent>` with a reason. `check-card.mjs --replay` reports
the status overhead ratio (block characters over reply characters), the block rate, missing
closers, drift (full-width punctuation, skipped lines) and the keys the model forgets, against
that threshold (15% by default for an assist card).

## Runtime API (`window.HR`)

- `HR.on(event, fn)` → unsubscribe function; `HR.once`, `HR.off`, `HR.emit`. Platform events
  (`message:done` …) are bridged from `sdk.on`; handlers receive `(payload, bubble)` with the
  bubble captured synchronously. Kit events: `settled`, `state` (a parsed block from each
  finished AI reply), `theme`, `send:busy`, `dock:open`, `dock:close`.
- `HR.settled(fn)`: after the first screen is drawn (mount/done quiet for 400 ms); `ready` is
  not used because it is never replayed.
- `HR.store.get(name, fallback)`, `HR.store.set(name, value)`: one bundle in one `sdk.save` key
  (`hr`), merged and written at most every 800 ms; falls back to cache and memory when saves are
  unavailable. `HR.store.pick(obj, spec)` validates field by field.
- `HR.status.parse(text)`, `HR.status.parseChoices(text)`, `HR.status.latest()`,
  `HR.status.hydrate(root)`, `HR.status.config({ block, schema })`.
- `HR.theme.get()`, `HR.theme.set({ fontSize, lineHeight, motion, density })`, `HR.theme.reset()`.
- `HR.ui.choices()` (installed by the build), `HR.ui.hydrateChoices(root)`,
  `HR.ui.dock({ side, icon, label })` → `.add({ id, title, render(body) })`, `.openDrawer()`, `.close()`;
  `HR.ui.settingsPane()`; `HR.ui.pinned(keys, labels)`; `HR.ui.toast(text)`;
  `HR.ui.stage.open(mode, render)` / `.close()`.
- `HR.send(text)`: `sdk.message.send` in the same task as the click; resolves `true`/`false`.
- `HR.t(text)`: the player's Chinese script (`sdk.text.convert`).
- `HR.model()`: `{ name, cost }` from `sdk.model.get()` (empty strings on a page without it);
  `sdk.on('model:change', fn)` fires when either changes.

`extra.js` in the config runs after the kit and can use all of it: faces from a mood value,
a map from a location, badges — derived from `HR.status.latest()` or `HR.on('state')`, never
from extra markers.

## What the kit does not do

- Talk to the model. Nothing in a rule's replacement reaches the model; the protocol the
  model follows is the emitted contract, placed where the model reads.
- Keep a second copy of the status. The panel lives in the bubble (history stays readable);
  the pinned bar is one line of at most three values; the dock shows settings and your panes.
- Write `data-theme`. Dark or light is the platform's; a card in MMD format is locked to dark
  and never receives `theme:change`.
- Fetch anything. The sandbox page cannot.
- Break the read. Every element falls back to readable text when parsing fails or a script
  dies; a raw block is shown as text, never hidden.

## Verify

`node <toolkit>/scripts/check-card.mjs <dir>` for the rule set and the markers;
`--replay` with `hearthroom play --history --json` output for protocol health;
`hearthroom card render` for the opening after rules; `hearthroom card preview --check` to
drive the real shell in headless Chrome and get screenshots of every state, a captioned
contact sheet and `findings.json` (late hydration, a block never drawn, overflow, console
errors, story and UI share), with `--from-history` to stream real replies; `card preview
--open` to see it yourself, switch conversation, tap a choice in its mode and open the
dock; and rules off (`?rules=off`, included in `--check`), which an `assist` card must
survive.

Parts of the method here follow the sandbox-kit approach of the tavern-mmd project (MIT);
the code is written for Hearthroom.
