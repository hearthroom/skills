# Hearthroom sandbox kit

A small, dependency-free kit for cards on the sandbox chat page: a status block the model
writes at the end of each reply, a panel that draws it inside the bubble, a theme preset with
a dark and a light side, a dock with a settings drawer, a pinned bar in the function bar, and
choice buttons that send a player line. It is built into three display rules by `build.mjs`
and runs on the sandbox author API only (`sdk.*`, `[data-chat]`, `[data-slot]`, `--chat-*`).
Nothing here needs a platform feature the facts sheet does not list.

Read `../../references/sandbox-kit.md` for the method (why the panel lives in the bubble,
why the function bar is static, why scripts must be re-entrant). This file is the manual.

## Files

| Path | What |
|---|---|
| `kit/hr-core.js` | `window.HR`: event registry with unsubscribe, settled hook, DOM helpers, a single durable store (`sdk.save` → `sdk.cache` → memory), `HR.send`, `HR.t` |
| `kit/hr-status.js` | the status block: parser, type ladder, schema, renderer, hydrate on mount/done |
| `kit/hr-theme.js` | player preferences on top of the preset (text size, line height, motion, density) |
| `kit/hr-ui.js` | dock + drawer, settings pane, pinned bar, choices, toast, stage helper |
| `kit/hr-base.css` | structure for all of the above; colours come from `--hr-*` tokens |
| `presets/*.json` | three presets, both sides, contrast-checked: `quiet-reading`, `dense-status`, `expressive` |
| `kit.config.example.json` | the build input, documented inline |
| `build.mjs` | config → rules (`hr-style`, `hr-kit`, `hr-status`, optional `hr-pinned`) merged into a card's `rules.json` |

## Use

```bash
cp <toolkit>/assets/sandbox-kit/kit.config.example.json my-card/kit.config.json   # edit it
node <toolkit>/assets/sandbox-kit/build.mjs --config my-card/kit.config.json --card my-card
node <toolkit>/scripts/check-card.mjs my-card
hearthroom card push my-card --validate --json && hearthroom card render my-card --json
```

`build.mjs` keeps every other rule in `rules.json`, puts the kit rules first, sets
`pageMode: sandbox` when it is missing, and refuses to write when a replacement is over
128 KiB or a preset pair fails the contrast checks (`--force` overrides; `--check` only checks).

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

One `key: value` per line. Square brackets, because the sanitizer strips unknown angle-bracket
tags and a script that reads the bubble afterwards would never see `<status>`. The value's
shape decides how it is drawn (first match wins):

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

Full-width punctuation and digits, list prefixes, bold keys, a missing closing marker and
duplicate keys (the later wins) are tolerated. A line without a colon is skipped. A single
line `hp::85;;mood::shy` also parses, so the same block can be drawn without any script by a
rule that uses `$hp` and `$mood`.

The `schema` in the config names the fields to draw, in order, with labels, forced types,
tones (`hp mp sp xp good warn bad`), sections and `hidden` fields; keys the schema does not
list are appended unless `strict` is true. The kit never tells the model what to write: the
block's keys, allowed values and cadence belong in the definition or the output contract,
and the block must appear in the opening. `check-card.mjs` reports a rule that consumes a
marker the model is never told to emit.

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
- `HR.status.parse(text)`, `HR.status.latest()`, `HR.status.hydrate(root)`, `HR.status.config({ block, schema })`.
- `HR.theme.get()`, `HR.theme.set({ fontSize, lineHeight, motion, density })`, `HR.theme.reset()`.
- `HR.ui.dock({ side, icon, label })` → `.add({ id, title, render(body) })`, `.openDrawer()`, `.close()`;
  `HR.ui.settingsPane()`; `HR.ui.pinned(keys, labels)`; `HR.ui.choices()`; `HR.ui.toast(text)`;
  `HR.ui.stage.open(mode, render)` / `.close()`.
- `HR.send(text)`: `sdk.message.send` in the same task as the click; resolves `true`/`false`.
- `HR.t(text)`: the player's Chinese script (`sdk.text.convert`).

`extra.js` in the config runs after the kit and can use all of it.

## Choices

```html
<div class="hr-choices"><button class="hr-choice">Ask about the keeper</button><button class="hr-choice">Say nothing</button></div>
```

A tap sends the button's text (or its `title`). Add `hr-choices--confirm` to the container to
require a second tap. Spent sets fade; sets in older replies are disabled once a newer reply
exists. While the model writes, a tap shows a toast instead of sending.

## What the kit does not do

- Talk to the model. The screen is derived from what the model already wrote; nothing in a
  rule's replacement reaches the model.
- Keep a second copy of the status. The panel lives in the bubble (history stays readable);
  the pinned bar is one line of at most three values; the dock shows settings and your panes.
- Write `data-theme`. Dark or light is the platform's; a card in MMD format is locked to dark
  and never receives `theme:change`.
- Fetch anything. The sandbox page cannot.

## Verify

`node <toolkit>/scripts/check-card.mjs <dir>` for the rule set; `hearthroom card render` for
the opening after rules; the offline preview in the chat page's repository
(`bench/card-preview`, see the facts sheet) to see the real shell draw it with streaming,
late hydration, a conversation switch and the dock.

Parts of the method here follow the sandbox-kit approach of the tavern-mmd project (MIT);
the code is written for Hearthroom.
