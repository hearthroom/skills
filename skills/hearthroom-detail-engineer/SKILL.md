---
name: hearthroom-detail-engineer
description: Use when a card's definition is thin, biography-heavy, missing a durable engine or drifts on some models, or when the author asks for "full detail", "top-card" or "less empty" character settings, before the files are written, pushed or played.
---

# Hearthroom Detail Engineer

Turn the definition into the card's durable operating engine: every module
changes future turns, nothing is decoration. The output is a detail engine
packet and, when asked, a field-ready definition outline; no files or CLI.

## Required references

Read `../../references/role-detail-engine.md`. Read
`../../references/prompt-attention-architecture.md` when the definition is
long, strict, plot-driven or drifts on some models, and
`../../references/token-economy.md` when length or allocation is part of the
problem. Preserve narrow packets that already exist (character core,
relationship, world, scenario, daily life, play, generator, voice, agency,
longplay, boundary, state economy).

## Workflow

1. Name the failure: thin biography, under-budget engine, opening carrying
   rules, lore digest, generic trope, no role initiative, no consequence, no
   player insertion space, no format stability. Judge by module coverage and
   play evidence, never by a character count; limits come from
   `tokenBudget.limits` in `card validate --json`, and about 500 characters
   stay free under each non-English limit. An unchosen premise goes to
   `hearthroom-premise-workshop` or `hearthroom-tension-weaver` first.
2. Order the definition by `prompt-attention-architecture.md`: iron laws at
   the top, the final recency checklist at the end, the two in agreement.
   Plot-driven cards include the narrative progression engine; cards with a
   reply shape add a minimum viable reply, a recovery sentence and one
   ordinary-turn example of the status block with concrete values.
3. Fill the engine modules with concrete behaviour: identity and core charm,
   background and motive, current pressure, narrative progression, player
   relationship, world or play functions, proactive turn behaviour, voice and
   action logic, emotional reactions, longplay hooks, scene reservoir and
   turn recipes, time and consequence, secret and reveal plan, player
   insertion space, agency boundaries, format stability.
4. Decide placement (definition, keyword Lorebook entries with descriptive
   names, opening, examples, output contract, display rules) and a
   compression stance: expand, move, cut or keep by whether it changes
   future turns. For every lore line: would the model get it wrong without
   it? Is it information or decoration?
5. Name the validate, render and play probes that would prove the engine.

## Checks

Each module changes future behaviour; no thin biography remains; the scene
reservoir prevents abstract repeated setup; no durable rule is stranded in
the opening; the player insertion space is protected. Continue with
`hearthroom-card-author` for files, `hearthroom-token-architect` when
allocation is still the blocker, `hearthroom-opening-director` when the
opening must be rebuilt after rules moved out of it, or
`hearthroom-chat-simulation` for play proof.

## Do not

- Do not pad to hit a number, and do not treat length as a validation gate.
- Do not write turn-count rules such as "after three turns"; pace by
  pressure and player action.
- Do not decide the player's feelings, consent, actions or route, and do not
  make the player open the new scene.
