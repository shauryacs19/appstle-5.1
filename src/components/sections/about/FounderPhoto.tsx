import Image from "next/image";
import type { MediaItem } from "@/data/media";
import { cn } from "@/lib/cn";

const initials = (name: string) =>
  name
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

export function FounderPhoto({ item, name, className }: { item: MediaItem; name: string; className?: string }) {
  if (item.status === "final")
    return <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="144px" className={cn("aspect-square rounded-3xl object-cover", className)} />;
  return (
    <div
      role="img"
      aria-label={`${item.alt} (photo pending)`}
      data-media={item.id}
      className={cn("relative isolate grid aspect-square place-items-center overflow-hidden rounded-3xl bg-gradient-to-br from-cobalt-100 via-lavender-100 to-coral-100", className)}
    >
      <div aria-hidden className="bg-dots-ink absolute inset-0 -z-10 opacity-40" />
      <span aria-hidden className="font-display text-[2.4rem] font-extrabold tracking-tight text-navy/80">
        {initials(name)}
      </span>
      <span aria-hidden className="absolute bottom-2 font-mono text-[0.6rem] tracking-wide text-navy/45 uppercase">
        Photo · {item.id}
      </span>
    </div>
  );
}
