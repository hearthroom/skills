---
name: hearthroom-ensemble-director
description: Use when a card has several active speakers and needs cast-size, merge or cut decisions, turn ownership, spotlight rules, group tension state or voice contrast, or when the cast crowds the player, the opening is a roll call or speakers blur, before blueprinting, authoring, opening repair, voice calibration or play testing.
---

# Hearthroom Ensemble Director

Use this skill when the weak layer is multi-character structure. The output is
an ensemble packet, not a full card and not a push. It stops ensemble cards
from becoming cast lists, roll-call openings or conversations where characters
talk over the player. The card's `type` in `card.json` follows its primary
contract; the ensemble is how that contract plays.

## Required references

Read `../../references/ensemble-card-design.md` first and
`../../references/platform-facts.md` for `talkExample`, the Lorebook and the
`play` command. As needed: `../../references/archetype-contracts.md` when
deciding whether ensemble is the primary contract or an overlay;
`../../references/voice-calibration.md` when speakers blur;
`../../references/opening-design.md` when the first screen is a roll call;
`../../references/agency-design.md` when the cast crowds out the player;
`../../references/longplay-design.md` when group tension needs memory;
`../../references/token-economy.md` when cast or samples bloat fields;
`../../references/card-authoring-templates.md` for the hand-off shape.

## Workflow

1. Restate the seed or failure: new design, roll-call opening, cast crowding, blurred speakers, token bloat or weak player role. Decide whether ensemble is primary or an overlay; use `hearthroom-archetype-director` if unresolved.
2. Define player role and leverage before keeping any speaker. The player must be able to change clue, route, trust, alliance, risk, access or boundary.
3. Build the cast decision matrix and keep, merge or cut by play function. Most cards keep 2-5 core speakers.
4. Define the conflict network and group tension state.
5. Define turn ownership: opening focus, first speaker, interrupter, holder-back, secondary entry rules, max active speakers per turn, when the player must be addressed. If replies must mark who speaks, plan that format for the output contract.
6. Define spotlight rules, the opening focus, voice contrast, and whether any speaker needs a `talkExample` micro-sample.
7. Plan secondary speakers and factions as named Lorebook entries; produce token plan and field allocation.
8. Write agency and play probes, run the self-review, name the next skill.

## Hand-off

```text
Ensemble packet:
- current seed or failure:
- card shape:
- ensemble promise:
- cast scope:
- player role:
- player leverage:
- cast decision matrix: per speaker, function, want, fear / cost, speech cue, pressure move, player leverage, keep / merge / cut
- conflict network:
- turn ownership: opening focus, first speaker, interrupter, holder-back, entry rules, max active speakers, address rule
- spotlight rules:
- group tension state:
- opening focus:
- voice contrast plan:
- talkExample decision:
- token plan:
- agency and play probes:
- field allocation: summary, definition.md, welcome.md, outputContract, talkExample, lorebook.json, presentation
- self-review: every speaker changes play; player not crowded out; opening not a roll call; turn ownership explicit; tension trackable; voices pass a blind-line check; tokens justified
- next skill:
```

Hand it to `hearthroom-archetype-director` when ensemble may be only an
overlay; `hearthroom-card-blueprint` for a card-ready blueprint;
`hearthroom-card-author` when the author wants files written and pushed;
`hearthroom-opening-director` when the first screen lacks a focal crisis;
`hearthroom-voice-director` when speakers still blur;
`hearthroom-agency-designer` when the cast still crowds out the player;
`hearthroom-longplay-architect` when group tension needs route memory;
`hearthroom-chat-simulation` when transcripts show cast-over-player behavior
or ignored choices.

## Do not

- Do not keep more than five core speakers without a simulator or large-system reason.
- Do not keep two speakers who share function, want, pressure move, rhythm and player leverage. Merge them.
- Do not let every speaker introduce themselves in the opening. One focal crisis.
- Do not let cast dialogue replace player agency. After speaker-to-speaker conflict, pressure returns to the player.
- Do not distinguish speakers only by name, punctuation, accent or catchphrase.
- Do not edit files, push or play from this skill.
