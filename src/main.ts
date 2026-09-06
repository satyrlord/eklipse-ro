import "./styles.css";
import "./release-sequence.css";
import { calculateGravityPoint, calculatePageProgress, mostVisibleSectionId } from "./runtime";

const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const threshold = document.querySelector<HTMLElement>(".threshold");
const siteHeader = document.querySelector<HTMLElement>(".site-header");
const wordmark = document.querySelector(".wordmark");

root.classList.add("js-ready");

let progressFrame = 0;

function updatePageProgress() {
  progressFrame = 0;
  const progress = calculatePageProgress(window.scrollY, document.documentElement.scrollHeight, window.innerHeight);
  root.style.setProperty("--page-progress", progress.toFixed(4));
  if (threshold && siteHeader) {
    const thresholdEnd = threshold.offsetTop + threshold.offsetHeight;
    siteHeader.classList.toggle("site-header--past-threshold", window.scrollY >= thresholdEnd);
  }
}

function requestProgressUpdate() {
  if (!progressFrame) {
    progressFrame = window.requestAnimationFrame(updatePageProgress);
  }
}

window.addEventListener("scroll", requestProgressUpdate, { passive: true });
window.addEventListener("resize", requestProgressUpdate, { passive: true });
window.addEventListener("pageshow", requestProgressUpdate);
requestProgressUpdate();

let titleFitFrame = 0;

function needsFlowingText() {
  const style = getComputedStyle(root);
  const textStyle = getComputedStyle(wordmark ?? root);
  return Number.parseFloat(style.fontSize) > 16
    || Number.parseFloat(style.letterSpacing) > 0
    || Number.parseFloat(style.wordSpacing) > 0
    || Number.parseFloat(textStyle.letterSpacing) > 0
    || Number.parseFloat(textStyle.wordSpacing) > 0;
}

function fitSingleLineTitles() {
  titleFitFrame = 0;
  const expanded = needsFlowingText();
  root.classList.toggle("text-expanded", expanded);
  const titles = [...document.querySelectorAll<HTMLElement>(".threshold-release h2, .release-copy h3, .afterimage-release strong")];
  for (const title of titles) {
    title.style.removeProperty("--fit-font-size");
  }
  if (expanded) {
    requestProgressUpdate();
    return;
  }

  const fitting = titles.flatMap((title) => {
    const upper = Number.parseFloat(getComputedStyle(title).fontSize);
    return title.scrollWidth > title.clientWidth ? [{ title, lower: 8, upper }] : [];
  });

  // Batch all writes before geometry reads so each pass shares one layout.
  for (let iteration = 0; iteration < 8; iteration += 1) {
    for (const fit of fitting) {
      fit.title.style.setProperty("--fit-font-size", `${(fit.lower + fit.upper) / 2}px`);
    }
    for (const fit of fitting) {
      const candidate = (fit.lower + fit.upper) / 2;
      if (fit.title.scrollWidth <= fit.title.clientWidth) {
        fit.lower = candidate;
      } else {
        fit.upper = candidate;
      }
    }
  }
  for (const fit of fitting) {
    fit.title.style.setProperty("--fit-font-size", `${Math.floor(fit.lower * 10) / 10}px`);
  }
}

function requestTitleFit() {
  if (!titleFitFrame) {
    titleFitFrame = window.requestAnimationFrame(fitSingleLineTitles);
  }
}

window.addEventListener("resize", requestTitleFit, { passive: true });
window.addEventListener("pageshow", requestTitleFit);
void document.fonts.ready.then(requestTitleFit);
requestTitleFit();

if (wordmark) {
  new ResizeObserver(() => {
    const expanded = needsFlowingText();
    if (expanded !== root.classList.contains("text-expanded")) {
      requestTitleFit();
    }
  }).observe(wordmark);
}

if (threshold) {
  let pointerFrame = 0;
  let pointerX = 56;
  let pointerY = 24;

  const paintGravity = () => {
    pointerFrame = 0;
    threshold.style.setProperty("--gravity-x", `${pointerX.toFixed(2)}%`);
    threshold.style.setProperty("--gravity-y", `${pointerY.toFixed(2)}%`);
  };

  const requestGravityPaint = () => {
    if (!pointerFrame) {
      pointerFrame = window.requestAnimationFrame(paintGravity);
    }
  };

  const resetGravity = () => {
    pointerX = 56;
    pointerY = 24;
    requestGravityPaint();
  };

  threshold.addEventListener("pointermove", (event) => {
    if (reducedMotion.matches) {
      return;
    }

    const bounds = threshold.getBoundingClientRect();
    const point = calculateGravityPoint(event.clientX, event.clientY, bounds);
    pointerX = point.x;
    pointerY = point.y;
    requestGravityPaint();
  });

  threshold.addEventListener("pointerleave", resetGravity);
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) {
      if (pointerFrame) {
        window.cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
      }
      resetGravity();
    }
  });
}

const sectionLinks = new Map<string, HTMLAnchorElement>();

for (const link of document.querySelectorAll<HTMLAnchorElement>('.site-nav a[href^="#"]')) {
  const sectionId = link.hash.slice(1);
  if (sectionId) {
    sectionLinks.set(sectionId, link);
  }
}

if (sectionLinks.size > 0 && "IntersectionObserver" in window) {
  const sectionEntries = new Map<Element, IntersectionObserverEntry>();
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        sectionEntries.set(entry.target, entry);
      }
      const activeSectionId = mostVisibleSectionId([...sectionEntries.values()]);

      for (const [sectionId, link] of sectionLinks) {
        if (sectionId === activeSectionId) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      }
    },
    { rootMargin: "-30% 0px -55%", threshold: [0, 0.2, 0.5] },
  );

  for (const sectionId of sectionLinks.keys()) {
    const section = document.getElementById(sectionId);
    if (section) {
      sectionObserver.observe(section);
    }
  }
}
