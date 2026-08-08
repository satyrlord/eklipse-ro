import { expect, test, type ConsoleMessage, type Page, type Request, type Route } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

test.afterEach(async ({ page }, testInfo) => {
  if (process.env.VITE_COVERAGE !== "true") {
    return;
  }

  const coverage = await page.evaluate(() => (globalThis as { __coverage__?: unknown }).__coverage__);
  expect(coverage, "the browser build must expose Istanbul coverage").toBeTruthy();

  const outputDirectory = process.env.NYC_OUTPUT_DIR ?? "tmp/coverage/browser/.nyc_output";
  const safeTestId = testInfo.testId.replace(/[^a-z0-9.-]+/gi, "-");
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(resolve(outputDirectory, `${process.pid}-${testInfo.workerIndex}-${safeTestId}.json`), JSON.stringify(coverage));
});

const viewports = [
  { name: "narrow mobile", width: 320, height: 800 },
  { name: "mobile boundary", width: 480, height: 900 },
  { name: "single-column end", width: 760, height: 900 },
  { name: "three-column start", width: 761, height: 900 },
  { name: "narrow desktop grid", width: 820, height: 900 },
  { name: "responsive type end", width: 1000, height: 900 },
  { name: "wide type start", width: 1001, height: 900 },
  { name: "common desktop", width: 1024, height: 900 },
  { name: "desktop", width: 1440, height: 900 },
];

async function openSite(page: Page) {
  const consoleErrors: string[] = [];
  const localRequestFailures: string[] = [];
  const pageErrors: string[] = [];

  page.on("console", (message: ConsoleMessage) => {
    if (message.type() === "error" && message.location().url.startsWith("http://127.0.0.1:4173")) {
      consoleErrors.push(message.text());
    }
  });
  page.on("requestfailed", (request: Request) => {
    if (request.url().startsWith("http://127.0.0.1:4173")) {
      localRequestFailures.push(`${request.url()}: ${request.failure()?.errorText}`);
    }
  });
  page.on("pageerror", (error: Error) => {
    pageErrors.push(error.message);
  });
  await page.route("https://bandcamp.com/**", (route: Route) => route.abort());
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  return () => {
    expect(consoleErrors).toEqual([]);
    expect(localRequestFailures).toEqual([]);
    expect(pageErrors).toEqual([]);
  };
}

for (const viewport of viewports) {
  test(`titles and page geometry fit at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const assertNoLocalErrors = await openSite(page);

    const pageGeometry = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(pageGeometry.scrollWidth).toBeLessThanOrEqual(pageGeometry.clientWidth + 1);

    const titles = await page.locator(".threshold-release h2, .release-copy h3, .afterimage-release strong").evaluateAll((nodes) =>
      nodes.map((node) => ({
        text: node.textContent.replace(/\s+/g, " ").trim(),
        clientWidth: node.clientWidth,
        scrollWidth: node.scrollWidth,
        height: node.getBoundingClientRect().height,
        lineHeight: Number.parseFloat(getComputedStyle(node).lineHeight),
        whiteSpace: getComputedStyle(node).whiteSpace,
      })),
    );

    for (const title of titles) {
      expect(title.height, title.text).toBeLessThanOrEqual(title.lineHeight + 1);
      expect(title.whiteSpace, title.text).toBe("nowrap");
      expect(title.scrollWidth, title.text).toBeLessThanOrEqual(title.clientWidth + 1);
    }
    assertNoLocalErrors();
  });
}

test("archive covers keep the documented desktop and mobile geometry", async ({ page }) => {
  await page.setViewportSize({ width: 820, height: 900 });
  const assertNoLocalErrors = await openSite(page);

  const desktop = await page.locator(".afterimage-release").evaluateAll((nodes) =>
    nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return { left: rect.left, top: rect.top, width: rect.width };
    }),
  );
  expect(Math.max(...desktop.map(({ top }) => top)) - Math.min(...desktop.map(({ top }) => top))).toBeLessThanOrEqual(1);
  expect(Math.max(...desktop.map(({ width }) => width)) - Math.min(...desktop.map(({ width }) => width))).toBeLessThanOrEqual(1);
  expect(desktop[0]!.left).toBeLessThan(desktop[1]!.left);
  expect(desktop[1]!.left).toBeLessThan(desktop[2]!.left);

  await page.setViewportSize({ width: 480, height: 900 });
  const mobile = await page.locator(".afterimage-release").evaluateAll((nodes) =>
    nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return { left: rect.left, top: rect.top, width: rect.width };
    }),
  );
  expect(Math.max(...mobile.map(({ left }) => left)) - Math.min(...mobile.map(({ left }) => left))).toBeLessThanOrEqual(1);
  expect(Math.max(...mobile.map(({ width }) => width)) - Math.min(...mobile.map(({ width }) => width))).toBeLessThanOrEqual(1);
  expect(mobile[0]!.top).toBeLessThan(mobile[1]!.top);
  expect(mobile[1]!.top).toBeLessThan(mobile[2]!.top);
  assertNoLocalErrors();
});

test("release details stay vertically centered against their covers on desktop", async ({ page }) => {
  const alignmentAt = async (viewport: { width: number; height: number }) => {
    await page.setViewportSize(viewport);
    return page.locator(".release-spread").evaluateAll((releases) =>
      releases.map((release) => {
        const cover = release.querySelector(".release-visual img")!.getBoundingClientRect();
        const details = release.querySelector(".release-copy")!.getBoundingClientRect();
        return {
          coverCenterY: cover.top + cover.height / 2,
          detailsCenterY: details.top + details.height / 2,
          title: release.querySelector("h3")!.textContent.replace(/\s+/g, " ").trim(),
        };
      }),
    );
  };

  await page.setViewportSize({ width: 1440, height: 900 });
  const assertNoLocalErrors = await openSite(page);

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 820, height: 900 },
    { width: 761, height: 900 },
  ]) {
    const releases = await alignmentAt(viewport);
    for (const release of releases) {
      expect(Math.abs(release.coverCenterY - release.detailsCenterY), release.title).toBeLessThanOrEqual(1);
    }
  }
  assertNoLocalErrors();
});

test("release players keep fixed clearance from covers on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1259, height: 779 });
  const assertNoLocalErrors = await openSite(page);

  for (const viewport of [
    { width: 1259, height: 779 },
    { width: 1024, height: 900 },
    { width: 820, height: 900 },
    { width: 761, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    const releases = page.locator(".release-spread");

    for (let index = 0; index < await releases.count(); index += 1) {
      const release = releases.nth(index);
      await release.scrollIntoViewIfNeeded();
      const image = release.locator(".release-visual img");
      await expect.poll(() => image.evaluate((node) => (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth > 0)).toBe(true);
    }

    const clearances = await releases.evaluateAll((nodes) =>
      nodes.map((release) => {
        const cover = release.querySelector(".release-visual img")!.getBoundingClientRect();
        const player = release.querySelector(".bandcamp-player")!.getBoundingClientRect();
        const gap = cover.right <= player.left ? player.left - cover.right : cover.left >= player.right ? cover.left - player.right : -Math.min(cover.right - player.left, player.right - cover.left);
        return { gap, title: release.querySelector("h3")!.textContent.replace(/\s+/g, " ").trim() };
      }),
    );

    for (const clearance of clearances) {
      expect(clearance.gap, `${clearance.title} at ${viewport.width}px`).toBeGreaterThanOrEqual(31);
    }
  }
  assertNoLocalErrors();
});

test("every release description separates its title from its player", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const assertNoLocalErrors = await openSite(page);

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 820, height: 900 },
    { width: 480, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    const releases = await page.locator(".release-spread").evaluateAll((nodes) =>
      nodes.map((release) => {
        const title = release.querySelector("h3")!.getBoundingClientRect();
        const description = release.querySelector(".release-copy > p")!.getBoundingClientRect();
        const player = release.querySelector(".bandcamp-player")!.getBoundingClientRect();
        return {
          descriptionBottom: description.bottom,
          descriptionTop: description.top,
          playerTop: player.top,
          titleBottom: title.bottom,
          titleText: release.querySelector("h3")!.textContent.replace(/\s+/g, " ").trim(),
        };
      }),
    );

    for (const release of releases) {
      expect(release.descriptionTop, release.titleText).toBeGreaterThan(release.titleBottom);
      expect(release.playerTop, release.titleText).toBeGreaterThan(release.descriptionBottom);
    }
  }
  assertNoLocalErrors();
});

test("keyboard focus and fragment navigation remain visible and functional", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const assertNoLocalErrors = await openSite(page);

  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#releases$/);
  await expect(page.locator("#releases")).toBeFocused();

  await page.goto("/", { waitUntil: "networkidle" });
  const expectedHeaderOrder = [".skip-link", ".wordmark", '.site-nav a[href="#project"]', '.site-nav a[href="#releases"]', ".site-nav .bandcamp-link"];
  for (const selector of expectedHeaderOrder) {
    await page.keyboard.press("Tab");
    await expect(page.locator(selector)).toBeFocused();
  }

  const links = page.locator("a");
  for (let index = 0; index < (await links.count()); index += 1) {
    const link = links.nth(index);
    await link.focus();
    const focusStyle = await link.evaluate((node) => {
      const style = getComputedStyle(node);
      return { outlineStyle: style.outlineStyle, outlineWidth: Number.parseFloat(style.outlineWidth), boxShadow: style.boxShadow };
    });
    expect(focusStyle.outlineStyle).toBe("solid");
    expect(focusStyle.outlineWidth).toBeGreaterThanOrEqual(3);
    expect(focusStyle.boxShadow).not.toBe("none");
  }
  assertNoLocalErrors();
});

test("images and player metadata resolve from the production page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const assertNoLocalErrors = await openSite(page);

  const images = page.locator("img");
  for (let index = 0; index < (await images.count()); index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((node) => (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth > 0)).toBe(true);
    await expect(image).toHaveAttribute("alt", /\S/);
  }

  const players = await page.locator("iframe.bandcamp-player").evaluateAll((nodes) =>
    nodes.map((node) => {
      const frame = node as HTMLIFrameElement;
      return { title: frame.title, source: frame.src };
    }),
  );
  expect(players).toHaveLength(8);
  for (const player of players) {
    expect(player.title).toMatch(/Bandcamp album player$/);
    expect(player.source).toMatch(/^https:\/\/bandcamp\.com\/EmbeddedPlayer\//);
  }
  assertNoLocalErrors();
});

test("the vector backdrop remains visible and the threshold wordmark stays inside its section", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const assertNoLocalErrors = await openSite(page);

  await expect(page.locator(".space-backdrop")).toBeVisible();
  const surfaces = await page
    .locator(".threshold, .project-section, .sequence-header, .release-spread, .afterimage, .event-horizon")
    .evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).backgroundColor));
  const surfaceAlphas = surfaces.map((color) => Number(color.match(/(?:,|\/)\s*([\d.]+)\)?$/)?.[1]));
  expect(surfaceAlphas.every((alpha) => alpha === 0.5)).toBe(true);

  const lockupGeometry = () => page.locator(".threshold").evaluate((threshold) => {
    const lockup = threshold.querySelector(".threshold-lockup")!.getBoundingClientRect();
    const section = threshold.getBoundingClientRect();
    const release = threshold.querySelector(".threshold-release")!.getBoundingClientRect();
    const wordmark = threshold.querySelector(".threshold-wordmark")!.getBoundingClientRect();
    return {
      lockupBottom: lockup.bottom,
      lockupTop: lockup.top,
      releaseCenterY: release.top + release.height / 2,
      releaseLeft: release.left,
      sectionBottom: section.bottom,
      sectionTop: section.top,
      wordmarkCenterY: wordmark.top + wordmark.height / 2,
      wordmarkRight: wordmark.right,
    };
  });

  const desktopLockup = await lockupGeometry();
  expect(desktopLockup.lockupTop).toBeGreaterThanOrEqual(desktopLockup.sectionTop);
  expect(desktopLockup.lockupBottom).toBeLessThanOrEqual(desktopLockup.sectionBottom);
  expect(desktopLockup.wordmarkRight).toBeLessThanOrEqual(desktopLockup.releaseLeft);
  expect(Math.abs(desktopLockup.wordmarkCenterY - desktopLockup.releaseCenterY)).toBeLessThanOrEqual(1);

  await page.setViewportSize({ width: 555, height: 411 });
  const shortLockup = await lockupGeometry();
  expect(shortLockup.lockupTop).toBeGreaterThanOrEqual(shortLockup.sectionTop);
  expect(shortLockup.lockupBottom).toBeLessThanOrEqual(shortLockup.sectionBottom);
  expect(shortLockup.wordmarkRight).toBeLessThanOrEqual(shortLockup.releaseLeft);
  expect(Math.abs(shortLockup.wordmarkCenterY - shortLockup.releaseCenterY)).toBeLessThanOrEqual(1);
  assertNoLocalErrors();
});

test("the daisyUI action theme preserves the eklipse control contract", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const assertNoLocalErrors = await openSite(page);

  await expect(page.locator("html")).toHaveAttribute("data-theme", "eklipse");
  const action = page.locator(".primary-action").first();
  await expect(action).toHaveClass(/\bbtn-primary\b/);

  const style = await action.evaluate((node) => {
    const computed = getComputedStyle(node);
    return {
      backgroundColor: computed.backgroundColor,
      borderRadius: computed.borderRadius,
      boxShadow: computed.boxShadow,
      color: computed.color,
      display: computed.display,
      minHeight: Number.parseFloat(computed.minHeight),
    };
  });

  expect(style).toEqual({
    backgroundColor: "rgb(255, 103, 72)",
    borderRadius: "0px",
    boxShadow: "none",
    color: "rgb(8, 7, 6)",
    display: "flex",
    minHeight: 56,
  });
  assertNoLocalErrors();
});

test("reduced motion removes smooth scrolling and decorative movement", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  const assertNoLocalErrors = await openSite(page);

  const before = await page.locator(".threshold").evaluate((node) => ({
    gravityX: getComputedStyle(node).getPropertyValue("--gravity-x"),
    gravityY: getComputedStyle(node).getPropertyValue("--gravity-y"),
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    animationDuration: getComputedStyle(document.querySelector(".black-hole__mass")!).animationDuration,
    blackHoleTransform: getComputedStyle(document.querySelector(".black-hole__mass")!).transform,
    gravityRingsTransform: getComputedStyle(node.querySelector(".gravity-map__rings")!).transform,
  }));
  await page.mouse.move(800, 250);
  await page.waitForTimeout(50);
  const after = await page.locator(".threshold").evaluate((node) => ({
    gravityX: getComputedStyle(node).getPropertyValue("--gravity-x"),
    gravityY: getComputedStyle(node).getPropertyValue("--gravity-y"),
  }));

  expect(before.scrollBehavior).toBe("auto");
  expect(Number.parseFloat(before.animationDuration)).toBeLessThanOrEqual(0.000001);
  expect(before.blackHoleTransform).toBe("none");
  expect(before.gravityRingsTransform).toBe("none");
  expect(after).toEqual({ gravityX: before.gravityX, gravityY: before.gravityY });
  assertNoLocalErrors();
});

test("live reduced-motion changes stop and resume pointer movement", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  const assertNoLocalErrors = await openSite(page);
  const threshold = page.locator(".threshold");
  const bounds = (await threshold.boundingBox())!;
  expect(bounds).not.toBeNull();

  const gravity = () =>
    threshold.evaluate((node) => ({
      x: Number.parseFloat(getComputedStyle(node).getPropertyValue("--gravity-x")),
      y: Number.parseFloat(getComputedStyle(node).getPropertyValue("--gravity-y")),
    }));

  await page.mouse.move(bounds.x + bounds.width * 0.75, bounds.y + bounds.height * 0.2);
  await expect.poll(gravity).not.toEqual({ x: 56, y: 24 });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(gravity).toEqual({ x: 56, y: 24 });
  await page.mouse.move(bounds.x + bounds.width * 0.15, bounds.y + bounds.height * 0.7);
  await page.waitForTimeout(50);
  expect(await gravity()).toEqual({ x: 56, y: 24 });

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.mouse.move(bounds.x + bounds.width * 0.8, bounds.y + bounds.height * 0.45);
  await expect.poll(gravity).not.toEqual({ x: 56, y: 24 });
  assertNoLocalErrors();
});
