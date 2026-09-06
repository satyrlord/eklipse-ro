# Project glossary

Use these technical terms in project documents and agent instructions.
Keep published release titles, tool names, and code identifiers exact.
For skill workflow terms, read the
[skill glossary](.github/skills/create-skill/GLOSSARY.md).

- **Archive original:** One of the three original editions in the archive. Each
  has a Bandcamp link and no player.
- **Bandcamp player:** An official album player inside an HTML iframe.
- **Build:** The process that creates static production files from source files.
- **Catalog:** The current releases and archive originals that the site
  presents.
- **Catalog ledger:** The release records in `src/release-catalog.ts`. These
  records include current releases and archive originals.
- **CI:** Continuous integration. The repository uses `npm run ci` for its
  aggregate checks.
- **Contract:** A requirement that the implementation and its tests must meet.
- **Coverage:** A measurement of code that tests execute. It does not prove
  correct behavior.
- **cPanel:** The hosting control panel for the production site.
- **CSP:** Content Security Policy. HTTP response rules that restrict the
  resources a page can load.
- **DOM:** Document Object Model. The browser representation of an HTML
  document.
- **Fixture:** Input or state that a test uses.
- **Gate:** A group of checks that must pass before a specified action.
- **Iframe:** An HTML element that contains a separate page.
- **Junction:** A Windows directory link. The local skill junctions point to
  `.github/skills`.
- **Ledger release:** A release in the catalog ledger. Only current releases
  have players.
- **Production artifact:** The static files that a build creates for deployment.
- **Recovery link:** A direct album link beside a player. The link remains
  available if the player fails.
- **Runtime:** Code that executes in the browser after the page loads.
- **Static site:** A site that serves files without a server-side application.
- **Temporary artifact:** A work file under ignored `tmp/`. It does not define a
  product requirement.
- **Test ledger helper:** The re-exports in `tests/helpers/release-ledger.ts`.
  Tests use these source records to check the rendered catalog.
- **Token:** A named design value, such as a CSS color or spacing variable.
- **Viewport:** The area in which a browser displays the page.

Design names such as *threshold*, *release spread*, and *event horizon* identify
page sections. [DESIGN.md](DESIGN.md) defines their visual roles.
