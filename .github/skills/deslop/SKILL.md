---
name: deslop
description: "Remove unsupported eklipse site content. Use only for explicit cleanup requests."
---

# Remove unsupported content

Unsupported content conflicts with product truth, the official Bandcamp catalog, repository rules, current behavior, or the user's voice.

Use this skill only after an explicit cleanup request. It removes source content.
It affects public behavior when rendered content changes.

## Branch References

Read each rule set that applies before you assess a file:

- Code: [CODE.md](CODE.md)
- Prose: [PROSE.md](PROSE.md)
- Data and configuration: [DATA.md](DATA.md)
- Tests: [TEST.md](TEST.md)

## 1. Establish the scope

1. Inventory in-scope files as source, generated, vendored, locked, or binary.
   Completion criterion: Each in-scope file has one classification.
2. Use `PRODUCT.md`, `.github/copilot-instructions.md`, official Bandcamp pages, and current related source as evidence for comparison.
   Completion criterion: Each proposed removal has an evidence source.
3. Mark only content that lacks a valid factual, behavioral, contractual, accessibility, or stylistic reason.
   Completion criterion: Each marked item has a stated missing reason.
4. Remove the smallest proven unsupported content.
   Completion criterion: The edit removes only content with direct evidence.
5. Preserve release facts, album titles, security controls, responsive behavior, and outbound-link restrictions.
   Completion criterion: The edit removes no supported content or protected behavior.
6. Validate each edit group with the narrowest relevant build, test, or browser check.
   Completion criterion: Each edit group has a recorded check result.
7. Re-read every source file in scope after you edit.
   Completion criterion: Each edited source file matches the intended cleanup.

## eklipse Boundaries

- The artist name is `eklipse`, lowercase.
- Bandcamp is the authority for project and release facts.
- Do not invent catalog codes, coordinates, metrics, quotes, dates, genres, or narrative framing.
- Do not remove the no-user-input or Bandcamp-only outbound-link boundary.
- Allow an iframe only when its source starts with `https://bandcamp.com/EmbeddedPlayer/` and the release is in the ledger.
- Edit source files. Never edit generated `dist/` output.

## Completion criterion

The cleanup is complete when the report lists edited files, removed-content categories, excluded files, and validation evidence.
It also lists failures found before this work and behavior that you did not verify.
