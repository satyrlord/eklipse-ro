import assert from "node:assert/strict";
import test from "node:test";
import { bandcampProjectUrl, currentReleaseLedger, releaseLedger } from "./helpers/release-ledger.mjs";
import { attribute, document, elements, htaccess, notFoundDocument, notFoundHtml } from "./helpers/site-fixture.mjs";

const allowedBandcampUrls = new Set([bandcampProjectUrl, ...releaseLedger.map((release) => release.href)]);

function assertAllowedAnchors(page, localPaths = new Set()) {
  const hrefs = elements(page, "a").map((link) => attribute(link, "href"));

  for (const href of hrefs) {
    assert.ok(href, "every anchor must have a destination");
    if (href.startsWith("#")) {
      assert.match(href, /^#[a-z][a-z0-9-]*$/i, `invalid internal fragment: ${href}`);
      continue;
    }

    if (localPaths.has(href)) {
      continue;
    }

    assert.ok(allowedBandcampUrls.has(href), `disallowed anchor destination: ${href}`);
  }
}

test("every anchor uses an allowed fragment, local path, or exact Bandcamp ledger URL", () => {
  assertAllowedAnchors(document);
  assertAllowedAnchors(notFoundDocument, new Set(["/"]));
});

test("the site exposes no user-input or unauthorized runtime surfaces", () => {
  for (const tag of ["form", "input", "textarea", "select", "object", "embed"]) {
    assert.equal(elements(document, tag).length, 0, `${tag} must not appear`);
  }

  const iframes = elements(document, "iframe");
  assert.equal(iframes.length, 8, "each of the eight current releases carries a Bandcamp player");
  const playerIds = iframes.map((frame) => {
    const frameSrc = attribute(frame, "src");
    assert.ok(frameSrc?.startsWith("https://bandcamp.com/EmbeddedPlayer/"), "iframes must be official Bandcamp embed players");
    return frameSrc.match(/\/album=(\d+)\//)?.[1];
  });
  assert.deepEqual(playerIds, currentReleaseLedger.map((release) => release.playerId));
  assert.equal(new Set(playerIds).size, currentReleaseLedger.length, "each ledger release must use one distinct player");

  const scripts = elements(document, "script");
  assert.equal(scripts.length, 1);
  assert.equal(attribute(scripts[0], "src"), "/src/main.js");
});

test("production HTTP policy rejects unsafe methods and hardens all site responses", () => {
  assert.match(htaccess, /ErrorDocument 403 \/404\.html/);
  assert.match(htaccess, /ErrorDocument 404 \/404\.html/);
  assert.match(htaccess, /ErrorDocument 405 \/404\.html/);
  assert.match(htaccess, /REQUEST_METHOD} !\^\(GET\|HEAD\)\$/);
  assert.match(htaccess, /Strict-Transport-Security "max-age=31536000"/);
  assert.match(htaccess, /Cross-Origin-Resource-Policy "same-origin"/);
  assert.match(htaccess, /https:\/\/eklipse\.ro%{REQUEST_URI}/);
  assert.match(notFoundHtml, /<meta name="robots" content="noindex" \/>/);
  assert.match(notFoundHtml, /<a href="\/">Return to eklipse<\/a>/);
});

test("stable stylesheets and font files require cache revalidation", () => {
  const scopeStart = htaccess.indexOf('<FilesMatch "^(404\\.css|fonts\\.css|(?:syne|ibm-plex-sans)-latin-ext-[0-9]+\\.woff2)$">');
  const scopeEnd = htaccess.indexOf("</FilesMatch>", scopeStart);
  assert.notEqual(scopeStart, -1, "the stable-asset cache scope must exist");
  assert.notEqual(scopeEnd, -1, "the stable-asset cache scope must close");

  const stableAssetScope = htaccess.slice(scopeStart, scopeEnd + "</FilesMatch>".length);
  assert.match(stableAssetScope, /ExpiresByType text\/css "access plus 0 seconds"/);
  assert.match(stableAssetScope, /ExpiresByType font\/woff2 "access plus 0 seconds"/);
  assert.match(stableAssetScope, /Header always set Cache-Control "no-cache, must-revalidate"/);
});
