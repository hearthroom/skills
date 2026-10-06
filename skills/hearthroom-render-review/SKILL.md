---
name: hearthroom-render-review
description: Use when there is render evidence to judge (a card render report, local check output, preview or play-page screenshots, rolled-back rules, unsupported identifiers, a panel drawn twice or not at all, overflow, contrast), or when the author says "it looks wrong on my phone".
---

# Hearthroom render review

Turn render evidence into one repair decision. Evidence comes from
`hearthroom card check` (local), `hearthroom card render --json` (no
browser), `hearthroom card preview` (the real shell, offline) and the play
page. Without evidence, route to `hearthroom-presentation-director`.

## Required references

Read the display rules, chat pages, Offline preview and Local checks
sections of `../../references/platform-facts.md`. Read
`../../references/presentation-design.md` when the plan itself may be
wrong and `../../references/sandbox-kit.md` when the kit drew the screen.

## Workflow

1. `hearthroom card check <dir>` first: it catches what the provider's
   render cannot (a pattern that matches the empty string, an attribute the
   sanitizer strips, a marker nobody tells the model to write, a core card
   with no declared threshold). Fix errors before rendering.
2. `hearthroom card render <dir> --json` (`--opening N` for an alternate,
   `--push` if the folder changed). Read `rules[]` (every enabled rule
   `applied` or deliberately `unmatched`; a `rolled_back` rule names its
   `reason`: `bad_regex`, `empty_match`, `replacement_alone`, `volume`,
   `timeout`; fix the pattern, never shorten story text to fit),
   `report.unsupported[]` (an author-API identifier the page does not
   provide; on a classic card usually `pageMode: sandbox`), `report.scripts`,
   `inlineHandlers`, `externalUrls` (intended?), and `rendered` as the
   player would see it: the marker was consumed and nothing leaked as raw
   text. `applied` says the rule matched, not that a script drew anything.
3. Accept on screenshots, not DOM counts: `hearthroom card preview <dir>`
   or `previewUrl` in a browser. Stream a sample reply, tap a choice, open
   the dock, and take the same screens with rules off. Look at a phone
   width (about 390 px) and a desktop width (about 1280 px); for a
   full-page layout also a short landscape phone and a square-ish screen
   (about 900×640); scroll one reply to its end to see how the choices
   appear. Check: one status panel per bubble and none in the function bar;
   no overflow, clipped text or unreadable contrast; the first screen shows
   the player's next action and a way to type; dark, plus light when
   `cardFormat` is `tavern`. An `assist` card's rules-off screens still read
   as story; a `core` card's mechanics are still legible in the text.
4. Choose one primary repair (file, change), patch, push, render again.
   Record the evidence seen (sizes, themes, rules off) and whether it was
   verified in simulation or on a device. Continue with
   `hearthroom-token-architect` for a bloated opening,
   `hearthroom-opening-director` for an inert first screen,
   `hearthroom-presentation-director` when the plan must change,
   `hearthroom-sandbox-kit` when the kit's panel, choices or script failed,
   or `hearthroom-card-doctor` when render is fine but play is not.

## Do not

- Do not treat an `unmatched` rule as broken when its marker simply did not
  appear in this opening.
- Do not report a screenshot of the top of the page as a review of the page.
- Do not call device behaviour verified from an emulated viewport or the
  offline preview; say "verified in simulation" until a tester has checked
  the device.
