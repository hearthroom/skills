# Profile Packaging

Use this when the card's engine is coherent but the public surface is weak:
`name`, `summary`, `tags`, or the reason a player should open the card.

Packaging is the promise layer, not publish readiness:

```text
engine -> promise angle -> name / summary / tags -> first-impression check
```

A new player should grasp the fantasy, their relation to the character, and the
playable tension in seconds.

## Promise angle

```text
card shape / player role / character or system / central tension /
repeated play loop / strongest unusual detail / boundary posture if relevant /
first-screen proof
```

Do not fake an unknown item; mark it and hand off to the skill that defines it.

## Name patterns

| Pattern | Use when |
|---|---|
| `[Name], [specific pressure role]` | persona-led cards |
| `[Place/Object/System] of [playable rule]` | world, mystery, or system cards |
| `[Role] Who [contradiction or action]` | trope repair or strong hook |
| `[Group/Event] at [pressure point]` | ensemble or scenario cards |

Avoid generic archetypes ("Vampire Boyfriend"), mood-only names, joke names on
non-comedic cards, and stacked subtitles. Return three candidates with different
angles, then choose.

## Summary patterns

One compact sentence. Aim for 80 to 260 characters; go longer only for systems,
games, generators, or complex ensembles. The provider limit is 500 characters,
or 2500 only when `language` is exactly `en`; read it from `tokenBudget.limits`
in `card validate --json` (`platform-facts.md`).

```text
[Player role] enters [situation] with [character/system], where [tension] creates [loop].
[Character/system] needs [player leverage] before [pressure] breaks [relationship, secret, mission, or rule].
You keep meeting [character] during [routine], where [small pressure] slowly changes [relationship, habit, or route].
Lead [position] through [world/system], managing [resource/risk] as choices change [state or route].
```

Cut: backstory that belongs in the definition; several proper nouns before the
player knows what they do; mood stacks (beautiful, dark, mysterious, immersive);
performance claims (popular, top, viral, best); policy disclaimers.

## Tags

Tags show the card's contract; they are not a ranking strategy. Draw from:

1. card shape: companion, scenario, mystery, game, generator, daily-life,
   heavy-setting, ensemble, system
2. relationship or role axis: mentor, rival, neighbor, partner, crew, suspect,
   patron, witness, caretaker
3. action loop: investigation, negotiation, survival, cohabitation,
   exploration, management, repair, confession, route-choice
4. tone: cozy, eerie, slow-burn, comedic, intense, horror, boundary-aware
5. mechanic or format: compact-state, status-bar, inventory, clue-route,
   memory-thread, multi-speaker

Prefer concrete tags over synonyms. No product, origin, or audience-size claims.

## First-impression check

- Can a new player say who they are in this card?
- Can they name the pressure or desire that starts play?
- Does name plus summary promise something the opening proves?
- Do tags distinguish the card from nearby archetypes?
- Did packaging leave the engine unchanged and invent no claims?

## Common repairs

| Failure | Repair |
|---|---|
| Name is only a trope | add a specific pressure role or contradiction |
| Summary is a synopsis | keep one relation, one tension, one loop |
| Tags are mood-only | add card shape and action loop |
| First impression overpromises | align the summary with the opening |
| Packaging changed the card | preserve the engine; change profile fields only |
| Author asks for "top" phrasing | translate to clarity, specificity, agency, hook |
