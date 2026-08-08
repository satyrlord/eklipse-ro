---
name: full-code-review
description: "Review an eklipse change set for ownership, facts, accessibility, security, and maintainability. Repair approved findings."
---

# Full Code Review

Run a read-only review by default. Edit files only when the user requests repairs.

Use this skill only after an explicit review request. It inspects a broad change set.
It repairs only approved findings.

## 1. Establish the scope

1. Read `AGENTS.md`, `PRODUCT.md`, `package.json`, and the current diff.
   Completion criterion: The repository rules and current changes are available.
2. Inspect the complete status and unrelated dirty files.
   Completion criterion: Unrelated files are recorded and outside the review scope.
3. Assign each changed file an owner such as product, markup, styles, runtime, tests, deployment, or generated output.
   Completion criterion: Every changed file has one owner.
4. Read each changed file with its callers, consumers, tests, and owning document.
   Completion criterion: Each changed file has source, contract, and test evidence.

## 2. Review the contracts

Check these contracts:

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

1. Order findings by severity.
   Completion criterion: The report lists the highest-risk finding first.

2. Give each finding a file location, concrete risk, evidence, and smallest actionable fix.
   Completion criterion: Each finding has all four fields.

3. Report only findings that have direct evidence.
   Completion criterion: Each reported finding links to direct evidence.
4. State when no blocking finding remains.
   Completion criterion: The report states the blocking status.

## 4. Repair only with authority

1. Keep the review read-only when the user requests analysis only.
   Completion criterion: No file changes occur in analysis-only mode.
2. Repair only findings inside the user-approved scope.
   Completion criterion: Every edit maps to an approved finding.
3. Re-read each file before you edit.
   Completion criterion: Each edited file reflects its current contents.
4. Run the narrowest affected check after each repair.
   Completion criterion: Each repair has a check result.
5. Invoke [run-quality-gate](../run-quality-gate/SKILL.md) after authorized repairs.
   Completion criterion: The quality-gate result is recorded.

## Completion criterion

The review is complete when every in-scope file and contract has evidence.
Every finding has a fix or an explicit deferral. Authorized repairs pass the quality gate.
