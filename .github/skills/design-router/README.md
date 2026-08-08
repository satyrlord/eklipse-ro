# Design Router Skill

A single Claude Code skill bundles 67 design themes from the
[typeui.sh](https://www.typeui.sh/design-skills) registry. The
[bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills)
source has an MIT license.

## eklipse project adaptation

This copy is adapted for the eklipse repository. The repository has a canonical
design system: "Gravitational Press". `DESIGN.md` at the repository root defines
the system. Use that system for eklipse site UI by default. Use the catalog
themes for exploration only. Pass every theme through the eklipse constraints
in `SKILL.md`. In this repository, the skill lives in
`.github/skills/design-router/`. It is mirrored in
`.agents/skills/design-router/`.

Structure:

- [SKILL.md](SKILL.md): the router. It maps a desired
  style to a theme in a categorized catalog.
- `design-router/themes/<slug>.md`: 67 theme files. Each file defines tokens,
  typography, spacing, component rules, quality gates, and design intent. The
  content comes from the registry `SKILL.md` and `DESIGN.md` files.
- `design-router/registry-index.json`: the registry index for updates.

## Reusing across projects

**Global (recommended)** — available in every project:

```powershell
New-Item -ItemType Junction `
  -Path "$env:USERPROFILE\.claude\skills\design-router" `
  -Target "D:\dev\_skills\design-router"
```

**Per project:**

```powershell
New-Item -ItemType Junction `
  -Path "<project>\.claude\skills\design-router" `
  -Target "D:\dev\_skills\design-router"
```

Or just copy the `design-router` folder into `<project>\.claude\skills\`.

In the eklipse repository, the adapted skill already lives in
`.github/skills/design-router/` and is mirrored in `.agents/skills/design-router/`.
Keep the two copies in sync when you change the skill.

## Updating themes

Clone
[bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills)
again. For each `skills/<slug>/` folder, remove the frontmatter from `SKILL.md`.
Append `DESIGN.md` under a `## Design intent (from DESIGN.md)` heading. Save the
result as `design-router/themes/<slug>.md`.

Format the imported Markdown to the repository standard. Then run
`npm run lint:markdown`. Do not complete the update until all repository
Markdown files pass.
