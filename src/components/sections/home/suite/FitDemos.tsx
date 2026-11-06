"use client";

import { useLayoutEffect } from "react";

const MIN = 0.55;

export function FitDemos({ root = "#products" }: { root?: string }) {
  // layout effect + a synchronous first pass, so a newly shown demo is sized before it is painted
  useLayoutEffect(() => {
    const section = document.querySelector<HTMLElement>(root);
    if (!section) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    let timer = 0;

    const apply = () => {
        section.querySelectorAll<HTMLElement>("[data-fit-card]").forEach((card) => {
          const demo = card.querySelector<HTMLElement>("[data-fit-demo]");
          const stage = card.querySelector<HTMLElement>("[data-fit-stage]");
          if (!demo || !stage) return;
          if (!desktop.matches) {
            demo.style.zoom = "";
            return;
          }
          const max = Number(demo.dataset.fitMax) || 1;
          const z = parseFloat(getComputedStyle(demo).zoom) || 1;
          const cs = getComputedStyle(stage);
          const stagePad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
          const natural = demo.getBoundingClientRect().height / z;
          if (!natural) return;
          const next = Math.min(max, Math.max(MIN, (stage.clientHeight - stagePad) / natural));
          if (Math.abs(next - z) > 0.005) demo.style.zoom = next.toFixed(3);
        });
    };
    const fit = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(apply, 40);
    };

    apply();
    const ro = new ResizeObserver(fit);
    section.querySelectorAll("[data-fit-demo] > *").forEach((el) => ro.observe(el));
    window.addEventListener("resize", fit);
    desktop.addEventListener("change", fit);
    document.fonts?.ready.then(fit);
    return () => {
      window.clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener("resize", fit);
      desktop.removeEventListener("change", fit);
    };
  }, [root]);

  return null;
}
