---
name: hearthroom-html-card-components
description: Use when writing, reviewing or repairing hc-* HTML card components in a Hearthroom opening or reply, such as buttons, bars, stats, tags, forms, panels, their attributes, which component fits a need, and what the render report says about them.
---

# Hearthroom HTML card components

Use this skill to choose and write `hc-*` components correctly. It is a
component-contract skill, not a card-writing skill: the story layers must
already exist.

## Required references

Read `../../references/html-card-components.md` and the HTML card components
section of `../../references/platform-facts.md`.

## Workflow

1. Map each need to a component from the reference: action, moving number,
   fact, label, optional detail, intake, grouping, speech.
2. Write the markup with every attribute explained in the plan, and `send`
   texts written as the player would say them.
3. Check the budget: what the model must emit each turn stays small; repeated
   chrome moves into a display rule (`hearthroom-presentation-director`).
4. Verify with `hearthroom card render --json`: the components appear under
   `report.components`, no rule rolled back, nothing unexpected under
   `report.unsupported`. Then look at the play page on two widths.
5. Hand the markup to `hearthroom-card-author` for the fields, or return the
   patch to `hearthroom-card-doctor` when it was a repair.

## Hand-off

```text
Components:
- element, attributes, purpose (one line each)
- where it lives: opening | reply pattern | display rule
- budget note:
- render check: done | pending
```

## Do not

- Do not invent components or attributes.
- Do not put scripts inside content markup; use display rules.
- Do not use a bar for a word.
