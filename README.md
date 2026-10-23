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

Use Node.js 24.22.1 or a later Node.js 24 release. The repository supports
Node.js 24 for local development, tests, and production builds.

This minimum version includes the Brotli decoder fix for CVE-2026-111497.
See the [October 2026 Node.js security releases](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases).
The deployment workflow uses Node.js 24.22.1. Update local Node.js installations
before you run project commands.

Pull requests run `npm run ci` and build to `tmp/quality-dist`.
These checks do not publish deployment files.

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

The `markdownlint-cli2` dependency overrides select security fixes that its
current release does not include. `markdown-it` 15.0.3 fixes excessive processing
in [multiline links](https://github.com/advisories/GHSA-gfr2-rv44-r23c) and
[inline HTML](https://github.com/advisories/GHSA-vfgh-jcmw-g37q). It also includes
the earlier [smartquotes fix](https://github.com/advisories/GHSA-r7fv-28h4-cvq7).
`smol-toml` 1.9.1 includes the
[key-parsing fix](https://github.com/advisories/GHSA-r4xh-jqrq-34v2).

The `micromark-extension-math@3.1.0` override selects KaTeX 0.18.2 to fix
[inherited option handling](https://github.com/advisories/GHSA-238p-pmpm-9mq7).
This overrides the parent package's older version range. Remove each override
when its parent dependency requires a safe version. Use `npm audit` to check
direct dependencies and their dependencies after an update.

`braces` 3.0.3 remains in the Markdown linting dependency chain.
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) has no
published patch as of 2026-10-23. The lint command uses three fixed patterns
from `package.json`. These patterns contain no braces. Keep lint patterns and
configuration under review. Recheck upstream releases before changing this
dependency. This development dependency finding remains unresolved.

The application has no frontend framework. It uses semantic HTML, a TypeScript
browser runtime, and the Gravitational Press CSS system. Tailwind CSS and daisyUI
extend that system. They do not replace the documented visual direction.
