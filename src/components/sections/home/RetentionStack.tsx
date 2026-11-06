import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { BundleBuilderDemo } from "@/components/features/demos/BundleBuilderDemo";
import { LoyaltyPointsDemo } from "@/components/features/demos/LoyaltyPointsDemo";
import { MembershipJoinDemo } from "@/components/features/demos/MembershipJoinDemo";
import { PickupSchedulerDemo } from "@/components/features/demos/PickupSchedulerDemo";
import { SubscriptionWidgetDemo } from "@/components/features/demos/SubscriptionWidgetDemo";
import { Confetti } from "@/components/motion/Confetti";
import { Doodles, type DoodleSpot } from "@/components/features/backdrops/Doodles";
import { BundleRise, DeliveryLane, LoyaltyRise, PickupRise, RenewOrbit, Sparkles } from "@/components/features/backdrops/scenes";
import { Stars } from "@/components/ui/Stars";
import { ButtonLink } from "@/components/ui/Button";
import { AppstleMark } from "@/components/brand/AppstleLogo";
import { suiteCopy } from "@/data/productCopy";
import { productById, type ProductId } from "@/data/products";
import { cn, formatNumber } from "@/lib/cn";
import { SmartLink } from "@/components/ui/SmartLink";
import { SuiteViews } from "./suite/SuiteViews";

type Tone = "light" | "mist" | "sky" | "navy";
const tones: Record<Tone, { card: string; text: string; muted: string; frame: string; doodle: string; dark?: boolean }> = {
  light: {
    card: "bg-white ring-1 ring-line",
    text: "text-ink",
    muted: "text-ink-muted",
    frame: "bg-[#F3ECDF] ring-line",
    doodle: "text-brand-400/40",
  },
  mist: {
    card: "bg-[linear-gradient(165deg,#F2F8FF_0%,#E8F2FD_100%)] ring-1 ring-[#D8E7F7]",
    text: "text-ink",
    muted: "text-ink-muted",
    frame: "bg-white/85 ring-[#E1ECF8]",
    doodle: "text-brand-400/45",
  },
  sky: {
    card: "bg-[linear-gradient(165deg,#F3F9FF_0%,#E8F3FE_60%,#DDEEFD_100%)] ring-1 ring-[#CFE3F8]",
    text: "text-ink",
    muted: "text-ink-muted",
    frame: "bg-white/80 ring-[#D6E7F8]",
    doodle: "text-brand-400/50",
  },
  navy: {
    card: "bg-ink-deep ring-1 ring-white/5",
    text: "text-white",
    muted: "text-white/72",
    frame: "bg-white/6 ring-white/10",
    doodle: "text-brand-300/40",
    dark: true,
  },
};

const doodleSpots: Record<ProductId, DoodleSpot[]> = {
  subscriptions: [
    { name: "repeat", className: "right-[5%] top-[3%] size-10", rotate: -8 },
    { name: "calendar", className: "hidden sm:block right-[18%] top-[4.5%] size-8", rotate: 8 },
    { name: "parcel", className: "right-[5%] bottom-[2.5%] size-9", rotate: -6 },
  ],
  memberships: [
    { name: "crown", className: "right-[5%] top-[3%] size-11", rotate: 10 },
    { name: "gem", className: "hidden sm:block right-[20%] top-[4.5%] size-8", rotate: -8 },
    { name: "ticket", className: "right-[5%] bottom-[2.5%] size-10", rotate: 8 },
  ],
  loyalty: [
    { name: "gift", className: "right-[5%] top-[3%] size-11", rotate: 10 },
    { name: "star", className: "hidden sm:block right-[20%] top-[4.5%] size-8", rotate: 12 },
    { name: "heart", className: "right-[5%] bottom-[2.5%] size-9", rotate: -6 },
  ],
  bundles: [
    { name: "percent", className: "right-[4%] top-[4%] size-10", rotate: -8 },
    { name: "bag", className: "hidden sm:block right-[16%] top-[5%] size-10", rotate: 6 },
    { name: "tag", className: "right-[4%] bottom-[3%] size-10", rotate: 14 },
  ],
  pickup: [
    { name: "pin", className: "right-[4%] top-[2.5%] size-9 md:right-auto md:left-[30%] md:top-[5%] md:size-11", rotate: -8 },
    { name: "van", className: "hidden md:block left-[24%] bottom-[6%] size-12", rotate: -4 },
    { name: "clock", className: "hidden md:block left-[3%] bottom-[4%] size-9", rotate: 6 },
  ],
};

const confetti = ["#2A56D8", "#2A56D8", "#8EA7EF", "#DCE5FA", "#F2B55A", "#F2B55A", "#172036", "#FFFCF7"];

const demo: Record<ProductId, ReactNode> = {
  subscriptions: (
    <>
      <RenewOrbit className="hidden sm:block" />
      <SubscriptionWidgetDemo />
    </>
  ),
  memberships: <MembershipJoinDemo />,
  loyalty: (
    <div className="relative">
      <LoyaltyPointsDemo />
      <Confetti colors={confetti} className="z-20 rounded-[1.75rem]" />
    </div>
  ),
  bundles: <BundleBuilderDemo />,
  pickup: (
    <>
      <DeliveryLane className="mb-4" />
      <PickupSchedulerDemo />
    </>
  ),
};

/* Shapes in shades of blue (plus one red mark) layered behind each demo on the grey stage */
const stageDecor: Record<ProductId, string[]> = {
  subscriptions: [
    "-top-24 -right-20 size-[22rem] rounded-full bg-white/45 ring-1 ring-blue-ink/10",
    "-top-10 -right-8 size-[15rem] rounded-full border border-blue-ink/15",
    "-bottom-20 -left-12 size-48 rounded-full bg-brand/[0.07]",
    "-bottom-7 right-[22%] h-14 w-44 -rotate-12 rounded-full bg-blue-ink",
    "top-[24%] left-[9%] size-3.5 rounded-full bg-orange",
    "bottom-[14%] left-[16%] size-4 rounded-full bg-red",
  ],
  memberships: [
    "-bottom-28 -left-20 size-[24rem] rounded-full bg-white/45 ring-1 ring-blue-ink/10",
    "-bottom-14 -left-6 size-[16rem] rounded-full border border-blue-ink/15",
    "-top-8 -right-8 size-32 rotate-12 rounded-[2rem] bg-blue-ink",
    "top-[30%] -right-10 size-40 rounded-full bg-brand/[0.07]",
    "top-[18%] left-[12%] size-3.5 rounded-full bg-orange",
    "top-[10%] right-[20%] size-4 rounded-full bg-red",
  ],
  loyalty: [
    "-top-20 -left-16 size-[20rem] rounded-full bg-white/45 ring-1 ring-blue-ink/10",
    "-bottom-24 -right-16 size-[22rem] rounded-full bg-brand/[0.07]",
    "-right-4 -bottom-10 size-[14rem] rounded-full border border-blue-ink/15",
    "top-[40%] -left-6 h-12 w-32 rotate-[70deg] rounded-full bg-orange",
    "top-[12%] right-[14%] size-4 rounded-full bg-red",
    "bottom-[12%] left-[20%] size-3 rounded-full bg-blue-ink",
  ],
  bundles: [
    "-top-16 -right-24 size-[24rem] rounded-full bg-brand/[0.07]",
    "-bottom-24 -left-20 size-[20rem] rounded-full bg-white/45 ring-1 ring-blue-ink/10",
    "-bottom-8 -left-4 size-[13rem] rounded-full border border-blue-ink/15",
    "-top-6 left-[18%] h-12 w-36 rotate-6 rounded-full bg-blue-ink",
    "bottom-[16%] right-[10%] size-4 rounded-full bg-red",
    "top-[30%] right-[6%] size-3.5 rounded-full bg-orange",
  ],
  pickup: [
    "-top-24 left-[20%] size-[22rem] rounded-full bg-white/45 ring-1 ring-blue-ink/10",
    "-right-20 -bottom-20 size-[18rem] rounded-full bg-brand/[0.07]",
    "top-[8%] left-[24%] size-[14rem] rounded-full border border-blue-ink/15",
    "-bottom-6 -left-6 size-28 -rotate-12 rounded-[1.75rem] bg-blue-ink",
    "top-[18%] right-[12%] size-4 rounded-full bg-red",
    "bottom-[22%] left-[38%] size-3.5 rounded-full bg-orange",
  ],
};

/* Demo stage: cool slate gradient, a fine grid texture, one soft cobalt glow in the corner and a crisp
   inset edge with a top highlight (no drop shadow). */
const demoStage: CSSProperties = {
  background: [
    "radial-gradient(120% 80% at 88% 0%, rgb(37 99 235 / 0.13), transparent 55%)",
    "radial-gradient(90% 70% at 0% 100%, rgb(30 58 138 / 0.08), transparent 60%)",
    "linear-gradient(to right, rgb(15 23 42 / 0.045) 1px, transparent 1px) 0 0 / 24px 24px",
    "linear-gradient(to bottom, rgb(15 23 42 / 0.045) 1px, transparent 1px) 0 0 / 24px 24px",
    "linear-gradient(160deg, #EEF1F5 0%, #E1E6ED 100%)",
  ].join(", "),
  boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.9), inset 0 0 0 1px #D3DAE4",
};

const stageScene: Partial<Record<ProductId, ReactNode>> = {
  memberships: <Sparkles />,
  bundles: <BundleRise />,
  loyalty: <LoyaltyRise />,
  pickup: <PickupRise />,
};

/* the two-column Loyalty and Bundles widgets need a wider box; FitDemos scales each demo to fit the stage height */
const demoWidth: Record<ProductId, string> = {
  subscriptions: "max-w-[27rem]",
  memberships: "max-w-[27rem]",
  loyalty: "max-w-[42rem]",
  bundles: "max-w-[42rem]",
  pickup: "max-w-[27rem]",
};

function AppCard({ id, tone, wide, flip, className }: { id: ProductId; tone: Tone; wide?: boolean; flip?: boolean; className?: string }) {
  const p = productById[id];
  const copy = suiteCopy[id];
  const t = tones[tone];
  const dark = !!t.dark;
  const ctas = (
    <div className="grid gap-2.5 sm:flex sm:flex-wrap sm:items-center max-sm:[&>a]:h-11">
      <ButtonLink href={p.href} size="sm" variant={dark ? "light" : "primary"}>
        Learn <strong>more</strong>
      </ButtonLink>
      <ButtonLink
        href={p.installHref}
        size="sm"
        variant={dark ? "outlineLight" : "ghost"}
        arrow={false}
        className={dark ? undefined : "ring-1 ring-stage-line hover:ring-brand/40"}
      >
        Install on <strong>Shopify</strong>
      </ButtonLink>
    </div>
  );
  const head = (
    <div className="flex min-w-0 flex-col">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <AppstleMark className="size-10 shrink-0 rounded-xl" />
        <div className="min-w-0">
          <p className={cn("text-[0.95rem] font-semibold", t.text)}>{p.name}</p>
          <SmartLink
            href={`${p.installHref}/reviews`}
            className={cn("hit-area inline-flex items-center gap-1.5 text-xs hover:underline", dark ? "text-white/70" : "text-ink-subtle")}
          >
            <Stars value={p.rating.value} className="[&>span]:size-3 [&_svg]:size-3" />
            {p.rating.value.toFixed(1)} · {formatNumber(p.rating.count)} reviews
            <span className="sr-only"> of {p.name} on the Shopify App Store</span>
          </SmartLink>
        </div>
      </div>
      <h3 id={`app-${id}`} className={cn("mt-5 short:mt-3 font-bold tracking-[-0.03em] text-balance", t.text, wide ? "text-[1.6rem] leading-[1.08] sm:text-[1.9rem] short:text-[1.5rem]" : "text-[1.3rem] leading-[1.12] short:text-[1.15rem]")}>
        {copy.title}
      </h3>
      <p className={cn("mt-3 max-w-[30rem] text-[0.95rem] leading-relaxed short:mt-1.5 short:text-[0.875rem]", t.muted)}>{copy.intro}</p>
    </div>
  );
  const stage = (
    <div data-fit-stage="" className={cn("relative isolate flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.5rem] p-5 ring-1 sm:p-8 short:p-4", dark ? t.frame : "ring-0")} style={dark ? undefined : demoStage}>
      {dark && <div aria-hidden className="absolute inset-0 -z-20 rounded-[inherit] bg-dots opacity-40" />}
      {!dark && (
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
          {stageDecor[id].map((c) => (
            <span key={c} className={cn("absolute", c)} />
          ))}
        </div>
      )}
      {stageScene[id]}
      <p
        className={cn(
          "absolute top-3 left-3 z-10 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold shadow-soft ring-1 backdrop-blur",
          dark ? "bg-white/10 text-white/85 ring-white/15" : "bg-blue-ink text-white ring-blue-ink",
        )}
      >
        <span className="relative flex size-2">
          <span className="absolute inset-0 rounded-full bg-orange motion-safe:animate-[pulse-ring_2s_ease-out_infinite]" />
          <span className="relative size-2 rounded-full bg-orange" />
        </span>
        Try it live
      </p>
      <div data-fit-demo="" data-fit-max="0.92" className={cn("relative isolate mx-auto my-auto w-full min-w-0 pt-8", demoWidth[id])}>
        <div>{demo[id]}</div>
      </div>
    </div>
  );
  return (
    <article
      aria-labelledby={`app-${id}`}
      data-fit-card=""
      
      className={cn(
        "group relative isolate flex h-full flex-col overflow-hidden rounded-[1.75rem] p-5 sm:p-7 lg:p-8 short:p-5",
        t.card,
        className,
      )}
    >
      {dark && <div aria-hidden className="absolute inset-0 -z-20 bg-dots opacity-30 [mask-image:linear-gradient(to_bottom,transparent,#000)]" />}
      <Doodles autoplay spots={doodleSpots[id]} className={dark ? t.doodle : "text-azure opacity-40"} />
      {wide ? (
        <div className={cn("grid h-full gap-7 lg:gap-12", flip ? "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]" : "lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]")}>
          <div className={cn("flex flex-col justify-center gap-8 lg:py-6", flip ? "lg:order-2 lg:pr-6" : "lg:pl-6")}>
            {head}
            {ctas}
          </div>
          {stage}
        </div>
      ) : (
        <div className="flex h-full flex-col gap-5 short:gap-3.5">
          {head}
          {stage}
          {ctas}
        </div>
      )}
    </article>
  );
}

const order: ProductId[] = ["subscriptions", "memberships", "loyalty", "bundles", "pickup"];

export function RetentionStack() {
  return (
    <section id="products" aria-labelledby="products-title" className="section-card [--card-bg:#FCF8F1] [--card-line:#ECE3D4] [--accent:#1E40AF] [--accent-tint:#E8EEFB] relative scroll-mt-24 py-band">
      <div className="mx-auto max-w-site px-5 sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="products-title" className="text-[2.3rem] leading-[1.03] font-bold tracking-[-0.04em] text-ink sm:text-[3rem] lg:text-[3.4rem]">
              <SplitText>
                Five apps. <span className="text-accent">One retention stack.</span>
              </SplitText>
            </h2>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-ink-muted lg:pb-2">
              Use one app or all five. Each is built for Shopify and Shopify Plus, and they’re designed to work together.
            </p>
          </Reveal>
        </div>

        <SuiteViews
          panels={order.map((id, i) => ({
            id,
            label: productById[id].shortName,
            node: <AppCard id={id} tone="light" wide flip={i % 2 === 1} className="lg:h-[clamp(34rem,calc(100svh-8rem),42rem)]" />,
          }))}
        />
      </div>
    </section>
  );
}
