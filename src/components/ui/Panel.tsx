import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const panelInner = "px-5 py-section sm:px-10 lg:px-14";

export function Panel({
  id,
  labelledBy,
  className,
  outerClassName,
  innerClassName,
  children,
  as: Tag = "section",
  bare = false,
  fit = "screen",
}: {
  id?: string;
  labelledBy?: string;
  className?: string;
  outerClassName?: string;
  innerClassName?: string;
  children: ReactNode;
  as?: "section" | "div";
  bare?: boolean;
  fit?: "screen" | "pinned" | "flow";
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      data-section={id ?? labelledBy ?? ""}
      data-section-fit={fit}
      className={cn("my-section-gap scroll-mt-24 overflow-x-clip px-3 py-2 sm:px-5 sm:py-3 lg:px-6", outerClassName)}
    >
      <div
        data-panel={bare ? undefined : ""}
        className={cn(
          "relative isolate mx-auto max-w-site",
          !bare && "overflow-clip rounded-[2rem] sm:rounded-[2.5rem]",
          className,
        )}
      >
        <div className={cn(bare ? "px-2 py-section-tight sm:px-4" : panelInner, innerClassName)}>{children}</div>
      </div>
    </Tag>
  );
}
