---
name: update-catalog
description: "Add, remove, or revise eklipse catalog releases from official Bandcamp evidence. Use only for explicit catalog requests."
---

# Update Catalog

Update the catalog from official eklipse Bandcamp evidence. Do not infer release facts from unrelated music databases or search snippets.

Use this skill only after an explicit catalog-change request. It changes product copy, assets, links, and release policy tests.

## 1. Establish the change

1. Read `AGENTS.md`, `PRODUCT.md`, `index.html`, `tests/static-policy.test.mjs`, and `package.json`.
   Completion criterion: Product rules, catalog markup, tests, and commands are available.
2. Inspect the current status and preserve unrelated changes.
   Completion criterion: Unrelated dirty or staged work is recorded and remains outside the change.
3. Identify the release title, official album URL, chronology position, cover asset, and ledger or archive classification.
   Completion criterion: Each requested release field has a value or an evidence gap.
4. Use the official Bandcamp project or album page as the fact source.
   Completion criterion: Each release fact has an official source.
5. Stop and report missing evidence when the official page does not prove a required fact.
   Completion criterion: No unproved release fact enters the catalog.

## 2. Apply the catalog rules

1. Preserve the exact Bandcamp title, capitalization, date, and chronology.
   Completion criterion: The catalog matches the official release record.
2. Keep the artist name as `eklipse`.
   Completion criterion: Every edited artist name is `eklipse`.
3. Use only `https://eklipse-music.bandcamp.com/` project or album URLs for anchors.
   Completion criterion: Every edited outbound anchor matches the allowlist.
4. Add a Bandcamp player only for a ledger release.
   Completion criterion: Each player belongs to a ledger release.
5. Require every player source to start with `https://bandcamp.com/EmbeddedPlayer/`.
   Completion criterion: Each player source has the required prefix.
6. Keep archive originals link-only.
   Completion criterion: No archive original has a player.
7. Self-host new cover artwork under `public/assets/covers/` when the user provides or authorizes the asset.
   Completion criterion: Each new cover has an authorized local asset.
8. Give each cover useful alternative text and stable dimensions.
   Completion criterion: Each edited cover has useful `alt`, `width`, and `height` values.
9. Update `PRODUCT.md` when the release count, chronology, or catalog evidence changes.
   Completion criterion: Product documentation matches the changed catalog contract.
10. Update tests only when a changed public requirement needs a distinct regression check.
    Completion criterion: Each test edit protects one changed public requirement.

Do not invent descriptions, genres, metrics, quotes, prices, availability, or catalog identifiers.

## 3. Validate the change

1. Run the focused test that protects the changed catalog rule.
   Completion criterion: The focused test result is recorded.
2. Run `npm test`.
   Completion criterion: The full test result is recorded.
3. Run `npm run build` when tracked `dist/` is clean.
   Completion criterion: The clean build result is recorded.
4. Otherwise run `npm run build -- --outDir tmp/catalog-<slug>`.
   Completion criterion: The dirty-worktree build writes only to ignored output.
5. Use [verify-site](../verify-site/SKILL.md) for production-browser evidence.
   Completion criterion: Browser evidence or a clear blocker is recorded.
6. Re-read the changed source and product documents.
   Completion criterion: Source and product documents agree after validation.
7. Check the complete diff for unrelated changes.
   Completion criterion: No unrelated change is included in the catalog update.

## Completion criterion

The catalog update is complete when official facts, markup, assets, tests, product documentation, and validation evidence agree.
