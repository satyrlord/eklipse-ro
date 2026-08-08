import "@fontsource/syne/latin-ext-600.css";
import "@fontsource/syne/latin-ext-700.css";
import "@fontsource/ibm-plex-sans/latin-ext-400.css";
import "@fontsource/ibm-plex-sans/latin-ext-500.css";
import "@fontsource/ibm-plex-sans/latin-ext-600.css";
import "./styles.css";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!reducedMotion.matches && "IntersectionObserver" in window) {
  document.documentElement.classList.add("motion-ready");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.dataset.visible = "true";
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -12%", threshold: 0.08 },
  );

  document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
}

const plate = document.querySelector(".hero-plate");
if (plate && !reducedMotion.matches) {
  plate.addEventListener("pointermove", (event) => {
    const bounds = plate.getBoundingClientRect();
    plate.style.setProperty("--pointer-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    plate.style.setProperty("--pointer-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  });
}
