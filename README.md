# eklipse website

A static single-page site for **eklipse**, a Romanian underground electronic
music project. The site presents the full catalog and directs listeners to the
official Bandcamp pages.

## Product

- One responsive single-page experience with a space theme.
- The first viewport presents `Introspection I (remastered edition)`.
- The interface and metadata use English.
- Outbound links go only to official eklipse Bandcamp pages.
- The site is static and read-only.
- The site has no forms, comments, authentication, analytics, or server code.

Product facts are in [PRODUCT.md](PRODUCT.md). Repository rules are in
[AGENTS.md](AGENTS.md).

## Runtime

Use Node.js 24.19.0 or a later Node.js 24 release. The repository supports
Node.js 24 for local development, tests, and production builds.

## Stack

- Vite builds and serves the static site.
- TypeScript checks the application and tool configuration.
- Tailwind CSS and daisyUI provide the eklipse theme and action components.
- Vitest runs policy and unit tests.
- `@vitest/coverage-v8` records unit coverage.
- Playwright verifies the production build in Chromium.
- `vite-plugin-istanbul` instruments browser test builds.
- NYC reports browser coverage.
- jsdom provides DOM fixtures for static policy tests.
- tsx runs the cross-platform browser test script.
- markdownlint-cli2 checks root Markdown files and Markdown files under
  `.github`.
- Fallow checks unused code and dependency use.

The exact dependency versions are in [package.json](package.json).

The application has no frontend framework. It uses semantic HTML, a TypeScript
browser runtime, and the Gravitational Press CSS system. Tailwind CSS and daisyUI
extend that system. They do not replace the documented visual direction.
