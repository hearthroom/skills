# Presentation design

Presentation is not decoration. It should make the card easier to play: the
player sees the situation, the state that matters and the next action. The
model never sees the rendered result, so nothing the model must know may live
only in a rule's replacement.

## The three layers

| Layer | Where it lives | Who sees it |
|---|---|---|
| Story content | `welcome.md`, `openings/*.md`, replies | player and model |
| Plain HTML and CSS inside content | the same files | player; the model sees the markup it wrote |
| Display rules | `rules.json` (`find` / `replace`, function bar, page mode) | player only |

Prefer plain prose or Markdown for the opening. Write ordinary HTML and CSS
when a bar, a fact row, a panel or a set of choices carries play value: a
one-off layout sits in the opening itself; repeated chrome and anything with
a script belong in a display rule in `rules.json`. A button that sends a
player line is a plain `<button>` in a display rule whose script calls
`sdk.message.send(text)` (sandbox page). The `hc-*` custom elements are a
legacy of the classic chat page; the sandbox page does not register them, so
do not write them for new cards.
Add display rules when the same visual pattern repeats every turn (a status
bar, a scene header, a panel that the model emits as a small marker such as
`[status]hp::85;;mood::shy[/status]`; square brackets survive the sandbox sanitizer, unknown angle-bracket tags do not), or when the card needs a script.

## Choosing the chat page

- New cards default to the sandbox page. Use it whenever the card has scripts,
  a status bar that reads message state, sidebars, saves across devices, or a
  restyled screen. The author API (`sdk`, `[data-chat]` nodes, `--chat-*`
  variables, events) is in the facts sheet.
- Use the classic page only for an existing card that misbehaves in the
  sandbox. On the classic page the sandbox API does not exist.
- `hearthroom card render --json` reports, under `report.unsupported`, every
  sandbox identifier a classic-page card uses, with the hint to switch. It also
  reports MMD's platform state variables, which no page provides.

## Designing a status bar

1. Decide the state with `hearthroom-state-economist` first: two to five
   values the player acts on, not a dashboard.
2. Make the model emit one compact marker at the end of each reply. Put that
   instruction in the definition (or the output contract) and, if the card has
   a Lorebook, in a constant entry so it survives long play.
3. Write one rule: `find` matches the marker with a capture, `replace` renders
   it with `$name` fields in plain HTML and CSS. Keep the rule under the size
   limits in the facts sheet.
4. Put the trigger words for pinned panels in the function bar
   (`mountTrigger`) and let rules expand them.
5. Run `hearthroom card render` and check every rule is `applied`, then open
   the play page on a phone width and a desktop width.

## Beautification kits from MMD and SillyTavern

Hearthroom's sandbox author API is identical to the new-style sandbox on Meimo
Island (MMD), and `card import` reads the MMD three-file set and SillyTavern
cards. A kit written for MMD's sandbox therefore runs on Hearthroom as is;
a kit written for MMD's older page (rules applied on the chat page, `img
onerror` boot) also works, on either page, because `onerror` boot scripts run
on both.

For status bars, global themes, floating panels and full custom chat pages,
route to the open-source `tavern-mmd` skill
(https://github.com/yofengi/tavern-mmd) rather than re-deriving that craft:

- `/mmdsandbox` + `/beautify` produces a six-key rules file (`chatVersion: 1`)
  that `hearthroom card import` turns into `rules.json` with
  `pageMode: sandbox`.
- `/mmd` + `/beautify` produces the four-key rules file for the older page;
  import it, then set `pageMode` to `sandbox` unless the author wants classic.
- `/st` produces SillyTavern output; import the card or the regex JSON.

After any import: `card push --validate`, then `card render --json`. The only
identifiers expected under `report.unsupported` for a sandbox card are
`sdk.vars` and `<abc_vars>`; anything else means the kit targeted the wrong
page. Do not copy that skill's files into this toolkit; reference it.

## Derive the screen from what the model already writes

The strongest presentation adds no work for the model. Faces, colours, maps,
struck-through lines, badges and scene art can all be computed by the rule
script from markers the reply already carries (a meter value, a scene title,
a quoted line). Reactions the model should not spend tokens on (the narrator
noticing the player hovering over a choice, idling, cancelling twice) can be
written once in the script and labelled as outside the story. Every such
effect must serve what the scene is about; a feature with no tie to the
card's core loop is decoration, whatever it costs to build.

## Full-page layouts: the chat list as transport

A sandbox card may cover the whole chat page with its own layout (a book, a
dossier, a stage) and leave the message list underneath as the transport.

- A fixed overlay below the site header, sized to the visual viewport so the
  keyboard does not hide it. The composer and the list keep working below.
- One page per reply, built from the rendered message and cached per
  conversation (see the facts on message ids and the virtualised list).
  While a reply streams, draw it from `message:stream`; before the reply
  mounts, show the player's line on a pending page so the tap visibly did
  something.
- A tap that sends a line spends credits: show what will be sent and let the
  player confirm, rewrite or cancel. While the model writes, show that it is
  writing inside the overlay, because the overlay hides the list's own
  indicator.
- Effects the site would draw on `author-stage` are drawn inside the overlay
  when it covers the stage. Keep a switch back to the plain chat page.

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

## Screens, rotation and foldables

Choose the layout from the available size and shape, never from a device
name or from orientation alone.

| Shape of the available area | Layout | Choices |
|---|---|---|
| wide and landscape (desktop, tablet, foldable opened sideways) | two pages, the control page narrower | always shown on large screens; on smaller ones on the control page at the end |
| portrait, height under about 1.75 x width (A-series paper shapes, square-ish inner screens, small cover screens) | one page | side panel on request |
| tall phone | one page, header collapses while reading | bottom sheet at the end |
| short landscape (phone on its side, a foldable's cover screen sideways) | header in a side column, text at full height | side panel on request |
| half-folded, hinge horizontal (tent or laptop pose) | text on the upper half | lower half, always shown |
| half-folded, hinge vertical (book pose) | two pages, spine on the hinge | page after the hinge |

Browser support for foldables:

- Chrome and Chromium browsers on Android expose `window.viewport.segments`
  (Chrome 138; an earlier trial used `visualViewport.segments`) and
  `navigator.devicePosture` with `folded` and `continuous` (Chrome 131). CSS
  has `device-posture`, `horizontal-viewport-segments`,
  `vertical-viewport-segments` and `env(viewport-segment-*)`.
- Safari has neither in release builds. On iPhone foldables the card can
  only see the viewport size.
- Inside the sandbox iframe the segments are often not reported even when
  the posture is. The hinge direction then has to be inferred: on an
  elongated screen (long side at least 1.3 x the short side) the hinge
  halves the long side whatever the rotation; on a near-square screen the
  hinge is vertical at the screen's natural rotation (0 or 180 degrees) and
  horizontal at 90 or 270. A rule based on aspect ratio alone gets one family
  of devices exactly backwards.
- Offer a manual setting (automatic, top and bottom, left and right, off) and
  print the detection result (viewport, rotation, posture, segment count,
  chosen layout) in the card's settings, so a tester can report it from a
  device you cannot emulate.

Apple's guidance for its foldable iPhone (Human Interface Guidelines,
"Designing for iPhone Duo", and the developer article "Preparing your app
for iPhone Duo", both September 2026) applies to web layouts too:

- Sizes: the outer display is 466 x 678 points and the inner display
  669 x 951, both close to the A-paper ratio; half of the inner display is
  roughly the outer one. Test those sizes, minus the browser's own bars.
- The outer display is wider and shorter than other iPhones, so toolbars and
  tab bars move to the trailing side to keep vertical space for content; they
  stay on the side on the inner display in landscape, and only the inner
  display in portrait keeps horizontal bars. On a short screen, move headers
  and controls into a side column rather than stacking them above the text.
- Do not build a layout per pose; let one compact and one regular layout
  expand. Keep controls in similar relative positions across poses, keep
  text and control sizes as constant as possible, and prefer small
  adjustments over rearranging when the device folds.
- When the device is partly folded, the fold is a reserved region that
  divides the display; keep controls and text out of it. Split layouts move
  their panes to equal widths on either side of the fold (a narrower leading
  pane when fully open), and an overlay layout sends its primary view to the
  trailing or bottom part of the fold and the secondary view to the leading
  or top part.
- Controls that belong to one pane stay with that pane; controls for the
  main content go along the trailing edge.

The guideline pages are rendered by script; their text is available as JSON
at `https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<page>.json`,
and developer articles at `https://developer.apple.com/tutorials/data/documentation/<path>.json`.

A two-page layout reads as a book only when both pages are the same width,
open or half-folded; give the whole spread a maximum width instead of letting
one page grow. With two pages, the header should look like a book's running
head (chapter title centred, quiet tabs) and drop state that the pages
already show.

Small layout traps found on these screens:

- `letter-spacing` adds space after the last character, so centred spaced
  text sits left of centre; add an equal `text-indent`.
- A column with `justify-content: center` clips its top when the content
  overflows; use `safe center`.
- A scrolling child of a flex column needs `min-height: 0`, or it pushes the
  rows after it (page controls, a close button) off screen on short
  viewports.
- A state rule written for another mode (an "expanded" or "peek" class) can
  reset the scroll container's `overflow` to `visible`; touch scrolling then
  passes to the page behind. Check the computed `overflow-y` of every panel
  list in every state, at a short height.
- `flex-basis: 0` does not give equal columns when the columns have
  different padding; give each page an explicit share of the width.

## Presentation packet

```text
Presentation:
- what the player must see first:
- opening format: prose | prose + html blocks | html
- state shown: (field, why it matters, where it comes from)
- state hidden or dropped:
- display rules: (rule name, marker it consumes, what it draws)
- function bar:
- page mode: sandbox | classic (reason)
- scripts and saves: none | (what they do; sandbox only)
- kit used: none | tavern-mmd <command>
- layouts: (area shape, layout, where the choices appear)
- render plan: card render, then the play page at 390x844, a short landscape
  phone, a square-ish unfolded screen (about 900x640), 1280px desktop
- hand-off:
```

## Do not

- Do not hide instructions to the model inside a rule's replacement; the
  model never sees it.
- Do not put durable rules of the world into the opening to make a panel
  look full; the definition and the Lorebook carry them.
- Do not use decorative meters for text states such as location or route;
  use a fact row or a tag.
