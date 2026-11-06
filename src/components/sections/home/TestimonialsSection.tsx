import Image from "next/image";
import { Quote } from "lucide-react";
import { ReviewWall } from "@/components/features/ReviewWall";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Stars } from "@/components/ui/Stars";
import { ButtonLink } from "@/components/ui/Button";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { links } from "@/data/links";
import { productById, products } from "@/data/products";
import { proof } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { formatNumber } from "@/lib/cn";
import { SmartLink } from "@/components/ui/SmartLink";

const featured = testimonials.find((t) => t.merchant === "Wick & Jane")!;
const rest = testimonials.filter((t) => t !== featured);

export function TestimonialsSection() {
  return (
    <section id="stories" aria-labelledby="stories-title" className="section-card [--card-bg:#FCF8F1] [--card-line:#ECE3D4] [--accent:#1D4ED8] [--accent-tint:#EAF0FE] relative py-band">
      <div className="mx-auto max-w-site px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-2xl">
            <h2 id="stories-title" className="text-[2.2rem] leading-[1.04] font-bold tracking-[-0.04em] text-ink sm:text-[3rem]">
              <SplitText>
                Loved by merchants, <span className="text-accent">in their own words.</span>
              </SplitText>
            </h2>
          </div>
          <Reveal delay={0.1} className="flex flex-wrap gap-3 lg:shrink-0 lg:flex-nowrap">
            <ButtonLink href={`${productById.subscriptions.installHref}/reviews`}>
              Read all <strong>Reviews</strong>
            </ButtonLink>
            <ButtonLink href={links.caseStudies} variant="secondary">
              Case <strong>Studies</strong>
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <figure data-spotlight="dark" className="group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-blue-ink p-7 text-white shadow-card transition-[translate,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 sm:p-9">
              <Quote aria-hidden className="absolute -top-2 right-6 size-28 text-orange/45 transition-[rotate,scale] duration-700 ease-[var(--ease-spring)] group-hover:-rotate-8 group-hover:scale-110" strokeWidth={1.4} />
              <div aria-hidden className="absolute -right-32 -bottom-40 -z-10 size-96 rounded-full bg-[radial-gradient(closest-side,rgb(42_86_216/0.45),transparent)]" />
              <div>
                <Stars className="[&_.text-ink\/15]:text-white/25" />
                <blockquote className="mt-5 font-display text-[1.45rem] leading-[1.3] font-semibold tracking-[-0.015em] sm:text-[1.75rem]">
                  “{featured.quote}”
                </blockquote>
              </div>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-full bg-white">
                  <Image src={featured.logo} alt="" sizes="48px" className="max-h-8 w-auto max-w-9 object-contain" />
                </span>
                <span>
                  <span className="block font-semibold">{featured.merchant}</span>
                  <span className="block text-sm text-white/75">{productById[featured.product].name} · review on appstle.com</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div data-spotlight="" className="flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-line transition-[translate,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-float sm:p-7">
              <div className="flex items-end gap-3">
                <span className="font-display text-[3.2rem] leading-none font-bold tracking-[-0.04em] text-ink">5.0</span>
                <div className="pb-1">
                  <Stars />
                  <p className="mt-1 text-sm text-ink-muted">
                    from <strong className="font-semibold text-ink">{proof.reviews.display}</strong> merchant reviews
                  </p>
                </div>
              </div>
              <ul className="mt-6 divide-y divide-line border-t border-line">
                {products.map((p) => (
                  <li key={p.id}>
                    <SmartLink
                      href={`${p.installHref}/reviews`}
                      className="group flex items-center gap-3 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      <ProductIcon id={p.id} size="sm" />
                      <span className="min-w-0 flex-1 truncate text-[0.92rem] font-semibold text-ink">{p.shortName}</span>
                      <span className="flex items-center gap-1.5 text-sm text-ink-muted">
                        <Stars value={p.rating.value} className="hidden sm:inline-flex [&>span]:size-3 [&_svg]:size-3" />
                        <strong className="font-semibold text-ink">{p.rating.value.toFixed(1)}</strong>
                        <span className="tabular-nums">({formatNumber(p.rating.count)})</span>
                      </span>
                    </SmartLink>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-4 text-xs text-ink-subtle">Shopify App Store ratings and review counts.</p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-8" amount={0.1}>
        <ReviewWall items={rest} />
      </Reveal>
    </section>
  );
}
