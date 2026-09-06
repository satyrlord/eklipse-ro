import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "vitest";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const githubRoot = join(repositoryRoot, ".github");
const skillsRoot = join(githubRoot, "skills");
const designRouterRoot = join(skillsRoot, "design-router");

type RegistryEntry = {
  slug: string;
  name: string;
  themePath: string;
};

function markdownFiles(directory: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...markdownFiles(entryPath));
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === ".md") {
      files.push(entryPath);
    }
  }

  return files;
}

function projectMarkdownFiles(): string[] {
  const rootFiles = readdirSync(repositoryRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile() && extname(entry.name).toLowerCase() === ".md")
    .map((entry) => join(repositoryRoot, entry.name));

  return [...rootFiles, ...markdownFiles(githubRoot)].sort();
}

function withoutFencedCode(markdown: string): string {
  let fenceCharacter: string | undefined;
  let fenceLength = 0;
  const visibleLines: string[] = [];

  for (const line of markdown.split(/\r?\n/)) {
    const fence = /^\s{0,3}(`{3,}|~{3,})/.exec(line)?.[1];
    if (fence) {
      const character = fence[0]!;
      if (!fenceCharacter) {
        fenceCharacter = character;
        fenceLength = fence.length;
      } else if (character === fenceCharacter && fence.length >= fenceLength) {
        fenceCharacter = undefined;
        fenceLength = 0;
      }
      visibleLines.push("");
      continue;
    }

    visibleLines.push(fenceCharacter ? "" : line);
  }

  return visibleLines.join("\n");
}

function markdownForLinkChecks(markdown: string): string {
  return withoutFencedCode(markdown)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/`+[^`\r\n]*`+/g, "");
}

function localLinkDestinations(markdown: string): string[] {
  const destinations: string[] = [];
  const inlineLinkPattern = /(?<!!)\[[^\]\r\n]*\]\(\s*(?:<([^>\r\n]+)>|([^\s)\r\n]+))/g;

  for (const match of markdownForLinkChecks(markdown).matchAll(inlineLinkPattern)) {
    const destination = match[1] ?? match[2];
    if (destination && !/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(destination)) {
      destinations.push(destination);
    }
  }

  return destinations;
}

function githubHeadingAnchors(markdown: string): Set<string> {
  const anchors = new Set<string>();
  const explicitAnchorPattern = /\bid\s*=\s*["']([^"']+)["']/gi;

  for (const match of markdown.matchAll(explicitAnchorPattern)) {
    const anchor = match[1];
    if (anchor) {
      anchors.add(anchor.toLowerCase());
    }
  }

  for (const line of withoutFencedCode(markdown).split(/\r?\n/)) {
    const heading = /^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/.exec(line)?.[1];
    if (!heading) {
      continue;
    }

    const base = heading
      .replace(/<[^>]*>/g, "")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[\x60*_~]/g, "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s_-]/gu, "")
      .trim()
      .replace(/\s/gu, "-");

    if (!base) {
      continue;
    }

    let anchor = base;
    let suffix = 1;
    while (anchors.has(anchor)) {
      anchor = `${base}-${suffix}`;
      suffix += 1;
    }
    anchors.add(anchor);
  }

  return anchors;
}

function assertLocalLink(filePath: string, destination: string): void {
  const hashIndex = destination.indexOf("#");
  const rawPath = hashIndex === -1 ? destination : destination.slice(0, hashIndex);
  const rawFragment = hashIndex === -1 ? "" : destination.slice(hashIndex + 1);
  const pathPart = rawPath.split("?", 1)[0] ?? "";
  const fragment = rawFragment ? decodeURIComponent(rawFragment).toLowerCase() : "";
  const decodedPath = pathPart ? decodeURIComponent(pathPart) : "";
  const targetPath = decodedPath ? resolve(dirname(filePath), decodedPath) : filePath;
  const relativePath = relative(repositoryRoot, targetPath);
  const outsideRepository = isAbsolute(relativePath) || relativePath === ".." || relativePath.startsWith(`..${sep}`);

  assert.equal(outsideRepository, false, `${filePath} links outside the repository: ${destination}`);
  assert.ok(existsSync(targetPath), `${filePath} links to a missing file: ${destination}`);

  if (fragment && extname(targetPath).toLowerCase() === ".md") {
    const anchors = githubHeadingAnchors(readFileSync(targetPath, "utf8"));
    assert.ok(anchors.has(fragment), `${filePath} links to a missing heading: ${destination}`);
  }
}

test("all inline local Markdown links resolve to files and headings", () => {
  for (const filePath of projectMarkdownFiles()) {
    const markdown = readFileSync(filePath, "utf8");
    for (const destination of localLinkDestinations(markdown)) {
      assertLocalLink(filePath, destination);
    }
  }
});

test("the local link checker rejects missing targets and headings", () => {
  const missingTarget = localLinkDestinations("[`file.md`](missing.md)");
  assert.deepEqual(missingTarget, ["missing.md"]);
  assert.throws(
    () => assertLocalLink(join(repositoryRoot, "README.md"), missingTarget[0]!),
    /links to a missing file/,
  );
  assert.throws(
    () => assertLocalLink(join(repositoryRoot, "README.md"), "AGENTS.md#missing-heading"),
    /links to a missing heading/,
  );
});

test("the skill catalog lists each skill folder once", () => {
  const catalog = readFileSync(join(skillsRoot, "SKILLS.md"), "utf8");
  const listedSkills = [...catalog.matchAll(/^\|\s*`([^`]+)`\s*\|/gm)].map((match) => match[1]!);
  const skillFolders = readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(skillsRoot, entry.name, "SKILL.md")))
    .map((entry) => entry.name);

  assert.equal(new Set(listedSkills).size, listedSkills.length, "the skill catalog must not list a skill twice");
  assert.deepEqual([...listedSkills].sort(), [...skillFolders].sort());
});

test("the design registry maps each theme to its local file", () => {
  const parsed: unknown = JSON.parse(readFileSync(join(designRouterRoot, "registry-index.json"), "utf8"));
  assert.ok(parsed && typeof parsed === "object" && !Array.isArray(parsed), "the design registry must be an object");

  const registry = parsed as Record<string, RegistryEntry>;
  const themeSlugs = readdirSync(join(designRouterRoot, "themes"), { withFileTypes: true })
    .filter((entry) => entry.isFile() && extname(entry.name).toLowerCase() === ".md")
    .map((entry) => entry.name.slice(0, -extname(entry.name).length));

  assert.deepEqual(Object.keys(registry).sort(), [...themeSlugs].sort());

  const catalog = readFileSync(join(designRouterRoot, "CATALOG.md"), "utf8");
  const catalogThemes = new Set(localLinkDestinations(catalog).filter((path) => path.startsWith("themes/")));
  assert.deepEqual([...catalogThemes].sort(), themeSlugs.map((slug) => `themes/${slug}.md`).sort());

  const mappedPaths = new Set<string>();
  for (const [slug, entry] of Object.entries(registry)) {
    assert.equal(entry.slug, slug, `${slug} must repeat its registry key in slug`);
    assert.equal(typeof entry.name, "string");
    assert.equal(entry.themePath, `themes/${slug}.md`);

    const themePath = resolve(designRouterRoot, entry.themePath);
    const relativeThemePath = relative(designRouterRoot, themePath);
    assert.equal(relativeThemePath.startsWith(`..${sep}`), false, `${slug} must stay inside the design-router package`);
    assert.ok(existsSync(themePath), `${slug} must map to an existing theme file`);
    assert.equal(statSync(themePath).isFile(), true, `${slug} must map to a file`);
    mappedPaths.add(relativeThemePath);
  }

  assert.equal(mappedPaths.size, themeSlugs.length, "each theme file must have one registry entry");
});
