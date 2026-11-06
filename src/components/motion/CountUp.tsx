"use client";

import { animate, useInView, useReducedMotion, type AnimationPlaybackControls } from "motion/react";
import { useEffect, useRef, useState } from "react";

const format = (v: number, decimals: number, prefix: string, suffix: string) =>
  `${prefix}${v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;

export function CountUp({
  to,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [label] = useState(() => format(to, decimals, prefix, suffix));
  const started = useRef(false);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    if (reduce) return;
    controls.current = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (textRef.current) textRef.current.textContent = format(v, decimals, prefix, suffix);
      },
    });
  }, [inView, reduce, to, duration, decimals, prefix, suffix]);

  useEffect(() => () => controls.current?.stop(), []);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{label}</span>
      <span ref={textRef} aria-hidden>
        {label}
      </span>
    </span>
  );
}
