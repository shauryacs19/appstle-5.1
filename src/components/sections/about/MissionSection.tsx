import { Quote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReadMore } from "@/components/ui/ReadMore";
import type { aboutPage } from "@/data/pages/about";

export function MissionSection({ data }: { data: (typeof aboutPage)["mission"] }) {
  return (
    <Panel id="mission" labelledBy="mission-title" className="bg-[linear-gradient(150deg,#1088F6,#0066CA_60%,#003F7D)] text-white on-dark">
      <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-40" />
      <div aria-hidden className="pointer-events-none absolute -top-32 -right-24 -z-10 size-[28rem] rounded-full bg-white/15 blur-3xl" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHeading id="mission-title" eyebrow="Our mission" title={data.title} tone="light" dot="bg-coral" titleClassName="lg:text-[2.5rem] short:text-[2.1rem]" />
          <Reveal delay={0.15}>
            <p className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-[0.95rem] font-semibold text-cream ring-1 ring-white/20 short:mt-4">
              ‘{data.motto}’
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1} as="figure" className="relative lg:col-span-8">
          <Quote aria-hidden className="absolute -top-3 -left-2 size-12 -scale-x-100 text-white/15" />
          <blockquote className="relative space-y-4 text-[1.06rem] leading-relaxed text-white/85 short:space-y-3 short:text-[0.98rem] short:leading-normal">
            <p>“{data.quote[0]}{data.quote.length === 1 && "”"}</p>
          </blockquote>
          {data.quote.length > 1 && (
            <ReadMore tone="light" label="Read the full message" className="mt-3">
              <div className="space-y-4 text-[1.02rem] leading-relaxed text-white/85">
                {data.quote.slice(1).map((p, i, rest) => (
                  <p key={i}>
                    {p}
                    {i === rest.length - 1 && "”"}
                  </p>
                ))}
              </div>
            </ReadMore>
          )}
          <figcaption className="mt-6 flex items-center gap-3 border-t border-white/15 pt-5 short:mt-4 short:pt-4">
            <span className="font-display text-2xl font-bold text-white italic">{data.signature}</span>
            <span className="text-sm text-white/65">{data.signatureRole}</span>
          </figcaption>
        </Reveal>
      </div>
    </Panel>
  );
}
