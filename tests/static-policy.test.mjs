import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { parse } from "parse5";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const document = parse(html);

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
  for (const tag of ["form", "input", "textarea", "select", "iframe", "object", "embed"]) {
    assert.equal(elements(document, tag).length, 0, `${tag} must not appear`);
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
  assert.match(html, /started in Iași in 2001 and now based in Brașov/);
  assert.match(html, /A deluxe remaster of the 2008 album <em>Moon<\/em>, combining remastered originals with new tracks\./);
});