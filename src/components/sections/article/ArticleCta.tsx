import { CtaBand } from "@/components/sections/shared/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import type { Product } from "@/data/products";
import { links } from "@/data/site";

export function ArticleCta({ product }: { product?: Product }) {
  if (!product) {
    return (
      <CtaBand
        title="Grow your store with Appstle"
        body="Subscriptions, memberships, loyalty, bundles and pickup & delivery for Shopify, with 24/7/365 support."
        actions={
          <>
            <ButtonLink href={links.contact} variant="light" size="lg">
              Contact <strong>Us</strong>
            </ButtonLink>
            <ButtonLink href={links.shopifyPartner} variant="outlineLight" size="lg">
              All apps on <strong>Shopify</strong>
            </ButtonLink>
          </>
        }
      />
    );
  }
  return (
    <CtaBand
      title={`Start growing with ${product.name}`}
      body={product.description}
      actions={
        <>
          <ButtonLink href={product.installHref} variant="light" size="lg">
            Get <strong>Started</strong>
          </ButtonLink>
          <ButtonLink href={product.pricingHref ?? product.href} variant="outlineLight" size="lg">
            {product.pricingHref ? (
              <>
                See <strong>Pricing</strong>
              </>
            ) : (
              <>
                Learn <strong>More</strong>
              </>
            )}
          </ButtonLink>
        </>
      }
    />
  );
}
