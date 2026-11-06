import { AppstleMark } from "@/components/brand/AppstleLogo";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Panel } from "@/components/ui/Panel";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { Prose } from "@/components/ui/Prose";
import { SmartLink } from "@/components/ui/SmartLink";
import { faqItemId, type FaqGroup } from "@/data/faq";
import { productById } from "@/data/products";
import { links } from "@/data/site";
import { cn } from "@/lib/cn";

export function FaqGroupPanel({ group, tone }: { group: FaqGroup; tone: "white" | "soft" }) {
  const product = group.product ? productById[group.product] : undefined;
  const related = product
    ? [
        { label: `${product.shortName} overview`, href: product.href },
        ...(product.pricingHref ? [{ label: `${product.shortName} pricing`, href: product.pricingHref }] : []),
      ]
    : [
        { label: "About Appstle", href: links.about },
        { label: "Contact us", href: links.contact },
      ];
  const titleId = `faq-${group.id}-title`;
  return (
    <Panel id={`faq-${group.id}`} labelledBy={titleId} className={cn(tone === "white" ? "bg-white ring-1 ring-navy/6" : product?.accent.soft ?? "bg-cream-100")}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          {product ? <ProductIcon id={product.id} size="lg" /> : <AppstleMark className="size-12 rounded-2xl" />}
          <h2 id={titleId} className="mt-5 text-[2rem] leading-tight font-bold text-navy sm:text-[2.3rem] short:text-[2rem]">
            {group.title}
          </h2>
          <p className="mt-2 text-ink-muted">
            {group.items.length} {group.items.length === 1 ? "question" : "questions"}
          </p>
          <ul className="mt-5 grid gap-2">
            {related.map((r) => (
              <li key={r.href}>
                <SmartLink href={r.href} className="text-sm font-semibold text-cobalt-700 hover:underline">
                  {r.label} →
                </SmartLink>
              </li>
            ))}
          </ul>
        </Reveal>
        <Accordion
          name={`faq-${group.id}`}
          className="lg:col-span-8"
          items={group.items.map((q, i) => ({
            id: faqItemId(group.id, i),
            title: q.question,
            content: q.answerHtml ? <Prose html={q.answerHtml} size="compact" /> : <p>{q.answer}</p>,
          }))}
        />
      </div>
    </Panel>
  );
}
