"use client";

import { CustomerPortalDemo } from "@/components/features/demos/CustomerPortalDemo";
import { RetentionFlowDemo } from "@/components/features/demos/RetentionFlowDemo";
import { TwoWaySmsDemo } from "@/components/features/demos/TwoWaySmsDemo";
import { ShowcaseStage, type StageItem } from "@/components/features/ShowcaseStage";

export function SubscriptionsDemos() {
  const items: StageItem[] = [
    { id: "portal", label: "Customer portal", kind: "demo", content: <CustomerPortalDemo /> },
    { id: "cancel", label: "Cancellation flow", kind: "demo", content: <RetentionFlowDemo /> },
    { id: "sms", label: "Two-way SMS", kind: "demo", content: <TwoWaySmsDemo /> },
  ];
  return <ShowcaseStage items={items} idPrefix="subs-try" label="Appstle Subscriptions demos" activeClass="bg-cobalt text-white" />;
}
