---
name: hearthroom-render-review
description: Use when a Hearthroom card has render evidence to judge, such as a card render report, the play page open in a browser, a screenshot, rolled-back rules, unsupported author-API identifiers, overflow, contrast, or a first screen where the player's next action is not visible.
---

# Hearthroom render review

Use this skill to turn render evidence into one repair decision. Evidence
comes from `hearthroom card render --json` (no browser needed) and from the
play page (a browser). Without evidence, route to
`hearthroom-presentation-director` instead.

## Required references

Read the display rules and chat pages sections of
`../../references/platform-facts.md`. Read
`../../references/presentation-design.md` when the plan itself may be wrong.

## Workflow

1. Run `hearthroom card render <dir> --json` (add `--opening N` for an
   alternate, `--push` if the folder changed). Read in this order:
   - `rules[]`: every enabled rule should be `applied` or deliberately
     `unmatched`. A `rolled_back` rule names its `reason`: `bad_regex`,
     `empty_match`, `replacement_alone`, `volume` or `timeout`. Fix the
     pattern or the replacement; do not shorten story text to make it fit.
   - `report.unsupported[]`: each item names an author-API identifier the
     card's chat page does not provide and a `hint`. On a classic-page card,
     the fix is usually `pageMode: sandbox` in `rules.json`.
   - `report.scripts`, `inlineHandlers`, `externalUrls`: confirm they are
     intended. Scripts cannot fetch external URLs on the sandbox page.
   - `rendered`, `report.tags` and the rule statuses: confirm the HTML blocks
     and rules you planned are present and nothing is nested absurdly.
     `report.components` is only a signal that an imported classic-page card
     still uses legacy component markup the sandbox page does not render.
   - `rendered`: read it as the player would; check the marker the model
     emits was consumed and nothing leaked as raw text.
2. If a browser is available, open `previewUrl` at a phone width (about
   390 px) and a desktop width (about 1280 px); for a full-page layout also
   a short landscape phone and a square-ish unfolded screen (about 900x640),
   and scroll one reply to its end to see how the choices appear. Check overflow, clipped text,
   contrast against the theme, and that the first screen shows the player's
   next action. Do not judge chrome that belongs to the site (header,
   composer, sidebar).
3. Write the repair packet with one primary repair. Patch the folder
   (`rules.json`, `welcome.md`, `card.json`), push, render again.
4. Hand off: to `hearthroom-token-architect` when the opening is bloated, to
   `hearthroom-opening-director` when the first screen is inert, to
   `hearthroom-presentation-director` when the plan must change, to
   `hearthroom-card-doctor` when render is fine but play is not.

## Repair packet

```text
Render repair:
- evidence: card render | play page (widths)
- rule outcomes:
- unsupported:
- visual failures:
- playability failures:
- primary repair (file, change):
- keep as is:
- rerender: yes | no
- next skill:
```

## Do not

- Do not treat an `unmatched` rule as broken when its marker simply did not
  appear in this opening; check a reply pattern or an alternate opening.
- Do not remove a working script because the render report counted it.
- Do not report a screenshot of the top of the page as a review of the page.
- Do not call device behaviour verified from an emulated viewport; say
  "verified in simulation" until a tester has checked the device.
