import type { StaticImageData } from "next/image";
import type { PagedProductId } from "@/lib/routes";
import adminControl from "@/assets/subscriptions/admin-control.webp";
import bundling from "@/assets/subscriptions/bundling.webp";
import analytics from "@/assets/subscriptions/analytics.webp";
import perks from "@/assets/memberships/perks.webp";
import forms from "@/assets/memberships/forms.webp";
import billing from "@/assets/memberships/billing.webp";
import memApi from "@/assets/memberships/api.webp";
import activityRules from "@/assets/loyalty/activity-rules.webp";
import redemptionRules from "@/assets/loyalty/redemption-rules.webp";
import loyData from "@/assets/loyalty/data.webp";
import loyIntegrations from "@/assets/loyalty/integrations.webp";
import classic from "@/assets/bundles/classic.webp";
import volume from "@/assets/bundles/volume.webp";
import bunActivity from "@/assets/bundles/activity.webp";
import bunPos from "@/assets/bundles/feature-pos.webp";

export const overviewShots: Record<PagedProductId, (StaticImageData | null)[]> = {
  subscriptions: [adminControl, bundling, null, analytics],
  memberships: [perks, forms, billing, memApi],
  loyalty: [activityRules, redemptionRules, loyData, loyIntegrations],
  bundles: [classic, volume, bunActivity, bunPos],
};
