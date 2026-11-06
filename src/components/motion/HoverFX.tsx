"use client";

import { useEffect } from "react";

export function HoverFX() {
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;
    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;

    const release = (el: HTMLElement | null, kind: "mag" | "tilt") => {
      if (!el) return;
      if (kind === "mag") {
        el.style.setProperty("--mag-x", "0px");
        el.style.setProperty("--mag-y", "0px");
      } else {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      }
    };

    const apply = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const target = e.target instanceof Element ? e.target : null;

      const mag = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (mag !== magnet) release(magnet, "mag");
      magnet = mag;
      if (mag) {
        const r = mag.getBoundingClientRect();
        const pull = parseFloat(mag.dataset.magnetic || "") || 6;
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        mag.style.setProperty("--mag-x", `${(dx * pull).toFixed(2)}px`);
        mag.style.setProperty("--mag-y", `${(dy * pull * 0.6).toFixed(2)}px`);
      }

      const tl = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (tl !== tilt) release(tilt, "tilt");
      tilt = tl;
      if (tl) {
        const r = tl.getBoundingClientRect();
        const max = parseFloat(tl.dataset.tilt || "") || 4;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tl.style.setProperty("--rx", `${(-py * max * 2).toFixed(2)}deg`);
        tl.style.setProperty("--ry", `${(px * max * 2).toFixed(2)}deg`);
      }
    };

    const move = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const leaveWindow = () => {
      release(magnet, "mag");
      release(tilt, "tilt");
      magnet = tilt = null;
    };

    document.documentElement.dataset.hoverfx = "";
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leaveWindow);
    return () => {
      delete document.documentElement.dataset.hoverfx;
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leaveWindow);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
