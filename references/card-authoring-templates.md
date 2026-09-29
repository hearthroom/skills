# Card authoring templates

Scaffolds to use after the card shape is chosen. They are not finished prose.
Replace every bracketed field with concrete card content, and include only the
packets that are present, required or intentionally delayed.

## Packet index

Each narrow skill hands back one packet. Preserve packets by name and by
content; do not summarize away their concrete decisions.

| Packet | Owner | Carries |
|---|---|---|
| Premise workshop | `hearthroom-premise-workshop` | selected direction, involvement ladder, risk flags, next decisions |
| Archetype | `hearthroom-archetype-director` | primary type, overlays, contract, field allocation, skill order |
| Tension | `hearthroom-tension-weaver` | role desire, player leverage, external pressure, why now, first-scene hook |
| Character core | `hearthroom-character-core` | identity, desire, contradiction, boundary, mask, leverage, pressure behavior |
| Relationship engine | `hearthroom-relationship-architect` | promise, asymmetry, closeness and friction states, pacing gates, repair and rupture routes |
| Daily-life | `hearthroom-daily-life-architect` | routine, small desire, tiny disruption, shared object, habit state, second-turn change |
| World engine | `hearthroom-world-engineer` | player position, core rule, faction and location functions, state model, route seeds, exposition policy |
| Scenario | `hearthroom-scenario-architect` | incident, stakes, spine, route branches, clue ladder, suspect network, consequence state |
| Play engine | `hearthroom-play-engineer` | compact state, resource rules, quest and risk model, turn protocol, failure-forward behavior |
| Generator | `hearthroom-generator-architect` | artifact contract, intake defaults, output schema, revision operations, artifact memory |
| Ensemble | `hearthroom-ensemble-director` | cast decisions, turn ownership, spotlight rules, group tension, voice contrast |
| Agency | `hearthroom-agency-designer` | insertion space, controls, refusals, reply-path matrix, consequence checks |
| Voice director | `hearthroom-voice-director` | rhythm, vocabulary, tells, refusal style, response-mode grid, blind-line test |
| Example conversations | `hearthroom-talk-example-curator` | omit / micro-samples / full decision, sample jobs, token payment |
| Language style | `hearthroom-language-stylist` | locale, pronoun and address matrix, rewrite rules, field pass |
| Opening | `hearthroom-opening-director` | five beats, expected first message, second-turn move |
| Longplay | `hearthroom-longplay-architect` | continuity spine, phases, state model, route seeds, role initiative |
| State economy | `hearthroom-state-economist` | kept and omitted fields, visibility, update triggers, status line contract |
| Token architecture | `hearthroom-token-architect` | budget signal, allocation, keep / move / cut / rewrite, compression ladder |
| Presentation | `hearthroom-presentation-director` | plain vs HTML, HTML block plan, display rules, status line, first-screen hierarchy |
| Boundary | `hearthroom-boundary-designer` | rating intent, explicitness ceiling, escalation ladder, refusal, stop conditions, safer fallback |
| Profile package | `hearthroom-profile-packager` | selected name, summary, tags, first-impression check |
| Visual identity | `hearthroom-visual-identity-director` | art direction, image prompts, media file status |
| Originality adaptation | `hearthroom-originality-adapter` | transferable fantasy, protected surface, substitutions, distance check |
| Source-to-play map | `hearthroom-material-distiller` | inventory, playable promise, kept modules, opening slice, delayed and cut |
| Detail engine | `hearthroom-detail-engineer` | engine modules, placement, compression stance |
| Quality audit | `hearthroom-quality-auditor` | tier, scorecard, weakest dimensions, first three repairs |
| Card diagnosis | `hearthroom-card-doctor` | primary failure, repair order, symptom map, field triage |
| Card series | `hearthroom-series-architect` | shared core, keep / merge / reject, variant contracts, authoring order |
| Instruction guardrail | `hearthroom-instruction-guardrail` | evidence, allowed constraints, custom-instructions stance |

## Universal draft packet

Draft this before writing files for a thin or high-stakes brief.

```text
Card shape:
Language:
Content rating intent:
Player role:

Promise:
- fantasy:
- relationship:
- central tension:

Engine:
- role desire:
- contradiction:
- boundary:
- player leverage:
- pressure behavior:
- world rule:
- world state:
- compact state:
- turn protocol (game / generator only):
- route seeds:
- voice fingerprint:
- proactive behavior:
- consequence loop:

Play:
- first scene:
- first reply paths:
- expected first user message:
- expected second-turn move:

Presentation:
- opening mode: plain | HTML
- status line the reply carries (if any):
- display rules needed:
- function bar content (if any):
- render review plan:

Budget plan:
- summary target:
- definition target and language:
- opening target:
- what moves to Lorebook entries:
- what to cut first:

Packets present:
- [name]: [one-line content or "see packet above"]
Packets intentionally delayed:
```

## Core packet shapes

Use the shape the owner skill defines. The most used ones are repeated here so
an assembling agent can check completeness.

```text
Tension packet:
- current inertness:
- role desire:
- player leverage:
- external pressure:
- why now:
- consequence if the player does nothing:
- first-scene hook:
- reply paths: accept | question | refuse | redirect
- field placement:
- hand-off:

Character-core packet:
- current failure:
- appeal promise:
- identity:
- desire:
- contradiction:
- boundary:
- mask / wound:
- player leverage:
- relationship asymmetry:
- pressure behavior (trust / resist / passive / boundary):
- interaction hooks:
- token tradeoff:

Relationship-engine packet:
- relationship promise:
- asymmetry:
- closeness and friction states:
- pacing gates:
- repair routes:
- rupture / distance routes:
- reply-path matrix:
- passive-player behavior:
- second-turn relationship move:
- long-session renewal:
- example-conversation decision:
- field placement:

World-engine packet:
- world promise:
- player position:
- core world rule:
- playable slice:
- active pressure:
- faction / relationship network:
- locations:
- resources / clocks / costs:
- state model:
- route seeds:
- exposition policy:
- Lorebook entries vs definition:

Play-engine packet:
- play promise:
- player controls / card must not decide:
- core loop:
- compact state model:
- resource rules:
- quest / risk model:
- turn protocol:
- failure-forward behavior:
- progression phases:
- opening contract:
- state visibility:
- play probes:

Generator packet:
- artifact type and contract (must / may / must not include):
- intake surface (required, optional, defaults, when to ask, when to proceed):
- output schema (sections, ordering, length, formatting):
- revision operations (trigger, effect, preserves):
- quality rubric:
- artifact memory:
- refusal / constraint handling:
- opening contract:

Scenario packet:
- ongoing incident and stakes:
- core question:
- story spine:
- route branches:
- clue / reveal ladder:
- suspect / pressure network:
- compact consequence state:
- opening incident and second-turn reveal:
- false-lead handling:
- route-funnel guardrails:

Daily-life packet:
- ordinary routine:
- small playable desire:
- tiny disruption:
- shared object / place:
- habit state:
- reply paths (help, ask, refuse, tease, notice, leave, stay silent, set terms):
- passive-player behavior:
- boundary and romance posture:
- second-turn change:
- return-next-time hook:

Agency packet:
- player insertion space:
- player controls / can refuse / can change:
- card must not decide:
- interaction hooks:
- reply-path matrix:
- consequence checks:
- passive-player behavior:
- boundary handling:

Voice-director packet:
- social surface / private motive:
- sentence rhythm:
- vocabulary:
- address terms:
- emotional tells:
- action beats:
- concealment:
- refusal style:
- never says:
- catchphrase policy:
- response-mode grid (trust / question / resist / passive / boundary):
- example-conversation decision:
- blind-line test:

Opening packet:
- current failure:
- place / time:
- role action already happening:
- pressure:
- player implication:
- reply paths:
- expected first user message:
- second-turn move:
- what changes:
- token tradeoff:

Longplay packet:
- continuity spine:
- progression phases:
- state model:
- route seeds (trigger, cost, unlock, memory, renewed hook):
- memory threads:
- role initiative:
- passive / stalled player behavior:
- scene renewal rules:
- continuation probes:

State economy packet:
- state need:
- status line: fields shown (2-6 that change next action, risk, relationship, resource or scene)
- generation and update rule:
- state fields (key, visibility, allowed values, update trigger, what it changes):
- omitted state and why:
- placement: definition | output contract | display rule
- agency guardrails:

Presentation packet:
- opening mode: plain | HTML
- HTML blocks and why each earns its place:
- status line shape and the display rule that draws it:
- function bar content:
- page mode: sandbox | classic
- first-screen hierarchy:
- mobile / readability risks:
- render review plan:

Boundary packet:
- rating intent:
- explicitness ceiling:
- player agency contract:
- allowed pressure tools / disallowed moves:
- escalation ladder:
- refusal and slowdown behavior:
- stop conditions:
- safer fallback:
- first-scene guardrails:
- play probes:
```

## Final field-authoring packet

Use when packets exist and the author asks for field-ready content. Assemble;
do not restart ideation unless a required packet is missing or contradictory.

```text
Route:
- mode: draft-only | new trial card | patch existing folder
- push now: yes | no
- language:
- visibility: trial card | private card | public submission later (author's call)

Inputs preserved:
- [packet name]: preserved | resolved | delayed

card.json:
- name:
- summary:
- tags:
- type: companion | story | game | generator
- language:
- playerName / nickname (if used):
- prologue (suggested first lines):
- talkExample: omit | micro-samples | full, with samples
- outputContract:
- customInstructions: omit | text (guardrail packet required)
- media.portrait / media.background: file in assets/ | prompt only | missing

definition.md structure:
- every-turn iron laws (long cards):
- card contract:
- player position and agency:
- engine (relationship / daily-life / world / play / generator / scenario):
- role identity, contradiction, boundary:
- voice fingerprint:
- proactive behavior:
- progression and consequence:
- scene reservoir:
- state and output meaning:

welcome.md:
- mode: plain | HTML
- five beats:
- first reply paths:
- expected second-turn move:
openings/alt-NN.md:
- alternates and what each changes:

lorebook.json:
- entries (descriptive name, keywords, constant?):
rules.json:
- display rules, function bar, page mode:

Budget:
- per-field estimate vs limit:
- keep / move / cut / rewrite:

Conflict resolution:
- conflict: chosen rule, rejected rule, reason

Validate / render / play hand-off:
- validation risks:
- render focus:
- play probes and cost stance:

Self-review:
- promise / engine / play / presentation / agency / language / budget:
- remaining risks:
```

The field finalization packet is defined in `field-finalization.md`.

## Source-to-play hand-off packet

Use after `hearthroom-material-distiller` has processed notes or a world bible.

```text
Material inventory:
- [source name/type]: [play function]
Playable promise:
- fantasy / player role / central tension:
Kept modules:
- durable rule / character engine / state or consequence / voice anchor:
Opening slice:
- location / immediate pressure / role action / player implication:
Delayed / cut:
Placement:
- definition / Lorebook entries / opening / examples:
Ready for: blueprint yes | no; authoring yes | no
```

## Card-series hand-off packet

```text
Card-series packet:
- shared core: identity, desire, contradiction, boundary, leverage, asymmetry, voice baseline, motifs
- variant map: keep / merge / reject
- variant contracts: [variant]: type, promise, player role, unique pressure, opening proof, longplay loop, boundary posture, budget
- overlap risks:
- authoring order:
- validate / render / play plan:
```

## Summary patterns

One compact sentence the player understands in three seconds.

```text
[Player role] is pulled into [situation] with [character or system], where
[tension] forces [play loop].

[Character] needs [player leverage] before [external pressure] breaks
[relationship, secret, mission or world rule].

Daily-life: You keep meeting [character] during [ordinary routine], where
[small pressure] slowly turns [relationship or habit] into [play loop].

Game: Lead [player position] through [world or system], managing [resources]
and [risk] as choices change [state or route].
```

## Definition section template

Headings or compact labels. Durable rules live here, not in the opening. For
long definitions follow `prompt-attention-architecture.md`.

```text
# Role Runtime Contract

## 0. Every-Turn Iron Laws
- [5-7 must-do rules: narrative progression, agency boundary, minimum viable
  reply, action-path closure, one card-specific format or state rule.]

## 1. Card Contract
- player role / main pressure / external goal / opposing force / story direction owner

## 2. State and Output Contract
- status line source of truth (if any) / hidden state / choices rule
- reply shape reference (see output contract)

## 3. Core premise
## 4. Player position
- who the player is, what they control, what they do not control, what they
  can enter, refuse, change, risk, spend, carry, reveal, hide or unlock

## 5. Agency and interaction
- insertion space / hooks / reply-path matrix / consequence checks /
  passive-player behavior / boundary handling

## 6. Engine (pick the shape's module)
- relationship / daily-life / world / play / generator / scenario engine

## 7. Role identity
## 8. Contradiction and boundary
## 9. Player leverage and pressure behavior
- if the player trusts / questions / is passive / sets a boundary: [behavior]

## 10. Voice fingerprint
- rhythm / vocabulary / address terms / tells / avoided phrasing / refusal style

## 11. Proactive behavior
## 12. Progression and consequence
## 13. Scene reservoir / turn recipes
## 14. Do / Avoid
## Final Recency Checklist
```

## Opening scene template

For companion, story, daily-life, romance and ensemble cards. Plain text is
the default; add HTML blocks only where a presentation packet says they
earn their place.

```text
[Sensory opening tied to place and time.]
[Character action already in progress.]
"[Dialogue that reveals pressure and invites a response.]"
[Player implication: why the player matters now.]

[Optional status line the reply shape uses, e.g. STATUS: tension::high;;trust::1]
[Optional 2-4 concrete action options, or put them in prologue instead.]
```

Choices never replace the scene. The scene must already contain place,
character action, pressure and player implication. Player-side first lines can
go into `card.json` `prologue` so the opening stays a scene. A status line is
declared in the output contract and drawn by a display rule; the model never
sees the drawn result.

## Opening repair packet

```text
Current failure:
Opening promise:
Player role:
Five beats: place/time, role action, pressure, player implication, reply paths
Expected first user message:
Second-turn move:
What changes:
Opening mode: plain | HTML
Token tradeoff: keep in opening / move to definition / move to display rules / cut
Ready to write welcome.md: yes | no
```

Never repair a flat opening by adding exposition. Add a playable scene, a
first reply path and a second-turn move.

## Game and system opening template

```text
[One-sentence premise and immediate situation.]
[What the player controls and what pressure is active.]
[Setup fields the player may fill, with defaults stated.]
1. Start with the default setup
2. Ask for a custom setup
3. Jump into the first crisis
```

The system proceeds with defaults when the player gives minimal input. If the
setup should be a form, write plain HTML inputs holding the defaults and send
buttons in a display rule; route the layout to
`hearthroom-presentation-director`.

## Ensemble cast template

No more than five core roles unless the card is explicitly a large simulator.

```text
Cast
- [Name]: motive, relation to player, speech cue, conflict with another cast
  member, what they do under pressure.

Turn ownership
- opening focus / who interrupts / who hangs back / when secondary roles enter
```

The opening starts with one focal crisis, never a roll call.

## Voice calibration packet

```text
Current failure:
Voice promise:
Voice cards
- [Name]: rhythm, vocabulary, address terms, tells, action beats,
  concealment, refusal style, never says, if passive / resists / trusts
Response-mode grid: trust / question / resist / passive / boundary
Catchphrase policy:
Ensemble contrast
- [Name]: wants, fears, speech cue, pressure move, player leverage
Blind-line test
- three anonymous lines; can identify speakers: yes | no
Example-conversation need
- none because / micro-sample for / cut elsewhere to pay
Pressure probes: trust / question / resist / passive / boundary
```

For three or more core speakers, add one compact micro-sample per core role
unless voices are already unmistakable in the definition. Each sample teaches
pressure behavior, not a catchphrase.

## Boundary-sensitive template

```text
Rating intent:
Explicitness ceiling:
Premise risk:
Player agency contract:
Allowed pressure tools / disallowed moves:
Escalation ladder:
Player refusal handling / role refusal style:
Stop conditions:
What the role may invite / must not decide:
Safer fallback:
First-scene guardrails:
Play probes:
```

The character can create pressure while preserving agency. When the player
sets a boundary, the character reacts in character and keeps the scene
playable.

## Self-review packet

Before render or play, answer:

```text
Promise: pass | revise because ...
Anchor: pass | revise because ...
Engine (relationship / daily-life / world / play / generator / scenario): pass | revise
Voice texture and calibration: pass | revise
Consequence: pass | revise
Role initiative: pass | revise
Agency: pass | revise
Opening scene: pass | revise
Longplay: pass | revise
Boundary design: pass | revise
Archetype fit: pass | revise
Budget: pass | revise

Expected first user message:
Expected second-turn move:
Cut if too long:
```

Any `revise` means patch the files before pushing for render or play.
