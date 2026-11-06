import { LoyaltyPointsDemo } from "@/components/features/demos/LoyaltyPointsDemo";
import { Reveal } from "@/components/motion/Reveal";
import { homeProductCopy } from "@/data/home";
import { productById } from "@/data/products";
import { slideFrom } from "@/lib/motion";
import redemption from "@/assets/loyalty/feature-redemption.webp";
import vip from "@/assets/loyalty/feature-activity.webp";
import activityRules from "@/assets/loyalty/activity-rules.webp";
import redemptionRules from "@/assets/loyalty/redemption-rules.webp";
import omnichannel from "@/assets/loyalty/feature-omnichannel.webp";
import referral from "@/assets/loyalty/crop-referral.webp";
import customers from "@/assets/loyalty/data.webp";
import { ShowcaseCopy } from "@/components/sections/product/showcase/ShowcaseCopy";
import { ProductResources, ShowcasePanel } from "@/components/sections/product/showcase/ShowcaseParts";
import { ShowcaseStage, type StageItem } from "@/components/features/ShowcaseStage";

const product = productById.loyalty;

const screens: StageItem[] = [
  { id: "redemption", label: "Redemption", kind: "image", image: redemption, alt: "Loyalty redemption screen with discount, free shipping and gift options and a personalised points message", caption: "Appstle Loyalty · Redemption options" },
  { id: "rules", label: "Activity rules", kind: "image", image: activityRules, alt: "Activity rules for birthday, store visits, purchases, social follows and reviews", caption: "Appstle Loyalty · Activity rules" },
  { id: "rewards", label: "Reward rules", kind: "image", image: redemptionRules, alt: "Create rewards: discount, collection discount, free shipping, product discount and free product", caption: "Appstle Loyalty · Reward rules" },
  { id: "vip", label: "VIP tiers", kind: "image", image: vip, alt: "VIP tiers comparison with Silver, Gold and Platinum spend thresholds", caption: "Appstle Loyalty · VIP tiers" },
  { id: "referral", label: "Referrals", kind: "image", image: referral, alt: "Referral offer: they get a $10 off coupon, you get 250 points, with a shareable link", caption: "Appstle Loyalty · Referral offer" },
  { id: "pos", label: "Shopify POS", kind: "image", image: omnichannel, alt: "Loyalty in Shopify POS with points balance and reward actions at checkout", caption: "Appstle Loyalty · Shopify POS" },
  { id: "customers", label: "Customers", kind: "image", image: customers, alt: "Admin customer list with points balances, activity history and approval actions", caption: "Appstle Loyalty · Customer points & history" },
];

export function LoyaltyShowcase() {
  return (
    <ShowcasePanel id="at-a-glance" labelledBy="loy-title" className="bg-coral-50">
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 -z-10 size-[30rem] rounded-full bg-peach/60 blur-3xl" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-5">
          <ShowcaseCopy
            product={product}
            titleId="loy-title"
            title="Give every shopper a reason to come back."
            intro={homeProductCopy.loyalty.intro}
            points={homeProductCopy.loyalty.points}
          />
        </div>
        <Reveal variants={slideFrom(50)} className="lg:col-span-7">
          <ShowcaseStage
            idPrefix="loy"
            label="Appstle Loyalty & Rewards: demo and screens"
            activeClass="bg-coral-700 text-white"
            items={[
              {
                id: "demo",
                label: "Earn & redeem",
                kind: "demo",
                content: (
                  <div data-guide="loy-demo">
                    <LoyaltyPointsDemo />
                  </div>
                ),
              },
              ...screens,
            ]}
          />
          <ProductResources product={product} className="-mr-2 mt-2 justify-end" />
        </Reveal>
      </div>
    </ShowcasePanel>
  );
}
