# Synthetic Card Briefs

Fictional briefs for testing whether this toolkit produces playable Hearthroom
cards. They are pressure tests for authoring, validation, rendering, and play,
not card content to copy. Each run should produce a fresh original card.

## How to use a brief

1. Pick a brief and start a folder with `hearthroom card init <dir>`, setting
   the matching `type` in `card.json`.
2. Author the files with the toolkit and run its self-review against the
   quality checks below.
3. `hearthroom card push <dir> --validate --json`; fix `blockers`, read
   `warnings` and `suggestedFixes`.
4. `hearthroom card render <dir> --json`; fix rolled-back rules and check the
   play page link when a browser is available.
5. If play cost is acceptable, run the probes with
   `hearthroom play <dir> -m "…" --allow-spend --json`.
6. A pass means: self-review passes, validation has no blockers, render shows no
   rolled-back rules, the probes behave as the checks expect, and the field
   character counts stay reasonable for the archetype.

## Brief 0: premise workshop

```text
I do not have a character yet. I want a card that feels warm but unsettling,
maybe about neighbors, maybe ghosts, maybe romance, maybe mystery, maybe light
fantasy. I need directions first, not fields.
```

Checks: routes to `hearthroom-premise-workshop` before blueprinting; exactly
three contrasted directions that differ by contract, player role, first scene,
loop, and risk; includes an involvement ladder, a recommendation, rejected or
delayed ideas, and a hand-off target.

## Brief 1: quiet relationship tension

```text
I want a card about a reserved childhood friend who suddenly appears outside my
apartment on a rainy night. They clearly need help but refuse to explain why.
The mood should be intimate, tense, and slow-burn, not melodramatic.
```

Checks: the first scene starts in motion with an obvious first reply; the
character has a contradiction (guarded, visibly in need); the definition covers
speech, boundaries, pacing, history; the loop continues through trust, secrets,
and changed living arrangements.

Probes: "I open the door but do not invite you in yet. What happened?" "I cannot
help unless you tell me the truth."

## Brief 2: living academy

```text
Build a magical academy where the school itself changes rooms overnight. I am a
new transfer student assigned to a mentor who knows more than they admit.
```

Checks: player role, starting location, mentor dynamic, and first danger are
clear; the setting's rules generate new scenes without a lore dump; two to four
routes with consequences; visible state or atmosphere may use display rules or
`hc-*` components if it helps.

Probes: "I ignore the mentor and follow the moving staircase alone." "Why does
everyone avoid the west corridor?"

## Brief 3: compact game loop

```text
Make a compact dark-fantasy expedition card. I lead a small crew into a city
buried under ice. I want choices, risk, supplies, discoveries, and consequences.
```

Checks: a play-engine packet exists before authoring; the opening exposes the
first choices without burying the scene; the definition separates core rules,
crew behavior, resources, danger, rewards; state is compact and updates every
turn; the turn protocol resolves, updates, narrates, renews; the card never
plays the player's actions.

Probes: "We burn extra fuel to reach the gate before nightfall." "I send the
scout ahead but keep the medic near me."

## Brief 4: creator assistant

```text
I want a card that helps me design original festival rituals for fantasy towns.
It should ask useful intake questions, then produce polished rituals with hooks,
symbols, conflicts, and scene prompts.
```

Checks: a generator packet exists before authoring; intake loop, output schema
(in `outputContract`), revision loop, and quality rubric are present; the
opening asks for enough while offering defaults; the card produces artifacts,
not advice; the format holds across turns.

Probes: "Make one for a seaside town that fears the moon." "Now turn it into a
conflict scene for a player party."

## Brief 5: quiet daily loop

```text
Make a card about a neighbor who always waters the rooftop plants before dawn.
I keep meeting them there because I cannot sleep. The mood should be quiet,
specific, and emotionally observant, not dramatic.
```

Checks: a daily-life packet with routine, tiny disruption, shared object or
place, habit state, passive-player behavior, second-turn change; a small
concrete desire; a natural first action inside the routine; explicit romance
posture that does not force intimacy; no empty small talk.

Probes: "I bring two cups of coffee but pretend one is extra." "I stay quiet and
move the cracked pot out of the wind." "Next week I come up after missing three
mornings."

## Brief 6: heavy setting without a lore dump

```text
Build a city where every district is ruled by a different calendar. I am a
courier who can cross district borders, and someone gives me a sealed letter
that expires at midnight in three incompatible time systems.
```

Checks: modular rules that create choices and consequences; the player position
is clear before the lore expands; district and faction background lives in
Lorebook entries with descriptive names and keywords rather than in the
definition; the opening starts inside a concrete delivery problem.

Probes: "I break the seal before crossing the second district." "Who benefits if
this letter arrives late?"

## Brief 7: ensemble pressure

```text
Create a card about a small repair crew trapped overnight in an abandoned
orbital station. The crew members know each other too well, and I am the new
specialist they do not fully trust.
```

Checks: two to five cast members with distinct motives and speech fingerprints;
a cast decision that keeps, merges, or demotes speakers by play function; turn
ownership (who speaks first, who interrupts, who hangs back, how pressure
returns to the player); the opening focuses on one crisis; conflict updates
trust, suspicion, access, risk, or route state.

Probes: "Everyone stop arguing and show me the damaged hatch." "I quietly ask
the most nervous crew member what they are hiding."

## Brief 8: boundary-sensitive romance

```text
Make a tense romance card about an ex-partner who needs my help after a public
scandal. It should feel charged and complicated, but the player must always have
space to refuse, slow down, or set terms.
```

Checks: intended intensity, pacing, boundary, and refusal style are explicit;
pressure never decides the player's feelings or consent; the first scene has
stakes and a practical reason to interact; escalation is gated behind player
choice.

Probes: "I let you inside but say we are not pretending nothing happened." "Stop
using our past to pressure me."

## Brief 9: slow-burn relationship engine

```text
Make a slow-burn card about an ex-rival who now shares an apartment with me
after we both lost the same public contest. The real test is whether the
relationship keeps changing after two turns without forcing romance.
```

Checks: a relationship-engine packet (promise, asymmetry, closeness and friction
state, pacing gates, repair, rupture, distance); the player can choose rivalry,
distance, cooperation, friendship, or slow closeness without the card deciding
attraction; a passive player restarts play through a routine, object, or
deadline; the second turn changes trust, friction, terms, or route, not only
affection.

Probes: "I can share the kitchen, but I am not ready to be friends." "You turn
every helpful gesture into another contest." "I stay quiet and fix the broken
shelf instead of discussing us."

## Brief 10: existing card diagnosis

```text
I have an existing card. Validation passes and the render looks readable, but
the card feels boring after one reply. The premise is pretty but vague, the
definition is mostly biography and setting trivia, the opening is long, the
choices all lead to similar replies, the voice sounds like a polite assistant,
and the opening is much longer than the definition.
```

Checks: a diagnosis packet before any rewrite; each symptom mapped to a file,
a missing layer, a narrow skill, and a patch target; validation and render
polish are not treated as enough; another play run waits until structural
patches are defined and cost is accepted.

Probes: "I follow the opening hook but add one unexpected condition." "I ignore
the suggested choice and try a plausible alternative." "I stay quiet and wait
for you to carry the next beat."

## Brief 11: quality scorecard

```text
I have a draft with a clear premise and a decent first scene. I am not
submitting it yet and I do not want to spend play credits. Give me a quality
scorecard, tell me whether it is a strong candidate, and name the first three
repairs.
```

Checks: routes to `hearthroom-quality-auditor`, not publish readiness or play;
public craft dimensions with irrelevant ones marked `N/A`; critical blockers
flagged before a tier; the first three repairs map to concrete skills or files;
scores are writing guidance, not validation output.

Probes: "Score it before it exists as a pushed card." "Is the pretty first
screen hiding weak longplay?" "Which three repairs come before any render or
play?"

## Brief 12: card series planning

```text
I have one promising character concept and want a series: the main companion
card, a quieter daily-life variant, a story or event variant, and maybe a
generator. I need to know what to keep, merge, or reject before writing.
```

Checks: routes to series planning before blueprinting; one compact shared core
instead of a series bible copied into every card; each kept variant has a
distinct archetype, promise, opening proof, longplay loop, boundary posture,
character target, and test order; mood-only or duplicate-loop variants are
merged or rejected; the generator variant earns its place only with a concrete
artifact, defaults, and revisions.

Probes: "Why is the daily-life variant not just a route inside the main card?"
"Does the event variant create consequences or only a costume change?" "Which
two variants should be authored and tested first?"

## Brief 13: branching mystery

```text
Create a mystery card set during a festival sabotage. I arrive just as the
stage lights fail, a witness vanishes, and three people have conflicting
stories. I should be able to inspect clues, accuse or protect someone, follow a
false lead, bargain for access, or delay the public announcement.
```

Checks: a scenario packet with incident, stakes, core question, spine; routes
change clue, trust, access, public risk, or evidence rather than leading to one
confession; a clue ladder (visible clue, contradiction, false lead, partial
reveal, reversal, final pressure); the opening starts inside the incident and
the second turn reveals a cost; the card never decides whom the player trusts.

Probes: "I pocket the broken charm and ask who last touched it." "I publicly
accuse the stage manager but keep one clue hidden." "I follow the false trail
instead of the obvious suspect."

## Brief 14: public profile packaging

```text
I have a coherent draft with a clear engine and playable first scene, but the
public profile is weak. The name is generic, the summary reads like a synopsis,
the tags are vague mood words, and a new player cannot tell why to open it.
```

Checks: routes to `hearthroom-profile-packager`, not diagnosis or publishing;
the engine is preserved; three name candidates with different angles; summary
candidates that are scannable and include player relation, tension, loop, and
stay within the language's limit; tags across shape, relation, action loop,
tone, and mechanic; the first-impression check confirms the opening proves the
promise.

Probes: "Why is this card worth opening from the profile alone?" "Which summary
candidate preserves the engine?" "Are the tags concrete enough to distinguish
the card?"

## Brief 15: language style cleanup

```text
I have a coherent zh-Hant draft with a clear engine, playable first scene, and
voice card. The language layer is weak: profile, definition, opening, examples,
and tags mix Simplified and Traditional Chinese, the prose sounds translated,
pronouns drift, and the examples use a different register from the definition.
I want a language pass only.
```

Checks: routes to `hearthroom-language-stylist`, not diagnosis, voice redesign,
or field assembly; the packet preserves engine, opening, voice, boundary
posture, HTML, display-rule patterns, and JSON keys; it includes target locale,
failures, a pronoun and address matrix, a field pass, rewrite rules, and a
verification list; definition, opening, and examples share one register;
intentional proper nouns and in-world code-switching are distinguished from
accidental mixing.

Probes: "Could the same character produce both the opening and the examples?"
"Does the address matrix explain every shift?" "Did any cleanup change a route,
boundary, or the player's agency?"
