import { IntegrationsGrid } from "@/components/features/integrations/IntegrationsGrid";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { integrations } from "@/data/integrations";
import { links } from "@/data/site";

export function IntegrationsByApp({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <Panel id="by-app" labelledBy="by-app-title" className="bg-white ring-1 ring-navy/6">
      <SectionHeading id="by-app-title" eyebrow={eyebrow} title={title} description={description} className="max-w-3xl" titleClassName="lg:text-[2.6rem] short:text-[2.15rem]" />
      <IntegrationsGrid items={integrations} byApp limit={8} contactHref={links.contact} className="mt-7 short:mt-5" />
    </Panel>
  );
}
