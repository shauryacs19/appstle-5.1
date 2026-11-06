import { ArrowRightLeft, Clock3, LifeBuoy, Paintbrush, Rocket, Zap } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { ButtonLink } from "@/components/ui/Button";
import { links } from "@/data/links";
import { SupportCard } from "./support/SupportCard";

const help = [
  { icon: Rocket, title: "Setup and onboarding", body: "Install, configure and go live." },
  { icon: ArrowRightLeft, title: "Migrations", body: "Move subscribers and data from another app." },
  { icon: Paintbrush, title: "Customizations", body: "Widgets and portals matched to your theme." },
  { icon: LifeBuoy, title: "Everything else", body: "Billing, integrations and troubleshooting." },
];

export function SupportSection() {
  return (
    <section id="support" aria-labelledby="support-title" className="[--accent:#1E3A8A] [--accent-tint:#E6ECF8] px-3 sm:px-5 lg:px-6">
      <div className="relative isolate mx-auto max-w-site overflow-clip rounded-[2rem] bg-[#FCF8F1] ring-1 ring-[#ECE3D4] sm:rounded-[2.5rem]">
        <div className="grid lg:grid-cols-12">
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:col-span-7 lg:py-14 lg:pr-8 lg:pl-14">
            <h2 id="support-title" className="text-[2.2rem] leading-[1.04] font-bold tracking-[-0.04em] text-ink sm:text-[3rem]">
              <SplitText>
                Real people, <span className="text-accent">around the clock.</span>
              </SplitText>
            </h2>
            <Reveal delay={0.1}>
              <dl className="mt-6 flex flex-wrap gap-2.5">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-ink py-2 pr-4 pl-3 text-sm font-semibold text-white">
                  <dt className="sr-only">Availability</dt>
                  <Clock3 aria-hidden className="size-4" />
                  <dd>Available 24x7x365</dd>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#fff] py-2 pr-4 pl-3 text-sm font-semibold text-blue-ink ring-1 ring-line">
                  <dt className="sr-only">Reply time</dt>
                  <Zap aria-hidden className="size-4 fill-orange text-orange" />
                  <dd>Replies in under 1 minute</dd>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 font-semibold text-ink">Get support with:</p>
            </Reveal>
            <Stagger as="ul" className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2" interval={0.06}>
              {help.map((h) => (
                <StaggerItem
                  as="li"
                  key={h.title}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-ice text-blue-ink">
                    <h.icon aria-hidden className="size-4" />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">{h.title}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-ink-muted">{h.body}</span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.15} className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={links.contact} size="lg">
                Contact <strong>Support</strong>
              </ButtonLink>
              <ButtonLink href={links.supportEmail} variant="ghost" size="lg" arrow={false} className="bg-[#fff] text-blue-ink ring-1 ring-line">
                Email <strong>support@appstle.com</strong>
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="px-3 pb-3 sm:px-4 sm:pb-4 lg:col-span-5 lg:py-4 lg:pl-0">
            <SupportCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
