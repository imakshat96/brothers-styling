import { useEffect } from "react";
import Lenis from "lenis";

// Quartic ease-out: fast start, glides to a stop
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    // Intercept every anchor click whose href starts with "#" and let
    // Lenis animate the scroll instead of the browser jumping instantly.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest("a[href^='#']");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { duration: 1.6, easing: easeOutQuart });
    };

    document.addEventListener("click", onClick);

    let raf: number;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
