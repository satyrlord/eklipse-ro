# Skill glossary

This file defines the terms used by [create-skill](SKILL.md).

## Contents

- [Invocation](#invocation)
- [Structure](#structure)
- [Quality](#quality)
- [eklipse terms](#eklipse-terms)

## Invocation

### Model-invoked skill

A model-invoked skill has a description that lets the agent find and use it.

### User-invoked skill

A user-invoked skill requires an explicit user request.

### Description

The description is the machine-readable trigger for a skill. It states the action and each distinct request branch.

### Context load

Context load is the text and attention cost that a skill adds before it runs.

### Cognitive load

Cognitive load is the effort needed to remember and select a skill.

## Structure

### Branch

A branch is one distinct way to invoke or run a skill.

### Completion criterion

A completion criterion states the observable condition that ends a step or task.

### Reference

A reference is information that the agent reads when a branch needs it.

### Information hierarchy

The information hierarchy ranks content by when the agent needs it. Put steps first, shared reference second, and branch-only reference behind direct pointers.

### Progressive disclosure

Progressive disclosure moves branch-only reference out of `SKILL.md`. A precise pointer tells the agent when to read that reference.

### Single source of truth

A single source of truth gives each instruction, definition, or contract one authoritative owner.

### Granularity

Granularity shows how a design divides work across skills and reference files. Split content only when the split improves invocation or execution.

## Quality

### Predictability

Predictability is the degree to which a skill produces the same process on each run. The output can still change with the request.

### Main word

A main word is a short concept that anchors invocation or execution.

### Relevance

Relevance measures whether a line still supports the skill process or required reference.

### Premature completion

Premature completion ends a step before it meets its criterion.

### Duplication

Duplication assigns one meaning to more than one owner. This increases context cost and can make copies disagree.

### Stale text

Stale text remains after the skill or repository changes.

### Excess length

Excess length is skill text that is longer than needed, even when each line is current. Use progressive disclosure or a justified skill split.

### Instruction with no effect

An instruction with no effect does not change agent behavior or supply a required reference. Remove it.

## eklipse terms

### Product source

`PRODUCT.md` and the official eklipse Bandcamp catalog own product facts.

### Ledger release

A ledger release is a current or remastered release that may carry an official Bandcamp player.

### Archive original

An archive original remains visible but uses a link-only Bandcamp route.

### Static boundary

The static boundary forbids forms, user comments, authentication, cookies, tracking, databases, APIs, and server-side code.

### Production artifact

The production artifact is the built output that can deploy to `/home/eklipse/public_html`.

### Temporary artifact

A temporary artifact belongs under the ignored `tmp/` folder and does not become a product contract.
