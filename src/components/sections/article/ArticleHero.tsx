import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { Crumb } from "@/lib/jsonld";
import { cn } from "@/lib/cn";

export function ArticleHero({
  crumbs,
  chips,
  title,
  meta,
  lead,
  actions,
  aside,
  asideClassName,
}: {
  crumbs: Crumb[];
  chips?: ReactNode;
  title: string;
  meta?: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  asideClassName?: string;
}) {
  const size =
    title.length > 90
      ? "text-[2rem] sm:text-[2.5rem] lg:text-[2.6rem] short:text-[2.2rem]"
      : title.length > 55
        ? "text-[2.2rem] sm:text-[2.8rem] lg:text-[3rem] short:text-[2.5rem]"
        : "text-[2.5rem] sm:text-[3.2rem] lg:text-[3.6rem] short:text-[3rem]";
  return (
    <section id="hero" aria-labelledby="page-title" data-section="hero" data-section-fit="screen" className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_20%,#000_30%,transparent_75%)]" />
        <div className="absolute -top-48 right-[-8%] size-[36rem] rounded-full bg-cobalt-100/60 blur-3xl" />
        <div className="absolute top-[30%] left-[-10%] size-[26rem] rounded-full bg-coral-100/50 blur-3xl" />
      </div>
      <div className={cn("mx-auto grid max-w-site grid-cols-1 gap-10 px-5 pt-6 pb-section sm:px-8 lg:items-center", !!aside && "lg:grid-cols-12 lg:gap-12")}>
        <div className={cn(aside ? "lg:col-span-7" : "max-w-4xl")}>
          <Breadcrumbs items={crumbs} />
          {chips && (
            <Reveal className="mt-8 flex flex-wrap items-center gap-2 short:mt-6">
              {chips}
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h1 id="page-title" className={cn("mt-4 leading-[1.06] font-extrabold tracking-[-0.03em] text-balance text-navy", size)}>
              {title}
            </h1>
          </Reveal>
          {lead && (
            <Reveal delay={0.1}>
              <div className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted short:mt-4 short:text-base">{lead}</div>
            </Reveal>
          )}
          {meta && (
            <Reveal delay={0.12} className="mt-6 short:mt-5">
              {meta}
            </Reveal>
          )}
          {actions && (
            <Reveal delay={0.15} className="mt-7 flex flex-wrap items-center gap-3 short:mt-5">
              {actions}
            </Reveal>
          )}
        </div>
        {aside && (
          <Reveal delay={0.1} className={cn("lg:col-span-5", asideClassName)}>
            {aside}
          </Reveal>
        )}
      </div>
    </section>
  );
}
