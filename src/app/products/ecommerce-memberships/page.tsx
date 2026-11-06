import { ProductPage } from "@/components/sections/product/ProductPage";
import { MembershipsDemos } from "@/components/sections/memberships/MembershipsDemos";
import { MembershipsShowcase } from "@/components/sections/memberships/MembershipsShowcase";
import { membershipsPage } from "@/data/product-pages/memberships";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.memberships);

export default function MembershipsPage() {
  return <ProductPage data={membershipsPage} demos={<MembershipsDemos />} showcase={<MembershipsShowcase />} />;
}
