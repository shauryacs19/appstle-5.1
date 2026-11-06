import { row, type ProductPricing } from "./types";

export const loyaltyPricing: ProductPricing = {
  product: "loyalty",
  title: "Loyalty & Rewards Pricing",
  tagline: "Take your e-commerce business to new heights, with the industry’s most trustable solution partners",
  finePrint: "*No hidden charges.",
  billing: "monthly",
  showTransactionFee: true,
  plans: [
    { name: "Free", monthly: "$0", note: "Plan applies up to 250 monthly orders.", cta: "trial" },
    { name: "Starter", monthly: "$10", note: "Plan applies up to 500 monthly orders.", cta: "trial" },
    { name: "Business", monthly: "$30", note: "Plan applies up to 2000 monthly orders.", cta: "trial" },
    { name: "Business Premium", monthly: "$100", note: "Plan applicable for 5000 orders in a month.", cta: "trial" },
    {
      name: "Enterprise",
      monthly: "$300",
      note: "Plan applicable for 20,000 orders in a month. No extra charges. $0.015 per extra order.",
      cta: "trial",
    },
    { name: "Enterprise Plus", monthly: "Custom", note: "Unlimited orders", cta: "contact" },
  ],
  groups: [
    {
      title: "Core Product",
      rows: [
        row("White glove migration from other Loyalty & Rewards platforms", "111111"),
        row("Dedicated 24/7 365 Live Chat Support", "111111"),
        row("Points program", "111111"),
        row("Referral program", "111111"),
        row("Loyalty Pages", "111111"),
        row("Loyalty Hyperlink", "111111"),
        row("Points on product page", "111111"),
        row("Redeem in cart drawer", "111111"),
        row("Multi-language display", "111111"),
        row("Shopify POS", "011111"),
        row("VIP program", "001111"),
        row("Points expiry", "001111"),
        row("Free product rewards", "001111"),
        row("Advanced redemption settings", "001111"),
        row("Store credits", "001111"),
        row("APIs and Webhooks", "000011"),
      ],
    },
    {
      title: "Email Notification Features",
      rows: [
        row("Unlimited Email Engagements", "111111"),
        row("Resend Emails, Admin notifications", "001111"),
        row("Klaviyo Mailing List Connect", "001111"),
        row("Custom Email Domain", "000111"),
        row("Custom Email HTML", "001111"),
      ],
    },
    { title: "Analytics", rows: [row("Performance Analytics", "111111"), row("Advanced Analytics In-depth Insights", "000111")] },
    { title: "Automation", rows: [row("Bulk Automations", "001111"), row("Shopify Flows", "111111")] },
    {
      title: "Profit Maximization Features",
      rows: [
        row("Third Party App Integrations", "111111"),
        row("Basic Branding", "111111"),
        row("Advanced Branding", "011111"),
        row("Nudges (on-site pop-ups)", "011111"),
      ],
    },
    {
      title: "Dedicated support",
      rows: [
        row("Custom Development (custom pricing)", "000111"),
        row("Dedicated Merchant Success Manager", "000111"),
        row("1:1 On-boarding Consultation", "000111"),
        row("Custom Integration with internal systems", "000111"),
      ],
    },
  ],
};
