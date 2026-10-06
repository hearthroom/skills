---
name: hearthroom-card-blueprint
description: Use when a card task has a chosen direction, a premise packet, a source-to-play map or enough concrete seed to define character core, relationship, world, voice, first scene and play loop before any card files are written or pushed.
---

# Hearthroom Card Blueprint

Ideation and design stage. The output is an original blueprint packet that
`hearthroom-card-author` can turn into card files. Do not write files or run
the CLI from here.

## Required references

Read `../../references/role-card-writing-framework.md` for the top-card
pattern stack and archetype recipes,
`../../references/card-authoring-templates.md` for packet shapes, and
`../../references/platform-facts.md` for the card `type` values, the Lorebook,
the output contract and display rules.

Read the narrow reference when that layer is the problem:
`../../references/premise-workshop.md` (no settled role, player or first
scene), `../../references/character-core-design.md` (thin or trope-only
character), `../../references/relationship-engine.md` (generic flirting,
comfort loops, instant intimacy), `../../references/world-engine-design.md`
(lore dump, factions, locations), `../../references/scenario-design.md`
(mystery, investigation, event), `../../references/daily-life-design.md`
(quiet routine), `../../references/play-engine-design.md` (stats, quests,
turn protocol), `../../references/generator-design.md` (artifact output),
`../../references/tension-triangle.md` (attractive but inert premise),
`../../references/state-economy-design.md` (which state to track),
`../../references/archetype-contracts.md` (unclear type),
`../../references/card-series-design.md` (variants),
`../../references/ensemble-card-design.md` (several speakers),
`../../references/material-distillation.md` (files or a world bible),
`../../references/voice-calibration.md` (distinctive dialogue),
`../../references/opening-design.md` (first screen),
`../../references/longplay-design.md` (replayability),
`../../references/agency-design.md` (player can only watch),
`../../references/token-economy.md` (allocation),
`../../references/quality-rubric.md` and
`../../references/quality-scorecard.md` (is it good enough),
`../../references/boundary-design.md` and
`../../references/cost-and-boundaries.md` (mature or sensitive premise).

## Workflow

1. Restate the seed in one sentence.
2. Name the missing inputs: player role, relationship pressure, card shape,
   content rating intent, language, success criteria. Route to the narrow
   skill first when its packet is missing: `hearthroom-premise-workshop` for a
   mood or trope only, `hearthroom-material-distiller` for source material,
   `hearthroom-boundary-designer` for sensitive premises,
   `hearthroom-archetype-director` for an unclear or hybrid type,
   `hearthroom-series-architect` for related cards,
   `hearthroom-ensemble-director` for several active speakers,
   `hearthroom-play-engineer`, `hearthroom-generator-architect`,
   `hearthroom-scenario-architect` or `hearthroom-daily-life-architect` for
   those shapes.
3. If the seed is vague, propose two or three sharply different directions
   that differ by player role, conflict, first scene, route loop and long-term
   consequence. If a premise packet exists, preserve its selected direction
   instead of re-brainstorming.
4. Pick one direction and say why it is more playable than the generic version.
5. Build the tension triangle: role desire, player leverage, external
   pressure. Use `hearthroom-tension-weaver` when the premise is inert.
6. Define the character core: identity, desire, contradiction, boundary, mask
   or wound, player leverage, pressure behaviour, what changes as the player
   moves closer or pushes back. Appearance: write only what deviates from the
   default picture the name and genre already evoke (test: hide the name;
   would you recognise them?). Relationship to the player: one concrete image
   ("she still keeps your umbrella by the door"), never "deep feelings". Use
   `hearthroom-character-core` when appeal is the weak layer.
7. Define the player insertion space: what the player controls, can refuse,
   can change, and what the card must never decide. Use
   `hearthroom-agency-designer` for spectator play or decorative choices.
8. Build the engine for the shape: relationship
   (`hearthroom-relationship-architect`), world (`hearthroom-world-engineer`),
   play, generator, scenario or daily-life. Define the world only as far as it
   creates play; sometimes-needed facts become Lorebook entries.
9. Define the voice fingerprint: rhythm, vocabulary, address terms, emotional
   tells, action beats, concealment, refusal style, and "says instead" (one
   line showing what replaces a tic you want gone). For ensembles add a
   contrast matrix. Use `hearthroom-voice-director` when voice is the main
   repair.
10. Decide allocation early: what belongs in the definition, the opening,
    Lorebook entries, the output contract and display rules. Use
    `hearthroom-token-architect` when the opening wants to become a manual.
11. Design the first scene and the second-turn engine together. The opening
    is the free demo: it must show the voice, offer one low-friction first
    action, and leave a pull the player wants to answer; the second-turn
    move must be better than the opening, not a restatement. Write the
    expected first user message and the character's second-turn move. Use
    `hearthroom-opening-director` when the opening is the core problem,
    `hearthroom-longplay-architect` for a dead third turn,
    `hearthroom-state-economist` when the state fields are unsettled.
12. Draft a compact summary, a definition outline and an opening concept.
13. Self-review and repair any weak layer. If the author asked for an audit,
    get a `hearthroom-quality-auditor` scorecard before authoring.

## Hand-off

Return a blueprint packet with only the sections that apply:

```text
Seed:
Recommended direction: why stronger, card shape, type, language, rating intent
Tension: role desire, player leverage, external pressure, why now, first-scene hook
Character core: identity, desire, contradiction, boundary, mask, leverage, pressure behaviour
Player insertion: controls, can refuse, can change, must not decide, reply-path matrix
Engine packet(s): relationship | world | play | generator | scenario | daily-life | ensemble
Voice fingerprint: rhythm, vocabulary, address terms, tells, refusal style, says instead
First scene: place/time, role action, pressure, player implication, reply paths
Second-turn engine: expected first user message, role move, what changes, renewed hook
State economy: kept fields, visibility, update triggers
UI role: assist | core; what each UI element changes (presentation-design.md, Story first)
Status overhead: fields × typical length vs reply length; declared threshold
Attention: which rule joins the top iron rules, and the matching line in the final recency checklist (prompt-attention-architecture.md)
Field draft: name, summary, definition outline, opening concept
Allocation: definition | opening | Lorebook | output contract | display rules | cut first
Boundary packet (when sensitive):
Self-review: strongest, weakest, required repair before authoring
Ready for hearthroom-card-author: yes | no; what to clarify first
```

Preserve every narrow packet by name and content. Do not summarize away cast
decisions, reply paths, state fields, route costs or the second-turn move.

## Do not

- Do not settle for a genre label. "Vampire", "academy", "roommate" or "RPG"
  is a seed, not a card.
- Do not hand off a card where the player only watches.
- Do not repair a flat relationship with prettier affection; add asymmetry,
  state, cost and renewal.
- Do not make a heavy world playable with a lore tour; use one immediate
  problem.
- Do not split one concept into variants without `hearthroom-series-architect`.
- Do not copy unprovided material or claim an origin you cannot support.
- Do not fill a missing packet with placeholders; route to its skill.
