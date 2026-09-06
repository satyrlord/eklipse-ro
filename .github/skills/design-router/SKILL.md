---
name: design-router
description: "Select a bundled theme for a requested UI style. Use Gravitational Press for eklipse work unless the user requests a restyle."
license: MIT
metadata:
  author: typeui.sh catalog, user router, eklipse adaptation
---

# Design Skill Router

This skill bundles 67 design themes from typeui.sh. Each theme lives in
`themes/<slug>.md`, relative to this file. Each theme contains brand direction,
tokens, copy tone, design intent, and style-specific rules. Read
[`GUIDANCE.md`](GUIDANCE.md) before a theme reference. It owns shared workflow,
accessibility, component, and quality rules.

## eklipse adaptation

This skill is adapted for the eklipse repository. The repository has one
canonical design system, "Gravitational Press", in
[`DESIGN.md`](../../../DESIGN.md). Use that system for all eklipse site UI.

Read [`AGENTS.md`](../../../AGENTS.md) for the repository writing, security,
and delivery rules. Read [`DESIGN.md`](../../../DESIGN.md) for the implemented
visual rules. These documents own the full contracts.

### Translation boundary

When a user requests a catalog theme for eklipse, translate its visual
direction through the eklipse contracts:

- Keep the static, read-only site boundary from `AGENTS.md`.
- Keep official Bandcamp players, allowed links, self-hosted assets, and the
  English interface from `AGENTS.md`.
- Keep the Gravitational Press structure, typography, shapes, motion, focus,
  route, and named rules from `DESIGN.md`.
- Keep every album title on one row at every page size.
- Change visual direction only where the request permits it. Record a conflict
  when a catalog rule cannot fit the eklipse contract.

Read [`CATALOG.md`](CATALOG.md) for the 67-theme selection matrix, fit notes,
and quick defaults. The matrix is advisory. The user makes the final choice.

## Invocation and output

Use one branch for each request:

1. For eklipse site UI without an explicit restyle request, read
   [`DESIGN.md`](../../../DESIGN.md) and use Gravitational Press. Stop theme
   selection. Check: the proposed work follows the named rules and the
   static-site boundary.
2. For an explicit restyle or named aesthetic, identify one slug in
   [`CATALOG.md`](CATALOG.md). Read its theme file. Translate its rules through
   the eklipse constraints. Check: the output names one theme and states any
   required adaptation.
3. For an exact theme slug, read `themes/<slug>.md` directly. Check: the slug
   matches one file and the output uses that file as its design reference.
4. For an ambiguous request, ask for one visual direction. If the user asks
   for a default, use `clean` for an app and `modern` for a marketing site.
   Check: the output records the selected slug or the unanswered choice.

If the request does not concern UI or visual direction, report that this skill
does not apply. Check: no theme is selected for an unrelated request.

## Selection and authority

The router may select a theme from the request or use the eklipse default branch.
Selection identifies a design reference. It does not authorize edits beyond the
user request. Keep the user request, `AGENTS.md`, and `DESIGN.md` as the sources
of authority for any implementation change.

## Completion criterion

The router is complete when the agent selects one branch and reads its design
reference and required contracts. The output names the adaptation and its check.
An unrelated request or an unresolved ambiguous request is incomplete.
