import { cn } from "@/lib/cn";

const MARK_VIEWBOX = "0 0 490 490";
const MARK_A =
  "M64.5 244.5a180 180 0 1 0 360 0a180 180 0 1 0 -360 0ZM327.9 142.2L327 127L372 147L381 345L342 375L339.6 336A132 132 0 1 1 327.9 142.2Z";
const GLOBE = { cx: 244.5, cy: 244.5, r: 66.3, stroke: 8.5, meridian: 28, parallels: [209, 244.5, 280] } as const;

function MarkGlobe({ className }: { className?: string }) {
  const { cx, cy, r, stroke, meridian, parallels } = GLOBE;
  const lines = parallels.map((y) => {
    const half = Math.sqrt(r * r - (y - cy) ** 2);
    return `M${(cx - half).toFixed(1)} ${y}H${(cx + half).toFixed(1)}`;
  });
  return (
    <g fill="none" stroke="currentColor" strokeWidth={stroke} className={className}>
      <circle cx={cx} cy={cy} r={r} />
      <ellipse cx={cx} cy={cy} rx={meridian} ry={r} />
      <path d={lines.join("")} />
    </g>
  );
}

export function AppstleMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={cn("rounded-[22%]", className)}
      style={{ background: "var(--gradient-brand)" }}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g opacity=".22" transform="translate(6 10)" color="#08427f">
        <path d={MARK_A} fill="currentColor" fillRule="evenodd" />
        <MarkGlobe />
      </g>
      <g color="#fff">
        <path d={MARK_A} fill="currentColor" fillRule="evenodd" />
        <MarkGlobe />
      </g>
    </svg>
  );
}

export function AppstleLogo({ className, tone = "dark", tagline = true }: { className?: string; tone?: "dark" | "light"; tagline?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <AppstleMark className="size-8 shrink-0 rounded-[8px] " />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.32rem] font-bold tracking-[-0.03em]",
            tone === "dark" ? "text-ink" : "text-white",
          )}
        >
          Appstle
          <sup className="ml-0.5 align-super text-[0.5rem] font-semibold tracking-normal opacity-70">SM</sup>
        </span>
        {tagline && (
          <span
            className={cn(
              "mt-1 hidden text-xs font-medium tracking-[0.01em] sm:block lg:hidden xl:block",
              tone === "dark" ? "text-ink-subtle" : "text-white/70",
            )}
          >
            Compelling apps at compelling prices
          </span>
        )}
      </span>
    </span>
  );
}
