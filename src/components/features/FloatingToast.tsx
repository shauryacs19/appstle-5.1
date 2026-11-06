"use client";

import { motion } from "motion/react";
import { Float } from "@/components/motion/Float";
import { ProductIcon } from "@/components/ui/ProductIcon";
import type { ProductId } from "@/data/products";
import { cn } from "@/lib/cn";

export type Toast = { product: ProductId; title: string; meta: string };

export function FloatingToast({
  product,
  title,
  meta,
  className,
  delay = 0,
  float = 1,
}: Toast & { className?: string; delay?: number; float?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay }}
      className={cn("absolute z-10 flex", className)}
    >
      <Float amplitude={5} duration={5 + float} delay={float * 0.6}>
        <div className="flex items-center gap-2.5 rounded-2xl bg-white/95 py-2 pr-3.5 pl-2 shadow-float ring-1 ring-navy/8 backdrop-blur sm:gap-3 sm:pr-4">
          <ProductIcon id={product} size="sm" className="sm:size-9 sm:rounded-xl" />
          <div className="leading-tight">
            <p className="text-[0.74rem] font-semibold text-navy sm:text-[0.82rem]">{title}</p>
            <p className="text-[0.66rem] text-ink-subtle sm:text-[0.72rem]">{meta}</p>
          </div>
        </div>
      </Float>
    </motion.div>
  );
}
