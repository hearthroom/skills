---
name: hearthroom-agency-designer
description: Use when a Hearthroom card task involves player agency, such as insertion space, interaction hooks, decorative choices, railroaded routes, the character deciding the player's feelings or actions, spectator openings, passive-player repair, reply-path design, consequence checks, or letting the player accept, refuse, question, leave, set terms or change the route.
---

# Hearthroom Agency Designer

Use this skill when the weak layer is the player's ability to act. The output
is an agency packet with patch targets, not a full card.

## Required references

- `../../references/agency-design.md`: insertion space, hooks, the reply-path
  matrix (the toolkit's only copy), authority opposition axis, guardrails,
  choices as drafts, consequence checks.
- `../../references/opening-design.md` when the failure starts on the first
  screen; `../../references/longplay-design.md` when choices stop mattering
  after it.
- `../../references/character-core-design.md` when the character gives no
  leverage; `../../references/boundary-design.md` when the premise is mature,
  coercive or consent-sensitive.

## Workflow

1. Diagnose: spectator opening, player-feeling narration, forced compliance,
   decorative choices, route funnelling, passive character, no refusal route,
   no consequence, or the character writing the player's actions.
2. Route to `hearthroom-character-core` when the character offers no leverage
   and to `hearthroom-boundary-designer` when the premise is
   boundary-sensitive. Preserve their packets.
3. Define the insertion space: identity, emotion, intention, method, boundary,
   and what the card must not decide.
4. Build hooks that give the player knowledge, access, resource, relationship
   power, interpretation, boundary or change authority.
5. Write the reply-path matrix: each move needs a character response, a
   state or route change, and a renewed hook. Player versus an authority
   needs at least one comply path and one resist path.
6. Add passive-player and boundary-setting behaviour without making the
   character wait forever or seize the player's actions.
7. Keep choices drafts, not rails: free text always works, a choice can be
   rewritten before it is sent, the first action may be a button but never
   only a button, and choices in every reply cost tokens every turn.
8. Name patch targets: scene in `welcome.md`, behaviour rules in
   `definition.md`, suggested first lines in `prologue` (player side only).

## Output

```text
Agency packet:
- current failure / agency promise / prerequisite repair:
- player role and insertion space:
- player controls / can refuse / can change:
- card must not decide:
- interaction hooks:
- reply-path matrix: move, character response, what changes, renewed hook
- compact state (only values that change behaviour):
- passive-player behaviour / boundary handling:
- consequence checks:
- patch targets: definition.md | welcome.md | prologue
- attention: which rule from this packet joins the top iron rules, and the
  matching line in the final recency checklist (`prompt-attention-architecture.md`):
- self-review: player can act before lore expands, three or more paths differ
  in outcome, pressure without deciding for the player, refusal keeps play
  alive, passive input gets a new hook
```

## Hand-off

- `hearthroom-opening-director` when the first screen needs a playable path.
- `hearthroom-longplay-architect` when choices need memory and route costs.
- `hearthroom-card-author` to apply patch targets, then
  `hearthroom card push --validate --json`.
- `hearthroom-chat-simulation` to test takeover or ignored choices. Playtest:
  10–20 turns, a weak and a strong model, `--new-session`, one shortcoming
  per version, compared with the previous version (`playtest-loop.md`).

## Do not

- Do not add choices that change nothing.
- Do not narrate the player's feelings, consent, attraction, loyalty, memory
  or actions.
- Do not make the player only admire, comfort, obey or watch.
- Do not let refusal end play; give it a cost, an alternate route or a later
  hook.
- Do not make the character passive; it can reveal, ask, bargain, pressure,
  withdraw, move, add a cost or call back a prior choice.
