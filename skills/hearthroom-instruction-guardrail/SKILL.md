---
name: hearthroom-instruction-guardrail
description: Use when a card's normal fields are coherent but behaviour still drifts in play (out-of-character assistant framing, repeated format or schema drift, state protocol drift) and the repair belongs in customInstructions or outputContract in card.json.
---

# Hearthroom Instruction Guardrail

Draft a narrow instruction-layer repair backed by evidence. The output is
a guardrail packet with draft text, not a broad rewrite and not a quality
gate: the instruction layer cannot fix a boring, generic or passive card.

## Required references

Read `../../references/instruction-guardrails.md`. From
`../../references/platform-facts.md`: `customInstructions` is a late
system message after the history and replaces the default content-scope
block;
`outputContract` is the format the reply must follow; both have limits under
`tokenBudget.limits`. Read `../../references/playtest-loop.md` when the need
comes from play evidence and `../../references/cost-and-boundaries.md` when
the instruction touches refusal or mature content.

## Workflow

1. Gather evidence: the request, current fields, validation status, the
   transcript and the exact behaviour that failed. If a normal field can fix
   it, route to that field's skill instead.
2. Classify the need: format or schema drift goes to `outputContract`; role
   stance, refusal style, state protocol and recovery from meta-assistant
   drift go to `customInstructions`.
3. Draft compact constraints, each with its reason (models generalise from
   the reason) and phrased as what to do. Story logic stays in
   `definition.md`, visible action in `welcome.md`, examples in `talkExample`.
   A non-empty `customInstructions` removes the default content-scope text,
   so state the scope the card needs in one line, keep the rest short, run
   the same probe with it empty and filled (each on `--new-session`), and
   keep it only if the transcript improves. Drift in reply length, agency or
   pacing goes to that axis's `responseDefaults` note.
4. Set the stance (omit, draft-only, push after confirmation), then continue
   with `hearthroom-card-author` to apply the edit and
   `card push --validate --json`; replay only when behaviour changes and the
   author accepts the cost. Several failures at once go to
   `hearthroom-card-doctor`; a missing agency contract to
   `hearthroom-boundary-designer`.

## Do not

- Do not use the instruction layer for safety, policy or moderation bypasses
  or player-agency takeover.
- Do not duplicate lore, biography, world rules or the full voice card here.
- Do not write "be high quality" or "never fail"; write short, testable
  behaviour.
