# Data and Configuration Rules

Compare data and configuration with `PRODUCT.md`, official Bandcamp pages, and
the source that uses them.

- Remove placeholder or invented values from live content.
- Correct artist names, album titles, dates, URLs, and paths against their
  authority.
- Keep security headers, build configuration, and deployment paths unless
  current behavior disproves them.
- Keep package dependencies only when source imports use them.
- Validate configuration through its narrowest consumer or production build.
