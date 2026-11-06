import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/SectionHeading";
import type { Crumb } from "@/lib/jsonld";
import { cn } from "@/lib/cn";

export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  actions,
  aside,
  dot,
  className,
}: {
  crumbs: Crumb[];
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  dot?: string;
  className?: string;
}) {
  return (
    <section id="hero" aria-labelledby="page-title" data-section="hero" data-section-fit="screen" className={cn("relative isolate overflow-hidden", className)}>
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_20%,#000_30%,transparent_75%)]" />
        <div className="absolute -top-48 right-[-8%] size-[36rem] rounded-full bg-cobalt-100/60 blur-3xl" />
        <div className="absolute top-[30%] left-[-10%] size-[26rem] rounded-full bg-brand-100/50 blur-3xl" />
      </div>
      <div
        className={cn(
          "mx-auto grid max-w-site gap-10 px-5 pt-6 pb-section sm:px-8 lg:items-center",
          aside ? "lg:grid-cols-12 lg:gap-8" : "",
        )}
      >
        <div className={cn(aside ? "lg:col-span-6" : "max-w-3xl")}>
          <Breadcrumbs items={crumbs} />
          {eyebrow && (
            <Reveal className="mt-8">
              <Eyebrow dot={dot}>{eyebrow}</Eyebrow>
            </Reveal>
          )}
          <h1 id="page-title" className="mt-4 text-[2.5rem] leading-[1.02] font-extrabold tracking-[-0.035em] text-navy sm:text-[3.4rem] lg:text-[3.9rem]">
            <SplitText delay={0.05}>{title}</SplitText>
          </h1>
          {intro && (
            <Reveal delay={0.1}>
              <div className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{intro}</div>
            </Reveal>
          )}
          {actions && (
            <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-3">
              {actions}
            </Reveal>
          )}
        </div>
        {aside && <div className="lg:col-span-6">{aside}</div>}
      </div>
    </section>
  );
}
