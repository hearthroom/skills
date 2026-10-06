# Material Distillation

Use this when an author gives notes, drafts, files, a world bible, a setting
pack, an outline, or pasted fragments and wants a Hearthroom card. The goal is
a playable engine, not every fact compressed into the definition.

```text
source material -> playable promise -> player role -> first scene -> durable rules
-> state and consequence loop -> card files
```

Preserve the author's intent; cut anything that does not change player agency,
character behaviour, state, consequence, voice, or the first few scenes.

## Source hygiene

- Use only material the author provides or asks you to inspect.
- Do not copy long passages into the card. Rewrite into original, card-native
  rules, scenes, and voice guidance.
- Omit personal, confidential, or irrelevant details unless the author wants a
  fictionalized counterpart.
- Keep public attribution out of player-facing text unless the author asks.
- For canon-like material, keep only the requested fantasy, relationship shape,
  tone, and scene mechanics, then apply `originality-adaptation.md` unless the
  author explicitly wants a canon or fan card with allowed use.
- Check every real-world fact the card asserts (populations, dates, who wrote
  a song or slogan, where a custom comes from) against a reliable source
  before it goes into a field; the author's notes are not that source. Mark
  anything unverified as an assumption in the hand-off. Cards have shipped
  with a wrong city population and a wrong origin for a jingle.

## Keep, delay, cut

Keep now: the player's position and leverage; the character's desire,
contradiction, boundary, and voice; one immediate pressure; two to four route
seeds with costs; compact state that changes future turns; rules that let the
character generate new scenes.

Delay: history that matters only after trust, route, or location changes;
secondary factions or characters absent from the first scene; advanced
mechanics the opening loop does not need; rare exceptions.

Cut: repeated names, dates, genealogies, faction lists, object catalogs; facts
that only prove the world is large; prose that restates mood without changing
behaviour; visual description that belongs in display rules; source wording that
would make the card feel pasted.

## Large-world compression

```text
Premise summary: one paragraph
Player position: one sentence
Core rule: one or two rules that generate scenes
Locations: only places the player can visit, lose, unlock, protect, or escape
Factions: only groups that create offers, threats, obligations, or routes
State: the keys that change play (`hearthroom-state-economist` sets the number: two to six visible)
Routes: 2-4 branches with costs
First scene: one concrete problem that uses the setting now
```

A named entity that creates no action, obstacle, cost, reward, or relationship
pressure does not belong in the first draft.

Background that matters only once named belongs in Lorebook entries rather than
the definition. Give each entry keywords that will actually appear in play and a
name that says what it contains, because in agent mode the character finds
entries by name and content. Keep constant entries few and short; they are
always included and can push a card over its context tier. Do not rely on
semantic admission for facts that must appear: give those entries keywords or
make them constant. See `platform-facts.md`.

## Character compression

Reduce a detailed character to: desire (now), contradiction (what blocks it),
boundary (what they will not do or reveal), player leverage (what the player can
change), voice (rhythm, vocabulary, tells, concealment, refusal style), turn
behaviour (passive, resistant, trusting, boundary-pushing player), progression
(what changes slowly). Backstory: delete each sentence in turn; if no reply
would change without it, it stays deleted. Appearance: keep only what deviates
from the picture the role and age already evoke.

## Conflicting sources

1. Prefer the version that creates clearer play.
2. Keep ambiguity only if the card is about investigation or unreliable truth.
3. Move low-confidence facts to route seeds or rumors.
4. Ask the author only if the conflict changes player role, intensity, central
   relationship, or first scene.

## Character budget

Spend the definition in this order: playable promise and player role; engine;
consequence and state loop; first scene; voice; route seeds; one ordinary-turn
sample (examples beat rules for weak models, `talk-example-design.md`). Read
the limits from `card validate --json` (`tokenBudget.limits`). Cut source
material before agency, consequence, voice, or state.
