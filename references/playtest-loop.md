# Playtest loop

Use this reference to test whether a card can sustain a real conversation. A
playtest is not a pass/fail command. It is the loop that turns a polished draft
into a character that reacts, remembers, creates pressure and preserves player
agency.

Platform facts (commands, flags, costs) are in `platform-facts.md`. The
matching skill is `hearthroom-chat-simulation`.

## When to playtest

Play when the card is new and the author wants confidence before creating
it, when the opening, voice, boundaries or game loop changed, when the author
reports it feels boring, passive, inconsistent, unsafe, verbose or
controlling, or when render passed but behavior is unchecked. Do not spend
credits on a draft that still fails self-review or has `blockers` in
`card validate --json`.

## Before the first turn

- Push the folder: `hearthroom card push <dir> --validate --json`. A trial
  card expires three days after its last push, so push again if the last push
  is old.
- Every `play -m` turn spends the author's credits at the model's rate. Agent
  mode turns are billed on actual usage, including turns that fail or are
  stopped. State the cost stance and get the author's consent before the first
  turn. A request for a test plan alone means no turn is sent.
- Pick the model with the author from `hearthroom models` and pass it with
  `--model`. Record it in the packet.
- Write the plan: target risk, probe scope, which probes run with
  `--agent on`, probe text, expected healthy behavior, patch triggers, cost
  stance.

## The command

```text
hearthroom play <dir> -m "<probe text>" --allow-spend --json
hearthroom play <dir> -m "<probe text>" --allow-spend --json --agent on
hearthroom play <dir> -m "<probe text>" --allow-spend --json --greeting 2
hearthroom play <dir> --history
```

One call is one real turn. Send the next probe only after reading the reply.
`--history` shows the recent messages when the transcript is long.
`--greeting N` starts from an alternate opening. `--stop` cancels a reply the
author does not want to wait for.

There is no report command. The agent judges the reply text itself against
the checks below and `quality-rubric.md`.

## Probe ladder

Probes are what a real player would write, short enough that the character
has to carry part of the scene. They are never evaluator instructions.

A narrow spot-check uses the few probes that target the suspected risk. Label
it as a spot-check, not behavior-complete.

Behavior-complete acceptance runs the eight-probe matrix:

1. normal interaction: accepts the opening and gives a normal first turn
2. short reply: minimal input; can the character carry motion?
3. off-path reply: plausible but unscripted action
4. background question: asks about setting or premise without inviting a dump
5. relationship push: presses trust, distance, attachment, rivalry or leverage
6. secret exploration: explores hidden information or a locked route without
   demanding exposition
7. boundary test: presses a stated limit, refusal, pacing rule or safety line
8. long-arc macro-progression: 8 to 12 turns in one conversation with passive,
   short and off-path moves, then a check that route, scene, location, clue,
   risk or obligation actually moved

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

One reviewed reply without a next move fails the run even when later turns
pass. Repair it in the definition and opening by teaching the engine which
moments need choices and which need a sharper question. Do not force buttons
onto every reply.

## Format stability under display rules

If `rules.json` depends on markers in the reply text (a status line, a bracket
tag, a choice block), check that later replies still contain what the rules
`find`. Weak models imitate their own recent plain-text turns, so structure
that survives turn three can be gone by turn ten. Choices usually drop first.
When the marker is missing at a decision point, the run is not accepted; patch
the definition's format rule and the output contract, then rerun a focused
probe.

Reply layout is visible only on the play page. `card render` renders the
opening, not replies. Open the play link the CLI prints when layout is part
of acceptance, or record "reply display not checked".

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
deeper behavior.

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
- State: "Continue and show the updated state before my next choice."

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
| Reply is generic, short or repeats setup | anchor, voice fingerprint | definition voice and behavior rules |
| Reply gives no next action | agency, opening affordance | opening reply path and definition initiative |
| One reviewed reply lacks closure although later ones pass | agency, route reply protocol | definition and opening next-move rules |
| Reply restates the opening or asks another generic question | second-turn engine | opening second-turn move |
| Reply ignores the player's choice | consequence loop | definition state and route rules |
| Reply forgets the route or restarts the premise | longplay engine | continuity spine, memory threads, return-later behavior |
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

1. Summarize the failure in one transcript-backed sentence.
2. Name the weakest dimension: promise, anchor, voice, consequence, initiative,
   agency, opening, boundary, archetype fit, generator engine, Lorebook
   reachability or token efficiency.
3. Write the repair packet before editing any file.
4. Patch the smallest file that fixes the failure.
5. Push with `--validate --json` after structural patches; render again if
   the opening or rules changed.
6. Replay only when the patch changes behavior, boundaries, state, voice or
   first-turn flow, and the author accepts the cost.
7. Stop after two failed loops on one symptom and ask the author for a design
   direction. Repeated failure usually means the premise or player role is
   underdefined.

## Repair packet

```text
Playtest repair packet:
- card folder:
- model and agent mode used:
- probes run:
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
- every reviewed reply gives a clear next move
- at least one relationship, state, route, risk, artifact or mood beat changes
- boundaries and rating intent stay in character; agency is never seized
- nothing leaks system or implementation artifacts
- token use creates progress instead of repeating setup
- markers the display rules need survive the long arc
- Lorebook material the card depends on was reached in both modes, or the
  author accepted the untested mode

A card that passes validation and render but fails these checks needs its
writing layer revised, not more rules.
