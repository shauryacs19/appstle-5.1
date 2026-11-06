"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/* Holds its content back until the hero has finished arriving (headline, photo, underline ≈ 1.9 s), then
   fades it in once, without movement. */
export function AfterHero({ children, delay = 2.2 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
