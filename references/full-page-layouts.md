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
- When the overlay takes the whole page, hide the site header as well and
  keep one bar, or the screen shows two title bars. Forward back and
  fullscreen to the header's own buttons (facts sheet, `data-lt` hooks), so
  navigation and fullscreen stay the site's. Put the menu button at the
  outer edge and the way out of the card inside the menu, as a game's exit
  item: a back arrow beside the menu crowds the corner and is easy to hit by
  mistake. Automatic fullscreen pays off only on an Android phone in a
  browser tab, where the browser's bars take real height: enter it on the
  player's first tap (once per page load), never re-enter after they leave
  it, and offer a setting to turn it off. Skip it in the Hearthroom App and
  in an installed web app (already full height), in WebViews and in-app
  browsers (fullscreen rarely works there), and on iOS and desktops. Show
  the toggle itself only in a browser tab on Android or a desktop, and only
  where the hook exists.
- Art chosen from the reply's words (a scene, a portrait) is chosen once the
  reply is complete: guessing from half a streamed text flips between two
  pictures several times a second. Change it with a short crossfade, not a
  cut. A "running" sprite bobs; flipping it to its mirror image every few
  frames reads as two pictures flashing. Move one layer at a time (a
  scrolling ground under a still sprite) and keep large areas still.
- A title or splash screen waits for the player's tap: a timer that skips
  it takes the moment away, and a tap is also the gesture fullscreen needs.
  Behind the title, let the game's own scene play by itself (an attract
  loop), so the first screen already shows what the card is about.
- A scene panel that only shows a picture is decoration. Build it from
  layers in one fixed pixel grid (background, actors, effects, bubbles kept
  at screen size), give each scene a small idle script that fires at random,
  play a few beats derived from each finished reply, and let a tap on an
  actor answer with a line and, sometimes, a draft action for the input box,
  so the panel feeds the game's loop. Stop every timer while the panel is
  off screen or the page is hidden, and do nothing under reduced motion.
- Make that stage show the story's state, not only its beats. Take the cast
  from the shown page's own prose with the side blocks removed, so it never
  shows a character or form the story has not reached; draw what the story
  left behind (a sign for the active rule change that falls over when the
  character goes around it, the remains of a beaten boss, a crowd sized by
  the forum posts); turn a counter the reply already writes ("progress 94%")
  into the monster's health bar. A monster the story finished stays gone, and
  the replay brings it back only to finish it again. Replay a finished turn
  as its system lines in order, each as a caption, at most about seven beats:
  merge repeats and drop minor hits before a defeat, a skill or a rule
  change. Pick the title's attract episodes at random without repeating the
  last few, and on a portrait panel (a phone, a full-screen view) switch the
  stage to the tall backdrop layout rather than letterboxing 16:9.
- Keep the stage and the prose on screen together, and let the reading
  position drive it: on a phone pin the stage above the reading pane and
  narrow it to a strip (actors and the current beat) once the reader
  scrolls, so it never sits over unread text; a pinned slot of constant
  height whose lower part is transparent narrows without making the text
  jump. Play each system line's beat when that line first comes into view
  (an IntersectionObserver rooted at the reading pane, its top margin
  minus the pinned stage), queue beats rather than restarting, remember
  what played by message and line (the page is re-rendered on every
  streamed chunk), and while a reply streams leave its lines alone: the
  stage still shows the previous page, so the lines the reader passed
  catch up once it completes. A monster the page defeats stands until
  that line is read.
- Do not make the stage guess who is on screen from the prose: real replies
  rename monsters, turn a foe into a pet, move the scene and cut to another
  character, and no keyword table survives that. Let the model declare the
  frame in the state block (one line: who the camera follows, where, who else
  is in shot, with pets and mounts marked), keep prose inference only as the
  fallback for a reply that drops the line, and test that a weak model still
  writes it every turn. The page starts from that frame with the page's own
  changes undone (what it tames is still hostile, what the player drops is
  not there yet, last page's cast is still standing if the camera stayed) and
  settles into the declared frame at the page's end; someone a line names who
  is not in shot walks in. Read the system lines as subject, verb, target and
  number; give speech to the nearest name before the quote (the camera's
  focus when the paragraph only says "she"), off-stage voices to a small
  portrait window, forum posts to danmaku, and play the player's own move of
  that turn first. Test with real replies, not hand-written samples: feed a
  `play --history` export back through the preview, player line then reply,
  and scroll it.
- Give the card's core verb its own small window that drafts one precise
  line into the input (pick a target, a method, a number, a scope; fold
  each decided step so the rest fits a short phone). A completeness
  checklist is fair when the card rewards precision; a predicted meter
  change is not, because the model decides it. Let scope options carry the
  card's rules (no "this player only" when the rules forbid it), and keep a
  history of what the player did and how the story answered.
- Sound can be synthesised in the page with WebAudio (no files): in the
  preview shell's sandboxed iframe the context starts suspended and runs
  after a tap inside the frame, so start it from the title's tap and again
  on the first touch. Give music and effects separate switches, a mute in
  the top bar, and no music by default under reduced motion.
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
