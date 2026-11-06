import { BarList } from "@/components/features/BarList";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProductPageData } from "@/data/product-pages/types";
import type { Product } from "@/data/products";
import { links } from "@/data/site";

export function ProductMigration({ product, data, guideHref }: { product: Product; data: NonNullable<ProductPageData["migration"]>; guideHref: string }) {
  const charts = [data.sources, data.timeline].filter((c): c is NonNullable<typeof c> => !!c);
  return (
    <Panel id="migration" labelledBy="migration-title" className="bg-navy text-white on-dark">
      <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-40" />
      <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-40 -z-10 size-[30rem] rounded-full bg-cobalt/40 blur-3xl" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeading id="migration-title" eyebrow="Free migration" title={data.title} tone="light" dot="bg-coral" titleClassName="lg:text-[2.5rem]" />
          <Reveal delay={0.12}>
            <p className="mt-5 leading-relaxed text-white/80 short:mt-3 short:text-[0.95rem]">{data.body}</p>
          </Reveal>
          <Reveal delay={0.18} className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={guideHref} variant="light">
              How migration <strong>works</strong>
            </ButtonLink>
            <ButtonLink href={links.contact} variant="outlineLight">
              Contact <strong>Us</strong>
            </ButtonLink>
          </Reveal>
        </div>
        {charts.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7">
            {charts.map((c) => (
              <BarList key={c.title} title={c.title} bars={c.bars} barClass={product.id === "subscriptions" ? "bg-cobalt" : product.accent.solid} className="text-navy" />
            ))}
          </div>
        )}
      </div>
    </Panel>
  );
}
