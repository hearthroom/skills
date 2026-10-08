# Longplay design

Use this reference when a card has a good first scene but cannot sustain
play. Longplay design turns a single prompt into a compact engine for
repeated scenes, remembered choices, route pressure and renewal.

## Core rule

```text
choice -> consequence -> memory thread -> progression -> renewed hook
```

The player should not have to invent every next beat. The character needs
enough durable rules to react, remember, escalate, redirect and create a new
situation without taking the player's agency.

## Platform notes

- The engine lives in `definition.md`. No separate memory feature is
  documented; memory threads are rules about what to carry forward, plus a
  compact state line if the state packet defines one.
- Durable lore goes into Lorebook entries with keywords so it re-enters when
  a place, person or object comes up. Keep constant entries few and short.
  In agent mode the character can list, search and read entries by name and
  content, so name entries by what they contain.
- Playtest: 10–20 turns, a weak and a strong model, `--new-session`, one
  shortcoming per version, compared with the previous version
  (`playtest-loop.md`); `--history` prints recent messages.

## Continuity spine

One sentence that explains why the next scene should exist. Good: "Each
player choice changes [relationship, world or resource], forcing [character]
to respond through [route pressure] while [external pressure] moves closer."
Weak: "The character keeps talking and interesting things may happen." A
spine that does not name what changes lets the card drift or repeat the
opening mood.

## Progression phases

Three to six. A phase is a behaviour mode with a trigger and a new kind of
pressure, not a chapter title.

```text
Phase | Trigger | Character behaviour | Player leverage | Unlocks | Risk
```

Common shapes: opening pressure, trust or suspicion, route choice,
consequence of a prior choice, reversal (reveal, retreat, ask for help, test
a boundary), renewal from the remembered unresolved hook. Do not fix the
order unless the card is a linear scenario.

## State

Track only state that changes future turns: what can the player now do, how
does the character behave differently, what cost, route, risk or access
appears. Useful types: relationship (trust, suspicion, intimacy, rivalry,
debt), pressure (clock, danger, attention, exposure), route, world (location,
faction, clue, resource), promise (secret, vow, boundary, favour, unresolved
question). Avoid decorative meters, too many stats for non-game cards, and
memory that stores everything. Use `state-economy-design.md` when the field
list is unresolved.

## Route seeds

```text
Route:
- trigger:
- character pressure:
- player leverage:
- unlock:
- cost:
- memory left behind:
- renewal hook:
```

A route without a cost is a menu; a route without memory is scenery. Most
cards need two to four. When the loop is the player versus a narrator,
system, institution, fate or authority figure, keep at least one comply route
and one resist route in every recurring option set; a playful option that
still obeys is not resistance.

## Branches and endings

A long card grows by optional branches that the player reaches by doing
something the main line did not expect, each with a trigger, a few escalating
beats, a line or item left in memory and an ending it can lead to. Keep one
short constant Lorebook entry that says where the branch entrances are and
tells the character to reveal one at a time (a side path, an odd object, a
remark), only when the player explores or keeps complying; never list them
(a keyword entry would fire only when the branch is already being
discussed). Replayability comes from branches and from alternate openings
that start different situations (`opening-design.md`).

Models play branches willingly but rarely close them: asked to end a story,
they add another beat. Make the ending the player's move. When the branch
condition is met (a rule script can count the player's own lines on the
sandbox page, keyed on message content, not on `data-msg-id`; it needs
`pageMode: sandbox`), offer an
ending action that sends an explicit line such as "(Ending: X) Let this be
where it ends", and bind that line in the output contract: that turn must
play ending X, emit its marker and close. In the same rule, forbid the
character from writing the player's actions or thoughts in the ending turn;
without it, the model finishes the story on the player's behalf.

## Initiative

Fill the reply-path matrix in `agency-design.md` with these rows: accepts
the hook, asks a question, resists, is passive, changes route, returns
later. Moves stay in character: reveal, ask, test, offer, pressure, withdraw, change
location, introduce a cost, call back a memory thread.

## Memory threads

Carry forward choices that should be respected later; promises, terms,
boundaries, debts and refusals; secrets revealed or withheld; relationship
changes; unresolved practical problems; recurring objects, places or rituals
that can restart play. Not every line. Memory makes later scenes cheaper and
sharper.

## Scene renewal

Every scene ends with one hook: a changed relationship beat, a route offer
with a cost, a new clue, risk, location or obligation, a task the player can
accept, refuse or reshape, or a callback to a prior promise or question.
Plot-driven cards also need a next station: a concrete pointer to the next
place, person, clue, decision or deadline. The character owns story
direction; the player owns method, stance, consent and route.

Do not enforce renewal with turn counts or "same scene for one or two
turns". The model does not count history reliably, and such rules rush a
player who wants to linger. Renew statelessly: keep the forward door open,
make one concrete change, offer one optional next station.

## Shape recipes

| Shape | State | Routes | Renewal | Avoid |
|---|---|---|---|---|
| Companion | trust, friction, debt, intimacy, boundary, routine | closer, conflict, repair, distance, confession | shared object, place, promise or hurt returns | comfort loop with no new beat |
| Story | clue, danger, attention, location, faction stance | investigate, hide, accuse, protect, bargain | a consequence changes access or risk | scenes that become exposition |
| Game | location, time, resources, risk, faction, quest | travel, fight, negotiate, craft, retreat | compact state shown before each choice | more stats than the character can update |
| Daily life | habit, weather, task, favour, place, trust | help, tease, avoid, notice, confess, repair | small object returns with changed meaning | quiet mood with no small desire |
| Ensemble | alliances, suspicion, promises, group tension, turn ownership | side with, mediate, expose, protect, split | one cast member acts on the last consequence | cast dialogue replacing the player |
| Generator | artifact version, constraints, accepted and rejected options | expand, compress, reframe, localise, format | every reply produces or revises the artifact | endless intake; see `generator-design.md` |

## Definition patch template

```text
Longplay engine
- Continuity spine:
- Progression phases:
- State to track:
- Route seeds:
- Memory threads:
- Passive-player behaviour:
- Scene renewal rule and next-station hook:
- attention: which rule from this packet joins the top iron rules, and the
  matching line in the final recency checklist (they must agree;
  `prompt-attention-architecture.md`)
```

Keep it compact. Durable rules carry the rare turn; one ordinary-turn sample
carries the format (`talk-example-design.md`).

## Continuation probes

1. Hook probe: accept the opening hook.
2. Passive probe: reply with a minimal line.
3. Route-change probe: refuse or redirect.
4. Continuity probe: refer to an earlier choice.
5. Renewal probe: end a scene and see what the character offers.

Pass: the character changes relationship, state, route, risk, artifact or
information, then offers a new playable hook, still at turn fifteen. Run the
probes inside one 10–20-turn conversation per model (`playtest-loop.md`).

## Failure repairs

| Failure | Repair |
|---|---|
| Good opening, dead third turn | spine, state model, initiative table |
| Character waits for the player | passive-player behaviour |
| Choices do not matter | route costs and memory left behind |
| Session restarts from the premise | return-later behaviour and unresolved hooks |
| Too many stats | cut to state that changes behaviour every few turns |
| Lore never becomes action | convert lore into clue, risk, place, faction or cost |
| Ensemble loses focus | turn ownership and group-tension memory |

## Checks on the card

- Can the character create a next beat when the player is passive?
- Does at least one state field change every few turns?
- Do route seeds have triggers, costs, unlocks and memory?
- Can a later session restart from the last unresolved hook?
- Does memory preserve choices without deciding feelings or consent?
- Is the state model compact enough to update reliably?
- Agency guardrails: `agency-design.md`.
