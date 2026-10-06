---
name: hearthroom-token-architect
description: Use when the validation report's counts or limits are the problem (an overlong opening or summary, a thin definition, duplicated lore, HTML bloat, status overhead), or when the author asks to "make it shorter" or "fit it in" without losing play.
---

# Hearthroom Token Architect

Allocate context so the engine, agency, voice and route costs survive and
the bloat goes. The output is a token architecture packet; no files, no CLI.

## Required references

Read `../../references/token-economy.md`. Read
`../../references/prompt-attention-architecture.md` when the problem is
attention dilution or format stability rather than raw length,
`../../references/presentation-design.md` when HTML or display rules cause
the bloat, `../../references/material-distillation.md` when a source pack
is the cause, `../../references/generator-design.md` when a generator's
schema is being compressed, and the narrow reference for a weak layer
before cutting it.

## Workflow

1. Name the failure: overlong summary, thin definition, bloated opening, an
   opening longer than the definition, repeated lore, duplicated monologue,
   visual bloat, misplaced durable rules, excessive examples, or status
   overhead (the status and choices blocks eat the reply).
2. Read the signal: per-field counts, `limits` and `welcomeToDetailRatio`
   from `tokenBudget` in `card validate --json` (counts compare revisions,
   they are not billing; the English column applies only when `language` is
   exactly `en`), and the archetype's target ranges.
3. Build the keep / move / cut / rewrite plan per field. Sometimes-needed
   facts move to Lorebook entries with keywords and descriptive names;
   reusable layout moves to `rules.json` display rules the model never
   sees; the reply shape moves to one short output contract.
4. Apply the compression ladder: remove duplicates, move durable rules into
   the definition, move conditional lore to the Lorebook, convert lore to
   play functions, rebuild the opening from its beats, keep style only
   where it improves play. Preserve or request the narrow packet before
   cutting a weak layer; a generator keeps its artifact contract, default
   start, schema, revision operations and artifact memory executable.
5. When a status block or choices are brittle, reserve a small structural
   budget for the minimum viable reply and the ordinary-turn example before
   cutting lower-priority lore; measure the block against typical replies
   (`card check --replay`), drop fields that change no choice, mark
   scene-only fields `volatile`.
6. Name the rerun checks: `card push --validate --json` for the new counts,
   `card render --json`, play only when the draft is worth testing.

## Checks

The summary stays scannable; the durable engine sits in the definition;
conditional lore sits in Lorebook entries; the opening is a playable
screen; visual structure earns its tokens or moved into display rules;
core, agency, voice, route costs and boundary survived. Continue with the
engine skill compression exposed as thin, `hearthroom-opening-director` to
rebuild the opening, or `hearthroom-card-author` to make the edits.

## Do not

- Do not solve bloat by deleting the engine, and do not shrink a bad opening
  into a shorter bad opening; rebuild it.
- Do not cut the one ordinary-turn sample or the format exemplar to save
  characters; cut prose first.
- Do not use a low count as proof of quality.
