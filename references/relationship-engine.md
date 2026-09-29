# Relationship Engine

Use this reference when a companion, romance, daily-life, rivalry, friendship,
mentor, cohabitation, reunion or found-family card has a decent character core
and opening but still collapses into generic flirting, comfort, banter or
passive waiting. A strong relationship card is a repeatable engine:

```text
asymmetry -> pressure -> player choice -> relationship state -> repair / rupture -> renewed hook
```

The relationship moves because of player choices. It never decides the
player's attraction, forgiveness, consent, loyalty or feelings.

## Shapes

Choose the shape, then convert it into state, routes, gates and pressure
behavior. Slow burn: closeness advances through small earned changes, not
confession speed. Rivals: competence and history create friction; repair needs
action, not only apology. Cohabitation or daily life: routines, chores,
objects and boundaries become pressure. Reunion or ex-partner: shared history
matters only when it creates a present choice, cost or unresolved term. Mentor
and apprentice: knowledge asymmetry creates leverage; never decide the player's
obedience. Protector and dependent: care includes boundaries and player
leverage, not only rescue. Forbidden or public-pressure: external risk controls
pacing; the player keeps route choice. Found family or friendship: trust,
debt, ritual and loyalty progress without forcing romance.

## Asymmetry

Play starts when the two sides do not hold the same leverage: one side
remembers, owes, hides, risks, controls, needs or can lose something the other
does not, and the player can question, accept, refuse, test, protect, expose,
forgive, set terms or change it. Bad asymmetry removes agency: the card says
the player secretly wants the character, power makes refusal impossible,
history forces forgiveness, jealousy becomes ownership, or the player can only
comfort, admire or wait.

## State and pacing

Track only state that changes future behavior: trust (access, honesty,
softness), friction (sharpness, avoidance, challenge), debt (favor,
obligation, promise), boundary terms (accepted, refused, delayed,
renegotiated), shared routine (object, place, habit, chore), route (repair,
rivalry, distance, alliance, confession, friendship, romance), public pressure
(reputation, witnesses, deadline). No decorative meters, and no hidden state
that claims the player feels something they have not authored. If state should
be visible, route its format to `hearthroom-state-economist` and
`hearthroom-presentation-director`.

Advance closeness only when the player participates: respecting terms,
sharing responsibility, choosing honesty, accepting a practical risk, noticing
without forcing confession, returning after a rupture, protecting a boundary,
changing a habit. Slow down or shift route when the player refuses or asks to
slow down, the character uses jealousy, rivalry or care as control, a boundary
is crossed, old blame resurfaces without repair, or the scene becomes pure
comfort.

## Repair and rupture

Without rupture, tension becomes harmless banter. Without repair, friction
becomes cruelty. Write both.

- Repair route: trigger (apology, practical help, honesty, boundary respect,
  shared task); what the character risks by repairing; what the player can
  accept, question, refuse or set terms on; cost (pride, public image, time,
  debt, vulnerability); memory (promise, object, new rule, changed routine);
  renewal (the new scene that becomes possible).
- Rupture or distance route: trigger (accusation, betrayal, ignored boundary,
  weaponized history, public humiliation); character response (withdraw,
  challenge, apologize badly, ask for terms, move to practical stakes); player
  route (distance, confrontation, renegotiation, refusal, friendship only,
  delayed repair); memory (which wound stays active); renewal (a practical
  problem keeps play alive without forcing intimacy).

## Reply-path matrix and passive play

```text
Player move        | Character response | State change | Renewed hook
accepts care       |
questions motive   |
teases / flirts    |
sets terms         |
refuses closeness  |
reopens old wound  |
helps practically  |
is passive         |
```

If every path returns to the same soft scene, the engine is weak. The
character does not wait: it brings a shared object with changed meaning,
starts a chore, repair, meal or routine, breaks an old rule in a small visible
way, offers a term and asks for a counterterm, reveals a partial truth and
waits for a stance, or sets a practical deadline that can be accepted, refused
or reshaped.

## Field allocation

- Summary (`card.json`): one scannable relationship promise plus pressure.
- Definition (`definition.md`): the durable engine: asymmetry, state, gates,
  repair and rupture routes, agency boundaries, passive-player behavior,
  refusal style.
- Opening (`welcome.md`): one playable relationship moment, not the history or
  the pacing rules. Alternate openings (`openings/alt-NN.md`) can start from a
  different closeness state.
- Example conversations (`card.json` `talkExample`): only when they teach
  reusable behavior such as boundary refusal, passive-player initiation,
  rivalry as care, or rupture and repair.
- Presentation: short visible state, route or choice cues only when they help
  the player act.

## Play probes

Run as `hearthroom play <dir> -m "…" --allow-spend --json` turns after a push.
Each turn spends credits; agree the budget with the author first.

```text
1. Boundary: "I don't want romance right now, but I can still help."
2. Friction: "I think you turn care into control."
3. Passive: a short noncommittal line with no emotional move.
4. Repair: "Here is a practical apology, not a confession."
5. Rupture: "I'm bringing up the old wound and I won't soften it."
6. Continuity: "Continue from the last promise or boundary we set."
```

Pass: the character preserves agency, changes relationship state and offers a
renewed hook without generic comfort or forced intimacy.
