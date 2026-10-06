---
name: hearthroom-visual-identity-director
description: Use when the portrait, background image, key art or art brief is the task, when the images must agree with the name, summary and opening, or when the author asks for "a picture for the card" or a cover that stops a scrolling thumb.
---

# Hearthroom Visual Identity Director

Turn the card's promise into image prompts for the portrait and the
optional backgrounds, and say whether the image files are ready. Images
come from the author or their own image tool; this skill writes the prompt
and checks the result against the funnel's L0 (cover and title as a pair).

## Required references

Read `../../references/visual-identity.md` (one portrait with three crops,
the cover and title as a pair, visual proof, writing the prompt, repairs).
From `../../references/platform-facts.md`: the portrait is the board cover,
the chat avatar and the default background; the Media library gives paths,
names and `media.folder`. Read `../../references/profile-packaging.md` when
the promise in `name` or `summary` is weak.

## Workflow

1. Confirm the promise is coherent enough to visualise (shape, player role,
   anchor, tension, first-scene proof); otherwise route to the missing
   writing skill first.
2. Extract the visual proof: one non-generic signal that shows why this card
   is not a stock trope. Take the title's hook and make the cover ask the
   same question (a contrast, a local detail, an object that should not be
   there). Cover the name: the portrait alone must still say who this is
   and what they are up against.
3. Write each prompt as three to five plain sentences an image model can
   follow: who or what is shown doing what, where, in what light; then
   composition ("Vertical 9:16 frame; the face is centred in the
   upper-middle third so a square crop and a 3:4 crop both keep the whole
   head; nothing important near the edges"); end with "No text, letters,
   logos or watermarks anywhere in the image." Name a failure to avoid only
   after an earlier generation showed it.
4. Check the portrait in all three crops (board 3:4, avatar circle, chat
   background) before calling it ready; a background also at landscape
   16:9 with the subject in the central 75%.
5. Decide asset readiness (file under `assets/art/` and referenced in
   `card.json`; the author will provide; missing) with the naming rules
   from the Media library (`assets/art/portrait.webp`,
   `assets/art/bg/<place>.webp`, `-wide.webp`; readable names, no dates or
   versions; `media.folder` for art a series shares). Replacing a file at
   the same path changes it for every card that uses it.

Continue with `hearthroom-profile-packager` when the visual work exposed
weak promise copy, `hearthroom-card-author` to write `media.portrait` and
`media.background` once files exist, or `hearthroom-render-review` after
the render.

## Do not

- Do not copy unprovided art, protected character designs or exact
  compositions; do not name living artists.
- Do not put text, letters or logos in an image; the title belongs to the
  board.
- Do not call a card complete while the referenced image files are missing.
