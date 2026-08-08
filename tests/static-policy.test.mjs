import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { parse } from "parse5";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const document = parse(html);
const htaccess = await readFile(new URL("../public/.htaccess", import.meta.url), "utf8");
const notFoundHtml = await readFile(new URL("../public/404.html", import.meta.url), "utf8");

function elements(node, name) {
  const matches = node.nodeName === name ? [node] : [];
  return matches.concat((node.childNodes ?? []).flatMap((child) => elements(child, name)));
}

function attribute(node, name) {
  return node.attrs?.find((item) => item.name === name)?.value;
}

test("outbound links stay on the eklipse Bandcamp allowlist", () => {
  const externalLinks = elements(document, "a")
    .map((link) => attribute(link, "href"))
    .filter((href) => href?.startsWith("http"));

  assert.ok(externalLinks.length > 0);
  for (const href of externalLinks) {
    const url = new URL(href);
    assert.equal(url.origin, "https://eklipse-music.bandcamp.com");
    assert.match(url.pathname, /^\/$|^\/album\/[a-z0-9-]+\/?$/);
  }
});

test("the site exposes no user-input or embedded runtime surfaces", () => {
  for (const tag of ["form", "input", "textarea", "select", "object", "embed"]) {
    assert.equal(elements(document, tag).length, 0, `${tag} must not appear`);
  }

  const iframes = elements(document, "iframe");
  assert.equal(iframes.length, 8, "each of the eight ledger releases carries a Bandcamp player");
  for (const frame of iframes) {
    const frameSrc = attribute(frame, "src");
    assert.ok(frameSrc?.startsWith("https://bandcamp.com/EmbeddedPlayer/"), "iframes must be official Bandcamp embed players");
  }

  const scripts = elements(document, "script");
  assert.equal(scripts.length, 1);
  assert.equal(attribute(scripts[0], "src"), "/src/main.js");
});

test("all eleven official releases are represented", () => {
  const albumLinks = new Set(
    elements(document, "a")
      .map((link) => attribute(link, "href"))
      .filter((href) => href?.includes("/album/")),
  );

  assert.equal(albumLinks.size, 11);
  assert.equal(elements(document, "img").length, 12);
});

test("Romanian place names and Moonstone remaster copy stay accurate", () => {
  assert.match(html, /started in Iasi in 2001 and now based in Brasov/);
  assert.match(html, /A deluxe remaster of the 2008 album <em>Moon<\/em>, combining remastered originals with new tracks\./);
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

test("the custom error page font is self-hosted at a stable path", async () => {
  await access(new URL("../public/assets/source-sans-3-400.woff2", import.meta.url));
});
