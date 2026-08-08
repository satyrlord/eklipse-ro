---
name: create-skill
description: "Create or revise an eklipse repository skill. Use when adding a skill, changing a skill trigger, restructuring skill references, reviewing skill quality, or validating a skill package."
---

# Create predictable skills

A skill gives an agent a predictable process. It does not require the same output on every run.

Read [GLOSSARY.md](GLOSSARY.md) when a term in this workflow needs a definition.

## 1. Establish the contract

1. Read `AGENTS.md`, `.github/skills/SKILLS.md`, the complete current skill, and relevant product documents.
   Completion criterion: You know the repository rules, current user changes, and the skill owner.
2. Collect concrete request examples for each valid branch.
   Completion criterion: Each branch has a trigger, output, boundary, and failure case.
3. Decide whether the skill can be model-invoked or needs explicit user invocation.
   Completion criterion: The invocation choice has a stated risk-based reason.
4. Keep explicit user invocation for workflows that can make risky edits, change product facts, or ask for a deliberate review.
   Completion criterion: The skill does not run an expansive workflow without user intent.

## 2. Design the information hierarchy

1. Put ordered actions in `SKILL.md`.
   Completion criterion: The required process has one clear order.
2. End each step with a checkable completion criterion.
   Completion criterion: The agent can distinguish complete work from incomplete work.
3. Keep rules that every branch needs in `SKILL.md`.
   Completion criterion: No required branch depends on hidden core instructions.
4. Move branch-only facts and examples to direct reference files.
   Completion criterion: Each pointer states exactly when to read its target.
5. Keep each meaning in one authoritative place.
   Completion criterion: No instruction or definition has a duplicate owner.

Keep reference files one level below `SKILL.md`. Add a contents list to a reference file longer than 100 lines.

## 3. Write the skill

1. Start the description with the skill action or leading word.
   Completion criterion: The description states distinct triggers without vague synonyms.
2. Use imperative sentences for procedures.
   Completion criterion: Each numbered step has one action.
3. Apply the [repository STE contract](../../../AGENTS.md#writing-style).
   Completion criterion: The prose passes the repository STE self-lint.
4. Preserve code, identifiers, paths, and command syntax.
   Completion criterion: Prose edits do not change technical tokens.
5. Remove stale text, duplication, sprawl, and no-op instructions.
   Completion criterion: Each remaining sentence changes behavior or supplies required reference.
6. Ground the skill in this static site.
   Completion criterion: The skill does not import Electron, audio, database, analytics, or unrelated product rules.
7. Use `PRODUCT.md` and official Bandcamp evidence when a skill handles release facts or catalog content.
   Completion criterion: The skill does not invent facts or weaken the static-site security boundary.

If an output branch needs a distinct voice, keep it in that branch. State the branch and its boundary in the skill.

## 4. Select bundled resources

1. Add a script only when repeated execution or deterministic output justifies it.
   Completion criterion: The script has a direct caller and a tested result.
2. Add a reference only when the information is branch-specific or too large for `SKILL.md`.
   Completion criterion: The skill has a direct pointer with a read condition.
3. Add an asset only when the skill uses it in its output.
   Completion criterion: The asset has a documented consumer.
4. Do not add README, installation, changelog, or process-history files inside a skill package.
   Completion criterion: The package contains only required skill files and resources.

## 5. Validate the package

1. Check the folder name, frontmatter, links, and required files.
   Completion criterion: The package has no structural error.
2. Run the available Codex skill validator on every changed skill folder.
   Completion criterion: Every validator run passes.
3. Test each changed branch with a realistic request or raw artifact.
   Completion criterion: The skill follows its process without hidden context.
4. Check repository links and run `git diff --check`.
   Completion criterion: All local links resolve and no whitespace error remains.
5. Re-read the complete package after validation.
   Completion criterion: No trigger, criterion, reference, or STE defect remains.

For forward tests of complex or substantially changed skills, use a clean context when the host supports it. Give the test agent the request and raw artifacts, not the expected answer.

## Completion criterion

The work is complete when every branch has a precise trigger and a checkable result. All package and STE checks pass. Every remaining line has one owner and a clear purpose.
