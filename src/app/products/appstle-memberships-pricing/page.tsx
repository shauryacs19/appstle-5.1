import { PricingPage } from "@/components/sections/pricing/PricingPage";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.membershipsPricing);

export default function MembershipsPricingPage() {
  return <PricingPage id="memberships" />;
}
