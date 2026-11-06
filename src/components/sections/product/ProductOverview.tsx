import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { overviewShots } from "@/data/product-shots";
import type { ProductPageData } from "@/data/product-pages/types";
import type { Product } from "@/data/products";
import type { PagedProductId } from "@/lib/routes";
import { cn } from "@/lib/cn";

const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export function ProductOverview({ product, data }: { product: Product & { id: string }; data: ProductPageData["overview"] }) {
  const shots = overviewShots[product.id as PagedProductId] ?? [];
  return (
    <Panel id="overview" labelledBy="overview-title" className="bg-white ring-1 ring-line">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <SectionHeading
          id="overview-title"
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.intro}
          dot="bg-brand"
          className="max-w-none lg:col-span-7"
          titleClassName={data.title.length > 70 ? "lg:text-[2.2rem] short:text-[1.9rem]" : "lg:text-[2.6rem] short:text-[2.2rem]"}
        />
        <Reveal delay={0.15} className="lg:col-span-5 lg:justify-self-end">
          {data.labels && (
            <ul className="flex flex-wrap gap-2 lg:justify-end" aria-label="Highlights">
              {data.labels.map((l) => (
                <li key={l} className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-ink ring-1 ring-brand/10">
                  <Check aria-hidden className="size-3.5 shrink-0 text-brand" />
                  {l}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 flex lg:justify-end">
            <ButtonLink href={product.installHref}>
              Install the <strong>app</strong>
            </ButtonLink>
          </div>
        </Reveal>
      </div>

      <Stagger as="ul" className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 short:mt-6">
        {data.cards.slice(0, 4).map((c, i) => {
          const Icon = c.icon;
          const shot = shots[i];
          return (
            <StaggerItem as="li" key={c.title} className={cn(spans[i])}>
              {shot ? (
                <figure
                  data-spotlight=""
                  className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-[linear-gradient(170deg,#FBF7F0,#E7F2FD)] ring-1 ring-[#D7E7F8] transition duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="relative h-56 overflow-hidden px-5 pt-5 sm:h-64 short:h-48">
                    <Image
                      src={shot}
                      alt=""
                      sizes="(min-width: 1024px) 40vw, 92vw"
                      className="mx-auto h-full w-auto max-w-full rounded-t-xl object-contain object-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="relative border-t border-[#D7E7F8] bg-white px-5 py-4">
                    <p className="flex items-center gap-2 font-semibold text-ink">
                      <Icon aria-hidden className="size-4 shrink-0 text-brand" />
                      {c.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm leading-snug text-ink-muted">{c.body}</p>
                  </figcaption>
                </figure>
              ) : (
                <div
                  data-spotlight="dark"
                  className="group relative isolate flex h-full min-h-[14rem] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-[linear-gradient(150deg,#1F96FB,#0A6FD1_70%,#0052A3)] p-6 text-white transition duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-float"
                >
                  <div aria-hidden className="absolute inset-0 -z-10 bg-dots opacity-30 [mask-image:linear-gradient(to_bottom,transparent,#000)]" />
                  <Icon aria-hidden className="absolute top-6 left-6 size-10 text-white/90 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-8 group-hover:scale-110" strokeWidth={1.6} />
                  <p className="text-xl font-bold">{c.title}</p>
                  <p className="mt-1.5 line-clamp-3 text-sm leading-snug text-white/80">{c.body}</p>
                </div>
              )}
            </StaggerItem>
          );
        })}
      </Stagger>
    </Panel>
  );
}
