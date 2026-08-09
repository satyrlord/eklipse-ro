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
  const actual = releases.map((release) => {
    const link = elements(release, "a")[0]!;
    const destination = elements(release, "small").find((node) => hasClass(node, "archive-destination"));

    assert.equal(attribute(link, "aria-label"), `${normalizedText(elements(release, "strong")[0]!)} on Bandcamp`);
    assert.equal(normalizedText(destination!), "Open on Bandcamp");

    return {
      href: oneAlbumHref(release),
      title: normalizedText(elements(release, "strong")[0]!),
      label: normalizedText(elements(release, "small").find((node) => hasClass(node, "archive-subtitle"))!),
    };
  });

  assert.deepEqual(actual, archiveReleaseLedger);
  assert.equal(releases.flatMap((release) => elements(release, "iframe")).length, 0);
  assert.equal(elements(document, "img").length, 12);
});

test("the threshold presents the latest cover as a linked artifact", () => {
  const artifact = elements(document, "a").find((link) => hasClass(link, "threshold-artifact"));
  assert.ok(artifact, "the threshold needs one linked latest-release artifact");
  assert.equal(attribute(artifact, "href"), currentReleaseLedger[0]!.href);

  const image = elements(artifact, "img")[0]!;
  assert.equal(attribute(image, "src"), "/assets/covers/introspection-i-remastered.jpg");
  assert.equal(attribute(image, "alt"), "Introspection I (remastered edition) cover");
});

test("every player has one visible direct-album recovery route", () => {
  const releases = elements(document, "article").filter((article) => hasClass(article, "release-spread"));

  for (const release of releases) {
    const recovery = elements(release, "div").find((node) => hasClass(node, "player-recovery"));
    assert.ok(recovery, `${normalizedText(elements(release, "h3")[0]!)} needs player recovery`);
    assert.equal(normalizedText(elements(recovery, "span")[0]!), "Player unavailable?");
    assert.equal(normalizedText(elements(recovery, "a")[0]!), "Open album on Bandcamp");
  }
});

test("the first viewport gives each route a distinct name", () => {
  const catalog = elements(document, "a").find((link) => hasClass(link, "bandcamp-link"));
  const primary = elements(document, "a").find((link) => hasClass(link, "primary-action"));
  const browse = elements(document, "a").find((link) => hasClass(link, "text-action"));

  assert.equal(normalizedText(catalog!), "Bandcamp");
  assert.equal(attribute(catalog!, "aria-label"), "Open eklipse on Bandcamp");
  assert.equal(normalizedText(primary!), "Listen to latest");
  assert.equal(normalizedText(browse!), "Browse releases");
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

test("one quiet grayscale grain layer sits directly above the backdrop", () => {
  const svgs = elements(document, "svg").filter((svg) => hasClass(svg, "space-backdrop") || hasClass(svg, "space-noise"));
  assert.equal(svgs.length, 2);
  assert.equal(hasClass(svgs[0]!, "space-backdrop"), true, "the grain layer must come after the backdrop");
  assert.equal(hasClass(svgs[1]!, "space-noise"), true);

  const noise = svgs[1]!;
  assert.equal(attribute(noise, "aria-hidden"), "true");
  const turbulence = elements(noise, "feturbulence");
  assert.equal(turbulence.length, 1);
  assert.equal(attribute(turbulence[0]!, "type"), "fractalNoise");
  assert.equal(attribute(turbulence[0]!, "stitchTiles"), "stitch");

  const matrix = elements(noise, "fecolormatrix");
  assert.equal(matrix.length, 1);
  assert.equal(attribute(matrix[0]!, "type"), "saturate");
  assert.equal(attribute(matrix[0]!, "values"), "0");
});

test("Romanian place names and the supported Moonstone relation stay accurate", () => {
  assert.match(html, /Since 2001/);
  assert.match(html, /Iasi to Brasov/);
  assert.match(html, /Current and remastered editions lead the catalog/);
  assert.match(html, /Three original versions stay together in the archive/);
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
