"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

export function VideoFacade({ src, title, className }: { src: string; title: string; className?: string }) {
  const [play, setPlay] = useState(false);
  const id = src.match(/embed\/([\w-]+)/)?.[1];
  if (!id) return null;
  return (
    <div className={cn("relative aspect-video overflow-hidden rounded-3xl bg-navy ring-1 ring-navy/10", className)}>
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0 grid place-items-center text-white on-dark">
          <span aria-hidden className="bg-dots absolute inset-0 opacity-40" />
          <span aria-hidden className="pointer-events-none absolute -top-20 -left-16 size-72 rounded-full bg-cobalt/50 blur-3xl" />
          <span className="relative grid place-items-center gap-3 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-white text-cobalt shadow-float transition group-hover:scale-105">
              <Play aria-hidden className="ml-1 size-7 fill-current" />
            </span>
            <span className="px-6 text-[0.95rem] font-semibold">
              <span className="sr-only">Play video: </span>
              {title}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
