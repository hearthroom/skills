---
name: hearthroom-play-engineer
description: Use when a card task involves RPG, adventure, open-world, sandbox, survival, investigation, simulator, stats, resources, inventory, quests, combat, turn protocol, compact state updates, failure-forward behaviour, game loops or openings that read like rule manuals, before blueprinting, authoring, opening repair, long-play design, play testing or publish readiness.
---

# Hearthroom Play Engineer

Use this skill when the weak layer is the card's playable rule engine. The
output is a play-engine packet, not card files. It turns stat sheets and
manuals into compact loops the model can run every turn. Play cards set `type`
to `game` in `card.json`.

## Required references

Read `../../references/play-engine-design.md` first and
`../../references/platform-facts.md` for the card folder, the output contract,
display rules and the `play` command. As needed:
`../../references/system-intake-card-design.md` when a simulator, management
or investigation-desk opening needs an intake console;
`../../references/archetype-contracts.md` when the contract is still open;
`../../references/world-engine-design.md` for factions and locations;
`../../references/longplay-design.md` for route memory and progression;
`../../references/agency-design.md` when the system controls the player;
`../../references/opening-design.md` when the first screen reads like a
manual; `../../references/token-economy.md` when rules or panels bloat fields;
`../../references/state-economy-design.md` for the status block and
`../../references/sandbox-kit.md` for how it is drawn;
`../../references/presentation-design.md` for the UI role (`assist` | `core`)
and the five jobs of UI; `../../references/talk-example-design.md` for the
ordinary-turn sample.

## Workflow

1. Name the failure: manual opening, stats that never matter, resources without consequences, decorative inventory, forgotten state updates, failure that ends or vanishes, combat that swamps play, quests with no cost or memory.
2. Choose the smallest scope: light adventure, investigation, RPG/open-world, survival/horror, simulator/management.
3. Define player position and controls (enter, risk, spend, refuse, retreat, investigate, bargain, unlock, hide) and what the card must not decide (feelings, courage, loyalty, consent, memories, future actions).
4. Write the core loop, a compact state model (two to six visible fields, set with `hearthroom-state-economist`; a few hidden flags may stay in the definition), one owner per value, and the `[status]` block every reply ends with, in the output contract and once in the opening (`state-economy-design.md`).
5. Define resource rules and 2-3 quest or risk routes with trigger, approaches, pressure, cost, risk, reward, failure-forward outcome and renewed hook.
6. Write the turn protocol, failure-forward behaviour, lethal-route warnings and progression phases. Choices are drafts: a tap fills the composer, only a one-tap default start sends; free text always works.
7. Declare the UI role (`assist` | `core`, `presentation-design.md`) and the status overhead threshold, and write the opening contract and state visibility: what the block shows, which values are volatile, and that the sandbox kit draws it inside the bubble. If the first screen needs setup controls, follow the console pattern in `system-intake-card-design.md`.
8. Set field allocation and token plan, say which rule joins the iron rules and the recency checklist, write the play probes, run the self-review.

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
- compact state model (two to six visible; one owner per value; volatile fields):
- ui role: assist | core; status overhead threshold
- resource rules:
- quest / risk model:
- turn protocol:
- failure-forward behaviour:
- progression phases:
- opening contract:
- state visibility (the status block, how the kit draws it):
- attention: which rule from this packet joins the top iron rules, and the matching line in the final recency checklist (they must agree; `prompt-attention-architecture.md`)
- field allocation:
- token plan:
- play probes (Playtest: 10–20 turns, a weak and a strong model, `--new-session`, one shortcoming per version, compared with the previous version (`playtest-loop.md`).):
- self-review: every stat changes choices; the status block updates each reply and is intact at the last turn; resources cost something; failure never dead-ends; agency preserved; opening playable before it explains; tokens favor rules over lore
- next skill:
```

Hand it to `hearthroom-card-author` when the packet is coherent and the author
wants files written and pushed; `hearthroom-opening-director` when the first
screen still reads like a manual; `hearthroom-presentation-director` when the state panel or console is the open question, `hearthroom-sandbox-kit` to build the status panel; `hearthroom-world-engineer`,
`hearthroom-longplay-architect`, `hearthroom-agency-designer` or
`hearthroom-token-architect` for the one layer that stays weak;
`hearthroom-chat-simulation` after push and validation when state updates or
failure-forward play need real turns.

## Do not

- Do not fix an RPG by adding a bigger rulebook. Cut to state and rules the model can run every turn.
- Do not keep a stat, item, faction, quest or combat rule that changes no choice, cost, access, risk, reward or route.
- Do not let the opening explain the whole game. One playable setup or crisis.
- Do not write the player's next action or interior state. Pressure, warn, tempt, block or price a route instead.
- Do not edit files, push or play from this skill.
