---
name: verify-site
description: "Verify the eklipse production build in a real browser. Use for responsive layout, keyboard access, focus, image loading, Bandcamp player, console, security-policy, or release-readiness checks."
---

# Verify Site

Verify observable behavior in the built static site. Stay read-only unless the user explicitly requests repairs.

## 1. Prepare the evidence

1. Read `AGENTS.md`, `PRODUCT.md`, `package.json`, changed files, tests, and `public/.htaccess`.
2. Inspect `git status --short` before building.
3. Use `npm run build` when tracked `dist/` files are clean.
4. Use `npm run build -- --outDir tmp/verify-<slug>` when tracked `dist/` files are dirty.
5. Use `npm run preview -- --host 127.0.0.1 --port 4173 --strictPort` to serve the selected build.
6. Record the browser name, version, viewport, and reduced-motion setting.

If a required script or browser is unavailable, report the check as BLOCKED.

## 2. Check static policy

1. Check every external anchor against the allowed eklipse Bandcamp project and album paths.
2. Allow internal fragment links.
3. Allow an iframe only when its source starts with `https://bandcamp.com/EmbeddedPlayer/` and the release belongs to the ledger.
4. Reject all other external frames and runtime scripts.
5. Reject forms, input controls, user comments, authentication, analytics, trackers, and data-submission code.
6. Check that local images, fonts, stylesheets, and scripts resolve.
7. Check that the built output includes the required static security configuration.

## 3. Check the browser

1. Open the production build at the exact local origin.
2. Test at a narrow mobile width, the 480px and 820px layout boundaries, and a desktop width.
3. Use the skip link with the keyboard.
4. Tab through every visible link and record missing or unclear focus.
5. Activate fragment links and confirm the target section becomes visible.
6. Confirm every image loads and has useful alternative text.
7. Confirm every visible Bandcamp player has the correct title and allowed source.
8. Check overflow, clipped text, horizontal scrolling, and unexpected layout shift.
9. Repeat the visual checks with reduced motion enabled.
10. Record console errors and unexpected network requests.

Use semantic assertions for focus, links, sources, text, and geometry. A screenshot alone does not prove interaction or state.

## 4. Close the run

1. Store screenshots and reports only under an ignored `tmp/verify-<slug>/` path.
2. Stop the preview server and close the browser.
3. Recheck `git status --short`.
4. Report each assertion, result, blocker, and unverified claim.

Do not claim cPanel behavior, Bandcamp playback quality, or physical listening evidence from this procedure.

## Completion criterion

Verification is complete when every changed site contract has direct browser or static-policy evidence, or an explicit blocker.
