# Author collaboration

Use this reference when the author is reviewing taste, direction, draft fit,
render evidence, play evidence or a proposed patch in conversation, rather
than asking for one technical fix. Collaboration turns subjective feedback
into a card decision. It is not a comment system, task database or gate.

## Core loop

```text
author signal -> evidence -> preference axis -> options -> decision -> patch packet
```

1. Restate what the author is reacting to.
2. Separate taste, evidence, constraints and unresolved decisions.
3. Translate vague words into observable card behavior.
4. Offer two or three concrete choices, one recommended.
5. Record what to preserve, change, reject and delay.
6. Hand off to the narrow skill that performs the patch.

The feedback surface is the conversation. Do not invent comment tables,
review storage or approval records. When a final action needs consent, such
as `card push --create`, quote the author's words in the hand-off.

## Translate taste into behavior

| Feedback | Translate into |
|---|---|
| "Boring" | no pressure, no consequence, weak initiative, flat second turn |
| "Not like them" | voice fingerprint, behavior rule, contradiction or pressure response mismatch |
| "Too much" | token bloat, over-explained lore, excessive intensity, pacing mismatch |
| "Too generic" | weak character core, profile promise, voice texture or opening affordance |
| "I want it softer" | rating posture, emotional distance, refusal route, lower-pressure opening |
| "More playable" | agency, reply paths, state changes, route consequences, longplay hooks |
| "Feels off" | ask for the exact line, beat, route or file that triggered it |

A taste label is not a patch. Convert it into a file target and a
verification trigger.

## Decision frame

```text
Decision frame:
- current tension:
- option A: what changes / what it preserves / risk
- option B: what changes / what it preserves / risk
- option C, optional: what changes / what it preserves / risk
- recommendation:
- author decision needed:
```

Three options for premise direction, archetype conflict or strong taste
uncertainty. Two for narrow patches: warmer or colder voice, shorter or
denser opening, safer or more charged boundary posture.

## Collaboration packet

```text
Author collaboration packet:
- author signal:
- current artifact:
- evidence available:
- inferred preference axes:
- non-negotiables:
- preserve / change / reject / delay:
- decision frame:
- recommended next move:
- patch target:
- next skill:
- confirmation needed:
- validate / render / play stance:
```

## Co-review after evidence

After a render review or playtest: show the probe or rendered opening being
judged, summarize the evidence that matters in plain language, name what
passed and failed, suggest one patch path, and ask whether it matches the
author's taste before spending more credits or creating the real card. Never
ask the author to decide from raw output.

## Hand-off map

- No settled premise: `hearthroom-premise-workshop`.
- Existing card with several symptoms: `hearthroom-card-doctor`.
- Packets need final fields: `hearthroom-card-author`.
- Public profile does not match the promise: `hearthroom-profile-packager`.
- Language only: `hearthroom-language-stylist`.
- Render evidence: `hearthroom-render-review`.
- Play evidence: `hearthroom-chat-simulation`, then the narrow skill the
  transcript names.
- The author wants the card kept: `hearthroom-publish-readiness`.

## Guardrails

- Keep output original and free of anything that looks like production data.
- Do not overwrite the author's taste with the agent's preference.
- Ask at most three questions before making progress; when evidence is
  enough, propose a decision frame instead.
