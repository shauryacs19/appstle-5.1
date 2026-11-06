import type { ReactNode } from "react";
import Link from "next/link";
import { contentMedia } from "@/data/content/config";
import type { ContentImage } from "@/data/content/types";
import type { Accent, ProductId } from "@/data/products";
import { cn } from "@/lib/cn";
import { EntryCover } from "./EntryCover";
import { EntryMeta } from "./EntryMeta";

export type EntryCardData = {
  href: string;
  title: string;
  accent: Accent;
  product?: ProductId;
  chip?: string;
  kicker?: string;
  excerpt?: string;
  meta?: ReactNode[];
  image?: ContentImage | null;
};

export function EntryCard({ card, featured = false, headingLevel = "h3", className }: { card: EntryCardData; featured?: boolean; headingLevel?: "h2" | "h3"; className?: string }) {
  const H = headingLevel;
  return (
    <article className={cn("group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-navy/8 transition duration-300 hover:-translate-y-1 hover:shadow-card focus-within:shadow-card", className)}>
      <div className={cn("relative overflow-hidden", featured ? "aspect-[16/9] short:aspect-[2/1]" : "aspect-[16/9]")}>
        <EntryCover image={card.image} accent={card.accent} product={card.product} label={card.chip === card.kicker ? undefined : card.chip} kicker={card.kicker} sizes={featured ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1280px) 28vw, (min-width: 640px) 45vw, 100vw"} className="transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className={cn("flex flex-1 flex-col", featured ? "p-6 short:p-5" : "p-5")}>
        {card.chip && <p className={contentMedia.images === "live" ? "eyebrow mb-2 text-ink-subtle" : "sr-only"}>{card.chip}</p>}
        <H className={cn("font-sans leading-snug font-bold tracking-tight text-navy", featured ? "text-[1.35rem] short:text-[1.2rem]" : "text-[1.06rem]")}>
          <Link href={card.href} className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:outline-[2.5px] focus-visible:after:outline-offset-[3px] focus-visible:after:outline-cobalt">
            {card.title}
          </Link>
        </H>
        {card.excerpt && <p className={cn("mt-2 flex-1 text-ink-muted", featured ? "line-clamp-3 text-[0.95rem] leading-relaxed" : "line-clamp-3 text-[0.88rem] leading-snug")}>{card.excerpt}</p>}
        {card.meta && <EntryMeta items={card.meta} className="mt-4" />}
      </div>
    </article>
  );
}
