# Data and Configuration Rules

Compare data and configuration with `PRODUCT.md`, official Bandcamp pages, and
the source that uses them.

- Remove placeholder or invented values from live content.
- Correct artist names, album titles, dates, URLs, and paths against their
  authority.
- Keep security headers, build configuration, and deployment paths unless
  current behavior disproves them.
- Keep a package dependency when source imports, package scripts, tests, or
  build configuration use it. Remove it only when no declared consumer remains.
- Validate configuration through its narrowest consumer or production build.
