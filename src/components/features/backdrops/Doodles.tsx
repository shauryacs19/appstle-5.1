"use client";

import { useEffect, useState } from "react";
import { useDrawProgress } from "@/hooks/useDrawProgress";
import { cn } from "@/lib/cn";
import { doodles, type DoodleName } from "./paths";

export type DoodleSpot = { name: DoodleName; className: string; rotate?: number };

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function Doodles({ spots, className, autoplay = false }: { spots: DoodleSpot[]; className?: string; autoplay?: boolean }) {
  const [box, setBox] = useState<HTMLDivElement | null>(null);
  const step = Math.min(0.08, 0.5 / Math.max(1, spots.length));

  useDrawProgress(autoplay ? null : box, (p) => {
    box?.querySelectorAll<SVGSVGElement>("svg[data-i]").forEach((svg) => {
      const i = Number(svg.dataset.i);
      const own = clamp((p - i * step) / (1 - (spots.length - 1) * step));
      const strokes = svg.querySelectorAll<SVGPathElement>("path");
      strokes.forEach((path, j) => {
        const t = clamp(own * strokes.length - j);
        path.style.strokeDashoffset = String(1 - t);
        path.style.opacity = t > 0.005 ? "1" : "0";
      });
    });
  });

  useEffect(() => {
    if (!autoplay || !box) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const draw = (svg: SVGSVGElement, t: number) => {
      const strokes = svg.querySelectorAll<SVGPathElement>("path");
      strokes.forEach((path, j) => {
        const k = clamp(t * strokes.length - j);
        path.style.strokeDashoffset = String(1 - k);
        path.style.opacity = k > 0.005 ? "1" : "0";
      });
    };
    const rafs: number[] = [];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const svg = e.target as SVGSVGElement;
          if (reduce) return draw(svg, 1);
          const delay = Number(svg.dataset.i) * 140;
          const t0 = performance.now() + delay;
          const tick = (now: number) => {
            const t = clamp((now - t0) / 1400);
            draw(svg, 1 - (1 - t) ** 3);
            if (t < 1) rafs.push(requestAnimationFrame(tick));
          };
          rafs.push(requestAnimationFrame(tick));
        }),
      { threshold: 0.4 },
    );
    box.querySelectorAll<SVGSVGElement>("svg[data-i]").forEach((svg) => io.observe(svg));
    return () => {
      io.disconnect();
      rafs.forEach(cancelAnimationFrame);
    };
  }, [autoplay, box, spots]);

  return (
    <div ref={setBox} aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10", className)}>
      {spots.map((s, i) => (
        <div key={`${s.name}-${i}`} className={cn("absolute", s.className)} style={{ rotate: s.rotate ? `${s.rotate}deg` : undefined }}>
          <svg
            data-i={i}
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-full overflow-visible motion-safe:animate-[float_7s_ease-in-out_infinite]"
            style={{ animationDuration: `${6 + (i % 3) * 1.6}s`, animationDelay: `${-i * 1.7}s` }}
          >
            {doodles[s.name].map((d, j) => (
              <path key={j} d={d} pathLength={1} strokeDasharray="1 1" style={{ strokeDashoffset: 1, opacity: 0 }} />
            ))}
          </svg>
        </div>
      ))}
    </div>
  );
}
