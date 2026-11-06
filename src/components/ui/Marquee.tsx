import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { PauseToggle } from "@/components/ui/PauseToggle";

export function Marquee({
  children,
  label,
  duration = 60,
  className,
}: {
  children: ReactNode;
  label: string;
  duration?: number;
  className?: string;
}) {
  return (
    <div data-pausable="" className={cn("group/marquee relative", className)}>
      <PauseToggle label={label} className="absolute top-1/2 right-0 z-10 -translate-y-1/2" />
      <div className="mask-fade-x overflow-hidden" role="region" aria-label={label}>
        <div
          className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ ["--marquee-duration" as string]: `${duration}s` }}
        >
          <div className="flex shrink-0 items-center">{children}</div>
          <div className="flex shrink-0 items-center" aria-hidden>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
