import { CalendarCheck, House, Package, RefreshCw, Store, Truck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { doodles, type DoodleName } from "./paths";

function Glyph({ name, className }: { name: DoodleName; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {doodles[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

const orbitTiles: Array<{ Icon: LucideIcon; deg: number }> = [
  { Icon: Package, deg: 0 },
  { Icon: CalendarCheck, deg: 120 },
  { Icon: RefreshCw, deg: 240 },
];

export function RenewOrbit({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute top-1/2 left-1/2 -z-10 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2", className)}>
      <div className="size-full motion-safe:animate-[orbit_48s_linear_infinite]">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand/20" />
        {orbitTiles.map(({ Icon, deg }) => (
          <div key={deg} className="absolute inset-0" style={{ rotate: `${deg}deg` }}>
            <span
              className="absolute top-0 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-white shadow-soft ring-1 ring-brand-100 motion-safe:animate-[orbit_48s_linear_infinite_reverse]"
              style={{ rotate: `${-deg}deg` }}
            >
              <Icon className="size-5 text-brand" strokeWidth={2} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const sparkles: Array<[string, string, number, number]> = [
  ["4%", "10%", 22, 0],
  ["13%", "78%", 14, 1.4],
  ["38%", "6%", 12, 2.6],
  ["46%", "88%", 18, 0.8],
  ["55%", "14%", 16, 3.2],
  ["71%", "6%", 12, 1.9],
  ["94%", "16%", 20, 0.4],
  ["90%", "70%", 14, 2.3],
  ["97%", "90%", 12, 3.6],
];

export function Sparkles({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute inset-0 [container-type:inline-size] motion-reduce:hidden">
        <div className="absolute -inset-y-1/4 left-0 w-[22%] bg-gradient-to-r from-white/0 via-white/45 to-white/0 motion-safe:animate-[shine_9s_ease-in-out_infinite]" />
      </div>
      {sparkles.map(([left, top, size, delay], i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute text-blue-ink/25 motion-safe:animate-[twinkle_4s_ease-in-out_infinite]"
          style={{ left, top, width: size, height: size, animationDelay: `${-delay}s`, animationDuration: `${3.4 + (i % 3) * 0.9}s` }}
        >
          <path fill="currentColor" d="M12 0c.9 6.6 2.4 9.6 12 12-9.6 2.4-11.1 5.4-12 12-.9-6.6-2.4-9.6-12-12C9.6 9.6 11.1 6.6 12 0z" />
        </svg>
      ))}
    </div>
  );
}

const pairs: Array<[DoodleName, DoodleName, string, number, number]> = [
  ["bag", "tag", "3%", 22, 2],
  ["gift", "bag", "17%", 26, 15],
  ["tag", "parcel", "31%", 19, 8],
  ["parcel", "gift", "46%", 24, 20],
  ["bag", "parcel", "60%", 21, 4],
  ["gift", "tag", "75%", 25, 12],
  ["parcel", "bag", "89%", 20, 17],
];

export function BundleRise({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden [container-type:size] motion-reduce:hidden", className)}>
      {pairs.map(([a, b, left, duration, at]) => (
        <div
          key={left}
          className="absolute top-full flex items-center gap-1.5 text-blue-ink/20 motion-safe:animate-[rise_22s_linear_infinite]"
          style={{ left, animationDuration: `${duration}s`, animationDelay: `${-at}s` }}
        >
          <Glyph name={a} className="size-11" />
          <Glyph name="plus" className="size-5" />
          <Glyph name={b} className="size-11" />
        </div>
      ))}
    </div>
  );
}

function Stop({ Icon, delay, className }: { Icon: LucideIcon; delay: number; className?: string }) {
  return (
    <span className={cn("absolute top-1/2 grid size-9 -translate-y-1/2 place-items-center", className)}>
      <span className="absolute inset-0 rounded-full bg-brand-300/60 motion-safe:animate-[pulse-ring_2.8s_ease-out_infinite] motion-reduce:hidden" style={{ animationDelay: `${delay}s` }} />
      <span className="relative grid size-9 place-items-center rounded-full bg-white shadow-soft ring-1 ring-brand-100">
        <Icon className="size-4 text-brand-700" strokeWidth={2} />
      </span>
    </span>
  );
}

export function DeliveryLane({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none relative h-12", className)}>
      <div className="absolute inset-x-6 top-1/2 h-1 -translate-y-1/2 bg-[radial-gradient(circle,var(--color-brand-700)_1.4px,transparent_1.9px)] bg-[length:14px_4px] bg-[position:0_center] bg-repeat-x opacity-45 motion-safe:animate-[march_1.2s_linear_infinite]" />
      <div className="absolute inset-y-0 right-12 left-12 [container-type:inline-size] motion-reduce:hidden">
        <span className="absolute top-1/2 left-0 -translate-y-[62%] motion-safe:animate-[drive_7s_ease-in-out_infinite]">
          <Truck className="size-7 text-brand-700" strokeWidth={1.8} />
        </span>
      </div>
      <Stop Icon={Store} delay={0} className="left-0" />
      <Stop Icon={House} delay={1.4} className="right-0" />
    </div>
  );
}

const riseSlots: Array<[string, number, number]> = [
  ["4%", 22, 2],
  ["18%", 26, 15],
  ["32%", 19, 8],
  ["47%", 24, 20],
  ["61%", 21, 4],
  ["76%", 25, 12],
  ["90%", 20, 17],
];

function GlyphRise({ glyphs, className }: { glyphs: DoodleName[]; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden [container-type:size] motion-reduce:hidden", className)}>
      {riseSlots.map(([left, duration, at], i) => (
        <div
          key={left}
          className="absolute top-full text-blue-ink/20 motion-safe:animate-[rise_22s_linear_infinite]"
          style={{ left, animationDuration: `${duration}s`, animationDelay: `${-at}s` }}
        >
          <Glyph name={glyphs[i % glyphs.length]} className="size-11" />
        </div>
      ))}
    </div>
  );
}

export function LoyaltyRise({ className }: { className?: string }) {
  return <GlyphRise glyphs={["gift", "star", "heart", "crown"]} className={className} />;
}

export function PickupRise({ className }: { className?: string }) {
  return <GlyphRise glyphs={["pin", "van", "clock", "parcel"]} className={className} />;
}
