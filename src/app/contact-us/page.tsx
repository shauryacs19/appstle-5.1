import Image from "next/image";
import { CompanyLinks } from "@/components/sections/company/CompanyLinks";
import { ContactResources } from "@/components/sections/contact/ContactResources";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { contactPage, supportEmail } from "@/data/pages/contact";
import { seo } from "@/data/seo";
import { links } from "@/data/site";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.contact);

export default function ContactPage() {
  const { hero, form, routes: contactRoutes, resources } = contactPage;
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: "Contact Us", path: routes.contact },
        ]}
        eyebrow={hero.eyebrow}
        title={<span className="block text-[2.3rem] sm:text-[3rem] lg:text-[3.3rem] short:text-[2.75rem]">{hero.title}</span>}
        actions={
          <>
            <ButtonLink href="#contact" size="lg">
              Get in <strong>touch</strong>
            </ButtonLink>
            <ButtonLink href={`mailto:${supportEmail}`} variant="secondary" size="lg">
              Email <strong>support</strong>
            </ButtonLink>
            <ButtonLink href={links.helpCenter} variant="ghost" size="lg">
              Help <strong>Center</strong>
            </ButtonLink>
          </>
        }
        aside={
          <div className="relative mx-auto max-w-md">
            <div aria-hidden className="absolute inset-x-6 top-10 bottom-0 -z-10 rounded-[3rem] bg-gradient-to-br from-cobalt-100 via-cobalt-50 to-lavender-100" />
            <Image src={hero.image.src} alt={hero.image.alt} preload sizes="(min-width: 1024px) 28rem, 80vw" className="mx-auto h-auto max-h-[calc(100svh-11rem)] w-auto" />
          </div>
        }
      />
      <ContactSection form={form} routes={contactRoutes} />
      <ContactResources items={resources} />
      <CompanyLinks current="contact" />
    </>
  );
}
