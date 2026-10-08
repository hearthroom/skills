# Presentation design

Presentation is not decoration. It should make the card easier to play: the
player sees the situation, the state that matters and the next action. The
model never sees the rendered result, so nothing the model must know may live
only in a rule's replacement.

## Story first

Players stay for the story; the screen exists to serve it. Every card
declares its UI role in its `README.md` (never sent): `uiRole: assist` when
the story is the product and the replies must read well with every display
rule disabled, or `uiRole: core` when the mechanics are bound to the
interface (a meter that is the game, a map, a deck); a core card keeps every
mechanic legible in the reply text, degrades to readable text when a rule or
script fails, and can say for each UI mechanic which choice or consequence it
changes. UI has five legitimate jobs: memory (what the reader cannot hold: a
ledger, a recap), making choices legible (what is at stake), pacing (reading
first, choices after), showing the world reacting (a struck-through line, a
changed face), and orientation (where, when, with whom). An element that does
none of these is decoration; cut it. Build the screen however the story
wants it; the only thing to watch is reaching for a default without noticing.
The defaults are: a status panel at the top or bottom of every reply, a dock
tab on the right edge with a settings drawer, HP-style bars for feelings or
relationships, two to four buttons after every reply, a HUD where an object
from the world (a letter, a stamp, a ledger line, a map the character is
holding) would carry the same state. Each of these is right for some cards;
when you find you used one, say in a sentence why this card wanted it. Choices are drafts, not rails: free input stays
first-class, a choice can be rewritten before it is sent, and the opening's
first action may be a button but never only a button. State tokens are taken
from the story: the status overhead ratio (characters of the status and
choices blocks over characters of the reply) is measured on real replies and
kept under the card's declared threshold (`statusOverheadThreshold:` in
`README.md`; 15% by default for an assist card; a core card declares its own
with a reason).

## The three layers

| Layer | Where it lives | Who sees it |
|---|---|---|
| Story content | `welcome.md`, `openings/*.md`, replies | player and model |
| Plain HTML and CSS inside content | the same files | player; the model sees the markup it wrote |
| Display rules | `rules.json` (`find` / `replace`, function bar, page mode) | player only |

Prefer plain prose or Markdown for the opening. Write ordinary HTML and CSS
when a bar, a fact row, a panel or a set of choices carries play value: a
one-off layout sits in the opening itself; repeated chrome and anything with
a script belong in a display rule in `rules.json`. The `hc-*` custom elements
are a legacy of the classic chat page; the sandbox page does not register
them, so do not write them for new cards.

Add display rules when the same visual pattern repeats every turn, or when
the card needs a script. The pattern the model repeats is a small
`[status]…[/status]` block at the end of the reply (`sandbox-kit.md`;
canonical form in `state-economy-design.md`). Square brackets, because a
script that reads the bubble after the sanitizer would never see an unknown
angle-bracket tag, and because the Markdown pass can join lines: a rule that
consumes `<scene>` works, a script that looks for it later does not.

## Choosing the chat page

- New cards default to the sandbox page. Use it whenever the card has scripts,
  a status panel that reads message state, sidebars, saves across devices, or
  a restyled screen. The author API (`sdk`, `[data-chat]` nodes, `--chat-*`
  variables, events) is in the facts sheet.
- Use the classic page only for an existing card that misbehaves in the
  sandbox. On the classic page the sandbox API does not exist.
- `cardFormat` matters for themes: `mmd` (the default) locks the card to the
  dark theme and never receives `theme:change`; `tavern` follows the player's
  light or dark setting (facts sheet).
- `hearthroom card render --json` reports, under `report.unsupported`, every
  sandbox identifier a classic-page card uses, with the hint to switch. It also
  reports MMD's platform state variables, which no page provides.

## What to show

1. Two to five values the player acts on, decided with
   `hearthroom-state-economist`; not a dashboard.
2. Declare `uiRole` and the overhead threshold in `README.md`.
3. Write the status contract into the output contract (or the definition) and
   the first block into the opening; the model, not the rule, owns what the
   block says (render rules are not generation rules).
4. Build the panel, the theme, the pinned bar and the choices with
   `hearthroom-sandbox-kit`; it draws the block inside the bubble, never a
   second copy in the function bar.

## Status panels, themes and chrome: the sandbox kit

For a status panel, a theme, a settings drawer, a pinned bar or choice
buttons on the sandbox page, use the toolkit's own kit
(`../assets/sandbox-kit/`, method in `sandbox-kit.md`, skill
`hearthroom-sandbox-kit`). It draws the `[status]` block the model already
writes, inside the bubble, from a schema; it ships a preset with a dark and a
light side that is contrast-checked at build time; it runs on the sandbox
author API only. The build merges its rules into `rules.json`; the local
checker (`../scripts/check-card.mjs`) and the offline preview (facts sheet)
show whether it works before a push. Kits written for other platforms still
import; the differences and the checks are in `sandbox-kit.md` ("Importing a
kit written for another platform").

## Derive the screen from what the model already writes

The strongest presentation adds no work for the model. Faces, colours, maps,
struck-through lines, badges and scene art can all be computed by the rule
script from markers the reply already carries (a meter value, a scene title,
a quoted line). Reactions the model should not spend tokens on (the narrator
noticing the player hovering over a choice, idling, cancelling twice) can be
written once in the script and labelled as outside the story. Every such
effect must serve what the scene is about; a feature with no tie to the
card's core loop is decoration, whatever it costs to build.

When the screen shows the player's own in-world words, take them from the
message the player sent: a model may answer them without repeating them, so
a display that waits for the echo loses the player's line.

A marker the model must repeat at every change (a new scene line when the
place changes) is the line it drops most often, weak and strong models alike.
Before adding another rule, give the screen a fallback from data the model
writes every turn (the status block's location field, the prose after the
transition), and use the marker only when it is there. Parse markers
tolerantly: models in CJK cards write full-width brackets and colons
(`［演出：命名］` for `[演出: 命名]`), extra segments in a header, or a few
stray characters before it; a strict pattern loses the effect and shows the
marker as prose.

A title drawn in mixed sizes (large keywords, small particles) with an
outline per glyph lets each glyph's outline paint over the one before it.
Outline the whole word or line as one silhouette, the way print logos draw a
shared outline: an SVG filter on the group that blurs the letters' alpha and
cuts it at a low threshold gives a smooth ring (stack two for white then dark).
Offset copies in four directions (`drop-shadow` chains) leave jagged corners
on serifs and diagonals. A heavy Mincho has hairline horizontals at logo size;
copies shifted only up and down in the ink colour thicken the horizontals and
keep the serifs, where an even stroke blurs the whole face toward a gothic.
Do not put an overlay (a sweeping shine box) inside the filtered group: the
filter outlines its rectangle too.

A web font loaded for a few glyphs (`fonts.googleapis.com/css2?...&text=`)
registers under the font's real family name with no `unicode-range`, so for
that weight it claims every character: glyphs outside the subset skip the
rest of the family and fall to the next font in the stack, and one word
renders half in one face, half in another. Do not load a `text=` subset of a
family the page also uses.

Give CJK cards their own web fonts instead of relying on system fallbacks:
phones differ, and one that has a real bold in one fallback font and only a
synthesised bold in another mixes weights inside one line. Google Fonts serves
Noto Sans/Serif TC and SC sliced by `unicode-range`, so loading both cuts with
the weights in use downloads only the characters on screen; list both (the
site may show Simplified) ahead of any system font.

Icon buttons: draw the icon as inline SVG centred in a grid cell, not as a
text glyph (↺, ⤢, ⛶, an emoji). A glyph's box and baseline differ per font,
so on some phones the symbol sits low or to one side of its button.

Serif or sans on screen: Mincho/Song reads best in long text, sans is easier
to see at small sizes. Novel-style cards set the story text in a serif at
16px or more and display type of about 18px or more in a heavy serif. Labels,
buttons, tabs and numbers below that are sans, because serif hairlines vanish
at small sizes. A smaller text-size setting that drops the story below 16px
switches it to sans.

## Reading first, choosing second

A reply is read before it is answered. On every screen:

- Show the choices only when the reader has reached the true end of the
  reply (a few pixels from the bottom), or when they ask for them.
- Revealing choices must not shrink or cover text the reader has not read.
  Float the choice panel over the page and scroll the text up so the last
  line sits just above it; do not re-expand a collapsed page header at the
  same moment.
- A panel that would cover the text beside it (a side panel) never opens by
  itself; at the end of the reply its tab only draws attention.
- Every panel closes by an explicit button and by swiping it back out. Once
  the reader closes it, it does not reopen until they scroll well away (a
  share of the scrollable distance, not a fixed pixel count, since short
  replies barely scroll) and come back.
- On a two-page layout the page opposite the text is the control area: it
  keeps the scene art and state while the reader reads, and turns into the
  choice list at the end. The reading page is never covered.
- While the model is replying, close every panel and show one "writing"
  indicator, in the page. A panel that reopens because the reply page is not
  in the reading state shows a second indicator and covers the text.

A card that covers the whole page (a book, a dossier, a stage) is planned
with `full-page-layouts.md`, after it has passed these rules and the
`uiRole: core` tests.

## Presentation packet

```text
Presentation:
- uiRole: assist | core (for core: each UI mechanic and the choice or consequence it changes)
- what the player must see first:
- opening format: prose | prose + html blocks | html
- state shown: (field, why it matters, where it comes from)
- state hidden or dropped:
- status overhead: ratio on the sample replies / declared threshold
- display rules: (rule name, marker it consumes, what it draws)
- function bar:
- page mode: sandbox | classic (reason); cardFormat: mmd (dark only) | tavern (both themes)
- scripts and saves: none | (what they do; sandbox only)
- kit used: none | sandbox kit (modes, preset) | imported (source)
- choices: none | [choices] block → buttons, draft (tap fills the input) | send (tap sends)
- layouts: (area shape, layout, where the choices appear)
- render plan: check-card → card render → offline preview screenshots at
  390x844 and 1280px (both themes when tavern), a short landscape phone and a
  square-ish unfolded screen for a full-page card → the play page
- hand-off:
```

## Do not

- Do not hide instructions to the model inside a rule's replacement; the
  model never sees it.
- Do not put durable rules of the world into the opening to make a panel
  look full; the definition and the Lorebook carry them.
- Do not use decorative meters for text states such as location or route;
  use a fact row or a tag.
- Do not draw the status twice (in the bubble and in the function bar); a
  pinned bar is one line of at most three values.
- Do not write `hc-*` markup for new cards.
- Do not build a full-page layout for an `assist` card whose replies do not
  already read well as plain text.
