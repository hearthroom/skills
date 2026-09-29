---
name: hearthroom-generator-architect
description: Use when a card is a generator, creator assistant, helper or diegetic maker that must produce a usable artifact, or when such a card drifts into advice-only replies, endless intake or an unstable output shape and needs an artifact contract, intake defaults, output schema and revision operations before blueprinting, authoring, play testing or publish readiness.
---

# Hearthroom Generator Architect

Use this skill when the card's weak layer is artifact creation. The output is
a generator packet: a concrete artifact loop with intake, defaults, output
schema, revision operations, quality rubric and play probes. Generator cards
set `type` to `generator` in `card.json` and carry their output schema in
`outputContract`.

## Required references

Read `../../references/generator-design.md` first and
`../../references/platform-facts.md` for `card.json`, the output contract
limit and the `play` command. As needed:
`../../references/system-intake-card-design.md` when the intake is a visible
console built from `hc-*` components; `../../references/opening-design.md`
when the intake opening is vague or long;
`../../references/archetype-contracts.md` when generator versus companion,
story or game is open; `../../references/voice-calibration.md` when a diegetic
creator drifts into generic assistant voice;
`../../references/token-economy.md` when schema or forms bloat the opening.

Use `hearthroom-play-engineer` instead when the loop is stats, resources or
simulator state; `hearthroom-scenario-architect` when it is a branchable
incident; `hearthroom-archetype-director` first when it is unclear whether the
generator is primary or an overlay.

## Workflow

1. Confirm a generator task and identify the artifact type, player role, creator persona, and whether generator is the primary contract or an overlay.
2. Define the artifact contract: must include, may include, must not include.
3. Design intake with defaults: required inputs, optional inputs, default assumptions, when to ask, when to proceed. If the intake is a visible console, plan the scene beat, panel, form and choices per `system-intake-card-design.md`.
4. Build the output schema (4-8 named sections) and the quality rubric. The schema goes into `outputContract`, within the limit `card validate --json` reports under `tokenBudget.limits`.
5. Define named revision operations and what each preserves, plus artifact memory and `continue` behavior.
6. If diegetic, define the creator persona and how it stays in character while producing usable sections.
7. Design the opening contract, field allocation, token plan and play probes; run the self-review.

## Hand-off

```text
Generator packet:
- current seed or failure:
- generator promise:
- card shape:
- artifact type:
- player role:
- creator persona:
- artifact contract:
- intake surface:
- output schema:
- revision operations:
- quality rubric:
- artifact memory:
- refusal / constraint handling:
- diegetic mode:
- opening contract:
- field allocation:
- token plan:
- play probes:
- self-review: one usable artifact; defaults prevent endless intake; schema stable; revisions preserve constraints; use beyond advice; agency preserved; diegetic voice kept
- next skill:
```

Hand it to `hearthroom-card-author` when the packet is coherent;
`hearthroom-opening-director` when the intake opening still stalls or lacks a
default start; `hearthroom-voice-director` when the creator voice is weak;
`hearthroom-token-architect` when schema or controls bloat the wrong file;
`hearthroom-chat-simulation` after push and validation when artifact output,
revisions or defaults need real turns.

## Do not

- Do not let setup questions become the experience. Ask only for what changes the artifact, then produce.
- Do not answer with advice when the player asked for an artifact.
- Do not change the output shape between turns. The schema is the promise.
- Do not let revisions erase the player's constraints or the previous artifact unless asked.
- Do not let a diegetic persona hide the artifact. Usefulness first.
- Do not edit files, push or play from this skill.
