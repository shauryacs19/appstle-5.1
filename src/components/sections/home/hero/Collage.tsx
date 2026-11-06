"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { createContext, useContext, useEffect, type CSSProperties, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

type Pointer = { x: MotionValue<number>; y: MotionValue<number> };
const PointerCtx = createContext<Pointer | null>(null);

export function ParallaxField({ target, children }: { target: RefObject<HTMLElement | null>; children: ReactNode }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const x = useSpring(rx, { stiffness: 50, damping: 16, mass: 0.7 });
  const y = useSpring(ry, { stiffness: 50, damping: 16, mass: 0.7 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = target.current;
    if (!el || reduce || !matchMedia("(pointer: fine)").matches) return;
    let rect = el.getBoundingClientRect();
    const measure = () => (rect = el.getBoundingClientRect());
    const move = (e: PointerEvent) => {
      rx.set((e.clientX - rect.left) / rect.width - 0.5);
      ry.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const leave = () => {
      rx.set(0);
      ry.set(0);
    };
    el.addEventListener("pointerenter", measure);
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("pointerenter", measure);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [target, reduce, rx, ry]);

  return <PointerCtx.Provider value={{ x, y }}>{children}</PointerCtx.Provider>;
}

function Depth({ depth, className, style, children }: { depth: number; className?: string; style?: CSSProperties; children: ReactNode }) {
  const p = useContext(PointerCtx);
  const zero = useMotionValue(0);
  const x = useTransform(p?.x ?? zero, (v) => v * depth);
  const y = useTransform(p?.y ?? zero, (v) => v * depth * 0.7);
  return (
    <motion.div className={className} style={{ ...style, x, y }}>
      {children}
    </motion.div>
  );
}

type Float = { d: number; y: number; delay?: number } | false;

export function Piece({
  className,
  depth = 10,
  rotate = 0,
  float = { d: 8, y: 8 },
  delay = 0,
  from = { x: 0, y: 34 },
  z,
  children,
}: {
  className?: string;
  depth?: number;
  rotate?: number;
  float?: Float;
  delay?: number;
  from?: { x: number; y: number };
  z?: number;
  children: ReactNode;
}) {
  return (
    <Depth depth={depth} className={cn("absolute", className)} style={z === undefined ? undefined : { zIndex: z }}>
      <motion.div
        initial={{ opacity: 0, x: from.x, y: from.y, scale: 0.9, rotate: rotate * 2.2 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
        transition={{ duration: 1.25, delay, ease: ease.out, opacity: { duration: 0.6, delay } }}
      >
        <div
          className={float ? "hero-float" : undefined}
          style={float ? ({ "--fd": `${float.d}s`, "--fy": `${float.y}px`, "--fdl": `${float.delay ?? 0}s` } as CSSProperties) : undefined}
        >
          <div className="hero-tilt" style={{ "--r": `${rotate}deg` } as CSSProperties}>
            {children}
          </div>
        </div>
      </motion.div>
    </Depth>
  );
}

export function Deco({ className, depth = -8, delay = 0.2, children }: { className?: string; depth?: number; delay?: number; children?: ReactNode }) {
  return (
    <Depth depth={depth} className={cn("pointer-events-none absolute", className)}>
      <motion.div
        className="size-full"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay, ease: ease.out }}
      >
        {children}
      </motion.div>
    </Depth>
  );
}
