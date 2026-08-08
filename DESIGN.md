---
name: "eklipse Gravitational Press"
description: "A cover-led black-hole rave editorial system for the eklipse catalog."
colors:
  ember: "#ff6748"
  ember-deep: "#a93225"
  gold: "#e6b85e"
  orbital-blue: "#122747"
  void: "#080706"
  soot: "#12100d"
  bone: "#ead9b8"
  bone-bright: "#f8ead0"
  rule: "rgb(234 217 184 / 0.4)"
typography:
  display:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "clamp(3.25rem, 6.5vw, 6.5rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "clamp(3rem, 6.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "clamp(2.5rem, 4.4vw, 5rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  body:
    fontFamily: "IBM Plex Sans, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Syne, Trebuchet MS, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.09em"
rounded:
  sharp: "0"
  orbital: "50%"
spacing:
  page-gutter: "max(4vw, calc((100vw - 1500px) / 2))"
  mobile-gutter: "1.25rem"
  spread-block: "clamp(7rem, 11vw, 11rem)"
components:
  primary-action:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.void}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "0.95rem 1.2rem"
    height: "3.5rem"
  primary-action-hover:
    backgroundColor: "{colors.bone-bright}"
    textColor: "{colors.void}"
  nav-link:
    textColor: "{colors.bone-bright}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    height: "44px"
  release-spread:
    backgroundColor: "{colors.soot}"
    textColor: "{colors.bone-bright}"
    rounded: "{rounded.sharp}"
    padding: "{spacing.spread-block} {spacing.page-gutter}"
  bandcamp-player:
    backgroundColor: "{colors.void}"
    rounded: "{rounded.sharp}"
    height: "7.5rem"
    width: "min(100%, 34rem)"
---

# Design System: eklipse Gravitational Press

## Overview

**Creative North Star: "Gravitational Press"**

Gravitational Press is a black-hole rave world built as an editorial sequence. The current, finish-reviewed implementation uses the latest album cover as a threshold, then moves through eight cover-led release spreads, an archive afterimage, and a final event horizon. It refuses the framed-cover artist template and generic card grids.

The world combines soot-dark fields, warm paper neutrals, ember actions, exposed print seams, radial registration paths, and large album plates. The cover art supplies most of the local color. Interface elements stay direct and sharp so the artwork remains the main evidence.

This document records the implemented system. It does not record unimplemented typography, color, or motion refinements.

**Key Characteristics:**

- Full-scale album art leads each stage.
- Radial paths, registration points, and thin rules connect the sequence.
- Oversized serif display type creates the main structural tension.
- Utility labels are compact, uppercase, and widely tracked.
- Sharp semantic controls keep the route to Bandcamp clear.
- Alternating dark and light fields create a long editorial rhythm.

## Colors

The palette uses warm light against near-black, with ember as the global action signal and cover-derived colors as local release fields.

### Primary

- **Event Ember** (`#ff6748`): Use for primary actions, the page-progress line, registration points, and the global outbound emphasis.
- **Deep Ember** (`#a93225`): Use for strong text emphasis on a bone field.

### Secondary

- **Press Gold** (`#e6b85e`): Use with the Moonstone field and other artwork-led warm accents.
- **Orbital Blue** (`#122747`): Use as the Moonstone release field. It is not a general application blue.

### Neutral

- **Void** (`#080706`): Use for the page base, dark event-horizon fields, player backs, and dark focus contrast.
- **Soot** (`#12100d`): Use as the default release-spread field when a cover does not set a local field.
- **Bone** (`#ead9b8`): Use for warm paper sections, secondary dark-field text, and radial line work.
- **Bright Bone** (`#f8ead0`): Use for primary dark-field text, skip-link surfaces, and the ember action hover state.
- **Registration Rule** (`rgb(234 217 184 / 0.4)`): Use for quiet seams and dividers on dark fields.

Album-specific spread colors are local to their covers. Do not promote each one-off field into a global semantic color. Green is present mainly in the cover art, not as a current interface token.

### Named Rules

**The Ember Action Rule.** Ember identifies global action, progress, and registration. Do not use it as a large page background.

**The Cover Leads Rule.** A release field can take color from its cover, but the global action and navigation system stays stable.

## Typography

**Display Font:** Georgia (with Times New Roman and serif fallbacks)

**Body Font:** IBM Plex Sans (with Segoe UI and sans-serif fallbacks)

**Label Font:** Syne (with Trebuchet MS and sans-serif fallbacks)

**Character:** Georgia gives the catalog a large press-like voice. IBM Plex Sans keeps release facts and descriptions clear. Syne makes navigation, dates, counters, and actions feel registered and technical.

### Hierarchy

- **Threshold Wordmark** (400, `clamp(7rem, 21vw, 21rem)`, 0.7): Use once as the main structural element in the first viewport.
- **Display** (400, `clamp(3.25rem, 6.5vw, 6.5rem)`, 0.9): Use for major section statements and the final event-horizon heading.
- **Headline** (400, `clamp(3rem, 6.4vw, 6rem)`, 0.9): Use for release titles. Keep the negative tracking and balanced wrapping.
- **Title** (400, `clamp(2.5rem, 4.4vw, 5rem)`, 0.92): Use for the latest-release title.
- **Body** (400, `1rem`, 1.6): Use for project and release copy. Keep long text blocks at no more than 65 characters per line.
- **Label** (600, `0.72rem`, `0.09em`, uppercase): Use for navigation, dates, release counters, metadata, and utility text. Primary actions use Syne at 700.

### Named Rules

**The Three Voices Rule.** Use Georgia for display, IBM Plex Sans for reading, and Syne for utility text. Do not substitute a future type direction until it exists in the implementation.

## Layout

The desktop system uses a fluid page width capped at 1500px and a 12-column release grid. Each release spread is at least one small viewport high. Covers and copy alternate across the grid, with deliberate overlaps on selected releases. A continuous SVG spine and large circular registration paths connect the spreads.

The first viewport is a full-bleed threshold. The cover uses two masked image layers to keep both the black hole and the ruined city readable. The oversized wordmark sits low across the field. The release title, summary, and actions hold at the right edge. The project section then changes to a bone field before the dark catalog sequence begins.

The archive is a staggered three-cover coda on bone. Its grid steps from a large first cover to smaller offset covers. The final event horizon centers one short heading and one primary action inside concentric rings.

At 1000px, the release title and grid proportions compress. At 760px, the page gutter becomes 1.25rem, all release spreads become a single vertical column, the spine geometry moves behind the stack, players use the full width, and archive covers use three distinct widths. The header uses a near-solid dark field. At 430px, threshold actions stack and the primary action takes the full width. Touch targets remain at least 44px high.

### Named Rules

**The Editorial Sequence Rule.** Preserve the order: threshold, project, eight current releases, three original afterimages, final event horizon.

**The Registration Continuity Rule.** Radial paths and fine seams connect sections. They do not become isolated decorative badges.

## Elevation & Depth

The system is flat at the section level. It uses tonal field changes and overlap for most depth. Shadows belong to cover plates, the threshold wordmark, and the final orbital field. Do not place generic shadows under text panels or navigation.

### Shadow Vocabulary

- **Cover Plate** (`0 36px 86px rgb(0 0 0 / 0.48)`): Use under current release covers on dark fields.
- **Archive Plate** (`0 30px 70px rgb(8 7 6 / 0.28)`): Use under original-edition covers on bone.
- **Threshold Type** (`0 28px 70px rgb(0 0 0 / 0.55)`): Use only behind the oversized threshold wordmark.
- **Event Horizon** (`0 40px 110px rgb(91 22 12 / 0.42)`): Use inside the final concentric-ring field.

### Named Rules

**The Flat Field Rule.** Keep sections flat. Give depth to artwork and the event horizon, not to generic containers.

## Shapes

Controls, players, copy panels, and section seams use sharp rectangular geometry with no corner radius. Circles and ellipses are reserved for orbital geometry: black-hole rings, project registration marks, spine points, and the final event horizon. Fine one-pixel rules create print seams. Outbound icons use square line caps and miter joins.

### Named Rules

**The Sharp Control Rule.** Keep all interactive rectangles square. Do not use pills, soft cards, or rounded call-to-action buttons.

**The Orbital Circle Rule.** Use circles for gravitational structure, not as generic containers for text or icons.

## Components

### Primary Actions

- **Shape:** Sharp rectangle (`0` radius) with a minimum height of 3.5rem.
- **Primary:** Ember background, void text, Syne utility type, uppercase labels, and wide internal spacing.
- **Hover:** Change the surface to Bright Bone. Do not add lift or a shadow.
- **Focus:** Use the shared high-contrast two-layer focus treatment.
- **Use:** Use for direct Bandcamp actions only.

### Text Actions

- **Shape:** Inline link with a minimum target height of 44px.
- **Style:** Bright Bone text, Syne utility type, and a long underline offset.
- **Use:** Use for internal movement such as entering the catalog.

### Navigation

- **Style:** Fixed header with a dark vertical fade on desktop and a solid near-black field on mobile. Use three real routes only.
- **Typography:** Syne at compact uppercase label sizes with wide tracking.
- **Current State:** Underline the active internal section with Ember. Keep the Bandcamp route Ember at rest.
- **Mobile:** Preserve all routes and the 44px target height. Tighten the gap and label size without hiding an item.

### Release Spreads

- **Topology:** One 12-column editorial field per current release, with a cover plate and a separate copy region.
- **Cover:** Keep the full cover readable with `object-fit: contain`. Let selected spreads overlap copy through grid placement, not through a rounded card.
- **Copy:** Use a short accent rule, date, serif release title, factual description or genre line, one Bandcamp player, and one album link.
- **Hover:** Current covers gain slight saturation and contrast and reduce to 98.8% scale.
- **Focus:** The cover link and album link use the shared focus system.

### Bandcamp Players

- **Style:** Use the official player as a quiet 7.5rem-high strip below the release copy.
- **Border:** Use a one-pixel tint of the local spread foreground.
- **Constraint:** Keep the player subordinate to its cover and do not restyle its remote contents.

### Archive Afterimages

- **Topology:** Three link-only covers in a staggered coda. Do not add players.
- **Default:** Reduce color with a grayscale and contrast filter.
- **Hover:** Restore full color and move the plate up by 0.5rem.

### Event Horizon

- **Structure:** Center the final heading and a primary action inside four concentric circles crossed by one ember seam.
- **Purpose:** Close the sequence with one route to the full Bandcamp catalog.

### Interaction and Motion

- A fixed three-pixel line shows page progress.
- The threshold radial field follows pointer position through requestAnimationFrame and returns to its origin on pointer leave.
- IntersectionObserver sets the active Project or Releases route.
- The threshold cover arrives from a dark, blurred, enlarged state over 1100ms. Radial paths draw in over 1300ms after a 120ms delay.
- Cover hover transitions use ease-out for color and `cubic-bezier(0.16, 1, 0.3, 1)` for scale or lift.
- Reduced motion turns off smooth scroll, compresses animation and transition durations to 0.001ms, and removes threshold orbital transforms.

### Focus System

- Use a three-pixel outline in the local focus color, offset by five pixels.
- Add a seven-pixel contrast ring behind the outline.
- On bone and gold fields, invert the focus pair to Void over Bright Bone. On dark fields, use Bright Bone over Void.
- Keep the skip link hidden above the viewport until it receives focus.

### Named Rules

**The Semantic Route Rule.** Every visible control is a real link with a useful destination. Do not add decorative buttons or inactive affordances.

**The Motion Restraint Rule.** Motion can reveal gravity and cover depth, but it must not interrupt the reading sequence and it must stop under reduced motion.

## Do's and Don'ts

### Do:

- **Do** let official cover art control the local release atmosphere.
- **Do** keep the main Bandcamp action clear in the threshold and event horizon.
- **Do** preserve semantic headings, navigation, outbound labels, keyboard focus, and 44px targets.
- **Do** use radial geometry as a continuous registration system.
- **Do** verify computed styles, focus, pointer behavior, and responsive geometry in a production browser before a change alters a documented rule. This document pass used source-level evidence and the approved comp.

### Don't:

- **Don't** add rounded cards, pills, bento grids, glass surfaces, or generic software-layout patterns.
- **Don't** frame every cover in the same repeated card treatment.
- **Don't** replace official album art with generated imagery or stock photography.
- **Don't** invent navigation routes, release facts, product claims, or inactive controls.
- **Don't** treat unimplemented typography, palette, or motion refinements as current system tokens.
