import { PricingPage } from "@/components/sections/pricing/PricingPage";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.loyaltyPricing);

export default function LoyaltyPricingPage() {
  return <PricingPage id="loyalty" />;
}
