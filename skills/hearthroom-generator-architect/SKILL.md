---
name: hearthroom-generator-architect
description: Use when a card is a generator, creator assistant, helper or diegetic maker that must produce a usable artifact, or when such a card drifts into advice-only replies, endless intake questions or an unstable output shape, before authoring, playtesting or publish readiness.
---

# Hearthroom Generator Architect

Give a generator card a concrete artifact loop: intake with defaults, a
stable output schema, named revision operations and a quality rubric.
Generator cards set `type` to `generator` and carry the schema in
`outputContract`. The output is a generator packet.

## Required references

Read `../../references/generator-design.md`. Read the narrow reference only
when it is the blocker: `../../references/system-intake-card-design.md` (a
visible intake console from plain HTML and display rules),
`../../references/opening-design.md` (a vague or long intake opening),
`../../references/archetype-contracts.md` (generator versus companion, story
or game), `../../references/voice-calibration.md` (a diegetic creator
sounding like a generic assistant), `../../references/talk-example-design.md`
(the ordinary request-and-artifact sample). Stats or simulator state go to
`hearthroom-play-engineer`; a branchable incident to
`hearthroom-scenario-architect`.

## Workflow

1. Identify the artifact type, player role, creator persona, and whether the
   generator is primary or an overlay.
2. Define the artifact contract: must include, may include, must not include.
3. Design intake with defaults: required and optional inputs, default
   assumptions, when to ask, when to proceed; choices are drafts that fill
   the composer and free text always works. A visible console gets its scene
   beat, panel, form and choices from `system-intake-card-design.md`.
4. Build the output schema (as many named sections as the artifact needs,
   usually four to eight) and the quality rubric, within the output
   contract limit `card validate --json` reports.
5. Define named revision operations and what each preserves, artifact memory
   and `continue` behaviour, and, for a diegetic creator, how the persona
   stays in character while producing usable sections.
6. Design the opening contract (one small artifact or preset in the creator's
   voice before any question), field allocation, one ordinary
   request-and-artifact sample, and play probes.

## Packet

Promise; artifact type; player role; creator persona; artifact contract;
intake surface; output schema; revision operations; quality rubric;
artifact memory; refusal and constraint handling; diegetic mode; opening
contract; field allocation; probes. Continue with `hearthroom-card-author`
when coherent, `hearthroom-opening-director` when the intake opening still
stalls, `hearthroom-voice-director` when the creator voice is weak, or
`hearthroom-chat-simulation` after push.

## Do not

- Do not let setup questions become the experience; ask only for what
  changes the artifact, then produce.
- Do not answer with advice when the player asked for an artifact, and do
  not change the output shape between turns.
- Do not let revisions erase the player's constraints or the previous
  artifact unless asked.
