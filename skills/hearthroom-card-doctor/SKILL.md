---
name: hearthroom-card-doctor
description: Use when an existing Hearthroom card, draft, validation report, render report, play transcript or author feedback shows several symptoms and needs diagnosis, weakest-layer triage, repair order, file patch mapping, keep/move/cut/rewrite decisions or a patch plan before rewriting, playing or publishing.
---

# Card doctor

Use this skill when the author has an existing card and the problem is not one
obvious layer. The output is a diagnosis packet and a patch plan, not a rewrite
and not a file edit.

It routes multi-symptom cards to the right narrow skill before anyone touches
a file, so the agent does not polish prose, add lore or pay for another
playtest when the card needs structural repair.

## Required references

Read `../../references/card-diagnosis.md` first and
`../../references/platform-facts.md` for the meaning of every `--json` field
you read. Read `../../references/quality-rubric.md` for the self-review
dimensions.

Read when the evidence calls for it: `../../references/playtest-loop.md` for
transcripts, `../../references/profile-packaging.md` for a weak profile,
`../../references/tension-triangle.md` for a premise with no stakes,
`../../references/token-economy.md` when `tokenBudget` shows a long opening
or thin definition, `../../references/language-style.md` for script or
register drift, and `../../references/card-authoring-templates.md` for a
field patch hand-off. Then load only the narrow reference for the diagnosed
layer.

## Workflow

1. Gather evidence: the author's complaint, the folder files, `card validate
   --json` (`status`, `blockers`, `warnings`, `suggestedFixes`,
   `tokenBudget`), `card render --json` (per-rule status, `unsupported`,
   the static scan), any `play --json` reply or `--history` output, language, card
   shape and rating intent.
2. Separate technical blockers from writing failures. Name the mechanical fix
   for each blocker (a `rolled_back` reason, an `unsupported` identifier, a
   field over its limit) before craft work.
3. Identify the primary failure and one to three secondary failures. Prefer
   observable symptoms to taste labels.
4. Map each symptom to its likely missing layer, source file, narrow skill and
   patch target using the symptom map.
5. Choose the repair order. Token architecture comes early when allocation
   hides the engine; boundary design comes early when risk or refusal is
   unclear.
6. Decide keep / move / cut / rewrite for summary, definition, opening and
   alternates, example conversations, Lorebook, display rules and custom
   instructions.
7. Name packets to preserve and packets to create next.
8. Write the author-facing patch plan and the verification plan (which of
   validate, render and play must rerun, with probes and cost stance).
9. Return the diagnosis packet from `card-diagnosis.md`, followed by a short
   self-review: evidence-backed, weakest layer named, no full rewrite, patch
   targets concrete, token allocation and player agency considered, next
   skill named.

## Hand-off

Give the diagnosis packet to the narrow skill the symptom map names:
`hearthroom-token-architect` when allocation is the first repair,
`hearthroom-profile-packager`, `hearthroom-tension-weaver`,
`hearthroom-archetype-director`, `hearthroom-character-core`,
`hearthroom-relationship-architect`, `hearthroom-daily-life-architect`,
`hearthroom-world-engineer` (also for unreachable Lorebook entries),
`hearthroom-ensemble-director`, `hearthroom-play-engineer`,
`hearthroom-generator-architect`, `hearthroom-agency-designer`,
`hearthroom-opening-director`, `hearthroom-longplay-architect`,
`hearthroom-voice-director`, `hearthroom-language-stylist`, or
`hearthroom-render-review` and `hearthroom-presentation-director` for rolled
back rules, unsupported identifiers or the wrong page mode.

- `hearthroom-card-author` when the author wants the patch applied and
  pushed.
- `hearthroom-chat-simulation` after structural patches make another paid
  turn meaningful.

## Do not

- Do not edit files or run CLI commands from this skill.
- Do not diagnose "boring" as one issue; translate it into vague promise, weak
  engine, generic voice, no consequence, route funneling, passive character,
  overloaded opening or missing second-turn move.
- Do not rewrite everything by default; patch the smallest file that fixes
  the failure and preserve working packets.
- Do not spend credits when current evidence already proves structural
  failure.
- Do not let compression delete the engine; move durable behavior into the
  definition before cutting.
- Do not trust a good-looking render as proof of playability.
- Do not turn writing quality into a validation rule.
