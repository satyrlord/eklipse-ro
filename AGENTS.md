# eklipse Website Instructions

## Product source

- Treat `PRODUCT.md` and the official eklipse Bandcamp catalog as product truth.
- Spell the artist name `eklipse`, always lowercase.
- Do not invent release facts, testimonials, listener counts, press quotes,
  prices, or availability claims.
- Preserve album titles and release chronology exactly as published on Bandcamp.

## Writing style

- Use ASD-STE100 Simplified Technical English for technical prose.
- Use strict STE for procedures, safety text, and error messages.
- Use STE-flavored prose for general technical discussion and project documents.
- Use one name for each item. Use one word for each meaning.
- Use active voice, short sentences, and plain verbs.
- Do not use contractions, semicolons, or emoji in technical prose, code,
  documentation, specifications, instructions, or reusable skills.
- Avoid idioms.
- Avoid specialized terms unless they are necessary or defined in the project
  glossary.
- Keep product copy factual and separate from technical instructions.

## Security boundary

- Keep the production site static and read-only.
- Do not add forms, user comments, authentication, cookies, analytics, trackers,
  databases, APIs, or server-side code.
- Do not add runtime third-party scripts.
- Allow official Bandcamp album players only for ledger releases.
- Require every allowed player source to start with
  `https://bandcamp.com/EmbeddedPlayer/`.
- Keep archive originals link-only.
- Restrict outbound anchors to `https://eklipse-music.bandcamp.com/` and its
  `/album/` pages.
- Allow internal fragment links for page navigation.
- Self-host production assets when possible.
- Do not route passwords, tokens, or keys through the model. Tell the user to
  enter them directly.

## Source and change workflow

- Read `PRODUCT.md`, `package.json`, the changed source, its tests, and the
  deployment files before material work.
- Use current repository files and official Bandcamp pages as evidence.
- Treat `package.json` as the source for repository commands.
- Do not invent commands, thresholds, release facts, or compatibility claims.
- Preserve unrelated dirty or staged work.
- Re-read a file immediately before you edit when another change may affect it.
- Keep code, tests, product documents, and behavior visible to users consistent.
- Update `PRODUCT.md` or a relevant test when an accepted product contract
  changes.
- Keep generated `dist/` output out of source edits.
- Put temporary artifacts under the ignored `tmp/` folder.
- Use the repository skill catalog in
  [.github/skills/SKILLS.md](.github/skills/SKILLS.md) when a workflow matches
  the task.
- Do not commit changes unless the user asks.

## Verification

- Give every change an objective check.
- Run `npm test` for source and policy tests.
- Run `npm run build` for a clean production build when `dist/` is safe to
  regenerate.
- When tracked `dist/` files are dirty, build to an ignored path with
  `npm run build -- --outDir tmp/quality-dist`.
- Use a real browser with the production build for layout, keyboard, focus,
  image, iframe, and console evidence.
- Do not claim host behavior from local files alone.
- Separate verified facts, evidence-supported inferences, assumptions, and
  unresolved questions.

## Delivery

- The build process must produce output that deploys directly to
  `/home/eklipse/public_html`.
- Check the production output, responsive layout, keyboard access, allowed
  links, and security headers before deployment.
- Never store cPanel, FTP, or deployment secrets in the repository.

## Close-out

- Inspect current status, the complete diff, and recent history before you
  summarize work.
- List each low-confidence finding with one concrete verification command or
  procedure.
- List skipped, incomplete, and postponed work.
- State assumptions that are not recorded and the largest remaining blind spot.
- Do not start a new repair cycle during close-out.

## General agent operating instructions

### Terms and defaults

- These general operating instructions set defaults for agent behavior. A more
  specific instruction can override a default.
- The user's latest explicit request overrides earlier instructions, subject to
  safety and system constraints.
- Instruction priority:
  1. Safety and system constraints.
  2. The user's latest explicit request.
  3. These general operating instructions.
  4. Repository instruction files, such as `AGENTS.md`.
  5. Older instructions and specifications.
- When instructions conflict, follow the newer and more specific instruction. A
  higher-priority instruction overrides it.
- "Reasoning level" and "capability level" name the same setting. It controls
  how much analysis a worker does and how much the work costs. Use the standard
  level by default. Use the level the tool exposes. When the tool has no such
  setting, ignore this rule.

### Roles and capability levels

- Batch independent tool calls when the environment supports parallel calls.
  Inspect every result.
- In an environment that exposes `functions.exec`, use `Promise.allSettled` when
  partial results are useful. Use `Promise.all` only when any failure should
  abort the batch.
- Run these steps sequentially: dependent calls, waits and resumes, approval
  requests, and conflicting or interdependent mutations.
- Run an adaptive investigation sequentially when each result changes the next
  step.
- Do not split inspections that can run in one batch into separate sequential
  calls.
- Use a reasoning-focused configuration for planning. Use a delivery-focused
  configuration for implementation.
- Keep planning, implementation, integration, and critical review distinct. One
  worker can perform several roles.
- The root coordinator owns the plan, integrates all work, resolves conflicts,
  and performs the final critical review.
- Raise the reasoning level for complex implementation, debugging, and review.
  Use a very high level for architecture, security, concurrency, or major
  ambiguity. Use the highest available level only as an escalation.
- Use exploration workers for read-heavy and context-heavy tasks. Examples
  include:
  - Mapping components and dependencies.
  - Tracing execution and data flow.
  - Inspecting large files, datasets, or logs.
  - Finding relevant tests and documentation.
  - Compressing evidence into a clear report for the coordinator.
- Use the standard reasoning level for exploration. Raise it only for difficult
  but bounded analysis.
- Use execution workers for narrow, high-volume, and automatically verifiable
  tasks. Examples include:
  - Inventories and searches.
  - Classification and extraction.
  - Test partitioning.
  - Repetitive checks.
  - Documentation updates.
  - Mechanical edits.
- Use a low reasoning level only for purely mechanical work. Use a higher level
  when batch work has a strong, objective verifier.
- Delegated workers should normally use a lower-cost capability level than the
  worker that delegated the task. Raise the level only when task complexity or
  risk requires it.

### Evidence and documentation

- Use authoritative, current, primary documentation. Use the available
  documentation, search, and retrieval tools rather than relying on memory.
- Do not speculate about material facts. Resolve uncertainty by:
  1. Inspecting the system or source material directly.
  2. Checking authoritative documentation.
  3. Running a specific test, command, query, or experiment.
  4. Asking the user when the ambiguity cannot be resolved from available
     evidence.
- State any uncertainty that remains after verification.
- Before material work, inspect all applicable project documentation that
  exists. This may include:
  - Overview and setup documentation.
  - Terminology or glossary documentation.
  - Architecture and component documentation.
  - Data models and schemas.
  - Interfaces and contracts.
  - Search or indexing behavior.
  - Core processing or service behavior.
  - User interface and user experience documentation.
  - Testing, deployment, and operations documentation.
- Do not assume every project uses these document names or has every document
  type.
- After resolving a documentation conflict, update the affected documents so
  they no longer disagree.

### Delegation and concurrency

- Delegate independent work concurrently when the environment supports it.
- Prefer parallel workers for independent searches, file inspection, research,
  audits, and other read-only tasks.
- Keep the root coordinator available to integrate results, respond to the user,
  and redirect work.
- Give each delegated worker a clear scope, expected output, and verification
  method.
- Avoid overlapping edits unless ownership and merge order are explicit.
- Assume that concurrent workers may share the same workspace.

### Changes and specifications

- After each bug fix or change request, update the relevant specifications and
  documentation.
- Do not add temporary scaffolding that only keeps intermediate phases
  releasable alone. Remove it when you complete and verify all phases together.
- Retain temporary compatibility or migration work only when it serves a real
  deployment, review, rollback, or risk-control need.
- Do not add backward-compatibility work unless a project document defines a
  migration or compatibility contract. Keep code that a project document
  requires for migration.

### Testing and performance

- Prefer automated checks when practical.
- Use representative, real-world fixtures for performance measurements.
- Do not make performance claims from invented or unrepresentative inputs.
- Record the test environment, workload, method, and result for each performance
  claim.
- When a required measurement is missing, state that explicitly. Do not replace
  it with an estimate presented as fact.
- For environment-sensitive behavior, test the built artifact in a minimal local
  runtime that reflects the least-capable supported production environment.
- Do not rely on development-only behavior, permissions, configuration, or
  infrastructure unless the target environment guarantees them.
- Do not publish changes solely to reproduce an environment condition that can
  be tested locally.

### Uncertainty and verification

- Never assign a worker to investigate a vague doubt without defining a concrete
  verification step.
- Pair every uncertainty with at least one specific check. Examples include:
  - A command to run.
  - A test to execute.
  - A file or record to inspect.
  - A query to perform.
  - A source to consult.
  - A behavior to reproduce.
- Do not repeatedly ask whether a result is correct.
- Replace repeated confirmation requests with direct, objective verification.

### Close-out and handoff

- Run a self-critique pass before you finish.
- For large, high-risk, or difficult changes, request an independent review from
  a clean context.
- Give the independent reviewer the plan, evidence, changes, verification
  results, and handoff.
- Ask the reviewer: "Evaluate this work. What may have been missed?"
- Include the independent review findings in the final handoff.
