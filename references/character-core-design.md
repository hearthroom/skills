# Character Core Design

Use this reference when a character feels thin, trope-only, interchangeable or
memorable only as a mood label. A playable core is not a biography. It is a
pressure system the definition can preserve:

```text
desire -> contradiction -> boundary -> mask / wound -> player leverage -> pressure behavior
```

If any link is missing, the character drifts into generic friendliness,
exposition or passive waiting.

## Appeal axes

Pick one to three: competence (does something specific under pressure),
vulnerability (a guarded need the player can affect), mystery (a withheld
secret, clue or cost that is playable), warmth (notices, repairs, protects),
danger (risk, debt, taboo, public consequence), humor (a repeatable comic
pattern with pressure behind it), dependency (needs something it cannot
demand), authority (grants access, imposes rules, tests), tension (closeness
has cost and refusal routes), transformation (changes visibly as trust or risk
moves). An axis is behavior and stakes, never a label.

## Anti-generic transforms

| Weak input | Transform into |
|---|---|
| mood label | behavior under pressure |
| trope label | contradiction plus cost |
| backstory | present pressure |
| "likes the player" | leverage, risk and pacing |
| "cold" | refusal style, soft spot and pressure move |
| "kind" | boundary, cost of helping, what kindness refuses |
| "mysterious" | what clue appears, what stays hidden, why now |
| "powerful" | what power cannot solve, what the player controls |
| "shy" | what it can do indirectly but cannot say directly |
| "chaotic" | a repeatable decision rule, not random behavior |

## Player leverage and asymmetry

The player needs something real to do: knowledge (a secret, clue or weakness),
access (a place, group, system or route), trust (something to protect,
question, refuse, expose or repair), a resource (time, evidence, skill,
status, favor), interpretation (what the character's attention means),
boundary (slowing or rejecting a route without ending play), or change
(altering the character's plan, habit, risk or mask). Admiring, comforting or
waiting is not leverage.

Asymmetry creates play: one side knows, needs, owes, risks, controls, hides or
can lose something the other does not, and the player can question, accept,
refuse, test, protect or change it.

## Pressure behavior

```text
Player action  | Character pressure behavior        | What changes
trusts them    | how it reveals, asks or risks      | state / route
questions them | how it deflects, admits or tests   | clue / risk
resists        | how it respects agency             | cost / route shift
is passive     | what it initiates                  | new hook
sets boundary  | how it stops or slows              | safe continuation
betrays trust  | how it reacts without railroading  | consequence
```

This table stops a character from working only when the player cooperates.

## Recipes by shape

- Companion: desire, boundary, private cost, asymmetry and one recurring
  pressure behavior; initiates without deciding the player's feelings.
- Daily life: a small specific desire (habit, object, routine, favor, promise)
  plus a gentle consequence so ordinary scenes progress without melodrama.
- Story or mystery: tied to one clue, lie, rule or unresolved cost; the player
  holds a piece of the route.
- Game character (guide, merchant, rival, gatekeeper): a function plus a
  personal friction with the system. Utility alone is not a character.
- Ensemble: a contrast matrix (desire, fear or cost, boundary, pressure move,
  player leverage per member) before adding cast. Cut anyone who cannot change
  player choices, route pressure or stakes.

## Repairs

Trope-only: add a contradiction with visible cost. Long biography: convert
history into today's pressure. Waits passively: write passive-player behavior.
Generic when refused: add a refusal style plus an alternate route. Decorative
secret: make it a player decision. Too powerful: define what power cannot
solve. Too soft: define a boundary and what kindness refuses. Strong opening,
flat later turns: hand off to longplay with core state and route seeds.

## Field targets

- Summary (`card.json`): the appeal promise, relationship and active tension.
- Definition (`definition.md`): the chain, leverage, pressure table and tells
  in compact form.
- Opening (`welcome.md`): the moment the core becomes actionable.
- Example conversations (`card.json` `talkExample`): only if pressure behavior
  or voice cannot survive as rules.
- Presentation: visible state or choices only when they improve agency; route
  to `hearthroom-presentation-director`.

When `hearthroom card push --validate --json` reports the definition near its
limit under `tokenBudget`, cut biography, synonym lists, mood adjectives and
inactive side characters first.

## Checks

- Memorable beyond the trope; desire creates action; contradiction creates
  behavior; boundary creates pacing.
- The player has leverage and the pressure table covers trust, resistance,
  passivity and boundary.
- The player's feelings, consent and actions stay theirs.
