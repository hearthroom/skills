# Play Engine Design

Use this reference when a card behaves like an RPG, adventure, open-world,
survival, investigation, sandbox or other structured game loop. Such cards set
`type` to `game` in `card.json`. The goal is not more rules. The goal is that
every visible rule produces a choice, a cost, a state update and a renewed hook.

## Core rule

```text
visible state -> immediate pressure -> player action -> resolution -> state update -> renewed choice
```

If a stat, resource, item, quest, faction, combat rule or route does not change
the next choices within a few turns, cut it, merge it or turn it into a cost.

## Scope ladder

Choose the smallest playable scope:

- light adventure: one mission; one pressure, 2-3 routes, a few state fields
- investigation / case: clue state, risk clock, access rules, cost of accusation
- RPG / open-world: compact state, resource costs, failure-forward rules, route rewards
- survival / horror: visible risk, limited resources, retreat routes, pacing and boundaries
- simulator / management: mode, state schema, update loop, defaults, revise or retry rules

Lore alone does not justify RPG scope. Choices that need resources, risk,
routes, state and progression do.

## Compact state

Track only what changes future behaviour. `hearthroom-state-economist` sets
the number: two to six visible fields drawn from place and time, pressure,
resources, condition, route and relationship; a game may keep a few more
hidden flags in the definition. Update state after every reply that changed
the situation, including refusals, retreats and partial successes. Show only
state the player can use now or soon. Prefer named flags and simple levels
over many numbers. Never hide state that contradicts the player's visible
options.

The model updates only what it writes. The output contract tells it to end
every reply with one `[status]` block; the canonical form and where it lives
are in `state-economy-design.md`. Put the same block in `welcome.md` so the
first screen shows it. A display rule plus the sandbox kit (`sandbox-kit.md`)
draws the block inside the bubble; never draw a second copy in the function
bar, and a pinned bar carries one to three values at most. The output
contract's example shows an ordinary turn, not a climax.

Give every value one owner. The model owns it if it appears in the block. A
script owns it if it lives in `sdk.save` (achievements, unlocks across
conversations), and then the model never states it. Never both: the model's
copy rewinds with the conversation and the script's does not. A scene-only
value is `volatile`: no fallback, it disappears when the model stops writing
it.

## UI role

Story first, `uiRole`, the five jobs of UI and the overhead ratio:
`presentation-design.md`. The play-specific sentence: a game card is the one
shape that is often `uiRole: core`, where a meter, map or deck is the game;
even then every mechanic stays legible in the reply text, the interface
degrades to readable text when a rule fails, and each UI mechanic can say
which choice or consequence it changes.

## Resource economy

A resource is playable only if spending, saving, losing or gaining it changes
the next scene: spend for speed, safety, leverage or access; save to endure a
later clock or bargain; lose through risk, time, injury or exposure; gain by
trade, discovery, alliance or accepting a cost. Cut item lists where nothing
is used, stats that only look game-like, and losses that punish without
opening another route.

## Quest and risk model

Keep one main pressure, 2-3 active routes and a few deferred routes.

```text
Quest: trigger, objective, player approaches, pressure, cost, risk,
reward / unlock, failure-forward outcome, memory left behind, renewed hook
```

Risk should be legible before the player commits. A route may still surprise,
but the choice must feel authored by the player, not by a hidden punishment.

## Turn protocol

```text
1. Read the player's last action and intent.
2. Resolve the consequence without writing the player's next action.
3. Narrate the immediate result inside the current scene.
4. Present the next pressure.
5. Offer 2-4 paths with visible cost, risk or route meaning.
6. End with the status block.
```

The card may infer reasonable consequences. It must not decide the player's
feelings, courage, loyalty, consent, memories or future action. Avoid a bare
"what do you do?" unless the scene already shows obvious options.

Choices are drafts, not a menu. On the sandbox page a tap puts the line into
the composer (`sdk.input.set(text)` then `sdk.input.focus()`,
`platform-facts.md`) so the player can edit before sending; only a one-tap
default start may send directly, inside the click handler with no `await`.
Typed free text must always be handled as well as any button. For first-turn
choices prefer `prologue` lines in `card.json`: they are the player's own
editable lines, not the character's.

## Chance

When a card wants dice or any other draw, let the page own it: the draw happens
on the player's tap, and the result (the number and its outcome band) goes out
inside the player's own message, so the model only narrates an outcome it was
handed. Asking the model to roll, or to echo the roll back as its own line,
fails on weak models: they narrate a result and drop the line, or invent rolls
nobody made. Draw the number synchronously in the click handler and send it
there (the send must stay inside the player's gesture); any animation plays
afterwards. Screen effects read the result from the player's line, not from the
reply. With the screen off, the bracketed result still reads as plain text.

The same holds for any turn the player triggers by protocol, such as declaring
an ending: a rule that says "when the player writes X, do Y" is easy for a weak
model to miss deep in a long conversation, so the page appends a short
out-of-story instruction to the player's own message when it sends it (and
shows the player their line without it). A one-off instruction can be a plain
sentence. A reminder sent on every turn should be a short tag the instructions
define, like the dice result: a card that also has a rule for answering
out-of-story questions can read a repeated out-of-story sentence as a question
and reply out of story.

## Failure-forward behaviour

Failure changes play; it neither ends it nor vanishes: wounds, debt, damaged
items, lost time, raised clocks, exposed secrets, faction suspicion, blocked
shortcuts, partial clues, costly bargains, forced retreats, or depletion that
unlocks a harder but playable alternative. Death, permanent lockout or story
end require a clear warning and an explicit player choice to keep taking
lethal risk. Ignored failure is also failure: if nothing changes, the route
was decorative.

## Progression phases

Phases are behaviour modes, not chapters: setup under pressure, first route,
entanglement, reversal, mastery or endgame, renewal from remembered state. For
each, name trigger, system pressure, player leverage, unlocks and risk. Do not
force a fixed order unless the card is a linear scenario.

## Opening contract

The first screen combines setup and action: one place and its pressure, one
visible state block or compact setup, one concrete object, threat, demand or
resource decision, 2-4 choices tied to risk, resource, route or state, and
defaults for minimal input. Do not open on a rulebook, faction list or
inventory catalogue. Durable rules live in `definition.md`; `welcome.md`
proves the system is playable. When the setup needs controls, read
`../../references/system-intake-card-design.md`. An alternate opening is a
different starting situation, never the main opening reworded; put each in
`openings/alt-NN.md` and test it with `play --new-session --greeting N`.

## Field allocation

- summary (`card.json`): player position, world or system, core pressure.
- `definition.md`: core loop, compact state, resources, turn protocol, quest
  routes, failure-forward behaviour, progression, agency guardrails, narrator
  style. Order it by `prompt-attention-architecture.md`: iron rules at the
  top, the turn protocol and the status block format at the end as the recency
  checklist; the two must say the same thing.
- `welcome.md`: one playable setup or crisis with the first status block and
  choices.
- `outputContract` (`card.json`): the reply shape and the status block.
- `talkExample` (`card.json`): examples beat rules for weak models: one
  ordinary-turn sample by default (`talk-example-design.md`), with its status
  block, never a climax.
- `lorebook.json`: locations, factions, item tables and route notes as
  keyword-triggered entries named by content. Constant entries only for rules
  needed every turn; keep them few and short.
- presentation: only if it does one of UI's five jobs
  (`presentation-design.md`); otherwise none.

Spend tokens on the loop, state, turn protocol and routes before opening,
style and samples. Cut first: inactive factions, unused stats, equipment
catalogues, lore history. Read counts and limits from
`hearthroom card validate --json` under `tokenBudget`.

## Play probes

Playtest: 10–20 turns, a weak and a strong model, `--new-session`, one
shortcoming per version, compared with the previous version
(`playtest-loop.md`). Seed the runs with:

1. Resource probe: spend or refuse to spend a key resource.
2. Route-change probe: take the less obvious approach.
3. Failure-forward probe: attempt something likely to fail.
4. Continuity probe: refer back to an earlier state change.
5. Passive probe: send a minimal or vague message.

Pass means the card resolves the action, keeps the status block intact and
updated at the last turn, changes resource, risk, route, access or
relationship, preserves player agency and offers a renewed hook.
