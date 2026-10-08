# Full-page layouts

Load this reference only when a sandbox card covers the whole chat page with
its own layout (a book, a dossier, a stage). The look, the metaphor and the
mechanics are the card's own invention; this page says what such a screen
must protect. Platform behaviour it relies on is in `platform-facts.md`;
browser and device behaviour comes from vendor documentation and a few
devices, so report "verified in simulation" until a tester has used one.

A full-page card is `uiRole: core` by construction: every reply stays
readable when its script fails, and it passes the reading-first rules in
`presentation-design.md` before a layout is worth building.

## The chat list as transport

The card covers the page and leaves the message list, the composer and the
site's navigation underneath doing their jobs.

- Build pages from the rendered replies and keep your own per-conversation
  copy; the list is virtualised and message ids change on reload (facts
  sheet). Run the same hydration on a page as on the bubble it came from, or
  portraits and badges added later go missing.
- The player sees that a tap did something: their line on a pending page,
  what the reply is waiting on in the card's voice with the seconds counting
  (story summary, thinking: facts sheet, `sdk.generation`; the overlay hides
  the list's own indicator), and a page that starts at its top while it streams.
- A tap that sends spends credits: show what will be sent and let the player
  confirm, rewrite or cancel. When the overlay covers the composer, hide the
  site's and draw one input of your own (facts sheet, composer and send), and
  keep the text until the send resolves so a refused send loses nothing.
- One bar on screen, not two: hide the site header with the overlay and
  forward back and fullscreen to its hooks (facts sheet, `data-lt`), so
  navigation stays the site's. Fullscreen and sound start from a player's tap;
  offer fullscreen only where the facts sheet says it can work, and never
  re-enter it after the player leaves. Keep a way back to the plain chat page.
- Every lookup the model's words drive (a portrait by name, art by chapter)
  has a designed miss, because the model will introduce people no table
  knows, and a preview sample that hits it.

## What the screen protects

- One focus at a time. Do not animate one area while the player reads
  another. The player sets the pace; an automatic mode waits for each text to
  be shown in full and holds it for its own reading time. A full-text view of
  the page is always one obvious step away and back.
- Use the room each shape gives. The same reply fills a short phone and
  leaves most of a tall or wide screen empty; decide per shape what earns the
  space (more story, context, the scene, the tools of the core loop) instead
  of stretching a phone layout.
- Do not make the page guess structured facts from prose (who is present,
  where, what changed). Let the model declare what the screen needs in a
  short closed form, keep inference as the fallback, and test with real
  replies (`play --history` through the preview) on a weak model.
- Choose visuals from a part of the reply once that part is complete, and
  change them gently; guessing from half a stream flips between pictures.
- A visual panel earns its space by reflecting the story or feeding the
  loop. Show only what the story has established, and let numbers the reply
  already writes drive what moves.
- What stays on screen permanently serves the core loop and gives the player
  something to act on. Never two controls for the same thing on a small
  screen.
- A tool that helps compose an action does not claim to know what the model
  will decide, and respects the card's own rules.
- Adapting to a screen shape changes the framing, never what is shown.

## Shapes, folds and keyboards

Choose the layout from the size and shape of the area you actually get, after
the browser's bars and the site header, not from the device's name. Two
pages read as a book only at equal widths with a maximum width for the
spread. Small phones, landscape phones, square inner screens and half-folded
poses each need their own decision; Apple's iPhone Duo guidance and Android's
foldable documentation are worth reading before designing for them.

Fold detection is unreliable inside the card's frame (facts sheet), so offer
a manual setting and show what was detected in the card's settings, so a
tester can report it from a device you cannot emulate.

Two traps nobody guesses:

- An on-screen keyboard shrinks the viewport. A layout chosen from the
  viewport's shape then switches while the player types, the input loses
  focus, the keyboard closes and the layout switches back. Keep the layout
  while one of the card's inputs has focus.
- Full-viewport live filters (`blur`, `drop-shadow` over scrolling content)
  are recomputed whenever a phone rotates or a foldable opens, and can stall
  or blank the page. Blur images ahead of time and settle resize events into
  one layout pass.

## Verify

The offline preview (facts sheet, "Offline preview") offers phone, landscape
phone, unfolded, tablet and desktop sizes; screenshot each with a reply
streamed and a choice tapped, and once with the rules disabled to see what a
script failure leaves. Device checks are separate evidence; say which you
have.
