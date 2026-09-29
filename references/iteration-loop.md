# Iteration loop

Use this reference when a card has enough evidence to decide the next
iteration. The loop is not a writing layer. It is the traffic controller that
keeps the agent from rewriting endlessly, overfilling fields or spending
credits without a hypothesis.

## When to use

Use it when a self-review, audit or diagnosis packet, `card validate --json`
or `card render --json` output, play replies, author feedback, or a revised
card needing a stop or continue decision exists.

Route away when there is no direction yet (`hearthroom-premise-workshop`),
one narrow layer is missing with no loop evidence (that skill), the author
wants a scorecard only (`hearthroom-quality-auditor`), or one render or play
issue is already known (`hearthroom-render-review`,
`hearthroom-chat-simulation`).

## Evidence stack

- `self_review`: checklist result, unresolved writing risks, packets created
- `validation`: `status`, `blockers`, `warnings`, `suggestedFixes`,
  `tokenBudget`
- `render`: per-rule status, `unsupported`, the static scan, play-page
  observations
- `playtest`: probes, transcript-backed failures, `--agent` mode used,
  turns run, credits spent when reported
- `author_feedback`: taste signals, concrete complaints, preserve and reject
  decisions

Evidence can be missing. Say what is missing; never pretend it was checked.

## Decision ladder

Choose exactly one primary next move:

1. Fix technical blockers before craft work.
2. Fix agency, boundary or safety problems before polish.
3. Fix a missing archetype contract, premise pressure or durable engine
   before opening or layout work.
4. Fix opening and second-turn failures before longplay probes.
5. Fix token allocation when the opening carries reusable rules or placement
   hides the engine.
6. Fix rendering only when the first screen is already playable.
7. Play, or replay, only when the next paid turn has a clear hypothesis.
8. Move to author co-review when taste tradeoffs are real and evidence does
   not pick a direction.
9. Move to publish readiness only when self-review, validation, render and
   the accepted playtest scope have no unresolved blocker.

Never fill a field toward `tokenBudget.limits`; they are ceilings. Add detail
only when it creates reusable behavior, route costs, state updates, voice
control, boundaries or memory.

## Patch budget

One decisive repair per loop, unless a technical blocker pairs with a small
mechanical follow-up. A hypothesis names the exact symptom, the file or packet
to patch, the smallest content change likely to fix it, the expected
verification result, and what verifying it costs.

After two failed loops on the same symptom, stop and ask the author to choose
a direction or revisit the premise and player role.

## Iteration packet

```text
Iteration packet:
- card folder or draft:
- loop stage: draft | post-validation | post-render | post-play | author co-review | regression | publish-readiness | stop
- evidence stack: self_review / validation / render / playtest / author_feedback
- decision:
- hard blockers:
- strongest evidence:
- weakest dimension:
- rejected next moves:
- next single repair: hypothesis / patch target / preserve / change / expected verification
- token stance:
- cost stance: accepted | ask first | skip | not worth another paid turn
- stop / continue criteria:
- next skill:
- hand-off:
```

## Stop criteria

- the remaining issue is taste, not a craft blocker
- the next patch would add lore, mood or length without changing play
- validation and render pass, the accepted playtest scope passes or was
  intentionally skipped, and self-review has no structural blocker
- the author wants to play the card before more changes
- two loops failed on the same symptom

## Quality rules

- Evidence beats preference, but the author's taste decides tradeoffs once
  craft blockers are gone.
- The next move must be executable by another agent without rereading the
  whole card.
- Writing-quality findings never become gates. Validation enforces technical
  limits; skills decide craft.
