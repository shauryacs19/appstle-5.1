import Image from "next/image";
import { CoverArt } from "@/components/ui/CoverArt";
import { contentMedia } from "@/data/content/config";
import type { ContentImage } from "@/data/content/types";
import type { Accent, ProductId } from "@/data/products";
import { cn } from "@/lib/cn";

export function EntryCover({
  image,
  accent,
  product,
  label,
  kicker,
  size = "card",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
  className,
}: {
  image?: ContentImage | null;
  accent: Accent;
  product?: ProductId;
  label?: string;
  kicker?: string;
  size?: "card" | "hero";
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (contentMedia.images === "live" && image?.src) {
    return (
      <div className={cn("relative size-full", accent.soft, className)}>
        <Image src={image.src} alt={image.alt} fill unoptimized sizes={sizes} preload={priority} className="object-cover" />
      </div>
    );
  }
  return <CoverArt accent={accent} product={product} label={label} kicker={kicker} size={size} className={className} />;
}
