"use client";

import { LoyaltyCartRedeemDemo } from "@/components/features/demos/LoyaltyCartRedeemDemo";
import { ReferralDemo } from "@/components/features/demos/ReferralDemo";
import { VipTierDemo } from "@/components/features/demos/VipTierDemo";
import { ShowcaseStage, type StageItem } from "@/components/features/ShowcaseStage";

export function LoyaltyDemos() {
  const items: StageItem[] = [
    { id: "cart", label: "Cart redemption", kind: "demo", content: <LoyaltyCartRedeemDemo /> },
    { id: "vip", label: "VIP tiers", kind: "demo", content: <VipTierDemo /> },
    { id: "referral", label: "Refer a friend", kind: "demo", content: <ReferralDemo /> },
  ];
  return <ShowcaseStage items={items} idPrefix="loy-try" label="Appstle Loyalty & Rewards demos" activeClass="bg-coral-700 text-white" />;
}
