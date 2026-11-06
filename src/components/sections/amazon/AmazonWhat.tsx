import { CheckCircle2, Info } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { amazonPage } from "@/data/pages/amazon";

export function AmazonWhat({ data }: { data: (typeof amazonPage)["what"] }) {
  return (
    <Panel id="what" labelledBy="what-title" className="bg-white ring-1 ring-navy/6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <SectionHeading id="what-title" eyebrow="Overview" title={data.title} titleClassName="lg:text-[2.5rem] short:text-[2.1rem]" />
          <Reveal delay={0.1}>
            <p className="mt-5 leading-relaxed text-ink-muted short:mt-3 short:text-[0.95rem]">{data.body}</p>
            <p className="mt-5 flex gap-3 rounded-2xl bg-mint-50 p-4 text-[0.95rem] font-semibold text-navy ring-1 ring-mint-200 short:mt-4">
              <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-mint-700" />
              {data.note}
            </p>
            <p className="mt-3 text-[0.85rem] text-ink-subtle">{data.fineprint}</p>
          </Reveal>
        </div>
        <div className="lg:col-span-6">
          <h3 className="font-sans text-lg font-semibold tracking-normal text-navy">{data.canTitle}</h3>
          <Stagger as="ul" className="mt-4 grid gap-3">
            {data.can.map((c) => (
              <StaggerItem as="li" key={c} className="flex gap-3 rounded-2xl bg-cream-50 p-4 ring-1 ring-navy/6 short:p-3">
                <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-cobalt" />
                <span className="leading-snug text-navy">{c}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Panel>
  );
}
