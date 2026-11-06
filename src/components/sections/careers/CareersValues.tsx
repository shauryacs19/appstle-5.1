import { Reveal } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { SmartLink } from "@/components/ui/SmartLink";
import { productById } from "@/data/products";
import type { careersPage } from "@/data/pages/careers";

type Data = typeof careersPage;

export function CareersValues({ values, focus }: { values: Data["values"]; focus: Data["focus"] }) {
  return (
    <Panel id="values" labelledBy="values-title" className="bg-white ring-1 ring-navy/6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        <Reveal className="rounded-4xl bg-lavender-50 p-6 ring-1 ring-navy/6 sm:p-8 lg:col-span-7 short:p-6">
          <p className="eyebrow text-ink-muted">Who we are</p>
          <h2 id="values-title" className="mt-3 text-[2.1rem] leading-tight font-bold text-navy lg:text-[2.5rem] short:text-[2.1rem]">
            {values.title}
          </h2>
          {values.body.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-ink-muted short:mt-3 short:text-[0.95rem]">
              {p}
            </p>
          ))}
          <p className="mt-6 flex items-baseline gap-3 border-t border-navy/8 pt-5 short:mt-4 short:pt-4">
            <span className="font-display text-[3rem] leading-none font-extrabold tracking-tight text-lavender-700">{values.stat.value}</span>
            <span className="text-sm leading-snug text-ink-muted">{values.stat.label}</span>
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col rounded-4xl bg-cream-50 p-6 ring-1 ring-navy/6 sm:p-8 lg:col-span-5 short:p-6">
          <p className="eyebrow text-ink-muted">What we build</p>
          <h2 className="mt-3 text-[2.1rem] leading-tight font-bold text-navy lg:text-[2.5rem] short:text-[2.1rem]">{focus.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-muted short:mt-3 short:text-[0.95rem]">{focus.body}</p>
          <ul className="mt-auto grid gap-2 pt-6 short:pt-4">
            {focus.products.map((id) => {
              const p = productById[id];
              return (
                <li key={id}>
                  <SmartLink href={p.href} className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-navy/6 transition hover:ring-navy/20">
                    <ProductIcon id={id} size="sm" />
                    <span className="font-semibold text-navy">{p.name}</span>
                  </SmartLink>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Panel>
  );
}
