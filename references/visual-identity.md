# Visual Identity

Use this when a card needs portrait, background, or art-brief direction. The
images are the first visual proof of the promise and, with the title, the
whole of the card's first impression on the board. They do not replace profile
packaging, presentation planning, or render review.

```text
card promise -> cover and title as a pair -> portrait and background briefs -> asset readiness -> hand-off
```

An image that could fit any nearby trope is too generic. Cover the name: the
portrait alone must still say who this is and what they are up against.

## Where images live

Images sit under `assets/` in the card folder and are referenced from
`card.json` as `media.portrait`, `media.background`,
`media.backgroundLandscape` and `media.share` by relative path (sizes and
crops in `platform-facts.md`); `card push` uploads them into the card's media-library folder. Images come from the
author or the author's own image tool; this skill writes the prompt. The card
is not complete while a referenced file is missing. Paths and naming follow
Media library in `platform-facts.md`: group by job (`assets/art/portrait.webp`,
`assets/art/bg/<place>.webp`, `assets/art/bg/<place>-wide.webp`), readable
names, no dates or version numbers, `media.folder` for art a series shares.
Upload the final size and format; replacing a file at the same path changes
it for every card that uses it.

## One portrait, three crops

The portrait is one file with three jobs (`platform-facts.md`, card folder).
Generate it at 9:16. The board card crops it to about 3:4 and the chat avatar
crops it to a 1:1 circle; when no background is set it also fills the chat
screen, cropped to cover. Put the subject in the centre: the head and face sit
inside the central circle, the silhouette and the key object inside the
middle 3:4 band, and everything that matters inside the central 75%. Check
all three crops before calling the image ready.

The background is optional and separate: `media.background` (9:16) and
`media.backgroundLandscape` (16:9, preferred on wide screens). It shows the
place and the pressure behind the text. Keep busy detail out of the central
reading column.

## The cover and the title are read together

On the board a stranger sees the cover and the title for under a second (L0 of
the funnel, `role-card-writing-framework.md`). The image must raise a question
the title does not answer: a contrast (a soft subject in a hard place), a
local detail the target players recognise, or an object that should not be
there. `hearthroom-profile-packager` owns the title; this skill makes the
cover ask the same question. If the pair does not work, change one of them,
not both.

## Visual proof

The direction must answer: who or what anchors the card; where the player
stands relative to it; what pressure starts the scene now; which detail could
not belong to a generic version of the trope; which mood, palette, and framing
support the promise without hiding play.

Prefer one charged object, glance, rule, or route clue over a collage of mood
markers.

## Writing the prompt

Write each image prompt as three to five plain sentences an image model can
follow: who or what is shown and doing what, where, and in what light. Then
one sentence on composition: "Vertical 9:16 frame; the face is centred in the
upper-middle third so a square crop and a 3:4 crop both keep the whole head;
nothing important near the edges." End with "No text, letters, logos or
watermarks anywhere in the image." Only name a failure to avoid when an
earlier generation actually showed it (an unreadable face, extra limbs,
clutter, text artefacts, washed-out contrast, a wrong age impression).

Do not copy unprovided art, protected designs, exact outfits, compositions, or
image text. Do not name living artists or private references. Use traits that
serve the card: silhouette, expression, camera distance, lighting, palette,
key object, setting pressure, player-relative framing.

## A cover with its title on it

A card whose own screen covers the chat page (so the portrait no longer
works as the chat background) may make the portrait a real cover with the
title on it. How it looks is the card's call: the title should read as part
of the same world as the art. Two things hold whatever the look:

- Image models garble text. Ask for the art only, with room left for the
  title, and set the title yourself (HTML and CSS rendered to an image works).
- Every crop keeps the title and the face, and the title never covers the
  face. Design inside the area all the crops keep (`platform-facts.md`, One
  portrait, three crops). A card that hides the site's avatar can design for
  the board crop alone.

## The share image

A link pasted into a chat app shows a wide preview with the card name and
summary beside it. Without `media.share` the site falls back to the landscape
background, then the portrait, which is cut to a thin middle strip, so a
title drawn on the portrait is lost (`platform-facts.md`). A card that wants
a real preview gives `media.share` its own wide composition rather than a
crop of the portrait: the title and the face in the middle, where both a
wide band and a square thumbnail keep them, the sides carrying the scene.
Ask for the art without text and set the title as for a cover.

## Pixel art and sprites

Asked for "pixel art", image models return a large picture with soft,
uneven blocks rather than a pixel grid. True pixels come from shrinking a
low-resolution, limited-palette result onto its grid, saving it lossless and
letting the page scale it up with `image-rendering: pixelated`. Figures
layered over scenes are generated on a flat background that can be keyed
out, kept out of the scene art, and drawn the same wherever they appear.

For a fan card, where the canon look is the point, a description in words
gets a generic costume: attach the official full-body art and ask for the
same design in the card's style. A screen shown in portrait needs art
composed for portrait, not a landscape scene padded with colour.

Standing sprites are usually cut at the thigh; keep that edge below the
frame or behind the text box on every screen shape, with a fade as a guard,
or the figure floats. With several on stage, stand them on one floor line
below the frame, size them by their canon heights, push a third figure back a
step (smaller, feet higher) and keep two on a narrow phone. An image editor
asked for one layer at a time can split a sprite into back hair (completed
where the body hid it), a hairless body (completed under the hair) and front
hair that recompose to the original; with a hair, face and body mask that is
enough for a runtime mesh rig: head turn by a cylindrical warp, front and
back hair at different parallax, spring chains for the hair.

## Animated sprites

A mesh rig is judged against its still. At rest the composite equals the
original pixels: AI edits only locate things and paint what is hidden;
visible pixels from an edit lose the likeness. Keep a sidecar of facts per
image (face and eye boxes, pupil room, head roll and yaw, parts), made by the
pipeline and overridable, and read it instead of re-measuring at load. A
turned or tilted source moves along its own axis; a pupil never passes the
white it has at rest; one thing drawn on two layers moves as one or doubles;
eyes translate as blocks. Declare each moving object's material, joint,
driver, depth in a named layer stack and effects: rigid things never bend, so
each piece that moves on its own gets a layer split at its narrow neck and
rotates whole, with light as its only effect; a held object sits in front of
the front hair. Refine drawn regions against the original (GrabCut) before
cutting, or the old outline stays behind. Review close crops of eyes and
moving pieces at every extreme pose; contact sheets hide these faults.

## Layers

Profile packaging decides the promise in words and owns the title. Visual
identity turns it into prompts and owns the cover. Presentation decides display
rules, opening HTML, and first-screen hierarchy. Render review checks actual
output. If a visual idea changes the engine, route back to the writing skill.

## Common repairs

| Failure | Repair |
|---|---|
| Pretty but generic | add player relation, pressure, or a card-specific object |
| Portrait unreadable small or cut by a crop | simplify the silhouette, centre the head, raise contrast; check the 3:4 and the circle |
| Cover and title ask different questions | rewrite the prompt around the title's hook, or route the title back to the packager |
| Background contradicts the summary | keep the engine, rewrite the prompt |
| Prompt copies a reference | replace with original traits and composition goals |
| Visual idea changes the card | route back to premise or archetype |
| Display rules and background clash | hand off to presentation after the brief is stable |
| Card pushed without images | add files under `assets/art/`, reference them in `card.json`, push again |
