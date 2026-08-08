import assert from "node:assert/strict";
import { test } from "vitest";
import { archiveReleaseLedger, currentReleaseLedger } from "./helpers/release-ledger.ts";
import { attribute, document, elements, hasClass, html, textContent } from "./helpers/site-fixture.ts";

function normalizedText(node: Element): string {
  return textContent(node).replace(/\s+/g, " ").trim();
}

function oneAlbumHref(article: Element): string {
  const hrefs = new Set(
    elements(article, "a")
      .map((link) => attribute(link, "href"))
      .filter((href) => href?.includes("/album/")),
  );

  assert.equal(hrefs.size, 1, "each release must use one official album destination");
  return [...hrefs][0]!;
}

test("the current-release ledger keeps exact URLs, titles, chronology, and players", () => {
  const releases = elements(document, "article").filter((article) => hasClass(article, "release-spread"));
  const actual = releases.map((release) => {
    const title = elements(release, "h3")[0]!;
    const time = elements(release, "time")[0]!;
    const player = elements(release, "iframe")[0]!;
    const playerId = attribute(player, "src")?.match(/\/album=(\d+)\//)?.[1];

    return {
      href: oneAlbumHref(release),
      title: normalizedText(title),
      datetime: attribute(time, "datetime"),
      playerId,
    };
  });

  assert.deepEqual(actual, currentReleaseLedger);
});

test("each current release has one description between its title and player", () => {
  const releases = elements(document, "article").filter((article) => hasClass(article, "release-spread"));

  for (const release of releases) {
    const copy = elements(release, "div").find((node) => hasClass(node, "release-copy"))!;
    const children = [...copy.children];
    const titleIndex = children.findIndex((node) => node.nodeName === "H3");
    const descriptionIndex = children.findIndex((node) => node.nodeName === "P");
    const playerIndex = children.findIndex((node) => node.nodeName === "IFRAME");

    assert.ok(descriptionIndex > titleIndex, `${normalizedText(children[titleIndex]!)} needs a description after its title`);
    assert.ok(playerIndex > descriptionIndex, `${normalizedText(children[titleIndex]!)} needs its player after the description`);
  }
});

test("the archive ledger keeps exact URLs, titles, labels, and no players", () => {
  const releases = elements(document, "article").filter((article) => hasClass(article, "afterimage-release"));
  const actual = releases.map((release) => ({
    href: oneAlbumHref(release),
    title: normalizedText(elements(release, "strong")[0]!),
    label: normalizedText(elements(release, "small").find((node) => hasClass(node, "archive-subtitle"))!),
  }));

  assert.deepEqual(actual, archiveReleaseLedger);
  assert.equal(releases.flatMap((release) => elements(release, "iframe")).length, 0);
  assert.equal(elements(document, "img").length, 11);
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

test("the black-hole backdrop uses no album cover or decorative red points", () => {
  assert.equal(elements(document, "svg").filter((svg) => hasClass(svg, "space-backdrop")).length, 1);
  assert.doesNotMatch(html, /gravity-map__points/);

  const spine = elements(document, "svg").find((svg) => hasClass(svg, "release-spine"));
  assert.ok(spine, "the release spine must exist");
  assert.equal(elements(spine, "circle").length, 0);
});

test("Romanian place names and the supported Moonstone relation stay accurate", () => {
  assert.match(html, /started in Iasi in 2001 and now based in Brasov/);
  assert.match(html, /A deluxe remaster of the 2008 album <em>Moon<\/em>, combining remastered originals with new tracks\./);
});

test("the design carries no decorative taglines, subtitles, or section numbering", () => {
  assert.doesNotMatch(html, /threshold-note/, "no decorative threshold tagline");
  assert.doesNotMatch(html, /release-spectrum/, "no genre-tag subtitle lines");
  assert.doesNotMatch(html, /eklipse · Iasi 2001 · Brasov/, "no redundant project metadata strip");
  assert.doesNotMatch(html, /Remastered and current editions, newest first/, "no releases heading subtitle");
  assert.doesNotMatch(html, /Earlier versions of three albums/, "no archive heading subtitle");
});

test("each archive release has one subtitle label", () => {
  assert.equal(elements(document, "small").filter((node) => hasClass(node, "archive-subtitle")).length, 3);
});
