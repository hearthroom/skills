---
name: hearthroom-profile-packager
description: Use when the card name, summary, tags, title, tagline or public first impression needs work on a card whose engine already exists, or when the author asks why nobody opens the card, before pushing or publishing.
---

# Hearthroom Profile Packager

Sharpen the public promise: `name`, `summary` and `tags` in `card.json`.
This skill owns L0 (cover and title, with the visual identity director) and
L1 (summary) of the funnel. The output is a package packet, not a rewrite.

## Required references

Read `../../references/profile-packaging.md` (promise angle, title devices,
the summary pattern, tags from the community list, first-impression check).
From `../../references/platform-facts.md`: the summary limit is 500
characters (2500 only when `language` is exactly `en`), a ceiling not a
target; `hearthroom tags` lists the community tags.

## Workflow

1. Route first when the premise is not chosen (`hearthroom-premise-workshop`)
   or the shape is unclear (`hearthroom-archetype-director`).
2. Extract the promise angle: card shape, player role, character or system,
   central tension, repeated loop, strongest unusual detail, first-screen
   proof.
3. Write three `name` candidates, one per device (a gap, a local or topical
   anchor, a contrast), then choose one. Check L0 as a pair: if the cover
   does not raise the same question as the title, send the hook sentence to
   `hearthroom-visual-identity-director`.
4. Write three `summary` candidates of at most about 260 characters, hook
   sentence first, each saying who I am, what I am up against, why it is fun
   and what I can change.
5. Build the tag set from the community list (the author runs
   `hearthroom tags --zone <zone> --q <word> --json`); pick by shape,
   setting, and relationship or loop. Never coin a tag.
6. First-impression check: the first sentence works alone, the four jobs are
   said, cover and title agree, the opening delivers the hook on its first
   screen (otherwise `hearthroom-opening-director`; do not lengthen the
   summary), tags distinguish the card, engine unchanged.

Continue with `hearthroom-card-author` to apply the package,
`hearthroom-quality-auditor` when the author asks whether the card is good
enough, or `hearthroom-publish-readiness` only once they ask to submit.

## Do not

- Do not summarise the whole card; sell one player relation, one tension,
  one loop.
- Do not coin tags; pick from the community list.
