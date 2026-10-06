# Prompt attention architecture

Use this reference for any definition: primacy and recency matter at every
length, and the damage shows first in long non-English definitions, plot-heavy
cards, cards with a strict reply shape, and cards that behave on one model but
drift on another. This file owns the definition's order (iron laws at the
top, final recency checklist at the end, the two in agreement); other files
point here.

Markdown headings, semantic tags and repeated anchors make a prompt easier to
parse and retrieve from. They do not guarantee attention. Treat them as
structure for instruction-following, not as magic.

## Basis

- Information near the beginning and the end of a long prompt is used more
  reliably than information buried in the middle.
- Explicit structure improves parsing.
- A small example teaches output shape better than abstract rules, but it
  costs context and can teach unintended content.
- Keeping a format is a separate capability from writing well. Weaker models
  lose it first.

So put runtime-critical instructions where the model will see them, make
boundaries obvious, and test across turns and models.

## Core standard

Draft long definitions with Markdown headings. The top of the definition is a
compact control plane, not lore.

1. Start with a 5-7 item `Every-Turn Iron Laws` block.
2. Put the `Card Contract` immediately after it.
3. Write hard runtime rules as short imperative bullets.
4. Use stable headings, and tags only where Markdown cannot separate engine,
   state, output, examples and reference material.
5. Put lore, history, mood references and extended examples in the middle. The
   middle is reference material, never the only home of a hard rule.
6. Repeat critical constraints early and late.
7. End with a `Final Recency Checklist` that restates the few rules most likely
   to regress in chat.

Do not write a 9,000-character prose wall and hope the model infers priority
from literary emphasis. A model-to-model difference is a prompt architecture
signal, not only a model quality issue.

## Definition template

Use when the definition is large, strict, plot-driven or cross-model fragile.

```markdown
# Role Runtime Contract

## 0. Every-Turn Iron Laws
- [5-7 must-do rules only.]
- [Include narrative progression, agency boundary, reply-shape contract, and
  one card-specific safety or format rule.]

## 1. Card Contract
- Player role:
- Main pressure:
- External goal:
- Opposing force:
- Story direction owner:

## 2. Player Agency Boundary
- What the character may decide:
- What the character must never decide for the player:
- How refusal, resistance, silence and chaos stay playable:

## 3. Narrative Progression Engine
- Inciting incident:
- Every-turn next-station hook:
- Passive-player move:
- Stalled-scene repair:
- Route seeds:

## 4. Character Voice and Behaviour
- Voice card:
- Pressure behaviour:
- Relationship or faction behaviour:
- What they do instead of the generic move:

## 5. State and Output Contract
- Visible state (the `[status]` block the reply ends with, if any; keys and allowed values live in the output contract):
- Hidden state (what the character tracks silently):
- Reply cadence (prose, then the block, then choices):
- Fallback when the block is omitted:

## 6. World / Scene Reservoir
- Locations:
- Objects:
- People and factions:
- Clues, obligations, deadlines:

## 7. Reference Material
- Backstory:
- Tone references:
- Optional examples:

## Final Recency Checklist
- [Restate the 3-5 most brittle hard rules.]
```

The iron laws and the recency checklist must agree. If they contradict, the
recency anchor fights the primacy anchor and the prompt is worse than before.

Facts needed only in some scenes belong in Lorebook entries with keywords, not
in section 6. The definition keeps what must always be present.

## Summary standard

The summary is a public promise, not a runtime engine. Compress a long raw
description into working notes first:

```markdown
## Public Promise
## Player Position
## First-Screen Proof
## Tags / Discovery Hints
```

Then finalize the summary as one scannable promise. Never hide runtime rules in
it.

## Tag and heading rules

- Headings for major modules: `## Narrative Progression Engine`,
  `## State and Output Contract`, `## Voice`, `## Reference Material`.
- Tags only where they clarify a boundary Markdown cannot: `<instructions>`,
  `<state_contract>`, `<example>`, `<reference>`. Keep names descriptive and
  consistent. Never wrap the whole card in one tag.
- Keep examples under an examples heading or `<example>` tag so the model does
  not confuse sample text with the current scene.

## Cross-model compatibility

Structural rules (keep the block, keep the choices, keep the reply shape) are
short imperative bullets, tested on a weak model. Behaviour and voice are
prose with reasons, tested on a strong model; a strong model generalises
from the reason, and a card flattened into must/must-not bullets loses its
voice. Both models in every playtest round (`playtest-loop.md`).

- Avoid rules that require counting turns or scanning long history.
- Repeat stable labels exactly: `next-station hook`, `[status]`, `[choices]`.
- Keep the middle modular so a weaker model can still recover the contract from
  the top and bottom.
- Keep at least about 500 characters free under each non-English limit; a
  field at its limit cannot take the next repair.
- Every packet names which of its rules joins the iron laws and the matching
  line in the final recency checklist.

## Format dilution on weaker models

Separate behavioural rules (what story move to make, who owns direction, how
refusal works) from structural rules (keep the status line, keep the choices,
keep the reply shape). Primacy and recency anchors help behavioural rules; they
delay but do not cure structural drift.

Once a long emotional turn drops the reply shape, the model's own recent plain
replies become examples it copies. A later summary does not reset this. So for
weaker models reduce the structural contract before adding rules:

- keep required structure minimal and card-specific;
- treat the choices block as the fragile first-drop control and protect it as
  the action-path closure surface;
- prefer a visible status block over hidden-only state;
- do not demand a full status plus choices plus panel scaffold on every turn;
- define a minimum viable reply: under pressure, cut prose before structure and
  keep the current beat, the status block when the card uses one, and choices
  at decision points;
- test format stability over 10–20 turns on a weak model, not two.

## Format exemplar

When the card needs a reply shape to survive weaker models, reserve a small
budget for one positive example of an unremarkable turn, with concrete
values. Examples beat rules for weak models: they copy the example every
turn, so the example must show the ordinary turn, never a climax, and never
placeholders (a weak model emits a literal `[phase]`). The canonical block and
its home are in `state-economy-design.md`.

```text
She slides the lamp across the table without looking up. "The keeper left
this. You can read it or you can leave."

[status]
hp: 72/100
mood: wary
location: Harbor > North pier
[/status]

[choices]
- Read the logbook
- Ask about the keeper
[/choices]
```

A display rule in `rules.json` draws the `[status]` block as a panel and the
`[choices]` block as buttons (`sandbox-kit.md`); the model only writes the
text. Render rules are not generation rules: the keys, their allowed values,
the cadence and the instruction to end every reply with the block live in
the output contract or the definition, and the block appears in the opening.

Rules for the exemplar:

- Keep it under about 150 words. If it is longer than the rule it teaches, it
  becomes competing content.
- Label it as an example of an ordinary turn.
- Show only required controls. A heavy example is copied for a few turns and
  then collapses.
- Put it in the output contract (`card.json` `outputContract`) or next to the
  state and output section, before long reference material. Repeat only the
  skeleton name in the recency checklist.
- Add one recovery sentence: do not imitate a previous malformed reply; each
  turn regenerates from the skeleton.
- Avoid code fences around it when the card forbids Markdown fences in replies.

## Anti-patterns

- Hard rules buried after lore, or a definition wall with no headings.
- A final paragraph that introduces rules absent from the top, or early and
  late instructions that contradict.
- A generic formatting manual pasted in place of the card-specific contract.
- Treating structural rules as equally reachable as behavioural rules.
- A long dramatic sample used as the format exemplar.

## Verification

Before pushing or a long play test, check:

- the first 20 lines contain the highest-priority runtime rules;
- the middle holds reference material, not the only copy of a hard rule;
- the end repeats the brittle rules most likely to regress;
- a long-arc probe of 10–20 turns through `hearthroom play --new-session`
  includes passive, chaotic and oppositional player behaviour;
- a format probe runs on a weak model when a status block or choices matter,
  and the same probes run on a strong model for emergence
  (`playtest-loop.md`).
