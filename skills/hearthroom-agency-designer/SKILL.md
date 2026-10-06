---
name: hearthroom-agency-designer
description: Use when a card's player can only watch, admire or obey, when choices are decorative or routes railroaded, when the character decides the player's feelings or actions, or when the author says the player "has nothing to do" or "feels like a spectator".
---

# Hearthroom Agency Designer

Repair the player's ability to act. A card lives on what the player can
change; when they can only watch, nothing else in the card matters. The
output is an agency packet with patch targets, not a full card.

## Required references

Read `../../references/agency-design.md` (insertion space, hooks, the
reply-path matrix, choices as drafts, consequence checks). Read
`../../references/opening-design.md` when the failure starts on the first
screen, `../../references/longplay-design.md` when choices stop mattering
after it, `../../references/character-core-design.md` when the character
gives no leverage, and `../../references/boundary-design.md` when the
premise is coercive or consent-sensitive.

## Workflow

1. Name the failure: spectator opening, player-feeling narration, forced
   compliance, decorative choices, route funnelling, passive character, no
   refusal route, no consequence, or the character writing the player's
   actions. A character with no leverage goes to `hearthroom-character-core`
   first; a boundary-sensitive premise to `hearthroom-boundary-designer`.
2. Define the insertion space: identity, emotion, intention, method,
   boundary, and what the card must not decide.
3. Build hooks that give the player knowledge, access, resource, relationship
   power, interpretation, boundary or change authority.
4. Write the reply-path matrix: each move gets a character response, a state
   or route change, and a renewed hook; against an authority at least one
   comply and one resist path.
5. Add passive-player and boundary-setting behaviour that neither waits
   forever nor seizes the player's actions.
6. Keep choices drafts, not rails: free text always works, a choice can be
   rewritten before it is sent, the first action may be a button but never
   only a button, and choices in every reply cost tokens every turn.
7. Name patch targets: scene in `welcome.md`, behaviour rules in
   `definition.md`, suggested first lines in `prologue` (player side only),
   and which rule joins the top iron rules with its line in the recency
   checklist.

## Checks

The player can act before the lore expands; three or more paths differ in
outcome; pressure never decides for the player; refusal keeps play alive;
passive input gets a new hook. Continue with `hearthroom-opening-director`
for the first screen, `hearthroom-longplay-architect` for choice memory and
route costs, `hearthroom-card-author` to apply the patches, or
`hearthroom-chat-simulation` to test takeover and ignored choices.

## Do not

- Do not narrate the player's feelings, consent, attraction, loyalty, memory
  or actions.
- Do not let refusal end play; give it a cost, an alternate route or a later
  hook.
- Do not add choices that change nothing.
