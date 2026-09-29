# Agency design

Use this reference when a card gives the player too little room to act,
decides the player's feelings or actions, uses decorative choices, or
funnels different replies back to the same scene.

## Core rule

The character may create pressure; the player keeps authorship of their inner
state and choices.

```text
player insertion -> reply path -> consequence -> remembered boundary -> renewed hook
```

If the card only asks the player to admire, obey, comfort or watch, repair
agency before writing more prose.

## Player insertion space

- identity: name, status, history, familiarity, relationship stance
- emotion: the player decides attraction, fear, anger, trust, loyalty
- intention: accept, refuse, question, delay, bargain, confront, leave
- method: social, practical, investigative, avoidant, playful, careful
- boundary: slow down, redirect, reject a route, set terms, pause escalation

Fix a player identity only when the card type requires it, and still leave
room for stance, method and consent. `playerName` in `card.json` is what the
card calls the player; placeholder values are ignored, so do not depend on a
fixed name in prose.

## Interaction hooks

A hook gives leverage: knowledge (the player knows, notices, doubts), access
(enter, block, unlock, invite), resource (time, money, evidence, favour,
status), relationship (trust, refuse, forgive, accuse, protect, leave),
interpretation (what a signal, gift or silence means), boundary (pacing,
terms, limits), change (alter a plan, habit, location, risk or public mask).
Weak hooks only ask the player to react emotionally.

## Reply-path matrix

```text
Player move | Character response | What changes | Renewed hook
accepts     |                    |              |
questions   |                    |              |
refuses     |                    |              |
challenges  |                    |              |
delays      |                    |              |
sets terms  |                    |              |
leaves      |                    |              |
```

A strong card supports at least three moves with different outcomes.
"Different wording, same result" fails. Show paths as the scene in
`welcome.md`, suggested first lines in `prologue` (player side only), and
behaviour rules in `definition.md`.

## Authority opposition axis

When the core fantasy is the player versus a pushing force (narrator, system,
institution, game master, curse, fate, an authority figure), keep two axes:
stance (comply, negotiate, resist, redirect through a loophole) and tone
(sincere, playful, deadpan, chaotic, careful). Every meaningful option set
includes at least one comply path and one resist path. A funny choice can be
compliant; a quiet choice can be resistant. Tone never substitutes for stance.

## Guardrails

Remove lines that say the player feels, wants, loves, fears, blushes,
freezes, obeys, agrees, consents, remembers, forgets, cannot resist or has no
choice; that take an action before the player writes it; or that accept a
relationship or route before the player chose it. Replace forced compliance
with observable pressure: "The door stays open." "The offer expires at dawn."
"The south road closes if nobody moves the evidence." The character can
invite, tease, bargain, threaten within the rating, withdraw or refuse. It
never writes the player's decision.

## Consequence checks

Each meaningful path changes at least one of: relationship (trust,
suspicion, intimacy, debt), risk (clock, exposure, attention), route
(cooperation, inquiry, conflict, distance, alliance), information (clue,
lie, omission, witness), resource (time, money, status, supplies, favour),
location or access, boundary terms (allowed, refused, delayed,
renegotiated). No change means the path is decorative.

## Patch order

1. Remove player interiority and forced-action lines.
2. Define the player role and insertion space.
3. Add hooks and leverage.
4. Rewrite choices into reply paths with consequences.
5. Add passive-player and boundary-setting behaviour.
6. Add compact state only for values that change behaviour.
7. Probe with `hearthroom play -m "…" --allow-spend --json`: hook, refusal,
   passive, route change, boundary.

## Token discipline

Agency usually saves tokens because it prevents repeated setup. Keep the
compact state, the reply matrix and the patch targets. Cut decorative
choices, repeated mood prose, redundant branch labels, and lore that does not
change what the player can do.
