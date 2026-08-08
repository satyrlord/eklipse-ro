---
name: run-quality-gate
description: "Run or repair the eklipse static-site gate for tests, builds, security, browser, or deployment checks."
---

# Run Quality Gate

Run the relevant repository gates and report objective PASS, FAIL, BLOCKED, or
N/A evidence.

Use this skill only after an explicit quality-gate request. It runs tests,
builds, policy checks, and browser checks.
Repair mode changes source files.

## 1. Select the mode

1. Use verify mode unless the user explicitly requests repairs.
   Completion criterion: The run has one declared mode.
2. Keep verify mode read-only.
   Completion criterion: Verify mode makes no source changes.
3. In repair mode, capture the exact failure before you edit.
   Completion criterion: Each repair has a recorded initial failure.
4. Repair the smallest in-scope root cause and rerun the failed gate.
   Completion criterion: Each repair has a rerun result.
5. Do not add suppressions, exclusions, disabled rules, or lower thresholds.
   Completion criterion: Existing gate strength is unchanged.

## 2. Discover the current gate

1. Read `AGENTS.md`, `PRODUCT.md`, `package.json`, changed files, tests, and
   `public/.htaccess`.
   Completion criterion: Repository rules, contracts, commands, and gate
   inputs are available.
2. Use `package.json` to choose repository commands.
   Completion criterion: Every selected command exists in `package.json`.
3. Inspect `git status --short` before a build.
   Completion criterion: The build target is safe for the current worktree.
4. Build to an ignored `tmp/` output path when tracked `dist/` files are dirty.
   Completion criterion: A dirty tracked `dist/` is not overwritten.
5. Mark each required check as configured, blocked, or not available.
   Completion criterion: Every required check has one status.

## 3. Run the gates

Run these checks in order. Use the commands from `package.json`.

1. Run `npm run typecheck`.
   Completion criterion: TypeScript reports no errors.
2. Run `npm run lint:markdown`.
   Completion criterion: The owning project documents pass Markdownlint.
3. Run `npm run lint:dead-code`.
   Completion criterion: Fallow reports no unused code or dependency issue.
4. Run `npm run test:coverage`.
   Completion criterion: Vitest passes and records V8 coverage.
5. Run `npm run test:browser`.
   Completion criterion: Playwright passes on the normal and instrumented
   builds, and NYC reports browser coverage.
6. Run `npm run build` when `dist/` is safe to regenerate.
   Completion criterion: The build result is recorded.
7. Otherwise run `npm run build -- --outDir tmp/quality-dist`.
   Completion criterion: The dirty-worktree build writes only to ignored output.
8. Check every external anchor against the Bandcamp allowlist.
   Completion criterion: Each external anchor is allowed or reported.
9. Allow internal fragment anchors.
   Completion criterion: Internal fragment anchors remain available.
10. Allow only `https://bandcamp.com/EmbeddedPlayer/` iframe sources for
    ledger releases.
    Completion criterion: Each iframe source and release classification passes
    the rule.
11. Reject all other runtime third-party scripts, frames, forms, input
    controls, and data submission paths.
   Completion criterion: No disallowed runtime surface remains.
12. Check that referenced images, fonts, stylesheets, and scripts resolve from
    self-hosted paths.
   Completion criterion: Each local reference resolves.
13. Check `.htaccess` for the method, HTTPS, CSP, and security-header rules
    required by the project.
   Completion criterion: Each required `.htaccess` rule is present or reported.
14. Run the [verify-site](../verify-site/SKILL.md) browser procedure for
    supported desktop and mobile widths.
    Completion criterion: Browser evidence or a clear blocker is recorded.

## 4. Require browser evidence

1. Require direct browser evidence for every changed browser contract.
   Completion criterion: Each changed browser contract has evidence or a
   blocker.

2. Require a semantic or computed-style assertion for every changed browser
   contract.
   Completion criterion: A screenshot is not the only evidence for interaction
   or state.

The [verify-site](../verify-site/SKILL.md) skill owns the detailed browser procedure.

## 5. Report the gate

1. Report each command, procedure, status, and concise evidence.
   Completion criterion: Every run step has a result and evidence.

2. Separate failures found before this work from failures caused by the scoped
   change.
   Completion criterion: Failure ownership is explicit.

3. Report every unavailable browser, hosting, or credential-dependent check.
   Completion criterion: Every unavailable check is marked `BLOCKED` or
   `N/A`.

4. Do not claim a cPanel result from local build evidence alone.
   Completion criterion: The report separates local evidence from cPanel
   evidence.

## Completion criterion

The gate is complete when each required check has a result and evidence or an
explicit blocker.
Every authorized repair must pass its rerun.
