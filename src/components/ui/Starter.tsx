"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { BtnArrow } from "@/components/ui/BtnArrow";
import { products } from "@/data/products";
import { cn } from "@/lib/cn";

/**
 * “Get started” toggle from the appstle-site hero: opening it turns the button into a round
 * close control and slides the five apps out beside it on the same line (names only), each opening that app's Shopify App
 * Store listing so the merchant can install it.
 */
export function Starter({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className={cn("contents", className)}>
      <motion.button
        ref={btn}
        type="button"
        layout
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? "Close the app list" : undefined}
        onClick={() => setOpen((v) => !v)}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        className={cn(
          "group/btn inline-flex h-[52px] shrink-0 items-center justify-center text-[1.05rem] font-normal ring-1 transition-colors [&_strong]:font-bold",
          open ? "w-[52px] rounded-full" : "rounded-[10px] px-[22px]",
          tone === "dark"
            ? cn("text-navy ring-navy/20 hover:bg-navy/5", open && "bg-navy/5")
            : cn("text-white ring-white/70 hover:bg-white/12", open && "bg-white/12"),
        )}
      >
        {open ? (
          <X aria-hidden className="size-5" strokeWidth={2.2} />
        ) : (
          <span className="inline-flex items-center gap-[0.3em]">
            Get <strong>started</strong>
            <BtnArrow className={tone === "dark" ? "text-cobalt" : "text-cream"} />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={id}
            key="apps"
            className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5 p-0.5"
            aria-label="Choose an Appstle app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
          >
            {products.map((p, i) => (
              <motion.li
                key={p.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.05 + i * 0.05, type: "spring", stiffness: 380, damping: 28 } }}
              >
                <a
                  href={p.installHref}
                  aria-label={`Get ${p.shortName} on the Shopify App Store`}
                  className={cn(
                    "flex h-10 items-center rounded-full px-3 text-[0.82rem] font-semibold whitespace-nowrap ring-1 transition",
                    tone === "dark"
                      ? "bg-white text-navy ring-navy/10 hover:bg-cobalt hover:text-white hover:ring-cobalt"
                      : "bg-white/10 text-white ring-white/30 hover:bg-white hover:text-navy",
                  )}
                >
                  {p.shortName.replace(" & Upsells", "").replace(" & Rewards", "")}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
