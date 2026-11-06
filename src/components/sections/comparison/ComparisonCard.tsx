import Link from "next/link";
import { ProductIcon } from "@/components/ui/ProductIcon";
import type { ComparisonCardData } from "@/data/comparison-pages/cards";
import { cn } from "@/lib/cn";

export function ComparisonCard({ card, headingLevel = 3, className }: { card: ComparisonCardData; headingLevel?: 2 | 3 | 4; className?: string }) {
  const H = `h${headingLevel}` as const;
  return (
    <div className={cn("group relative flex h-full flex-col rounded-3xl p-4 ring-1 ring-navy/8 transition duration-300 hover:-translate-y-1 hover:shadow-card focus-within:ring-cobalt/40", card.soft, className)}>
      <div className="flex items-center justify-between gap-3">
        <ProductIcon id={card.product} size="sm" />
        <span aria-hidden className="text-[0.72rem] font-semibold tracking-wide text-ink-subtle uppercase">
          vs
        </span>
      </div>
      <H className="mt-3 font-sans text-[1.15rem] leading-tight font-bold tracking-tight text-navy">
        <Link href={card.href} className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none">
          <span className="sr-only">Appstle vs </span>
          {card.short}
        </Link>
      </H>
      <p className="mt-1 flex-1 text-[0.82rem] leading-snug text-ink-muted">{card.name}</p>
      <p aria-hidden className="mt-3 inline-flex items-center gap-1 text-[0.82rem] font-semibold text-cobalt-700 transition group-hover:gap-1.5">
        Compare <span>→</span>
      </p>
    </div>
  );
}
