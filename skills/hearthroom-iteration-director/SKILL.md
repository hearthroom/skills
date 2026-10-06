---
name: hearthroom-iteration-director
description: Use when a card has validation, render, playtest, local-check or author-feedback evidence and the next step must be chosen (one patch, a rerender or replay, or stopping), including "what now", "is it done" or "should we test again", before more rewriting, CLI calls or publishing.
---

# Iteration director

Manage the improvement loop once evidence exists: one evidence-backed
repair per version, verified against the previous one, with clear stop
criteria. The output is an iteration packet; this skill does not write
files, score cards, review renders or run playtests.

## Required references

Read `../../references/iteration-loop.md` and the card's `README.md`
dossier (decisions, rejected directions, evidence by version, the open
shortcoming). Read `../../references/card-diagnosis.md` when symptoms
interact, `../../references/playtest-loop.md` when the evidence includes a
transcript, `../../references/token-economy.md` when `tokenBudget` or
allocation is part of the decision, `../../references/presentation-design.md`
when render evidence points at layout, and
`../../references/author-collaboration.md` when taste should drive the
decision. Then load only the narrow reference for the selected repair.

## Workflow

1. Gather the evidence stack: `card check` findings, `card validate --json`,
   `card render --json`, preview screenshots, play probes and replies,
   author feedback, previous patches. Mark missing evidence explicitly;
   never invent a result.
2. Separate hard blockers from craft issues, taste tradeoffs and cost
   decisions, and name the loop stage: draft, post-validation, post-render,
   post-play, author co-review, regression repair, publish readiness, stop.
3. Apply the decision ladder: technical blockers, then agency and boundary,
   then the weakest conversion layer (`card-diagnosis.md` owns the order).
4. Choose exactly one primary repair, committed with the shortcoming in the
   message; a technical blocker may pair with one small mechanical
   follow-up. List the rejected next moves so nobody rerenders, replays,
   publishes or rewrites prematurely.
5. State the token stance (never fill toward `tokenBudget.limits` unless the
   content changes behaviour), the cost stance for a replay (accepted, ask
   first, skip, not worth another paid turn), and the stop or continue
   criteria.
6. Update the dossier, then continue with `hearthroom-card-doctor` when the
   weakest layer is still unclear, `hearthroom-quality-auditor` when a
   scorecard is the next step, `hearthroom-collaboration-director` when the
   remaining decision is taste, `hearthroom-render-review` for a focused
   rerender, `hearthroom-chat-simulation` for a cost-accepted probe with the
   same probes and models as the previous version,
   `hearthroom-card-author` to apply a decided patch, or
   `hearthroom-publish-readiness` when the stop criteria are met and the
   author wants the card kept.

## Do not

- Do not replay without a concrete hypothesis and accepted cost.
- Do not treat a clean validate or render as proof the card is fun, or a
  failed craft review as a reason for a technical gate.
- Do not run a third loop on the same symptom; stop and ask the author for a
  design decision.
