import Image from "next/image";
import { ImageIcon, PlayCircle } from "lucide-react";
import type { MediaItem } from "@/data/media";
import { cn } from "@/lib/cn";

export function Media({
  item,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  tone = "light",
}: {
  item: MediaItem;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "light" | "dark";
}) {
  const ratio = { aspectRatio: `${item.width} / ${item.height}` };

  if (item.status === "placeholder" && item.standIn) {
    return (
      <div
        style={ratio}
        data-media={item.id}
        className={cn(
          "relative w-full overflow-hidden rounded-2xl",
          item.standInFit === "cover" ? "bg-white" : "bg-gradient-to-b from-cream-50 to-cream-100",
          className,
        )}
      >
        <Image
          src={item.standIn}
          alt={item.alt}
          fill
          sizes={sizes}
          preload={priority}
          className={item.standInFit === "cover" ? "object-cover object-top" : "object-contain p-[3%]"}
        />
      </div>
    );
  }

  if (item.status === "placeholder") {
    const Icon = item.kind === "video" ? PlayCircle : ImageIcon;
    return (
      <div
        role="img"
        aria-label={item.alt}
        style={ratio}
        className={cn(
          "relative isolate flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl p-4 text-center",
          tone === "light"
            ? "bg-white/70 text-ink-subtle ring-1 ring-navy/10 ring-inset"
            : "bg-white/10 text-white/75 ring-1 ring-white/25 ring-inset",
          className,
        )}
      >
        <div aria-hidden className={cn("absolute inset-0 -z-10", tone === "light" ? "bg-dots-ink opacity-60" : "bg-dots opacity-50")} />
        <Icon aria-hidden className="size-6 opacity-70" />
        <p className="max-w-[28ch] text-[0.8rem] leading-snug font-medium text-balance">{item.label}</p>
        <p className="font-mono text-[0.68rem] tracking-wide uppercase opacity-70">
          {item.kind === "video" ? "Video" : "Screenshot"} pending · {item.id}
        </p>
      </div>
    );
  }

  if (item.kind === "video") {
    return (
      <video
        className={cn("h-auto w-full rounded-2xl", className)}
        style={ratio}
        width={item.width}
        height={item.height}
        poster={item.poster}
        muted
        loop
        playsInline
        autoPlay
        preload="none"
        aria-label={item.alt}
      >
        <source src={item.src} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      width={item.width}
      height={item.height}
      sizes={sizes}
      preload={priority}
      className={cn("h-auto w-full rounded-2xl", className)}
    />
  );
}
