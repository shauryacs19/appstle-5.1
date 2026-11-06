import { PickupPage } from "@/components/sections/pickup/PickupPage";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.pickup);

export default function PickupAndDeliveryPage() {
  return <PickupPage />;
}
