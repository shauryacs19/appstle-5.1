"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Media } from "@/components/ui/Media";
import type { MediaItem } from "@/data/media";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { FloatingToast, type Toast } from "./FloatingToast";

const toastSpots = ["top-[6%] -left-[2%]", "top-[46%] -right-[3%]", "bottom-[4%] left-[30%]"];

export function HeroVisual({
  desktop,
  mobile,
  toasts = [],
  stage,
  description,
  priority = false,
  className,
}: {
  desktop: MediaItem;
  mobile?: MediaItem;
  toasts?: Toast[];
  stage: string;
  description: string;
  priority?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const d = (px: number) => (reduce ? 0 : px);
  const yBack = useTransform(scrollYProgress, [0, 1], [d(-30), d(30)]);
  const yFront = useTransform(scrollYProgress, [0, 1], [d(40), d(-40)]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <p className="sr-only">{description}</p>
      <div aria-hidden className="relative mx-auto w-full max-w-[44rem] pt-[4%] pr-[2%] pb-[8%] pl-[8%] short:max-w-[37rem]">
        <motion.div
          style={{ y: yBack }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: ease.out }}
          className={cn("absolute inset-x-[4%] top-[10%] bottom-0 overflow-hidden rounded-[2.25rem]", stage)}
        >
          <div className="bg-dots absolute inset-0 opacity-50" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.25 }}
          className="relative"
        >
          <BrowserFrame label={desktop.label}>
            <Media item={desktop} priority={priority} className="rounded-none" sizes="(min-width: 1024px) 640px, 92vw" />
          </BrowserFrame>
        </motion.div>

        {mobile && (
          <motion.div
            style={{ y: yFront }}
            initial={{ opacity: 0, x: -30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.45 }}
            className="absolute bottom-0 left-0 w-[30%] min-w-28"
          >
            <div className="overflow-hidden rounded-[1.6rem] bg-navy p-1.5 shadow-float">
              <Media item={mobile} className="rounded-[1.25rem]" sizes="(min-width: 1024px) 200px, 30vw" />
            </div>
          </motion.div>
        )}

        {toasts.slice(0, 3).map((t, i) => (
          <FloatingToast key={t.title} {...t} className={toastSpots[i]} delay={0.8 + i * 0.2} float={i + 1} />
        ))}
      </div>
    </div>
  );
}
