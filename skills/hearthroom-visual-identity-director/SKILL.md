---
name: hearthroom-visual-identity-director
description: Use when Hearthroom card work focuses on the portrait, background image, key art, art brief, or first-impression visual direction, or on aligning the card's images with its name, summary, and opening, before authoring, render review, play testing, or publishing.
---

# Hearthroom Visual Identity Director

Turn the card promise into an art brief for the portrait and background and
state whether the image files are ready. The output is a brief and an asset
readiness note. The platform does not generate images; the author supplies them.

## Required references

- `../../references/visual-identity.md` first: visual proof, asset jobs, brief
  rules, repairs.
- `../../references/platform-facts.md`: images live under `assets/`, are
  referenced from `card.json` as `media.portrait` and `media.background`, and
  are uploaded by `card push`.
- `../../references/profile-packaging.md` when the promise in `name`, `summary`,
  or tags is weak.
- `../../references/presentation-design.md` when display rules or `hc-*`
  components must carry the same visual promise.

## Workflow

1. Confirm the promise is coherent enough to visualize: card shape, player role,
   character or system anchor, central tension, first-scene proof. If not, route
   to the missing writing skill first.
2. Extract the visual proof: one non-generic signal that shows why this card is
   not a stock trope.
3. Separate the jobs. Portrait: recognizable at small size on the board.
   Background: proves the pressure and the player relation behind the chat.
4. Write original art direction per asset: focal subject, silhouette, expression
   or gesture, key object, setting pressure, camera and crop, palette, lighting,
   texture. Add negative notes only for concrete failures (unreadable face,
   text artifacts, clutter, low contrast, wrong age impression).
5. Decide asset readiness: file present under `assets/` and referenced in
   `card.json`, author will provide, or missing. `hearthroom media upload`
   exists for uploading a file on its own; `card push` uploads referenced assets.
6. Check alignment with `name`, `summary`, the opening, and any display rules.

## Hand-off

```text
Card shape; language; engine preserved
Promise proof (player role, anchor, tension, first-scene proof, non-generic detail)
Portrait brief; background brief; negative notes
Consistency: name/summary | opening | display rules | readable small | original
Asset readiness: assets/portrait | assets/background | next action
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
- Do not call a card complete while the referenced image files are missing.
- Do not run CLI commands or edit the folder from this skill.
