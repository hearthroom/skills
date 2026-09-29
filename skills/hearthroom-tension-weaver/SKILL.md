---
name: hearthroom-tension-weaver
description: Use when a Hearthroom card idea is interesting but inert, with missing stakes, a weak hook, no "why now", no character desire, no player leverage or no external pressure, and the tension triangle must be built before blueprinting, opening repair, writing fields or play testing.
---

# Tension Weaver

Use this skill when the card's core pressure is unresolved: the idea is
attractive, but it does not yet say what the character wants, what the player
can change, or why the scene starts now. The output is a tension packet, not
final fields, and it does not touch the card folder.

## Required references

Read `../../references/tension-triangle.md` first. Read
`../../references/character-core-design.md` when character desire or boundary
is missing. Read `../../references/agency-design.md` when the player has no
real control. Read `../../references/platform-facts.md` for the fields the
packet points at.

## Workflow

1. Name the inertness: missing character desire, player leverage, external
   pressure, why-now, consequence or renewal.
2. Route away if this is not the weak layer: no direction yet goes to
   `hearthroom-premise-workshop`; a weak character core, player agency,
   opening or one specialized engine goes there instead.
3. Pick one or two tension sources from the reference.
4. Build the triangle: desire that creates action, leverage that changes
   consequence, external pressure with a visible first-scene form.
5. Write one first-scene hook and one why-now statement a single opening beat
   can prove.
6. Define what changes if the player accepts, questions, refuses or redirects,
   and what happens if they do nothing. Each path leads to a different state,
   route, access, risk, relationship, clue or boundary outcome.
7. State field placement and hand off.

## Hand-off

Give the next skill this packet:

```text
Tension packet:
- current inertness:
- card type and shape:
- character desire / desire under pressure:
- player leverage:
- external pressure:
- why now:
- consequence if the player does nothing:
- first-scene hook:
- reply paths (accept / question / refuse or set terms / redirect or exploit):
- state or route changed:
- field placement (summary / definition / opening / examples):
- delayed routes:
- next skill:
```

Route it to `hearthroom-card-blueprint` when the triangle is ready for full
planning; `hearthroom-opening-director` when only the first screen is weak;
`hearthroom-character-core` when desire or boundary is missing;
`hearthroom-agency-designer` when the player still cannot change the pressure;
the matching engine skill (relationship, daily life, scenario, play, world,
generator, ensemble) when that engine should carry the pressure.

## Do not

- Do not fix inertness with prettier mood prose, a larger lore dump or forced
  player feelings. Build pressure the player can answer.
- Do not let the character decide the player's inner state or commitments.
- Do not prefer abstract destiny over concrete objects, deadlines, debts,
  secrets, rules, social risks or care costs.
- Do not edit the card folder or run `hearthroom card push` or `hearthroom play`
  here.
