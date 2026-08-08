---
name: verify-site
description: "Verify the eklipse production build in a real browser. Check layout, focus, assets, policy, and console behavior."
---

# Verify Site

Verify observable behavior in the built static site. Stay read-only unless the
user explicitly requests repairs.

Use this skill only after an explicit browser-verification request. It starts a
local build and preview server and records browser evidence.

## 1. Prepare the evidence

1. Read `AGENTS.md`, `PRODUCT.md`, `package.json`, changed files, tests, and
   `public/.htaccess`.
   Completion criterion: Site rules, commands, changed behavior, and security
   inputs are available.
2. Inspect `git status --short` before you build.
   Completion criterion: The selected build output is safe for the current worktree.
3. Use `npm run build` when tracked `dist/` files are clean.
   Completion criterion: The clean build result is recorded.
4. Use `npm run build -- --outDir tmp/verify-<slug>` when tracked `dist/` files
   are dirty.
   Completion criterion: The dirty-worktree build writes only to ignored output.
5. Use `npm run preview -- --host 127.0.0.1 --port 4173 --strictPort` to serve
   the selected build.
   Completion criterion: The selected build is available at the exact local
   origin or the step is blocked.
6. Record the browser name, version, viewport, and reduced-motion setting.
   Completion criterion: Each browser run has its environment recorded.

If a required script or browser is unavailable, report the check as BLOCKED.

## 2. Check static policy

1. Check every external anchor against the allowed eklipse Bandcamp project
   and album paths.
   Completion criterion: Each external anchor is allowed or reported.
2. Allow internal fragment links.
   Completion criterion: Internal fragment links remain available.
3. Allow an iframe only when its source starts with
   `https://bandcamp.com/EmbeddedPlayer/` and the release belongs to the ledger.
   Completion criterion: Each iframe passes the source and ledger checks.
4. Reject all other external frames and runtime scripts.
   Completion criterion: No disallowed external frame or runtime script remains.
5. Reject forms, input controls, user comments, authentication, analytics,
   trackers, and data-submission code.
   Completion criterion: No disallowed input or data path remains.
6. Check that local images, fonts, stylesheets, and scripts resolve.
   Completion criterion: Each local asset reference resolves.
7. Check that the built output includes the required static security configuration.
   Completion criterion: Each required security rule is present or reported.

## 3. Check the browser

1. Open the production build at the exact local origin.
   Completion criterion: The browser uses the selected build and origin.
2. Test at a narrow mobile width, the 480px and 820px layout boundaries, and a
   desktop width.
   Completion criterion: Each required viewport has a recorded result.
3. Use the skip link with the keyboard.
   Completion criterion: The skip link moves focus to its target.
4. Tab through every visible link and record missing or unclear focus.
   Completion criterion: Every visible link has a focus result.
5. Activate fragment links and confirm the target section becomes visible.
   Completion criterion: Each tested fragment link reaches its target.
6. Confirm every image loads and has useful alternative text.
   Completion criterion: Each image has a load result and useful alternative text.
7. Confirm every visible Bandcamp player has the correct title and allowed source.
   Completion criterion: Each visible player passes its title and source checks.
8. Check overflow, clipped text, horizontal scroll, and unexpected layout shift.
   Completion criterion: Each viewport has a layout result.
9. Repeat the visual checks with reduced motion enabled.
   Completion criterion: Reduced-motion behavior has a recorded result.
10. Record console errors and unexpected network requests.
    Completion criterion: Console and network results are recorded.

Use semantic assertions for focus, links, sources, text, and geometry. A
screenshot alone does not prove interaction or state.

## 4. Close the run

1. Store screenshots and reports only under an ignored `tmp/verify-<slug>/`
   path.
   Completion criterion: No verification artifact is outside ignored temporary output.
2. Stop the preview server and close the browser.
   Completion criterion: The local preview and browser are closed.
3. Recheck `git status --short`.
   Completion criterion: The final worktree status is recorded.
4. Report each check, result, blocker, and claim that you did not verify.
   Completion criterion: The report distinguishes evidence, blockers, and
   unverified claims.

Do not claim cPanel behavior, Bandcamp playback quality, or physical listening
evidence from this procedure.

## Completion criterion

Verification is complete when every changed site contract has direct browser or
static-policy evidence, or an explicit blocker.
