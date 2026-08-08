# eklipse website

A static single-page promotional site for **eklipse**, a Romanian underground electronic music project. The site presents the project, shows the full Bandcamp catalog, and guides listeners to the official Bandcamp pages.

## Product

- One responsive single-page experience with a space theme.
- The first viewport presents the latest release, `Introspection I (remastered edition)`.
- English is the only interface and metadata language.
- The only outbound links are the official eklipse Bandcamp project and album pages.
- The site is static and read-only. It has no forms, comments, authentication, analytics, databases, or server-side code.

Product truth lives in [PRODUCT.md](PRODUCT.md). Repository rules live in [AGENTS.md](AGENTS.md).

## Stack

- [Vite](https://vitejs.dev/) for build and development.
- Vanilla JavaScript, no framework.
- Plain CSS with a custom design system.
- Static HTML entry point at [index.html](index.html).
- Static assets and server configuration under [public/](public/).

## Commands

```sh
npm install       # install dependencies
npm run dev       # start the Vite development server
npm run build     # build a production bundle into dist/
npm run preview   # preview the production build
npm test          # run the static policy tests
npm run test:browser  # build to tmp/ and run production-browser tests
npm run ci        # run static and production-browser tests
```

## Structure

```text
index.html                 HTML entry point
src/main.js                application script
src/styles.css             global tokens, layout, focus, and motion
src/release-sequence.css   current-release section styles
public/                    static assets, 404 page, server configuration
public/assets/fonts.css    shared self-hosted font declarations
public/assets/licenses/    self-hosted font license texts
tests/                     product, asset, security, and deployment policy tests
tests/browser/             production-browser contract tests
playwright.config.mjs      production-browser test configuration
tmp/                       ignored working directory for temporary artifacts
PRODUCT.md                 product contract
AGENTS.md                  repository rules
```

## Tests

`npm test` runs the product, asset, security, and deployment policy tests with Node's built-in test runner. The tests use one shared parsed-document fixture. They do not inspect browser geometry through CSS source text.

`npm run test:browser` builds to `tmp/browser-dist` and checks title fit, overflow, archive geometry, focus, reduced motion, assets, player metadata, local requests, and console errors in Chromium. The deployment workflow runs these tests before it rebuilds `dist/`.

The [verify-site workflow](.github/skills/verify-site/SKILL.md) owns the broader manual production-browser check.

## Deployment

The production site is served from `/home/eklipse/public_html` on cPanel. The GitHub workflow [build-dist.yml](.github/workflows/build-dist.yml) builds `dist/` and publishes it, and a cPanel cron deploys the managed repository.
