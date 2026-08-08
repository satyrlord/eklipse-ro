---
name: create-skill
description: "Create or revise eklipse repository skills. Use for triggers, references, quality reviews, or package validation."
---

# Create predictable skills

A skill gives an agent a predictable process. The output changes with the
request.

Use this skill only after an explicit user request. It changes a skill package
or its trigger.

Read [GLOSSARY.md](GLOSSARY.md) when a term in this workflow needs a definition.

## 1. Establish the contract

1. Read `AGENTS.md`, `.github/skills/SKILLS.md`, the complete current skill, and
   relevant product documents.
   Completion criterion: You know the repository rules, current user changes,
   and the skill owner.
2. Record one concrete request example for each valid branch.
   Completion criterion: Each branch has a trigger, output, boundary, and
   failure case.
3. Choose model invocation or explicit user invocation for the skill.
   Completion criterion: The invocation choice has a stated risk-based reason.
4. Require explicit user invocation for product changes and deliberate reviews.
   Completion criterion: The skill does not run an expansive workflow without
   user intent.

## 2. Design the information hierarchy

1. Put ordered actions in `SKILL.md`.
   Completion criterion: The required process has one clear order.
2. End each step with a checkable completion criterion.
   Completion criterion: The agent distinguishes complete work from incomplete
   work.
3. Keep rules that every branch needs in `SKILL.md`.
   Completion criterion: No required branch depends on hidden core instructions.
4. Move branch-only facts and examples to direct reference files.
   Completion criterion: Each pointer states exactly when to read its target.
5. Keep each rule in one authoritative place.
   Completion criterion: No instruction or definition has a duplicate owner.

Keep reference files beside `SKILL.md`. Add a contents list to each reference
file longer than 100 lines.

## 3. Write the skill

1. Start the description with the skill action or main word.
   Completion criterion: The description states distinct triggers without
   vague synonyms.
2. Use imperative sentences for procedures.
   Completion criterion: Each numbered step has one action.
3. Apply the [repository STE contract](../../../AGENTS.md#writing-style).
   Completion criterion: The prose uses active voice, short sentences, plain
   words, no contractions, no semicolons, and no emoji.
4. Preserve code, identifiers, paths, and command syntax.
   Completion criterion: Prose edits do not change technical tokens.
5. Remove stale text, duplicated rules, excess length, and instructions with no
   effect.
   Completion criterion: Each remaining sentence changes behavior or supplies
   required reference.
6. Ground the skill in this static site.
   Completion criterion: The skill does not import Electron, audio, database,
   analytics, or unrelated product rules.
7. Use `PRODUCT.md` and official Bandcamp pages as evidence for release or
   catalog facts.
   Completion criterion: The skill does not invent facts or weaken the
   static-site security boundary.

If a branch needs a different output style, state the branch and its limit in
the skill.

## 4. Select bundled resources

1. Add a script only for repeated work or deterministic output.
   Completion criterion: The script has a direct caller and a tested result.
2. Add a reference only when the information is branch-specific or too large
   for `SKILL.md`.
   Completion criterion: The skill has a direct pointer with a read condition.
3. Add an asset only when the skill uses it in its output.
   Completion criterion: The asset has a documented consumer.
4. Do not add README, installation, changelog, or process-history files inside
   a skill package.
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

For a complex skill or a skill with a large change, run a forward test in a
clean context when that context is available.
Give the test agent the request and raw artifacts. Do not give the expected answer.

## Completion criterion

The work is complete when every branch has a precise trigger and a checkable result.
All package and STE checks pass. Each line has one owner and a clear purpose.
