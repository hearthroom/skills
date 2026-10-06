# System Intake Card Design

Use this reference when a card behaves like a system, simulator, management
console, investigation desk, mission board, planner or creator assistant whose
first screen needs setup inputs, visible state, choices and a clear run loop.

Read `../../references/play-engine-design.md` when the primary loop is state,
resources or simulator consequences, and
`../../references/generator-design.md` when it produces an artifact. Route to
`hearthroom-presentation-director` when the open question is what the console
should show, and read `../../references/presentation-design.md` for where the
HTML and the display rules live and for the UI role a console card declares.

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

The opening is still the free demo (L2 of the funnel): run one default beat of
the system first, a result or a consequence in the system's voice, then offer
setup. A console with no beat shows no voice.

## Field allocation

- summary (`card.json`): one promise naming the system and the player's
  control over it.
- `definition.md`: the durable engine: modes, defaults, state schema, turn
  protocol, failure-forward behaviour, event pool, progression, revision
  commands. Spend most of it on state, the turn protocol and failure
  handling; keep premise and voice short.
- `outputContract` (`card.json`): the response shape and the status block
  every reply ends with (`state-economy-design.md`).
- `welcome.md`: a compact setup wizard or intake console showing only the
  controls the next step needs, ending with the first status block.
- `openings/alt-NN.md`: one alternate opening per preset when presets are
  different starting situations, not the same console reworded.
- `talkExample` (`card.json`): examples beat rules for weak models: one
  ordinary-turn sample by default (`talk-example-design.md`), showing the
  response schema and the status block.
- `rules.json`: the sandbox kit draws the status block (`sandbox-kit.md`);
  any other display rule only if it does one of UI's five jobs
  (`presentation-design.md`).

## Console pattern

Build the opening in this order, as plain prose with plain HTML and CSS
blocks. Repeated chrome and anything with a script go in a display rule in
`rules.json`:

1. Scene beat first, in plain prose: one concrete situation and one line that
   makes the next action obvious.
2. Current state: the status block, drawn by the kit as one panel naming what
   the player is about to run, with a bar or a fact row for the one or two
   meters that matter now.
3. Setup: one setup block whose inputs and option lists already hold the
   defaults, so starting without changes is a valid start.
4. Actions: 2-4 short choices. They are drafts, not a menu. On the sandbox
   page a tap puts the line into the composer (`sdk.input.set(text)` then
   `sdk.input.focus()`) so the player can edit before sending, reading the
   setup inputs into the line it fills. Only the one-tap default start may
   send directly, inside the click handler with no `await`. Typed free text
   must always be handled as well as any button.
5. Nothing else. Rules, event pools and hidden state stay in the definition and
   the output contract.

After `node <toolkit>/scripts/check-card.mjs <dir>` and
`hearthroom card push --validate --json`, run
`hearthroom card render --json` and check `rendered` and every rule's status;
then the offline preview or the printed play link for layout and contrast
(`platform-facts.md`, Offline preview).

The scene comes before the controls, as sibling structure rather than a
wrapper. Every control changes the next reply; cut a panel that only
decorates. A player who ignores the controls and types one line must still get
a run. One speaker; a console card does not need a cast.

## System intake packet

```text
System intake packet:
- current seed or failure:
- primary contract: system/simulator | generator | hybrid
- ui role: assist | core (presentation-design.md); overhead threshold
- player role:
- system promise:
- setup wizard: required inputs, optional inputs, defaults, default-start action
- state model: visible, hidden, volatile, definition-only, update cadence; one owner per value
- run loop: start, continue, inspect, revise / reroll, commit
- event pool / scenario reservoir:
- progression loop:
- failure-forward behaviour:
- output schema or response format:
- player-agency guardrails:
- console plan: which HTML block or display rule carries which control
- attention: which rule from this packet joins the top iron rules, and the
  matching line in the final recency checklist (they must agree;
  `prompt-attention-architecture.md`)
- field allocation:
- play probes:
- hand-off:
```

## Play probes

Playtest: 10–20 turns, a weak and a strong model, `--new-session`, one
shortcoming per version, compared with the previous version
(`playtest-loop.md`). Seed the runs with: minimal input proceeds with defaults
and starts a run; changing one intake field changes the next output; the
player can inspect state before acting; risky input costs something without
ending play; the next turn preserves state and advances the loop; revise or
reroll keeps constraints; a short reply still receives a concrete next path.
Patch the card if it asks another setup question instead of running, forgets
state, drops the status block, gives generic advice, leaves a button filling
text nothing handles, or explains rules without changing the next action.
