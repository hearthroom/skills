# Card authoring templates

Scaffolds to use after the card shape is chosen. They list the decisions a
card cannot leave open; they are not finished prose and not a form to fill.
Replace every bracketed field with concrete card content, keep only the
packets that are present, required or intentionally delayed, and say what
the obvious card would have done where this one does something else.

## Packet index

Each narrow skill hands back one packet. Preserve packets by name and by
content; do not summarise away their concrete decisions.

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
| Opening | `hearthroom-opening-director` | the beats, expected first message, second-turn move |
| Longplay | `hearthroom-longplay-architect` | continuity spine, phases, state model, route seeds, role initiative |
| State economy | `hearthroom-state-economist` | kept and omitted fields, visibility, update triggers, status block contract |
| Token architecture | `hearthroom-token-architect` | budget signal, allocation, keep / move / cut / rewrite, compression ladder |
| Presentation | `hearthroom-presentation-director` | plain vs HTML, HTML block plan, display rules, status block, first-screen hierarchy |
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

The shape of each packet is defined once, by its owner skill and reference;
copies are not repeated here because copies drift. The reply-path matrix is
in `agency-design.md`, the status block and state packet in
`state-economy-design.md`, the playtest checks in `playtest-loop.md`.

## Universal draft

Settle these before writing files for a thin or high-stakes brief; the
order is promise, engine, play, presentation.

- Shape, language, content rating intent, player role.
- Promise: fantasy, relationship, central tension.
- Engine: role desire, contradiction, boundary, player leverage, pressure
  behaviour; world rule and state; compact state; turn protocol (game and
  generator only); route seeds; voice fingerprint; proactive behaviour;
  consequence loop.
- Play: first scene, first reply paths, expected first user message,
  expected second-turn move.
- Presentation: `uiRole` and the status overhead threshold (dossier);
  opening mode; the status block the reply ends with, if any (canonical form
  in `state-economy-design.md`); display rules or kit modes; function bar
  content; which rule joins the iron laws and its line in the final recency
  checklist.
- Budget: summary, definition and opening targets for the language; what
  moves to Lorebook entries; what to cut first.
- Packets present, and packets intentionally delayed.

## Final field assembly

When packets exist and the author asks for field-ready content, assemble;
do not restart ideation unless a required packet is missing or
contradictory. Decide and record:

- Mode (draft-only, new trial card, patch), push now or not, language,
  visibility (trial card, private card, public submission later: the
  author's call), and which packets were preserved, resolved or delayed.
- `card.json`: `name`; `summary` (about 260 characters, hook first); `tags`
  from `hearthroom tags`; `type`; `sex`, `language`, `cardMeta`;
  `playerName` and `nickname` if used; `prologue`; `talkExample` (one
  ordinary-turn sample at full length and format; more for a pressure case;
  omit only when both models hold without it); `outputContract` with the
  ordinary-turn example of the status block; `customInstructions` omitted
  unless a guardrail packet exists; `media.portrait`, `media.background`,
  `media.backgroundLandscape` (file in `assets/`, prompt only, or missing);
  `media.folder` for a series.
- `README.md` dossier (never sent): `uiRole`, `statusOverheadThreshold`.
- `definition.md`, in the order `prompt-attention-architecture.md` gives:
  every-turn iron laws; card contract; player position and agency; engine;
  identity, contradiction, boundary; voice fingerprint; proactive
  behaviour; progression and consequence; scene reservoir; state and output
  meaning; final recency checklist that agrees with the iron laws.
- `welcome.md` (mode, beats, first reply paths, expected second-turn move)
  and `openings/alt-NN.md` (what each alternate changes).
- `lorebook.json` entries (descriptive name, keywords, constant?) and
  `rules.json` (display rules, function bar, page mode, mount layer, card
  format; `mmd` locks dark).
- Budget per field against its limit, keep / move / cut / rewrite, and any
  conflict between packets with the chosen rule and the reason.
- The validate, render and play hand-off: validation risks, render focus,
  play probes and cost stance, the weakest conversion layer and what was
  done about it, and whether `uiRole` is honoured (assist reads well with
  rules off; core legible in text, degrades to text).

The field finalization checks are in `field-finalization.md`.

## Card dossier (README.md)

`README.md` is never sent to the provider. It is the card's resume point:
`hearthroom-card-doctor`, `hearthroom-iteration-director` and
`hearthroom-collaboration-director` read it first, and every version
updates it.

```text
# <card name> — working notes (never sent)
uiRole: assist | core
statusOverheadThreshold: 15%   # core cards: your number and why
## Decisions
- <date> <decision> — because …
## Rejected directions
- <direction> — rejected because …; what it would have changed
## Evidence by version
| version | check | validate | render | protocol health (hit rate / overhead) | L0 | L1 | L2 | L3 | weakest |
## Open shortcomings (one per version)
```

## Summary patterns

One compact promise the player understands in three seconds, hook first:
a contrast, a question or a stake the player feels, then who I am, what I
am up against, why it is fun and what I can change (`profile-packaging.md`).

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

## Opening scene

For companion, story, daily-life, romance and ensemble cards. Plain text is
the default; add HTML blocks only where a presentation packet says they
earn their place.

```text
[Sensory opening tied to place and time.]
[Character action already in progress.]
"[Dialogue that reveals pressure and invites a response.]"
[Player implication: why the player matters now.]

[Optional `[status]` block, one lowercase `key: value` per line, at the end,
exactly as the output contract declares it.]
[Optional `[choices]` block of 2-4 concrete actions, or put them in prologue.]
```

Choices never replace the scene, and they are drafts, not rails: free text
must always work. The scene already contains place, character action,
pressure and player implication, and at least one line in the character's
own voice (L2: the opening is the free demo). Player-side first lines can
go into `card.json` `prologue` so the opening stays a scene. The status
block is declared in the output contract and drawn by a display rule; the
model never sees the drawn result. Never repair a flat opening by adding
exposition; add a playable scene, a first reply path and a second-turn
move.

## Game and system opening

L2 still applies: run one default beat of the system first (a result, a
consequence, in the card's voice) before offering setup; a bare menu shows
no voice.

```text
[One default beat already played out: a result and its consequence.]
[One-sentence premise and immediate situation.]
[What the player controls and what pressure is active.]
[Setup fields the player may fill, with defaults stated.]
1. Start with the default setup
2. Ask for a custom setup
3. Jump into the first crisis
```

The system proceeds with defaults when the player gives minimal input. If
the setup should be a form, write plain HTML inputs holding the defaults
and send buttons in a display rule (`hearthroom-presentation-director`).

## Ensemble cast

No more than five core roles unless the card is explicitly a large
simulator.

```text
Cast
- [Name]: motive, relation to player, speech cue, conflict with another cast
  member, what they do under pressure.

Turn ownership
- opening focus / who interrupts / who hangs back / when secondary roles enter
```

The opening starts with one focal crisis, never a roll call.

## Voice card

Per speaker: rhythm, vocabulary, address terms, tells, action beats,
concealment, refusal style, "says instead" (one line replacing a tic), and
behaviour when passive, resisting or trusting. For ensembles add the
contrast row (wants, fears, speech cue, pressure move, player leverage) and
run the blind-line test on three anonymous lines. One ordinary-turn sample
by default (`talk-example-design.md`); for three or more core speakers one
compact sample per core role, each an ordinary exchange, never a rupture or
a catchphrase, because weak models copy the sample every turn.

## Boundary-sensitive card

Settle rating intent, explicitness ceiling, premise risk, the player agency
contract, allowed pressure tools and disallowed moves, the escalation
ladder, player refusal handling and the role's refusal style, stop
conditions, what the role may invite and must not decide, the safer
fallback, first-scene guardrails and play probes (`boundary-design.md`).
The character can create pressure while preserving agency; when the player
sets a boundary, the character reacts in character and keeps the scene
playable.
