---
name: deslop
description: "Remove unsupported, synthetic, redundant, or generated-sounding content from the eklipse static site without changing valid facts, behavior, security boundaries, or album information. Use only when the user explicitly requests this cleanup."
---

# Deslop

Slop conflicts with product truth, the official Bandcamp catalog, repository rules, current behavior, or the user's voice.

## Branch References

Load every applicable rule set before judging a file:

- Code: [CODE.md](CODE.md)
- Prose: [PROSE.md](PROSE.md)
- Data and configuration: [DATA.md](DATA.md)
- Tests: [TEST.md](TEST.md)

## Process

1. Inventory in-scope files as source, generated, vendored, locked, or binary.
2. Use `PRODUCT.md`, `.github/copilot-instructions.md`, official Bandcamp pages, and current sibling source as comparison evidence.
3. Mark only content lacking a valid factual, behavioral, contractual, accessibility, or stylistic reason.
4. Remove the smallest proven slop while preserving release facts, album titles, security controls, responsive behavior, and outbound-link restrictions.
5. Validate each edit group with the narrowest applicable build, test, or browser check.
6. Re-read every scoped source file after editing.

## eklipse Boundaries

- The artist name is `eklipse`, lowercase.
- Bandcamp is the authority for project and release facts.
- Do not invent catalog codes, coordinates, metrics, quotes, dates, genres, or narrative framing.
- Do not remove the no-user-input boundary or the Bandcamp-only outbound-link boundary.
- Treat an iframe as valid only when its source starts with `https://bandcamp.com/EmbeddedPlayer/` and the release belongs to the ledger.
- Edit source files, never generated `dist/` output.

## Completion

Report edited files, removed slop categories, excluded files, validation evidence, existing failures, and unverified behavior.
