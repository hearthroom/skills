---
name: hearthroom-visual-identity-director
description: Use when Hearthroom card work focuses on the portrait, background image, key art, art brief, or first-impression visual direction, or on aligning the card's images with its name, summary, and opening, before authoring, render review, play testing, or publishing.
---

# Hearthroom Visual Identity Director

Turn the card promise into image prompts for the portrait and the optional
backgrounds and state whether the image files are ready. The output is a set
of prompts and an asset readiness note. Images come from the author or the
author's own image tool; this skill writes the prompt.

## Required references

- `../../references/visual-identity.md` first: one portrait with three
  crops, the cover and title as a pair, visual proof, writing the prompt,
  repairs.
- `../../references/platform-facts.md`: the card folder (the portrait is the
  board cover, the chat avatar and the default background) and the Media
  library (paths, names, `media.folder`).
- `../../references/profile-packaging.md` when the promise in `name`, `summary`,
  or tags is weak.
- `../../references/presentation-design.md` when display rules or opening
  HTML must carry the same visual promise.

## Workflow

1. Confirm the promise is coherent enough to visualize: card shape, player role,
   character or system anchor, central tension, first-scene proof. If not, route
   to the missing writing skill first.
2. Extract the visual proof: one non-generic signal that shows why this card is
   not a stock trope.
3. Take the title's hook from `hearthroom-profile-packager` and make the
   cover ask the same question (a contrast, a local detail, an object that
   should not be there). Cover the name: the portrait alone must still say
   who this is and what they are up against.
4. Write each image prompt as three to five plain sentences an image model
   can follow: who or what is shown and doing what, where, and in what light.
   Then a sentence on composition: "Vertical 9:16 frame; the face is centred
   in the upper-middle third so a square crop and a 3:4 crop both keep the
   whole head; nothing important near the edges." End with "No text,
   letters, logos or watermarks anywhere in the image." Name a failure to
   avoid only after an earlier generation actually showed it.
5. Check the portrait in all three crops (board 3:4, avatar circle, chat
   background) before calling it ready. Decide asset readiness: file present
   under `assets/art/` and referenced in `card.json`, author will provide, or
   missing. Plan the paths with the naming rules under Media library in the
   facts sheet (`assets/art/portrait.webp`, `assets/art/bg/<place>.webp`,
   `assets/art/bg/<place>-wide.webp`; readable names, no dates or versions,
   `media.folder` for art a series shares). Upload the final size and format;
   replacing a file at the same path changes it for every card that uses it.
6. Check alignment with `name`, `summary`, the opening, and any display rules.

## Hand-off

```text
Card shape; language; engine preserved
Promise proof (player role, anchor, tension, first-scene proof, non-generic detail)
L0 pair: the title's question; how the cover asks it
Portrait prompt; background prompt(s); failures to avoid (only those seen)
Consistency: name/summary | opening | display rules | three crops checked | original
Asset readiness (portrait 9:16, safe in 3:4 and the circle; optional background 9:16 and landscape 16:9, central 75%): assets/art/portrait.webp | assets/art/bg/<place>.webp | next action
Next skill
```

- `hearthroom-profile-packager`: the visual work exposed weak promise copy.
- `hearthroom-presentation-director`: layout or display rules must carry the
  same promise.
- `hearthroom-card-author`: write `media.portrait` and `media.background` into
  `card.json` once files exist, then push.
- `hearthroom-render-review`: after `card render --json` or the play page exists.

## Do not

- Do not copy unprovided art, protected character designs, exact compositions,
  or image text; do not name living artists or private references.
- Do not let an appealing image change the engine; route back instead.
- Do not put text, letters or logos in an image; the title belongs to the
  board, not the cover.
- Do not call a card complete while the referenced image files are missing.
- Do not run CLI commands or edit the folder from this skill.
