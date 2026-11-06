"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/* Eased wheel scrolling for the whole site (off for reduced motion and touch, which keep native scroll). */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, anchors: { offset: -96 }, autoRaf: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
