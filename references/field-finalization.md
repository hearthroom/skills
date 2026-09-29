# Field finalization

Use this reference after the engine, packets, profile, presentation, budget plan
and draft fields mostly exist. Finalization is the last-mile pass that decides
whether the fields are ready to write into the card folder and push, or whether
a narrow repair is still needed.

Do not brainstorm new premises here. Do not expand a field because it has unused
room. Finalization protects craft decisions from being lost while the files are
written.

## Where each field lives

| Field | File |
|---|---|
| name, summary, tags, type, sex, playerName, nickname, language | `card.json` |
| output contract, custom instructions, example conversations, suggested first lines | `card.json` (`outputContract`, `customInstructions`, `talkExample`, `prologue`) |
| portrait, background | `card.json` `media.portrait` / `media.background`, files under `assets/` |
| definition | `definition.md` |
| opening | `welcome.md` |
| alternate openings | `openings/alt-NN.md`, file-name order |
| Lorebook | `lorebook.json` |
| display rules, function bar, page mode | `rules.json` |
| working notes, version history, author-facing remarks | `README.md` (never sent to the provider) |

## Finalization gates

Check these in order.

1. Packet preservation: every supplied packet is preserved, deliberately
   resolved, or sent back to the right narrow skill.
2. Field completeness: name, summary, definition, opening, tags, type, language,
   example-conversation decision, rating posture and media status are explicit.
3. No placeholders or authoring metadata: remove bracket labels, TODO text,
   "fill later" notes, unresolved alternatives, meta commentary, author-facing
   instructions, version banners, date stamps, revision notes and changelogs
   from the fields. Move anything worth keeping into `README.md`.
4. Limits: read `tokenBudget.limits` and the per-field counts from
   `card validate --json`. The English column applies only when `language` is
   exactly `en`. Limits are ceilings, not targets. Record the current estimate
   and why each long section changes behavior, route, state, voice, boundary or
   return-later play. For long definitions apply
   `prompt-attention-architecture.md` before treating the field as final. Leave
   buffer under every limit so a last edit does not turn into a blocker.
5. Compact fallback: for any field near its limit, keep a shorter version that
   preserves the engine, ready to swap in if the push reports a blocker.
6. Format sanity: check Markdown heading hierarchy in `definition.md` (one H1,
   no skipped levels), JSON validity of `card.json`, `lorebook.json` and
   `rules.json`, exact spelling of `{{char}}` and `{{user}}`, and that HTML in
   the opening is plain HTML and CSS with no custom elements the page does
   not register. A status line
   the model must write belongs in the output contract with its drawing rule
   in `rules.json`; never store the player's feelings, consent or chosen route
   as state. Every Lorebook entry has a descriptive `name`, `content`, and
   either `keywords` or `constant: true`. If the opening's HTML, display rules
   or status line design is unsettled, route to
   `hearthroom-presentation-director` or `hearthroom-render-review` instead of
   guessing.
7. File mapping: name every file the patch touches and what changes in it. Do
   not rewrite files whose content is unchanged.
8. Hand-off: state `ready | needs narrow repair | missing media | cost-gated`.

## Field finalization packet

```text
Field finalization packet:
- mode: draft-only | new trial card | patch existing folder | blocked
- source packets preserved:
- unresolved packets or conflicts:
- final field status:
  - name:
  - summary:
  - definition:
  - opening (+ alternates):
  - example conversations:
  - output contract:
  - custom instructions:
  - Lorebook:
  - display rules:
  - tags / type / language:
  - media:
- limits and density check:
  - language:
  - per-field estimate vs limit (from tokenBudget when available):
  - sections that earn their length:
- compact fallback:
  - summary:
  - definition:
  - opening:
  - example conversations:
- format checks: Markdown | HTML (plain, no unregistered custom elements) | JSON files | status line
- placeholder / meta check:
- file mapping: card.json | definition.md | welcome.md and openings | lorebook.json | rules.json | assets/
- validate / render / play hand-off:
  - validate focus:
  - render focus:
  - play stance (cost accepted?):
- final status: ready | needs narrow repair | missing media | cost-gated
- next action:
```

## Repair routing

- Missing premise, player role or card contract: premise, archetype or
  blueprint work first.
- Generic persona, weak desire, trope-only role: `hearthroom-character-core`.
- Weak relationship or daily-life loop: `hearthroom-relationship-architect` or
  `hearthroom-daily-life-architect`.
- Lore dump or inactive setting: `hearthroom-world-engineer` or
  `hearthroom-material-distiller`.
- Broken game or generator behavior: `hearthroom-play-engineer` or
  `hearthroom-generator-architect`.
- Passive player, decorative choices, agency takeover: `hearthroom-agency-designer`.
- Generic dialogue or blurred speakers: `hearthroom-voice-director` or
  `hearthroom-talk-example-curator`.
- Mixed script or translated-sounding prose: `hearthroom-language-stylist`.
- Overlong opening, thin definition, misplaced durable rules:
  `hearthroom-token-architect`.
- Opening HTML, display rules or status line unresolved:
  `hearthroom-presentation-director`.
- Fields coherent but behavior still drifts in play:
  `hearthroom-instruction-guardrail`.

## Ready standard

The packet is ready only when the files can be written without inventing a
missing creative decision, exceeding a limit, losing a packet constraint, or
relying on validation, render or play to discover an obvious format defect.
