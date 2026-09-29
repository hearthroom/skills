# Scenario Design

Use this reference when a card is story-first: mystery, investigation, social
drama, event, case file, rescue, betrayal, haunting, trial or any focused
situation where the player enters an ongoing problem and choices change the
stakes. Such cards set `type` to `story` in `card.json`. Scenario design is
not a plot outline. It is a compact story engine that lets the card reveal,
pressure, branch and remember without forcing one route.

## Core rule

```text
incident -> player choice -> pressure response -> clue / cost / state change -> renewed hook
```

The card knows what can be revealed next. It does not decide which truth the
player accepts, whom the player trusts or which route the player takes.

## Route branches

Write 2-4 branches as consequences, not menu labels. Each has a trigger,
player leverage, pressure response, clue or reveal, cost, state change and
renewal hook. Useful verbs: investigate, hide, accuse, protect, expose,
bargain, flee, delay, confess, test, follow, confront, mislead, destroy. If
two branches produce the same state, merge them or make the cost differ.

## Clue and reveal ladder

1. visible clue: something the player can inspect or act on now
2. contradiction: a detail that makes two explanations impossible together
3. false lead: a tempting reading that costs something when followed
4. partial reveal: one truth that changes risk without ending the scenario
5. reversal: someone acts differently because of the player's earlier choice
6. final pressure: aftermath, repair, accusation, escape, confession or changed
   trust

Never reveal the full answer in the opening. The first screen exposes one
playable clue and a reason to act.

## Suspect / pressure network

```text
Node | Wants | Leverage | Secret | Pressure move | Player can affect
```

Every node changes behavior when the player accuses, protects, questions,
bargains, refuses or follows a false lead. Keep 2-5 active nodes, not a cast
list. Put each node's private facts in a Lorebook entry named for the person or
force, keyed on their name and the clue words that would surface them.

## Compact consequence state

Track clue status (known, hidden, distorted), suspect stance (trust,
suspicion, debt, fear, hostility), public risk or deadline, evidence status
(intact, missing, planted, destroyed, exposed), player stance, route flags and
unresolved promises, lies or owed favors. Avoid a binary solved / unsolved
state unless the card is a short one-shot; good story cards preserve aftermath.

## False lead handling

When the player follows a false lead: reveal why it seemed plausible, add a
cost, delay, social risk or changed access, leave a recoverable clue, let the
suspect react in character, and never mock the player. The player must never
have to guess the author's intended route.

## Opening policy

Open inside the incident: one active place, one clue, demand, contradiction,
body, missing object or overheard line, one node already acting, one reason the
player matters, and 2-4 reply paths that change clue, trust, risk, access or
route. Offer those paths as `prologue` lines in `card.json` or as choices in
the opening. The second turn reveals, complicates, accuses, narrows access or
shows a cost. If it only explains the setting, the scenario is not ready.

## Field allocation

- summary (`card.json`): player role, incident and route pressure in one
  sentence.
- `definition.md`: story spine, branch rules, clue ladder, pressure network,
  consequence state, route-funnel guardrails, passive-player behavior.
- `welcome.md`: the first active clue or consequence, not a briefing.
- `lorebook.json`: suspects, places and evidence as named, keyword-triggered
  entries so later reveals stay consistent.
- `talkExample` (`card.json`): micro-samples only when narrator or suspect
  pressure style would otherwise drift.
- presentation: a short clue, risk or route panel in plain HTML only
  when it makes action clearer.

## Play probes

Run each as one turn of `hearthroom play <dir> -m "…" --allow-spend --json`:

1. Opening clue probe: act on the first visible clue.
2. Accuse / protect probe: take a side early.
3. False-lead probe: follow the tempting wrong reading.
4. Passive-player probe: send a minimal message.
5. Continuity probe: refer back to an earlier choice.

Pass means the card changes clue, trust, risk, access, route or pressure and
offers a renewed hook without deciding the player's conclusion.

## Self-review

- Can the player act in the first reply without reading a briefing?
- Does each branch change state, risk, trust, clue, access or pressure?
- Does the ladder reveal enough to continue but not enough to end play?
- Are false leads playable and recoverable?
- Can the card move the scenario when the player is passive?
- Are suspects more than names: want, secret, pressure move, player effect?
- Is the token spend in durable branch rules rather than plot prose?
