---
name: hearthroom-profile-packager
description: Use when a Hearthroom card task focuses on the card name, summary, tags, title, tagline, short pitch, public first impression, or why a player should open a card whose engine already exists, before authoring, pushing, rendering, play testing, or publishing.
---

# Hearthroom Profile Packager

Sharpen the public promise of a card whose engine is coherent: `name`,
`summary` and `tags` in `card.json`. The output is a package packet, not a
rewrite and not a submission.

## Required references

- `../../references/profile-packaging.md` first: promise angle, name and
  summary patterns, tag buckets, first-impression check.
- `../../references/platform-facts.md`: the summary limit (500 characters, or
  2500 only when `language` is exactly `en`) and where to read limits
  (`tokenBudget.limits` in `card validate --json`).
- `../../references/archetype-contracts.md` when the card shape is unclear.

## Workflow

1. Confirm this is a packaging task. Route to `hearthroom-premise-workshop`
   when the premise is not chosen, `hearthroom-archetype-director` when the
   shape is unclear, `hearthroom-quality-auditor` when the author wants a
   whole-card score.
2. Extract the promise angle: card shape, player role, character or system,
   central tension, repeated play loop, strongest unusual detail, first-screen
   proof.
3. Write three `name` candidates with different angles, then choose one.
4. Write three `summary` candidates in one scannable sentence each. Aim for
   80 to 260 characters; go longer only for systems, games, generators, or
   ensembles, and stay under the limit for the card's language.
5. Build a tag set across card shape, relationship or role axis, action loop,
   tone, and mechanic or format. Avoid duplicate mood synonyms.
6. Run the first-impression check: player role visible, starting pressure
   visible, opening proves the promise, tags distinguish the card, engine
   unchanged.

## Hand-off

```text
Card shape; language; engine preserved
Promise angle (7 items)
name candidates (candidate / angle / risk); selected name
summary candidates (candidate / character count / cut or moved); selected summary
Tag set by bucket
First-impression check; fields to preserve; fields to change
Next skill
```

- `hearthroom-card-author`: apply the package to `card.json`.
- `hearthroom-opening-director`: the opening cannot prove the new promise.
- `hearthroom-token-architect`: compression exposed allocation drift.
- `hearthroom-quality-auditor`: the author asks whether the card is good enough.
- `hearthroom-publish-readiness`: only when the author explicitly asks to submit.

## Do not

- Do not summarize the whole card; sell one player relation, one tension, one loop.
- Do not reopen the premise unless the profile exposes a missing engine.
- Do not use market words (popular, top, viral, best, trending) unless the
  author wants them as in-world tone; translate them into specificity and proof.
- Do not run CLI commands or edit the folder from this skill.
