---
name: full-code-review
description: "Review an eklipse change set for code clarity, ownership, facts, accessibility, security, and maintainability. Use for read-only reviews or authorized repairs."
---

# Full Code Review

Run a read-only review by default. Edit files only when the user requests repairs.

## 1. Establish the scope

1. Read `AGENTS.md`, `PRODUCT.md`, `package.json`, and the current diff.
2. Inspect the complete status and unrelated dirty files.
3. Assign each changed file an owner such as product, markup, styles, runtime, tests, deployment, or generated output.
4. Read each changed file with its callers, consumers, tests, and owning document.

## 2. Review the contracts

Check every relevant standard.

- Product facts match `PRODUCT.md` and official Bandcamp evidence.
- The artist name stays `eklipse` and album titles stay exact.
- External anchors stay on the Bandcamp allowlist.
- Iframes use the official Bandcamp player exception only for ledger releases.
- The site remains static, read-only, self-hosted where practical, and free of tracking or data submission.
- HTML uses semantic landmarks, useful image alternatives, visible focus, and keyboard access.
- Reduced-motion behavior remains available.
- CSS and JavaScript stay direct and do not add identity wrappers or scattered special cases.
- Shared layout rules have one owner and do not duplicate product policy.
- Source changes do not edit generated `dist/` output by hand.
- Tests protect a distinct public contract and do not weaken a current requirement.
- Do not move code across a large file boundary without a clear ownership reason.

## 3. Report findings

Order findings by severity.

Give each finding a file location, concrete risk, evidence, and smallest actionable fix.

Report only findings that have direct evidence. State when no blocking finding remains.

## 4. Repair only with authority

1. Keep the review read-only when the user requests analysis only.
2. Repair only findings inside the user-approved scope.
3. Re-read each file before you edit.
4. Run the narrowest affected check after each repair.
5. Invoke `run-quality-gate` after authorized repairs.

## Completion criterion

The review is complete when every in-scope file and contract has evidence. Every finding has a fix or an explicit deferral. Authorized repairs pass the quality gate.
