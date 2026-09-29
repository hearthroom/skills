# Token economy

Use this reference when a card spends context in the wrong file, repeats lore,
bloats the opening, hides durable rules in markup, or needs a keep / move / cut /
rewrite plan before render or play.

## Core rule

Tokens are attention budget, not a length target. Spend them where they change
future behavior:

```text
promise -> durable engine -> playable opening -> compact state -> optional style
```

If the first screen is doing the work of the whole card, repair allocation
before polishing prose.

## Attention dilution

Long prompts weaken instruction-following because critical rules compete with
lore, examples and style notes. Front-load the most important behavior: a 5-7
item every-turn block near the top of the definition, before world history or
long voice notes. For the full long-prompt structure read
`prompt-attention-architecture.md`.

Limits are character counts, not tokens. The English column applies only when
the card's `language` is exactly `en`; every other language uses the smaller
column. CJK text reaches the definition limit quickly, so leave buffer for
final edits instead of writing to the last character. Read the real numbers
from `tokenBudget.limits` in `card validate --json`.

## Where content belongs on Hearthroom

| Content | Home | Why |
|---|---|---|
| durable identity, engine, voice, boundaries, proactive rules | `definition.md` | always in the prompt |
| background facts needed only in some scenes | `lorebook.json` entries with keywords | admitted only when triggered; costs nothing otherwise |
| facts that must always be present | a few short constant entries, or the definition | constant entries are always included while they fit |
| the reply shape the model must keep | `card.json` `outputContract` | one short contract instead of format prose everywhere |
| one replaced default instruction block | `card.json` `customInstructions` | short; not the whole system prompt |
| layout, status bars, buttons | `rules.json` display rules | the model writes plain values; the page draws the rest |
| first playable scene | `welcome.md` | the only place that must be read before the first reply |
| player-side first lines | `card.json` `prologue` | reply paths without lengthening the opening |
| voice or format samples | `card.json` `talkExample` | only when cheaper than rules |

Display rules are the largest saving available: reusable visual structure moves
into `find` / `replace` rules, so the model emits only the text and values the
rules need. Name Lorebook entries by their content so an agent-mode character
can find them.

## Token architecture packet

```text
Token architecture packet:
- current failure:
- archetype:
- budget signal (per-field counts vs limits):
- target allocation:
- field triage:
- keep / move / cut / rewrite:
- compression ladder:
- visual budget:
- state budget:
- example budget:
- Lorebook moves:
- patch order:
- rerun checks:
- hand-off:
```

## Reading the validation report

`card validate --json` returns `tokenBudget` with per-field character counts
and `limits`. Use it as a structural diagnostic, not a taste judgment.

- Summary: public promise on the board card. Judge it by scannability.
- Definition: the durable engine. Too short usually means drift after the first
  turn.
- Opening: the play layer. Too long usually means it carries lore, rules or
  repeated monologue.
- An opening longer than the definition, or more than twice its length, is a
  strong sign that durable content should move into the definition.
- Counts compare revisions. They are not a billing statement.

## Field targets

Starting points, not rules. Preserve playability before hitting a number.
Ranges are characters; the first figure is for non-English cards, the second
for `en`.

| Archetype | summary | definition | opening |
|---|---:|---:|---:|
| Companion / relationship | 80-260 | 2,000-5,000 / 6,000-15,000 | 250-700 |
| Daily-life | 80-220 | 1,800-4,500 / 5,000-12,000 | 200-600 |
| Story / mystery / scenario | 120-260 | 4,000-8,000 / 10,000-25,000 | 600-1,200 |
| Ensemble | 140-300 | 5,000-10,000 / 12,000-30,000 | 700-1,400 |
| Game / system / sandbox | 180-500 | 7,000-10,000 / 18,000-50,000 | 900-2,000 |
| Generator / assistant | 180-500 | 5,000-10,000 / 12,000-35,000 | 700-1,600 |

A draft is a thin-detail candidate when it uses less than about a third of the
useful definition room while still missing durable behavior, route cost, state,
voice, boundary handling or return-later memory. A full-detail candidate is not
padded prose. Its length buys identity, motive, current pressure, relationship
rules, world functions, proactive moves, voice, emotional reactions, longplay
hooks, time and consequence, secrets, player insertion space, agency boundaries
and format stability. Fill until the next section would not improve later
turns, then stop.

Reserve a small structural budget for the format exemplar and the minimum
viable reply when the card depends on a reply shape. Cut decorative prose
before cutting that structure.

## Field triage

| Field | Keep | Move | Cut | Rewrite |
|---|---|---|---|---|
| summary | player role, situation, tension | rules, lore names | mood stacks, duplicate clauses | one scannable promise |
| definition | durable engine, voice, boundaries, state rules | hidden opening rules; sometimes-needed lore to Lorebook | trivia, ornamental lists | compact labeled sections |
| opening | place and time, role action, pressure, player implication, reply paths | lore, rules, route logic | duplicated monologues, long panels | one playable scene |
| HTML in opening or replies | components that show state, action or route | reusable styling to display rules | decoration with no action value | plain text first, `hc-*` only when it earns its place |
| Lorebook | facts with clear triggers | always-needed facts to the definition | entries nothing triggers | descriptive names, short content |
| example conversations | small pressure samples when voice drifts | repeated monologue | samples that teach nothing | 2-4 micro-samples tied to behavior |

## Compression ladder

1. Delete exact duplicates and repeated monologues.
2. Remove decorative panels that reveal no state, action, route or usable mood.
3. Move durable rules from the opening into the definition.
4. Move sometimes-needed lore into keyword Lorebook entries.
5. Convert remaining lore into play functions: clue, cost, access, route,
   state, boundary, voice or player leverage.
6. Replace mood-label choices with consequence choices.
7. Compress the summary into one promise sentence.
8. Rebuild the opening from the five beats instead of shrinking a bad screen.
9. Add compact state only for values that change future replies.
10. Preserve pressure behavior before preserving decoration.
11. Re-run self-review, then `card push --validate --json`, then render or
    play only when the draft is worth testing.

## Visual budget

Visual structure earns tokens only when it clarifies what the player can do
now, what state changed, which route or mode is active, or what mood or risk
frames the scene. Put reusable style into display rules and let the model emit
only the current beat, changed values, consequences and next actions. Check the
result with `hearthroom card render --json`: `report.components` lists what the
opening uses, and per-rule statuses show which rules actually fire.

## Self-review

- Does each long section change future behavior, state, voice or route?
- Is the opening a playable scene, and can the definition sustain turn two?
- Did compression keep desire, contradiction, boundary, leverage, voice, route
  costs and consequence?
- Did reusable visual structure move into display rules, and do examples still
  teach behavior?
