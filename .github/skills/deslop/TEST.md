# Test Rules

Tests must protect a distinct public contract.

- Run the unchanged test suite before you modify tests.
- Keep tests for the Bandcamp link allowlist, absence of user-input and unapproved frame surfaces, and the complete eleven-release catalog.
- Do not weaken tests to accommodate prose or style cleanup.
- Add no test unless it catches a distinct regression in an owned requirement.
- After any test edit, run the focused test and `npm test`.
