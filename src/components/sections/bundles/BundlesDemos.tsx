"use client";

import { BuyXGetYDemo } from "@/components/features/demos/BuyXGetYDemo";
import { FunnelPopupDemo } from "@/components/features/demos/FunnelPopupDemo";
import { VolumeTiersDemo } from "@/components/features/demos/VolumeTiersDemo";
import { ShowcaseStage, type StageItem } from "@/components/features/ShowcaseStage";

export function BundlesDemos() {
  const items: StageItem[] = [
    { id: "volume", label: "Quantity breaks", kind: "demo", content: <VolumeTiersDemo /> },
    { id: "bxgy", label: "Buy X Get Y", kind: "demo", content: <BuyXGetYDemo /> },
    { id: "funnel", label: "Upsell funnel", kind: "demo", content: <FunnelPopupDemo /> },
  ];
  return <ShowcaseStage items={items} idPrefix="bun-try" label="Appstle Bundles & Upsells demos" activeClass="bg-mint-700 text-white" />;
}
