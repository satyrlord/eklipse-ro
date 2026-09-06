# eklipse Website Instructions

## Commands

```sh
npm install
npm run dev
npm run typecheck
npm run lint:markdown
npm run lint:dead-code
npm test
npm run test:coverage
npm run test:browser
npm run build
npm run preview
npm run ci
```

`npm run test:browser` first runs Playwright against a normal production build.
It then repeats the browser suite with Istanbul instrumentation and writes the
NYC report under `tmp/coverage/browser`. Normal production builds do not contain
coverage instrumentation.

## Structure

```text
index.html                 HTML entry point and catalog template
src/release-catalog.ts     catalog facts and release markup
src/render-catalog.ts      build-time renderer that expands the catalog template
src/main.ts                browser runtime
src/runtime.ts             typed runtime calculations
src/styles.css             Tailwind, daisyUI, tokens, layout, and motion
src/release-sequence.css   current-release section styles
vite.config.ts             Tailwind and conditional Istanbul setup
vitest.config.ts           Vitest and V8 coverage setup
playwright.config.ts       production-browser test setup
scripts/                   TypeScript tool scripts
public/                    assets, error page, and server configuration
tests/                     policy, unit, and browser tests
tmp/                       ignored build and coverage artifacts
PRODUCT.md                 product contract
DESIGN.md                  visual contract
GLOSSARY.md                shared technical terms
AGENTS.md                  repository rules
```

## Tests

`npm test` runs product, asset, security, deployment, design-token,
documentation, and runtime tests with Vitest. The static page tests use one
shared jsdom fixture.

Author catalog facts and release markup in `src/release-catalog.ts`.
`src/render-catalog.ts` expands the `<!-- release-sequence:* -->` and
`<!-- archive-track:* -->` regions of `index.html` at build time through a Vite
`transformIndexHtml` hook. Change release facts and markup in
`src/release-catalog.ts`. The test ledger helper re-exports these records.
Update affected contracts and fixed test assertions with each catalog change.
Add official cover assets when necessary.
When the latest release changes, update its threshold content and metadata in
the source `index.html` template. Keep the renderer-owned catalog regions intact.

`npm run test:coverage` records V8 coverage for TypeScript source. The browser
gate records Istanbul coverage for the real production bundle. No coverage
threshold exists yet. Add one only after the repository has a measured baseline
and an accepted contract.

The browser tests check title fit, overflow, archive geometry, focus, reduced
motion, assets, player metadata, local requests, and console errors in Chromium.
The deployment workflow runs the full gate before it rebuilds `dist/`.

The [verify-site workflow](.github/skills/verify-site/SKILL.md) owns the broader
manual production-browser check.

## Product source

- Treat `PRODUCT.md` and the official eklipse Bandcamp catalog as product truth.
- Spell the artist name `eklipse`, always lowercase.
- Do not invent release facts, testimonials, listener counts, press quotes,
  prices, or availability claims.
- Preserve album titles and release chronology exactly as published on Bandcamp.

## Writing style

- Use ASD-STE100 Simplified Technical English for technical prose.
- Use strict STE for procedures, safety text, and error messages.
- Use STE-flavored prose for general technical discussion and project documents.
- Use one name for each item. Use one word for each meaning.
- Use active voice, short sentences, and plain verbs.
- Limit procedural sentences to 20 words. Limit descriptive sentences to 25
  words.
- Give each instruction one action. Put a condition before its action.
- Keep each paragraph on one topic. Use no more than six sentences per
  paragraph.
- Do not use contractions, prose semicolons, or emoji.
- Apply these rules to comments, error messages, AI prompts, and skill metadata.
- Preserve code syntax, identifiers, paths, commands, URLs, and published
  release titles.
- Preserve third-party license text and exact quotations used as evidence.
- Avoid idioms.
- Use the [project glossary](GLOSSARY.md) for technical terms.
- Keep product copy factual and separate from technical instructions.

Use [ASD-STE100 Issue
9](https://www.asd-ste100.org/assets/files/ASD-STE100_ISSUE9.pdf)
to check word meanings and writing rules. Markdown lint and pattern scans do
not prove full STE compliance. Report the review method and its limits.

## Security boundary

- Keep the production site static and read-only.
- Do not add forms, user comments, authentication, cookies, analytics, trackers,
  databases, APIs, or server-side code.
- Do not add runtime third-party scripts.
- Allow official Bandcamp album players only for current releases in the catalog
  ledger.
- Require every allowed player source to start with
  `https://bandcamp.com/EmbeddedPlayer/`.
- Keep archive originals link-only.
- Restrict outbound anchors to `https://eklipse-music.bandcamp.com/` and its
  `/album/` pages.
- Allow internal fragment links for page navigation.
- Allow `/` as the error page return link.
- Self-host production assets when possible.
- Do not route passwords, tokens, or keys through the model. Tell the user to
  enter them directly.

## Source and change workflow

- Read `PRODUCT.md`, `package.json`, the changed source, its tests, and the
  deployment files before material work.
- Use current repository files and official Bandcamp pages as evidence.
- Treat `package.json` as the source for repository commands.
- Do not invent commands, thresholds, release facts, or compatibility claims.
- Preserve unrelated dirty or staged work.
- Re-read a file immediately before you edit when another change may affect it.
- Keep code, tests, product documents, and behavior visible to users consistent.
- Update `PRODUCT.md` or a relevant test when an accepted product contract
  changes.
- Keep generated `dist/` output out of source edits.
- Put temporary artifacts under the ignored `tmp/` folder.
- Use the repository skill catalog in
  [.github/skills/SKILLS.md](.github/skills/SKILLS.md) when a workflow matches
  the task.
- Do not commit changes unless the user asks.

## Verification

- Give every change an objective check.
- Run `npm test` for source and policy tests.
- Run `npm run build` for a clean production build when `dist/` is safe to
  regenerate.
- When tracked `dist/` files are dirty, build to an ignored path with
  `npm run build -- --outDir tmp/quality-dist`.
- Use a real browser with the production build for layout, keyboard, focus,
  image, iframe, and console evidence.
- Do not claim host behavior from local files alone.
- Separate verified facts, evidence-supported inferences, assumptions, and
  unresolved questions.

## Delivery

- The build process must produce output that deploys directly to
  `/home/eklipse/public_html`.
- Check the production output, responsive layout, keyboard access, allowed
  links, and security headers before deployment.
- Never store cPanel, FTP, or deployment secrets in the repository.

## Deployment

The deployment target is `/home/eklipse/public_html`. The GitHub workflow in
[build-dist.yml](.github/workflows/build-dist.yml) builds and publishes `dist/`.
The hosting setup requires a cPanel cron to deploy the managed repository.
Local files do not prove that the cron runs on the host.
The [cPanel task](.cpanel.yml) clears site-owned assets and root files before
it copies the build. Keep removed site-owned root paths in the cleanup command.
This prevents an older deployment from leaving those files public.

## Close-out

- Inspect current status, the complete diff, and recent history before you
  summarize work.
- List each low-confidence finding with one concrete verification command or
  procedure.
- List skipped, incomplete, and postponed work.
- State assumptions that are not recorded and the largest remaining blind spot.
- Do not start a new repair cycle during close-out.

## General agent operating instructions

### Priority and scope

- Follow the runtime instruction hierarchy.
- Apply these repository rules within that hierarchy.
- Resolve equal-priority conflicts by specificity, then recency.
- Complete authorized work through verification.
- Ask only for a blocking decision or required approval.
- Use reversible defaults when the request permits them. State material
  assumptions.
- Keep reviews read-only unless the user authorizes repairs.

### Delegation and concurrency

- Batch independent tool calls. Inspect every result.
- Use `Promise.allSettled` when partial results help.
- Use `Promise.all` only when one failure must stop the batch.
- Run dependent calls, adaptive investigations, waits, approvals, and
  conflicting edits in sequence.
- Delegate useful independent work when the environment supports agents.
- Give each worker a scope, file ownership, expected output, and verification
  method.
- Use exploration workers for source inspection and evidence collection.
- Use execution workers for bounded implementation and mechanical changes.
- Keep planning, implementation, integration, and review distinct. One worker
  can perform several roles.
- The coordinator owns the plan, integration, conflict resolution, and final
  review.
- Avoid overlapping edits unless ownership and merge order are explicit.
- Keep the coordinator available for user input and worker results.

Use the standard effort setting by default. Use low effort only for mechanical
work. Increase effort for difficult implementation, debugging, or review.
Use very high effort for architecture, security, concurrency, or major
ambiguity.
Use maximum effort only for escalation. Use only settings that the tool
supports.

Prefer lower-cost workers when they can meet the verification requirements.

### Evidence and documentation

- Inspect applicable product, design, source, test, and deployment documents
  before material work.
- Verify material claims with current primary sources or direct checks.
- Give each unresolved question a concrete check, such as a command, test, file,
  or query.
- Do not assign a worker a vague doubt without a verification method.
- State uncertainty that remains after verification.
- Update affected specifications and documentation after a change.
- Resolve conflicting documentation in the files that own the rules.
- Add compatibility code only when a document defines its contract.
- Remove scaffolding that only supports an intermediate implementation phase.
- Keep temporary compatibility work only for deployment, migration, review,
  rollback, or risk control.

### Verification evidence

- Prefer meaningful automated checks.
- Use representative real-world fixtures for performance measurements.
- Record the environment, workload, method, and result for each performance
  claim.
- State missing measurements. Do not present estimates as measurements.
- Test environment-sensitive behavior with the built artifact in a minimal
  supported local runtime.
- Do not assume development-only permissions or infrastructure exist in
  production.
- Do not publish changes only to reproduce a condition that you can test
  locally.

### Independent review

- Run one self-review before completion.
- For large, risky, or difficult changes, obtain independent review from a clean
  context when available.
- Give the reviewer the plan, changes, evidence, verification results, and
  proposed handoff.
- Ask the reviewer to identify what the work may have missed.
- Report the findings and any unavailable review.
