import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { test } from "vitest";
import { attribute, document, elements, notFoundDocument } from "./helpers/site-fixture.mjs";

const fontStylesheetPath = "/assets/fonts.css";
const fontStylesheet = await readFile(new URL("../public/assets/fonts.css", import.meta.url), "utf8");
const notFoundStyles = await readFile(new URL("../public/404.css", import.meta.url), "utf8");

function stylesheetHrefs(page) {
  return elements(page, "link")
    .filter((link) => attribute(link, "rel") === "stylesheet")
    .map((link) => attribute(link, "href"));
}

test("both pages use the shared self-hosted font stylesheet", () => {
  assert.ok(stylesheetHrefs(document).includes(fontStylesheetPath));
  assert.ok(stylesheetHrefs(notFoundDocument).includes(fontStylesheetPath));
  assert.doesNotMatch(notFoundStyles, /@font-face/, "the error page must not own a second font declaration set");
});

test("the shared font stylesheet owns every used font file", async () => {
  const fontFaces = [...fontStylesheet.matchAll(/@font-face\s*\{([^}]+)\}/g)].map((match) => {
    const block = match[1];
    const declaration = (name) => block.match(new RegExp(`${name}:\\s*([^;]+)`))?.[1].trim();
    return {
      family: declaration("font-family")?.replaceAll('"', ""),
      style: declaration("font-style"),
      weight: declaration("font-weight"),
      display: declaration("font-display"),
      source: block.match(/url\("(\/assets\/[^"]+\.woff2)"\)/)?.[1],
    };
  });
  const expected = [
    { family: "Syne", style: "normal", weight: "600", display: "swap", source: "/assets/syne-latin-ext-600.woff2" },
    { family: "Syne", style: "normal", weight: "700", display: "swap", source: "/assets/syne-latin-ext-700.woff2" },
    { family: "Syne", style: "normal", weight: "800", display: "swap", source: "/assets/syne-latin-ext-800.woff2" },
    { family: "IBM Plex Sans", style: "normal", weight: "400", display: "swap", source: "/assets/ibm-plex-sans-latin-ext-400.woff2" },
    { family: "IBM Plex Sans", style: "normal", weight: "600", display: "swap", source: "/assets/ibm-plex-sans-latin-ext-600.woff2" },
  ];
  const bySource = (left, right) => left.source.localeCompare(right.source);
  assert.deepEqual(fontFaces.toSorted(bySource), expected.toSorted(bySource));

  await Promise.all(fontFaces.map(({ source }) => access(new URL(`../public${source}`, import.meta.url))));
});

test("self-hosted font licenses ship with the font files", async () => {
  await Promise.all([
    access(new URL("../public/assets/licenses/syne-OFL-1.1.txt", import.meta.url)),
    access(new URL("../public/assets/licenses/ibm-plex-sans-OFL-1.1.txt", import.meta.url)),
  ]);
});
