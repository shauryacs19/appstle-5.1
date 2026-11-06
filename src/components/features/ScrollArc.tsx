"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/* One light circular arc from the top of a card to the bottom, drawn as the card scrolls through the
   screen. A single curve (no direction changes) that frames the copy beside it. Drawn in the box's own
   pixel size so the stroke stays even and the draw-on stays one continuous line. */
export function ScrollArc({ side = "left", color = "var(--color-sky-blue)", className }: { side?: "left" | "right"; color?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "end 0.55"] });
  const drawn = useSpring(scrollYProgress, { stiffness: 70, damping: 22, restDelta: 0.001 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setBox({ w: el.offsetWidth, h: el.offsetHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = box;
  const x = side === "left" ? 0 : w;
  const d = w && h ? `M ${x} 0 A ${w} ${h * 0.6} 0 0 ${side === "left" ? 1 : 0} ${x} ${h}` : "";

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-y-[6%] -z-10 h-[88%] w-[min(34%,24rem)]", side === "left" ? "left-0" : "right-0", className)}
    >
      {d && (
        <svg viewBox={`0 0 ${w} ${h}`} className="size-full overflow-visible">
          <motion.path d={d} fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" style={{ pathLength: reduce ? 1 : drawn }} />
        </svg>
      )}
    </div>
  );
}
