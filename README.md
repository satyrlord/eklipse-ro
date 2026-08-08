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
```

## Structure

```text
index.html                 HTML entry point
src/main.js                application script
src/styles.css             global styles
public/                    static assets, 404 page, server configuration
tests/static-policy.test.mjs   policy tests for the static site
tmp/                       ignored working directory for temporary artifacts
PRODUCT.md                 product contract
AGENTS.md                  repository rules
```

## Tests

`npm test` runs static policy tests with Node's built-in test runner. The tests verify the security boundary, including the outbound link allowlist and the absence of user-input surfaces.

## Deployment

The production site is served from `/home/eklipse/public_html` on cPanel. The GitHub workflow [build-dist.yml](.github/workflows/build-dist.yml) builds `dist/` and publishes it, and a cPanel cron deploys the managed repository.
