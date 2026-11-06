import { HeroVisual } from "@/components/features/HeroVisual";
import type { Toast } from "@/components/features/FloatingToast";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BuiltForShopify, Stars } from "@/components/ui/Badges";
import { ButtonLink } from "@/components/ui/Button";
import { ProductIcon } from "@/components/ui/ProductIcon";
import type { MediaItem } from "@/data/media";
import type { Product } from "@/data/products";
import { links } from "@/data/site";
import { cn, formatNumber } from "@/lib/cn";
import type { Crumb } from "@/lib/jsonld";

export function ProductHero({
  product,
  crumbs,
  title,
  lead,
  points,
  visual,
}: {
  product: Product;
  crumbs: Crumb[];
  title: string;
  lead: string;
  points?: string[];
  visual: { desktop: MediaItem; mobile?: MediaItem; toasts?: Toast[]; description: string; stage: string };
}) {
  return (
    <section id="hero" aria-labelledby="page-title" data-section="hero" data-section-fit="screen" className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_60%_30%,#000_30%,transparent_75%)]" />
        <div className={cn("absolute -top-40 right-[-10%] size-[40rem] rounded-full opacity-70 blur-3xl", product.accent.soft)} />
        <div className="absolute top-[45%] left-[-12%] size-[28rem] rounded-full bg-cream-200/70 blur-3xl" />
      </div>

      <div className="mx-auto grid grid-cols-1 max-w-site items-center gap-10 px-5 pt-6 pb-section sm:px-8 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6 xl:col-span-5">
          <Breadcrumbs items={crumbs} />
          <Reveal className="mt-7 short:mt-4">
            <p className="inline-flex items-center gap-2.5 rounded-full bg-white/85 py-1 pr-3.5 pl-1 text-sm font-semibold text-navy shadow-soft ring-1 ring-navy/8">
              <ProductIcon id={product.id} size="sm" />
              {product.name}
              {product.builtForShopify && <BuiltForShopify />}
            </p>
          </Reveal>
          <h1
            id="page-title"
            className={cn(
              "mt-5 text-[2.4rem] leading-[1.03] font-extrabold tracking-[-0.035em] text-navy sm:text-[3.1rem] short:mt-3",
              title.length > 48 ? "xl:text-[3.2rem] short:text-[2.35rem]" : "xl:text-[3.75rem] short:text-[2.9rem]",
            )}
          >
            <SplitText delay={0.05}>{title}</SplitText>
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted short:mt-3 short:text-base">{lead}</p>
          </Reveal>
          {points && points.length > 0 && (
            <Reveal delay={0.13}>
              <ul className="mt-5 grid gap-2 short:mt-3 short:gap-1.5">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[0.95rem] text-navy short:text-[0.88rem]">
                    <span aria-hidden className={cn("mt-2 size-1.5 shrink-0 rounded-full", product.accent.solid)} />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          <Reveal delay={0.16} className="mt-8 flex flex-wrap items-center gap-3 short:mt-5">
            <ButtonLink href={product.installHref} size="lg">
              Install on <strong>Shopify</strong>
            </ButtonLink>
            <ButtonLink href={links.contact} variant="secondary" size="lg">
              Book a <strong>Demo</strong>
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted short:mt-4">
              <Stars value={product.rating.value} />
              <a href={`${product.installHref}/reviews`} className="font-semibold text-navy hover:underline">
                {product.rating.value.toFixed(1)} · {formatNumber(product.rating.count)} reviews
              </a>
              <span>on the Shopify App Store ({product.rating.asOf})</span>
              <span aria-hidden className="hidden h-4 w-px bg-navy/15 sm:block" />
              <span>{product.pricingNote}</span>
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-6 xl:col-span-7">
          <HeroVisual {...visual} priority />
        </div>
      </div>
    </section>
  );
}
