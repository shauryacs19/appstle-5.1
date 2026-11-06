import { shot } from "./index";
import adminControl from "@/assets/subscriptions/admin-control.webp";
import analytics from "@/assets/subscriptions/analytics.webp";
import automations from "@/assets/subscriptions/automations.webp";
import buildABox from "@/assets/subscriptions/build-a-box.webp";
import bundling from "@/assets/subscriptions/bundling.webp";
import customerPortal from "@/assets/subscriptions/customer-portal.webp";
import featureLoyalty from "@/assets/subscriptions/feature-loyalty.webp";
import apis from "@/assets/subscriptions/apis.webp";
import subTypes from "@/assets/shopify/sub-types.webp";
import subManagement from "@/assets/shopify/sub-management.webp";

const P = "/media/subscriptions";

export const subscriptionsMedia = {
  heroDesktop: shot("SUB-H1", `${P}/hero/dashboard.png`, "Subscriptions admin dashboard with demo data", "Appstle Subscriptions admin showing a subscription's upcoming orders, payment details and cancel options", { standIn: adminControl, standInFit: "cover" }),
  heroMobile: shot("SUB-H2", `${P}/hero/widget-mobile.png`, "Product page purchase widget, Subscribe & save selected", "Appstle purchase options widget with Subscribe and save selected and subscriber rewards", { frame: "mobile", standIn: featureLoyalty }),
  plans: shot("SUB-01", `${P}/plans/create-plan.png`, "Create Plan: plan-type selector with frequency and discount filled", "Appstle subscription types: subscribe and save with a delivery frequency, and prepaid packs of 2, 3 or 4 months", { standIn: subTypes }),
  widget: shot("SUB-02", `${P}/widget/widget-desktop.png`, "Product page widget expanded with frequency and savings badge", "Appstle purchase options widget offering one-time purchase or subscribe and save 5% with a delivery frequency selector", { standIn: bundling }),
  buildABox: shot("SUB-03", `${P}/build-a-box/build.mp4`, "Build-a-box page mid-selection with tier progress and running total", "Appstle build-a-box with salads to choose and a weekly delivery selector", { kind: "video", standIn: buildABox }),
  portal: shot("SUB-04", `${P}/portal/detail-desktop.png`, "Customer portal subscription detail with Skip, Pause, Swap and Reschedule", "Appstle customer portal listing two subscriptions with their products and a calendar to change the next order date", { standIn: customerPortal }),
  management: shot("SUB-05", `${P}/management/contract.png`, "Contract detail: products, next order date, edit, skip and swap", "Appstle subscription management in the Appstle merchant portal and the Shopify admin", { standIn: subManagement }),
  automations: shot("SUB-06", `${P}/automations/bulk.png`, "Automation screen with the action dropdown open", "Appstle bulk automations list: update status, next billing date, delivery price and more", { standIn: automations }),
  retention: shot("SUB-07", `${P}/retention/cancel-flow.mp4`, "Portal cancel flow: reason, retention offer, You're all set", "Appstle cancellation flow with a reason picker and a retention offer", { kind: "video", frame: "mobile" }),
  dunning: shot("SUB-08", `${P}/dunning/strategy.png`, "Failed Payment Recovery: Strategy timeline and recovery metrics", "Appstle failed payment recovery schedule and recovery performance metrics"),
  growth: shot("SUB-09", `${P}/growth/rewards.png`, "Campaign banner offer and the Subscription Rewards ladder", "Appstle purchase options with subscriber rewards: a free product after the 3rd order and 30% off after the 6th", { standIn: featureLoyalty }),
  analytics: shot("SUB-11", `${P}/analytics/revenue.png`, "Analytics Revenue tab: historical vs estimated revenue", "Appstle subscription analytics with total order amount, total orders and subscriptions per week", { standIn: analytics }),
  apis: shot("SUB-12", `${P}/integrations/grid.png`, "App Integrations grid with connect states", "Appstle bundling APIs next to a build-a-box storefront", { standIn: apis }),
};
