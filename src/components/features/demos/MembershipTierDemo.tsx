"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Crown, Check } from "lucide-react";
import { useState } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";

const tiers = {
  bronze: {
    label: "Bronze",
    discount: 5,
    swatch: "from-[#EEE6D8] to-[#FFFFFF] text-ink ring-1 ring-line",
    perks: ["5% off on all products", "$5 shipping on all orders"],
  },
  silver: {
    label: "Silver",
    discount: 10,
    swatch: "from-[#CDD4DE] to-[#EFE8DB] text-ink",
    perks: ["10% off on all products", "Exclusive access to early launches", "Free shipping on local orders"],
  },
  gold: {
    label: "Gold",
    discount: 15,
    swatch: "from-[#0B1730] via-[#13264A] to-[#24375C] text-white",
    perks: [
      "15% off on all products",
      "Exclusive access to early launches and downloads",
      "Free shipping on local and international orders",
      "Free gift for members every month",
    ],
  },
} as const;
type TierId = keyof typeof tiers;
const ids = Object.keys(tiers) as TierId[];
const EXAMPLE_PRICE = 40;

export function MembershipTierDemo() {
  const [tier, setTier] = useState<TierId>("silver");
  const t = tiers[tier];
  const memberPrice = EXAMPLE_PRICE * (1 - t.discount / 100);

  return (
    <div className="rounded-3xl bg-white p-5 shadow-float ring-1 ring-ink/8 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-lg font-bold text-ink">Choose a tier</p>
        <DemoBadge />
      </div>

      <LayoutGroup id="tiers">
        <div role="radiogroup" aria-label="Membership tier" className="mt-4 grid grid-cols-3 gap-1 rounded-full bg-[#EFE8DB] p-1 ring-1 ring-line">
          {ids.map((id) => {
            const selected = id === tier;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setTier(id)}
                onKeyDown={(e) => {
                  const i = ids.indexOf(tier);
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    e.preventDefault();
                    setTier(ids[(i + 1) % ids.length]);
                  }
                  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    e.preventDefault();
                    setTier(ids[(i - 1 + ids.length) % ids.length]);
                  }
                }}
                tabIndex={selected ? 0 : -1}
                className={cn(
                  "relative h-10 rounded-full text-sm font-semibold transition-colors",
                  selected ? "text-white" : "text-ink-muted hover:text-ink",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="tier-pill"
                    className="absolute inset-0 rounded-full bg-[#13264A] "
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative">{tiers[id].label}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <motion.div
        key={tier}
        initial={{ rotateX: -12, opacity: 0.6, y: 6 }}
        animate={{ rotateX: 0, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className={cn("relative mt-5 overflow-hidden rounded-2xl bg-gradient-to-br p-4 [perspective:600px]", t.swatch)}
      >
        <div aria-hidden className="absolute -top-8 -right-6 size-28 rounded-full bg-white/25" />
        <div className="relative flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wide uppercase">
            <Crown aria-hidden className="size-4" /> {t.label} member
          </span>
          <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-bold text-ink">{t.discount}% off</span>
        </div>
        <div className="relative mt-6 flex items-end justify-between">
          <span className="text-xs font-medium opacity-80">Example product</span>
          <span className="text-right" aria-live="polite">
            <span className="mr-2 text-sm line-through opacity-80">${EXAMPLE_PRICE.toFixed(2)}</span>
            <span className="font-display text-2xl font-bold">${memberPrice.toFixed(2)}</span>
          </span>
        </div>
      </motion.div>

      <ul className="mt-5 grid gap-2.5" aria-label={`${t.label} perks`}>
        <AnimatePresence mode="popLayout" initial={false}>
          {t.perks.map((p, i) => (
            <motion.li
              key={`${tier}-${p}`}
              layout
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0, transition: { delay: i * 0.06 } }}
              exit={{ opacity: 0, x: 12, transition: { duration: 0.15 } }}
              className="flex items-start gap-2.5 text-[0.92rem] text-ink"
            >
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#EEE6D8]">
                <Check aria-hidden className="size-3 text-brand-ink" strokeWidth={3} />
              </span>
              {p}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
