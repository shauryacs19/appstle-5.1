import { ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { companyLinks, type CompanyPageId } from "@/data/pages/company";

export function CompanyLinks({ current, exclude = [] }: { current: CompanyPageId; exclude?: CompanyPageId[] }) {
  const items = companyLinks.filter((l) => l.id !== current && !exclude.includes(l.id)).slice(0, 6);
  return (
    <Panel id="more" labelledBy="more-title" bare>
      <SectionHeading id="more-title" eyebrow="Appstle" title="More from Appstle" titleClassName="lg:text-[2.4rem] short:text-[2.1rem]" />
      <Stagger as="ul" className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 short:mt-5">
        {items.map((l) => {
          const Icon = l.icon;
          return (
            <StaggerItem as="li" key={l.id}>
              <div className="group relative flex h-full items-start gap-4 rounded-3xl bg-white p-5 ring-1 ring-navy/8 transition duration-300 hover:-translate-y-1 hover:shadow-card short:p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-cobalt-50 text-cobalt-700">
                  <Icon aria-hidden className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-sans text-[1.02rem] font-semibold tracking-normal text-navy">
                    <SmartLink href={l.href} className="after:absolute after:inset-0 after:rounded-3xl">
                      {l.label}
                    </SmartLink>
                  </h3>
                  <p className="mt-1 text-[0.9rem] leading-snug text-ink-muted">{l.description}</p>
                </div>
                <ArrowUpRight aria-hidden className="size-4 shrink-0 text-navy/30" />
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Panel>
  );
}
