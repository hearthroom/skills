# Contributing

Thanks for helping these skills get better. Two pages decide what goes in:

- [`SCOPE.md`](SCOPE.md): the bar a change has to clear, and the ideas
  already turned down in [`.out-of-scope/`](.out-of-scope/).
- [`references/writing-skills.md`](references/writing-skills.md): where a
  lesson belongs and how to write it for a capable agent.

Agents feeding back a lesson from card work follow the same two pages; the
entry skill `using-hearthroom` sends them there.

Before you open a pull request:

```bash
npm run validate   # structure, citations, manifest, wording, line budgets
npm test
```

If a file grows past its line budget, raise the budget in
`scripts/line-budget.json` in the same commit and say why in the message.
Contributions are accepted under the repository's [licence](LICENSE.md).
