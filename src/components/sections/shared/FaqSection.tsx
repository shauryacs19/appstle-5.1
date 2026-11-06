import { Accordion } from "@/components/ui/Accordion";
import { Panel } from "@/components/ui/Panel";
import { Prose } from "@/components/ui/Prose";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqLd, type Qa } from "@/lib/jsonld";

export function FaqSection({
  id = "faq",
  title = "Frequently asked questions",
  description,
  items,
  moreHref,
}: {
  id?: string;
  title?: string;
  description?: string;
  items: Qa[];
  moreHref?: string;
}) {
  return (
    <Panel id={id} labelledBy={`${id}-title`} className="bg-white ring-1 ring-navy/6">
      <JsonLd data={faqLd(items)} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id={`${id}-title`} eyebrow="FAQ" title={title} description={description} titleClassName="lg:text-[2.6rem]" />
          {moreHref && (
            <SmartLink href={moreHref} className="mt-6 inline-flex text-sm font-semibold text-cobalt-700 hover:underline">
              All questions and answers →
            </SmartLink>
          )}
        </div>
        <Accordion
          name={id}
          defaultOpen={items.length <= 6 ? `${id}-0` : undefined}
          className="lg:col-span-8"
          items={items.map((q, i) => ({ id: `${id}-${i}`, title: q.question, content: q.answerHtml ? <Prose html={q.answerHtml} size="compact" /> : <p>{q.answer}</p> }))}
        />
      </div>
    </Panel>
  );
}
