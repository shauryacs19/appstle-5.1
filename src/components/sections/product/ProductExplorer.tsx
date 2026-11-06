import { FeatureExplorer } from "@/components/features/FeatureExplorer";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProductPageData } from "@/data/product-pages/types";
import type { Product } from "@/data/products";

export function ProductExplorer({ product, data }: { product: Product; data: ProductPageData["explorer"] }) {
  return (
    <Panel id="features" labelledBy="features-title" className={product.accent.soft}>
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-32 -z-10 size-[34rem] rounded-full bg-white/70 blur-3xl" />
      <SectionHeading
        id="features-title"
        eyebrow={data.eyebrow}
        title={data.title}
        description={data.description}
        dot={product.accent.solid}
        className="max-w-3xl"
        titleClassName="lg:text-[2.8rem]"
      />
      <div className="mt-8 short:mt-5">
        <FeatureExplorer items={data.items} idPrefix={`${product.id}-feature`} label={`${product.name} features`} accent={product.accent} />
      </div>
    </Panel>
  );
}
