"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

type Tag = "div" | "section" | "li" | "ul" | "ol" | "dl" | "article" | "header" | "p" | "span" | "figure";

function withDelay(variants: Variants, delay: number): Variants {
  const show = variants.show;
  if (!show || typeof show === "function") return variants;
  return { ...variants, show: { ...show, transition: { ...(show.transition ?? {}), delay } } };
}

function useRevealState(amount: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { ...inViewOnce, amount });
  return [ref, inView ? "show" : "hidden"] as const;
}

export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = "div",
  amount,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: Tag;
  amount?: number;
}) {
  const Cmp = motion[as] as typeof motion.div;
  const [ref, state] = useRevealState(amount ?? inViewOnce.amount);
  return (
    <Cmp ref={ref} className={className} variants={delay ? withDelay(variants, delay) : variants} initial="hidden" animate={state}>
      {children}
    </Cmp>
  );
}

export function Stagger({
  children,
  className,
  interval = 0.08,
  delay = 0,
  as = "div",
  amount,
}: {
  children: ReactNode;
  className?: string;
  interval?: number;
  delay?: number;
  as?: Tag;
  amount?: number;
}) {
  const Cmp = motion[as] as typeof motion.div;
  const [ref, state] = useRevealState(amount ?? 0.15);
  return (
    <Cmp ref={ref} className={className} variants={staggerContainer(interval, delay)} initial="hidden" animate={state}>
      {children}
    </Cmp>
  );
}

export function StaggerItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: Tag;
}) {
  const Cmp = motion[as];
  return (
    <Cmp className={className} variants={variants}>
      {children}
    </Cmp>
  );
}
