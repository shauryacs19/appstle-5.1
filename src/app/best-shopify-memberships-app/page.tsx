import { SummaryPage } from "@/components/sections/comparison/SummaryPage";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.bestMemberships);

export default function BestMembershipsRoute() {
  return <SummaryPage product="memberships" />;
}
