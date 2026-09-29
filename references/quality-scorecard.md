# Quality scorecard

Use this reference when an author asks whether a card, draft, blueprint or set
of packets is strong enough before pushing, playing or publishing. It is a
craft scorecard, not a platform metric, ranking signal or validation rule.

## Score scale

| Score | Meaning |
|---:|---|
| 0 | missing or blocking |
| 1 | present but fragile |
| 2 | usable private draft |
| 3 | strong candidate |
| 4 | signature strength |

Do not average away blockers. A high total with agency takeover, unsafe
boundary handling, copied material or no first action is still not ready.

## Dimensions

Score only the dimensions that apply to the card shape. Mark the rest `N/A`,
not `0`.

| Dimension | Score asks |
|---|---|
| Promise | Can the player grasp the fantasy, relationship, tension and reason to open in seconds from name, summary, tags and the opening? |
| Archetype contract | Does one primary card shape drive the experience while overlays support it? |
| Tension triangle | Does the premise have character desire, player leverage, external pressure, why-now and a consequence if the player does nothing? |
| Character appeal | Does the character have desire, contradiction, boundary, player leverage and behavior under pressure? |
| Relationship / daily-life / world / scenario engine | Does relationship, routine, setting, faction, incident or clue content create choices, costs, state and routes? |
| Play engine | For game-like cards, do compact state, resources, quests, turn protocol and failure-forward behavior produce runnable turns? |
| Generator engine | For generator cards, does the card produce a usable artifact through intake defaults, stable schema, revision operations and artifact continuity? |
| Player agency | Can the player accept, question, refuse, redirect, test or change the route without being overwritten? |
| Opening | Does the first screen include place and time, character action, pressure, player implication and reply paths? |
| Second-turn engine | Can the character's next move react, reveal, complicate, update state or renew pressure? |
| Longplay | Can the card sustain many turns through state, memory, progression, route costs and initiative? |
| State economy | Are state fields compact, updateable, agency-safe and worth showing or hiding because they change future play? |
| Voice | Is the character recognizable by rhythm, vocabulary, emotional tells, refusal style and behavior under pressure? |
| Language style | Do all fields share one language, script, register and pronoun matrix? |
| Boundary handling | Are rating, pacing, refusal, slowdown and stop conditions explicit where needed? |
| Token allocation | Do long sections create reusable behavior, state, voice, routes or first-action clarity? |
| Presentation | Do the opening's text or HTML layout and the display rules support readability, state, action and mood without hiding the engine? |
| Lorebook reachability | Are entries the card depends on reachable by keywords in a normal turn and by descriptive name and content in agent mode? |
| Testability | Are render checks, playtest probes and patch triggers clear enough for a later loop? |

## Overall tier

- `Blocked`: any critical blocker, regardless of total.
- `Needs architecture`: several core dimensions at `0-1`, or the primary
  contract unclear.
- `Usable private draft`: most relevant dimensions at least `2`, repairs
  known.
- `Strong candidate`: core dimensions mostly `3`, no blocker, first repair
  narrow.
- `Signature candidate`: several dimensions at `4`, no major weak layer,
  playtest probes ready.

Score `Lorebook reachability` on what was actually played. If only one
`--agent` mode was tested, say which; the other does not pass silently.

## Critical blockers

Flag before scoring:

- `blockers` in `card validate --json`
- agency takeover: the card decides the player's feelings, consent, actions,
  commitments or route
- no playable first action
- missing tension triangle
- boundary-sensitive premise without rating, pacing, refusal or stop
  conditions
- copied or unprovided material presented as card content
- archetype conflict that makes field allocation impossible
- the durable engine lives only in the opening
- story route funneling that forces the player's conclusion or only valid
  path
- daily-life card with no small desire, disruption, habit change or
  second-turn change
- generator that asks indefinitely, gives advice only or cannot produce one
  artifact from defaults

## Quality audit packet

```text
Quality audit packet:
- audit scope:
- evidence available / missing:
- card shape:
- overall tier:
- critical blockers:
- scorecard: one line per applicable dimension, score plus the evidence
- strongest / weakest dimensions:
- first three repairs:
- repair skill order:
- keep / move / cut / rewrite:
- validate / render / play stance:
- hand-off:
```

## Repair priority

1. Critical blockers and player agency.
2. Archetype contract, promise, tension triangle (`hearthroom-tension-weaver`
   for an inert premise, `hearthroom-profile-packager` when the engine exists
   but the profile is weak).
3. Durable engine: character core, relationship, daily-life, world, play or
   generator engine.
4. Opening and second-turn engine.
5. State economy and longplay (`hearthroom-state-economist` for decorative
   meters or missing update triggers).
6. Voice, then language style once engine, opening and voice are coherent.
7. Token allocation and presentation polish, unless allocation hides the
   engine.
8. Playtest and publishing only after the writing layer is worth testing.

Several interacting symptoms with no clear order: `hearthroom-card-doctor`.
One narrow weak layer: that skill.

## Scorecard rules

- Score from evidence. Quote or summarize the field behavior behind each
  score.
- Do not run CLI commands from an audit; another skill takes over for that.
- The score guides authoring. It is never a gate.
- Do not require a playtest before obvious structural repairs.
