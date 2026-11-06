import { ReviewWall } from "@/components/features/ReviewWall";
import { Stars } from "@/components/ui/Badges";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProductPageData } from "@/data/product-pages/types";
import type { Product } from "@/data/products";
import { testimonials } from "@/data/testimonials";
import { formatNumber } from "@/lib/cn";

export function ProductReviews({ product, data }: { product: Product; data: NonNullable<ProductPageData["reviews"]> }) {
  const items = testimonials.filter((t) => t.product === product.id);
  if (items.length === 0) return null;
  return (
    <Panel id="reviews" labelledBy="reviews-title" className="bg-white ring-1 ring-navy/6" innerClassName="px-0 sm:px-0 lg:px-0">
      <div className="flex flex-col gap-4 px-5 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-14">
        <SectionHeading id="reviews-title" eyebrow="Reviews" title={data.title} description={data.description} dot={product.accent.solid} titleClassName="lg:text-[2.6rem]" />
        <a
          href={`${product.installHref}/reviews`}
          className="inline-flex items-center gap-2.5 self-start rounded-2xl bg-cream-50 px-4 py-3 text-sm text-ink-muted ring-1 ring-navy/8 transition hover:ring-navy/20 lg:self-auto"
        >
          <Stars value={product.rating.value} />
          <span>
            <strong className="text-navy">{product.rating.value.toFixed(1)}</strong> · {formatNumber(product.rating.count)} reviews on the Shopify App Store ({product.rating.asOf})
          </span>
        </a>
      </div>
      <div className="mt-8 short:mt-5">
        <ReviewWall items={items} />
      </div>
    </Panel>
  );
}
