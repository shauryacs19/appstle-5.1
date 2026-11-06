"use client";

import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Check, ChevronDown, Coffee, Cookie, Crown, CupSoda, Gift, MapPin, PackagePlus, Plus, Repeat2, Store, type LucideIcon } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/cn";
import { ease, spring } from "@/lib/motion";

const shell =
  "rounded-[1.15rem] bg-white ring-1 ring-line ";

function useLive<T extends Element>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const mounted = useHydrated();
  const reduce = !!useReducedMotion() && mounted;
  return [ref, inView && !reduce, reduce] as const;
}

function useSteps(live: boolean, last: number, ms: number, { start = 900, loop = false } = {}) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!live || (!loop && step >= last)) return;
    const t = setTimeout(() => setStep((s) => (loop ? (s + 1) % (last + 1) : s + 1)), step === 0 ? start : ms);
    return () => clearTimeout(t);
  }, [live, step, last, ms, start, loop]);
  return step;
}

function Thumb({ icon: Icon, tone = "blue", className }: { icon: LucideIcon; tone?: "blue" | "sand" | "mint"; className?: string }) {
  const tones = {
    blue: "bg-[linear-gradient(145deg,#EEF7FE,#CEEFFD)] text-brand-500",
    sand: "bg-[linear-gradient(145deg,#FFF6EA,#FBE3C4)] text-[#B86B1B]",
    mint: "bg-[linear-gradient(145deg,#EEFBF4,#C9F0DA)] text-[#1F8A57]",
  } as const;
  return (
    <span className={cn("grid shrink-0 place-items-center rounded-xl", tones[tone], className)}>
      <Icon className="size-[55%]" strokeWidth={1.9} />
    </span>
  );
}

function CardHead({ icon: Icon, title, aside, light }: { icon: LucideIcon; title: string; aside?: ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("grid size-6 place-items-center rounded-lg", light ? "bg-white/18 text-white" : "bg-brand-50 text-brand-ink")}>
        <Icon className="size-3.5" strokeWidth={2.2} />
      </span>
      <span className={cn("text-[12.5px] font-semibold whitespace-nowrap", light ? "text-white" : "text-ink")}>{title}</span>
      {aside && <span className="ml-auto">{aside}</span>}
    </div>
  );
}

export function SubscriptionCard({ className }: { className?: string }) {
  const [ref, live, reduce] = useLive<HTMLDivElement>();
  const step = useSteps(live, 1, 0, { start: 1500 });
  const sub = reduce || step >= 1;
  const group = useId();
  const options = [
    { key: "once", label: "One-time purchase", price: "$18.00" },
    { key: "sub", label: "Subscribe & save 15%", price: "$15.30", note: "Delivered every 4 weeks" },
  ];
  return (
    <div ref={ref} className={cn(shell, "p-3.5", className)}>
      <div className="flex items-center gap-3">
        <Thumb icon={Coffee} tone="sand" className="size-11" />
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-ink">House Blend Coffee</p>
          <p className="text-xs text-ink-subtle">Whole bean · 340 g</p>
        </div>
      </div>
      <LayoutGroup id={group}>
        <div className="mt-3 space-y-1.5">
          {options.map((o) => {
            const on = (o.key === "sub") === sub;
            return (
              <div key={o.key} className="relative rounded-xl px-2.5 py-2">
                {on && (
                  <motion.span
                    layoutId="pick"
                    transition={spring.soft}
                    className="absolute inset-0 rounded-xl bg-brand-50 ring-[1.5px] ring-brand"
                  />
                )}
                {!on && <span className="absolute inset-0 rounded-xl ring-1 ring-[#E6DCCB]" />}
                <div className="relative flex items-center gap-2">
                  <span className={cn("grid size-3.5 place-items-center rounded-full ring-[1.5px]", on ? "ring-brand" : "ring-ink/25")}>
                    {on && <span className="size-1.5 rounded-full bg-brand" />}
                  </span>
                  <span className="text-[12px] font-semibold text-ink">{o.label}</span>
                  <span className={cn("ml-auto text-[12px] font-semibold", o.key === "sub" ? "text-brand-700" : "text-ink-muted")}>{o.price}</span>
                </div>
                {o.note && (
                  <p className="relative mt-1 flex items-center gap-1 pl-[22px] text-xs text-ink-muted">
                    {o.note}
                    <ChevronDown className="size-3" />
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </LayoutGroup>
      <div className="mt-2.5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-xs font-medium text-ink-muted">
          <Repeat2 className="size-3 text-brand-ink" />
          Skip, swap or pause anytime
        </span>
      </div>
    </div>
  );
}

const POINTS = [1240, 1290, 1340, 1420, 1500];
const GOAL = 1500;

function Count({ value }: { value: number }) {
  const mv = useSpring(value, { stiffness: 90, damping: 20 });
  const text = useTransform(mv, (v) => Math.round(v).toLocaleString("en-US"));
  useEffect(() => mv.set(value), [mv, value]);
  return <motion.span className="tabular-nums">{text}</motion.span>;
}

export function LoyaltyCard({ className }: { className?: string }) {
  const [ref, live, reduce] = useLive<HTMLDivElement>();
  const step = useSteps(live, POINTS.length - 1, 2300);
  const i = reduce ? POINTS.length - 1 : step;
  const pts = POINTS[i];
  const earned = i > 0 ? pts - POINTS[i - 1] : 0;
  const done = pts >= GOAL;
  return (
    <div ref={ref} className={cn(shell, "p-3.5", className)}>
      <CardHead
        icon={Gift}
        title="Rewards"
        aside={<span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">VIP · Silver</span>}
      />
      <div className="relative mt-3 flex items-end gap-1.5">
        <span className="font-display text-[1.9rem] leading-none font-bold tracking-[-0.03em] text-ink">
          <Count value={pts} />
        </span>
        <span className="pb-0.5 text-[12px] font-semibold text-ink-subtle">pts</span>
        <AnimatePresence>
          {earned > 0 && !reduce && (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: ease.out }}
              className="absolute right-0 bottom-1 rounded-full bg-[#E8F8EF] px-2 py-0.5 text-xs font-bold text-[#1F8A57]"
            >
              +{earned} pts
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#E8DECD]">
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,#6FC0FA,#1088F6)]"
          initial={false}
          animate={{ width: `${Math.min(100, (pts / GOAL) * 100)}%` }}
          transition={{ duration: 0.9, ease: ease.out }}
        />
      </div>
      <div className="mt-2 h-4 text-xs">
        <AnimatePresence mode="wait" initial={false}>
          {done ? (
            <motion.p key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1 font-semibold text-[#1F8A57]">
              <Check className="size-3.5" strokeWidth={2.6} /> Free shipping unlocked
            </motion.p>
          ) : (
            <motion.p key="todo" exit={{ opacity: 0, y: -6 }} className="text-ink-muted">
              {(GOAL - pts).toLocaleString("en-US")} pts to free shipping
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function MembershipCard({ className }: { className?: string }) {
  const perks = ["Free express shipping", "Early access to drops", "10% off every order"];
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.15rem] bg-[linear-gradient(140deg,#0A6FD1_0%,#1088F6_38%,#0A6FD1_72%,#0052A3_100%)] p-3.5 text-white ring-1 ring-white/10 [container-type:inline-size]",
        className,
      )}
    >
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-[shine_7s_var(--ease-smooth)_2.5s_infinite] bg-linear-to-r from-transparent via-white/22 to-transparent" />
      <span aria-hidden className="pointer-events-none absolute -top-10 -right-10 size-28 rounded-full border-[14px] border-white/8" />
      <CardHead icon={Crown} title="Gold Club" light aside={<span className="rounded-full bg-white/16 px-2 py-0.5 text-xs font-semibold">Member</span>} />
      <p className="mt-3 font-display text-[1.25rem] leading-tight font-bold tracking-[-0.02em]">Your member perks</p>
      <ul className="mt-2.5 space-y-1.5">
        {perks.map((p) => (
          <li key={p} className="flex items-center gap-2 text-[12px] text-white/92">
            <span className="grid size-4 place-items-center rounded-full bg-white/20">
              <Check className="size-2.5" strokeWidth={3} />
            </span>
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-2.5 text-xs text-white/80">
        <span>Renews monthly</span>
        <span className="font-semibold text-white">$9.99 / mo</span>
      </div>
    </div>
  );
}

export function BundleCard({ className }: { className?: string }) {
  const [ref, live, reduce] = useLive<HTMLDivElement>();
  const step = useSteps(live, 1, 0, { start: 1900 });
  const full = reduce || step >= 1;
  const items: { icon: LucideIcon; tone: "blue" | "sand" | "mint" }[] = [
    { icon: Coffee, tone: "sand" },
    { icon: CupSoda, tone: "mint" },
    { icon: Cookie, tone: "blue" },
  ];
  return (
    <div ref={ref} className={cn(shell, "p-3.5", className)}>
      <CardHead
        icon={PackagePlus}
        title="Build your bundle"
        aside={
          <AnimatePresence>
            {full && (
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={spring.snappy}
                className="rounded-full bg-brand px-2 py-0.5 text-xs font-bold whitespace-nowrap text-white"
              >
                Save 20%
              </motion.span>
            )}
          </AnimatePresence>
        }
      />
      <div className="mt-3 flex items-center gap-1.5">
        {items.map((it, n) => (
          <div key={n} className="flex items-center gap-1.5">
            {n > 0 && <Plus className="size-3 text-ink-subtle" strokeWidth={2.6} />}
            <div className="relative size-12">
              <span className="absolute inset-0 rounded-xl border-[1.5px] border-dashed border-[#C9D6E6]" />
              <AnimatePresence>
                {(n < 2 || full) && (
                  <motion.span
                    initial={n === 2 ? { opacity: 0, scale: 0.5 } : false}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={spring.snappy}
                    className="absolute inset-0"
                  >
                    <Thumb icon={it.icon} tone={it.tone} className="size-full" />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-ink px-3 py-2 text-white">
        <span className="text-xs font-semibold">Add bundle</span>
        <span className="text-xs">
          {full && <s className="mr-1.5 text-white/50">$60.00</s>}
          <motion.span key={String(full)} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="font-bold">
            {full ? "$48.00" : "$40.00"}
          </motion.span>
        </span>
      </div>
    </div>
  );
}

export function PickupCard({ className }: { className?: string }) {
  const [ref, live, reduce] = useLive<HTMLDivElement>();
  const step = useSteps(live, 1, 0, { start: 1700 });
  const slot = reduce || step >= 1 ? 1 : 0;
  const group = useId();
  const days = ["Today", "Tue", "Wed"];
  const slots = ["10–11 AM", "4–5 PM", "6–7 PM"];
  return (
    <div ref={ref} className={cn(shell, "p-3.5", className)}>
      <CardHead icon={Store} title="Pickup & delivery" />
      <div className="mt-3 grid grid-cols-2 rounded-lg bg-surface-2 p-0.5 text-center text-xs font-semibold">
        <span className="rounded-md bg-white py-1 text-ink shadow-soft">Store pickup</span>
        <span className="py-1 text-ink-subtle">Local delivery</span>
      </div>
      <div className="mt-2.5 flex gap-1.5">
        {days.map((d, n) => (
          <span key={d} className={cn("flex-1 rounded-lg py-1 text-center text-xs font-semibold", n === 0 ? "bg-ink text-white" : "text-ink-muted ring-1 ring-[#E6DCCB]")}>
            {d}
          </span>
        ))}
      </div>
      <LayoutGroup id={group}>
        <div className="mt-1.5 grid grid-cols-3 gap-1.5">
          {slots.map((s, n) => (
            <span key={s} className="relative rounded-lg py-1.5 text-center text-xs font-semibold">
              {n === slot ? (
                <motion.span layoutId="slot" transition={spring.soft} className="absolute inset-0 rounded-lg bg-brand-50 ring-[1.5px] ring-brand" />
              ) : (
                <span className="absolute inset-0 rounded-lg ring-1 ring-[#E6DCCB]" />
              )}
              <span className={cn("relative", n === slot ? "text-brand-700" : "text-ink-muted")}>{s}</span>
            </span>
          ))}
        </div>
      </LayoutGroup>
      <p className="mt-2.5 flex items-center gap-1 text-xs text-ink-muted">
        <MapPin className="size-3.5 text-brand-ink" /> Downtown store · ready in 2 hrs
      </p>
    </div>
  );
}
