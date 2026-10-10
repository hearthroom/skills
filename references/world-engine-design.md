# World Engine Design

Use this reference when a card needs worldbuilding, relationship networks,
factions, locations, setting rules or lore compression. The goal is a playable
world engine, split sensibly between the definition and the Lorebook, not a
larger encyclopedia.

```text
world fact -> player action -> state / consequence -> renewed hook
```

If a fact does not change what the player can do, what a character wants,
what a faction risks, which location can be reached or what future scene
becomes possible, delay or cut it.

## Scope ladder

Choose the smallest scope that delivers the fantasy. Scope follows the play
loop, not the amount of lore the author has.

| Scope | Use when | Keep |
|---|---|---|
| light setting | the world is atmosphere around a relationship or daily-life loop | one rule, one main place, one pressure, one progression path |
| scenario | the world exists to drive a focused conflict | one conflict, 2 to 4 locations, 2 to 4 branches, a clear clock |
| heavy setting | the world itself is the fantasy | modular rules, factions, places, routes, state, lore priority |
| open-world game | choices need resources, travel, combat or progression | compact state, route costs, failure pressure, reward unlocks |
| ensemble | several factions or speakers must stay active | turn ownership, group tension, contrast, player leverage |

## Play-function filter

Keep an entity only if it can take a verb: visit, cross, unlock, lose,
protect, expose, hide, betray, bargain, repair, block, pursue, shelter, tax,
remember, forget, transform, escalate, reward. Anything that cannot take a
verb is decorative lore.

## Network, locations, state, routes

```text
Node | Wants | Leverage over player | Cost to help | Pressure move | Route use
```

Useful nodes: a guide who gives access but hides a cost; an authority who
offers legitimacy but narrows routes; a vulnerable group that creates stakes;
a broker who opens shortcuts at a cost; a rival who tests competence or
loyalty; a witness who knows but cannot act; a wild card who changes a route
when ignored. Every node needs a reason to act when the player is passive.

Each active location has an access rule, a pressure that starts there, a
resource or risk, a faction tie and a return hook. One to three active
locations at first; one or two in the opening.

Track only state that changes future turns: location, faction stance, clock,
resource, debt, clue, reputation, relationship thread, route flag, promise,
boundary, unresolved question. No decorative meters, and no hidden state that
contradicts the player's visible choices. If the player should see state,
route its format to `hearthroom-state-economist` and
`hearthroom-presentation-director`. Status block: the canonical form and its
home are in `state-economy-design.md`.

A route seed is a contract: trigger, world pressure, player leverage, faction
or relationship shift, unlock, cost, memory left behind, renewal hook. A route
that only changes scenery is not a route.

## Exposition policy

Reveal lore through action surfaces: an object (warrant, map, debt note, key),
a demand (pay, choose, testify, hide, escort), a consequence (curfew, lost
access, suspicion), a witness (someone affected by the rule now), or a
contradiction (two rules cannot both be true and the player can test them).
Never explain the system before the player can act; when the player asks for
lore, answer through what it changes now. The opening uses one playable slice:
one place, one voice, one object or threat, one visible rule, two to four
reply paths.

## Definition versus Lorebook

Split by when a fact is needed:

- Definition (`definition.md`): the core rule, the player position, the state
  model, the exposition policy, the character's initiative, and anything that
  must shape every reply.
- Lorebook (`lorebook.json`): facts that matter only when a place, faction,
  person, object or topic comes up. Each entry has `name`, `content`,
  `keywords`, `secondaryKeywords`, `constant`, `disabled` and `matchOptions`
  (`scanDepth`: 0 is this turn plus the latest reply, 1–100 that many
  messages; `matchWholeWords`, on for short English keywords so "art" does
  not fire on "start"; `caseSensitive`; `order`; `platform-facts.md`).

Before keeping a line, ask whether the model would get it wrong without it,
whether it is information or decoration, whether a list could replace it,
and whether it makes sense without the source material; fail one, cut or
rewrite.

How entries reach the model in a normal conversation:

- Keywords are matched against the player's input and the recent messages.
  Write the words a player or the character would actually type, in the
  card's language. A keyword written as `/pattern/flags` is a regular
  expression.
- The recent messages include the character's own reply. A keyword the
  character says in most replies (a catchphrase, the setting's key noun, a
  filler word) admits the entry on the first turn, and since admitted
  entries stay, it behaves like a constant entry and nudges the model toward
  that scene. Before pushing, run the keywords over a few real reply texts
  from a playtest and count hits; an optional branch that fires in most
  replies needs narrower keywords. A whole-line regex such as
  `/^\s*[.…]+\s*$/m` catches a minimal player input; whether matching is per
  message or over the joined window is not documented, so confirm with a
  play turn whose reply contains a bare ellipsis line.
- Partition keywords so one ordinary sentence does not fire several entries:
  give each entry nouns no sibling entry shares, and run a few real replies
  through every keyword list to count entries fired per sentence.
- Whether a plain keyword matches both Chinese scripts is not documented
  (`platform-facts.md`): list every form of a name players type, including
  each regional translation of a canon name.
- A very short name that also occurs inside common words fires on ordinary
  prose; write it as a regular expression that excludes those words.
- When a canon card starts partway through its timeline, give each
  time-bound entry its canon time and say in the definition where the story
  stands, including which names are not known yet; otherwise models of every
  strength narrate later events as past. Where an entry withholds a spoiler,
  say what to write instead, since a bare ban invites invention.
- A canon card whose Lorebook holds only character sheets leaves the plot to
  the model's memory of the source, which drifts. Give the story the card
  plays at the detail a scene needs, keyed so each part arrives when the
  card's own events reach it; where the card departs from canon, give both
  and say which wins. Agent mode browses by name, so names carry canon time.
- Secondary keywords can veto a primary hit. Use them only when a common word
  needs a context guard.
- Constant entries are always included, in priority order, as long as they
  fit. A card whose constant entries do not fit the context tier is refused.
  Keep them few and short; most always-on rules belong in the definition. A
  long card restates its status-block protocol (keys, cadence, "end every
  reply with the block") in one short constant entry: that is a generation
  rule, and the display rule that draws the block never reaches the model
  (`state-economy-design.md`).
- Entries that did not match may still be admitted by semantic search within
  a budget. Never rely on that for a fact that must appear. Give it keywords
  or make it constant.
- Once admitted, an entry stays in place for later turns until the source is
  edited, deleted or reclaimed. A fact does not need re-triggering every turn.
- Long entries are split into ordered groups internally and admitted whole,
  but entry length is limited per card language (the numbers are not
  documented; read the validation warnings after push). Keep one entry per
  entity.

In agent mode the character can list, search and read entries by name and
content before replying. Name each entry by what it contains, such as "Harbor
curfew rule" or "Rival guild: what they want from the player". A name like
"Location 3" is invisible to that search.

A first entry set: one entry per active location, one per faction or major
node, one per important object or rule that is not always on, and constant
entries only for always-on facts that cannot live in the definition.

## Field targets and length

- Summary (`card.json`): player position, world rule and conflict in one
  sentence.
- Definition (`definition.md`): the packet without the Lorebook entries.
- Lorebook (`lorebook.json`): the entry set from the Lorebook plan.
- Opening (`welcome.md`): the moment the world rule creates a choice.
- Example conversations (`card.json` `talkExample`): examples beat rules for
  weak models: one ordinary-turn sample by default (`talk-example-design.md`).
- Presentation: state panels, maps or route choices only when they make the
  first action clearer.

Spend the definition budget in order: core rule and player position; state
that changes future turns; factions and locations that create choices; route
seeds and initiative; the opening slice; history only when it creates a route.
Move sometimes-needed detail into Lorebook entries before cutting it. Cut
first: calendars, genealogies, timelines, proper-noun lists, inactive
characters, repeated atmosphere. Read the limits from `tokenBudget.limits` in
`hearthroom card push --validate --json`.

## Checks

- The world rule creates choices and the player position is clear.
- Each faction and location has a play function; routes have costs and memory.
- The opening avoids a lore dump; the state is compact and updateable.
- Constant entries are few and short; entry names say what they contain.
- Every kept line passed the four questions; keywords are staggered.
- Agency guardrails: `agency-design.md`.
