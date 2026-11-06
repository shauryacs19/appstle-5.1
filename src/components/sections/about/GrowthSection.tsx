import Image from "next/image";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { aboutPage } from "@/data/pages/about";

export function GrowthSection({ data }: { data: (typeof aboutPage)["growth"] }) {
  return (
    <Panel id="growth" labelledBy="growth-title" className="bg-cobalt-50/70 ring-1 ring-navy/6">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_70%_at_80%_30%,#000_25%,transparent_75%)]" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading id="growth-title" eyebrow="Growth" title={data.title} titleClassName="lg:text-[2.3rem] short:text-[2rem]" />
          <Reveal delay={0.12}>
            <p className="mt-6 font-display text-[3.6rem] leading-none font-extrabold tracking-tight text-cobalt short:mt-4 short:text-[3rem]">
              <CountUp to={40000} suffix="+" />
            </p>
            <p className="mt-2 text-sm font-semibold tracking-wide text-ink-subtle uppercase">{data.asOf}</p>
            <p className="mt-5 leading-relaxed text-navy short:mt-3 short:text-[0.95rem]">
              <strong>{data.lead}</strong> <strong>{data.leadNote}</strong> {data.body}
            </p>
            <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-muted short:text-[0.8rem] short:leading-snug">{data.thanks}</p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-8">
          <figure className="rounded-4xl bg-white p-4 shadow-card ring-1 ring-navy/8 sm:p-6 short:p-4">
            <figcaption className="mb-3 flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-navy">Merchant partners</span>
              <span className="rounded-full bg-cream-100 px-3 py-1 font-medium text-ink-muted">{data.range}</span>
            </figcaption>
            <Image src={data.graph.src} alt={data.graph.alt} sizes="(min-width: 1024px) 55vw, 100vw" className="h-auto max-h-[calc(100svh-17rem)] w-full object-contain" />
          </figure>
        </Reveal>
      </div>
    </Panel>
  );
}
