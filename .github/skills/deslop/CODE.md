# Code Rules

Use the current source file and its owning test as evidence.

- Remove CSS selectors and JavaScript branches made unreachable by prose cleanup.
- Remove comments that expose generation scaffolding or merely narrate obvious markup.
- Keep semantic HTML, focus behavior, reduced-motion behavior, and responsive constraints.
- Keep self-hosted assets and the static runtime boundary.
- Do not edit generated `dist/` files.
- Match existing formatting and validate with `npm run build`.
