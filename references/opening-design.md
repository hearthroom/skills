# Opening design

Use this reference when a card needs a stronger opening (`welcome.md`), first
reply path, or second-turn engine. The opening is not a greeting. It is the
card's first playable contract.

## Core rule

Design the first two turns together:

```text
opening scene -> likely first player reply -> character's second-turn move -> changed state
```

A good opening shows where the player is, puts the character in motion
before the player speaks, and gives the player a next action that can change
the scene. Plot-driven, scenario, mystery, game and system cards also expose
an external goal (destination, task, clue, threat, deadline, authority
demand, rule conflict) within the opening or the first two turns. The player
chooses how to respond and never has to invent the main objective.

## Where it lives

- `welcome.md`: the opening. `openings/alt-NN.md`: alternate openings, in
  file-name order; `hearthroom play --greeting N` starts from alternate N.
- `prologue` in `card.json`: suggested first lines for the player, offered as
  choices. Player side only; never the character's first message.
- Plain text or HTML. Plain HTML and CSS render on the play page;
  `hearthroom card render --json` shows the opening after display rules.
- The opening limit depends on the card's language; read it from
  `tokenBudget.limits` in `hearthroom card push --validate --json`.

## The opening is the first reply sample

The opening is the first reply the model has been shown, and it continues
from samples more reliably than it obeys rules. Style rules in the definition
are read once; a register the opening demonstrates is copied. Keep the first screen at or
below four on the card's own intensity scale, carry feeling through objects
and sounds rather than adjectives, budget the ellipses, and make every
speaker on the screen distinguishable; `prose-texture.md` has the checks and
the repairs.

## The five beats

1. Place and time: where and when the player is.
2. Character action: what the character is already doing.
3. Pressure: why this moment starts now.
4. Player implication: why the player matters.
5. Reply path: what the player can do next.

A missing beat turns the opening into a prompt, a menu or a lore paragraph.

## Legibility gate

Before mood, metaphor or named lore, the first two lines must make four
things legible: who is acting, where the player is, when this happens, and
what problem is already in motion. Use concrete nouns the player can take,
refuse, inspect, open, hide or question. One invented noun is fine only if
the same screen shows its playable function through an object, risk or
choice.

## First reply path

The player should be able to reply in under ten seconds. Offer at least one
of: a direct question; a concrete object to inspect, take, refuse, fix, hide,
open or break; a character demand, offer, confession, warning or mistake; two
to four choices that are consequences, not mood labels; a setup form, only
for system, game or generator cards. Do not ask "what do you want to do?"
unless the scene already gives obvious things to do.

When the card is the player versus a narrator, system, institution, fate or
authority figure, the first option set carries an authority opposition axis:
at least one comply path and at least one resist path. Jokes and chaos are
tone, not resistance, unless they actually oppose the authority.

Choices can be plain lines in the opening, `prologue` entries, or plain HTML
choice buttons in a display rule; `hearthroom-presentation-director` decides
which.

## Second-turn engine

Write one likely first player message and the character's next move. The
second turn must react to the choice, reveal a specific truth, complicate the
situation, update relationship, risk, route, resource or trust, offer a new
route, ask a sharper question, or move a practical problem forward. If it
can only restate the premise, the opening is weak.

## Mode recipes

- Companion: start where a mask cracks or a promise is tested. The character
  acts first (arrives late, hides something, asks for a term). The player
  can invite, refuse, ask, confront, set terms, leave.
- Daily life: an ordinary routine with one small disruption; the first action
  is natural (help, notice, tease, offer, hide). Progression comes from
  repeated objects, habits, weather and small disclosures.
- Story or mystery: begin inside an ongoing problem with one clue, risk,
  location or social consequence in front of the player. The second turn
  branches: pursue, hide, accuse, protect, bargain.
- Game or simulator: setup and action on the same screen; each choice tied to
  a resource, risk, route or state update; defaults on minimal input.
- Generator: intake surface with defaults; the first normal message produces
  an artifact; the second turn revises, formats or converts it.
- Ensemble: one focal conflict, no roll call. Define who speaks first, who
  interrupts, who hangs back. The player must be able to affect group
  tension.

## Failure repairs

| Failure | Repair |
|---|---|
| Greeting only | five beats and a second-turn move |
| Lore before action | move durable lore to `definition.md` or a Lorebook entry |
| Menu with no scene | place, action, pressure and implication before choices |
| Pretty mood, no task | a concrete object, decision, risk or route |
| Unclear first lines | rewrite with the four legibility points and one object |
| Character waits | proactive action and passive-player behaviour |
| Too long | cut backstory; keep immediate pressure and the reply path |
| Game manual | defaults, state and the first crisis together |
| Ensemble roll call | one focal speaker and one group pressure |
| Two unrelated starts | split into `welcome.md` and an `openings/alt-NN.md` |
| Opening is already the climax | open on the moment before or the morning after; keep the crisis as pressure (`prose-texture.md`) |
| Trembling, adjective-stacked, narrated player feelings | texture pass: objects before feelings, whole sentences, ellipsis budget (`prose-texture.md`) |

## Self-review

- Can the player reply in under ten seconds?
- Does the character act before the player speaks?
- Is the pressure visible on the first screen?
- Do at least two reply paths lead somewhere different?
- Does the second turn change state, relationship, risk, route or
  information?
- Is the opening shorter than the definition, unless it is an interactive
  setup?
- Are the player's feelings, actions and consent left to the player?
- Is the first screen below the card's climax, with at most two ellipses and
  one line that refuses the mood?
