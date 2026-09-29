---
name: hearthroom-instruction-guardrail
description: Use when Hearthroom card work needs an instruction-layer repair through customInstructions or outputContract in card.json, such as out-of-character assistant framing, repeated format or schema drift, state protocol drift, or transcript-backed behavior constraints, after the normal fields are coherent.
---

# Hearthroom Instruction Guardrail

Draft a narrow instruction-layer repair. The output is a guardrail packet with
draft text, not a broad rewrite and not a quality gate.

## Required references

- `../../references/instruction-guardrails.md` first.
- `../../references/platform-facts.md`: `customInstructions` replaces one default
  instruction block (not appended, not the whole system prompt);
  `outputContract` is the format the reply must follow; both have limits under
  `tokenBudget.limits`.
- `../../references/cli-workflow.md`: edit `card.json`, then
  `card push --validate --json`.
- `../../references/playtest-loop.md` when the need comes from play evidence.
- `../../references/cost-and-boundaries.md` when the instruction touches refusal,
  mature content, or play testing.

## Workflow

1. Gather evidence: the request, current fields, validation status, play
   transcript, and the exact behavior that failed.
2. Confirm the engine, opening, voice, agency, and boundary are coherent. If a
   normal field can fix the issue, route to that field's skill instead.
3. Classify the need. Format or schema drift goes to `outputContract`. Role
   stance, refusal style, state protocol, and recovery from meta-assistant
   drift go to `customInstructions`.
4. Draft compact allowed and forbidden constraints. Keep story logic in
   `definition.md`, visible action in `welcome.md`, examples in `talkExample`.
   Because `customInstructions` replaces a default block, write it as complete
   behavior guidance, not an addendum.
5. Set the stance: omit, draft-only, or push after confirmation.
6. Hand off. The edit is followed by `hearthroom card push --validate --json`;
   run `play -m` again only when behavior changes and the author accepts the cost.

## Hand-off

```text
Request; evidence; prerequisites checked
Instruction-layer need; not fixed by
Target: customInstructions | outputContract
Allowed constraints; forbidden constraints; draft text
Stance: omit | draft-only | push after confirmation
Validation / play plan
Next skill
```

- `hearthroom-card-author` to apply the edit and push.
- `hearthroom-card-doctor` when play shows several failures.
- `hearthroom-boundary-designer` when the real gap is the agency contract.

## Do not

- Do not use the instruction layer to fix boring, generic, passive, or
  trope-only cards; those are writing problems.
- Do not use it for safety, policy, or moderation bypasses or player-agency
  takeover.
- Do not duplicate lore, biography, world rules, or the full voice card.
- Do not write "be high quality" or "never fail"; write short, testable behavior.
- Do not run CLI commands or edit the folder from this skill.
