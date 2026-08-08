import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "vitest";

const design = await readFile(new URL("../DESIGN.md", import.meta.url), "utf8");
const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");

function frontMatter(source: string): string {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(match, "DESIGN.md must open with a YAML front-matter block");
  return match[1]!;
}

function frontMatterColors(source: string): Record<string, string> {
  const block = frontMatter(source);
  const colorsMatch = block.match(/^colors:\r?\n((?:  .+\r?\n?)+)/m);
  assert.ok(colorsMatch, "DESIGN.md front matter must define a colors map");

  const colors: Record<string, string> = {};
  for (const line of colorsMatch[1]!.split(/\r?\n/)) {
    const entry = line.match(/^ {2}([a-z-]+): "([^"]+)"$/);
    if (entry) {
      colors[entry[1]!] = entry[2]!;
    }
  }
  return colors;
}

test("DESIGN.md color tokens match the styles.css custom properties", () => {
  const colors = frontMatterColors(design);

  for (const [name, value] of Object.entries(colors)) {
    const declaration = `--${name}: ${value};`;
    assert.ok(styles.includes(declaration), `styles.css must declare ${declaration} from DESIGN.md`);
  }
});

test("section fields expose the persistent backdrop at 50 percent opacity", () => {
  assert.ok(styles.includes("--section-field-opacity: 0.5;"));
  assert.doesNotMatch(styles, /url\("\/assets\/covers\//, "album covers must not appear in CSS backgrounds");
});
