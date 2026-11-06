import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import type { HomePoint } from "@/data/home";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";
import { ProductKicker, ProductLinks } from "./ShowcaseParts";

export function ShowcaseCopy({
  product,
  titleId,
  title,
  intro,
  points,
  extra,
}: {
  product: Product;
  titleId: string;
  title: ReactNode;
  intro: string;
  points: HomePoint[];
  extra?: ReactNode;
}) {
  return (
    <div>
      <Reveal>
        <ProductKicker product={product} />
      </Reveal>
      <Reveal delay={0.06}>
        <h2 id={titleId} className="mt-5 text-[2.15rem] leading-[1.04] font-bold text-navy sm:text-[2.6rem] xl:text-[2.85rem] short:mt-3.5 short:text-[2.15rem]">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-4 leading-relaxed text-ink-muted short:mt-3 short:text-[0.92rem] short:leading-normal">{intro}</p>
      </Reveal>
      <Reveal delay={0.14}>
        <ul data-guide="showcase-points" className="mt-5 grid gap-2.5 short:mt-3 short:gap-1.5">
          {points.map((p) => (
            <li key={p.text} className="flex gap-2.5 text-[0.92rem] leading-snug text-navy short:text-[0.86rem]">
              <span className={cn("mt-0.5 inline-grid size-5 shrink-0 place-items-center rounded-full", product.accent.chip)}>
                <Check aria-hidden className={cn("size-3", product.accent.text)} strokeWidth={3} />
              </span>
              <span>
                {p.label && <strong className="font-semibold">{p.label}: </strong>}
                <span className="text-ink-muted">{p.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
      {extra && <Reveal delay={0.18}>{extra}</Reveal>}
      <Reveal delay={0.2} className="mt-6 short:mt-3.5">
        <ProductLinks product={product} />
      </Reveal>
    </div>
  );
}
