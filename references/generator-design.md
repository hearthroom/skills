# Generator Design

Use this reference when a card's primary promise is to help the player create a
usable artifact: ritual, contract, poem, outfit, scene prompt, quest hook, menu,
spell, letter, itinerary or another structured output. Such cards set `type`
to `generator` in `card.json`. A generator card is not a general advice
assistant. It turns brief input into a finished artifact and then supports
focused revision.

## Core rule

```text
input or defaults -> artifact schema -> finished artifact -> named revisions -> reusable follow-up
```

The card may ask questions, but only enough to make the next artifact better.
Given minimal input, it proceeds with defaults and returns one usable artifact
instead of waiting.

## Boundary

Route to `../../references/play-engine-design.md` when the main promise is
stats, resources, combat or simulator state; to
`../../references/scenario-design.md` for a branchable incident; to
`../../references/relationship-engine.md` for relationship, comfort or
slow-burn intimacy. When the generator is a small overlay inside a companion,
story or world card, keep it as an in-world artifact mode and use
`../../references/archetype-contracts.md`.

## Artifact contract

Define the artifact before writing prose: its type, its audience (in-world or
out), its utility (what it helps the player do next), its stable sections, its
quality bar (usable rather than decorative) and its forbidden drift
(advice-only reply, endless intake, lore dump, unrelated scene).

A strong artifact has internal decisions. A festival ritual, for example, might
carry purpose, symbols, steps, public conflict, private cost, scene hook and a
revision handle. Match sections to the artifact type; never reuse a generic
template.

## Intake with defaults

Ask only for inputs that change the artifact: target mood or purpose, setting
constraints, audience, material limits, tone or rating boundary, desired format
or length. Default everything else. One sentence of input yields an artifact
plus a short assumptions line. No input yields 2-3 quick presets and a
default-start option.

Avoid five or more setup questions before producing, requiring the player to
know the schema, making the player choose every section, and treating missing
input as permission to stall. When the intake is a visible console, read
`../../references/system-intake-card-design.md`.

## Output schema

The schema is the card's promise. Put it in `outputContract` in `card.json` so
every reply follows the same shape, within the limit that
`card push --validate --json` reports under `tokenBudget.limits`. Use 4-8
sections, each adding utility, action, constraint, conflict or replay value,
with names specific to the artifact type, prose compact enough to revise, and
one field that turns easily into a scene, hook or next artifact.

## Revision operations

Named revisions make the card usable across turns: expand (add detail, keep
the schema), compress (shorten, keep the use), darken or soften (change tone
within the rating boundary), localize (adapt to a place, faction or audience),
add-conflict (add a playable obstacle or cost), make-diegetic (turn the output
into an in-world document, speech or item), split (variants with clear
trade-offs), continue (turn the previous artifact into the next one).

Each operation states what it preserves. Revisions never silently erase the
player's constraints or the previous artifact.

## Diegetic mode

Some generators are plain helpers. Others are in-world creators: scribe,
oracle, mechanic, tailor, broker, ritualist, archivist, menu keeper. If
diegetic, define why the character can produce the artifact, what personality
colors the output, what they refuse or warn about, and how they stay in
character while still producing usable sections. Flavor never hides the
artifact.

## Opening contract

The opening starts production quickly: one sentence naming what the card makes,
2-4 intake fields or choices that matter, a default-start option, one example
preset, and a promise that the next reply produces one finished artifact.
Choices can be `prologue` lines in `card.json` or `hc-*` controls in the
opening. A bare "What would you like to create?" is not an opening.

## Field allocation

- summary (`card.json`): the artifact and the collaboration loop in one
  promise.
- `definition.md`: intake rules, defaults, revision operations, quality rubric,
  constraint handling, diegetic behavior.
- `outputContract` (`card.json`): the section schema and formatting rules.
- `welcome.md`: minimal intake and defaults, not a manual.
- `talkExample` (`card.json`): only when it teaches the schema or a revision.
- `lorebook.json`: reference material the artifact draws on (symbol tables,
  place names, house styles) as named entries.
- presentation: `hc-form` or `hc-choices` controls only when they make intake
  clearer.

## Play probes

Run each as one turn of `hearthroom play <dir> -m "…" --allow-spend --json`:

- "Make one with these constraints and choose sensible defaults."
- "I only give one vague line; produce the artifact anyway."
- "Revise the previous artifact darker, same sections."
- "Turn the previous artifact into a scene prompt."
- "I ask for something outside the card's rating or constraints."

Patch the card if it asks another generic question, gives advice without an
artifact, forgets the previous artifact, changes shape between turns, lets a
revision erase constraints, or breaks the creator voice.
