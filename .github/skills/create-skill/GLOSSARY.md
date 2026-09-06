# Skill glossary

This file defines the terms used by [create-skill](SKILL.md).

## Contents

- [Invocation](#invocation)
- [Structure](#structure)
- [Quality](#quality)
- [Repository terms](#repository-terms)

## Invocation

### Model-invoked skill

A model-invoked skill has a description that lets the agent find and use it.

### User-invoked skill

A user-invoked skill requires an explicit user request.

### Description

The description is the machine-readable trigger for a skill. It states the
action and each distinct request branch.

### Context load

Context load is the text and effort that a skill adds before it runs.

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

The information hierarchy ranks content by when the agent needs it. Put steps first.
Put shared reference second. Put branch-only reference behind direct pointers.

### Progressive disclosure

Progressive disclosure moves branch-only reference out of `SKILL.md`. A precise
pointer tells the agent when to read that reference.

### Single source of truth

A single source of truth gives each instruction, definition, or contract one
authoritative owner.

### Granularity

Granularity shows how a design divides work across skills and reference files.
Split content only when the split improves invocation or execution.

## Quality

### Predictability

Predictability is the degree to which a skill produces the same process on each
run. The output changes with the request.

### Main word

A main word is a short concept that anchors invocation or execution.

### Relevance

Relevance measures whether a line still supports the skill process or required reference.

### Premature completion

Premature completion ends a step before it meets its criterion.

### Duplication

Duplication assigns one meaning to more than one owner. This adds text and makes
copies disagree.

### Stale text

Stale text remains after the skill or repository changes.

### Excess length

Excess length is skill text that is longer than needed. Use progressive
disclosure or a justified skill split.

### Instruction with no effect

An instruction with no effect does not change agent behavior or supply a
required reference. Remove it.

## Repository terms

Read the [repository glossary](../../../GLOSSARY.md) for product, site, and
deployment terms. Keep shared definitions in that file.
