"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, RotateCcw, ShoppingBag, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";

const products = [
  { id: "scrub", name: "Charcoal Face Scrub", price: 24, swatch: "from-navy-700 to-navy" },
  { id: "toner", name: "Balancing Toner", price: 18, swatch: "from-mint-200 to-mint-700" },
  { id: "cream", name: "Night Cream", price: 32, swatch: "from-peach to-coral" },
] as const;
const OFF = 15;
const usd = (n: number) => `$${n.toFixed(2)}`;
type Stage = "product" | "offer" | "bundle" | "single";

export function FunnelPopupDemo() {
  const [stage, setStage] = useState<Stage>("product");
  const titleId = useId();
  const dialogTitle = useRef<HTMLParagraphElement>(null);
  const full = products.reduce((s, p) => s + p.price, 0);
  const bundle = full * (1 - OFF / 100);

  useEffect(() => {
    if (stage === "offer") dialogTitle.current?.focus();
  }, [stage]);

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-float ring-1 ring-navy/8 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <p className="font-display text-lg font-bold text-navy">{stage === "bundle" || stage === "single" ? "Your cart" : "Product page"}</p>
          <DemoBadge label="Demo" />
        </div>

        {(stage === "product" || stage === "offer") && (
          <div className="mt-4 flex items-center gap-4">
            <span aria-hidden className={cn("size-20 shrink-0 rounded-2xl bg-gradient-to-br", products[0].swatch)} />
            <div className="flex-1">
              <p className="font-semibold text-navy">{products[0].name}</p>
              <p className="text-sm text-ink-muted">{usd(products[0].price)}</p>
              <button
                type="button"
                onClick={() => setStage("offer")}
                className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-800 active:scale-[0.98]"
              >
                <ShoppingBag aria-hidden className="size-4" /> Add to cart
              </button>
            </div>
          </div>
        )}

        {(stage === "bundle" || stage === "single") && (
          <div className="mt-4" aria-live="polite">
            <ul className="grid gap-1.5 text-sm">
              {(stage === "bundle" ? products : products.slice(0, 1)).map((p) => (
                <li key={p.id} className="flex items-center gap-3 rounded-xl px-3 py-2 ring-1 ring-navy/8">
                  <span aria-hidden className={cn("size-8 shrink-0 rounded-lg bg-gradient-to-br", p.swatch)} />
                  <span className="flex-1 text-navy">{p.name}</span>
                  <span className="font-semibold text-navy">{usd(p.price)}</span>
                </li>
              ))}
            </ul>
            {stage === "bundle" && (
              <p className="mt-2 flex justify-between rounded-xl bg-mint-50 px-3 py-2 text-sm font-semibold text-mint-700">
                <span>Bundle discount ({OFF}%)</span>
                <span>−{usd(full - bundle)}</span>
              </p>
            )}
            <div className="mt-4 flex items-center justify-between border-t border-navy/8 pt-3">
              <span className="text-sm text-ink-muted">Subtotal</span>
              <span className="font-display text-2xl font-bold text-navy">{usd(stage === "bundle" ? bundle : products[0].price)}</span>
            </div>
            <button type="button" onClick={() => setStage("product")} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt-700 hover:underline">
              <RotateCcw aria-hidden className="size-3.5" /> Start over
            </button>
          </div>
        )}

        <AnimatePresence>
          {stage === "offer" && (
            <motion.div
              key="offer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 grid place-items-end bg-navy/35 p-3 backdrop-blur-[2px] sm:place-items-center"
              onKeyDown={(e) => e.key === "Escape" && setStage("single")}
            >
              <motion.div
                role="dialog"
                aria-labelledby={titleId}
                initial={{ y: 30, scale: 0.97 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className="w-full rounded-2xl bg-white p-4 shadow-float"
              >
                <div className="flex items-start justify-between gap-2">
                  <p id={titleId} ref={dialogTitle} tabIndex={-1} className="font-display text-base font-bold text-navy outline-none">
                    Complete the routine & save {OFF}%
                  </p>
                  <button type="button" aria-label="Close" onClick={() => setStage("single")} className="grid size-7 place-items-center rounded-lg text-ink-subtle hover:bg-cream-100">
                    <X aria-hidden className="size-4" />
                  </button>
                </div>
                <ul className="mt-3 grid gap-1.5">
                  {products.map((p) => (
                    <li key={p.id} className="flex items-center gap-2.5 text-sm">
                      <Check aria-hidden className="size-4 text-mint-700" />
                      <span className="flex-1 text-navy">{p.name}</span>
                      <span className="text-ink-muted">{usd(p.price)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-ink-muted">
                  Bundle price <strong className="text-navy">{usd(bundle)}</strong> <span className="line-through">{usd(full)}</span>
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setStage("single")} className="rounded-xl px-3 py-2 text-sm font-medium text-ink-muted ring-1 ring-navy/12 hover:text-navy">
                    No thanks
                  </button>
                  <button type="button" onClick={() => setStage("bundle")} className="rounded-xl bg-mint-700 px-3 py-2 text-sm font-semibold text-white hover:bg-navy">
                    Add all
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
