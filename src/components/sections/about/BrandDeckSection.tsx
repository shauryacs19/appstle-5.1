import { BrandDeckViewer } from "@/components/features/company/BrandDeckViewer";
import { Reveal } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BrandDeckSection({ title, decks }: { title: string; decks: string[] }) {
  return (
    <Panel id="brand-deck" labelledBy="brand-deck-title" className="bg-white ring-1 ring-navy/6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading
            id="brand-deck-title"
            eyebrow="Brand"
            title={title}
            description="Appstle’s brand presentations, published with Google Slides. They load when you open them."
            titleClassName="lg:text-[2.6rem] short:text-[2.2rem]"
          />
        </div>
        <Reveal delay={0.1} className="lg:col-span-8">
          <BrandDeckViewer decks={decks} />
        </Reveal>
      </div>
    </Panel>
  );
}
