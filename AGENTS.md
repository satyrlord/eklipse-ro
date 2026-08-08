# eklipse Website Instructions

## Product source

- Treat `PRODUCT.md` and the official eklipse Bandcamp catalog as product truth.
- Spell the artist name `eklipse`, always lowercase.
- Do not invent release facts, testimonials, listener counts, press quotes, prices, or availability claims.
- Preserve album titles and release chronology exactly as published on Bandcamp.

## Security boundary

- Keep the production site static and read-only.
- Do not add forms, comments, authentication, cookies, analytics, trackers, databases, APIs, or server-side code.
- Do not add runtime third-party scripts or embeds.
- Outbound links are restricted to `https://eklipse-music.bandcamp.com/` and its `/album/` pages.
- Internal fragment links are allowed for page navigation.
- Self-host production assets whenever practical.

## Delivery

- Build output must be deployable directly to `/home/eklipse/public_html`.
- Validate production output, responsive rendering, keyboard navigation, link allowlisting, and security headers before deployment.
- Never store cPanel, FTP, or deployment secrets in the repository.
- Temporary development artifacts shiuld go in the tmp folder.
