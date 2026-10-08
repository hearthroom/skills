# Card writing framework

## Questions, not a mould

This toolkit exists to make cards that are unlike each other. Its packets list
the decisions a card must make, never the answers; its templates show one
shape, not the shape; its examples are there to be departed from. A card that
could have been produced by filling the packets in is a failed card, however
clean. Before settling any direction, name the obvious version of it and
discard it; then the second-most obvious. Keep the device that serves this
card's story, not the device the toolkit happens to have a section for (a
status block, a dock, five beats, a reply-path matrix are tools, and most cards
need only some of them). The checks here are to catch what does not work, not
to make everything work the same way.

Use this framework when writing, improving, reviewing or play-testing a
Hearthroom card.

## Core thesis

A top card is not a well-written persona. It is a playable engine:

```text
Hook -> Agency -> Consequence -> Memory -> Progression -> New Hook
```

The opening should be easy to answer. The definition should keep the character
consistent. The loop should give the player a reason to continue.

## Funnel

A card is judged by deep-play conversion: L0, the cover and the title alone
make a stranger stop (Promise); L1, the summary makes them open the opening
(Promise); L2, the opening is the free demo that earns the first paid message
— the voice is heard, there is one low-friction first action, and a pull to
answer (Play's first scene); L3, turn two is better than turn one, choices
accumulate and have consequences, and there is a reason to return (Engine and
longplay). The layers multiply, so the weakest one caps the card: find it
first and repair it before polishing a layer that already works. A card's
tier cannot exceed the tier of its weakest layer. This is the only statement
of the funnel in the toolkit; the router, the scorecard and the iteration
loop point here.

## The four-layer model

### 1. Promise

What the player understands in three seconds: name, summary, tags, portrait.
It answers: what fantasy does this card offer, who is the player in relation to
it, and what can happen here that cannot happen in a generic chat.

Keep the summary to about 260 characters for every card shape, with the hook
in the first sentence (`profile-packaging.md`). If the premise cannot be
stated briefly, the card is not ready to write. Use `profile-packaging.md` when the engine
exists but the public package is weak; `visual-identity.md` when portrait or
background is the weak first impression; `language-style.md` when the engine
works but script, register or address terms drift.

### 2. Engine

The character's durable behaviour and world logic. It belongs in the
definition, with sometimes-needed facts in Lorebook entries.

Include identity and relationship to the player, personality drivers and
contradictions, boundaries and pacing, speech style and tells, world rules and
routes, proactive behaviour for a passive player, and what must stay stable
across long sessions.

Length follows modules, never a count: a module earns its place when play
shows the model getting it wrong without it, and non-English limits keep at
least about 500 characters free (`token-economy.md`). Use
`role-detail-engine.md` or `hearthroom-detail-engineer` when the definition
is a thin biography or misses the modules that make later turns work.

### 3. Play

The first scene and the ongoing loop. It belongs in the opening, with
player-side first lines optionally in `prologue`.

A strong opening has location, time and immediate situation; the character's
first concrete action; pressure, tension or a choice; a clear response path;
and, for reusable systems, a setup prompt with defaults.

Avoid "Hello, I am X, what do you want to do?", lore before the player can act,
instructions that make the character play the player, menu screens with no
scene, and visual markup that costs tokens but adds no affordance.

Opening lengths are soft starting points in `token-economy.md`; an HTML
opening is only as long as the first action needs.

### 4. Presentation

How the card feels without corrupting the story logic. Story first: a card
declares `uiRole: assist` (the replies read well with display rules off) or
`core` (mechanics bound to the interface, legible in text, degrading to
text), and UI earns its place only by memory, making choices legible,
pacing, showing the world reacting, or orientation; choices are drafts, not
rails, and free input stays first-class (`presentation-design.md`, Story
first). On Hearthroom this is plain text or plain HTML and CSS in the
opening and replies, plus display rules in `rules.json` and the sandbox kit
that turn a `[status]` block into a panel and a `[choices]` block into
buttons. Route presentation decisions to `hearthroom-presentation-director`
and verify with `check-card.mjs`, `hearthroom card render --json` and the
offline preview.

## The PACT loop

- Playable: the player knows what to do next. Can the first reply be written in
  ten seconds? Does the scene invite action, choice, confession, conflict,
  exploration or setup? Is the player role clear?
- Anchored: the character has stable identity and behaviour. Does the definition
  say what they want, how they talk, what changes slowly and what can change
  fast?
- Consequential: player actions matter. Do relationship, resources, trust,
  location, time, reputation or route change with choices? Is there a reason
  to continue after the first scene, without railroading?
- Token-efficient: the opening stays shorter than the engine unless it is a
  setup surface; reusable visuals live in display rules; repeated adjectives,
  duplicated lore and one-off lists are gone; compact state exists only where
  it will be updated.

Read `tokenBudget` from `card validate --json` as a structural check. A thin
definition that lacks identity, motive, current situation, relationship rules,
world or play functions, proactive moves, voice, emotional reactions, longplay
hooks, time and consequence, secrets, insertion space, agency boundaries or
format stability is not ready to push. An opening longer than the definition
usually means lore, rules or scaffolding should move. Use `token-economy.md`
for a field-by-field plan.

## Audit and diagnosis

When the author asks "is this good enough?", score before rewriting with
`quality-scorecard.md`: evidence-backed scores, blockers, a tier, weakest
dimensions and the first three repairs. The scorecard guides skill hand-off; it
is not a validation rule or a ranking claim.

When an existing card has mixed symptoms (vague promise plus biography-heavy
definition, long visual opening plus thin engine, feedback like boring, off,
passive, verbose or controlling, unclear repair order), diagnose with
`card-diagnosis.md` first. A card can pass validation and render well and still
fail after one reply. Do not rewrite every field or spend another play turn
until the patch target is clear.

## Top-card pattern stack

The goal is a card that generates a better second turn than the first, not
longer prose.

0. Premise workshop. A mood, trope or aesthetic is not a card. Use
   `premise-workshop.md` to open three contrasted directions and converge on
   one before blueprinting.
1. Tension triangle. Role desire, player leverage, external pressure. A card
   missing one side goes passive or becomes a lore dump. Use
   `tension-triangle.md` when a chosen premise is attractive but inert.
2. Character core. Appeal promise, desire, contradiction, boundary, mask or
   wound, player leverage, relationship asymmetry, pressure behaviour. "Cold but
   soft" or "a powerful X" is a label to repair with `character-core-design.md`.
3. Relationship engine. Promise, asymmetry, closeness and friction states,
   pacing gates, repair and rupture routes, a reply-path matrix, and
   passive-player behaviour. If the card only improves by prettier affection, it
   is not repaired. Use `relationship-engine.md`.
4. Daily-life engine. Ordinary routine, small playable desire, tiny disruption,
   shared object or place, habit state, reply paths, romance posture,
   second-turn change. Use `daily-life-design.md`.
5. World engine. World promise, player position, one core rule, faction
   network with wants and costs, locations with access rules, compact state,
   route seeds, exposition policy. A card that starts with calendars, species
   or proper nouns needs `world-engine-design.md`. Facts needed only sometimes
   go into Lorebook entries.
6. Play engine. Play promise, controls, compact state, resource rules, quest
   and risk model, turn protocol, failure-forward behaviour. An opening that
   reads like a manual needs `play-engine-design.md`.
7. Player agency. Room to decide identity, emotion, intention, method,
   boundary and route. Reply-path matrix with distinct responses, consequence
   checks, and a list of what the card must not decide. Use `agency-design.md`
   when the player can only watch.
8. Second-turn engine. Design turns 0, 1 and 2 together. Write one likely
   first message and the intended second-turn move. If turn two only restates
   setup, add consequence or initiative.
9. State economy. Track only state that changes play: relationship, world,
   resource, promise. Use `state-economy-design.md` to decide kept, omitted,
   visible and hidden fields and the status line contract. Never store the
   player's feelings, consent, loyalty, actions or final route as state.
10. Voice fingerprint. Rhythm, vocabulary, emotional tells, action beats,
    refusal style. "Gentle", "witty" and "natural" are labels, not
    instructions. Use `voice-calibration.md` for voice cards, micro-samples and
    blind-line checks; `language-style.md` when the voice is right but the
    surface is not.
11. Route seeds. Two to four seeds (closer, conflict, exploration, mastery),
    each with a cost. Choices without cost are a menu; choices with cost
    create memory.
12. Token ladder. Spend on the engine, then the first scene, then compact
    examples, then presentation that improves agency or state visibility,
    then decoration. When shortening, preserve desire, contradiction, boundary,
    world rule, state, route costs, voice and consequence first.
13. Visual affordance. Presentation must answer what the player can do, what
    changed, what mood or risk frames the scene, or which route is active.
    Otherwise compress it and spend the tokens on the engine.
14. Material distillation. Notes, files or a world bible become a
    source-to-play map before any drafting (`material-distillation.md`).
15. Boundary design. Mature, intense, horror-leaning, jealous, power-imbalanced
    or consent-sensitive cards get a boundary packet before the provocative
    parts (`boundary-design.md`).
16. Opening direction. A greeting, lore tour, menu or roll call is repaired as
    a first-turn problem with `opening-design.md`, not by rewriting the card.
17. Longplay design. A card that dies after a few turns needs
    `longplay-design.md`: continuity spine, phases, state, route seeds, memory
    threads, role initiative, continuation probes.
18. Card series. Several cards from one seed need `card-series-design.md`
    first. A variant needs a different playable contract, not a different
    mood or costume. Author the anchor card first.

## Card minimums

Aim above these before pushing a card for render or play.

1. The summary sells the premise in one sentence: who, relationship, tension.
2. The definition is an engine, not a label: identity, desire, contradiction,
   boundaries, speech style, progression rules.
3. Speech style is executable: sentence length, rhythm, vocabulary, address
   terms, tells, restraint, and "says instead" for any tic to remove.
4. Progression is explicit: what choices change, which state moves, how the
   next hook renews.
5. Role initiative is explicit: what the character asks, reveals, escalates or
   offers when the player stalls.
6. The opening gives a first action path through choices, a direct question or
   an explicit "you can..." affordance, and opens with sensory context, a
   character beat, pressure and player implication.
7. The author can name one likely first reply and one second-turn move that
   changes state, relationship, risk, route or information.
8. Long-session cards can name a continuity spine, state model, route seeds,
   memory threads and return-later behaviour.
9. Related sets can name the shared core and each variant's distinct contract.
10. Script, register, pronouns and address terms are consistent across
    summary, definition, opening and examples.

These are writing checks. Validation does not enforce them.

## Repair order

Repair the weakest funnel layer first; within a layer, agency and boundary
before polish. The full order (technical blockers → agency and boundary →
the weakest conversion layer → everything else, one primary repair per
version) is owned by `card-diagnosis.md`.

A polished, valid card with weak agency or weak consequence still needs repair.

## Archetype recipes

Craft archetypes map onto `card.json` `type` (`companion`, `story`, `game`,
`generator`); daily-life, light-setting, heavy-setting and ensemble are
overlays on those types.

### Companion / relationship (`companion`)

One clear relationship pressure, one contradiction, one reason the scene starts
now, an opening that puts the character in motion. Good first-scene pressures:
late-night confrontation, secret discovered, overdue apology, forced
cooperation, returning after an absence, a social mask cracking in private.
Checks: asymmetry exists; the boundary gives closeness pacing; the first scene
asks for a decision, not comfort; turn two can reveal, test or cost something.

### Story / scenario (`story`)

Protagonist position, starting conflict, named locations with stakes, two to
four branches, lightweight memory rules. The opening begins inside the scene.
Checks: the setting creates scenes by rule; the player has a position
(witness, suspect, heir, recruit, investigator, caretaker); branches change
route state; places matter only when the player can visit, lose, protect,
unlock or be trapped by them.

### System / simulator (`game` or `generator`)

Mode selection or setup prompt, world rules and loop, state format, what to
generate versus ask, how "continue" advances. Checks: the first turn starts on
minimal input; defaults, commands and a revision loop exist; each result
carries next actions; the card knows when to ask one question and when to
proceed.

### RPG / open-world (`game`)

Character creation inputs, location and quest loop, stats, inventory,
factions, time, risk, rewards, consequences for travel, combat, social choices
and resource use, state update rules. Long definitions are justified only when
modular: core rules, map, progression, NPC behaviour, combat, economy, output
format. Checks: meaningful choices under pressure; state small enough to update
every turn; failure changes the world without ending the session; NPCs have
motives and limits; rewards unlock choices.

### Generator / creator assistant (`generator`)

Intake questions, output schema, revision loop with stable commands, quality
rubric, defaults when intake is skipped, at least one finished artifact per
normal turn, refusal handling. Use `generator-design.md` when the draft is
advice-only, asks indefinitely or forgets the previous artifact.

### Canon or inspired adaptation

Transferable fantasy, not a renamed copy. Use `originality-adaptation.md`: keep
the relationship shape and voice function, substitute identity, player role,
pressure source, symbolic object, motifs and state labels, and run a distance
check. Put the facts the scene needs in the definition; never rely on the model
"knowing" the source. Reviewers see a definition similarity score, so
originality of the definition text matters.

When the author explicitly wants a recognisable fan card, the player's
position and the card's machinery come from structures the source already has
(its own systems, roles, places, recurring jokes); do not import the frame of
another card or invent an institution the source lacks. A reader who knows the
source should recognise the premise from the first screen, and the opening's
tone should match the source's (a bright source opens bright).

### Daily-life / slice-of-life (overlay on `companion`)

One routine with hidden pressure, a small desire and a tiny disruption, a
shared object that can return changed, compact habit state, sensory anchors.
Checks: the scene has a reason to start now; the first turn offers a natural
action (help, tease, refuse, ask, notice, hide, offer, leave); turn two shows
one small concrete change; progression is accumulated tiny changes, not
melodrama.

### Light-setting

One core rule or hook, one main location, one relationship, one progression
path, no more lore than the first scene uses. Checks: the premise is clear from
the summary and first screen; no manual is needed; the definition still has
enough anchors to prevent drift.

### Heavy-setting / lore-rich

Compact summary before deep lore; modules for rules, factions, places, routes,
history and output behaviour; a clear player position; state that decides which
lore matters next; named entities only when they affect play. Move rarely
needed modules into Lorebook entries with keywords and descriptive names.
Checks: the first scene works if the player ignores most lore; each faction or
place creates an action, obstacle, cost or reward.

### Ensemble / multi-character

Two to five active core roles, a cast table (motive, relation to player, speech
cue, conflict), turn ownership, gradual introduction of secondary roles, memory
rules for alliances and promises, one voice card or micro-sample per core
speaker. Use `ensemble-card-design.md` for cast keep / merge / cut, spotlight
rules and group tension. Checks: distinct desires and speech fingerprints; the
cast never drowns out the player; the opening starts with one focal
interaction; group conflict creates choices; a blind-line test identifies
speakers.

## Field allocation

- Summary: the pitch. `[Player role] enters [situation] with [character or
  system], where [central tension] creates [play loop].`
- Definition: the engine, ordered by `prompt-attention-architecture.md`:
  iron laws, card contract, player position, role identity, personality and
  contradictions, speech style with "says instead", world or relationship
  rules, progression and consequence, memory and state rules, final recency
  checklist.
- Lorebook: sometimes-needed facts with keywords. Few, short constant entries.
  Name entries by what they contain so an agent-mode character can find them.
- Opening: `[sensory opening] + [role action] + [pressure] + [player
  implication] + [reply path]`; for systems `[greeting] + [modes] + [setup
  fields with defaults] + [example command]`. Alternate openings in
  `openings/alt-NN.md` each change the situation, not just the mood.
- Suggested first lines (`prologue`): player-side reply paths offered as
  choices; never the character's line.
- Example conversations: one ordinary-turn sample by default; examples beat
  rules for weak models, which copy the sample every turn
  (`talk-example-design.md`).
- Output contract: the reply shape, short, with one ordinary-turn example of
  the `[status]` block with concrete values (`state-economy-design.md`).
- Custom instructions: rarely. They replace one default instruction block.
  Read `instruction-guardrails.md` first; never use them to patch a weak core,
  missing voice, bad opening or unsafe boundaries.

## Common failure patterns

- Pretty prose with no player action.
- A generic greeting opening.
- A world bible in the opening.
- Source material pasted instead of distilled.
- A boundary-sensitive card that says "respect consent" with no ceiling,
  ladder, refusal route, stop conditions or fallback.
- Relationship labels without concrete tension.
- Rules that decide the player's actions.
- Status lines that never update.
- Decoration that makes the card harder to read.
- Many names but no immediate scene.
- Ensemble members who share one narrator voice.
- An adaptation that assumes model memory.
- A generator that gives advice only, asks forever or changes its schema.

## Evaluation probes

The probe matrix, the two-model 10–20-turn standard and the triage table are
in `playtest-loop.md`; use them once the author accepts the cost.
