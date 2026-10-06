---
name: hearthroom-world-engineer
description: Use when a card needs worldbuilding, factions, locations, relationship networks, setting rules, world state or a Lorebook plan, or when it dumps lore, drowns in proper nouns or opens with a tour, before writing the definition or lorebook.json.
---

# World Engineer

Make a world that creates play: every fact changes what the player can do,
what someone wants, what a faction risks or what scene becomes possible.
The output is a world-engine packet with a Lorebook plan; it does not touch
the card folder.

## Required references

Read `../../references/world-engine-design.md` and the Lorebook section of
`../../references/platform-facts.md` (every claim about how entries reach
the model comes from there). Read `../../references/play-engine-design.md`
when stats, resources or a turn protocol are the main blocker. A supplied
world bible or imported draft goes through `hearthroom-material-distiller`
first.

## Workflow

1. Name the failure: lore dump, unclear player position, too many proper
   nouns, decorative factions, locations without actions, no compact state,
   routes without cost, or an opening that reads like a manual. Choose the
   smallest scope that delivers the fantasy: light setting, scenario, heavy
   setting, open-world game or ensemble.
2. Define the core world rule as a choice-making rule and the player
   position: what they can enter, refuse, change, risk, carry, reveal, hide,
   spend or unlock.
3. Build the network as pressure (want, leverage over the player, cost to
   help, pressure move, route use per node) and keep only locations with an
   access rule, a pressure, a resource or risk, a faction tie and a return
   hook. Design a compact state model and two to four route seeds, each
   with a cost and a memory left behind.
4. Write the exposition policy: objects, demands, consequences, witnesses or
   contradictions, never a tour.
5. Split the world. Always-on rules, the player position and the state
   model go in `definition.md`. Facts needed only when a place, faction,
   name or topic comes up become `lorebook.json` entries: a descriptive
   name, the content, the keywords a player would type when the topic comes
   up (staggered so one sentence does not fire several entries; both Chinese
   forms for a Chinese card; not a word the character says most turns — the
   latest reply is scanned too, so that entry is simply always on and the
   keyword buys nothing), `matchOptions` where a short keyword
   needs whole-word matching, secondary keywords only to veto a common
   word, `constant` only for the few short facts that must always be
   present (plus, for a long card, the status-block protocol). Pass every
   kept line through the reference's four questions. Source files live one
   entry per file under `worldbook/*.md` (frontmatter `name`, `keywords`,
   `secondaryKeywords`, `constant`, `order`), built with `hearthroom
   lorebook build <dir>`; `hearthroom lorebook check <dir>` reports drift,
   entries without keywords and keyword collisions. Never hand-edit the
   built JSON.
6. State opening, longplay and presentation implications, the length
   tradeoff, and which rule joins the iron rules and the recency checklist.

## Packet

Promise; scope; player position; core rule; playable slice and active
pressure; network; locations; resources, clocks, costs; state model; route
seeds; exposition policy; Lorebook plan (per entry: name, keywords,
matchOptions, secondary keywords, constant, one-line content; which entries
one ordinary sentence fires together); implications; field targets.
Continue with `hearthroom-card-blueprint`, `hearthroom-opening-director`
when the first screen must reveal the rule without a tour,
`hearthroom-play-engineer` for mechanics, `hearthroom-card-author`, or
`hearthroom-chat-simulation` when transcripts show lore dumping or missing
facts.

## Do not

- Do not introduce the full faction list in the opening.
- Do not rely on semantic admission for a fact that must appear; give it
  keywords or make it constant, and keep constant entries few and short.
- Do not design entries around insertion depth, prompt role, sticky or
  cooldown timers, probability, recursion or scripts; Hearthroom does not
  support them.
