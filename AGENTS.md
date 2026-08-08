# eklipse Website Instructions

## Product source

- Treat `PRODUCT.md` and the official eklipse Bandcamp catalog as product truth.
- Spell the artist name `eklipse`, always lowercase.
- Do not invent release facts, testimonials, listener counts, press quotes, prices, or availability claims.
- Preserve album titles and release chronology exactly as published on Bandcamp.

## Writing style

- Use ASD-STE100 Simplified Technical English for technical prose.
- Use strict STE for procedures, safety text, and error messages.
- Use STE-flavored prose for general technical discussion and project documents.
- Use one name for one item and one meaning for one word.
- Use active voice, short sentences, and plain verbs.
- Do not use contractions, semicolons, or emoji in technical prose.
- Keep product copy factual and separate from technical instructions.

## Security boundary

- Keep the production site static and read-only.
- Do not add forms, user comments, authentication, cookies, analytics, trackers, databases, APIs, or server-side code.
- Do not add runtime third-party scripts.
- Allow official Bandcamp album players only for ledger releases.
- Require every allowed player source to start with `https://bandcamp.com/EmbeddedPlayer/`.
- Keep archive originals link-only.
- Restrict outbound anchors to `https://eklipse-music.bandcamp.com/` and its `/album/` pages.
- Allow internal fragment links for page navigation.
- Self-host production assets whenever practical.

## Source and change workflow

- Read `PRODUCT.md`, `package.json`, the changed source, its tests, and the deployment files before material work.
- Use current repository files and official Bandcamp pages as evidence.
- Treat `package.json` as the source for repository commands.
- Do not invent commands, thresholds, release facts, or compatibility claims.
- Preserve unrelated dirty or staged work.
- Re-read a file immediately before editing when another change may affect it.
- Keep implementation, tests, product documents, and user-facing behavior consistent.
- Update `PRODUCT.md` or a relevant test when an accepted product contract changes.
- Keep generated `dist/` output out of source edits.
- Put temporary artifacts under the ignored `tmp/` folder.
- Use the repository skill catalog in [.github/skills/SKILLS.md](.github/skills/SKILLS.md) when a workflow matches the task.
- Do not commit changes unless the user asks.

## Verification

- Give every implementation change an objective verification method.
- Run `npm test` for source and policy tests.
- Run `npm run build` for a clean production build when `dist/` is safe to regenerate.
- When tracked `dist/` files are dirty, build to an ignored path with `npm run build -- --outDir tmp/quality-dist`.
- Use a real production browser for layout, keyboard, focus, image, iframe, and console evidence.
- Do not claim hosting behavior from local files alone.
- Separate verified facts, evidence-supported inferences, assumptions, and unresolved questions.

## Delivery

- Build output must be deployable directly to `/home/eklipse/public_html`.
- Validate production output, responsive rendering, keyboard navigation, link allowlisting, and security headers before deployment.
- Never store cPanel, FTP, or deployment secrets in the repository.

## Close-out

- Inspect current status, the complete diff, and recent history before summarizing work.
- List each low-confidence finding with one concrete verification command or procedure.
- List skipped, incomplete, and deferred work.
- State unstated assumptions and the largest remaining blind spot.
- Do not start a new repair cycle during close-out.
