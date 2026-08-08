---
name: handoff
description: "Write a concise eklipse handoff for a fresh agent. Use when work pauses, a fresh agent resumes, or the user requests state and next action."
---

# Handoff

Write the minimum state that a fresh agent needs to continue the current task.

## 1. Critique the current state

1. Inspect `git status --short`, the complete diff, and recent history.
2. Record each low-confidence fact with one concrete verification command or procedure.
3. List skipped, incomplete, and postponed work.
4. State assumptions that are not recorded.
5. Name the largest remaining blind spot.
6. Do not repair a new issue during close-out.

## 2. Write the handoff

Save the file under the ignored `tmp/` folder.

Use these headings in this order:

1. `Current task`
2. `State snapshot`
3. `Decisions`
4. `Open questions`
5. `Files touched`
6. `Verification`
7. `Suggested skills`
8. `Critique`

Link to `PRODUCT.md`, `AGENTS.md`, tests, diffs, and other owning files. Do not copy their contents.

Do not include credentials, personal data, conversation history, dead ends, or unsupported claims.

## 3. Check the handoff

1. Read the saved file from disk.
2. Check every required heading.
3. Check each path and command for exact spelling.
4. Confirm that the next action can start without a clarification question.
5. Run an available Markdown check on the saved file.

Report the saved path and every unavailable check.

## Completion criterion

The handoff is complete when a fresh agent can identify the task, verified state, owners, blockers, and exact next action.
