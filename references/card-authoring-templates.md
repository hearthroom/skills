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
| Character core | `hearthroom-character-core` | identity, desire, contradiction, boundary, mask, leverage, pressure behaviour |
| Relationship engine | `hearthroom-relationship-architect` | promise, asymmetry, closeness and friction states, pacing gates, repair and rupture routes |
| Daily-life | `hearthroom-daily-life-architect` | routine, small desire, tiny disruption, shared object, habit state, second-turn change |
| World engine | `hearthroom-world-engineer` | player position, core rule, faction and location functions, state model, route seeds, exposition policy |
| Scenario | `hearthroom-scenario-architect` | incident, stakes, spine, route branches, clue ladder, suspect network, consequence state |
| Play engine | `hearthroom-play-engineer` | compact state, resource rules, quest and risk model, turn protocol, failure-forward behaviour |
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
- pressure behaviour:
- world rule:
- world state:
- compact state:
- turn protocol (game / generator only):
- route seeds:
- voice fingerprint:
- proactive behaviour:
- consequence loop:

Play:
- first scene:
- first reply paths:
- expected first user message:
- expected second-turn move:

Presentation:
- uiRole: assist | core (presentation-design.md, Story first)
- status overhead threshold (README.md):
- opening mode: plain | HTML
- status block the reply ends with (if any; canonical form in state-economy-design.md):
- display rules / kit modes needed:
- function bar content (if any):
- attention: which rule joins the iron laws, and its line in the final recency checklist
- render review plan: check-card → render → offline preview

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

Use the shape the owner skill defines; each skill's SKILL.md and reference
carry it. Copies are not repeated here, because copies drift. The agency
reply-path matrix is in `agency-design.md`; the status block and the state
packet are in `state-economy-design.md`; the playtest packet is in
`playtest-loop.md`.

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
- summary (about 260 characters, hook first):
- tags (from `hearthroom tags`):
- type: companion | story | game | generator
- sex / language / cardMeta:
- playerName / nickname (if used):
- prologue (suggested first lines):
- talkExample: one ordinary-turn sample (full length, full format) | more for a pressure case | omit only when both models hold without it
- outputContract (with the ordinary-turn example of the status block):
- customInstructions: omit | text (guardrail packet required)
- media.portrait / media.background / media.backgroundLandscape: file in assets/ | prompt only | missing
- media.folder (series share):

README.md (dossier, never sent):
- uiRole: assist | core; statusOverheadThreshold:

definition.md structure (order from prompt-attention-architecture.md):
- every-turn iron laws:
- card contract:
- player position and agency:
- engine (relationship / daily-life / world / play / generator / scenario):
- role identity, contradiction, boundary:
- voice fingerprint:
- proactive behaviour:
- progression and consequence:
- scene reservoir:
- state and output meaning:
- final recency checklist (agrees with the iron laws):

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
- display rules, function bar, page mode, mount layer, card format (mmd locks dark):

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
- weakest conversion layer (L0–L3) and what was done about it:
- promise / engine / play / presentation / agency / language / budget:
- uiRole honoured (assist reads well with rules off; core legible in text, degrades to text):
- remaining risks:
```

The field finalization packet is defined in `field-finalization.md`.

## Card dossier (README.md template)

`README.md` is never sent to the provider. It is the card's resume point:
`hearthroom-card-doctor`, `hearthroom-iteration-director` and
`hearthroom-collaboration-director` read it first, and every version updates
it.

```text
# <card name> — working notes (never sent)
uiRole: assist | core
statusOverheadThreshold: 15%   # core cards: your number and why
## Decisions
- <date> <decision> — because …
## Rejected directions
- <direction> — rejected because …; what it would have changed
## Evidence by version
| version | check-card | validate | render | protocol health (hit rate / overhead) | L0 | L1 | L2 | L3 | weakest |
## Open shortcomings (one per version)
```

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

One compact promise the player understands in three seconds, hook first:
a contrast, a question or a stake the player feels, then who I am, what I am
up against, why it is fun and what I can change (`profile-packaging.md`).

```text
[Hook sentence that begs "why?"] [Player role] is pulled into [situation]
with [character or system], where [tension] forces [play loop].

[Character] needs [player leverage] before [external pressure] breaks
[relationship, secret, mission or world rule].

Daily-life: You keep meeting [character] during [ordinary routine], where
[small pressure] slowly turns [relationship or habit] into [play loop].

Game: Lead [player position] through [world or system], managing [resources]
and [risk] as choices change [state or route].
```

## Definition section template

The definition's section order is owned by `prompt-attention-architecture.md`
(iron laws → card contract → agency boundary → progression engine → voice and
behaviour with "says instead" → state and output contract → scene reservoir
→ reference material → final recency checklist). Do not keep a second
template here; two orders drift apart.

## Opening scene template

For companion, story, daily-life, romance and ensemble cards. Plain text is
the default; add HTML blocks only where a presentation packet says they
earn their place.

```text
[Sensory opening tied to place and time.]
[Character action already in progress.]
"[Dialogue that reveals pressure and invites a response.]"
[Player implication: why the player matters now.]

[Optional `[status]` block, one lowercase `key: value` per line, at the end,
exactly as the output contract declares it; canonical form in
state-economy-design.md.]
[Optional `[choices]` block of 2-4 concrete actions, or put them in prologue instead.]
```

Choices never replace the scene, and they are drafts, not rails: free text
must always work. The scene must already contain place, character action,
pressure and player implication, and at least one line in the character's
own voice (L2: the opening is the free demo). Player-side first lines can go
into `card.json` `prologue` so the opening stays a scene. The status block is
declared in the output contract and drawn by a display rule; the model never
sees the drawn result (render rules are not generation rules).

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

L2 still applies: run one default beat of the system first (a result, a
consequence, in the card's voice) before offering setup; a bare menu shows no
voice.

```text
[One default beat already played out: a result and its consequence.]
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
  concealment, refusal style, says instead (one line replacing a tic), if passive / resists / trusts
Response-mode grid: trust / question / resist / passive / boundary
Catchphrase policy:
Ensemble contrast
- [Name]: wants, fears, speech cue, pressure move, player leverage
Blind-line test
- three anonymous lines; can identify speakers: yes | no
Example-conversation need
- one ordinary-turn sample by default (talk-example-design.md); a second for a pressure case
Pressure probes: trust / question / resist / passive / boundary
```

For three or more core speakers, add one compact sample per core role. Each
sample shows an ordinary exchange, not a rupture or a catchphrase; weak
models copy the sample every turn.

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

Use the self-review minimums in `role-card-writing-framework.md` and name the
weakest conversion layer; do not keep a third checklist here.
