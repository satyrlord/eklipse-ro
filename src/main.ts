import "./styles.css";
import "./release-sequence.css";
import { calculateGravityPoint, calculatePageProgress, mostVisibleSectionId } from "./runtime";

const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const threshold = document.querySelector<HTMLElement>(".threshold");
const siteHeader = document.querySelector<HTMLElement>(".site-header");

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

function fitSingleLineTitle(title: HTMLElement) {
  title.style.removeProperty("--fit-font-size");
  if (title.scrollWidth <= title.clientWidth) {
    return;
  }

  const naturalStyle = getComputedStyle(title);
  const naturalSize = Number.parseFloat(naturalStyle.fontSize);
  const configuredMinimum = naturalStyle.getPropertyValue("--fit-title-min").trim();
  title.style.setProperty("--fit-font-size", configuredMinimum || `${naturalSize}px`);
  const minimumSize = Number.parseFloat(getComputedStyle(title).fontSize);
  let lower = Math.min(naturalSize, minimumSize);
  let upper = naturalSize;

  while (title.scrollWidth > title.clientWidth && lower > 8) {
    lower = Math.max(8, lower - 2);
    title.style.setProperty("--fit-font-size", `${lower}px`);
  }

  for (let iteration = 0; iteration < 8; iteration += 1) {
    const candidate = (lower + upper) / 2;
    title.style.setProperty("--fit-font-size", `${candidate}px`);
    if (title.scrollWidth <= title.clientWidth) {
      lower = candidate;
    } else {
      upper = candidate;
    }
  }

  title.style.setProperty("--fit-font-size", `${Math.floor(lower * 10) / 10}px`);
}

function fitSingleLineTitles() {
  titleFitFrame = 0;
  for (const title of document.querySelectorAll<HTMLElement>(".threshold-release h2, .release-copy h3, .afterimage-release strong")) {
    fitSingleLineTitle(title);
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
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const activeSectionId = mostVisibleSectionId(entries);

      if (!activeSectionId) {
        return;
      }

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
