# Presentation design

Presentation is not decoration. It should make the card easier to play: the
player sees the situation, the state that matters and the next action. The
model never sees the rendered result, so nothing the model must know may live
only in a rule's replacement.

## The three layers

| Layer | Where it lives | Who sees it |
|---|---|---|
| Story content | `welcome.md`, `openings/*.md`, replies | player and model |
| HTML card components (`hc-*`) inside content | the same files | player; the model sees the markup it wrote |
| Display rules | `rules.json` (`find` / `replace`, function bar, page mode) | player only |

Prefer plain prose or Markdown for the opening. Add `hc-*` components when a
button, a bar, a fact row, a form or a collapsible block carries play value.
Add display rules when the same visual pattern repeats every turn (a status
bar, a scene header, a panel that the model emits as a small marker such as
`<status>hp::85;;mood::shy</status>`), or when the card needs a script.

## Choosing the chat page

- New cards default to the sandbox page. Use it whenever the card has scripts,
  a status bar that reads message state, sidebars, saves across devices, or a
  restyled screen. The author API (`sdk`, `[data-chat]` nodes, `--chat-*`
  variables, events) is in the facts sheet.
- Use the classic page only for an existing card that misbehaves in the
  sandbox. On the classic page the sandbox API does not exist.
- `hearthroom card render --json` reports, under `report.unsupported`, every
  sandbox identifier a classic-page card uses, with the hint to switch. It also
  reports MMD's platform state variables, which no page provides.

## Designing a status bar

1. Decide the state with `hearthroom-state-economist` first: two to five
   values the player acts on, not a dashboard.
2. Make the model emit one compact marker at the end of each reply. Put that
   instruction in the definition (or the output contract) and, if the card has
   a Lorebook, in a constant entry so it survives long play.
3. Write one rule: `find` matches the marker with a capture, `replace` renders
   it with `$name` fields or `hc-*` components. Keep the rule under the size
   limits in the facts sheet.
4. Put the trigger words for pinned panels in the function bar
   (`mountTrigger`) and let rules expand them.
5. Run `hearthroom card render` and check every rule is `applied`, then open
   the play page on a phone width and a desktop width.

## Beautification kits from MMD and SillyTavern

Hearthroom's sandbox author API is identical to the new-style sandbox on Meimo
Island (MMD), and `card import` reads the MMD three-file set and SillyTavern
cards. A kit written for MMD's sandbox therefore runs on Hearthroom as is;
a kit written for MMD's older page (rules applied on the chat page, `img
onerror` boot) also works, on either page, because `onerror` boot scripts run
on both.

For status bars, global themes, floating panels and full custom chat pages,
route to the open-source `tavern-mmd` skill
(https://github.com/yofengi/tavern-mmd) rather than re-deriving that craft:

- `/mmdsandbox` + `/beautify` produces a six-key rules file (`chatVersion: 1`)
  that `hearthroom card import` turns into `rules.json` with
  `pageMode: sandbox`.
- `/mmd` + `/beautify` produces the four-key rules file for the older page;
  import it, then set `pageMode` to `sandbox` unless the author wants classic.
- `/st` produces SillyTavern output; import the card or the regex JSON.

After any import: `card push --validate`, then `card render --json`. The only
identifiers expected under `report.unsupported` for a sandbox card are
`sdk.vars` and `<abc_vars>`; anything else means the kit targeted the wrong
page. Do not copy that skill's files into this toolkit; reference it.

## Presentation packet

```text
Presentation:
- what the player must see first:
- opening format: prose | prose + hc-* | html
- state shown: (field, why it matters, where it comes from)
- state hidden or dropped:
- display rules: (rule name, marker it consumes, what it draws)
- function bar:
- page mode: sandbox | classic (reason)
- scripts and saves: none | (what they do; sandbox only)
- kit used: none | tavern-mmd <command>
- render plan: card render, then play page at 390px and 1280px
- hand-off:
```

## Do not

- Do not hide instructions to the model inside a rule's replacement; the
  model never sees it.
- Do not put durable rules of the world into the opening to make a panel
  look full; the definition and the Lorebook carry them.
- Do not use decorative meters for text states such as location or route;
  use a fact row or a tag.
