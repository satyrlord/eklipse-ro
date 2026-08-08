import "./styles.css";
import "./release-sequence.css";

const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

root.classList.add("js-ready");

let progressFrame = 0;

function updatePageProgress() {
  progressFrame = 0;
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollRange)) : 0;
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

const threshold = document.querySelector(".threshold");

if (threshold && !reducedMotion.matches) {
  let pointerFrame = 0;
  let pointerX = 56;
  let pointerY = 24;

  const paintGravity = () => {
    pointerFrame = 0;
    threshold.style.setProperty("--gravity-x", `${pointerX.toFixed(2)}%`);
    threshold.style.setProperty("--gravity-y", `${pointerY.toFixed(2)}%`);
  };

  threshold.addEventListener("pointermove", (event) => {
    const bounds = threshold.getBoundingClientRect();
    pointerX = ((event.clientX - bounds.left) / bounds.width) * 100;
    pointerY = ((event.clientY - bounds.top) / bounds.height) * 100;
    if (!pointerFrame) {
      pointerFrame = window.requestAnimationFrame(paintGravity);
    }
  });

  threshold.addEventListener("pointerleave", () => {
    pointerX = 56;
    pointerY = 24;
    if (!pointerFrame) {
      pointerFrame = window.requestAnimationFrame(paintGravity);
    }
  });
}

const sectionLinks = new Map(
  [...document.querySelectorAll('.site-nav a[href^="#"]')].map((link) => [link.getAttribute("href").slice(1), link]),
);

if (sectionLinks.size > 0 && "IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const active = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

      if (!active) {
        return;
      }

      for (const [sectionId, link] of sectionLinks) {
        if (sectionId === active.target.id) {
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
