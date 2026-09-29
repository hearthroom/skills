# Archetype Contracts

Use this reference when the author is unsure what kind of card they are
making, when a card mixes several formats, or when the chosen type is valid but
behaviorally generic. An archetype is not a genre label. It is the playable
contract the card makes with the player. Pick one primary contract; overlays
support it instead of competing with it.

## Card types and shapes

`type` in `card.json` is one of four values, chosen by what the player comes to
do:

| Type | Player promise | Covers |
|---|---|---|
| `companion` | become involved with a specific character | relationship, romance, friendship, rivalry, daily life with one character |
| `story` | enter an ongoing situation with stakes and branches | scenario, mystery, incident, drama, most ensemble drama |
| `game` | make durable choices under rules, risk, resources or a structured system | open-world adventure, survival, simulator, trainer |
| `generator` | create a usable artifact through intake, defaults, output and revision | creator assistant, helper, in-world artifact maker |

Shapes are engines inside a type, never a type of their own: daily life, light
setting, heavy setting, ensemble. Choose the type first, then the shape.

Every card answers: What does the player come here to do? What pressure makes
the next reply easy to write? What changes because of the player's choices?
Which field carries the durable engine? Which first-screen affordance proves
the contract?

## Contracts by type

### Companion

Engine: relationship pressure; desire and contradiction; player leverage;
pacing and refusal behavior; initiative when the player is passive. Summary:
the relationship promise plus immediate tension. Definition: identity, desire,
contradiction, boundary, voice, pressure behavior, trust or distance
progression. Opening: a scene already in motion where the character acts
first. Example conversations only if voice cannot be preserved by rules.
Failure modes: a mood-label character; a first turn that asks for comfort but
has no decision; closeness without pacing; the card deciding the player's
feelings or consent.

### Story

Engine: player position in the conflict; a starting incident; two to four
likely branches; named places or people only when they affect action; memory
of route choices. Summary: player position plus incident. Definition: stakes,
routes, key locations, pressure moves, memory rules, consequence loop;
sometimes-needed places and people go to the Lorebook. Opening: inside the
incident, not a setting tour; alternate openings can start from a different
incident. Failure modes: a premise summary with no scene; branches that change
scenery but not state, risk, relationship or access; a player who is only a
witness. Use `scenario-design.md`.

### Game

Structured system or simulator: modes or setup inputs; defaults when the
player gives little; a state format; generation rules; an update loop for
continue, revise and retry. Failure modes: the system only chats about the
task; endless intake; state too large to update.

Open-world adventure: player position or setup; compact stats and resources;
locations or quests that produce pressure; failure that changes play without
ending it; route rewards and costs. Failure modes: long lore but no rules;
stats that never change choices; a manual as opening; failure that ends the
story or is ignored; state not updated after the player's action.

Summary: player position and choice pressure, or system purpose and main
controls. Definition: rules, state schema, resources, factions, scene loop,
failure behavior, progression. The turn or reply format goes in the output
contract (`outputContract` in `card.json`). Opening: setup state or the first
crisis with choices, or a compact control surface with defaults. Example
conversations are useful when they teach the turn format. Visible state can
be drawn by display rules in `rules.json`. Use `play-engine-design.md`.

### Generator

Engine: a clear artifact type; intake questions with defaults; an output
schema; a quality rubric; named revision operations; one usable artifact as
soon as enough input exists. Summary: the artifact produced and the
collaboration loop. Definition: intake, defaults, revision commands, quality
rules, refusal and constraint handling; the output schema goes in the output
contract. Opening: ask for minimal input or offer defaults, never a vague chat
prompt. Example conversations are useful when they teach the schema. Failure
modes: advice instead of artifacts; endless questions; breaking character when
the generator is meant to be in-world. Use `generator-design.md`.

## Shapes

- Daily life: small ordinary actions slowly change trust, habit or distance.
  Needs an ordinary routine, a small pressure, a sensory anchor, a character
  who wants something specific, tiny progression signals. Opening: a specific
  ordinary moment the player can help, notice, refuse, tease or leave. Failure
  modes: no stakes; the player must invent all intimacy; a jump to melodrama
  because no small state exists. Use `daily-life-design.md`.
- Light setting: a clean fantasy frame without a manual. One core rule, one
  main relationship or position, one active location, one progression path.
  Opening reveals the rule through action. Failure modes: extra lore crowds
  out the first action; the rule is atmospheric but creates no choice.
- Heavy setting: a larger world through modular rules that become actions,
  costs, routes and consequences. A compact summary before modules, the
  player position, modules for rules, factions, locations, routes and state,
  an exposition policy, and a Lorebook plan so sometimes-needed lore stays out
  of the definition. Opening: one playable slice that works if the player
  ignores most lore. Failure modes: proper nouns replace play functions;
  history before action. Use `world-engine-design.md`.
- Ensemble: several core characters whose motives, voices and pressure moves
  create choices. Two to five active characters; a cast table with want, fear
  or cost, speech cue, pressure move and player leverage; turn ownership;
  gradual entry; memory of alliances and promises. Opening: one focal
  interaction, not a roll call. Example conversations: compact micro-samples
  for speakers who blur. Failure modes: names differ but voices match; the
  cast crowds out the player. Use `ensemble-card-design.md`.

## Hybrid rules

Name the primary contract and its type first; name the shape and overlays and
what each may do; reject archetypes that would need a different primary loop;
allocate fields by the primary contract; add a failure mode per overlay
conflict. Companion plus heavy setting: relationship pressure stays primary
and world facts become choices, costs or state, mostly in the Lorebook.
Companion plus generator: the output is an in-world artifact or a limited
mode, not writing advice. Story plus generator: artifacts advance the
scenario. Game plus romance: resources and routes intensify relationship
choices without drowning the emotional engine. Ensemble plus anything: define
turn ownership before adding cast. Boundary-sensitive plus anything: run
boundary design before first-scene escalation.

## Self-review probes

- Can the primary contract be named in one line, and does it match `type`?
- Does the first screen prove that contract?
- Do overlays add choice, cost, state, voice or artifact value without
  stealing the main loop?
- Does the definition carry the durable engine, with sometimes-needed facts in
  the Lorebook?
- Does the opening start play instead of explaining the concept?
- Does the player have a response path in under ten seconds?
- Does the card avoid deciding the player's feelings, memories, consent,
  actions or commitments?
- Is the length plan right for the contract? Check
  `hearthroom card push --validate --json` once fields exist.
