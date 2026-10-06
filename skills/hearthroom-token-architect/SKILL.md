---
name: hearthroom-token-architect
description: Use when a card task involves the validation report's character counts and limits, an overlong opening or summary, field allocation, keep / move / cut / rewrite plans, compression, duplicated lore, HTML bloat, or preserving playability while reducing context cost.
---

# Hearthroom Token Architect

Use when the weak layer is context allocation. The output is a token
architecture packet, not a full card. This skill does not write files or run
the CLI.

## Required references

Read `../../references/token-economy.md` first and
`../../references/platform-facts.md` for limits, the Lorebook and display
rules. Read `../../references/prompt-attention-architecture.md` when the
problem is attention dilution or format stability rather than raw length.
Read `../../references/role-card-writing-framework.md` for PACT and archetype
ranges, `../../references/card-authoring-templates.md` when converting the
packet into file edits, `../../references/presentation-design.md` when HTML
or display rules cause the bloat, `../../references/material-distillation.md` when a source pack is
the cause, and `../../references/generator-design.md` when a generator's
schema, examples or revision operations are being compressed. Read the narrow
reference for a weak layer before cutting it.

## Workflow

1. Name the failure: overlong summary, thin definition, bloated opening, an
   opening longer than the definition, repeated lore, duplicated monologue,
   visual bloat, misplaced durable rules, excessive examples, or status
   overhead (the status and choices blocks eat the reply).
2. Classify the archetype and state the target ranges (`token-economy.md`).
3. Read the signal: per-field character counts, `limits` and
   `welcomeToDetailRatio` from `tokenBudget` in `card validate --json`.
   Counts compare revisions; they are not billing. The English column
   applies only when `language` is exactly `en`.
4. Triage each field: summary, definition, opening and alternates, Lorebook
   entries, HTML and display rules, example conversations, output contract,
   custom instructions.
5. Build the keep / move / cut / rewrite plan. Sometimes-needed facts move to
   Lorebook entries with keywords and descriptive names; reusable layout moves
   to `rules.json` display rules the model never sees; the reply shape moves
   to one short output contract.
6. Apply the compression ladder: remove duplicates, move durable rules into
   the definition, move conditional lore to the Lorebook, convert lore to play
   functions, rebuild the opening from the five beats, keep style only where it
   improves play.
7. Preserve or request the narrow packet before cutting a weak layer. For a
   generator keep the artifact contract, default-start path, output schema,
   revision operations and artifact memory executable.
8. When a status block or choices are brittle, reserve a small structural
   budget for the minimum viable reply and the ordinary-turn example before
   cutting lower-priority lore. Measure the status block against typical play
   replies (`check-card.mjs --replay`, or by hand): drop fields that change
   no choice or consequence, and mark scene-only fields `volatile`
   (`state-economy-design.md`).
9. Name the rerun checks: `card push --validate --json` for the new counts,
   `card render --json` for `rendered`, `report.tags` and rule statuses, play only
   when the draft is worth testing.

## Hand-off

Return the token architecture packet from `token-economy.md` plus:

```text
Self-review:
- summary remains scannable:
- durable engine moved into the definition:
- conditional lore moved into Lorebook entries:
- opening is a playable screen:
- visual structure earns tokens or moved into display rules:
- compression preserved core, agency, voice, route costs and boundary:
- next skill:
```

Hand to `hearthroom-character-core` when compression exposes a thin engine,
`hearthroom-world-engineer` when lore must become rules,
`hearthroom-play-engineer` or `hearthroom-generator-architect` when mechanics
or artifact loops must get cheaper without breaking,
`hearthroom-agency-designer` when choices are decorative,
`hearthroom-presentation-director` for pre-field layout decisions without
count evidence, `hearthroom-voice-director` for cheaper voice calibration,
`hearthroom-opening-director` to rebuild the opening,
`hearthroom-longplay-architect` to compress state and memory, and
`hearthroom-card-author` to make the file edits.

## Do not

- Do not solve bloat by deleting the engine: keep desire, contradiction,
  boundary, player leverage, voice, route costs, consequence and refusal rules.
- Do not shrink a bad opening into a shorter bad opening; rebuild it.
- Do not let HTML become a poster; every component must show state, action,
  route, mood or risk.
- Do not cut the one ordinary-turn sample to save characters; examples beat
  rules for weak models (`talk-example-design.md`). Cut prose first.
- Do not delete the format exemplar or minimum viable reply from a
  shape-dependent card to save characters; cut prose first.
- Do not use a low count as proof of quality.
- Do not use this skill when there is no count, limit or bloat evidence and
  the question is only which visual elements to show; that is
  `hearthroom-presentation-director`.
