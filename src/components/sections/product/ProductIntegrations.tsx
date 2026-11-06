import { IntegrationsGrid } from "@/components/features/integrations/IntegrationsGrid";
import { Reveal } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { integrationsFor } from "@/data/integrations";
import type { ProductPageData } from "@/data/product-pages/types";
import type { Product } from "@/data/products";
import { links } from "@/data/site";

export function ProductIntegrations({ product, data }: { product: Product; data: ProductPageData["integrations"] }) {
  return (
    <Panel id="integrations" labelledBy="integrations-title" bare>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading id="integrations-title" eyebrow="Integrations" title={data.title} description={data.description} dot={product.accent.solid} titleClassName="lg:text-[2.6rem]" />
          {data.note && (
            <Reveal delay={0.15}>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-muted">{data.note}</p>
            </Reveal>
          )}
        </div>
        <Reveal delay={0.1} className="lg:col-span-8">
          <IntegrationsGrid items={integrationsFor(product.id)} limit={12} moreHref={links.appPartners} contactHref={links.contact} />
        </Reveal>
      </div>
    </Panel>
  );
}
