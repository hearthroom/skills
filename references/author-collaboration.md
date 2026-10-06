# Author collaboration

For when the author is reviewing taste, direction, draft fit, render
evidence, play evidence or a proposed patch in conversation, rather than
asking for one technical fix. Collaboration turns subjective feedback into
a card decision. It is not a comment system, task database or gate.

## Core loop

```text
author signal -> evidence -> preference axis -> options -> decision -> patch
```

Restate what the author is reacting to; separate taste, evidence,
constraints and unresolved decisions; translate vague words into observable
card behaviour; offer two or three concrete choices with one recommended;
record what to preserve, change, reject and delay (rejected directions go
into the card's `README.md` dossier with the reason, so a later session
does not reopen them); then continue with the narrow skill that performs
the patch.

The feedback surface is the conversation. Do not invent comment tables,
review storage or approval records. When a final action needs consent,
such as `card push --create`, quote the author's words.

## Translate taste into behaviour

| Feedback | Translate into |
|---|---|
| "Boring" | no pressure, no consequence, weak initiative, flat second turn |
| "Not like them" | voice fingerprint, behaviour rule, contradiction or pressure response mismatch |
| "Too much" | token bloat, over-explained lore, excessive intensity, pacing mismatch |
| "Too generic" | weak character core, profile promise, voice texture or opening affordance |
| "I want it softer" | rating posture, emotional distance, refusal route, lower-pressure opening |
| "More playable" | agency, reply paths, state changes, route consequences, longplay hooks |
| "Too busy" / "I can't follow the story" | status overhead over the threshold, `uiRole` undeclared, a HUD where a diegetic object would do, choices covering unread text (`presentation-design.md`) |
| "The panel is wrong" | render evidence (screenshots, not DOM counts), then `hearthroom-sandbox-kit` |
| "Feels off" | ask for the exact line, beat, route or file that triggered it |

A taste label is not a patch. Convert it into a file target and a
verification trigger.

## Decision frame

Give the author the current tension, two or three options (what each
changes, preserves and risks), a recommendation, and the one decision only
they can make. Three options for premise direction, archetype conflict or
strong taste uncertainty; two for narrow patches (warmer or colder voice,
shorter or denser opening, safer or more charged boundary posture).

## Co-review after evidence

After a render review or playtest: show the probe or rendered opening being
judged, summarise the evidence that matters in plain language, name what
passed and failed, suggest one patch path, and ask whether it matches the
author's taste before spending more credits or creating the real card.
Never ask the author to decide from raw output.

## Comparing versions

When the author weighs a draft against the previous one, show v(N-1) and
v(N) on the same probes and the same model, side by side, layer by layer
(L0–L3 and the dimensions in `quality-scorecard.md`): better, same or
worse, with the line that shows it. Say when the difference is within the
noise of one run and propose more turns before deciding; one reply cannot
separate improvement from noise. Record the comparison in the dossier's
evidence table.

## Where to continue

No settled premise: `hearthroom-premise-workshop`. An existing card with
several symptoms: `hearthroom-card-doctor`. Packets that need final fields:
`hearthroom-card-author`. A public profile that misses the promise:
`hearthroom-profile-packager`. Language only: `hearthroom-language-stylist`.
What the screen should show: `hearthroom-presentation-director`; a kit
build or repair: `hearthroom-sandbox-kit`. Render evidence:
`hearthroom-render-review`. Play evidence: `hearthroom-chat-simulation` with
the previous version's probe set. The author wants the card kept:
`hearthroom-publish-readiness`.

## Guardrails

- Keep output original and free of anything that looks like production data.
- Do not overwrite the author's taste with the agent's preference.
- Ask at most three questions before making progress; when evidence is
  enough, propose a decision frame instead.
