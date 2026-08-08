---
name: update-catalog
description: "Add, remove, or revise an eklipse release entry, cover, Bandcamp link, chronology position, or player. Use only when the user explicitly requests a catalog change."
---

# Update Catalog

Update the catalog from official eklipse Bandcamp evidence. Do not infer release facts from unrelated music databases or search snippets.

## 1. Establish the change

1. Read `AGENTS.md`, `PRODUCT.md`, `index.html`, `tests/static-policy.test.mjs`, and `package.json`.
2. Inspect the current status and preserve unrelated changes.
3. Identify the release title, official album URL, chronology position, cover asset, and ledger or archive classification.
4. Use the official Bandcamp project or album page as the fact source.
5. Stop and report missing evidence when the official page does not prove a required fact.

## 2. Apply the catalog rules

1. Preserve the exact Bandcamp title, capitalization, date, and chronology.
2. Keep the artist name as `eklipse`.
3. Use only `https://eklipse-music.bandcamp.com/` project or album URLs for anchors.
4. Add a Bandcamp player only for a ledger release.
5. Require every player source to start with `https://bandcamp.com/EmbeddedPlayer/`.
6. Keep archive originals link-only.
7. Self-host new cover artwork under `public/assets/covers/` when the user provides or authorizes the asset.
8. Give each cover useful alternative text and stable dimensions.
9. Update `PRODUCT.md` when the release count, chronology, or catalog evidence changes.
10. Update tests only when a changed public requirement needs a distinct regression check.

Do not invent descriptions, genres, metrics, quotes, prices, availability, or catalog identifiers.

## 3. Validate the change

1. Run the focused test that protects the changed catalog rule.
2. Run `npm test`.
3. Run `npm run build` when tracked `dist/` is clean.
4. Otherwise run `npm run build -- --outDir tmp/catalog-<slug>`.
5. Use `verify-site` for production-browser evidence.
6. Re-read the changed source and product documents.
7. Check the complete diff for unrelated changes.

## Completion criterion

The catalog update is complete when official facts, markup, assets, tests, product documentation, and validation evidence agree.
