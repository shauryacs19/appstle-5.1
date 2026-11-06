import { AppstleMark } from "@/components/brand/AppstleLogo";
import { ProductIcon } from "@/components/ui/ProductIcon";
import type { Accent, ProductId } from "@/data/products";
import { cn } from "@/lib/cn";

export function CoverArt({
  accent,
  product,
  label,
  kicker,
  size = "card",
  className,
}: {
  accent: Accent;
  product?: ProductId;
  label?: string;
  kicker?: string;
  size?: "card" | "hero";
  className?: string;
}) {
  const hero = size === "hero";
  return (
    <div aria-hidden className={cn("relative isolate flex size-full flex-col justify-between overflow-hidden", accent.soft, hero ? "p-7 sm:p-9" : "p-5", className)}>
      <div className="bg-dots-ink absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_80%_80%_at_80%_20%,#000_20%,transparent_75%)]" />
      <div className={cn("absolute -right-16 -bottom-20 -z-10 rounded-full border-white/70", hero ? "size-80 border-[42px]" : "size-56 border-[30px]")} />
      <div className={cn("absolute -top-10 -left-10 -z-10 rounded-full opacity-60 blur-2xl", accent.chip, hero ? "size-72" : "size-40")} />
      <div className="flex items-start justify-between gap-3">
        {label ? <span className={cn("rounded-full bg-white/85 px-2.5 py-1 font-semibold text-navy shadow-hairline", hero ? "text-sm" : "text-[0.72rem]")}>{label}</span> : <span />}
        {product ? (
          <ProductIcon id={product} size={hero ? "lg" : "md"} className="shadow-soft" />
        ) : (
          <AppstleMark className={cn("rounded-xl shadow-soft", hero ? "size-12" : "size-10")} />
        )}
      </div>
      {kicker && (
        <p className={cn("max-w-[85%] font-display leading-[1.05] font-extrabold tracking-tight text-balance text-navy", hero ? "text-[2.1rem] sm:text-[2.6rem]" : "text-[1.35rem]")}>{kicker}</p>
      )}
    </div>
  );
}
