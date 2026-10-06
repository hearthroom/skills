# Card Series Design

Use this reference when one character, setting or creator concept may become a
set of related cards. A series is useful only if each card makes a different
playable promise. Never split one good card into several weaker duplicates.

## Core rule

```text
shared core -> variant promise -> distinct loop -> separate opening -> test order
```

Two variants with the same player role, pressure, opening function and
long-play loop are one card: merge them. A variant that cannot name what the
player does differently is rejected or kept as private planning.

## Keep, merge, reject

Keep a variant with a distinct primary archetype or relationship mode, a
different first-screen affordance, a different long-play loop, route state,
artifact output or risk pattern, and a specific reason a player would open it
instead of the main card. Merge a variant that is only softer, darker, cuter,
seasonal or prettier, a low-intensity route that fits inside the main card, a
costume or mood change with the same consequence loop, or a helper that only
serves the author's planning. Reject a variant that steals the main card's
primary contract, breaks the shared core, turns into a vague advice bot, needs
too much copied lore, or exists only because it sounds marketable.

## Variant contracts

Each variant sets its own `type` in `card.json` from its primary contract.

- Main companion (`companion`): the recognizable relationship is the anchor.
  Opens on a private pressure moment where the character acts first; long-play
  through trust and friction, repair and rupture, distance and renewed
  closeness. Author it first; it defines the shared core.
- Daily-life variant (`companion`): only if quiet interaction has its own
  routine engine. Opens on one routine with one small disruption; long-play
  through a recurring object, place or hour that changes slowly; no forced
  intimacy. Merge into main if it cannot name a routine, a small desire and a
  progression signal. See `../../references/daily-life-design.md`.
- Story or event variant (`story`): one incident creates stakes the main card
  should not carry every session. Opens inside the incident; long-play through
  branch memory and aftermath; refusal, bargain and exit stay playable. Reject
  a costume swap or lore tour. See `../../references/scenario-design.md`.
- RPG or system variant (`game`): the concept genuinely needs rules,
  resources or stateful play. Opens on setup plus first crisis or a default
  start; state never decides feelings or consent. See
  `../../references/play-engine-design.md`.
- Generator or helper variant (`generator`): only if it produces a concrete
  artifact. Opens on minimal intake plus a default artifact path. Keep it
  public only if it plays as a card. See
  `../../references/generator-design.md`.

## Shared core discipline

Preserve across variants: identity and central desire, contradiction and
boundary, player leverage and relationship asymmetry, signature pressure
behaviour, refusal style, voice baseline and 2-3 motifs. Vary: the first scene,
player task, route state, risk level, pacing and boundary posture, visual
affordance, token allocation. Do not paste a series bible into every
definition. Turn the shared core into compact behaviour; let each variant carry
its own engine. Shared world facts can live in a Lorebook (`lorebook.json`)
copied between folders, with entries named by content so every variant recalls
them the same way.

Variants that reuse the same art share one media-library folder. Set
`media.folder` to the same series name in every variant's `card.json` before
the first push (`platform-facts.md`, Media library). Without it, each card
uploads its own copy under its own name. The first push into a folder this
card did not create stops if other files are there; setting `media.folder` to
the series name is how you share it on purpose. Replacing a shared file at the
same path updates every variant: that is how shared art is fixed, and how it
breaks by accident. Name variant files by what they show
(`art/bg/snowed-in-station.webp`), never by season, year or version. Each
variant's opening is a different situation, never the anchor card's opening
reworded.

## Authoring order

1. Shared character-core hand-off.
2. Series packet.
3. Main companion or primary anchor card.
4. One secondary variant with the clearest different contract.
5. Push, render and play the first two before adding more.
6. Event, RPG or generator variants only after overlap risk is resolved.

Stop after two variants if they feel redundant. Each variant is its own folder
and its own trial card, and keeps that folder for its whole life: iterate in
it with git rather than making a new folder per draft, which would create a
new library folder too. An account holds at most five trial cards and each
expires three days after its last push, so push in authoring order and use
`card push --create` for cards the author keeps.

## Regression checks

- Does each variant have a one-line reason to exist?
- Can the player tell which card to open from the summary alone?
- Does each opening prove a different contract and a different second-turn move?
- Does the shared core stay recognizable without copied biography?
- Are daily-life, event and generator variants kept only with distinct loops?
- Is the test order cost-aware: validate and render every variant, `play` only
  the ones whose behaviour changed (`playtest-loop.md`: 10–20 turns, a weak
  and a strong model, `--new-session`)?
- Does every variant set `media.folder` to the series name, and does each
  variant's opening start a different situation?
