import { PartnerDirectory } from "@/components/features/company/PartnerDirectory";
import { Reveal } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { appPartners, partnerCategories } from "@/data/pages/app-partners";

export function PartnerDirectorySection({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <Panel id="partners" labelledBy="partners-title" className="bg-cream-100/70 ring-1 ring-navy/6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end lg:gap-10">
        <SectionHeading id="partners-title" eyebrow={eyebrow} title={title} className="lg:col-span-6" titleClassName="lg:text-[2.6rem] short:text-[2.15rem]" />
        <Reveal delay={0.1} className="lg:col-span-6">
          <p className="leading-relaxed text-ink-muted short:text-[0.93rem] short:leading-snug">{description}</p>
        </Reveal>
      </div>
      <div className="mt-7 short:mt-5">
        <PartnerDirectory partners={appPartners} categories={partnerCategories} />
      </div>
    </Panel>
  );
}
