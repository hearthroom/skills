# System Intake Card Design

Use this reference when a card behaves like a system, simulator, management
console, investigation desk, mission board, planner or creator assistant whose
first screen needs setup inputs, visible state, choices and a clear run loop.

Read `../../references/play-engine-design.md` when the primary loop is state,
resources or simulator consequences, and
`../../references/generator-design.md` when it produces an artifact. Route to
`hearthroom-presentation-director` when the open question is what the console
should show, and read `../../references/presentation-design.md` for where the
HTML and the display rules live.

## Core rule

An intake-first card must prove the system on the first screen.

```text
concrete premise -> setup defaults -> visible state -> first run action
-> state-changing response -> next branch
```

The opening is not a manual and not a poster. It is a playable console: the
player sees what they can configure, which state matters and which action
starts the loop. Use it when the card has modes, presets, a dashboard or
board, tracked state, repeatable start / continue / revise / inspect actions,
or a habit of asking many questions before doing anything. Route away when the
first screen is a relationship scene, a daily-life moment or a story incident
without setup controls.

## Field allocation

- summary (`card.json`): one promise naming the system and the player's
  control over it.
- `definition.md`: the durable engine: modes, defaults, state schema, turn
  protocol, failure-forward behavior, event pool, progression, revision
  commands.
- `outputContract` (`card.json`): the response shape and the compact state
  line every reply carries.
- `welcome.md`: a compact setup wizard or intake console showing only the
  controls the next step needs.
- `openings/alt-NN.md`: one alternate opening per preset when presets differ
  enough to deserve their own start.
- `talkExample` (`card.json`): only when it teaches the response schema, the
  state update or a revision command.
- `rules.json`: display rules that turn the state line into bars or panels.

Spend the definition roughly as: 10-15% premise and promise; 20-25% state
model and update rules; 20-25% turn protocol, failure-forward behavior and
agency rules; 15-20% event pool and progression; 10-15% output schema and
revision commands; 5-10% voice and format.

## Console pattern

Build the opening in this order, as plain prose with plain HTML and CSS
blocks. Repeated chrome and anything with a script go in a display rule in
`rules.json`:

1. Scene beat first, in plain prose: one concrete situation and one line that
   makes the next action obvious.
2. Current state: one panel naming what the player is about to run, with a
   bar or a fact row for the one or two meters that matter now.
3. Setup: one setup block whose inputs and option lists already hold the
   defaults, so starting without changes is a valid start.
4. Actions: 2-4 short choices as send buttons. On the sandbox page each is a
   plain `<button>` in a display rule whose script calls
   `sdk.message.send(text)`, reading the setup inputs into the line it sends.
   The first is the default start. Each sends text the definition handles.
5. Nothing else. Rules, event pools and hidden state stay in the definition and
   the output contract.

After `hearthroom card push --validate --json`, run
`hearthroom card render --json` and check `rendered`, `report.tags` and every
rule's status; open the printed play link to see layout and contrast.

The scene comes before the controls, as sibling structure rather than a
wrapper. Every control changes the next reply; cut a panel that only
decorates. A player who ignores the controls and types one line must still get
a run. One speaker; a console card does not need a cast.

## System intake packet

```text
System intake packet:
- current seed or failure:
- primary contract: system/simulator | generator | hybrid
- player role:
- system promise:
- setup wizard: required inputs, optional inputs, defaults, default-start action
- state model: visible, hidden, definition-only, update cadence
- run loop: start, continue, inspect, revise / reroll, commit
- event pool / scenario reservoir:
- progression loop:
- failure-forward behavior:
- output schema or response format:
- player-agency guardrails:
- console plan: which HTML block or display rule carries which control
- field allocation:
- play probes:
- hand-off:
```

## Play probes

Run each as one turn of `hearthroom play <dir> -m "…" --allow-spend --json`:
minimal input proceeds with defaults and starts a run; changing one intake
field changes the next output; the player can inspect state before acting;
risky input costs something without ending play; the next turn preserves state
and advances the loop; revise or reroll keeps constraints; a short reply still
receives a concrete next path. Patch the card if it asks another setup
question instead of running, forgets state, gives generic advice, leaves a
button sending text nothing handles, or explains rules without changing the
next action.
