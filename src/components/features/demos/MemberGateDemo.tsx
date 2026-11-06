"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Crown, LockKeyhole, ShoppingBag, UserRound } from "lucide-react";
import { useId, useState } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";

const PRICE = 40;
const MEMBER_DISCOUNT = 15;
const MEMBERSHIP = "Gold";
const gatedPages = ["Members-only collection", "Members’ blog", "Early-access launch page"];

export function MemberGateDemo() {
  const [member, setMember] = useState(false);
  const [added, setAdded] = useState(false);
  const id = useId();
  const memberPrice = PRICE * (1 - MEMBER_DISCOUNT / 100);

  const view = (m: boolean) => {
    setMember(m);
    setAdded(false);
  };

  return (
    <div className="mx-auto w-full max-w-lg rounded-3xl bg-white p-5 shadow-float ring-1 ring-navy/8 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <fieldset>
          <legend className="text-xs font-semibold text-ink-subtle">Viewing the store as</legend>
          <div className="mt-1.5 inline-flex rounded-full bg-lavender-50 p-1 ring-1 ring-lavender-200">
            {[
              { m: false, label: "Guest", icon: UserRound },
              { m: true, label: `${MEMBERSHIP} member`, icon: Crown },
            ].map((o) => (
              <label
                key={o.label}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt",
                  member === o.m ? "bg-lavender-700 text-white" : "text-lavender-700 hover:text-navy",
                )}
              >
                <input type="radio" name={`${id}-view`} checked={member === o.m} onChange={() => view(o.m)} className="sr-only" />
                <o.icon aria-hidden className="size-3.5" />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>
        <DemoBadge label="Demo" />
      </div>

      <div className="mt-5 grid grid-cols-[6.5rem_1fr] gap-4">
        <div aria-hidden className="relative aspect-square rounded-2xl bg-gradient-to-br from-lavender-100 to-lavender">
          <span className="absolute top-2 left-2 rounded-full bg-white/85 px-2 py-0.5 text-[0.65rem] font-bold text-lavender-700">Members only</span>
        </div>
        <div>
          <p className="font-display text-lg leading-tight font-bold text-navy">Limited Edition Candle Set</p>
          <div className="mt-2" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={String(member)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                {member ? (
                  <p className="text-sm">
                    <span className="font-display text-2xl font-bold text-navy">${memberPrice.toFixed(2)}</span>
                    <span className="ml-2 text-ink-subtle line-through">${PRICE.toFixed(2)}</span>
                    <span className="mt-0.5 block text-xs font-semibold text-lavender-700">
                      ${memberPrice.toFixed(2)} for {MEMBERSHIP} members
                    </span>
                  </p>
                ) : (
                  <p className="font-display text-2xl font-bold text-navy">${PRICE.toFixed(2)}</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-5 min-h-[7.5rem]">
        {member ? (
          <div>
            <button
              type="button"
              onClick={() => setAdded(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-navy-800 active:scale-[0.99]"
            >
              <ShoppingBag aria-hidden className="size-4" />
              {added ? "Added to cart" : "Add to cart"}
            </button>
            <p className="mt-2 text-xs text-ink-subtle" aria-live="polite">
              {added ? "Member discount applied at Shopify checkout." : "Logged in with the email used to buy the membership."}
            </p>
          </div>
        ) : (
          <div className="rounded-2xl bg-cream-50 p-4 text-center ring-1 ring-navy/8">
            <LockKeyhole aria-hidden className="mx-auto size-5 text-lavender-700" />
            <p className="mt-2 text-sm font-medium text-navy">This product is available to members only.</p>
            <button type="button" onClick={() => view(true)} className="mt-3 rounded-xl bg-lavender-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy">
              Become a member
            </button>
          </div>
        )}
      </div>

      <ul className="mt-4 grid gap-1.5 border-t border-navy/8 pt-4" aria-label="Other gated pages">
        {gatedPages.map((p) => (
          <li key={p} className="flex items-center justify-between text-sm">
            <span className="text-navy">{p}</span>
            <span className={cn("inline-flex items-center gap-1 text-xs font-semibold", member ? "text-mint-700" : "text-ink-subtle")}>
              {member ? <Check aria-hidden className="size-3.5" /> : <LockKeyhole aria-hidden className="size-3.5" />}
              {member ? "Unlocked" : "Locked"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
