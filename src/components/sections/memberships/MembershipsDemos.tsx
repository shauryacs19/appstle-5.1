"use client";

import { MemberGateDemo } from "@/components/features/demos/MemberGateDemo";
import { MemberPortalDemo } from "@/components/features/demos/MemberPortalDemo";
import { ShowcaseStage, type StageItem } from "@/components/features/ShowcaseStage";

export function MembershipsDemos() {
  const items: StageItem[] = [
    { id: "access", label: "Members-only access", kind: "demo", content: <MemberGateDemo /> },
    { id: "portal", label: "Member portal", kind: "demo", content: <MemberPortalDemo /> },
  ];
  return <ShowcaseStage items={items} idPrefix="mem-try" label="Appstle Memberships demos" activeClass="bg-lavender-700 text-white" />;
}
