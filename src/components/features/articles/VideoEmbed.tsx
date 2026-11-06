"use client";

import { Play } from "lucide-react";
import { useState } from "react";

export function VideoEmbed({ src, title }: { src: string; title: string }) {
  const [on, setOn] = useState(false);
  const id = src.match(/embed\/([\w-]{6,})/)?.[1];
  if (!id) return null;
  const watch = `https://www.youtube.com/watch?v=${id}`;
  return (
    <figure className="overflow-hidden rounded-2xl bg-navy ring-1 ring-navy/10">
      <div className="relative aspect-video">
        {on ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button type="button" onClick={() => setOn(true)} className="group absolute inset-0 grid place-items-center bg-gradient-to-br from-cobalt-800 to-navy text-white">
            <span className="grid size-16 place-items-center rounded-full bg-white/15 ring-1 ring-white/30 transition group-hover:scale-105 group-hover:bg-white/25">
              <Play aria-hidden className="size-7 translate-x-0.5 fill-current" />
            </span>
            <span className="sr-only">Play video: {title}</span>
          </button>
        )}
      </div>
      <figcaption className="flex items-center justify-between gap-3 bg-white px-4 py-3 text-sm text-ink-muted">
        <span>Video from the original post</span>
        <a href={watch} target="_blank" rel="noopener noreferrer" className="font-semibold text-cobalt-700 hover:underline">
          Watch on YouTube
        </a>
      </figcaption>
    </figure>
  );
}
