import { ProductPage } from "@/components/sections/product/ProductPage";
import { SubscriptionsDemos } from "@/components/sections/subscriptions/SubscriptionsDemos";
import { SubscriptionsShowcase } from "@/components/sections/subscriptions/SubscriptionsShowcase";
import { subscriptionsPage } from "@/data/product-pages/subscriptions";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.subscriptions);

export default function SubscriptionsPage() {
  return <ProductPage data={subscriptionsPage} demos={<SubscriptionsDemos />} showcase={<SubscriptionsShowcase />} />;
}
