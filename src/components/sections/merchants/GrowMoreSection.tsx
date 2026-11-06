import Image, { type StaticImageData } from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { productById, type ProductId } from "@/data/products";
import { links } from "@/data/site";
import { cn } from "@/lib/cn";

export function GrowMoreSection({
  title,
  intro,
  image,
  apps,
}: {
  title: string;
  intro: string;
  image: { src: StaticImageData; alt: string };
  apps: { id: ProductId; label: string; installHref: string; productHref: string }[];
}) {
  return (
    <Panel id="grow" labelledBy="grow-title" className="bg-white ring-1 ring-navy/6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <Reveal className="hidden lg:col-span-5 lg:block">
          <Image src={image.src} alt={image.alt} sizes="(min-width: 1024px) 36vw, 100vw" className="h-auto max-h-[calc(100svh-12rem)] w-full rounded-4xl object-cover shadow-card" />
        </Reveal>
        <div className="lg:col-span-7">
          <SectionHeading id="grow-title" eyebrow="Get started" title={title} description={intro} titleClassName="lg:text-[2.7rem] short:text-[2.2rem]" />
          <Stagger as="ul" className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 short:mt-5">
            {apps.map((a) => {
              const p = productById[a.id];
              return (
                <StaggerItem as="li" key={a.id}>
                  <div className={cn("flex h-full items-center gap-4 rounded-3xl p-4 ring-1 ring-navy/6", p.accent.soft)}>
                    <ProductIcon id={a.id} size="lg" />
                    <div className="min-w-0">
                      <a href={a.installHref} className="font-semibold text-navy hover:underline">
                        {a.label}
                      </a>
                      <SmartLink href={a.productHref} className={cn("mt-0.5 block text-sm font-semibold hover:underline", p.accent.text)}>
                        About {p.shortName}
                      </SmartLink>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          <Reveal delay={0.2} className="mt-6 short:mt-4">
            <ButtonLink href={links.contact}>
              Talk to our <strong>experts</strong>
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </Panel>
  );
}
