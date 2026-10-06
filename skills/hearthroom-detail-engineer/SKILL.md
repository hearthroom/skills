---
name: hearthroom-detail-engineer
description: Use when a card's definition is thin, biography-heavy, under budget for its language and ambition, or missing a durable engine, or when the author asks for full-detail, top-card, longplay-capable or less-empty character settings before files are written, pushed, rendered or played.
---

# Hearthroom Detail Engineer

Turn the definition into the durable operating engine of the card. The output
is a detail engine packet and, when asked, a field-ready definition outline.
This skill does not write files or run the CLI.

## Required references

Read `../../references/role-detail-engine.md` first. Read
`../../references/token-economy.md` when length, language budget or
allocation is part of the problem, and
`../../references/prompt-attention-architecture.md` when the definition is
long, strict, plot-driven or drifts on some models. Read
`../../references/role-card-writing-framework.md` for the four-layer model
and PACT, `../../references/card-authoring-templates.md` when the packet will
become final fields, and `../../references/platform-facts.md` for limits and
the Lorebook.

Preserve narrow packets when they exist: `character-core-design.md`,
`relationship-engine.md`, `world-engine-design.md`, `scenario-design.md`,
`daily-life-design.md`, `play-engine-design.md`, `generator-design.md`,
`voice-calibration.md`, `agency-design.md`, `longplay-design.md`,
`boundary-design.md`, `state-economy-design.md` (all under
`../../references/`).

## Workflow

1. Name the failure: thin biography, under-budget engine, opening carrying
   rules, lore digest, generic trope, no role initiative, no consequence, no
   player insertion space, or no format stability.
2. Judge the definition by module coverage and play evidence, never by a
   character count: flag a module that play showed missing, not a short
   field. Limits come from `tokenBudget.limits` in `card validate --json`;
   keep at least about 500 characters free under each non-English limit.
3. Classify the card shape and preserve existing packet signals. If the premise
   is not chosen, route to `hearthroom-premise-workshop` or
   `hearthroom-tension-weaver` first.
4. Order the definition by `prompt-attention-architecture.md`: the iron laws
   at the top, the final recency checklist at the end, and the two must
   agree. For plot-driven cards include the narrative progression engine from
   `role-detail-engine.md`. For cards with a reply shape add a minimum viable
   reply, a recovery sentence, and one ordinary-turn example of the status
   block with concrete values (`state-economy-design.md`).
5. Fill the engine modules with concrete behaviour: identity and core charm,
   background and motive, current pressure, narrative progression, player
   relationship, world or play functions, proactive turn behaviour, voice and
   action logic, emotional reactions, longplay hooks, scene reservoir and turn
   recipes, time and consequence, secret and reveal plan, player insertion
   space, agency boundaries, format stability.
6. Decide placement: definition, Lorebook entries with keywords (sometimes
   needed facts, descriptively named), opening, example conversations, output
   contract, display rules.
7. State a compression stance: what to expand, move, cut or keep because it
   changes future turns.
8. Name the validate, render and play probes that would prove the engine.

## Hand-off

Return the detail engine packet from `role-detail-engine.md` plus:

```text
Self-review:
- each module changes future behaviour:
- no thin biography remains:
- scene reservoir prevents abstract repeated setup:
- no durable rules stranded in the opening:
- player insertion space protected:
- budget fits the language and ambition:
- next skill:
```

Hand to `hearthroom-card-author` for files, `hearthroom-token-architect` when
allocation is still the blocker, `hearthroom-opening-director` when the
opening must be rebuilt after rules moved out of it,
`hearthroom-chat-simulation` when the engine needs play proof, or the narrow
engine skill this pass exposed as missing.

## Do not

- Do not pad to hit a number, and do not treat length as a validation gate.
- Do not leave backstory that changes no want, fear, debt, skill, taboo or
  route.
- Do not keep lore that changes no access, risk, cost, state, clue or leverage.
  For every Lorebook line ask: would the model get it wrong without it? Is it
  information or decoration? Would a list do? Does it make sense without the
  source? Fail one, cut or rewrite.
- Do not make the player open the new scene.
- Do not write turn-count rules such as "after three turns" or "reveal on
  turn five".
- Do not decide the player's feelings, consent, commitments, actions or route.
- Do not dump secrets in the opening; pace them in the definition.
- Do not paste a generic formatting manual; write the card-specific contract.
