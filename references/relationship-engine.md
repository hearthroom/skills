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
behaviour. Slow burn: closeness advances through small earned changes, not
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

Track only state that changes future behaviour: trust (access, honesty,
softness), friction (sharpness, avoidance, challenge), debt (favour,
obligation, promise), boundary terms (accepted, refused, delayed,
renegotiated), shared routine (object, place, habit, chore), route (repair,
rivalry, distance, alliance, confession, friendship, romance), public pressure
(reputation, witnesses, deadline). No decorative meters, and no hidden state
that claims the player feels something they have not authored. A trust or
friction value needs signed movement: which player moves raise it, which
lower it, and what the character does to pull it back; otherwise models move
it one way (`state-economy-design.md`). If state should be visible, route its
format to `hearthroom-state-economist` and `hearthroom-presentation-director`.

Write each relationship as a concrete image the model can reuse (the mug she
still sets out, the key he has not asked back), never "deep feelings" or
"complicated history".

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
  weaponised history, public humiliation); character response (withdraw,
  challenge, apologise badly, ask for terms, move to practical stakes); player
  route (distance, confrontation, renegotiation, refusal, friendship only,
  delayed repair); memory (which wound stays active); renewal (a practical
  problem keeps play alive without forcing intimacy).

## Reply paths and passive play

Fill the reply-path matrix in `agency-design.md` with these rows: accepts
care, questions motive, teases or flirts, sets terms, refuses closeness,
reopens an old wound, helps practically, is passive. If every path returns
to the same soft scene, the engine is weak. The
character does not wait: it brings a shared object with changed meaning,
starts a chore, repair, meal or routine, breaks an old rule in a small visible
way, offers a term and asks for a counterterm, reveals a partial truth and
waits for a stance, or sets a practical deadline that can be accepted, refused
or reshaped.

## Field allocation

- Summary (`card.json`): one scannable relationship promise plus pressure.
- Definition (`definition.md`): the durable engine: asymmetry, state, gates,
  repair and rupture routes, agency boundaries, passive-player behaviour,
  refusal style.
- Opening (`welcome.md`): one playable relationship moment, not the history or
  the pacing rules. Alternate openings (`openings/alt-NN.md`) start from a
  different situation (another place, another problem), not the same scene
  at another closeness level.
- Example conversations (`card.json` `talkExample`): examples beat rules for
  weak models: one ordinary-turn sample by default (`talk-example-design.md`);
  the sample is an ordinary exchange at the card's usual closeness, never the
  rupture or the repair.
- Presentation: short visible state, route or choice cues only when they help
  the player act.

## Play probes

Playtest: 10–20 turns, a weak and a strong model, `--new-session`, one
shortcoming per version, compared with the previous version
(`playtest-loop.md`). Seed the runs with these lines; agree the budget with
the author first.

```text
1. Boundary: "I don't want romance right now, but I can still help."
2. Friction: "I think you turn care into control."
3. Passive: a short noncommittal line with no emotional move.
4. Repair: "Here is a practical apology, not a confession."
5. Rupture: "I'm bringing up the old wound and I won't soften it."
6. Continuity: "Continue from the last promise or boundary we set."
```

Pass: the character preserves agency, changes relationship state and offers a
renewed hook without generic comfort or forced intimacy, and still does at
turn fifteen. Agency guardrails: `agency-design.md`.
