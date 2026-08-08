import "./styles.css";
import "./release-sequence.css";
import { calculateGravityPoint, calculatePageProgress, mostVisibleSectionId } from "./runtime";

const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

root.classList.add("js-ready");

let progressFrame = 0;

function updatePageProgress() {
  progressFrame = 0;
  const progress = calculatePageProgress(window.scrollY, document.documentElement.scrollHeight, window.innerHeight);
  root.style.setProperty("--page-progress", progress.toFixed(4));
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

const threshold = document.querySelector<HTMLElement>(".threshold");

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
