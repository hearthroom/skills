# Visual Identity

Use this when a card needs portrait, background, or art-brief direction. The
images are the first visual proof of the promise. They do not replace profile
packaging, presentation planning, or render review.

```text
card promise -> visual proof -> portrait and background briefs -> asset readiness -> hand-off
```

An image that could fit any nearby trope is too generic.

## Where images live

Images sit under `assets/` in the card folder and are referenced from
`card.json` as `media.portrait` and `media.background` by relative path;
`card push` uploads them. The platform does not generate images. The brief is
for the author or the author's own tools; the card is not complete while a
referenced file is missing. See `platform-facts.md`.

## Visual proof

The direction must answer: who or what anchors the card; where the player stands
relative to it; what pressure starts the scene now; which detail could not
belong to a generic version of the trope; which mood, palette, and framing
support the promise without hiding play.

Prefer one charged object, glance, rule, or route clue over a collage of mood
markers.

## Asset jobs

| Asset | Job | Avoid |
|---|---|---|
| Portrait | recognizable at small size on the board | full-body scene with no readable face, object, or silhouette |
| Background | proves the tension and player relation behind the chat | poster-only atmosphere with no pressure; busy detail that fights the text |
| Brief | gives an artist or image tool a clear target | copied art, living artists, vague style stacks |
| Negative notes | reduce concrete failures | banning the mood or the card's key signal |

## Brief rules

- Do not copy unprovided art, protected designs, exact outfits, compositions, or
  image text. Do not name living artists or private references.
- Use traits that serve the card: silhouette, expression, camera distance,
  lighting, palette, key object, setting pressure, player-relative framing.
- Keep text out of images.
- Negative notes only for concrete risks: unreadable face, extra limbs, clutter,
  text artifacts, washed-out contrast, wrong age impression.

## Layers

Profile packaging decides the promise in words. Visual identity turns it into
briefs. Presentation decides display rules, `hc-*` components, and first-screen
hierarchy. Render review checks actual output. If a visual idea changes the
engine, route back to the writing skill.

## Common repairs

| Failure | Repair |
|---|---|
| Pretty but generic | add player relation, pressure, or a card-specific object |
| Portrait unreadable small | simplify silhouette, crop closer, raise contrast |
| Background contradicts the summary | keep the engine, rewrite the brief |
| Brief copies a reference | replace with original traits and composition goals |
| Visual idea changes the card | route back to premise or archetype |
| Display rules and background clash | hand off to presentation after the brief is stable |
| Card pushed without images | add files under `assets/`, reference them in `card.json`, push again |
