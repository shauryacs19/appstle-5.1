import type { StaticImageData } from "next/image";
import klaviyo from "@/assets/partners/klaviyo.webp";
import gorgias from "@/assets/partners/gorgias.webp";
import rebuy from "@/assets/partners/rebuy.webp";
import yotpo from "@/assets/partners/yotpo.webp";
import loox from "@/assets/partners/loox.webp";
import judgeme from "@/assets/partners/judgeme.webp";
import okendo from "@/assets/partners/okendo.webp";
import mailchimp from "@/assets/partners/mailchimp.webp";
import zapier from "@/assets/partners/zapier.webp";
import pagefly from "@/assets/partners/pagefly.webp";
import loyaltylion from "@/assets/partners/loyaltylion.webp";
import omnisend from "@/assets/partners/omnisend.webp";
import froonze from "@/assets/partners/froonze.webp";
import ecomposer from "@/assets/partners/ecomposer.webp";
import lantern from "@/assets/partners/lantern.webp";
import eber from "@/assets/partners/eber.webp";
import meta from "@/assets/partners/meta.webp";
import bundler from "@/assets/partners/bundler.webp";
import uppromote from "@/assets/partners/uppromote.webp";
import referralcandy from "@/assets/partners/referralcandy.webp";
import referrly from "@/assets/partners/referrly.webp";
import transcy from "@/assets/partners/transcy.webp";
import upcart from "@/assets/partners/upcart.webp";
import qikify from "@/assets/partners/qikify.webp";
import bogos from "@/assets/partners/bogos.webp";
import birdchime from "@/assets/partners/birdchime.webp";
import zaymo from "@/assets/partners/zaymo.webp";
import shopifyFlow from "@/assets/partners/shopify-flow.webp";

export type Partner = { name: string; logo: StaticImageData };

export const partnerRows: [Partner[], Partner[], Partner[]] = [
  [
    { name: "Klaviyo", logo: klaviyo },
    { name: "Gorgias", logo: gorgias },
    { name: "Rebuy", logo: rebuy },
    { name: "Yotpo", logo: yotpo },
    { name: "Loox", logo: loox },
    { name: "Judge.me", logo: judgeme },
    { name: "Okendo", logo: okendo },
    { name: "Mailchimp", logo: mailchimp },
    { name: "Zapier", logo: zapier },
  ],
  [
    { name: "PageFly", logo: pagefly },
    { name: "LoyaltyLion", logo: loyaltylion },
    { name: "Omnisend", logo: omnisend },
    { name: "Froonze", logo: froonze },
    { name: "EComposer", logo: ecomposer },
    { name: "Lantern", logo: lantern },
    { name: "eber", logo: eber },
    { name: "Meta", logo: meta },
    { name: "Bundler", logo: bundler },
  ],
  [
    { name: "UpPromote", logo: uppromote },
    { name: "ReferralCandy", logo: referralcandy },
    { name: "ReferrLy", logo: referrly },
    { name: "Transcy", logo: transcy },
    { name: "UpCart", logo: upcart },
    { name: "qikify", logo: qikify },
    { name: "BOGOS", logo: bogos },
    { name: "BirdChime", logo: birdchime },
    { name: "Zaymo", logo: zaymo },
    { name: "Shopify Flow", logo: shopifyFlow },
  ],
];
