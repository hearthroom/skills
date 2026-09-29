# Quality rubric

Use this rubric to decide whether a card is usable, needs more iteration, or is
ready for the author to submit for review. It is a pass/fail checklist for the
agent's own writing review. For scoring, tiers and first-three repairs use
`quality-scorecard.md`. For writing guidance use
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
  player leverage and behavior under pressure.
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
  behavior, a second-turn change and a return-next-time hook.
- RPG, adventure, survival, sandbox or simulator cards have a play engine:
  compact state, resource rules, quest and risk routes, turn protocol,
  failure-forward behavior and state-update probes, not decorative stats or a
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
  proactive turn behavior, speaking style, boundaries, longplay hooks, time and
  consequence, secret pacing, player insertion space and format stability.
- The character can respond consistently without hidden assumptions.
- A card derived from source material has converted it into playable rules,
  state, voice, routes and first-scene pressure, not copied or summarized it.
- All fields share the author's target language and script. A zh-Hant card
  contains no Simplified Chinese terms.
- Rating and interaction boundaries are legible. Mature, intense or sensitive
  premises define refusal, pacing and stop conditions and preserve player
  agency.

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
- The character is recognizable from behavior: rhythm, choices, refusals and
  emotional tells, not name or lore.
- Ensemble speakers stay distinguishable under pressure; a blind-line check does
  not collapse the cast into one narrator.
- Token spend is purposeful. Long sections create durable behavior, state,
  style or replayable routes, or they get compressed.

## Self-review

Run this checklist before pushing a draft. Each line names the failure and the
repair; the owning reference has the method.

- Promise unclear: clarify premise, player relationship and tension
  (`profile-packaging.md`).
- Attractive but inert premise: build the tension triangle before touching the
  opening (`tension-triangle.md`).
- Unclear or decorative state: keep only fields that change future play, with
  visibility and update rules (`state-economy-design.md`).
- Coherent engine but the profile does not explain the reason to open: package
  name, summary and tags (`profile-packaging.md`).
- Thin definition: add identity, motive, current pressure, relationship rules,
  proactive behavior, voice, longplay hooks, secrets, player insertion space
  and format stability (`role-detail-engine.md`).
- Several symptoms at once: diagnose before rewriting (`card-diagnosis.md`).
- Trope-only character: replace labels such as cold, mysterious or secretly
  soft with behavior under pressure, cost, player leverage and a boundary
  (`character-core-design.md`).
- Backstory without present pressure: convert history into what starts now,
  what the player can affect and what the character risks losing.
- Player has no leverage: give the player knowledge, access, trust, a resource,
  an interpretation, a boundary or change authority that alters the next turn.
- Generic relationship loop (every reply becomes flirting, comfort or apology):
  add asymmetry, closeness/friction state, pacing gates, repair and distance
  routes, passive-player behavior (`relationship-engine.md`).
- Flat daily-life loop: add a tiny disruption, shared object, habit state,
  non-forced romance posture and reply paths that change the next routine
  (`daily-life-design.md`).
- Lore-heavy world with no engine: every faction, place, rule and resource must
  change access, behavior, risk, route, cost or pressure
  (`world-engine-design.md`).
- Game-like card with no runnable engine: every stat, item, quest and rule must
  affect choices, visible state, cost, reward or failure-forward consequence
  (`play-engine-design.md`).
- Generator with no artifact engine: accept sparse input, choose defaults,
  produce a finished artifact in a stable schema, remember its version, support
  named revisions (`generator-design.md`).
- Missing speaking style, or "natural", "gentle", "like a real person": add
  sentence length, vocabulary, address terms, emotional tells and forbidden
  phrasing (`voice-calibration.md`).
- Catchphrase-only voice: define how the phrase changes under trust,
  resistance, pressure and boundary-setting, or cut it.
- Blurred ensemble voice: contrast by motive, pressure behavior, rhythm and
  vocabulary, one micro-sample per weak speaker (`ensemble-card-design.md`).
- Cast crowds out the player: cap active speakers per turn; speaker conflict
  must return pressure to the player as a choice, clue, cost or route.
- Missing consequence or state: define what choices change in trust, risk,
  location, resources, routes or relationship.
- Missing initiative: define what the character asks, reveals, escalates or
  offers when the player is passive.
- Dead third turn: define continuity spine, route costs, memory threads and
  passive-player behavior before adding lore (`longplay-design.md`).
- Failure dead-ends: add failure-forward outcomes such as a wound, debt, lost
  time, suspicion, blocked shortcut, partial clue or forced bargain.
- Hollow or generic opening ("Hello, I am X, what do you want to do?"): add
  place, time, sensory cue, character beat, pressure, player implication and a
  specific reply path (`opening-design.md`).
- Missing second-turn move: write one likely first player message and how the
  character reacts, complicates, reveals, updates state or renews pressure.
- Agency takeover: remove anything that narrates the player's decisions,
  feelings, consent or commitments (`agency-design.md`).
- Decorative choices or route funneling: choices must change information,
  access, relationship, risk, state or the character's next move.
- Any reviewed reply with no next move: the card fails action-path closure
  even when later turns pass; patch definition and opening.
- Boundary-sensitive premise with no packet: define explicitness ceiling,
  allowed pressure tools, escalation gates, slowdown signals, stop conditions
  and safer fallback before writing the opening (`boundary-design.md`).
- Mixed scripts, drifting pronouns or register between fields: run a
  language-style pass (`language-style.md`).
- Opening carries lore, durable rules or repeated monologue while the
  definition cannot sustain play after turn one: move the engine to the
  definition and rebuild the opening (`token-economy.md`).
- Source dump in the definition: rewrite as a source-to-play map: player role,
  first-scene pressure, durable rules, compact state, route seeds
  (`material-distillation.md`).
- Card type unclear or mixed: settle the primary contract before blueprinting
  (`archetype-contracts.md`).

## Token budget review

Read `tokenBudget` from `card validate --json` before rendering or playing:

- If the opening count is much higher than the definition count, move durable
  rules, reusable lore and layout scaffolding into the definition or display
  rules.
- A short definition with a long opening usually plays well for one turn and
  then drifts.
- If the total is large, keep only material that changes behavior, state or
  agency.
- `tokenBudget.limits` are ceilings, not targets.

## Opening quality

- The opening creates an immediate interaction opportunity.
- The player has a clear way to respond on turn one.
- The expected second-turn move changes relationship, risk, route, state,
  information or practical pressure.
- The opening does not dump the world bible.
- Game cards expose setup or choices without burying the first action in a
  manual.
- Layout in the opening uses `hc-*` components or plain text. Reusable layout
  belongs in display rules, not repeated in every opening.

## Render quality

From `card render --json`:

- No rule is `rolled_back`. Fix the reason before anything else.
- `unsupported` is empty. If it lists sandbox author-API identifiers on a
  `classic` card, set `pageMode` to `sandbox` and render again.
- The static scan's `scripts`, `inlineHandlers`, `externalUrls` and
  `crossLineRules` contain only what the author intends.
- On the play page: no overflow, clipped text, invisible text or unreadable
  contrast, on both a narrow and a wide viewport.
- Layout supports the card mood without making the page one-note.

## Playtest quality

Probe design and transcript triage are in `playtest-loop.md`.

- The character stays in character across realistic player turns.
- The first reply advances the scene instead of restating the profile.
- Every reviewed reply leaves the player a concrete next move.
- Continuation probes show changed state, route pressure, memory callback or a
  renewed hook.
- Replies reflect player agency and create consequence.
- Tone matches the rating intent.
- No system leak, moderation artifact or broken format.
- Lorebook facts the card depends on were reachable both by keywords and, in
  agent mode, by entry name and content.
- The turns run, and the credits spent when the output reports them, are
  recorded in the summary.

## Publish readiness

Ready means all of these are true:

- `card validate --json` reports no blockers.
- `card render --json` reports no rolled-back rules and no unsupported
  identifiers, and the play page was reviewed or the author accepted the risk.
- A playtest was run, or the author skipped it knowing it is the closest real
  behavior check.
- The author explicitly asked for `card push --create`.
- The author submits for review on the site themselves.
