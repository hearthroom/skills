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
`card.json` as `media.portrait`, `media.background` (9:16) and
`media.backgroundLandscape` (16:9, optional) and `media.share` (1200 × 630,
optional; see The share image) by relative path; `card push`
uploads them into the card's media-library folder. Images come from the
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
works as the chat background) can make the portrait a real cover, the way a
light novel's is. The pattern: one bright character illustration that fills
the frame, and a custom title logo in the upper part. A long title gets a
size hierarchy: a short lead line on a ribbon, the key phrase largest with a
thick outline, a gradient fill and a drop shadow, each character tilted a
little differently, and the payoff line below it in white, tilted the
other way. A sticker or badge sits in a corner, and a small tag line runs
along the bottom. Image models garble text, so ask the model for the
illustration only, with the top third left as open sky, and set the title
in HTML and CSS with a web font rendered to PNG (headless Chrome). Then
check the crops: the board cover is the middle 3:4 band, so the logo stays
inside it; the avatar is the centre circle, so the face goes there, just
below the logo. A card that styles its own chat page can instead hide the
avatar (it is the site's message avatar node; see the facts sheet's caution
on internal nodes) and keep its own chat background, and then design the
portrait for the board instead: a bigger logo and a bigger figure. Either
way, do not trust one crop. Per the site's source every cover slot (board
tile, card page, own cards, review list) crops 3:4 from the centre and the
board tile zooms 4% on hover, while a shared link's preview is wide (see
The share image) and other surfaces may show it square; so keep the logo and
the face inside the area all of them keep, the centre square of the 9:16
portrait, about 6% in from each side, and let sky and legs take the rest. If the model puts the face too high, move the whole
illustration down and continue the sky above it in its own colour; don't
let the logo cover the face.

## The share image

A link pasted into Discord, LINE or X shows a wide preview, about 1.91:1, with
the card name and summary as text beside or under it. The site picks
`media.share`, then `media.backgroundLandscape`, then the 9:16 portrait. The
platform crops the 16:9 background a little at the top and bottom, but the
portrait down to a thin middle strip, so a title drawn on the portrait is cut
off.

A card that wants a real preview sets `media.share` (`roleShareImage` on
push): 1200 × 630, PNG or JPEG, its own composition rather than a crop of the
portrait. It may carry the title, set the same way as a cover's (above).
Platforms trim it differently (a 2:1 band, or a small square thumbnail), so
put the title and the face in the middle, inside the central 630 × 630 square
where possible and at least 60 px from the top and bottom edges, and let the
sides carry the scene. Ask the image model for "a wide 1.91:1 frame, the
subject in the centre third, the sides open scenery", without text, then add
the title in HTML and CSS.

## Pixel art and sprites

Asked for "pixel art", image models tend to return a large picture with
soft, uneven blocks rather than a pixel grid. For true pixels, ask for a low-resolution look (about 320 px wide, limited
palette, no anti-aliasing), then shrink the result with a box filter to that
grid (for example 384 x 216 for a 16:9 scene, 128 x 128 for a bust), quantise
it to 32–64 colours without dithering, save it lossless, and let the page
scale it up with `image-rendering: pixelated`; the files stay a few tens of
kilobytes. For a sprite over a scene, ask for one flat pure magenta
background, key it out, crop to the figure, and drop the magenta fringe
after shrinking. Keep characters out of scene art so one figure can stand in
any scene, and keep the figure's design the same across scene, sprite and
portrait.

For a fan card, where the canon look is the point, a description in words
gets a generic costume: attach the official full-body art (a series' own
character page is better than an episode still, which leaves the body to be
invented) and ask for the same hair, outfit, colours and weapon in the
pixel style. A full-screen title on a phone needs tall art: a 9:16 backdrop
with a flat ground band near the bottom, shown cover-anchored to the bottom,
with the sprites placed on that band, so a taller screen shows more of the
picture; a 16:9 scene with a sky colour filled above it leaves the top half
empty. When a script runs an image CLI once per line of a job file, give the
CLI no stdin (`< /dev/null`), or the first job reads the rest of the file as
its prompt, and put the prompt before a flag that takes several files.

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
