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
| Character appeal | Does the character have desire, contradiction, boundary, player leverage and behaviour under pressure? |
| Relationship / daily-life / world / scenario engine | Does relationship, routine, setting, faction, incident or clue content create choices, costs, state and routes? |
| Play engine | For game-like cards, do compact state, resources, quests, turn protocol and failure-forward behaviour produce runnable turns? |
| Generator engine | For generator cards, does the card produce a usable artifact through intake defaults, stable schema, revision operations and artifact continuity? |
| Player agency | Can the player accept, question, refuse, redirect, test or change the route without being overwritten? |
| Opening | Does the first screen include place and time, character action, pressure, player implication and reply paths, and does it pay off what the summary sold? |
| Second-turn engine | Can the character's next move react, reveal, complicate, update state or renew pressure, so that turn two is better than turn one? |
| Longplay | Can the card sustain many turns through state, memory, progression, route costs and initiative? |
| State economy | Are state fields compact, updateable, agency-safe and worth showing or hiding because they change future play? |
| Voice | Is the character recognisable by rhythm, vocabulary, emotional tells, refusal style and behaviour under pressure? |
| Language style | Do all fields share one language, script, register and pronoun matrix? |
| Boundary handling | Are rating, pacing, refusal, slowdown and stop conditions explicit where needed? |
| Token allocation | Do long sections create reusable behaviour, state, voice, routes or first-action clarity? |
| Story/UI balance | Is `uiRole` declared? Assist: do the replies read well with every display rule disabled? Core: does each UI mechanic change a choice or consequence, stay legible in the reply text and degrade to text? Is the status overhead ratio (block characters over reply characters) under the card's declared threshold? Does every element do one of UI's five jobs (memory, legible choices, pacing, the world reacting, orientation)? Are diegetic objects preferred to HUDs? (`presentation-design.md`) |
| Lorebook reachability | Are entries the card depends on reachable by keywords in a normal turn and by descriptive name and content in agent mode? |
| Testability | Are render checks, playtest probes and patch triggers clear enough for a later loop? |

## Conversion check-up

Map the dimensions onto the funnel in `role-card-writing-framework.md` and
name the weakest layer; the first repair goes there, and the card's tier
cannot exceed the tier of its weakest layer.

| Layer | Dimensions | Question |
|---|---|---|
| L0 board | Promise (name, cover, tags) | Would a stranger scrolling the board stop on the cover and the title? |
| L1 first screen | Promise (summary), Opening | Does the summary make them open the opening, and does the opening pay it off? |
| L2 first paid message | Opening, Player agency, Story/UI balance | Is the opening a free demo: voice heard, one low-friction first action, a pull to answer? |
| L3 return | Second-turn engine, Longplay, State economy, engines | Is turn two better than turn one; do choices accumulate and cost something; is there a reason to come back? |

## Overall tier

- `Blocked`: any critical blocker, regardless of total.
- `Needs architecture`: several core dimensions at `0-1`, or the primary
  contract unclear.
- `Usable private draft`: most relevant dimensions at least `2`, repairs
  known. Without transcript evidence this is the highest tier a card can
  reach: `Usable private draft (untested)`.
- `Strong candidate`: core dimensions mostly `3`, no blocker, first repair
  narrow, and transcript evidence from at least 10 turns on a weak and a
  strong model (`playtest-loop.md`).
- `Signature candidate`: several dimensions at `4`, no weak layer in the
  conversion check-up, the same transcript evidence.

Score `Lorebook reachability` on what was actually played. If only one
`--agent` mode was tested, say which; the other does not pass silently.

## Critical blockers

Flag before scoring:

- `blockers` in `card validate --json` or errors from `check-card.mjs`
- agency takeover: the card decides the player's feelings, consent, actions,
  commitments or route
- no playable first action
- missing tension triangle
- boundary-sensitive premise without rating, pacing, refusal or stop
  conditions
- copied or unprovided material presented as card content
- archetype conflict that makes field allocation impossible
- the durable engine lives only in the opening
- story route funnelling that forces the player's conclusion or only valid
  path
- daily-life card with no small desire, disruption, habit change or
  second-turn change
- generator that asks indefinitely, gives advice only or cannot produce one
  artifact from defaults
- a `core` card whose mechanics vanish from the text when a rule fails

## Quality audit packet

```text
Quality audit packet:
- audit scope:
- evidence available / missing:
- card shape; uiRole (declared / undeclared):
- overall tier:
- critical blockers:
- scorecard: one line per applicable dimension, score plus the evidence
- conversion check-up: L0 / L1 / L2 / L3 scores; weakest layer:
- status overhead: ratio / declared threshold (or "no transcript")
- strongest / weakest dimensions:
- first three repairs (the first one in the weakest layer):
- repair skill order (card-diagnosis.md):
- keep / move / cut / rewrite:
- validate / render / play stance:
- hand-off:
```

## Repair order

The single owner of the repair order is `card-diagnosis.md`: technical
blockers → agency and boundary → the weakest conversion layer → everything
else, one primary repair per version. Several interacting symptoms with no
clear order: `hearthroom-card-doctor`. One narrow weak layer: that skill.

## Scorecard rules

- Score from evidence. Quote or summarise the field behaviour behind each
  score.
- `check-card.mjs` is local and free and may be run from an audit. Do not
  push, render or play from an audit; another skill takes over for that.
- The score guides authoring. It is never a gate.
- Do not require a playtest before obvious structural repairs.
