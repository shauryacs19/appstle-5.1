import { shot } from "./index";
import api from "@/assets/memberships/api.webp";
import billing from "@/assets/memberships/billing.webp";
import featureBenefits from "@/assets/memberships/feature-benefits.webp";
import featureGating from "@/assets/memberships/feature-gating.webp";
import featurePortal from "@/assets/memberships/feature-portal.webp";
import forms from "@/assets/memberships/forms.webp";
import perks from "@/assets/memberships/perks.webp";
import memDesigns from "@/assets/shopify/mem-designs.webp";
import memPlans from "@/assets/shopify/mem-plans.webp";
import memPortal from "@/assets/shopify/mem-portal.webp";

const P = "/media/memberships";

export const membershipsMedia = {
  heroDesktop: shot("MEM-H1", `${P}/hero/dashboard.png`, "Memberships admin dashboard home", "Appstle Memberships Create Membership Plan form with the membership name, customer tag and order tag", { standIn: memPlans, standInFit: "cover" }),
  heroMobile: shot("MEM-H2", `${P}/hero/portal-mobile.png`, "Member portal Membership Details on a phone", "Appstle member portal listing a weekly and a monthly VIP membership, both active", { frame: "mobile", standIn: featurePortal }),
  plans: shot("MEM-01", `${P}/plans/widget.png`, "Storefront tier widget and the Create Memberships Plan form", "Appstle membership widget on a VIP Membership product page with a Get Membership option billed monthly", { standIn: memDesigns }),
  pricing: shot("MEM-02", `${P}/perks/member-price.png`, "Logged-in product page: member price beside the struck-through price", "A product page showing member benefits: free shipping, a free product and a save 10% coupon", { standIn: featureBenefits }),
  perksAdmin: shot("MEM-02b", `${P}/perks/perks-admin.png`, "Membership Perks with the four member discount types", "Appstle membership perk options: limit access to members only and offer discounts to members", { standIn: perks }),
  gating: shot("MEM-03", `${P}/gating/gate.mp4`, "Product page logged out (blocked) then logged in as a member (Add to Cart)", "A restricted page asking the shopper to become a member to access it", { kind: "video", standIn: featureGating }),
  forms: shot("MEM-04", `${P}/forms/form.png`, "Membership product page with form fields above Add to Cart", "A membership checkout form collecting the member's contact information", { standIn: forms }),
  billing: shot("MEM-05", `${P}/billing/billing.png`, "Plan form billing section: frequency, trial, min/max renewals, renewal day", "Appstle Memberships list with each member's membership type, created date, next renewal date and status, plus an Export button", { standIn: billing }),
  portal: shot("MEM-06", `${P}/portal/detail-desktop.png`, "Member portal Membership Details with pause, skip, update payment, cancel and upgrade", "Appstle member portal for a customer with two weekly memberships, each with a See more details button", { standIn: memPortal }),
  retention: shot("MEM-07", `${P}/retention/cancel-flow.mp4`, "Member portal: Cancel, reason list and retention offer", "Appstle member retention flow with cancellation reasons and an offer", { kind: "video" }),
  management: shot("MEM-08", `${P}/management/list.png`, "Memberships list with statuses, tags and Export", "Appstle Memberships list with membership IDs, members, renewal dates and statuses", { standIn: billing }),
  emails: shot("MEM-09", `${P}/emails/editor.png`, "Email template editor with live preview", "Appstle Memberships email template editor with a live preview"),
  pos: shot("MEM-10", `${P}/pos/pos.png`, "Shopify POS cart with the Appstle Memberships tile and a member discount", "Shopify POS with the Appstle Memberships tile and a member discount applied", { frame: "tablet" }),
  checkoutLinks: shot("MEM-11", `${P}/acquisition/checkout-link.png`, "Quick Checkout builder with the summary and generated link", "Appstle Memberships Quick Checkout link builder"),
  automations: shot("MEM-12", `${P}/automations/bulk.png`, "Memberships list with rows selected and Bulk Automations open", "Appstle Memberships APIs: GET, POST, PUT and DELETE endpoints", { standIn: api }),
  setup: shot("MEM-14", `${P}/setup/dashboard.png`, "Dashboard home right after install", "Appstle Memberships dashboard after installation"),
};
