---
name: hearthroom-play-engineer
description: Use when a card task involves RPG, adventure, open-world, sandbox, survival, investigation, simulator, stats, resources, inventory, quests, combat, turn protocol, compact state updates, failure-forward behavior, game loops or openings that read like rule manuals, before blueprinting, authoring, opening repair, long-play design, play testing or publish readiness.
---

# Hearthroom Play Engineer

Use this skill when the weak layer is the card's playable rule engine. The
output is a play-engine packet, not a full card and not a push. It turns stat
sheets and manuals into compact loops the model can run every turn. Play cards
set `type` to `game` in `card.json`.

## Required references

Read `../../references/play-engine-design.md` first and
`../../references/platform-facts.md` for the card folder, the output contract,
display rules and the `play` command. As needed:
`../../references/archetype-contracts.md` when the contract is still open;
`../../references/system-intake-card-design.md` when a simulator, management,
mission-board or investigation-desk opening needs an intake console;
`../../references/world-engine-design.md` for factions, locations or world
rules; `../../references/longplay-design.md` for route memory and progression;
`../../references/agency-design.md` when the system controls player actions,
feelings or consent; `../../references/opening-design.md` when the first screen
reads like a manual; `../../references/token-economy.md` when rules or panels
bloat the opening; `../../references/playtest-loop.md` for probes and triage;
`../../references/card-authoring-templates.md` when the packet must become file
edits.

## Workflow

1. Name the failure: manual opening, stats that never matter, resources without consequences, decorative inventory, forgotten state updates, failure that ends or vanishes, combat that swamps play, quests with no cost or memory.
2. Choose the smallest scope: light adventure, investigation, RPG/open-world, survival/horror, simulator/management.
3. Define player position and controls (enter, risk, spend, refuse, retreat, investigate, bargain, unlock, hide) and what the card must not decide (feelings, courage, loyalty, consent, memories, future actions).
4. Write the core loop, a compact state model of 5-9 fields that change future choices, and the state line every reply carries in the output contract.
5. Define resource rules (what each resource buys, saves, loses or unlocks) and 2-3 quest or risk routes with trigger, approaches, pressure, cost, risk, reward, failure-forward outcome, memory and renewed hook.
6. Write the turn protocol, failure-forward behavior, lethal-route warnings and progression phases.
7. Write the opening contract and state visibility: what the state line shows and whether a display rule in `rules.json` turns it into a bar. If the first screen needs setup controls, follow the console pattern in `system-intake-card-design.md`: scene beat first, then panel, form and choices as `hc-*` components.
8. Set field allocation and token plan, write the play probes, run the self-review.

## Hand-off

```text
Play-engine packet:
- current failure:
- card shape:
- play promise:
- player position:
- player controls:
- card must not decide:
- core loop:
- compact state model:
- resource rules:
- quest / risk model:
- turn protocol:
- failure-forward behavior:
- progression phases:
- opening contract:
- state visibility:
- field allocation: summary, definition.md, welcome.md, openings/, outputContract, talkExample, lorebook.json, rules.json
- token plan:
- play probes:
- self-review: every stat changes choices; state updates each reply; resources cost something; failure never dead-ends; agency preserved; opening playable before it explains; tokens favor rules over lore
- next skill:
```

Hand it to `hearthroom-card-author` when the packet is coherent and the author
wants files written and pushed; `hearthroom-opening-director` when the first
screen still reads like a manual; `hearthroom-presentation-director` or
`hearthroom-html-card-components` when the state panel or console markup is
the open question; `hearthroom-world-engineer` when factions or locations need
play functions; `hearthroom-longplay-architect` when route memory stays weak;
`hearthroom-agency-designer` when the system writes player actions or every
route funnels to one outcome; `hearthroom-token-architect` when rule or state
bloat hides the engine in the wrong file; `hearthroom-chat-simulation` after
push and validation when state updates or failure-forward play need real turns.

## Do not

- Do not fix an RPG by adding a bigger rulebook. Cut to state and rules the model can run every turn.
- Do not keep a stat, item, faction, quest or combat rule that changes no choice, cost, access, risk, reward or route.
- Do not let the opening explain the whole game. One playable setup or crisis.
- Do not write the player's next action or interior state. Pressure, warn, tempt, block or price a route instead.
- Do not edit files, push or play from this skill.
