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

- light adventure: one mission; one pressure, 2-3 routes, 3-5 state fields
- investigation / case: clue state, risk clock, access rules, cost of accusation
- RPG / open-world: compact state, resource costs, failure-forward rules, route rewards
- survival / horror: visible risk, limited resources, retreat routes, pacing and boundaries
- simulator / management: mode, state schema, update loop, defaults, revise or retry rules

Lore alone does not justify RPG scope. Choices that need resources, risk,
routes, state and progression do.

## Compact state

Track only what changes future behavior: 5-9 fields drawn from place and
time, pressure, resources, condition, route and relationship. Update state
after every reply that changed the situation, including refusals, retreats and
partial successes. Show only state the player can use now or soon. Prefer
named flags and simple levels over many numbers. Never hide state that
contradicts the player's visible options.

The model can only update state it writes into the reply. Put the update format
in the output contract (`outputContract` in `card.json`) so every reply carries
the same compact state line. A display rule in `rules.json` can turn that line
into a bar or panel on the play page; the model never sees the rendered result.
Read `../../references/platform-facts.md` for what rules can do and
`../../references/presentation-design.md` for what deserves to be visible.

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
3. Update compact state.
4. Narrate the immediate result inside the current scene.
5. Present the next pressure.
6. Offer 2-4 paths with visible cost, risk or route meaning.
```

The card may infer reasonable consequences. It must not decide the player's
feelings, courage, loyalty, consent, memories or future action. Avoid a bare
"what do you do?" unless the scene already shows obvious options.

## Failure-forward behavior

Failure changes play; it neither ends it nor vanishes: wounds, debt, damaged
items, lost time, raised clocks, exposed secrets, faction suspicion, blocked
shortcuts, partial clues, costly bargains, forced retreats, or depletion that
unlocks a harder but playable alternative. Death, permanent lockout or story
end require a clear warning and an explicit player choice to keep taking
lethal risk. Ignored failure is also failure: if nothing changes, the route
was decorative.

## Progression phases

Phases are behavior modes, not chapters: setup under pressure, first route,
entanglement, reversal, mastery or endgame, renewal from remembered state. For
each, name trigger, system pressure, player leverage, unlocks and risk. Do not
force a fixed order unless the card is a linear scenario.

## Opening contract

The first screen combines setup and action: one place and its pressure, one
visible state panel or compact setup, one concrete object, threat, demand or
resource decision, 2-4 choices tied to risk, resource, route or state, and
defaults for minimal input. Do not open on a rulebook, faction list or
inventory catalog. Durable rules live in `definition.md`; `welcome.md` proves
the system is playable. When the setup needs controls, read
`../../references/system-intake-card-design.md`. Different starting modes can
be alternate openings in `openings/alt-NN.md`; `play --greeting N` tests each.

## Field allocation

- summary (`card.json`): player position, world or system, core pressure.
- `definition.md`: core loop, compact state, resources, turn protocol, quest
  routes, failure-forward behavior, progression, agency guardrails, narrator
  style.
- `welcome.md`: one playable setup or crisis with visible state and choices.
- `outputContract` (`card.json`): the reply shape and the state line.
- `talkExample` (`card.json`): only when it teaches the turn protocol or state
  update better than rules alone.
- `lorebook.json`: locations, factions, item tables and route notes as
  keyword-triggered entries named by content. Constant entries only for rules
  needed every turn; keep them few and short.
- presentation: plain HTML and CSS in the opening and display rules in
  `rules.json`, only where they help the player act.

Spend tokens on the loop, state, turn protocol and routes before opening,
style and samples. Cut first: inactive factions, unused stats, equipment
catalogs, lore history. Read counts and limits from
`hearthroom card validate --json` under `tokenBudget`.

## Play probes

Run each as one turn of `hearthroom play <dir> -m "…" --allow-spend --json`
once the author accepts the cost; `--history` shows recent messages.

1. Resource probe: spend or refuse to spend a key resource.
2. Route-change probe: take the less obvious approach.
3. Failure-forward probe: attempt something likely to fail.
4. Continuity probe: refer back to an earlier state change.
5. Passive probe: send a minimal or vague message.

Pass means the card resolves the action, updates the state line, changes
resource, risk, route, access or relationship, preserves player agency and
offers a renewed hook.
