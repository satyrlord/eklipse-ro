---
name: handoff
description: "Write an eklipse handoff with verified state and the next action. Use when work pauses or a fresh agent resumes."
---

# Handoff

Write the minimum state that a fresh agent needs to continue the current task.

Use this skill only after an explicit handoff request or when the user asks to pause work. It writes a durable temporary artifact.

## 1. Critique the current state

1. Inspect `git status --short`, the complete diff, and recent history.
   Completion criterion: The state snapshot has status, diff, and history evidence.
2. Record each low-confidence fact with one concrete verification command or procedure.
   Completion criterion: Each low-confidence fact has one verification method.
3. List skipped, incomplete, and postponed work.
   Completion criterion: No unfinished work is hidden from the next agent.
4. State assumptions that are not recorded.
   Completion criterion: Each unrecorded assumption is listed.
5. Name the largest remaining blind spot.
   Completion criterion: The handoff names one largest blind spot.
6. Do not repair a new issue during close-out.
   Completion criterion: Close-out adds no new repair scope.

## 2. Write the handoff

Save the file under the ignored `tmp/` folder.

Completion criterion: The file has a known output location.

Use these headings in this order:

- `Current task`
- `State snapshot`
- `Decisions`
- `Open questions`
- `Files touched`
- `Verification`
- `Suggested skills`
- `Critique`

Completion criterion: The file has all eight headings in the required order.

Link to `PRODUCT.md`, `AGENTS.md`, tests, diffs, and other owning files.
Do not copy their contents.
Completion criterion: The handoff links to owners without duplicating their text.

Do not include credentials, personal data, conversation history, dead ends, or unsupported claims.
Completion criterion: The handoff contains no prohibited content.

## 3. Check the handoff

1. Read the saved file from disk.
   Completion criterion: The saved file is readable at the reported path.
2. Check every required heading.
   Completion criterion: All eight headings appear in the required order.
3. Check each path and command for exact spelling.
   Completion criterion: Every path and command is usable as written.
4. Confirm that the next action has enough context to start without clarification.
   Completion criterion: No clarification question is required to start.
5. Run an available Markdown check on the saved file.
   Completion criterion: The Markdown result is recorded, including an unavailable-check status.

Report the saved path and every unavailable check.
Completion criterion: The report identifies the artifact and all unavailable checks.

## Completion criterion

The handoff is complete when it gives a fresh agent the task, verified state, owners, blockers, and exact next action.
