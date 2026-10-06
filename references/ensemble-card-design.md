# Ensemble Card Design

Use this reference when a card has several active speakers: cast members,
factions, suspects, crew, roommates, party members or group-scene pressure. A
strong ensemble card is not a list of characters. It is a scene engine where
several people create choices without pushing the player out of the center.
The card's `type` follows its primary contract; the ensemble is how that
contract is played.

## Core rule

```text
cast member -> pressure move -> player choice -> group state change -> renewed hook
```

A speaker who only adds color, lore, banter or exposition gets merged into
another, demoted to a background mention or delayed.

## Cast scope

Most ensemble cards use 2-5 active core speakers: 2 when the player is caught
between a pair; 3 as the default for mystery, crew, roommates or party cards;
4-5 only if every speaker has a different function; 6+ only for explicit
simulator or large-system cards. Keep a speaker with a unique function,
pressure move, player leverage and voice. Merge two who want the same thing
and press the player the same way. Cut or demote one who cannot change choice,
route, risk, clue access, relationship, faction stance or boundary.

## Cast decision matrix

```text
Speaker | Function | Wants | Fears / cost | Relation to the player as one image | Speech cue | Pressure move | Player leverage | Keep / merge / cut
```

Useful functions: accuser, protector (safety at a cost), witness (partial
truth), rival, broker (shortcut with debt), skeptic, dependent (stakes without
removing agency), wildcard (changes the group state when ignored). "Relation
as one image" is a concrete thing the model can reuse (she still has his key;
he sits in the player's old chair), never "deep feelings".

## Turn ownership

Without turn rules, group scenes become roll calls or multi-speaker
monologues. Define the opening focus (one speaker, one demand, one crisis),
the first speaker, the interrupter and why they may cut in, the holder-back
and their trigger, secondary entry rules, max active speakers per turn
(usually 1-2), and the address rule: after cast conflict, a speaker turns the
pressure back to the player. A speaker may interrupt only if it creates a
clue, cost, risk, route or relationship shift for the player. Put these rules
in the definition and, if replies must mark who is speaking, that format in
the output contract.

## Spotlight rules

One focal conflict per scene. Strong patterns: triangle (two disagree; the
player sides, mediates, tests or walks), relay (one reveals pressure, another
complicates it, the player decides), withheld seat (one stays silent until
asked or accused), split route (following one delays access to another), group
cost (helping one changes trust or danger for the rest). Weak patterns: every
speaker greets the player, every speaker states a trait, speakers debate for
paragraphs, the player can only observe, admire, comfort or obey.

## Group tension state

Track only what changes future turns: suspicion, alliance, trust or distance
per speaker or faction, clue access, promise, debt, threat or favor, hidden
accusation, route split, unresolved boundary or refusal. No full relationship
table unless the values change routes.

## Opening policy

Do not introduce the full cast. Start with one place and time, one focal
speaker action, one visible group pressure, one reason the player matters now,
2-4 reply paths that change clue, trust, risk, access, alliance or boundary,
and one second-turn move that updates group tension. The rest of the cast
enters by interruption, evidence, noise, absence, a door, a message or a
consequence of the player's first action.

## Voice and examples

Voice contrast starts from motive and pressure, not punctuation. For each core
speaker define private motive, fear or cost, sentence rhythm, vocabulary or
address style, action beat while speaking, pressure move, and refusal style.
Examples beat rules for weak models: one ordinary-turn sample by default
(`talk-example-design.md`). For an ensemble that sample is one ordinary group
turn in which two core speakers speak and the pressure returns to the player,
in the output contract's speaker-marking format; never a showdown. Cut
repeated lore or decorative banter to pay for it.

## Field allocation

- summary (`card.json`): group situation, player role, immediate pressure.
- `definition.md`: cast matrix, conflict network, turn ownership, group tension
  state, voice contrast, agency boundaries, route rules.
- `welcome.md`: one focal crisis, not the cast manual.
- `lorebook.json`: one entry per secondary speaker or faction, named by who
  they are, so they enter consistently when their keywords appear. Stagger
  the keywords so one sentence does not summon three speakers
  (`world-engine-design.md`).
- `talkExample` (`card.json`): examples beat rules for weak models: one
  ordinary-turn sample by default (`talk-example-design.md`): an
  ordinary group turn, not a showdown.
- presentation: only if it does one of UI's five jobs
  (`presentation-design.md`); otherwise none.

## Testing

Probe manually first. Then: Playtest: 10–20 turns, a weak and a strong model, `--new-session`, one
shortcoming per version, compared with the previous version
(`playtest-loop.md`). Seed the runs with,
once the card validates and the author accepts the cost: side with the least trusted speaker; refuse
the obvious group demand; accuse the focal speaker; ask the quiet speaker
directly; stay passive; set a boundary or leave the room. Pass: the cast does
not debate while ignoring the player; the card does not decide the player's
feelings, loyalty, consent or actions; at least three reply paths change group
state; refusal and passivity keep play alive; the core speakers are
identifiable without names.
