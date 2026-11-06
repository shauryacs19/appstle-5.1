import { SummaryPage } from "@/components/sections/comparison/SummaryPage";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.bestSubscriptions);

export default function BestSubscriptionsRoute() {
  return <SummaryPage product="subscriptions" />;
}
