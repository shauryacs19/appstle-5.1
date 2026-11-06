"use client";

import { ScrollArc } from "@/components/features/ScrollArc";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Bell, Check, Gift, MousePointerClick, Repeat2, ShoppingBag, TrendingUp, type LucideIcon } from "lucide-react";
import { useRef, type ReactNode, type CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { productById, type ProductId } from "@/data/products";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

function useOn() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = !!useReducedMotion();
  return [ref, inView || reduce] as const;
}

const mini = "rounded-[1rem] bg-[#fff] ring-1 ring-line ";

function ReturnVisual() {
  const [ref, on] = useOn();
  return (
    <div ref={ref} className="relative h-44">
      <motion.div
        className={cn(mini, "absolute top-2 left-0 w-[86%] p-3")}
        initial={{ opacity: 0, y: 16 }}
        animate={on ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, ease: ease.out }}
      >
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-blue-ink text-white">
            <Bell className="size-3.5" />
          </span>
          <p className="text-[12px] font-semibold text-ink">Your rewards are waiting</p>
        </div>
        <p className="mt-2 text-xs leading-snug text-ink-muted">You have points ready to use on your next order.</p>
        <span className="mt-2.5 inline-flex rounded-lg bg-ink px-2.5 py-1 text-xs font-semibold text-white">Shop again</span>
      </motion.div>
      <motion.div
        className={cn(mini, "absolute right-0 bottom-2 flex items-center gap-2 p-2.5 pr-3.5")}
        initial={{ opacity: 0, y: 16, rotate: 4 }}
        animate={on ? { opacity: 1, y: 0, rotate: 2 } : undefined}
        transition={{ duration: 0.8, delay: 0.35, ease: ease.out }}
      >
        <span className="grid size-8 place-items-center rounded-xl bg-[linear-gradient(145deg,#FFF6EA,#FBE3C4)] text-[#B86B1B]">
          <Gift className="size-4" />
        </span>
        <span>
          <span className="block text-xs text-ink-subtle">Reward unlocked</span>
          <span className="block text-[12px] font-semibold text-ink">Free shipping</span>
        </span>
      </motion.div>
    </div>
  );
}

function RepeatVisual() {
  const [ref, on] = useOn();
  const steps: { icon: LucideIcon; label: string }[] = [
    { icon: Bell, label: "Reminder sent" },
    { icon: MousePointerClick, label: "Reordered in one click" },
    { icon: ShoppingBag, label: "Order on its way" },
  ];
  return (
    <div ref={ref} className={cn(mini, "relative h-44 p-3.5")}>
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-semibold text-ink">Next delivery</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-ice px-2 py-0.5 text-xs font-semibold text-brand-700">
          <Repeat2 className="size-3" /> Every 4 weeks
        </span>
      </div>
      <ol className="relative mt-3 space-y-2.5">
        <span aria-hidden className="absolute top-2 bottom-2 left-[13px] w-px bg-[#E6DCCB]" />
        <motion.span
          aria-hidden
          className="absolute top-2 left-[13px] w-px origin-top bg-sky-blue"
          style={{ height: "calc(100% - 1rem)" }}
          initial={{ scaleY: 0 }}
          animate={on ? { scaleY: 1 } : undefined}
          transition={{ duration: 1.4, delay: 0.2, ease: ease.out }}
        />
        {steps.map((s, i) => (
          <motion.li
            key={s.label}
            className="relative flex items-center gap-2.5"
            initial={{ opacity: 0, x: -8 }}
            animate={on ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.25 + i * 0.4, ease: ease.out }}
          >
            <span className={cn("grid size-[27px] place-items-center rounded-full ring-4 ring-white", i === 2 ? "bg-azure text-white" : i === 1 ? "bg-brand text-white" : "bg-blue-ink text-white")}>
              {i === 2 ? <Check className="size-3.5" strokeWidth={3} /> : <s.icon className="size-3.5" />}
            </span>
            <span className="text-xs font-medium text-ink">{s.label}</span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function ValueVisual() {
  const [ref, on] = useOn();
  const bars = [0.28, 0.45, 0.62, 0.8, 1];
  return (
    <div ref={ref} className={cn(mini, "relative h-44 p-3.5")}>
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-semibold text-ink">Value per customer</p>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F8A57]">
          <TrendingUp className="size-3" /> grows with every order
        </span>
      </div>
      <div className="mt-3 flex h-[5.4rem] items-end gap-2" aria-hidden>
        {bars.map((h, i) => (
          <div key={i} className="flex h-full flex-1 flex-col justify-end">
            <motion.div
              className={cn("rounded-t-md", ["bg-powder", "bg-sky-blue", "bg-azure", "bg-brand", "bg-blue-ink"][i] ?? "bg-brand")}
              initial={{ height: "0%" }}
              animate={on ? { height: `${h * 100}%` } : undefined}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: ease.out }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-2 text-center text-xs text-ink-subtle">
        {["1st", "2nd", "3rd", "4th", "5th"].map((l) => (
          <span key={l} className="flex-1">
            {l} order
          </span>
        ))}
      </div>
    </div>
  );
}

const steps: { n: string; title: string; body: string; apps: ProductId[]; visual: ReactNode }[] = [
  {
    n: "01",
    title: "Encourage customers to return.",
    body: "Points, perks and member-only offers give shoppers a reason to come back to your store — not a competitor’s.",
    apps: ["loyalty", "memberships"],
    visual: <ReturnVisual />,
  },
  {
    n: "02",
    title: "Make repeat purchases easier.",
    body: "Subscriptions, self-serve changes and convenient pickup or delivery take the effort out of ordering again.",
    apps: ["subscriptions", "pickup"],
    visual: <RepeatVisual />,
  },
  {
    n: "03",
    title: "Build stronger long-term value.",
    body: "Bundles and ongoing relationships turn single purchases into a customer base that keeps growing with you.",
    apps: ["bundles", "subscriptions"],
    visual: <ValueVisual />,
  },
];

/* Each step's illustration sits on its own blue: deep ink, royal, then a brighter blue with a warm orange
   glow, over a fine grid, so the white mini-widgets read as product screens. */
const grid = "linear-gradient(to right, rgb(255 255 255 / 0.07) 1px, transparent 1px) 0 0 / 22px 22px, linear-gradient(to bottom, rgb(255 255 255 / 0.07) 1px, transparent 1px) 0 0 / 22px 22px";
const stepStage: CSSProperties[] = [
  { background: `radial-gradient(80% 70% at 85% 0%, rgb(147 197 253 / 0.35), transparent 60%), ${grid}, linear-gradient(150deg, #1E3A8A, #14275C)` },
  { background: `radial-gradient(80% 70% at 85% 0%, rgb(147 197 253 / 0.4), transparent 60%), ${grid}, linear-gradient(150deg, #2563EB, #1E3A8A)` },
  { background: `radial-gradient(70% 60% at 90% 100%, rgb(249 115 22 / 0.35), transparent 60%), ${grid}, linear-gradient(150deg, #3B82F6, #1D4ED8)` },
];

export function GrowthStory() {
  const line = useRef<HTMLDivElement>(null);
  const inView = useInView(line, { once: true, amount: 0.3 });
  return (
    <section id="how-it-works" aria-labelledby="growth-title" className="section-card card-paper [--accent:#1E40AF] [--accent-tint:#E8EEFB] relative isolate py-band">
      <ScrollArc side="right" color="var(--color-orange)" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
      <div className="mx-auto max-w-site px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="growth-title" className="text-[2.2rem] leading-[1.04] font-bold tracking-[-0.04em] text-ink sm:text-[3rem]">
            <SplitText>
              More customers who come back, <span className="text-accent">and keep coming back.</span>
            </SplitText>
          </h2>
        </div>

        <div ref={line} className="relative mt-14">
          <div aria-hidden className="pointer-events-none absolute top-[1.35rem] right-[16.66%] left-[16.66%] hidden h-px lg:block">
            <motion.div
              className="h-[2px] origin-left bg-[linear-gradient(90deg,var(--color-brand)_0_50%,transparent_50%)] [background-size:10px_2px] opacity-50"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : undefined}
              transition={{ duration: 1.6, ease: ease.out, delay: 0.2 }}
            />
          </div>
          <ol className="relative grid gap-5 lg:grid-cols-3 lg:gap-6">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={0.12 * i} className="relative flex flex-col">
                <span className="relative z-10 mx-auto grid size-11 place-items-center rounded-full bg-blue-ink font-display text-sm font-bold text-white ring-4 ring-white transition-[scale,background-color,color] duration-500 ease-[var(--ease-spring)] [li:hover>&]:scale-115 [li:hover>&]:bg-orange">
                  {s.n}
                </span>
                <div data-spotlight="" className="group mt-4 flex flex-1 flex-col overflow-hidden rounded-[1.75rem] bg-[#FBF8F3] p-3 ring-1 ring-line transition-[translate] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 sm:p-3.5">
                  <div aria-hidden className="relative overflow-hidden rounded-[1.35rem] p-5 pt-10" style={stepStage[i]}>
                    <span className="absolute top-3 left-4 font-display text-[2.6rem] leading-none font-bold tracking-[-0.04em] text-white/20">{s.n}</span>
                    <div className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]">{s.visual}</div>
                  </div>
                  <div className="flex flex-1 flex-col px-3 pb-3 sm:px-3.5">
                  <h3 className="mt-6 text-[1.35rem] leading-tight font-bold tracking-[-0.025em] text-ink">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{s.body}</p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-5" aria-label="Apps that help">
                    {s.apps.map((id) => (
                      <li key={id} className="hover-pop inline-flex items-center gap-1.5 rounded-full bg-white py-1 pr-3 pl-1 text-xs font-semibold text-ink ring-1 ring-line">
                        <ProductIcon id={id} size="sm" className="size-6 rounded-full" />
                        {productById[id].shortName}
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
