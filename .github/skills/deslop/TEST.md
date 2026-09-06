# Test Rules

Tests must protect a distinct public contract.

- Run the unchanged test suite before you modify tests.
- Keep tests for the Bandcamp link allowlist, absence of user-input and
  unapproved frame surfaces, and the complete catalog ledger.
- Read the current release ledger to verify its count. Do not copy a fixed
  release count into this rule.
- Do not weaken tests to accommodate prose or style cleanup.
- Add no test unless it catches a distinct regression in an owned requirement.
- Run the focused test after any test edit.
- Run `npm test` after the focused test.
