---
name: hearthroom-profile-packager
description: Use when a Hearthroom card task focuses on the card name, summary, tags, title, tagline, short pitch, public first impression, or why a player should open a card whose engine already exists, before authoring, pushing, rendering, play testing, or publishing.
---

# Hearthroom Profile Packager

Sharpen the public promise of a card whose engine is coherent: `name`,
`summary` and `tags` in `card.json`. The output is a package packet, not a
rewrite and not a submission.

## Required references

- `../../references/profile-packaging.md` first: promise angle, title
  devices, the summary pattern, tags from the community list,
  first-impression check.
- `../../references/platform-facts.md`: the summary limit (500 characters, or
  2500 only if `language` is exactly `en`; a ceiling, not a target), where
  to read limits (`tokenBudget.limits` in `card validate --json`), and
  `hearthroom tags`.
- `../../references/role-card-writing-framework.md` for the funnel: this
  skill owns L0 (cover and title) with the visual identity director and L1
  (summary).
- `../../references/archetype-contracts.md` when the card shape is unclear.

## Workflow

1. Confirm this is a packaging task. Route to `hearthroom-premise-workshop`
   when the premise is not chosen, `hearthroom-archetype-director` when the
   shape is unclear, `hearthroom-quality-auditor` when the author wants a
   whole-card score.
2. Extract the promise angle: card shape, player role, character or system,
   central tension, repeated play loop, strongest unusual detail, first-screen
   proof.
3. Write three `name` candidates, one per device (a gap, a local or topical
   anchor, a contrast), then choose one.
4. Check L0 as a pair: the cover thumbnail plus the title. If the cover does
   not raise the same question as the title, route the hook sentence to
   `hearthroom-visual-identity-director`.
5. Write three `summary` candidates of at most about 260 characters, hook
   sentence first, each saying who I am, what I am up against, why it is fun
   and what I can change.
6. Build the tag set from the community list: the card author runs
   `hearthroom tags --zone <zone> --q <word> --json` and passes the results;
   pick by card shape, setting, and relationship or loop. Never coin a tag.
7. Run the first-impression check: the first sentence works alone, the four
   jobs are said, cover and title agree, the opening delivers the hook on its
   first screen (otherwise route to `hearthroom-opening-director`; do not
   lengthen the summary), tags distinguish the card, engine unchanged.

## Hand-off

```text
Card shape; language; engine preserved
Promise angle (7 items)
name candidates (candidate / device / risk); selected name
L0 pair check: cover + title
summary candidates (candidate / character count / cut or moved); selected summary
Tag set from the community list
First-impression check; fields to preserve; fields to change
Next skill
```

- `hearthroom-card-author`: apply the package to `card.json`.
- `hearthroom-opening-director`: the opening cannot prove the new promise.
- `hearthroom-token-architect`: compression exposed allocation drift.
- `hearthroom-quality-auditor`: the author asks whether the card is good enough.
- `hearthroom-publish-readiness`: only once the author explicitly asks to submit.

## Do not

- Do not summarize the whole card; sell one player relation, one tension, one loop.
- Do not reopen the premise unless the profile exposes a missing engine.
- Do not coin tags; pick from the community list.
- Do not run CLI commands or edit the folder from this skill.
