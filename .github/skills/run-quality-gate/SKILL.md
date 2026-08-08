---
name: run-quality-gate
description: "Run or repair the eklipse static-site quality gate. Use for release readiness, build or test failures, security checks, responsive checks, or cPanel deployment validation."
---

# Run Quality Gate

Run the relevant repository gates and report objective PASS, FAIL, BLOCKED, or N/A evidence.

## 1. Select the mode

1. Use verify mode unless the user explicitly requests repairs.
2. Keep verify mode read-only.
3. In repair mode, capture the exact failure before you edit.
4. Repair the smallest in-scope root cause and rerun the failed gate.
5. Do not add suppressions, exclusions, disabled rules, or lower thresholds.

## 2. Discover the current gate

1. Read `AGENTS.md`, `PRODUCT.md`, `package.json`, changed files, tests, and `public/.htaccess`.
2. Read `package.json` before you choose a repository command.
3. Inspect `git status --short` before a build.
4. Build to an ignored `tmp/` output path when tracked `dist/` files are dirty.
5. Mark each required check as configured, blocked, or not available.

## 3. Run the gates

Run these checks in order.

1. Run `npm test`.
2. Run `npm run build` when `dist/` is safe to regenerate.
3. Otherwise run `npm run build -- --outDir tmp/quality-dist`.
4. Check every external anchor against the Bandcamp allowlist.
5. Allow internal fragment anchors.
6. Allow only `https://bandcamp.com/EmbeddedPlayer/` iframe sources for ledger releases.
7. Reject all other runtime third-party scripts, frames, forms, input controls, and data submission paths.
8. Check that referenced images, fonts, stylesheets, and scripts resolve from self-hosted paths.
9. Check `.htaccess` for the method, HTTPS, CSP, and security-header rules required by the project.
10. Run real-browser QA for supported desktop and mobile widths.

## 4. Check browser behavior

Use [verify-site](../verify-site/SKILL.md) for the browser procedure.

Check keyboard focus, skip-link behavior, fragment navigation, image load, overflow, reduced motion, allowed Bandcamp frames, and console errors.

A screenshot does not prove interaction or state. Add a semantic or computed-style assertion for every changed browser contract.

## 5. Report the gate

Report each command, procedure, status, and concise evidence.

Separate failures found before this work from failures caused by the scoped change.

Report every unavailable browser, hosting, or credential-dependent check.

Do not claim a cPanel result from local build evidence alone.
