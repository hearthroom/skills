# Language style

Use this reference when a card's engine, opening and voice plan are coherent
but the player-facing language is inconsistent, translated-sounding, or not
localised to the intended audience. A language pass preserves the engine,
opening and voice rules; it never becomes a plot rewrite.

## Boundary

- Language style: the voice card is valid but the prose surface is
  inconsistent.
- `voice-calibration.md`: rhythm, vocabulary, refusal style or behaviour
  under pressure is missing.
- `prose-texture.md`: script and register are right but the words read
  generated: opening at full volume, ellipsis in every line, stacked
  adjectives, narrated player feelings.
- `boundary-design.md`: mature or coercion-adjacent content lacks a rating
  posture, explicitness ceiling, refusal behaviour or agency contract.
- `profile-packaging.md`: name, summary or tags do not say why to open the
  card.

## Platform notes

- `card.json` `language` names the card's language. Field limits are larger
  only if it is exactly `en`. Read them from `tokenBudget.limits` in
  `hearthroom card push --validate --json`.
- `playerName` is what the card calls the player; placeholder values such as
  你, user, you or player are ignored. `nickname` is what `{{char}}` expands
  to when it differs from `name`. Prefer these over hard-coded names.
- Script conversion is the platform's job. Write the card in one Chinese
  script. A Traditional-language player sees a Simplified card converted at
  display time, and the reverse; stored text, and the text the model reads,
  stay as written (`platform-facts.md`, Chinese script). Do not make a second
  card or a second set of files for the other script.
- The converter does not touch attributes such as `title`, CSS `content`,
  `<script>` and `<style>`, anything marked `translate="no"` or
  `notranslate`, text a card script creates, or short and mixed strings whose
  script it cannot tell. Those strings need `sdk.text.convert` or a
  per-script variant; hand them to `hearthroom-presentation-director`.
- In display rules, Chinese characters in `find` match both Traditional and
  Simplified forms. Whether Lorebook keywords do is not documented: list both
  forms of a noun the player might type.
- The converter changes characters, not word choice. Write Taiwan-facing
  vocabulary yourself when that is the audience.

## One script across the card

- One script across every file the model reads: `name`, `summary`,
  `definition.md`, `welcome.md`, alternate openings, `talkExample`, Lorebook
  entries and player-facing tags. Mixed text teaches the model to mix, and a
  half-and-half string defeats the display converter, which will not convert
  it back.
- Convert residue while preserving names, intentional dialect, JSON keys,
  code and rule patterns. In `rules.json`, check the strings the converter
  skips (attributes, CSS `content`, labels a script draws), not ordinary text
  nodes.
- Prefer natural Taiwan-facing phrasing when the author asks for zh-Hant or
  zh-TW or writes in Traditional Chinese.
- Full-width punctuation in prose; code punctuation inside JSON, commands and
  markup.
- Remove report-like cadence. Rewrite one ordinary line of dialogue in the
  target register and use it as the model for the rest; a list of banned
  connectors does not move a strong model, a rewritten line does.
- Keep genre diction. A court fantasy, a neighbour, a game system and a
  contemporary romance should not share one neutral register.
- Do not over-localise proper nouns, invented terms, faction names or
  in-world code-switching unless the author asks.

## Register alignment

Define before rewriting: narration (literary, conversational, clipped,
formal, system-like, diary-like); how the voice card sounds in the target
language; player address (你, 您, name, title, nickname, role, none);
intimacy (distant, professional, teasing, familiar, intimate, ritualised);
rating posture (route to `hearthroom-boundary-designer` if unclear).

Across files: the summary may be sharper than the definition but not a
different genre; `definition.md` is compact and rule-bearing; `welcome.md`
sounds like the scene, not the profile; `talkExample` demonstrates the same
voice rules as `definition.md`; tags do not mix scripts unless intentional.

## Address matrix

Many language failures are address failures.

```text
Address matrix:
- character self-reference:
- character's address for the player:
- player in narration:
- third-person reference for the character:
- when distant / trusting / resisting / boundary-setting:
- forbidden shifts:
```

The character must not switch between 你, 您, nickname, title and full name
without a relationship-state reason.

## File pass

1. `card.json` `name`: keep meaning and memorability.
2. `card.json` `summary`: readable promise; player relation and tension
   visible.
3. `definition.md`: localise rules and voice guidance; engine unchanged.
4. `welcome.md` and `openings/alt-NN.md`: keep action, pressure, player
   implication and reply paths.
5. `talkExample`: align register with the definition; no new speech style.
6. `tags`: translate player-facing tags; keep intentional in-world labels.
7. `lorebook.json`: content and names in the same script; keywords in the
   forms players actually type.
8. `rules.json`: rewrite only the strings the converter skips (`title`
   attributes, CSS `content`, labels a script draws); ordinary text nodes are
   converted by the page. Never touch patterns, `$name` keys or JSON keys.

## Rewrite rules

- Preserve facts, route structure, boundaries and player agency.
- Change sentence shape, particles, idioms, connectors and punctuation where
  prose sounds translated.
- Keep the voice card's specific terms unless they break the target language.
- Do not soften conflict because a line became more natural.
- Do not add lore, new feelings or new attraction.
- Do not narrate the player's feelings, consent or next action.
- Keep the texture pass from `prose-texture.md` while rewriting: an ellipsis
  budget, adjectives one at a time, objects before feelings. Natural
  phrasing that still trembles in every line is still a template.

## Verification

- target language explicit and matches `card.json` `language`
- one script per file, all files; tags and summary in the target language
- pronouns and address follow the matrix
- `definition.md` and `talkExample` share a register
- `welcome.md` still has a first action path
- boundary posture preserved or routed
- rule patterns, keys and platform terms untouched
- a rule script that matches or hashes reply text normalises to the card's
  script first (`platform-facts.md`, Chinese script); route to the
  presentation director if not
- no plot, engine, boundary or voice-rule change slipped in

A broken voice card goes to `hearthroom-voice-director`; missing posture to
`hearthroom-boundary-designer`; an approved packet to `hearthroom-card-author`.
