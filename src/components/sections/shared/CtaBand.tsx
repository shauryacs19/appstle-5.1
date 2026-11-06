import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { cn } from "@/lib/cn";

export function CtaBand({
  id = "get-started",
  eyebrow = "Compelling apps at compelling prices",
  title,
  body,
  actions,
  extras,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  actions: ReactNode;
  extras?: ReactNode;
  className?: string;
}) {
  return (
    <Panel
      id={id}
      labelledBy={`${id}-title`}
      className={cn("on-dark bg-gradient-to-br from-cobalt-400 via-cobalt to-cobalt-800 text-white", className)}
    >
      <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-50" />
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-24 -z-10 size-[30rem] rounded-full bg-white/15 blur-3xl" />
      <div aria-hidden className="absolute -right-10 -bottom-48 -z-10 size-[34rem] rounded-full border-[48px] border-white/[0.06]" />
      <div className="max-w-3xl">
        <Reveal>
          <p className="eyebrow inline-flex items-center gap-2 text-white/75">
            <span aria-hidden className="size-1.5 rounded-full bg-brand-200" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 id={`${id}-title`} className="mt-5 text-[2.3rem] leading-[1.03] font-extrabold tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]">
            {title}
          </h2>
        </Reveal>
        {body && (
          <Reveal delay={0.12}>
            <div className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{body}</div>
          </Reveal>
        )}
        <Reveal delay={0.18} className="mt-8 flex flex-col gap-3 sm:flex-row">
          {actions}
        </Reveal>
        {extras && (
          <Reveal delay={0.24} className="mt-8">
            {extras}
          </Reveal>
        )}
      </div>
    </Panel>
  );
}
