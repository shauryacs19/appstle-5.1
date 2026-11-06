import { ContactForm } from "@/components/features/company/ContactForm";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import type { ContactRoute, contactPage } from "@/data/pages/contact";

export function ContactSection({ form, routes }: { form: (typeof contactPage)["form"]; routes: ContactRoute[] }) {
  return (
    <Panel id="contact" labelledBy="contact-title" className="bg-cobalt-50/70 ring-1 ring-navy/6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading id="contact-title" eyebrow="We’re here 24x7x365" title={form.title} titleClassName="lg:text-[2.6rem] short:text-[2.15rem]" />
          <Stagger as="ul" className="mt-7 grid gap-2.5 short:mt-5 short:gap-2">
            {routes.map((r) => {
              const Icon = r.icon;
              const external = !r.href.startsWith("/") && !r.href.startsWith("mailto:");
              return (
                <StaggerItem as="li" key={r.label}>
                  <SmartLink
                    href={r.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-3.5 rounded-2xl bg-white p-3.5 ring-1 ring-navy/6 transition hover:ring-navy/20 short:p-3"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cobalt text-white">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.78rem] font-semibold tracking-wide text-ink-subtle uppercase">
                        {r.label}
                        {r.note && <span className="ml-2 rounded-full bg-mint-100 px-1.5 py-px text-[0.68rem] text-mint-700 normal-case">{r.note}</span>}
                      </span>
                      <span className="block truncate font-semibold text-navy group-hover:underline">{r.value}</span>
                    </span>
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                  </SmartLink>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="rounded-4xl bg-white p-6 shadow-card ring-1 ring-navy/8 sm:p-8 short:p-6">
            <ContactForm to={form.to} submitLabel={form.submit} note={form.note} />
          </div>
        </Reveal>
      </div>
    </Panel>
  );
}
