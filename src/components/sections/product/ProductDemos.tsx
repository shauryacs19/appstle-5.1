import type { ReactNode } from "react";
import { FlaskConical } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProductPageData } from "@/data/product-pages/types";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";
import { slideFrom } from "@/lib/motion";

export function ProductDemos({ product, data, children }: { product: Product; data: ProductPageData["demos"]; children: ReactNode }) {
  return (
    <Panel id="try-it" labelledBy="try-it-title" className="bg-cream-100 ring-1 ring-navy/6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading
            id="try-it-title"
            eyebrow={data.eyebrow}
            title={data.title}
            description={data.description}
            dot={product.accent.solid}
            titleClassName="lg:text-[2.6rem]"
          />
          <Reveal delay={0.15}>
            <ul className="mt-6 grid gap-2.5">
              {data.tryList.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[0.95rem] text-navy">
                  <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", product.accent.chip, product.accent.text)}>
                    <FlaskConical aria-hidden className="size-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal variants={slideFrom(50)} className="lg:col-span-8">
          {children}
        </Reveal>
      </div>
    </Panel>
  );
}
