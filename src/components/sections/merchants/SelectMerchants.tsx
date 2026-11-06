import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { merchantLogos } from "@/data/merchants";
import { entryRoutes } from "@/lib/routes";

export function SelectMerchants({
  eyebrow,
  title,
  body,
  caseStudyFor,
  caseStudiesHref,
}: {
  eyebrow: string;
  title: string;
  body: string[];
  caseStudyFor: Record<string, string>;
  caseStudiesHref: string;
}) {
  return (
    <Panel id="select-merchants" labelledBy="select-merchants-title" className="bg-white ring-1 ring-navy/6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading id="select-merchants-title" eyebrow={eyebrow} title={title} titleClassName="lg:text-[2.6rem] short:text-[2.2rem]" />
          {body.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.05}>
              <p className="mt-4 leading-relaxed text-ink-muted short:mt-3 short:text-[0.93rem] short:leading-snug">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2} className="mt-6 short:mt-4">
            <ButtonLink href={caseStudiesHref} variant="secondary">
              Read case <strong>studies</strong>
            </ButtonLink>
          </Reveal>
        </div>
        <Stagger as="ul" className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:col-span-8">
          {merchantLogos.map((m) => {
            const slug = caseStudyFor[m.name];
            const tile = "group relative grid h-24 place-items-center rounded-2xl bg-cream-50 p-4 ring-1 ring-navy/6 transition duration-300 hover:bg-white hover:shadow-card short:h-20";
            const logo = <Image src={m.logo} alt={m.name} sizes="160px" className="max-h-12 w-auto object-contain mix-blend-multiply short:max-h-10" />;
            return (
              <StaggerItem as="li" key={m.name}>
                {slug ? (
                  <SmartLink href={entryRoutes.caseStudy(slug)} className={tile}>
                    {logo}
                    <span className="absolute top-2 right-2 inline-flex items-center gap-0.5 rounded-full bg-white px-2 py-0.5 text-[0.68rem] font-semibold text-cobalt-700 ring-1 ring-cobalt-200">
                      Case study
                      <ArrowUpRight aria-hidden className="size-3" />
                    </span>
                  </SmartLink>
                ) : (
                  <div className={tile}>{logo}</div>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Panel>
  );
}
