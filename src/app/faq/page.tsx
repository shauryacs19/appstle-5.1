import { FaqGroupPanel } from "@/components/sections/faq/FaqGroupPanel";
import { FaqHero } from "@/components/sections/faq/FaqHero";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { faqCopy, faqPage } from "@/data/faq";
import { seo } from "@/data/seo";
import { links } from "@/data/site";
import { faqLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.faq);

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqLd(faqPage.groups.flatMap((g) => g.items))} />
      <FaqHero />
      {faqPage.groups.map((g, i) => (
        <FaqGroupPanel key={g.id} group={g} tone={i % 2 ? "white" : "soft"} />
      ))}
      <CtaBand
        title={faqCopy.ctaTitle}
        body={faqCopy.ctaBody}
        actions={
          <>
            <ButtonLink href={links.contact} variant="light" size="lg">
              Get in <strong>Touch</strong>
            </ButtonLink>
            <ButtonLink href={links.helpCenter} variant="outlineLight" size="lg">
              Help <strong>Center</strong>
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
