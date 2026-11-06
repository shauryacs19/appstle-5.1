import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Media } from "@/components/ui/Media";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { MediaItem } from "@/data/media";

export function MerchantCharts({ charts }: { charts: { title: string; media: MediaItem }[] }) {
  return (
    <Panel id="merchant-mix" labelledBy="merchant-mix-title" className="bg-lavender-50 ring-1 ring-navy/6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <SectionHeading
          id="merchant-mix-title"
          eyebrow="Merchant mix"
          title="Customer share across geo and industry"
          dot="bg-lavender"
          className="lg:col-span-4"
          titleClassName="lg:text-[2.5rem] short:text-[2.1rem]"
        />
        <Stagger as="ul" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
          {charts.map((c) => (
            <StaggerItem as="li" key={c.title}>
              <figure className="h-full rounded-4xl bg-white p-4 shadow-soft ring-1 ring-navy/6 sm:p-5">
                <Media item={c.media} sizes="(min-width: 1024px) 30vw, 100vw" />
                <figcaption className="mt-3 text-center font-display text-lg font-bold text-navy">{c.title}</figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Panel>
  );
}
