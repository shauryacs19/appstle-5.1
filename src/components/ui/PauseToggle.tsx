"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

export function PauseToggle({ label, className }: { label: string; className?: string }) {
  const [paused, setPaused] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={paused}
      aria-label={`${paused ? "Play" : "Pause"} ${label}`}
      onClick={(e) => {
        const root = e.currentTarget.closest("[data-pausable]");
        if (paused) root?.removeAttribute("data-paused");
        else root?.setAttribute("data-paused", "");
        setPaused(!paused);
      }}
      className={cn(
        "inline-grid size-8 place-items-center rounded-full bg-white/90 text-ink-muted shadow-soft ring-1 ring-line transition-colors hover:text-ink motion-reduce:hidden",
        className,
      )}
    >
      {paused ? <Play aria-hidden className="size-3.5" /> : <Pause aria-hidden className="size-3.5" />}
    </button>
  );
}
