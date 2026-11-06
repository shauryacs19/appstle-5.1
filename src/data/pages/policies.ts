import { livePages } from "@/data/content/pages";
import { routes } from "@/lib/routes";

export type PolicyId = "privacy" | "terms";

const TERMLY_ID = "31039438-aaf2-4fda-bfea-6426a83e9fb7";

export const termly = {
  id: TERMLY_ID,
  script: "https://app.termly.io/embed-policy.min.js",
  hostedUrl: `https://app.termly.io/policy-viewer/policy.html?policyUUID=${TERMLY_ID}`,
};

export const policies: Record<PolicyId, { title: string; path: string; label: string; intro: string }> = {
  privacy: {
    title: "Privacy Policy",
    label: "Privacy Policy",
    path: routes.privacy,
    intro: "How Appstle Inc. collects, uses and protects your personal information. Our policy is maintained with Termly and kept up to date there.",
  },
  terms: {
    title: "Terms and Conditions",
    label: "Terms & Conditions",
    path: routes.terms,
    intro: "These Terms of Service are a legally binding contract between you and Appstle regarding your use of the Service.",
  },
};

export const termsHtml = livePages.terms.html
  .replace(/^\s*<h2>[^<]*<\/h2>/, "")
  .replace(/<(\/?)h3\b/g, "<$1h2")
  .replace("INSTLLATION", "INSTALLATION")
  .replace("(though Shopify", "(through Shopify");
