---
name: grill-me
description: "Interview the user about one eklipse design decision at a time before you build. Use for unresolved product decisions."
---

# Grill Me

Resolve a plan or design one branch at a time.

Use this skill only after an explicit grill request or an unresolved product decision.
It asks questions and updates durable documents only with edit authority.

## 1. Prepare the decision

1. Explore the repository and official eklipse Bandcamp pages before you ask
   about facts they provide.
   Completion criterion: Evidence settles every factual question.
2. List unresolved parent decisions before child decisions.
   Completion criterion: The next decision has no unresolved parent.
3. State an evidence gap before you ask the user to decide it.
   Completion criterion: The rule separates a fact gap from a product choice.

## 2. Ask one question

1. State the recommended answer and its effects.
   Completion criterion: The user has a clear option and consequence summary.
2. Ask exactly one question in the active conversation.
   Completion criterion: The message contains one decision question.

## 3. Record the answer

1. Incorporate the answer immediately.
   Completion criterion: The next decision uses the accepted answer.
2. Update the relevant durable document only when the user gives edit authority.
   Completion criterion: No document changes occur without edit authority.
3. Reopen a settled branch only when new conflicting evidence appears.
   Completion criterion: A reopened branch cites the new evidence.

## eklipse Boundaries

- Preserve the static, read-only architecture and Bandcamp-only outbound link allowlist.
- Do not solicit or introduce unsupported commercial claims.
- Treat `PRODUCT.md` as product truth and `DESIGN.md` as visual truth once it exists.

## Completion criterion

The grill is complete when the design or implementation plan has no unresolved
dependency that requires a builder to reinterpret it.
