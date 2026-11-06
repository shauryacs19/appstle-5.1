import { PricingPage } from "@/components/sections/pricing/PricingPage";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.subscriptionsPricing);

export default function SubscriptionsPricingPage() {
  return <PricingPage id="subscriptions" />;
}
