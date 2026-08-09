# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

The site uses Vite 8.2.1, TypeScript 7.0.2, Tailwind CSS 4.3.3,
`@tailwindcss/vite` 4.3.3, and daisyUI 5.7.16. It is a static single-page site.
It has no server runtime, forms, comments, or user-submitted content. This
design supports cPanel compatibility and a small attack surface.

Vitest 4.1.10, V8 coverage 4.1.10, Playwright 1.62.1, jsdom 30.0.1, Istanbul,
NYC 18.0.0, tsx 4.23.11, markdownlint-cli2 0.23.2, and Fallow 3.14.0 own the
local quality gate. Production output contains no test or coverage runtime.

## Users

Listeners who discover eklipse and current listeners who seek a visual route
into the project catalog.

## Product Purpose

Present eklipse as a Romanian underground electronic music project. Guide
visitors to the official Bandcamp project and album pages. The first viewport
presents the latest release, `Introspection I (remastered edition)`. The page
then opens into the full catalog.

## Position

eklipse combines ambient layers and syncopated electronic beats with piano,
cello, and moments of rave intensity. The catalog began in Iași in 2001.

## Context

The site is a single-page promotional experience at eklipse.ro. Visitors learn
about the project, browse every release, and go to Bandcamp to listen or
purchase. Current and remastered editions lead. The three original versions
remain in a clearly labeled archive.

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
- No comments, forms, authentication, analytics, or user input.
- No server-side application code.
- Outbound links go only to official eklipse Bandcamp pages.
- cPanel serves the site from `/home/eklipse/public_html`.

## Brand Commitments

- Artist name: eklipse. Always lowercase.
- Location: Brasov, Romania.
- Origin: Iasi, Romania, in 2001.
- Space is the main visual subject.
- Official Bandcamp artwork is the primary release evidence. It is not a page
  background.

## Available Evidence

- [Official project page](https://eklipse-music.bandcamp.com/)
- [Official catalog](https://eklipse-music.bandcamp.com/music)
- Bandcamp provides eleven official releases with artwork and release facts.
- The supplied sources contain no testimonials or press quotes.
- The supplied sources contain no audience metrics or performance claims.
- Do not invent unsupported facts or claims.

## Product Principles

- Let the music and original album artwork lead.
- Keep the route from discovery to Bandcamp obvious.
- Keep the site read-only with a small attack surface.
- Use factual copy from the official catalog.
- Make the catalog clear on mobile and desktop.

## Accessibility and Inclusion

Use semantic HTML, keyboard-visible focus, sufficient contrast, meaningful image
alternatives, and reduced-motion support.
