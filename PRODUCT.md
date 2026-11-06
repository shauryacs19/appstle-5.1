# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Shopify and Shopify Plus merchants: store owners plus growth and operations leads, from shops that are just starting to brands doing $100M+ in revenue. They come to the site to compare retention apps against alternatives, to plan a migration from a competitor, or to choose which Appstle app to install next.

## Product Purpose
appstle.com sells Appstle's suite of Shopify apps that help merchants keep and grow their customers. Success means a merchant understands which app fits their store, trusts that Appstle can run it at their scale, and goes on to install an app or book a demo.

This v5 build is a **design-only redesign proposal** for appstle.com, made to pitch and present. It will not replace the live site as it stands. Placeholders, inert external links (`EXTERNAL_LINKS` in `src/components/ui/SmartLink.tsx`) and the UI-only Appstle Bot are acceptable here.

## Positioning
Appstle offers one vendor and one support team across five retention apps that work together natively on Shopify, instead of a separate app for each job. It serves merchants of every size, from brand-new shops to $100M+ brands.

## Operating Context
- Merchants evaluate the apps in the Shopify App Store, on comparison pages (`/comparisons`, best-subscriptions and best-memberships pages), on migration guides (`/migrations/[product]`) and in case studies.
- Merchants set things up in the Shopify admin and in Appstle's own merchant portal.
- Fulfillment covers Shopify POS and multiple store locations (Pickup & Delivery).
- The site links out to the Help Center, the developer docs (APIs and webhooks), and the Shopify partner listing at apps.shopify.com/partners/appstle.

## Capabilities and Constraints
- Products and their order:
  1. **Subscriptions**: build-a-box, bundles, upsells, tiered discounts; churn-reduction offers; inventory controls, custom billing and bulk automations.
  2. **Memberships**: paid plans, tiered member perks and member billing, with analytics.
  3. **Loyalty & Rewards**: points, store credit, referrals and exclusive offers.
  4. **Bundles & Upsells**: fixed or mix-and-match bundles, plus volume and tiered discounts.
  5. **Pickup & Delivery**: store pickup, local delivery and scheduled shipping; blackout dates, prep times and cutoffs; multi-location and POS.
- Site scope: 37 routes, including home, product and pricing pages, comparisons, migrations, case studies, blog, news, ebooks, FAQ, careers, partners and legal pages. Copy lives in `src/data/` and `src/content/`.
- Terminology: "Shopify" and "Shopify Plus" (always the full names), "merchants" (not "customers" when the site means store owners), "shoppers" for the merchants' own customers.

## Brand Commitments
- The name is Appstle. Logo assets are in `src/assets/brand/`. Shopify and Shopify Plus marks are used as partner marks, not as Appstle's own.
- Voice in the current copy: short, plain, benefit-first sentences ("Give every shopper a reason to come back.").

## Evidence on Hand
Confirmed real; keep these exactly as worded:
- "70,000+ Shopify & Shopify Plus merchants." (updated by the user on 2026-10-31; was 40,000+)
- "10,000+" reviews overall across the Shopify apps (user, 2026-10-31).
- Founded in 2021, headquartered in Menlo Park, California.
- Support is available 24x7x365.

Not confirmed (treat as unverified):
- Testimonials in `src/data/testimonials.ts`, case studies in `src/content/case-studies.json`, merchant logos, and any revenue, LTV or repeat-rate figures shown in the hero or demo widgets. Do not add new quotes, customers, metrics, awards or pricing. Where the real content isn't available, use clearly marked placeholders.

## Product Principles
1. **Scale-agnostic credibility.** Every page should work both for a merchant launching their first subscription and for a Shopify Plus brand migrating from a competitor.
2. **One suite, five jobs.** Show each app clearly on its own, and make it obvious that they work together.
3. **Truth over flourish.** Use only real numbers and real proof. Mark anything unverified as a placeholder.
4. **Shopify-native.** Show the work happening where merchants already work: the Shopify admin, checkout, POS and the customer portal.
