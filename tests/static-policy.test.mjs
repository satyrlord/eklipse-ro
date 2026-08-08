import assert from "node:assert/strict";
import { test } from "vitest";
import { bandcampProjectUrl, currentReleaseLedger, releaseLedger } from "./helpers/release-ledger.mjs";
import { attribute, cpanel, document, elements, htaccess, notFoundDocument, notFoundHtml } from "./helpers/site-fixture.mjs";

const allowedBandcampUrls = new Set([bandcampProjectUrl, ...releaseLedger.map((release) => release.href)]);

function headerValue(name) {
  const prefix = `Header always set ${name} `;
  const matches = htaccess
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith(prefix));
  assert.equal(matches.length, 1, `${name} must have one value`);

  const quotedValue = matches[0].slice(prefix.length);
  assert.match(quotedValue, /^"[^"]+"$/, `${name} must have one quoted value`);
  return quotedValue.slice(1, -1);
}

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
  assert.equal(attribute(scripts[0], "src"), "/src/main.ts");
});

test("production HTTP policy rejects unsafe methods and hardens all site responses", () => {
  const csp = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "font-src 'self'",
    "img-src 'self'",
    "connect-src 'none'",
    "media-src 'none'",
    "object-src 'none'",
    "frame-src https://bandcamp.com",
    "form-action 'none'",
    "base-uri 'none'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  assert.match(htaccess, /^Options -Indexes$/m);
  assert.match(htaccess, /ErrorDocument 403 \/404\.html/);
  assert.match(htaccess, /ErrorDocument 404 \/404\.html/);
  assert.match(htaccess, /ErrorDocument 405 \/404\.html/);
  assert.match(htaccess, /REQUEST_METHOD} !\^\(GET\|HEAD\)\$/);
  assert.match(htaccess, /https:\/\/eklipse\.ro%{REQUEST_URI}/);
  assert.equal(headerValue("Content-Security-Policy"), csp);
  assert.equal(headerValue("Strict-Transport-Security"), "max-age=31536000");
  assert.equal(headerValue("Referrer-Policy"), "no-referrer");
  assert.equal(headerValue("X-Content-Type-Options"), "nosniff");
  assert.equal(headerValue("X-Frame-Options"), "DENY");
  assert.equal(
    headerValue("Permissions-Policy"),
    "accelerometer=(), camera=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()",
  );
  assert.equal(headerValue("Cross-Origin-Opener-Policy"), "same-origin");
  assert.equal(headerValue("Cross-Origin-Resource-Policy"), "same-origin");
  assert.match(notFoundHtml, /<meta name="robots" content="noindex" \/>/);
  assert.match(notFoundHtml, /<a href="\/">Return to eklipse<\/a>/);
});

test("cPanel clears every site-owned deployment path before it copies the build", () => {
  assert.match(
    cpanel,
    /^\s*- \/bin\/rm -rf "\$DEPLOYPATH\/assets" "\$DEPLOYPATH\/\.htaccess" "\$DEPLOYPATH\/404\.css" "\$DEPLOYPATH\/404\.html" "\$DEPLOYPATH\/index\.html"$/m,
  );
  assert.match(cpanel, /^\s*- \/bin\/cp -a dist\/\. "\$DEPLOYPATH"$/m);
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
