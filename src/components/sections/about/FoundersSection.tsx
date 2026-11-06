import { Mail } from "lucide-react";
import { SocialIcon } from "@/components/brand/SocialIcons";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Founder } from "@/data/pages/about";
import { ReadMore } from "@/components/ui/ReadMore";
import { FounderPhoto } from "./FounderPhoto";

export function FoundersSection({ title, people }: { title: string; people: Founder[] }) {
  return (
    <Panel id="founders" labelledBy="founders-title" className="bg-white ring-1 ring-navy/6">
      <SectionHeading id="founders-title" eyebrow="Leadership" title={title} titleClassName="lg:text-[2.8rem] short:text-[2.3rem]" />
      <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2 short:mt-5">
        {people.map((f) => (
          <StaggerItem as="li" key={f.name}>
            <article className="flex h-full flex-col gap-5 rounded-4xl bg-white p-5 shadow-soft ring-1 ring-line sm:flex-row sm:p-6 short:gap-4 short:p-5">
              <FounderPhoto item={f.photo} name={f.name} className="w-28 shrink-0 sm:w-32 short:w-24" />
              <div className="min-w-0">
                <h3 className="text-[1.45rem] leading-tight font-bold text-navy short:text-[1.3rem]">{f.name}</h3>
                <p className="mt-1 text-[0.92rem] font-semibold text-cobalt-700">{f.role}</p>
                <p className="mt-2 flex flex-wrap gap-2">
                  <a href={`mailto:${f.email}`} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[0.82rem] font-medium text-navy ring-1 ring-navy/10 hover:ring-navy/25">
                    <Mail aria-hidden className="size-3.5 text-cobalt" />
                    {f.email}
                  </a>
                  <a
                    href={f.linkedin}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[0.82rem] font-medium text-navy ring-1 ring-navy/10 hover:ring-navy/25"
                  >
                    <SocialIcon name="LinkedIn" className="size-3.5 text-cobalt" />
                    LinkedIn<span className="sr-only"> profile of {f.name}</span>
                  </a>
                </p>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-ink-muted">{f.bio[0]}</p>
                {f.bio.length > 1 && (
                  <ReadMore className="mt-2">
                    {f.bio.slice(1).map((p) => (
                      <p key={p.slice(0, 24)} className="mt-3 text-[0.93rem] leading-relaxed text-ink-muted first:mt-0">
                        {p}
                      </p>
                    ))}
                  </ReadMore>
                )}
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Panel>
  );
}
