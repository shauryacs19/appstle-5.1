import { ProductPage } from "@/components/sections/product/ProductPage";
import { LoyaltyDemos } from "@/components/sections/loyalty/LoyaltyDemos";
import { LoyaltyShowcase } from "@/components/sections/loyalty/LoyaltyShowcase";
import { loyaltyPage } from "@/data/product-pages/loyalty";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.loyalty);

export default function LoyaltyPage() {
  return <ProductPage data={loyaltyPage} demos={<LoyaltyDemos />} showcase={<LoyaltyShowcase />} />;
}
