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
  project-field: "#0d1b1a"
  project-accent: "#ed7963"
  catalog-field: "#0a1024"
  catalog-accent: "#68d7e6"
  archive-field: "#0b0b14"
  archive-accent: "#a689e6"
  horizon-field: "#0d0709"
  horizon-accent: "#ff713e"
  rule: "rgb(234 217 184 / 0.4)"
typography:
  wordmark:
    fontFamily: "Syne, Trebuchet MS, sans-serif"
    fontSize: "clamp(7rem, 21vw, 21rem)"
    fontWeight: 800
    lineHeight: 0.62
    letterSpacing: "-0.04em"
  display:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "clamp(3rem, 6vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Syne, Trebuchet MS, sans-serif"
    fontSize: "clamp(2.75rem, 5.8vw, 5.75rem)"
    fontWeight: 800
    lineHeight: 0.84
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "clamp(2.35rem, 4vw, 4.6rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.03em"
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
  scale:
    header-wordmark: "1.2rem"
    threshold-meta: "0.68rem"
    threshold-title-min: "2.2rem"
    threshold-title-max: "3.5rem"
    threshold-summary-max: "1.12rem"
    action: "0.8rem"
    text-action: "0.76rem"
    label-tight: "0.64rem"
    project-copy-min: "1.05rem"
    project-copy-max: "1.28rem"
    release-subline: "0.92rem"
    release-copy-max: "1.1rem"
    archive-label: "0.76rem"
    archive-title-min: "1.8rem"
    archive-title-mid: "3.1rem"
    archive-title-max: "3.6rem"
    footer-wordmark: "1.15rem"
    mobile-wordmark: "1.25rem"
    mobile-nav: "0.62rem"
    mobile-threshold-min: "5.2rem"
    mobile-threshold-max: "9rem"
    mobile-nav-compact: "0.57rem"
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

The world combines dark cover-derived fields, ember actions, exposed print seams, radial registration paths, and large album plates. The cover art supplies each section's local color. Interface elements stay direct and sharp so the artwork remains the main evidence.

This document records the implemented system. Typography uses two display voices so the page can move from ambient space to rave pressure without leaving the Gravitational Press world.

**Key Characteristics:**

- Full-scale album art leads each stage.
- Radial paths, registration points, and thin rules connect the sequence.
- A serif ambient voice and a geometric pressure voice create the main structural tension.
- Utility labels are compact, uppercase, and widely tracked.
- Sharp semantic controls keep the route to Bandcamp clear.
- One dark field runs through the journey. Each stage shifts hue from its cover art.

## Colors

The palette uses near-black fields with cover-derived moss, blue, violet, teal, and solar accents. Ember remains the global action signal for primary controls, progress, and registration points.

### Primary

- **Event Ember** (`#ff6748`): Use for primary actions, the page-progress line, registration points, and the global outbound emphasis.
- **Deep Ember** (`#a93225`): Use for strong warm emphasis when a cover field needs a darker ember note.

### Secondary

- **Press Gold** (`#e6b85e`): Use with the Moonstone field and other artwork-led warm accents.
- **Orbital Blue** (`#122747`): Use as the Moonstone release field. It is not a general application blue.

### Neutral

- **Void** (`#080706`): Use for the page base, dark event-horizon fields, player backs, and dark focus contrast.
- **Soot** (`#12100d`): Use as the default release-spread field when a cover does not set a local field.
- **Bone** (`#ead9b8`): Use for secondary dark-field text, threshold lettering, and radial line work.
- **Bright Bone** (`#f8ead0`): Use for primary dark-field text, skip-link surfaces, and the ember action hover state.
- **Registration Rule** (`rgb(234 217 184 / 0.4)`): Use for quiet seams and dividers on dark fields.

Section fields are dark by contract. `project-field` and `project-accent` take moss and ember notes from Introspection I. `catalog-field` and `catalog-accent` take ink blue and cyan from Nostalgia. `archive-field` and `archive-accent` take graphite and violet from the original-edition covers. `horizon-field` and `horizon-accent` take black and solar orange from Sun. Release spreads keep their own cover-derived local fields. Do not promote a one-off cover color into a global action token.

### Named Rules

**The Ember Action Rule.** Ember identifies global action, progress, and registration. Do not use it as a large page background.

**The Cover Leads Rule.** Every major section stays dark and takes its local atmosphere from the cover that leads it. The global action and navigation system stays stable.

**The Dark Field Rule.** Keep project, catalog, release, archive, event-horizon, and footer backgrounds dark. Let album plates, text, and cover-derived accents carry the lightness.

## Typography

**Ambient Display Font:** Georgia (with Times New Roman and serif fallbacks)

**Pressure Display Font:** Syne 800 (with Trebuchet MS and sans-serif fallbacks)

**Body Font:** IBM Plex Sans (with Segoe UI and sans-serif fallbacks)

**Label Font:** Syne 600–700 (with Trebuchet MS and sans-serif fallbacks)

`public/assets/fonts.css` owns the self-hosted Syne and IBM Plex Sans font files for the main page and the error page. Page-specific styles use the font names and weights. They do not define a second font source.

**Character:** Georgia gives the project statement, threshold title, and archive afterimage an ambient editorial voice. Syne 800 makes the threshold wordmark, release names, section entries, and final action carry rave pressure. IBM Plex Sans keeps release facts and descriptions clear. Syne 600–700 makes navigation, dates, and actions feel registered and technical.

### Hierarchy

- **Threshold Wordmark** (Syne 800, `clamp(7rem, 21vw, 21rem)`, 0.62): Use once as the pressure mark in the first viewport.
- **Ambient Display** (Georgia 400, `clamp(3rem, 6vw, 6rem)`, 0.9): Use for the project statement, threshold release title, and archive heading.
- **Pressure Headline** (Syne 800, `clamp(2.75rem, 5.8vw, 5.75rem)`, 0.84): Use for current release titles and final action statements.
- **Body** (IBM Plex Sans 400, `1rem` minimum, 1.6–1.65): Use for project and release copy. Keep long text blocks at 60ch or less.
- **Label** (Syne 600–700, `0.64rem–0.8rem`, `0.08em–0.14em`, uppercase): Use for navigation, dates, metadata, and actions. Use tabular numerals for dates.

### Named Rules

**The Ambient / Pressure Rule.** Use Georgia when the sequence needs air and memory. Use Syne 800 when the sequence needs impact. Use IBM Plex Sans for reading and Syne 600–700 for utility text. Do not let one voice carry every role.

## Layout

The desktop system uses a fluid page width capped at 1500px and a 12-column release grid. Each release spread is at least one small viewport high. Covers and copy alternate across the grid, with deliberate overlaps on selected releases. A continuous SVG spine and large circular registration paths connect the spreads.

The first viewport is a full-bleed threshold. The cover uses two masked image layers to keep both the black hole and the ruined city readable. The oversized wordmark sits low across the field. The release title, summary, and actions hold at the right edge. The project section stays dark and shifts into moss and teal from the Introspection covers before the catalog descends into ink blue.

The archive is an aligned three-cover coda on a graphite field. The original covers share one row and one baseline on desktop, then use one equal-width column on mobile. Each cover carries a dark local plate with its own caption accent. The final event horizon centers one short heading and one primary action inside concentric rings.

At 1000px, the release title and grid proportions compress. At 760px, the page gutter becomes 1.25rem, all release spreads become a single vertical column, the spine geometry moves behind the stack, players use the full width, and archive covers use one equal-width column. The header uses a near-solid dark field. At 430px, threshold actions stack and the primary action takes the full width. Touch targets remain at least 44px high.

### Named Rules

**The Editorial Sequence Rule.** Preserve the order: threshold, project, eight current releases, three original afterimages, final event horizon.

**The Registration Continuity Rule.** Radial paths and fine seams connect sections. They do not become isolated decorative badges.

## Elevation & Depth

The system is flat at the section level. It uses tonal field changes and overlap for most depth. Shadows belong to cover plates, the threshold wordmark, and the final orbital field. Do not place generic shadows under text panels or navigation.

### Shadow Vocabulary

- **Cover Plate** (`0 36px 86px rgb(0 0 0 / 0.48)`): Use under current release covers on dark fields.
- **Archive Plate** (`0 30px 70px rgb(8 7 6 / 0.28)`): Use under original-edition covers on dark local plates.
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
- **Copy:** Use a short accent rule, date, serif release title, optional factual description, one Bandcamp player, and one album link.
- **Hover:** Current covers gain slight saturation and contrast and reduce to 98.8% scale.
- **Focus:** The cover link and album link use the shared focus system.

### Bandcamp Players

- **Style:** Use the official player as a quiet 7.5rem-high strip below the release copy.
- **Border:** Use a one-pixel tint of the local spread foreground.
- **Constraint:** Keep the player subordinate to its cover and do not restyle its remote contents.

### Archive Afterimages

- **Topology:** Three link-only covers in one aligned coda. Do not add players.
- **Default:** Keep most cover color visible with a restrained grayscale and contrast filter.
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
- Keep focus pairs high contrast against each dark local field. Use the local accent for archive links and Bright Bone for global controls.
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
- **Don't** let the pressure voice replace body copy or factual metadata. Keep the ambient / pressure alternation intentional.
- **Don't** add decorative taglines, heading subtitles, or section numbering. Keep every visible text factual and useful.
