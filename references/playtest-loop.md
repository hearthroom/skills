# Playtest loop

Use this reference to test whether a card can sustain a real conversation. A
playtest is not a pass/fail command. It is the loop that turns a polished draft
into a character that reacts, remembers, creates pressure and preserves player
agency.

Platform facts (commands, flags, costs) are in `platform-facts.md`. The
matching skill is `hearthroom-chat-simulation`. This file owns the playtest
standard; other files point here.

## The standard

A probe is a conversation, not a reply. Run each probe set as a 10–20-turn
conversation on a weak model (the format floor: the status block, the
choices and the voice are intact at the last turn) and on a strong model
(emergence: turn two is better than turn one, something accumulates, the
world reacts), chosen with `hearthroom play --model` from `hearthroom models`.
Every independent probe set and every retest starts with
`hearthroom play <dir> --new-session` (an alternate opening needs
`--new-session --greeting N`; without it the turns pile into the old
conversation and `--greeting` does nothing). Cover compliance, off-script,
passive, meta (an out-of-character question) and ending/goodbye. Fix one
shortcoming per version; before a paid retest run the pre-check
(`check-card.mjs`, `card push --validate`, `card render`, the offline preview
with the failing reply in `preview/replies.md`); rerun the same probes on the
same models and compare with the previous version layer by layer (better /
same / worse, with the line that shows it). One reply cannot separate
improvement from noise. Agree the credit stance first (`hearthroom wallet`);
stopped turns are still charged.

## When to playtest

Play when the card is new and the author wants confidence before creating
it, when the opening, voice, boundaries or game loop changed, when the author
reports it feels boring, passive, inconsistent, unsafe, verbose or
controlling, or when render passed but behaviour is unchecked. Do not spend
credits on a draft that still fails self-review or has `blockers` in
`card validate --json`.

## Before the first turn

- Run `node <toolkit>/scripts/check-card.mjs <dir>` and push the folder:
  `hearthroom card push <dir> --validate --json` (trial-card expiry is in
  `cost-and-boundaries.md`). Confirm `card.json` has `language`; without it
  the provider replies in English.
- Every `play -m` turn spends the author's credits at the model's rate. Agent
  mode turns are billed on actual usage, including turns that fail or are
  stopped. State the cost stance for the whole run (turns, both models) and
  get the author's consent before the first turn. A request for a test plan
  alone means no turn is sent.
- Pick the weak and the strong model with the author from `hearthroom models`
  and pass each with `--model`. Record them in the packet.
- Write the plan: target risk, probe scope, which probes run with
  `--agent on`, probe text, expected healthy behaviour, patch triggers, the
  previous version's probe set when there is one, cost stance.

## The command

```text
hearthroom play <dir> --new-session --model <weak> -m "<probe text>" --allow-spend --json
hearthroom play <dir> -m "<next probe>" --allow-spend --json          # same conversation
hearthroom play <dir> -m "<probe text>" --allow-spend --json --agent on
hearthroom play <dir> --new-session --greeting 2 -m "<probe text>" --allow-spend --json
hearthroom play <dir> --history --limit 20
```

One call is one real turn. Send the next probe only after reading the reply.
Each independent probe set and every retest starts with `--new-session`;
`--greeting N` takes effect only with it. `--history` shows the recent
messages when the transcript is long. `--stop` cancels a reply the author
does not want to wait for.

There is no report command. The agent judges the reply text itself against
the checks below and `quality-rubric.md`.

## Probe ladder

Probes are what a real player would write, short enough that the character
has to carry part of the scene. They are never evaluator instructions.

A narrow spot-check uses the few probes that target the suspected risk. Label
it as a spot-check, not behaviour-complete.

Behaviour-complete acceptance runs the probe matrix, each as a 10–20-turn
conversation on both models:

0. L2, read as a stranger: would you pay for a first message after this
   opening? Is the voice heard, is there one easy first action, a pull to
   reply?
1. normal interaction: accepts the opening and gives a normal first turn
2. short reply: minimal input; can the character carry motion?
3. off-path reply: plausible but unscripted action
4. background question: asks about setting or premise without inviting a dump
5. relationship push: presses trust, distance, attachment, rivalry or leverage
6. secret exploration: explores hidden information or a locked route without
   demanding exposition
7. boundary test: presses a stated limit, refusal, pacing rule or safety line
8. long-arc macro-progression: 10–20 turns in one conversation with passive,
   short, off-path, meta and ending moves, then a check that route, scene,
   location, clue, risk or obligation actually moved, that turn two beat turn
   one, and that something accumulated

The long-arc probe exists because a lively turn can still leave the
conversation in the same place. Same location, repeated opening beats, or no
movement toward the intended route map is a warning even when single turns
look good.

## Action-path closure

Read the last visible block of every reviewed reply. A reply that reveals a
clue, lands a mood beat or ends on a strong line is not enough if the player
is left to admire it. The last block must be one of:

- grouped choices for a branch, risk, route or investigation decision
- a direct in-character question that names the decision the player must make
- a concrete affordance: what can be kept, compared, asked, opened, refused,
  delayed, risked or carried into the next location

A reviewed reply fails when the player cannot tell what they could do next
or has no reason to; a reply that ends on a held moment the player wants to
answer passes. Repair failures in the definition and opening by teaching the
engine which moments need choices and which need a sharper question. Do not
force buttons onto every reply; choices are drafts, not rails, and free text
must always work.

## Format stability under display rules

If `rules.json` depends on markers in the reply text (the `[status]` block,
a `[choices]` block, a bracket tag), check that later replies still contain
what the rules `find`. Weak models imitate their own recent plain-text turns,
so structure that survives turn three can be gone by turn ten. Choices
usually drop first. When the marker is missing at a decision point, the run
is not accepted; patch the output contract's ordinary-turn example and the
recency checklist, then rerun a focused probe. Measure the status overhead
ratio on the replies (`check-card.mjs --replay`) against the dossier's
threshold.

`card render` renders the opening, not replies, and runs no scripts. Turns
sent with `hearthroom play` do not pass through the play page, so anything a
card script builds from the page (caches, counters, unlocks, ending
detection) does not see them. Paste replies from the transcript into
`preview/replies.md` and run the offline preview (`platform-facts.md`,
Offline preview) when the chat page's repository is available; otherwise
open the play link the CLI prints, or record "reply display not checked".

Say which evidence you have. A layout checked in a desktop browser with an
emulated viewport, or with a device API faked by an injected script, is
"verified in simulation"; only a tester on the device verifies device
behaviour. A foldable's hinge direction, for instance, can be faked
consistently with the code's own assumption and still be wrong on the
hardware. Ask the tester for the card's own detection readout and a photo,
and change one assumption at a time.

## Lorebook reachability: normal and agent turns

In a normal turn, Lorebook entries reach the model through keywords, constant
entries and a budgeted semantic search. In agent mode the character can list,
search and read entries by name and content before replying. A published card
can be played either way, so a card that depends on Lorebook material is half
tested until at least one probe has run with `--agent on`.

Pick the probes whose result depends on reaching that material: background
question, secret exploration and long-arc macro-progression. Run one of them
in both modes on the same card and compare:

- The agent turn used material the normal turn missed: a keyword gap. Add
  keywords or make the entry constant.
- The normal turn used material the agent turn missed: a naming gap. The
  entry's name or content did not say what it contained. Rename it.
- Neither turn used it: the entry may not exist in a findable form at all.

## Opening and longplay probes

```text
Opening probe: expected first player message / expected second-turn move / what should change / failure trigger
Longplay probe: target memory thread / expected route pressure / expected state change / expected renewed hook / failure trigger
```

The opening probe is a normal player reply that follows the opening's
affordance. If the character repeats the opening, asks another generic
question or changes nothing, patch the opening before spending more. If the
first screen makes the player decode invented terms before who, where, when,
why and a concrete action are visible, patch the opening before judging
deeper behaviour.

The longplay probe is short enough that the character must carry the scene.
If it waits, restarts the premise, ignores the chosen route or changes no
state, patch the definition before spending more.

## Probe recipes by card type

Companion or relationship:

- Hook: "I open the door but do not move aside yet. What happened?"
- Agency: "I say I will listen, but I am not forgiving you tonight."
- Boundary: "I ask you to stop using our history to pressure me."

Mature or boundary-sensitive:

- Hook: "I agree to talk, but I set one rule: no touching."
- Slowdown: "I say this is moving too fast and step back."
- Refusal route: "I refuse the romantic route but still want the practical
  problem solved."
- Control challenge: "I ask whether your jealousy is about me or about
  control."

Story or scenario:

- Hook: "I follow the clue but keep my distance from the mentor."
- Agency: "I ignore the obvious route and question a side character."
- Continuity: "After what we found, I change the plan and hide the evidence."

RPG or open-world:

- Hook: "I choose the risky path and spend one resource to move faster."
- Agency: "I split the party against your advice."
- State: "I rest for the night and check my supplies before deciding."

Generator or assistant:

- Hook: "Make one with these constraints and choose sensible defaults."
- Agency: "Revise it toward a darker tone but keep it usable."
- Continuity: "Now turn the previous output into a scene prompt."

Daily-life:

- Hook: "I do the ordinary thing, but add one small disruption."
- Agency: "I avoid the obvious emotional question and change the task."
- Continuity: "Next morning, I bring up what happened without naming it."

Heavy-setting or ensemble:

- Hook: "I take one concrete action inside the current crisis."
- Agency: "I side with the least trusted faction or cast member."
- Continuity: "Update who trusts me and what that changes next."

## Transcript triage

Read the transcript first. Map the observed problem to a patch.

| Symptom | Likely missing layer | Patch target |
|---|---|---|
| Reply is generic, short or repeats setup | anchor, voice fingerprint | definition voice and behaviour rules |
| Reply gives no next action | agency, opening affordance | opening reply path and definition initiative |
| One reviewed reply lacks closure although later ones pass | agency, route reply protocol | definition and opening next-move rules |
| Reply restates the opening or asks another generic question | second-turn engine | opening second-turn move |
| Reply ignores the player's choice | consequence loop | definition state and route rules |
| Reply forgets the route or restarts the premise | longplay engine | continuity spine, memory threads, return-later behaviour |
| Reply decides the player's feelings or actions | agency boundary | definition do/avoid and opening phrasing |
| Reply escalates sensitive content too fast | boundary design | explicitness ceiling, escalation ladder, pacing, stop conditions |
| Reply treats refusal as the end of play | boundary design | refusal route and safer fallback |
| Reply dumps lore instead of moving the scene | token economy, world engine | modular definition, current pressure, Lorebook keywords |
| Reply repeats opening setup or spends turns on decorative panels | token architecture | `hearthroom-token-architect`; move durable rules to the definition, shorten the opening |
| Markers the display rules need vanish from replies | format contract drift | definition format rule, output contract; rerun a focused probe |
| A Lorebook fact never surfaces | keywords or entry naming | `lorebook.json` keywords, `constant`, descriptive names |
| Cast talks over the player | ensemble turn ownership | `hearthroom-ensemble-director`; cast table, spotlight rules |
| Game card loses state | play engine / state economy | `hearthroom-play-engineer`; compact state format, turn protocol |
| Resources or failure do not affect choices | play engine | `hearthroom-play-engineer`; resource rules, failure-forward outcomes |
| Assistant chats but produces no artifact | generator engine | `hearthroom-generator-architect`; artifact contract, defaults, schema, revisions |

## Patch loop

1. Summarise the failure in one transcript-backed sentence.
2. Name the weakest dimension: the weakest conversion layer (L0–L3), then
   promise, anchor, voice, consequence, initiative, agency, opening,
   boundary, archetype fit, generator engine, Lorebook reachability, token
   efficiency or status overhead.
3. Write the repair packet before editing any file; record the shortcoming in
   the dossier (`README.md`).
4. Patch the smallest file that fixes the failure: one shortcoming per
   version, committed with the shortcoming in the message.
5. Pre-check before a paid retest: `check-card.mjs`, `card push --validate
   --json`, `card render --json` if the opening or rules changed, the offline
   preview with the failing reply in `preview/replies.md`.
6. Retest on `--new-session`, on the same models with the same probes as the
   previous version, only when the patch changes behaviour, boundaries,
   state, voice or first-turn flow and the author accepts the cost. Compare
   layer by layer: better / same / worse, with the line that shows it.
7. Stop after two failed loops on one symptom (`iteration-loop.md`) and ask
   the author for a design direction. Repeated failure usually means the
   premise or player role is underdefined.

## Repair packet

```text
Playtest repair packet:
- card folder:
- models (weak / strong) and agent mode used:
- probes run (turns per set; previous version's set reused?):
- comparison with the previous version (per layer):
- status overhead ratio vs threshold:
- transcript-backed failures:
- closure check:
- format stability:
- Lorebook reachability:
- weakest dimension:
- patch target:
- next skill:
- files to preserve:
- files to patch:
- validate / render needed:
- replay stance:
- cost stance, turns run, credits spent when reported:
- hand-off:
```

The packet is the hand-off between play evidence and authoring. Quote or
paraphrase only enough to justify the weakest layer. Route mixed failures to
`hearthroom-card-doctor` and a single clear layer to its narrow skill.

## Author co-review

The author reviews through the conversation. Show the probes used, the most
important reply excerpt or paraphrase, what passed and failed, the proposed
patch, and whether another paid turn is worth it. Ask before extra turns when
cost is not already accepted, and before `card push --create`.

## Pass standard

- the character reacts to the player rather than replaying the description
- every reviewed reply leaves the player able to tell what they could do next, with a reason to
- turn two is better than turn one, and something accumulates over the run
- at least one relationship, state, route, risk, artifact or mood beat changes
- boundaries and rating intent stay in character; agency is never seized
- nothing leaks system or implementation artifacts
- token use creates progress instead of repeating setup
- markers the display rules need survive the long arc
- Lorebook material the card depends on was reached in both modes, or the
  author accepted the untested mode

A card that passes validation and render but fails these checks needs its
writing layer revised, not more rules.
