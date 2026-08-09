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
