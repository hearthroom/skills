# Profile Packaging

Use this when the card's engine is coherent but the public surface is weak:
`name`, `summary`, `tags`, `intro.md`, or the reason a player should open the card.

Packaging is the promise layer, not publish readiness. It is also the first
two layers of the funnel (`role-card-writing-framework.md`): L0, the cover
and the title make a stranger stop; L1, the summary makes them open the
opening.

```text
engine -> promise angle -> title + cover as a pair -> summary -> tags -> first-impression check
```

A new player should grasp the fantasy, their relation to the character, and the
playable tension in seconds.

## Promise angle

```text
card shape / player role / character or system / central tension /
repeated play loop / strongest unusual detail / boundary posture if relevant /
first-screen proof
```

Do not fake an unknown item; mark it and hand off to the skill that defines it.

## Title

A title earns the click with one of these:

- a gap: a statement that begs "why?"
- a local or topical anchor the target players recognise
- a contrast between two words that should not meet

Check: would someone who sees only the cover and the title want to know one
specific thing? Write three candidates, each using a different one of the
three devices, then pick. Avoid generic archetypes ("Vampire Boyfriend"),
mood-only names, joke names on non-comedic cards, and stacked subtitles.

For a fan card, consider borrowing the shape of the source's own title,
since that is what fans recognise at a glance (a light novel's long
one-sentence title, a series' naming pattern), keeping its key phrase and
changing one part for the card's twist. A title that needs a second clause
to explain the angle has usually become two ideas; the angle can live in
the summary.

Then check the pair: does the cover raise the same question as the title? If
not, route the hook sentence to `hearthroom-visual-identity-director`; do not
fix a cover by lengthening the title.

## Summary

One line: about 80 characters in Chinese, Japanese or Korean, about 150 in
English. It is the hook on the board tile and under the title on the card
page, which clamps it to three lines. Say who I am, what I am up against and
why it is fun; everything else goes in the introduction. The provider limit
(`platform-facts.md`) is a ceiling, not a target.

## Introduction

`intro.md` is the card's store page in a role-play community, the last thing
a player reads before choosing to play: like a game's store page, short
emotional copy between pictures of what playing looks like. It is public and
never reaches the model (no hidden rules); a screen or two, the page folds
the rest.

- Pictures carry it: real screenshots of the card's screen (its UI, a scene, a choice), CG, key art.
- Short warm paragraphs between them: the hook scene, what you do, who is there; no wall of text.
- A fan work's credit first, practical notes last, the changelog stays in the card; no spoiling pictures.
- Read it aloud and cut what sounds machine-written: slogan headings, bold taglines, triads, "not X but Y".

Pattern: a hook sentence (a contrast, a question, or a stake the player feels)
followed by a "you are / you face / you can change" sentence.

```text
The lighthouse has been dark for three nights and the keeper swears it is lit.
You are the inspector with one boat back to shore; what you report decides
whether she keeps the island.
```

Cut: backstory that belongs in the definition; several proper nouns before the
player knows what they do; mood stacks (beautiful, dark, mysterious, immersive);
performance claims (popular, top, viral, best, trending); policy disclaimers.

## From summary to opening

The opening must deliver the summary's hook within its first screen, as a
playable moment rather than a recap (L2: the opening is the free demo that
earns the first paid message). If it does not, route to
`hearthroom-opening-director`; do not lengthen the summary to cover for it.

## Tags

Tags must be ones players actually browse. Pick from the community list: the
card author runs `hearthroom tags --zone <language zone> --q <word> --json`
(`platform-facts.md`, CLI loop) and passes the results to this skill. Choose
tags for card shape, setting, and the relationship or loop. Do not coin new
tags, and do not tag mechanics unless the community list already has them.
Prefer concrete tags over synonyms. No product, origin, or audience-size
claims.

## First-impression check

- Does the first sentence alone make a stranger want to know what happens
  next?
- Do the summary's sentences say who I am, what I fight, why it is fun, and
  what I can change?
- Do the cover and the title ask the same question?
- Does the opening prove the promise on its first screen?
- Do tags distinguish the card from nearby archetypes?
- Did packaging leave the engine unchanged and invent no claims?

## Common repairs

| Failure | Repair |
|---|---|
| Title is only a trope | rewrite with a gap, an anchor or a contrast |
| Summary is a synopsis | keep one relation, one tension, one loop; hook first |
| Summary longer than a line | keep the hook; move the premise and how play feels into `intro.md` |
| Introduction is a wall of text or a cold feature list | short warm copy between screenshots, CG and key art of the card |
| Tags are mood-only or coined | pick from `hearthroom tags` by shape, setting and loop |
| First impression overpromises | align the summary with the opening |
| Cover and title disagree | route the hook to visual identity |
| Packaging changed the card | preserve the engine; change profile fields only |
| Author asks for "top" phrasing | translate to clarity, specificity, agency, hook |
