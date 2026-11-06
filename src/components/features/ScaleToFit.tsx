"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function ScaleToFit({ children, className, align = "center" }: { children: ReactNode; className?: string; align?: "center" | "start" }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const measure = () => {
      const natural = i.offsetHeight;
      const avail = o.clientHeight;
      if (!natural || !avail) return;
      const next = Math.min(1, avail / natural);
      setScale((s) => (Math.abs(s - next) > 0.01 ? next : s));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(o);
    ro.observe(i);
    measure();
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outer} className={cn("relative h-full w-full overflow-hidden", className)}>
      <div
        ref={inner}
        style={
          scale < 1
            ? { transform: `scale(${scale})`, transformOrigin: align === "center" ? "top center" : "top left", width: `${100 / scale}%`, marginLeft: align === "center" ? `${(100 - 100 / scale) / 2}%` : undefined }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
}
