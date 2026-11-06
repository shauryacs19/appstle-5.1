import { PricingPage } from "@/components/sections/pricing/PricingPage";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.bundlesPricing);

export default function BundlesPricingPage() {
  return <PricingPage id="bundles" />;
}
