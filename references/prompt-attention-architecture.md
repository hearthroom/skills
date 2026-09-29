# Prompt attention architecture

Use this reference when a definition is long enough that important rules start
being ignored: 5,000-10,000 character non-English definitions, plot-heavy
cards, cards with a strict reply shape, and cards that behave on one model but
drift on another.

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

## 4. Character Voice and Behavior
- Voice card:
- Pressure behavior:
- Relationship or faction behavior:
- Forbidden generic moves:

## 5. State and Output Contract
- Visible state (status line the reply must carry, if any):
- Hidden state (what the character tracks silently):
- Reply cadence (prose, then status, then choices):
- Fallback when the status line is omitted:

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

Optimize for the least forgiving model that still matters.

- Prefer short explicit bullets over implication-heavy prose.
- Use "must", "must not" and "when X, do Y" for hard rules.
- Avoid rules that require counting turns or scanning long history.
- Repeat stable labels exactly: `next-station hook`, `status line`, `choices`.
- Keep the middle modular so a weaker model can still recover the contract from
  the top and bottom.
- Leave CJK character buffer. Do not spend the last 200 characters on lore when
  state, progression or the output contract is still unclear.
- Test with more than one model: `hearthroom play --model` with a model from
  `hearthroom models`.

## Format dilution on weaker models

Separate behavioral rules (what story move to make, who owns direction, how
refusal works) from structural rules (keep the status line, keep the choices,
keep the reply shape). Primacy and recency anchors help behavioral rules; they
delay but do not cure structural drift.

Once a long emotional turn drops the reply shape, the model's own recent plain
replies become examples it copies. A later summary does not reset this. So for
weaker models reduce the structural contract before adding rules:

- keep required structure minimal and card-specific;
- treat the choices block as the fragile first-drop control and protect it as
  the action-path closure surface;
- prefer a visible status line over hidden-only state;
- do not demand a full status plus choices plus panel scaffold on every turn;
- define a minimum viable reply: under pressure, cut prose before structure and
  keep the current beat, the status line when the card uses one, and choices at
  decision points;
- test format stability over many turns, not two.

## Format exemplar

When the card needs a reply shape to survive weaker models, reserve a small
budget for one positive example. It is a tiny anchor, not another scene.

```text
[One current action or sensory beat.]
"[One in-character line that reacts to the player.]"
STATUS: phase::[phase];;risk::[risk]
1. [concrete player action]
2. [concrete player action]
3. [resist or redirect]
4. [ask or inspect]
```

A display rule in `rules.json` can turn the `STATUS:` line into a status bar and
the numbered list into buttons. The model only writes the text.

Rules for the exemplar:

- Keep it under about 150 words. If it is longer than the rule it teaches, it
  becomes competing content.
- Use placeholders so the model copies the shape, not a plot beat or an emotion.
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
- Treating structural rules as equally reachable as behavioral rules.
- A long dramatic sample used as the format exemplar.

## Verification

Before pushing or a long play test, check:

- the first 20 lines contain the highest-priority runtime rules;
- the middle holds reference material, not the only copy of a hard rule;
- the end repeats the brittle rules most likely to regress;
- a long-arc probe of several turns through `hearthroom play` includes
  passive, chaotic and oppositional player behavior;
- a format probe runs many turns, not two, when a status line or choices
  matter;
- at least one probe uses a model that is not the strongest instruction
  follower available.
