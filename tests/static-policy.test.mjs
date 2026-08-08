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

function hasClass(node, name) {
  return (attribute(node, "class") ?? "").split(/\s+/).includes(name);
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

test("the site exposes no user-input or unauthorized runtime surfaces", () => {
  for (const tag of ["form", "input", "textarea", "select", "object", "embed"]) {
    assert.equal(elements(document, tag).length, 0, `${tag} must not appear`);
  }

  const iframes = elements(document, "iframe");
  assert.equal(iframes.length, 8, "each of the eight current releases carries a Bandcamp player");
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

test("the cover-led editorial journey keeps every catalog stage", () => {
  const sections = elements(document, "section");
  const articles = elements(document, "article");

  assert.equal(sections.filter((section) => hasClass(section, "threshold")).length, 1);
  assert.equal(articles.filter((article) => hasClass(article, "release-spread")).length, 8);
  assert.equal(articles.filter((article) => hasClass(article, "afterimage-release")).length, 3);
  assert.equal(sections.filter((section) => hasClass(section, "event-horizon")).length, 1);
  assert.equal(elements(document, "h1").length, 1);
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

test("the custom error page fonts are self-hosted at stable paths", async () => {
  await Promise.all([
    access(new URL("../public/assets/syne-latin-ext-700.woff2", import.meta.url)),
    access(new URL("../public/assets/ibm-plex-sans-latin-ext-400.woff2", import.meta.url)),
    access(new URL("../public/assets/ibm-plex-sans-latin-ext-600.woff2", import.meta.url)),
  ]);
});

test("album titles stay on a single row at every viewport", async () => {
  const css = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
  const releaseTitle = css.match(/\.release-copy h3\s*\{[^}]*\}/)?.[0] ?? "";
  const heroTitle = css.match(/\.threshold-release h2\s*\{[^}]*\}/)?.[0] ?? "";
  assert.match(releaseTitle, /white-space:\s*nowrap/, "catalog album titles must not wrap");
  assert.match(heroTitle, /white-space:\s*nowrap/, "hero album title must not wrap");
});

test("the design carries no decorative taglines, subtitles, or section numbering", async () => {
  const css = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
  assert.doesNotMatch(html, /threshold-note/, "no decorative threshold tagline");
  assert.doesNotMatch(html, /release-spectrum/, "no genre-tag subtitle lines");
  assert.doesNotMatch(html, /eklipse · Iasi 2001 · Brasov/, "no redundant project metadata strip");
  assert.doesNotMatch(html, /Remastered and current editions, newest first/, "no releases heading subtitle");
  assert.doesNotMatch(html, /Earlier versions of three albums/, "no archive heading subtitle");
  assert.doesNotMatch(css, /counter-(reset|increment)/, "no release section counters");
  assert.doesNotMatch(css, /decimal-leading-zero/, "no release section numbering");
});

test("the archive covers stay aligned on desktop and mobile", async () => {
  const css = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
  const archiveTrack = css.match(/\.afterimage-track\s*\{[\s\S]*?\}/)?.[0] ?? "";
  const archiveAlignment =
    css.match(/\.afterimage-release:nth-child\(1\),\s*\.afterimage-release:nth-child\(2\),\s*\.afterimage-release:nth-child\(3\)\s*\{[\s\S]*?\}/)?.[0] ?? "";

  assert.match(archiveTrack, /grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(archiveAlignment, /grid-column:\s*auto/);
  assert.match(archiveAlignment, /margin-top:\s*0/);
  assert.equal(elements(document, "small").filter((node) => hasClass(node, "archive-subtitle")).length, 3, "each archive title has one subtitle label");
  assert.match(css, /\.afterimage-release \.archive-subtitle\s*\{[\s\S]*text-align:\s*right/);
  assert.doesNotMatch(css, /width:\s*(?:84%|72%)/, "mobile archive covers must not shrink into a stagger");
});
