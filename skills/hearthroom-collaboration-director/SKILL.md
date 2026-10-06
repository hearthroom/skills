---
name: hearthroom-collaboration-director
description: Use when author feedback, taste or preference calibration, co-review, revision choices, draft comparisons between versions, or "almost right but off" comments on a Hearthroom card need to become concrete design decisions before rewriting, playing or publishing.
---

# Collaboration director

Use this skill when the author is reviewing direction, taste, evidence or
revision choices in conversation. The output is a collaboration packet and a
decision frame, not a rewrite and not a file edit.

It keeps the author in the loop without new storage or UI: vague feedback
becomes observable card behaviour, then routes to the narrow skill that makes
the patch. The one record it keeps is the card's `README.md` dossier
(rejected directions, decisions, evidence by version), which is never sent.

## Required references

Read the card's `README.md` dossier first, then
`../../references/author-collaboration.md`, and
`../../references/platform-facts.md` for what a push, a render or a paid
turn actually does before you describe one to the author.

Read only the follow-up reference the packet names:
`../../references/premise-workshop.md` for unsettled direction,
`../../references/card-diagnosis.md` for mixed symptoms on an existing card,
`../../references/quality-scorecard.md` for a whole-card craft decision or a
version comparison, `../../references/playtest-loop.md` for play evidence or
probe choices, `../../references/presentation-design.md` for render
evidence or "too busy", and `../../references/card-authoring-templates.md`
for a field patch hand-off.

## Workflow

1. Identify what the author is reacting to: idea, draft, one file, rendered
   opening, play reply, a comparison of two versions, profile, language or
   readiness.
2. Separate evidence (what happened) from preference (what the author wants
   more or less of).
3. Translate the feedback into behaviour: pressure, voice, agency, pacing,
   token density, relationship distance, opening affordance, route
   consequence, boundary posture, profile promise, or Story/UI balance.
4. Name non-negotiables and what to preserve before proposing changes.
5. When direction is unsettled, offer two or three options with what each
   changes, preserves and risks. When two versions are compared, show them
   on the same probes and model, layer by layer, and say when the difference
   is within the noise of one run.
6. Recommend one path and explain the tradeoff in card-design terms.
7. Ask at most three targeted questions, only if the decision cannot be made
   from available evidence.
8. Return the collaboration packet from `author-collaboration.md`, followed by
   a short self-review: feedback stayed in conversation, taste translated
   into behaviour, preserve/change/reject/delay all named, rejected
   directions written to the dossier with reasons, decision frame concrete,
   next skill narrow.

## Hand-off

- `hearthroom-premise-workshop`, `hearthroom-archetype-director` or
  `hearthroom-card-blueprint` when the author is choosing between concepts.
- `hearthroom-card-doctor` for several symptoms; `hearthroom-quality-auditor`
  for a whole-card craft decision.
- `hearthroom-profile-packager` when the public promise misses the intended
  appeal; `hearthroom-language-stylist` for language consistency.
- `hearthroom-presentation-director` for "too busy" or what the screen should
  show; `hearthroom-sandbox-kit` for a panel, choices or script to build or
  repair.
- `hearthroom-render-review` for the rendered opening;
  `hearthroom-chat-simulation` for behaviour evidence once cost is accepted,
  with the previous version's probe set.
- `hearthroom-card-author` when the decision is ready to become file edits
  and a push.

## Do not

- Do not edit files or run CLI commands from this skill.
- Do not create comment tables, review storage or approval records beyond
  the dossier.
- Do not rewrite on "boring"; locate the weakness first. Do not answer "not
  like the character" with style polish; route to voice or character core.
- Do not average two incompatible drafts; preserve the winning qualities.
- Do not replace the author's taste with the agent's.
- Do not call a difference between two versions an improvement on the
  evidence of one reply.
