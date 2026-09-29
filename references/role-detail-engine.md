# Role detail engine

Use this reference when a definition is too thin, biography-heavy, padded, or
scattered across the opening, examples and markup. The goal is a durable
operating engine that keeps the character consistent after the first screen.

## Core rule

The definition is not a character bio. It is the character's runbook:

```text
identity -> motive -> pressure -> relationship -> world/play functions ->
voice -> consequence -> longplay -> scene reservoir -> boundaries ->
format stability
```

Fill detail only while each section buys future behavior, route memory, state
change, voice control or agency protection. Stop when the next section would
only repeat mood, lore or adjectives.

## Every-turn iron laws

Put a compact 5-7 item every-turn block near the top of any long definition for
a high-ambition story, scenario, game, system or meta-narrative card. It gives
the model a primacy anchor before lore, voice and scene reservoirs. Limits are
character counts; leave buffer under the definition limit so late edits do not
push the field over.

For plot-driven cards include a narrative progression engine:

1. Inciting incident: within the first one or two character turns, ignite a
   main line with an external goal, pressure, route, risk or obligation. Do not
   stay in goal-less chatter unless daily-life is the primary contract.
2. Next station: every character turn leaves one concrete next station: a
   reachable place, route, clue, person, object, task, deadline or decision.
3. Progression and response are separate duties: answer the player's move, then
   also move the story one step. The player chooses how to act; the character
   or narrator owns story direction.
4. Do not make the player open the new scene: when the player is passive,
   evasive or off-path, the character still introduces a playable next
   situation while preserving agency.
5. State change over mood loop: each turn changes relationship, route, risk,
   clue, access, resource, boundary or obligation. If only mood changes, add a
   concrete affordance.
6. Output contract: when the card uses a status line or choices, keep them
   compact and player-facing without turning the reply into a dashboard.

Do not write turn-count rules. "Same scene for two turns", "after three turns
move on" or "reveal on turn five" depend on the model counting history it may
not see, and they rush players who want to linger. Prefer stateless per-turn
rules: keep the forward door open, leave a next station, make each turn
self-contained.

## When to use

- The definition is short for its language and ambition.
- It is a biography with no runnable behavior under pressure.
- The first turn is strong but later turns drift or wait.
- Durable rules live in the opening, in markup or in examples.
- The author asks for a top-card, full-detail or longplay-capable character.

Use `token-economy.md` when only allocation is the problem after the engine
exists. Use `prompt-attention-architecture.md` for attention dilution or
cross-model drift. Preserve the narrow engine packet first when appeal, world,
relationship, play rules, agency, voice or longplay is not designed yet.

## Language-aware budget

Use the budget as a craft target, not a padding order.

- Non-English cards often need 5,000-10,000 definition characters for story,
  relationship, world, ensemble, game, system or generator engines.
- English cards (`language` exactly `en`) have a much larger limit and need
  more characters for the same depth. Judge by module coverage, not by CJK
  character intuition.
- Light-setting or intimate companion cards can be shorter, but still need
  motive, relationship rules, voice, initiative, boundaries and progression.

Treat the lower edge of the band as a floor for complete, high-ambition drafts.
A non-English draft well below it is usually unfinished unless the card is
intentionally light and every module is proven in play. This is a writing
signal, not a validation rule.

## Detail engine packet

```text
Detail engine packet:
- current failure:
- language / budget target:
- card shape:
- existing packets preserved:
- engine modules:
  - identity and core charm:
  - background and motive:
  - current pressure:
  - narrative progression engine:
  - player relationship:
  - world / scenario / play functions:
  - proactive turn behavior:
  - voice and action logic:
  - emotional reactions:
  - longplay hooks:
  - scene reservoir / turn recipes:
  - time and consequence:
  - secret and reveal plan:
  - player insertion space:
  - agency boundaries:
  - format stability:
- placement:
  - definition:
  - Lorebook entries:
  - opening:
  - example conversations:
  - output contract / display rules:
- compression stance:
- validate / render / play probes:
- hand-off:
```

## Engine modules

### Identity and core charm

State what makes the character memorable as behavior. Replace quiet, cold,
powerful, sweet, mysterious or chaotic with how they act when they want
something, hide something or are challenged.

### Background and motive

Keep history only when it changes play. Every backstory item explains a current
want, fear, debt, skill, taboo, relationship pressure or available route.

### Current pressure

Name what starts now: a timer, visit, demand, lost object, secret, threat,
promise, test, deadline, debt, ritual, accident or social consequence. Without
it, detail is static lore.

### Player relationship

Define who the player may be relative to the character: witness, partner,
client, rival, caretaker, student, suspect, recruit, stranger, cohabitant,
operator or creator. Include what the player knows, controls, risks, withholds
or can change.

### World, scenario and play functions

Convert setting into functions:

- faction: want, cost, leverage, pressure move
- location: access rule, risk, resource, return hook
- object: use, loss, clue, promise, debt
- resource: what spending, saving, losing or gaining changes
- clue: what it unlocks and which false assumption it complicates
- rule: what it creates, forbids, delays or prices

Leave out calendars, species lists, maps and catalogs that change nothing.
Facts needed only in some scenes go into Lorebook entries with keywords and a
descriptive name; the definition keeps what every turn needs.

### Proactive turn behavior

Specify what the character does when the player is passive, brief, evasive,
resistant, curious, boundary-setting or route-changing: ask, reveal, escalate,
offer, test, delay, bargain, protect or complicate.

### Voice and action logic

Write executable voice: sentence rhythm, vocabulary, address terms, metaphors,
emotional tells, action beats, refusal style, avoided phrasing. Tie voice to
pressure so it changes under trust, fear, embarrassment, anger, relief or
suspicion.

### Emotional reactions

Define reaction logic, not labels: what the character admits, deflects, hides,
jokes about, turns into action or refuses to name when the player approaches,
doubts, helps, mocks, refuses or asks about the past.

### Longplay hooks

List route seeds with triggers, costs, unlocks, memory and renewed hooks. Name
what changes by turn two, what can recur later, and what the character
remembers when the player returns.

### Scene reservoir and turn recipes

Give the character material to spend after the opening: a compact inventory of
playable situations it can recombine, not a script.

```text
Scene seed:
- trigger:
- place / object:
- role move:
- player leverage:
- state or relationship change:
- renewed hook:
```

Write 4-8 seeds for high-ambition cards, fewer for light ones. Cover normal,
passive, refusal, route-change, return-later and pressure-spike situations when
the shape needs them. Include one turn recipe for a short player reply:

```text
observe player move -> show concrete consequence -> make in-character move ->
offer one next action or a sharper question
```

For cards that failed play on agency or next-move clarity, add an action-path
closure rule: the last visible block of every turn returns control to the
player through choices, a direct decision question, or a concrete affordance.
Ending on mood, a twist line or a clue alone is not enough unless the playable
next move follows.

### Time and consequence

Define how time passes and what delay changes: location status, distance,
suspicion, resource decay, faction alert, weather, deadline, opportunity, debt
or risk. Consequences continue play; they do not end it.

### Secret and reveal plan

Secrets create behavior before they are revealed. Define what the character
hides or misdirects, what evidence can surface early, what the player can ask,
notice, test or risk, and what changes on partial or full reveal. Never dump
secrets in the opening.

### Player insertion space

Leave feelings, consent, motives, exact action and final route to the player.
Detail can pressure, invite, tempt or constrain; it cannot decide.

### Agency boundaries

State what the character must not narrate for the player: feelings,
commitments, consent, route choices, guilt, loyalty, desire, bodily action or
final interpretation. Include refusal and slowdown behavior when needed.

### Format stability

For cards with a status line, generator schema, game turn protocol or another
reply shape, keep format rules compact and explicit. Put the shape in the
output contract and the card-specific meaning (when state changes, when
choices appear, what a status label means later) in the definition. Never
paste a generic formatting manual.

## Placement

- Definition: identity, relationship, world and play functions, voice,
  boundaries, longplay, state rules, format meaning.
- Lorebook: sometimes-needed facts with keywords; few short constant entries
  for what must always be present.
- Opening: only the first scene, immediate pressure and first reply paths.
- Example conversations: only when they teach voice, refusal, format or turn
  protocol more cheaply than rules.
- Output contract and display rules: reply shape and how it is drawn, never the
  only place a durable rule exists.

## Self-review

- Would the second turn beat the first without inventing a new plot?
- Does each section change future behavior, state, route, voice or boundary?
- Can the character act on a short or passive message?
- Are there enough scene seeds to avoid abstract repeated setup?
- Can the player refuse, redirect, ask, test or slow down without ending play?
- Are secrets paced rather than dumped?
- Is time and consequence concrete enough to create memory?
- Is player insertion space protected?
- Did the opening get shorter because the engine moved into the definition?
- Is the budget appropriate for the language and the engine depth?

## Repair pattern

1. Preserve existing packets and author taste.
2. Identify the missing modules.
3. Expand them with concrete behavior, not padding.
4. Add a small scene reservoir and one turn recipe.
5. Move durable rules out of the opening and examples. Move conditional lore
   into Lorebook entries.
6. Compress repeated mood, biography and inert lore.
7. Rebuild the opening only if it was carrying the engine.
8. Push with validation, render, then play once the detail can sustain later
   turns.
