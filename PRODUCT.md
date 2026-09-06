# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

The site uses Vite, TypeScript, Tailwind CSS, `@tailwindcss/vite`, and daisyUI.
It is a static single-page site. It has no server runtime, forms, comments, or
user-submitted content. The static output deploys to cPanel and keeps the site
read-only. The exact dependency versions are in [package.json](package.json).

The local quality gate uses Vitest, V8 coverage, Playwright, jsdom, Istanbul, NYC,
tsx, markdownlint-cli2, and Fallow. Production output contains no test or
coverage runtime.

## Users

The site serves new and existing listeners who want a visual route through the
project catalog.

## Product Purpose

Present eklipse as a Romanian underground electronic music project. Direct
visitors to the official Bandcamp project and album pages. The first viewport
presents the latest release, `Introspection I (remastered edition)`. The page
then shows the full catalog.

## Position

eklipse combines ambient layers and syncopated electronic beats with piano,
cello, and moments of rave intensity. The catalog began in Iași in 2001.

## Context

The site is a single-page promotional experience at eklipse.ro. Visitors learn
about the project, browse every release, and go to Bandcamp to listen or
purchase. Current and remastered editions lead. The three original versions
remain in a labeled archive.

## Capabilities and Constraints

- One responsive single-page experience with a space theme.
- One self-hosted vector black-hole field stays sharp at all viewport sizes.
- The first viewport shows the latest cover as a separate linked artifact. It
  does not use album artwork as a page background.
- The album title stays on one row at every viewport size.
- Reduce the album title font size when it cannot fit on one row.
- English is the sole interface and metadata language.
- A short project description and a short description in every current release
  section.
- Every current release uses the same responsive copy panel, player width, and
  recovery-link alignment. Cover position and local color can vary.
- Every Bandcamp player has a visible direct-album recovery link.
- The main Bandcamp link and every archive link visibly name Bandcamp.
- No user comments, forms, authentication, analytics, or user input.
- No server-side application code.
- Outbound links go only to official eklipse Bandcamp pages.
- The cPanel deployment target is `/home/eklipse/public_html`.

## Brand Commitments

- Artist name: eklipse. Always lowercase.
- Location: Brașov, Romania.
- Origin: Iași, Romania, in 2001.
- Visible interface copy uses `Iasi` and `Brasov` for the project location.
- Space is the main visual subject.
- Official Bandcamp artwork is the primary release evidence. It is not a page
  background.

## Available Evidence

- [Official project page](https://eklipse-music.bandcamp.com/)
- [Official catalog](https://eklipse-music.bandcamp.com/music)
- The official Bandcamp catalog lists eleven releases with artwork and release
  facts.
- The supplied sources provide no verified evidence for testimonials, press
  quotes, audience metrics, or performance claims.
- Do not add these claims without evidence.

## Product Principles

- Let the music and original album artwork lead.
- Keep the route from discovery to Bandcamp obvious.
- Keep the site read-only with a small attack surface.
- Use factual copy from the official catalog.
- Make the catalog clear on mobile and desktop.

## Accessibility and Inclusion

Use semantic HTML. Provide visible keyboard focus, sufficient contrast,
meaningful image alternatives, and reduced-motion support.
