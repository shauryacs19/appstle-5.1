import { BundlesDemos } from "@/components/sections/bundles/BundlesDemos";
import { BundlesShowcase } from "@/components/sections/bundles/BundlesShowcase";
import { ProductPage } from "@/components/sections/product/ProductPage";
import { bundlesPage } from "@/data/product-pages/bundles";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.bundles);

export default function BundlesPage() {
  return <ProductPage data={bundlesPage} demos={<BundlesDemos />} showcase={<BundlesShowcase />} />;
}
