# Full-page layouts: screens, rotation and foldables

Load this reference only when a sandbox card covers the whole chat page with
its own layout (a book, a dossier, a stage). It carries no platform fact;
the browser and vendor behaviour below comes from browser and vendor
documentation and from testing on a few devices, not from the facts sheet.
Verify on a device before calling any of it checked, and report
"verified in simulation" until a tester has.

A full-page card is `uiRole: core` by construction: it must keep every reply
readable when its script fails, and it must pass the reading-first rules in
`presentation-design.md` before any of the layouts below is worth building.

## The chat list as transport

A sandbox card may cover the page and leave the message list underneath as
the transport.

- A fixed overlay below the site header, sized to the visual viewport so the
  keyboard does not hide it. The composer and the list keep working below.
- One page per reply, built from the rendered message and cached per
  conversation (see the facts on message ids and the virtualised list).
  While a reply streams, draw it from `message:stream`; before the reply
  mounts, show the player's line on a pending page so the tap visibly did
  something.
- When a script cuts a block out of the reply text (`[status]` up to
  `[/status]`, or to the end while it streams), do not end the pattern with
  `$` under the `m` flag: `$` then matches at the end of the opening marker's
  own line and the block reads as empty on every page. Use `(?![\s\S])`
  for "end of text", and test the pattern on a full reply and on one cut off
  before the closing marker.
- A tap that sends a line spends credits: show what will be sent and let the
  player confirm, rewrite or cancel. While the model writes, show that it is
  writing inside the overlay, because the overlay hides the list's own
  indicator.
- Effects the site would draw on `author-stage` are drawn inside the overlay
  when it covers the stage. Keep a switch back to the plain chat page.
- A page built from a copy of the rendered message (or from a cached copy)
  misses whatever the script adds to the message later, such as portraits
  and badges. Run the same hydration on the page after drawing it.
- Every component with a lookup (a portrait by name, art by chapter) needs a
  designed fallback for the miss, and a preview sample that hits it: the
  model will introduce minor characters that no table knows.
  When the key is free text the model writes, let the most specific match
  win over a broader one that contains it, and check the lookup against
  values real replies wrote.
- When the overlay takes the whole page, hide the site header as well and
  keep one bar, or the screen shows two title bars. Forward back and
  fullscreen to the header's own buttons (facts sheet, `data-lt` hooks), so
  navigation and fullscreen stay the site's. Keep the way out of the card
  easy to find and hard to hit by accident. Automatic fullscreen pays off
  only on an Android phone in a browser tab, where the browser's bars take
  real height: the browser grants it only on a player gesture, so enter it
  on the first tap (once per page load), never re-enter after the player
  leaves it, and let them turn it off. It is pointless in the Hearthroom App
  and in an installed web app (already full height), rarely works in
  WebViews and in-app browsers, and is unavailable on iOS; show the toggle
  only where it can work and the hook exists.

The rest of this section is principles. They say what a full-page screen
must protect, not what it should look like: the look, the metaphor (a book,
a console, a stage, a desk) and the mechanics are the card's own invention.

- One focus at a time. Reading and spectacle compete for the same eyes: do
  not animate one area while the player reads another, and never let two
  things move for attention at once. Let the player set the pace (the text
  advances when they ask; an automatic mode waits for the text to be fully
  shown and then holds it for its own reading time, never a fixed clock),
  and keep a full-text view of the page with an obvious way back.
- Use the space each shape gives. The same reply fills a short phone and
  leaves most of a tall or wide screen empty; decide per shape what earns
  the remaining room (more of the story, context, the scene, the tools of
  the core loop) instead of designing for one phone and stretching it. Test
  every shape in the table below, and the traps after it.
- Anything chosen from the reply's words (a scene, a portrait, who is on
  screen) is chosen once that part of the reply is complete: guessing from a
  half-streamed text flips between pictures. Change visuals gently, and
  avoid large areas that alternate frame by frame.
- Do not make the page guess structured facts from prose (who is present,
  where, what changed): real replies rename, merge and move things, and no
  keyword table survives that. Let the model declare what the screen needs
  in a short, closed form (a status line, a stage direction), keep inference
  only as the fallback for a reply that drops it, and test that a weak model
  keeps writing it. Test with real replies, not hand-written samples: feed a
  `play --history` export through the preview.
- A visual panel earns its space by reflecting the story or feeding the
  loop; a picture that never changes with the story is decoration. Show
  only what the story has established (never a character, place or form it
  has not reached), and let numbers the reply already writes drive what
  moves. How the panel reacts is for the card to invent.
- What stays on screen permanently must serve the card's core loop and give
  the player something to act on; values the player cannot affect belong
  where decisions are reviewed. Never put two controls that do the same
  thing side by side on a small screen.
- Do not take a moment away from the player with a timer; what the browser
  gates behind a gesture (fullscreen, sound) starts from the player's tap.
- A tool that helps the player compose an action must not claim to know
  what the model will decide, and must respect the card's own rules.
- Adapting to a screen shape changes the framing, never what is shown.
- `container-type` (and other containment) makes an element the containing
  block for its fixed-position descendants: a "full screen" child of a
  container-query box scrolls with the page on Android and collapses on
  iOS. Move the node to the overlay's root while it is full screen.
- Audio in the sandboxed frame starts suspended and runs only after a tap
  inside the frame. A card that plays sound gives the player a mute and
  plays no music by default under reduced motion.
- When the overlay covers the composer, hide the site's (`sdk.composer.hide()`,
  `show()` on the way back to the chat) and draw one input inside the overlay:
  a choice drafts into it, the send button calls `sdk.message.send` in the
  same task as the click, Enter sends only with a fine pointer and outside an
  IME composition. Keep the text until the send resolves, so a refused send
  loses nothing.
- A page that streams starts at its top and does not follow the stream to
  the bottom: the reader reads as the text arrives. Until the reply's state
  block arrives, keep showing the previous page's values rather than empty
  meters, and show the page's own values (not the latest) when the reader
  pages back.

## Choose the layout from the shape, not the device

| Shape of the available area | Layout | Choices |
|---|---|---|
| wide and landscape (desktop, tablet, foldable opened sideways) | two pages, the control page narrower | always shown on large screens; on smaller ones on the control page at the end |
| portrait, height under about 1.75 x width (A-series paper shapes, square-ish inner screens, small cover screens) | one page | side panel on request |
| tall phone | one page, header collapses while reading | bottom sheet at the end |
| short landscape (phone on its side, a foldable's cover screen sideways) | header in a side column, text at full height | side panel on request |
| half-folded, hinge horizontal (tent or laptop pose) | text on the upper half | lower half, always shown |
| half-folded, hinge vertical (book pose) | two pages, spine on the hinge | page after the hinge |

## Browser support for foldables (vendor documentation; verify on device)

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

## Apple's foldable guidance (vendor documentation, September 2026)

Apple's Human Interface Guidelines ("Designing for iPhone Duo") and the
developer article "Preparing your app for iPhone Duo" apply to web layouts
too:

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

## Layout traps found on these screens

- An on-screen keyboard shrinks the viewport, often below its width. A
  layout chosen from the viewport's shape then switches while the player
  types; rebuilding moves the focused input, it blurs, the keyboard closes,
  the viewport grows back and the layout switches again: a flash and no way
  to type. Keep the current layout while one of the card's inputs has focus
  and recompute after it blurs.
- The ratio alone misfiles small 16:9 phones: in a browser, after its bars
  and the site header, a 375 x 667 screen has about 375 x 510, under 1.75,
  so the table puts it in the row meant for A-series and cover screens. Add a
  width test: below about 420 px use the tall-phone row (bottom sheet at the
  end), and move controls to a trailing column only on wider screens.
- `overflow: hidden` does not stop programmatic scrolling: `scrollIntoView`,
  or the browser scrolling a focused input into view, can move a fixed
  overlay's own boxes and push its header off screen. Reset their
  `scrollTop` when they scroll.
- The site header's height depends on the chrome mode (facts sheet, "Chrome
  modes"); an overlay at `top: var(--shell-header-h, 45px)` leaves an empty
  strip when the host hides the header. Measure it, and run the harness in
  both its chrome modes.
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
- Full-screen live filters are the costliest thing a card can add on phones.
  When a foldable opens, closes or rotates, the browser reallocates the whole
  surface, and a full-viewport `filter: blur()` or a `drop-shadow` over a
  scrolling area is recomputed at device pixel ratio each time; Android
  Chrome in fullscreen can go black. Blur the background image at build time
  (a small, pre-blurred copy scales up smoothly), darken it with a plain
  overlay, use `box-shadow` for page shadows, and do not start a cross-fade
  because the layout changed. Coalesce resize, visual-viewport, observer and
  orientation events into one layout pass per frame, and pause animations
  until the size has settled. Profile first: a small DOM and an idle main
  thread point at the GPU, not at script.

## Verify

The offline preview (facts sheet, "Offline preview") offers phone, landscape
phone, unfolded (about 900x640), tablet and desktop sizes; screenshot each
with a reply streamed and a choice tapped, and the same page with the rules
disabled to see what a script failure leaves. Device checks are separate
evidence; say which you have.
