"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function StickyCtaBar({
  afterId,
  untilId,
  children,
  className,
}: {
  afterId: string;
  untilId?: string;
  children: ReactNode;
  className?: string;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(afterId);
    const end = untilId ? document.getElementById(untilId) : null;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0);
        if (e.target === end) setAtEnd(e.isIntersecting);
      }
    });
    if (hero) io.observe(hero);
    if (end) io.observe(end);
    return () => io.disconnect();
  }, [afterId, untilId]);

  const show = pastHero && !atEnd && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          aria-label="Get started"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className={cn("fixed bottom-4 left-3 right-[5.25rem] z-40 sm:left-auto sm:right-[6.25rem] sm:bottom-6" , className)}
        >
          <div className="flex items-center gap-2 rounded-2xl bg-ink-deep p-2 pl-4 text-white shadow-float ring-1 ring-white/10">
            {children}
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="on-dark grid size-9 shrink-0 place-items-center rounded-xl text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <X aria-hidden className="size-4" />
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
