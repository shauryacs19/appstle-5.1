import { stagger, type Transition, type Variants } from "motion/react";

export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  smooth: [0.4, 0, 0.1, 1] as const,
  curtain: [0.76, 0, 0.24, 1] as const,
};

export const spring = {
  soft: { type: "spring", stiffness: 260, damping: 26, mass: 0.9 } satisfies Transition,
  snappy: { type: "spring", stiffness: 420, damping: 30 } satisfies Transition,
  gentle: { type: "spring", stiffness: 120, damping: 20 } satisfies Transition,
};

const duration = { fast: 0.25, base: 0.6, slow: 0.9, reveal: 1.1 };

export const inViewOnce = { once: true, amount: 0.25, margin: "0px 0px -8% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: ease.out, opacity: { duration: duration.base, ease: ease.out } },
  },
};

export const slideFrom = (x: number, y = 0): Variants => ({
  hidden: { opacity: 0, x, y },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: duration.reveal, ease: ease.out, opacity: { duration: duration.base, ease: ease.out } },
  },
});

export const staggerContainer = (interval = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: stagger(interval, { startDelay: delay }) } },
});
