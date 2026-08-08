# eklipse website

A static single-page site for **eklipse**, a Romanian underground electronic
music project. The site presents the full catalog and guides listeners to the
official Bandcamp pages.

## Product

- One responsive single-page experience with a space theme.
- The first viewport presents `Introspection I (remastered edition)`.
- English is the only interface and metadata language.
- Outbound links go only to official eklipse Bandcamp pages.
- The site is static and read-only.
- The site has no forms, comments, authentication, analytics, or server code.

Product truth is in [PRODUCT.md](PRODUCT.md). Repository rules are in
[AGENTS.md](AGENTS.md).

## Runtime

Use Node.js 24.19.0 or a newer Node.js 24 release. Node.js 24 is the supported
LTS release line for local development, tests, and production builds.

## Stack

- Vite 8.2.1 builds and serves the static site.
- TypeScript 7.0.2 checks the application and tool configuration.
- Tailwind CSS 4.3.3 uses the Vite plugin at version 4.3.3.
- daisyUI 5.7.16 provides the eklipse theme and action components.
- Vitest 4.1.10 runs policy and unit tests.
- `@vitest/coverage-v8` 4.1.10 records unit coverage.
- Playwright 1.62.1 verifies the production build in Chromium.
- `vite-plugin-istanbul` 9.0.1 instruments browser test builds.
- NYC 18.0.0 reports browser coverage.
- jsdom 30.0.1 provides DOM fixtures for static policy tests.
- tsx 4.23.11 runs the cross-platform browser test script.
- markdownlint-cli2 0.23.2 checks all repository Markdown files.
- Fallow 3.14.0 checks unused code and dependency use.

The application has no frontend framework. It uses semantic HTML, one TypeScript
runtime, and the existing Gravitational Press CSS system. Tailwind and daisyUI
extend that CSS without replacing the documented visual direction.

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
src/release-catalog.mjs    single source of truth for release facts and markup
src/render-catalog.mjs     build-time renderer that expands the catalog template
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
AGENTS.md                  repository rules
```

## Tests

`npm test` runs the product, asset, security, deployment, design-token, and
runtime tests with Vitest. The static tests use one shared jsdom fixture.

The catalog is authored once in `src/release-catalog.mjs` (facts plus per-release
markup). `src/render-catalog.mjs` expands the `<!-- release-sequence:* -->` and
`<!-- archive-track:* -->` regions of `index.html` at build time through a Vite
`transformIndexHtml` hook. To add or change a release, edit only
`src/release-catalog.mjs`; the policy tests assert the rendered markup matches
the ledger.

`npm run test:coverage` records V8 coverage for TypeScript source. The browser
gate records Istanbul coverage for the real production bundle. No coverage
threshold exists yet. Add one only after the repository has a measured baseline
and an accepted contract.

The browser tests check title fit, overflow, archive geometry, focus, reduced
motion, assets, player metadata, local requests, and console errors in Chromium.
The deployment workflow runs the full gate before it rebuilds `dist/`.

The [verify-site workflow](.github/skills/verify-site/SKILL.md) owns the broader
manual production-browser check.

## Deployment

cPanel serves the production site from `/home/eklipse/public_html`. The GitHub
workflow in [.github/workflows/build-dist.yml](.github/workflows/build-dist.yml)
builds and publishes `dist/`. A cPanel cron deploys the managed repository. The
cPanel task clears the site-owned asset directory and root files before it
copies the build. Keep a removed site-owned root path in the cleanup command so
an older deployment cannot leave that file public.
