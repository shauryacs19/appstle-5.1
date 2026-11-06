import { EntryCover } from "@/components/sections/article/EntryCover";
import { accentFor } from "@/data/content/accents";
import type { ContentImage } from "@/data/content/types";
import type { ProductId } from "@/data/products";
import { cn } from "@/lib/cn";

export function EbookCover({ title, image, product, priority, className }: { title: string; image?: ContentImage | null; product?: ProductId; priority?: boolean; className?: string }) {
  return (
    <div className={cn("relative aspect-[3/4] overflow-hidden rounded-r-2xl rounded-l-md shadow-float ring-1 ring-navy/10", className)}>
      <EntryCover image={image} accent={accentFor(product)} product={product} label="Free eBook" kicker={title.replace(/^getting started with\s+/i, "")} size="card" sizes="(min-width: 1024px) 24vw, 60vw" priority={priority} />
      <span aria-hidden className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-navy/20 to-transparent" />
    </div>
  );
}
