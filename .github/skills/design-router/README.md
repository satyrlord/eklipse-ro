# Design Router Skill

A single Claude Code skill bundling 67 design themes from the [typeui.sh](https://www.typeui.sh/design-skills) registry ([bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills), MIT licensed).

## eklipse project adaptation

This copy is adapted for the eklipse repository. The repository has a canonical design system: "Gravitational Press", documented in `DESIGN.md` at the repository root. Use that system for eklipse site UI by default. Use the catalog themes for exploration only. Pass every theme through the eklipse constraints in `SKILL.md`. In this repository the skill lives in `.github/skills/design-router/` and is mirrored in `.agents/skills/design-router/`.

Structure:

- [design-router/SKILL.md](design-router/SKILL.md) — the router: categorized catalog mapping a desired vibe to a theme
- `design-router/themes/<slug>.md` — 67 theme files, each a full design system (tokens, typography, spacing, component rules, quality gates, design intent — merged from the registry's SKILL.md + DESIGN.md)
- `design-router/registry-index.json` — registry index, kept for updates

## Reusing across projects

**Global (recommended)** — available in every project:

```powershell
New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\skills\design-router" -Target "D:\dev\_skills\design-router"
```

**Per project:**

```powershell
New-Item -ItemType Junction -Path "<project>\.claude\skills\design-router" -Target "D:\dev\_skills\design-router"
```

Or just copy the `design-router` folder into `<project>\.claude\skills\`.

In the eklipse repository, the adapted skill already lives in
`.github/skills/design-router/` and is mirrored in `.agents/skills/design-router/`.
Keep the two copies in sync when you change the skill.

## Updating themes

Re-clone [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills), then for each `skills/<slug>/`, strip the frontmatter from `SKILL.md`, append `DESIGN.md` under a `## Design intent (from DESIGN.md)` heading, and save as `design-router/themes/<slug>.md`.
