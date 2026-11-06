"use client";

import Image, { } from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Bell, Crown, Gift, Heart, PackagePlus, Repeat2, Store, ShoppingBag, TrendingUp, UserCheck, type LucideIcon } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import storePhoto from "@/assets/home/hero.webp";
import shopifyLogo from "@/assets/brand/shopify-logo.webp";

const shell =
  "hero-card rounded-[1.15rem] bg-white ring-1 ring-line ";

function useLive<T extends Element>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount: 0.35, once: true });
  const reduce = !!useReducedMotion();
  return [ref, inView || reduce, reduce] as const;
}

function Count({ to, on, prefix = "", suffix = "", decimals = 0 }: { to: number; on: boolean; prefix?: string; suffix?: string; decimals?: number }) {
  const mv = useSpring(0, { stiffness: 38, damping: 18 });
  const text = useTransform(mv, (v) => `${prefix}${v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!on) return;
    if (reduce) mv.jump(to);
    else mv.set(to);
  }, [on, to, mv, reduce]);
  return <motion.span className="tabular-nums">{text}</motion.span>;
}

function SampleTag({ className }: { className?: string }) {
  return (
    <span className={cn("rounded-full bg-surface-2 px-1.5 py-0.5 text-xs font-semibold tracking-wide text-ink-subtle uppercase ring-1 ring-line", className)}>
      Sample data
    </span>
  );
}

const REV = [18, 22, 20, 27, 25, 31, 30, 37, 35, 43, 41, 50];
const W = 220;
const H = 78;

function linePath(values: number[]) {
  const max = Math.max(...values) * 1.08;
  const min = Math.min(...values) * 0.8;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * W, H - ((v - min) / (max - min)) * H] as const);
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx} ${y0} ${cx} ${y1} ${x1} ${y1}`;
  }
  return { d, end: pts[pts.length - 1] };
}

export function RevenueCard({ className, chartClassName }: { className?: string; chartClassName?: string }) {
  const [ref, on] = useLive<HTMLDivElement>();
  const id = useId().replace(/:/g, "");
  const { d, end } = linePath(REV);
  return (
    <div ref={ref} className={cn(shell, "p-3.5", className)}>
      <div className="flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-lg bg-brand-50 text-brand-ink">
          <TrendingUp className="size-3.5" strokeWidth={2.3} />
        </span>
        <span className="text-[12.5px] font-semibold text-ink">Revenue</span>
        <SampleTag className="ml-auto" />
      </div>
      <div className="mt-2.5 flex items-end gap-2">
        <span className="font-display text-[1.75rem] leading-none font-bold tracking-[-0.03em] text-ink">
          <Count to={48.2} on={on} prefix="$" suffix="k" decimals={1} />
        </span>
        <span className="mb-0.5 inline-flex items-center gap-0.5 rounded-full bg-[#E8F8EF] px-1.5 py-0.5 text-xs font-bold text-[#1F8A57]">
          <TrendingUp className="size-3" strokeWidth={2.6} /> trending up
        </span>
      </div>
      <svg viewBox={`-4 -6 ${W + 8} ${H + 12}`} className={cn("mt-2 h-[5.2rem] w-full overflow-visible", chartClassName)} aria-hidden>
        <defs>
          <linearGradient id={`rev-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1088F6" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#1088F6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="#E8DFCF" strokeDasharray="2 4" />
        ))}
        <motion.path
          d={`${d} L${W} ${H} L0 ${H} Z`}
          fill={`url(#rev-${id})`}
          initial={{ opacity: 0 }}
          animate={on ? { opacity: 1 } : undefined}
          transition={{ duration: 1.2, delay: 0.9 }}
        />
        <motion.path
          d={d}
          fill="none"
          stroke="#1088F6"
          strokeWidth="2.4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={on ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.8, ease: ease.out, delay: 0.2 }}
        />
        <motion.g initial={{ opacity: 0, scale: 0.4 }} animate={on ? { opacity: 1, scale: 1 } : undefined} transition={{ delay: 1.8, duration: 0.5 }} style={{ originX: `${end[0]}px`, originY: `${end[1]}px` }}>
          <circle cx={end[0]} cy={end[1]} r="7" fill="#1088F6" fillOpacity="0.18" className="motion-safe:animate-pulse" />
          <circle cx={end[0]} cy={end[1]} r="3.5" fill="#fff" stroke="#1088F6" strokeWidth="2" />
        </motion.g>
      </svg>
      <div className="mt-1 flex justify-between text-xs font-medium text-ink-subtle">
        <span>Jan</span>
        <span>Apr</span>
        <span>Jul</span>
        <span>Oct</span>
      </div>
    </div>
  );
}

export function LifetimeValueChip({ className }: { className?: string }) {
  const [ref, on] = useLive<HTMLDivElement>();
  return (
    <div ref={ref} className={cn(shell, "flex items-center gap-2.5 rounded-2xl p-2.5 pr-3.5", className)}>
      <span className="grid size-8 shrink-0 place-items-center rounded-[0.7rem] bg-[linear-gradient(145deg,#219BFB,#0177F2)] text-white">
        <Heart className="size-4" strokeWidth={2.2} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium whitespace-nowrap text-ink-subtle">Lifetime value</p>
        <p className="font-display text-[0.95rem] leading-tight font-bold text-ink">
          <Count to={214} on={on} prefix="$" />
        </p>
      </div>
      <svg viewBox="0 0 48 20" className="ml-1 h-5 w-12" aria-hidden>
        <motion.path
          d="M1 17 C8 16 10 12 16 12 S24 14 30 9 38 6 47 2"
          fill="none"
          stroke="#22C55E"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={on ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.2, delay: 0.6 }}
        />
      </svg>
    </div>
  );
}

type Note = { icon: LucideIcon; tone: string; title: string; body: string };

export function ShopifyTile({ className }: { className?: string }) {
  return (
    <div className={cn(shell, "flex h-[3.4rem] items-center rounded-2xl px-3.5", className)}>
      <Image src={shopifyLogo} alt="" sizes="110px" className="h-6 w-auto" />
      <span className="ml-2 rounded-md bg-[#95BF47]/15 px-1.5 py-0.5 text-xs font-bold tracking-wide text-[#5E8E3E] uppercase">Plus</span>
    </div>
  );
}

export function StorefrontCard({ className }: { className?: string }) {
  return (
    <div className={cn(shell, "overflow-hidden p-1.5", className)}>
      <div className="flex items-center gap-1.5 px-2 pt-1 pb-2">
        <span className="size-2 rounded-full bg-[#FF8A7A]" />
        <span className="size-2 rounded-full bg-[#FFC75A]" />
        <span className="size-2 rounded-full bg-[#5FD38D]" />
        <span className="ml-2 h-4 flex-1 rounded-full bg-surface-2 px-2 text-xs leading-4 text-ink-subtle">yourstore.com/shop</span>
      </div>
      <div className="relative overflow-hidden rounded-[0.85rem]">
        <Image src={storePhoto} alt="" sizes="(min-width: 1024px) 18rem, 60vw" className="aspect-[4/3.1] w-full object-cover object-[40%_40%]" priority />
        <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-white/92 px-2 py-1 text-xs font-semibold text-ink shadow-soft backdrop-blur">
          <span className="size-1.5 rounded-full bg-[#22C55E]" />
          Store open · new orders coming in
        </span>
      </div>
    </div>
  );
}

const NOTES: Note[] = [
  { icon: ShoppingBag, tone: "bg-brand", title: "Another order placed", body: "Order #1052 · $64.00" },
  { icon: Repeat2, tone: "bg-brand", title: "New subscription", body: "Coffee box · every 4 weeks" },
  { icon: UserCheck, tone: "bg-[#1F8A57]", title: "Returning customer", body: "Emma placed her 3rd order" },
  { icon: Crown, tone: "bg-brand", title: "Member upgraded", body: "Silver → Gold Club" },
  { icon: Gift, tone: "bg-brand", title: "Points redeemed", body: "500 pts → $5 off" },
  { icon: PackagePlus, tone: "bg-brand", title: "Bundle added to cart", body: "3 items · saved 20%" },
  { icon: Store, tone: "bg-brand", title: "Pickup ready", body: "Order #1048 · Downtown" },
];

export function NotificationCard({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const live = inView && !reduce;
  useEffect(() => {
    if (!live) return;
    const t = setTimeout(() => setI((n) => (n + 1) % NOTES.length), i === 0 ? 2400 : 3600);
    return () => clearTimeout(t);
  }, [live, i]);
  const N = NOTES[i];
  return (
    <div ref={ref} className={cn("hero-card relative h-[3.6rem]", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.55, ease: ease.out }}
          className="absolute inset-0 flex items-center gap-2.5 rounded-2xl bg-white/90 px-2.5 ring-1 ring-line backdrop-blur"
        >
          <span className={cn("grid size-8 shrink-0 place-items-center rounded-[0.7rem] text-white", N.tone)}>
            <N.icon className="size-4" strokeWidth={2.2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-ink">
              {N.title}
              <span className="ml-auto text-xs font-medium text-ink-subtle">now</span>
            </p>
            <p className="truncate text-xs text-ink-muted">{N.body}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <span className="absolute -top-1.5 -left-1.5 grid size-5 place-items-center rounded-full bg-white text-brand-ink shadow-soft ring-1 ring-line">
        <Bell className="size-3" strokeWidth={2.4} />
      </span>
    </div>
  );
}

export function RepeatRateCard({ className }: { className?: string }) {
  const [ref, on] = useLive<HTMLDivElement>();
  const R = 16;
  const C = 2 * Math.PI * R;
  return (
    <div ref={ref} className={cn(shell, "p-3", className)}>
      <div className="flex items-center gap-3">
        <div className="relative size-12 shrink-0">
          <svg viewBox="0 0 40 40" className="size-full -rotate-90" aria-hidden>
            <circle cx="20" cy="20" r={R} fill="none" stroke="#E8DECD" strokeWidth="5" />
            <motion.circle
              cx="20"
              cy="20"
              r={R}
              fill="none"
              stroke="#1088F6"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              animate={on ? { strokeDashoffset: C * 0.62 } : undefined}
              transition={{ duration: 1.5, ease: ease.out, delay: 0.3 }}
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-xs font-bold text-ink">
            <Count to={38} on={on} suffix="%" />
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-ink">Repeat purchase rate</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-[#1F8A57]">
            <UserCheck className="size-3" /> more returning customers
          </p>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between border-t border-[#ECE3D3] pt-2">
        <span className="text-xs text-ink-subtle">Retention · last 6 months</span>
        <SampleTag />
      </div>
    </div>
  );
}
