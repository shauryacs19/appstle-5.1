import { MembershipTierDemo } from "@/components/features/demos/MembershipTierDemo";
import { Reveal } from "@/components/motion/Reveal";
import { homeProductCopy } from "@/data/home";
import { productById } from "@/data/products";
import { slideFrom } from "@/lib/motion";
import portal from "@/assets/memberships/feature-portal.webp";
import gating from "@/assets/memberships/feature-gating.webp";
import perks from "@/assets/memberships/perks.webp";
import tiers from "@/assets/memberships/feature-tiers.webp";
import { ShowcaseCopy } from "@/components/sections/product/showcase/ShowcaseCopy";
import { ProductResources, ShowcasePanel } from "@/components/sections/product/showcase/ShowcaseParts";
import { ShowcaseStage } from "@/components/features/ShowcaseStage";

const product = productById.memberships;

export function MembershipsShowcase() {
  return (
    <ShowcasePanel id="at-a-glance" labelledBy="mem-title" className="bg-lavender-50">
      <div aria-hidden className="pointer-events-none absolute top-24 left-1/2 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-lavender-100/80 blur-3xl" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <Reveal variants={slideFrom(-50)} className="order-2 lg:order-1 lg:col-span-7">
          <ShowcaseStage
            idPrefix="mem"
            label="Appstle Memberships: demo and screens"
            activeClass="bg-lavender-700 text-white"
            items={[
              {
                id: "demo",
                label: "Try the tiers",
                kind: "demo",
                content: (
                  <div className="mx-auto max-w-md pt-1" data-guide="mem-demo">
                    <MembershipTierDemo />
                  </div>
                ),
              },
              {
                id: "tiers",
                label: "Tiers & plans",
                kind: "image",
                image: tiers,
                alt: "Appstle Memberships Bronze, Silver and Gold tiers with member perks",
                caption: "Appstle Memberships · Unlimited tiers",
                title: "Unlimited tiers & custom plans",
                body: "Offer multiple and tiered membership plans, paid or free.",
              },
              {
                id: "portal",
                label: "Member portal",
                kind: "image",
                image: portal,
                alt: "Appstle Memberships customer portal with a VIP membership card and weekly and monthly memberships marked active",
                caption: "Appstle Memberships · Member portal",
                title: "Recurring member billing",
                body: "Bill at any frequency and let members manage plans in a customizable portal.",
              },
              {
                id: "gating",
                label: "Members-only",
                kind: "image",
                image: gating,
                alt: "Members-only page message: “The page you are trying to access is restricted. Please become a member…”",
                caption: "Appstle Memberships · Gated page",
                title: "Gate what matters",
                body: "Restrict products, pages, blogs and collections to members only.",
              },
              {
                id: "perks",
                label: "Member perks",
                kind: "image",
                image: perks,
                alt: "Selecting a member perk such as limiting access or offering a discount",
                caption: "Appstle Memberships · Member perks",
                title: "Perks that convert",
                body: "Member pricing, shipping benefits, free products and early access — no third-party app needed for member discounts.",
              },
            ]}
          />
          <ProductResources product={product} className="-mr-2 mt-2 justify-end" />
        </Reveal>
        <div className="order-1 lg:order-2 lg:col-span-5">
          <ShowcaseCopy
            product={product}
            titleId="mem-title"
            title="Memberships your best customers will want to keep."
            intro={homeProductCopy.memberships.intro}
            points={homeProductCopy.memberships.points}
          />
        </div>
      </div>
    </ShowcasePanel>
  );
}
