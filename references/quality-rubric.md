# Quality rubric

Use this rubric to decide whether a card is usable, needs more iteration, or is
ready for the author to submit for review. It is a pass/fail checklist for the
agent's own writing review. For scoring, tiers and the first repairs use
`quality-scorecard.md`; for the repair order when symptoms stack use
`card-diagnosis.md`; for writing guidance use
`role-card-writing-framework.md`.

The rubric is craft guidance. `card validate` enforces technical limits; this
file judges whether the card is worth playing.

## Card quality

- The card has a clear premise, relationship dynamic and first playable scene.
- One primary archetype contract drives the card. Overlays support the promise
  instead of competing with it.
- The public profile is scannable and specific: name, summary, tags and the
  opening agree on who the player is, what pressure starts play and why the
  card is worth opening.
- The premise has a tension triangle: character desire, player leverage,
  external pressure, why-now, and a consequence if the player does nothing.
- The character core is visible in play: desire, contradiction, boundary,
  player leverage and behaviour under pressure.
- Relationship-heavy cards have a relationship engine: promise, asymmetry,
  closeness/friction state, pacing gates, repair and rupture routes, and agency
  boundaries that change play without forcing intimacy.
- If the card has a setting, its world rule creates choices, consequences,
  compact state, route seeds and faction pressure, not only lore.
- Story, mystery, investigation, event, rescue, trial or drama cards have a
  scenario engine: stakes, route branches, clue and reveal pacing, false-lead
  handling, compact consequence state and route-funnel guardrails.
- Daily-life cards have a daily-life engine: ordinary routine, small playable
  desire, tiny disruption, shared object or place, habit state, passive-player
  behaviour, a second-turn change and a return-next-time hook.
- RPG, adventure, survival, sandbox or simulator cards have a play engine:
  compact state, resource rules, quest and risk routes, turn protocol,
  failure-forward behaviour and state-update probes, not decorative stats or a
  rule manual.
- Generator or helper cards have a generator engine: an artifact contract,
  intake defaults, stable output schema, named revision operations, artifact
  memory, and one usable artifact from minimal input.
- The play loop repeats: hook, agency, consequence, memory, progression,
  renewed hook.
- Plot-driven cards have macro-progression: inciting incident, visible route
  pressure, next-station hooks, and location, route, relationship, risk, clue,
  access or obligation that changes across a long arc.
- The summary is one scannable sentence that sets expectations.
- The definition carries a detail engine: stable identity, backstory turned
  into motive, current pressure, relationship rules, world or play functions,
  proactive turn behaviour, speaking style, boundaries, longplay hooks, time
  and consequence, secret pacing, player insertion space and format stability.
- The character can respond consistently without hidden assumptions.
- A card derived from source material has converted it into playable rules,
  state, voice, routes and first-scene pressure, not copied or summarised it.
- All fields share the author's target language and script. A zh-Hant card
  contains no Simplified Chinese terms.
- Rating and interaction boundaries are legible. Mature, intense or sensitive
  premises define refusal, pacing and stop conditions and preserve player
  agency.
- The card declares `uiRole: assist` (the replies read well with every display
  rule disabled) or `uiRole: core` (each UI mechanic changes a choice or
  consequence, is legible in the reply text and degrades to text) in its
  `README.md` (`presentation-design.md`).
- The definition's iron rules and its final recency checklist agree, the
  format rules sit in both, and every non-English field keeps a buffer of
  about 500 characters under `tokenBudget.limits`
  (`prompt-attention-architecture.md`).

## Top-card standard

A top-card candidate passes these harder checks:

- The second turn is better than the first: the character escalates, reveals,
  complicates or offers a route without waiting for the player to write the
  plot.
- The primary archetype is visible on the first screen and still supported by
  the definition.
- Story cards reveal one new clue, cost, pressure or contradiction on the
  second turn without forcing the player's conclusion.
- Daily-life cards make one small visible change on the second turn because of
  the player's first move.
- The opening has a concrete packet: beats, reply paths, expected first player
  message, second-turn move and visible change.
- The longplay engine has a continuity spine, compact state, route costs,
  memory threads, character initiative and continuation probes.
- Game-like cards run one clean turn: resolve the action, update state, apply
  cost or reward, offer the next route, never play the player.
- The character is recognisable from behaviour: rhythm, choices, refusals and
  emotional tells, not name or lore.
- Ensemble speakers stay distinguishable under pressure; a blind-line check does
  not collapse the cast into one narrator.
- Token spend is purposeful. Long sections create durable behaviour, state,
  style or replayable routes, or they get compressed.

## Pre-push gates

Run these before pushing a draft. For several symptoms at once, use the
symptom map in `card-diagnosis.md` rather than guessing an order.

1. `node <toolkit>/scripts/check-card.mjs <dir>` reports no errors; every
   warning was read.
2. The promise is clear from name, summary and the first screen; the opening
   pays off what the summary sold (`profile-packaging.md`,
   `opening-design.md`).
3. The durable engine lives in the definition, not in the opening; the
   opening is one playable first screen (`token-economy.md`).
4. The player has leverage and the card never decides the player's feelings,
   consent, actions or route (`agency-design.md`).
5. Voice is written as rhythm, vocabulary, address terms, tells and one
   ordinary-turn sample, not as a list of banned phrases
   (`voice-calibration.md`, `talk-example-design.md`).
6. State is compact, agency-safe and worth showing; the status contract and
   its first block are where `state-economy-design.md` puts them.
7. Boundary-sensitive premises have a ceiling, pacing, refusal and stop
   conditions before the opening is written (`boundary-design.md`).
8. One language and script across every field (`language-style.md`).

## Token budget review

Read `tokenBudget` from `card validate --json` before rendering or playing:

- Read `welcomeToDetailRatio`: when the opening outweighs the definition, move
  durable rules, reusable lore and layout scaffolding into the definition or
  display rules.
- A short definition with a long opening usually plays well for one turn and
  then drifts.
- If the total is large, keep only material that changes behaviour, state or
  agency.
- `tokenBudget.limits` are ceilings, not targets. Non-English fields keep a
  buffer of about 500 characters below them; a field at its limit cannot
  take the next repair.

## Opening quality

- The opening creates an immediate interaction opportunity.
- The player has a clear way to respond on turn one, and free text always
  works.
- The expected second-turn move changes relationship, risk, route, state,
  information or practical pressure, and is better than turn one.
- The opening does not dump the world bible.
- Game cards expose setup or choices without burying the first action in a
  manual.
- Layout in the opening uses plain HTML or plain text. Reusable layout
  belongs in display rules, not repeated in every opening.

## Render quality

From `check-card.mjs` and `card render --json`:

- `check-card.mjs` reports no errors; no rule is `rolled_back`. Fix the
  reason before anything else.
- `unsupported` is empty. If it lists sandbox author-API identifiers on a
  `classic` card, set `pageMode` to `sandbox` and render again.
- The static scan's `scripts`, `inlineHandlers`, `externalUrls` and
  `crossLineRules` contain only what the author intends.
- Accept on screenshots from the offline preview or the play page, not on
  DOM counts: one status panel per bubble, none in the function bar; no
  overflow, clipped text, invisible text or unreadable contrast, on a narrow
  and a wide viewport. Check dark, and light too when `cardFormat` is
  `tavern` (the facts sheet: an `mmd` card is locked to dark).
- The offline preview and an emulated viewport are simulation; say "verified
  in simulation" until a tester has checked a device.
- Layout supports the card mood without making the page one-note.

## Playtest quality

Probe design, the two-model standard and transcript triage are in
`playtest-loop.md`: 10–20 turns per run, covering compliance, off-script,
passive, meta (an out-of-character question) and ending/goodbye probes, on a
weak model (the format floor: the status block, the choices and the voice
are intact at the last turn) and a strong model (emergence), each run started
with `--new-session`. One run is not evidence of improvement; compare with
the previous version on the same probes and models.

- The character stays in character across realistic player turns.
- The first reply advances the scene instead of restating the profile.
- Every reviewed reply leaves the player a concrete next move or a reason to
  make one.
- Continuation probes show changed state, route pressure, memory callback or a
  renewed hook; turn two is better than turn one.
- Replies reflect player agency and create consequence.
- Tone matches the rating intent.
- No system leak, moderation artifact or broken format.
- Lorebook facts the card depends on were reachable both by keywords and, in
  agent mode, by entry name and content.
- The turns run, and the credits spent when the output reports them, are
  recorded in the summary.

## Publish readiness

Ready means all of these are true:

- `check-card.mjs` reports no errors and `card validate --json` reports no
  blockers.
- `card render --json` for every opening reports no rolled-back rules and no
  unsupported identifiers, and the screen was judged from screenshots of the
  offline preview or the play page; device behaviour is reported as
  "verified in simulation" unless a tester checked it on a device.
- A playtest was run to the standard above, or the author skipped it knowing
  it is the closest real behaviour check.
- `uiRole` is declared and its test passed (assist: readable with rules off;
  core: mechanics legible in text and degrading to text).
- The author explicitly asked for `card push --create`.
- The author submits for review on the site themselves.
