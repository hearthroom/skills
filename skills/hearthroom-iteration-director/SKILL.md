---
name: hearthroom-iteration-director
description: Use when a Hearthroom card has self-review, validation, tokenBudget, render, playtest or author-feedback evidence and needs a closed-loop next-iteration decision, one patch hypothesis, a rerender or replay stance, stop or continue criteria, or a hand-off before more rewriting, CLI calls or publishing.
---

# Iteration director

Use this skill to manage the improvement loop once evidence exists. The output
is an iteration packet: what to do next, why the evidence justifies it, what
to preserve, how to verify it and when to stop.

It is not a card writer, scorecard, render reviewer or playtest runner. It
prevents endless rewriting by choosing one evidence-backed repair at a time.

## Required references

Read `../../references/iteration-loop.md` first and
`../../references/platform-facts.md` for what each `--json` field and CLI
step means. Read `../../references/quality-rubric.md` for self-review criteria
and `../../references/author-collaboration.md` when author feedback or taste
should drive the decision.

Read `../../references/card-diagnosis.md` when symptoms interact and the
weakest layer is unclear, `../../references/playtest-loop.md` when the
evidence includes probes or a transcript, `../../references/token-economy.md`
when `tokenBudget`, field allocation or duplicated lore is part of the
decision, and `../../references/presentation-design.md` when render evidence
points to layout, display rules or the first screen.

Then load only the narrow reference for the selected repair.

## Workflow

1. Read the card's `README.md` dossier first (decisions, rejected
   directions, evidence by version, the open shortcoming), then gather the
   evidence stack: self-review, `check-card.mjs` findings, `card validate
   --json`, `card render --json`, offline-preview screenshots, play probes
   and replies, author feedback, previous patches.
2. Mark missing evidence explicitly. Never invent a validation, render, play
   or feedback result.
3. Separate hard blockers from craft issues, taste tradeoffs and cost
   decisions.
4. Name the loop stage: draft, post-validation, post-render, post-play, author
   co-review, regression repair, publish readiness or stop.
5. Apply the decision ladder from `iteration-loop.md`: technical blockers,
   then agency and boundary, then the weakest conversion layer
   (`card-diagnosis.md` owns the repair order).
6. Choose exactly one primary repair: one shortcoming per version, committed
   with the shortcoming in the message. A technical blocker may pair with one
   small mechanical follow-up; otherwise stay narrow.
7. List the rejected next moves so nobody rerenders, replays, publishes or
   rewrites prematurely.
8. State the token stance. Never recommend filling a field toward
   `tokenBudget.limits` unless the content changes behaviour, routes, state,
   voice, boundaries or memory.
9. State the cost stance for a replay: accepted, ask first, skip, or not
   worth another paid turn.
10. State stop or continue criteria.
11. Return the iteration packet from `iteration-loop.md`, followed by a short
    self-review: no invented evidence, one shortcoming this version, the
    pre-check named before any paid retest, the same probes and models as
    the previous version with the comparison column filled, agency and
    boundary risk checked, no max-length padding, taste separated from
    craft, next skill named, dossier updated.

## Hand-off

- `hearthroom-card-doctor` when the weakest layer is still unclear.
- `hearthroom-quality-auditor` when evidence is thin and a scorecard is the
  next step.
- `hearthroom-collaboration-director` when the remaining decision is taste.
- `hearthroom-token-architect` when the repair is allocation, opening bloat
  or overfilling.
- `hearthroom-render-review` when the next move is a focused rerender.
- `hearthroom-chat-simulation` when the next move is a cost-accepted probe.
- `hearthroom-card-author` when a decided patch should be applied to the
  folder and pushed.
- `hearthroom-publish-readiness` only when stop criteria are met and the
  author wants the card kept on the site.

## Do not

- Do not edit files, run CLI commands or push from this skill.
- Do not replay without a concrete hypothesis and accepted cost.
- Do not add lore once the engine is coherent; add only durable behaviour,
  route cost, state updates, voice control, boundaries or memory.
- Do not overwrite packets that passed.
- Do not treat a clean `card validate` or `card render` as proof the card is
  fun, or a failed craft review as a reason for a technical gate.
- Do not run a third loop on the same symptom; stop and ask the author for a
  design decision.
