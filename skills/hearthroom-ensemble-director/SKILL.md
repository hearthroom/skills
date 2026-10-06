---
name: hearthroom-ensemble-director
description: Use when a card has several active speakers and needs cast-size, turn-ownership, spotlight or voice-contrast decisions, or when the cast crowds the player, the opening is a roll call, speakers blur, or the author says "too many characters talking", before authoring or playtesting.
---

# Hearthroom Ensemble Director

Keep an ensemble from becoming a cast list, a roll-call opening or a
conversation where characters talk over the player. The output is an
ensemble packet; the card's `type` follows its primary contract and the
ensemble is how that contract plays.

## Required references

Read `../../references/ensemble-card-design.md`. Read the narrow reference
only when it is the blocker: `../../references/archetype-contracts.md`
(primary contract or overlay), `../../references/voice-calibration.md`
(speakers blur), `../../references/opening-design.md` (roll call),
`../../references/agency-design.md` (the cast crowds the player),
`../../references/longplay-design.md` (group tension needs memory),
`../../references/world-engine-design.md` (keyword staggering),
`../../references/talk-example-design.md` (the ordinary group turn).

## Workflow

1. Restate the seed or failure and decide whether ensemble is primary or an
   overlay (`hearthroom-archetype-director` if unresolved).
2. Define player role and leverage before keeping any speaker: the player
   must be able to change clue, route, trust, alliance, risk, access or
   boundary.
3. Build the cast decision matrix (each speaker's relation to the player as
   one concrete image) and keep, merge or cut by play function; two speakers
   who share function, want, pressure move and rhythm merge. Most cards keep
   two to five core speakers.
4. Define the conflict network, the group tension state, and turn ownership:
   opening focus, first speaker, interrupter, holder-back, secondary entry
   rules, maximum active speakers per turn, when the player must be
   addressed, and the speaker-marking format if replies need one.
5. Define spotlight rules and voice contrast (speakers differ by want, fear,
   speech cue and pressure move, not only name or catchphrase); plan one
   ordinary group-turn sample for `talkExample`, never a showdown.
6. Plan secondary speakers and factions as named Lorebook entries with
   staggered keywords; allocate fields; write agency and play probes; name
   which turn-ownership rule joins the iron rules and the recency checklist.

## Packet

Promise; cast scope; player role and leverage; cast matrix; conflict network;
turn ownership; spotlight rules; group tension state; opening focus; voice
contrast; the sample's ordinary turn; field allocation; probes. Continue
with `hearthroom-card-blueprint` or `hearthroom-card-author`,
`hearthroom-opening-director` when the first screen lacks a focal crisis,
`hearthroom-voice-director` when speakers still blur,
`hearthroom-agency-designer` when the cast still crowds the player.

## Do not

- Do not let every speaker introduce themselves in the opening; one focal
  crisis.
- Do not let cast dialogue replace player agency; after speaker-to-speaker
  conflict, pressure returns to the player.
