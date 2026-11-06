"use client";

import { useState } from "react";
import { SubscriptionWidgetDemo } from "@/components/features/demos/SubscriptionWidgetDemo";
import { Reveal } from "@/components/motion/Reveal";
import { homeProductCopy } from "@/data/home";
import { productById } from "@/data/products";
import { slideFrom } from "@/lib/motion";
import buildABox from "@/assets/subscriptions/build-a-box.webp";
import portal from "@/assets/subscriptions/customer-portal.webp";
import admin from "@/assets/subscriptions/admin-control.webp";
import analytics from "@/assets/subscriptions/analytics.webp";
import automations from "@/assets/subscriptions/automations.webp";
import { ShowcaseCopy } from "@/components/sections/product/showcase/ShowcaseCopy";
import { ProductResources, ShowcasePanel } from "@/components/sections/product/showcase/ShowcaseParts";
import { ShowcaseStage, type StageItem } from "@/components/features/ShowcaseStage";

const product = productById.subscriptions;

export function SubscriptionsShowcase() {
  const [tab, setTab] = useState("demo");

  const items: StageItem[] = [
    {
      id: "demo",
      label: "Try the widget",
      kind: "demo",
      content: (
        <div className="mx-auto max-w-sm pt-1" data-guide="subs-widget">
          <SubscriptionWidgetDemo onOpenPortal={() => setTab("portal")} />
        </div>
      ),
    },
    {
      id: "storefront",
      label: "Storefront",
      kind: "image",
      image: buildABox,
      alt: "Appstle build-a-box storefront widget with salad products and a weekly delivery selector",
      caption: "Appstle Subscriptions · Build-a-box widget",
      title: "Offers that live on the product page",
      body: "Subscribe-and-save, build-a-box and bundle offers that you can place on product, collection, cart and quick-view pages — styled to your theme.",
    },
    {
      id: "portal",
      label: "Portal",
      kind: "image",
      image: portal,
      alt: "Appstle customer portal showing two subscriptions with products and a calendar for the next order date",
      caption: "Appstle Subscriptions · Customer portal",
      title: "Self-serve subscription management",
      body: "Customers can pause, skip, swap products or reschedule from a customizable portal — with you deciding how much editing leeway they get.",
    },
    {
      id: "admin",
      label: "Admin",
      kind: "image",
      image: admin,
      alt: "Appstle subscription details view in the admin with upcoming orders, payment details and cancel options",
      caption: "Appstle Subscriptions · Subscription details",
      title: "Complete control from one dashboard",
      body: "Manage every subscription, payment and upcoming order — and run bulk automations whenever your catalogue or pricing changes.",
    },
    {
      id: "automations",
      label: "Automations",
      kind: "image",
      image: automations,
      alt: "Appstle bulk automations list",
      caption: "Appstle Subscriptions · Automations",
      title: "Automations",
      body: "Make bulk changes to your subscriptions at any time.",
    },
    {
      id: "analytics",
      label: "Analytics",
      kind: "image",
      image: analytics,
      alt: "Appstle subscription analytics with total order amount, total orders and subscriptions-per-week charts",
      caption: "Appstle Subscriptions · Analytics",
      title: "Growth-focused analytics",
      body: "Forecast upcoming orders down to the product level and dig into subscription revenue, order volume and customer lifetime value.",
    },
  ];

  return (
    <ShowcasePanel id="at-a-glance" labelledBy="subs-title" className="bg-cobalt-50">
      <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 -z-10 size-[36rem] rounded-full bg-white/70 blur-3xl" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-5">
          <ShowcaseCopy
            product={product}
            titleId="subs-title"
            title="Subscriptions built around how your customers buy."
            intro={homeProductCopy.subscriptions.intro}
            points={homeProductCopy.subscriptions.points}
          />
        </div>
        <Reveal variants={slideFrom(50)} className="lg:col-span-7">
          <ShowcaseStage items={items} idPrefix="subs" label="Appstle Subscriptions: demo and screens" value={tab} onChange={setTab} activeClass="bg-cobalt text-white" />
          <ProductResources product={product} className="-mr-2 mt-2 justify-end" />
        </Reveal>
      </div>
    </ShowcasePanel>
  );
}
