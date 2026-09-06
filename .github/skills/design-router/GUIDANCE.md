# Shared theme guidance

## Contents

- [Scope](#scope)
- [Purpose](#purpose)
- [Accessibility](#accessibility)
- [Copy and tone](#copy-and-tone)
- [Baseline rules](#baseline-rules)
- [Workflow](#workflow)
- [Output](#output)
- [Component states](#component-states)
- [Quality checks](#quality-checks)
- [Constraint language](#constraint-language)
- [Reference contract](#reference-contract)

## Scope

This file owns the guidance that is common to every theme in this package.
Each file in `themes/` owns one theme's brand description, design tokens, and
style-specific rules. The theme filename owns its slug. The
`registry-index.json` file maps each slug to its local theme path. Do not copy
the slug into every theme file.

Read this file before using a theme reference. Read the selected theme after
choosing its slug in [`CATALOG.md`](CATALOG.md).

## Purpose

Write implementation-ready design guidance for engineers and designers. Use
concrete rules, named tokens, measurable limits, and testable examples.

Apply the theme foundations first. Apply component rules after the foundations.
Keep the guidance concise and ready to use in a code review.

## Accessibility

- Meet WCAG 2.2 AA requirements.
- Use semantic HTML before ARIA.
- Support keyboard input and show a visible focus state.
- Use labels that a screen reader can understand.
- Support reduced motion.
- Keep touch targets at least 44px high and wide.
- Check contrast in every state, including hover, focus, active, disabled, and
  error states.

If a visual rule conflicts with an accessibility rule, keep the accessible
behavior and record the design change.

## Copy and tone

Use short, clear, direct text. Use the selected theme's copy tone as a visual
direction for product copy. Keep technical instructions in Simplified
Technical English. Define a specialized term before using it again.

Use one name for each item. Use one word for each meaning. Keep labels useful
and specific.

## Baseline rules

- Use semantic tokens instead of unexplained raw values.
- Preserve the visual hierarchy.
- Define interaction states.
- Define empty, loading, and error states when the component can have them.
- Set responsive behavior as a default.
- Avoid low contrast text.
- Avoid inconsistent spacing.
- Avoid motion without a clear purpose.
- Avoid labels that do not state the action or result.
- Avoid mixed visual metaphors.
- Avoid hit areas that are too small.

## Workflow

1. State the design intent in one sentence. Check: the intent names the
   product need and the visual direction.
2. Define typography, color, spacing, shape, and motion tokens. Check: each
   token has a value or a clear reference.
3. Define component anatomy, states, variants, and responsive behavior. Check:
   the component has rules for keyboard, pointer, touch, and long content.
4. Define accessibility and content checks. Check: each check can run in code
   or in a browser.
5. Record anti-patterns and migration steps for an existing interface. Check:
   each prohibited pattern has a concrete example.
6. End with a quality checklist. Check: a reviewer can run every item.

## Output

For theme-guided design work, include these sections:

- Context and goals
- Design tokens and foundations
- Component rules, states, and responsive behavior
- Accessibility requirements and testable acceptance criteria
- Content and tone rules with examples
- Prohibited patterns and migration steps
- Quality checklist

## Component states

Define these states when applicable: default, hover, focus-visible, active,
disabled, loading, and error. State the behavior for keyboard, pointer, and
touch input. State the spacing, typography, and color tokens. Cover long
labels, empty results, and overflow.

## Quality checks

- Anchor each rule to a token, threshold, or example.
- Make each accessibility statement testable.
- Keep shared rules in this file. Keep theme-specific rules in the selected
  theme file.
- Record a conflict between an aesthetic choice and an accessibility need.
- Verify the rendered result in the target environment when layout, focus,
  motion, or contrast can change at runtime.

## Constraint language

Use `must` for a required rule. Use `should` for a recommendation. Pair each
positive rule with a concrete example of a prohibited result. Add migration
guidance when a new pattern replaces an existing pattern.

## Reference contract

Every theme reference must:

- Link to this file.
- Use the filename as the theme slug.
- Keep the matching slug and `themePath` in `registry-index.json`.
- Preserve the theme-specific token values.
- State the design intent and brand direction.
- Keep style-specific exceptions separate from shared rules.
- Pass the package structure, link, Markdown, and diff checks.
