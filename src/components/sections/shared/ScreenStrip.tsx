import Image, { type StaticImageData } from "next/image";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Screen = { image: StaticImageData; caption: string };

export function ScreenStrip({ id, eyebrow, title, screens }: { id: string; eyebrow?: string; title: string; screens: Screen[] }) {
  return (
    <Panel id={id} labelledBy={`${id}-title`} className="bg-[linear-gradient(180deg,#F3F9FF,#FFFFFF)] ring-1 ring-line">
      <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} dot="bg-brand" titleClassName="lg:text-[2.4rem]" />
      <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {screens.map((s) => (
          <StaggerItem as="li" key={s.caption}>
            <figure data-spotlight="" className="group h-full overflow-hidden rounded-[1.5rem] bg-white shadow-soft ring-1 ring-[#D7E7F8] transition duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-card">
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-50">
                <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 30vw, 92vw" className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
              </div>
              <figcaption className="px-5 py-4 font-semibold text-ink">{s.caption}</figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </Panel>
  );
}
