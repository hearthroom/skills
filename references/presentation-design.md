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
5. A full-page card hides the site's save list: give players saves in the
   card's own screen on `sdk.archive` (server-side, across devices, the
   site's limit; `platform-facts.md`), confirmed in the card's own tap, each
   save titled from the state block. Players fill the slots fast: offer a
   name field, rename and delete (two taps) as well as load.

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
Give the screen a fallback from data the model writes every turn (the status
block's location, the prose after the transition) and use the marker when it
is there. Parse markers tolerantly: CJK replies bring full-width brackets and
colons (`［演出：命名］` for `[演出: 命名]`) and stray characters, and a strict
pattern shows the marker as prose. Normalise half-width punctuation next to
CJK text (models differ, and a model switch mid-story shows), and drop lines
carrying HTML: models invent status panels that print the hidden numbers.
A speaker the cast table does not know must not leave the spotlight on the
previous speaker: map the labels a model uses for an unnamed lead ("the
girl", "???") to her sprite, and light no one for anyone else. When the
engine sends a numbered storyboard, ask for the order without the labels
and drop copied heading lines.

Generated music follows the same split as the screen: write a score (each
part its own line: chord tones on strong beats, passing tones between, the
countermelody moving when the melody holds, no parallel fifths with the
bass) and orchestrate it separately, so a mood change re-voices the same
score instead of cutting to another tune. Change key over several bars
(the old theme thins out, a pivot chord, a dominant pedal) and cross-fade
ensembles over bars, not seconds. Balance by orchestration (doubling,
divisi, register spacing) and check band energy of a recording: a part that
sounds too bright is often the only one living in its register. Interface
glow breathes slowly; pulsing it on the beat reads as a broken light.

Type and art on phones:

- Give CJK cards web fonts for both scripts and every weight in use; system
  fallbacks mix real and fake bold. One weight (a logo's 900) or a `text=`
  subset serves every stack naming the family: body text goes bold or splits.
- Serif suits long text and fades small; labels and numbers read best in sans.
- Icon buttons hold their icon as inline SVG; a text glyph sits off-centre
  on some phones.
- Android Chrome flickers a WebGL canvas when it or an ancestor carries a
  filter, mask or backdrop-filter, when an ancestor's transform changes by
  fractions every frame (gyroscope parallax: round, write on change, add a
  dead zone), or when the canvas is sized from getBoundingClientRect during
  a transform animation (use offsetWidth). Fade with the canvas's opacity.
- Safari drops a group's outline filter, at random, from a child still
  animating inside it: animate the filtered element, keep its children still.
- An effect laid over something painted in the art follows the painted
  shape, perspective included; an upright box drifting off a painted window
  reads as a mistake.

## The wait is part of the turn

A long-context turn takes tens of seconds to minutes; whatever the page
decides at the click (roll, reaction, event) is known then, only the prose
waits. Spend the wait from that same data, so the text cannot contradict it:
the character reacts at the click (face, posture, a camera push or shake);
crew lines follow the result; an optional costed action (observe her, a
reading that leans true but is not the answer); `message:stream` plays as
it arrives, accepting only replies newer than this send; a long wait earns a
summary of what the player has already seen. Signals to read rather than
numbers (where she stands, what her eyes return to) come from the same draw
as any text about them and can be acted on (a noted lead becomes a choice
that fills the draft). An idle player gets one nudge in character, then one
from the crew, outside the story. Keep the honest status line. Generated
music can wait too: past a few seconds stop advancing the form and hover
without the tonic (subdominant, then a dominant pedal), and cadence home on
the bar the reply lands, so the arrival is heard as well as seen.

## Reading first, choosing second

A reply is read before it is answered. On every screen:

- Choices appear when the reader reaches the true end of the reply or asks
  for them, and revealing them never shrinks or covers text not yet read.
- A panel that would cover text never opens by itself. Every panel closes by
  a button and by swiping it away, and stays closed until the reader has
  moved well away and come back.
- On a two-page layout the page opposite the text is the control area (scene
  and state while reading, choices at the end); the reading page is never
  covered.
- While the model replies, panels close and one "writing" indicator shows in
  the page.

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
