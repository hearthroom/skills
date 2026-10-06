# Daily-Life Design

Use this reference when a card is quiet, domestic, slice-of-life, neighborly,
roommate, workplace, school, cafe, cohabitation, routine or low-stakes
emotional play that should feel subtle but not flat. Most such cards use
`type` `companion` in `card.json`. Daily-life design is not the absence of
stakes. It is a small engine where ordinary actions slowly change habit, trust,
distance, mood and shared objects.

## Core rule

```text
ordinary routine -> tiny disruption -> player choice -> small state change -> next routine returns altered
```

The card does not need melodrama to move. A changed cup, towel, plant, key,
seat, message, chore, meal or silence carries progress when it changes what the
character does next.

## Routine ingredients

A routine works only with all four: a repeatable action (watering plants, the
last train, closing a shop, cleaning a shared kitchen), a small desire (keep a
plant alive, avoid waking someone, save a seat, protect a quiet hour), a tiny
disruption (missing key, cracked cup, changed schedule, late delivery,
overheard line), and player leverage (help, notice, ask, refuse, tease, fix,
hide, offer, leave, change the order, set terms, keep silent). Missing any
one, the card becomes mood prose or small talk.

## Micro-tension

Use low-pressure tension instead of fake drama: privacy (the character wants
the routine unseen), competence (good at small care, bad at asking), time (the
building wakes soon, rain starts, a train leaves), boundary (help is welcome,
intimacy is not automatic), memory (yesterday's object returns changed), social
friction (a neighbor or family rule adds a practical cost), care cost (helping
the player means neglecting the character's own routine). Micro-tension
invites action; it never forces confession.

## Habit state

Track only values that change behaviour: routine (private, shared,
interrupted, repaired, avoided), shared object (missing, broken, repaired,
borrowed, returned), trust (guarded, practical, warmer, strained), distance
(polite, comfortable, avoidant, renegotiated), mood or weather, promise (note
left, favor owed, next meeting implied). If a state does not alter the next
routine, cut it. It usually lives in the definition as behaviour rather than as
a visible line.

## Reply paths

Each path has a player move, a character response, a small change and a
renewed hook. At least three paths must change habit, trust, shared object,
boundary or next routine differently. Different moods with the same next
scene are decorative.

## Opening policy

Open inside the routine: one concrete place and time, one character action
already happening, one sensory anchor, one tiny disruption, one reason the
player matters now, and 2-4 reply paths that change habit, object, trust,
distance or next routine. The second turn shows a small change: the character
hands over an object, alters the order, reveals a bounded reason, respects a
boundary, leaves a note or plants a next-time callback.

## Romance posture

Daily-life supports romance, friendship, neighbors, rivals, family or quiet
companionship, but never assumes intimacy. Name the posture: friendship-first,
slow-burn optional, non-romantic companionship, cohabitation friction,
neighbor distance, found-family habit. The player chooses attraction,
closeness, forgiveness and whether a routine becomes shared.

## Field allocation

- summary (`card.json`): routine, player relationship and small pressure in
  one sentence.
- `definition.md`: routine loop, small desire, micro-tension, habit state,
  reply paths, passive-player behaviour, boundary posture, long-session renewal.
- `welcome.md`: the ordinary moment with one tiny disruption, not a biography
  or an abstract mood.
- `lorebook.json`: the shared place, recurring objects and neighbors as named
  entries so they return consistently.
- `talkExample` (`card.json`): examples beat rules for weak models: one
  ordinary-turn sample by default (`talk-example-design.md`): an
  ordinary exchange at the card's usual closeness, one small move, one small
  change; never the confession.
- presentation: only if it does one of UI's five jobs
  (`presentation-design.md`); otherwise none.

## Play probes

Playtest: 10–20 turns, a weak and a strong model, `--new-session`, one
shortcoming per version, compared with the previous version
(`playtest-loop.md`). Seed the runs with:

1. Opening routine probe: join the routine as written.
2. Help / refuse probe: decline the obvious small task.
3. Passive silence probe: send one word.
4. Boundary posture probe: push closeness early.
5. Return-next-time probe: come back and mention yesterday's object.

Pass means the character changes habit, object, trust, distance, mood, promise
or next-routine pressure without forcing intimacy or needing drama.

Common failures and repairs: no action behind the quiet mood (add a
disruption and player leverage); comfort loop only (add task, boundary,
object and small cost); instant romance (name the posture, add pacing gates);
routine never changes (add habit state and a next-time callback); character
waits for the player (passive behaviour tied to the routine: tend the plant,
restart the kettle, leave a note); opening is only atmosphere (rebuild from
place, character action, disruption, player implication).
