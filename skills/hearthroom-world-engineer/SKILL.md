---
name: hearthroom-world-engineer
description: Use when a Hearthroom card needs worldbuilding, factions, locations, relationship networks, light or heavy setting rules, world state and consequences, a Lorebook plan, or a fix for lore dumps, before blueprinting, writing the definition or lorebook.json, or play testing.
---

# World Engineer

Use this skill when the world or its network is the weak layer. The output is
a world-engine packet with a Lorebook plan, not a full card, and it does not
touch the card folder.

## Required references

Read `../../references/world-engine-design.md` first. Read the Lorebook
section of `../../references/platform-facts.md` before planning entries; every
claim about how entries reach the model comes from there. Read
`../../references/play-engine-design.md` when stats, resources, quests or a
turn protocol are the main blocker, and use `hearthroom-play-engineer` first
if mechanics matter more than world scope. Use
`hearthroom-material-distiller` first when the author supplies a world bible,
notes or an imported draft.

## Workflow

1. Name the failure: lore dump, unclear player position, too many proper
   nouns, decorative factions, locations without actions, no compact state,
   routes without cost, or an opening that reads like a manual.
2. Choose the smallest scope that delivers the fantasy: light setting,
   scenario, heavy setting, open-world game or ensemble.
3. Define the core world rule as a choice-making rule, and the player
   position: what they can enter, refuse, change, risk, carry, reveal, hide,
   spend or unlock.
4. Build the network as pressure (want, leverage over the player, cost to
   help, pressure move, route use per node) and keep only locations with an
   access rule, a pressure, a resource or risk, a faction tie and a return
   hook.
5. Design a compact state model and two to four route seeds, each with a cost
   and a memory left behind.
6. Write the exposition policy: objects, demands, consequences, witnesses or
   contradictions, never a tour.
7. Split the world. Always-on rules, the player position and the state model
   go in `definition.md`. Facts needed only when a place, faction, name or
   topic comes up become entries in `lorebook.json`: a descriptive name, the
   content, the keywords a player or the character would actually type
   (staggered so one sentence does not fire several entries; both Chinese
   forms for a Chinese card), `matchOptions` where a short keyword needs
   whole-word matching, secondary keywords only to veto a common word, and
   `constant` only for the few short facts that must always be present plus,
   for a long card, the status-block protocol. Pass every kept line through
   the four questions in the reference.
8. State opening, longplay and presentation implications, the length
   tradeoff, and the next skill.

## Hand-off

Give the next skill this packet:

```text
World-engine packet:
- current failure:
- world promise:
- card type and shape / scope:
- player position:
- core world rule:
- playable slice and active pressure:
- faction / relationship network:
- locations:
- resources / clocks / costs:
- state model:
- route seeds:
- exposition policy:
- Lorebook plan (per entry: name, keywords, matchOptions, secondary keywords, constant yes/no, one-line content; which entries one ordinary sentence fires together):
- opening and longplay implications:
- state visibility (route to presentation / state economist):
- field targets (definition.md / lorebook.json / welcome.md / card.json summary):
- length tradeoff:
- attention: which rule from this packet joins the top iron rules, and the
  matching line in the final recency checklist (`prompt-attention-architecture.md`):
- next skill:
```

Route it to `hearthroom-card-blueprint` when character core, voice or field
synthesis is still needed; `hearthroom-opening-director` when the first screen
must reveal the rule without a lore tour; `hearthroom-play-engineer` for
mechanics and turn protocol; `hearthroom-card-author` when the author wants
the files written; `hearthroom-chat-simulation` when `hearthroom play`
transcripts show lore dumping or missing facts.

## Do not

- Do not write an encyclopedia. Every fact must change what the player can do,
  what someone wants, what a faction risks or what scene becomes possible.
- Do not introduce the full faction list in the opening.
- Do not rely on semantic admission for a fact that must appear. Give it
  keywords or make it constant, and keep constant entries few and short.
- Do not design entries around insertion depth, prompt role, outlets, sticky
  or cooldown timers, probability, recursion, group scoring, macros or
  scripts. Hearthroom does not support them.
- Agency guardrails: `agency-design.md`.
- Do not edit the card folder or run `hearthroom card push` or `hearthroom play`
  here.
