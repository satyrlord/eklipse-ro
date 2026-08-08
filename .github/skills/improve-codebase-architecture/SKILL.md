---
name: improve-codebase-architecture
description: "Review eklipse architecture for ownership, module boundaries, coupling, and test seams."
---

# Improve eklipse architecture

Review the architecture in read-only mode by default. Find the smallest
boundary that hides real complexity.
Do not edit code unless the user authorizes the change.

Use this skill only after an explicit architecture review request. It inspects
a broad source area.
It proposes structural changes after it finds direct evidence.

## Terms

- A **module** is code with one clear responsibility.
- An **interface** is the surface that another file or test uses.
- A **deep module** hides substantial work behind a small interface.
- A **shallow module** adds little value and moves complexity to its callers.
- A **seam** is the contract between two modules or files.
- An **adapter** translates between two seams.
- **Locality** keeps code together when it changes together.
- The **deletion test** asks what complexity remains after you remove a candidate.
- The **leverage test** asks how much caller knowledge a boundary removes.

Use project terms from `PRODUCT.md`, `DESIGN.md`, and the owning source files.
Keep exact names such as class names, IDs, selectors, and paths.

## 1. Establish the contract and scope

1. Read `AGENTS.md`, `PRODUCT.md`, `package.json`, the current diff, and status.
   Completion criterion: You know the repository rules, commands, changes,
   and user scope.
2. Read `DESIGN.md` and `README.md` when these files exist.
   Completion criterion: You know the current visual and repository contracts.
3. Map the request to a source area, behavior, and owning contract.
   Completion criterion: The review has one stated scope.
4. Classify each file as source, test, asset, deployment, generated output, or
   temporary output.
   Completion criterion: Generated and unrelated files stay outside the review scope.

## 2. Map the eklipse architecture

Verify these ownership signals in the current files.

- `PRODUCT.md` owns product facts and the static-site boundary.
- `DESIGN.md` owns implemented visual tokens and layout rules when it exists.
- `index.html` owns semantic structure and product copy.
- `src/main.ts` owns progressive enhancement and interaction state.
- `src/styles.css` owns layout, tokens, focus, and motion.
- `public/` owns static assets, the error page, and server rules.
- `tests/` owns executable policy checks.
- `package.json`, workflows, and `.cpanel.yml` own commands and deployment.
- `dist/` is generated output. Do not edit it by hand.

1. Inventory the files that implement the selected behavior.
   Completion criterion: Every selected file has an owner and a reason to stay
   in scope.
2. Trace one representative content, event, or policy flow across its boundaries.
   Completion criterion: The flow has file, caller, consumer, and test evidence.
3. Record each navigation, ownership, or testability problem with file evidence.
   Completion criterion: Each problem has a concrete cost and a source location.
4. Apply the deletion test to each suspected shallow module or helper.
   Completion criterion: Each candidate either concentrates complexity or is rejected.
5. Apply the leverage test to each surviving candidate.
   Completion criterion: The candidate reduces caller knowledge without moving
   the same complexity.

Do not create a framework, service, state layer, or abstraction for one operation.
Keep the static boundary and current vanilla JavaScript stack.

## 3. Present architecture candidates

1. Prepare one candidate for each confirmed boundary problem.
   Completion criterion: Each candidate has a source problem and a stated boundary.

2. Report each candidate with these fields:

   - **Files**: Name every involved file and source owner.
   - **Problem**: State the measured navigation, ownership, coupling, or test
     cost.
   - **Evidence**: Link the callers, consumers, tests, and contract text.
   - **Change**: State the proposed responsibility shift.
   - **Benefits**: State the expected locality, leverage, and test effects.
   - **Contract impact**: Name each product, design, security, or deployment
     rule affected.
   - **Verification**: Name the check that proves the change.
   - **Strength**: Use `Strong`, `Worth exploring`, or `Speculative`.

   Completion criterion: Each candidate has all eight fields.

3. Rank one recommendation first and give its evidence.
   Completion criterion: The first recommendation has direct evidence.
4. Do not propose detailed interfaces or code before the user selects a candidate.
   Completion criterion: No unselected candidate has an implementation proposal.
5. Ask which candidate the user wants to explore.
   Completion criterion: The user receives one clear selection question.

The review branch is complete when every candidate has file evidence, a cost,
a boundary, a verification method, and a strength.

## 4. Deepen a selected candidate

1. Define the module responsibility and its excluded responsibilities.
   Completion criterion: The boundary has one clear owner.
2. Define the smallest interface that hides the required complexity.
   Completion criterion: The interface has named callers, consumers, and
   tests.
3. Compare two interfaces when more than one design remains credible.
   Completion criterion: The selected interface has evidence and the rejected
   option has a reason.
4. Apply the deletion and leverage tests to the selected interface.
   Completion criterion: The interface concentrates complexity and reduces
   caller knowledge.
5. Update `PRODUCT.md` or `DESIGN.md` only when the user authorizes a contract change.
   Completion criterion: The owning document agrees with the selected design.
6. Keep code changes out of this branch unless the user also authorizes implementation.
   Completion criterion: The branch ends with a design decision or an explicit
   implementation scope.
7. Run `git diff --check` and the narrowest configured check for each
   authorized edit.
   Completion criterion: The selected edit has objective verification
   evidence.
8. Run `npm test` for source, policy, or test changes.
   Completion criterion: The configured test command passes, or the failure is recorded.
9. Build to an ignored `tmp/` path when tracked `dist/` files are dirty.
   Completion criterion: The build result does not overwrite user-owned
   generated output.
10. Use [verify-site](../verify-site/SKILL.md) for browser-visible changes.
    Completion criterion: Changed browser behavior has direct browser evidence
    or a blocker.

## eklipse boundary rules

- Keep production static, read-only, and self-hosted where practical.
- Do not add server code, APIs, forms, authentication, cookies, analytics, or
  trackers.
- Keep product facts in `PRODUCT.md` and official Bandcamp evidence.
- Keep implemented visual rules in `DESIGN.md` when that document owns them.
- Preserve Bandcamp link and iframe allowlists.
- Do not edit generated `dist/` output by hand.
- Preserve unrelated dirty or staged work.

## Completion criterion

The architecture review is complete when the selected scope has mapped
ownership, traced flow evidence, rejected shallow candidates, and one ranked
recommendation. A selected candidate is complete when its interface,
alternatives, contract impact, and verification method are recorded.
