import { useEffect, useRef } from "react";

const START = 0.8;
const RANGE = 0.55;

const clamp = (v: number) => Math.min(1, Math.max(0, v));

function drawProgress(el: Element) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const start = vh - START * Math.min(r.height, vh);
  return clamp((start - r.top) / (RANGE * vh));
}

export function useDrawProgress(el: Element | null, onProgress: (p: number) => void) {
  const cb = useRef(onProgress);
  useEffect(() => {
    cb.current = onProgress;
  });

  useEffect(() => {
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cb.current(1);
      return;
    }
    let raf = 0;
    const draw = () => {
      raf = 0;
      cb.current(drawProgress(el));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [el]);
}
