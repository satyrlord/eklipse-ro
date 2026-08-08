---
name: deslop
description: "Remove unsupported or synthetic content from the eklipse static site. Preserve facts, behavior, security boundaries, and album information. Use only for explicit cleanup requests."
---

# Remove unsupported content

Unsupported content conflicts with product truth, the official Bandcamp catalog, repository rules, current behavior, or the user's voice.

## Branch References

Read every relevant rule set before you assess a file:

- Code: [CODE.md](CODE.md)
- Prose: [PROSE.md](PROSE.md)
- Data and configuration: [DATA.md](DATA.md)
- Tests: [TEST.md](TEST.md)

## Process

1. Inventory in-scope files as source, generated, vendored, locked, or binary.
2. Use `PRODUCT.md`, `.github/copilot-instructions.md`, official Bandcamp pages, and current sibling source as evidence for comparison.
3. Mark only content that lacks a valid factual, behavioral, contractual, accessibility, or stylistic reason.
4. Remove the smallest proven unsupported content. Keep release facts, album titles, security controls, responsive behavior, and outbound-link restrictions.
5. Validate each edit group with the narrowest relevant build, test, or browser check.
6. Re-read every source file in scope after you edit.

## eklipse Boundaries

- The artist name is `eklipse`, lowercase.
- Bandcamp is the authority for project and release facts.
- Do not invent catalog codes, coordinates, metrics, quotes, dates, genres, or narrative framing.
- Do not remove the no-user-input boundary or the Bandcamp-only outbound-link boundary.
- Allow an iframe only when its source starts with `https://bandcamp.com/EmbeddedPlayer/` and the release is in the ledger.
- Edit source files, never generated `dist/` output.

## Completion

Report edited files, removed-content categories, excluded files, validation evidence, failures found before this work, and behavior that you did not verify.
