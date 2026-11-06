import { FaqSearch, type FaqIndexItem } from "@/components/features/faq/FaqSearch";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { faqCopy, faqItemId, faqPage } from "@/data/faq";
import { links } from "@/data/site";
import { routes } from "@/lib/routes";

export function FaqHero() {
  const index: FaqIndexItem[] = faqPage.groups.flatMap((g) =>
    g.items.map((q, i) => ({ id: faqItemId(g.id, i), group: g.title, question: q.question, text: q.answer })),
  );
  return (
    <PageHero
      crumbs={[
        { name: "Home", path: routes.home },
        { name: "FAQ", path: routes.faq },
      ]}
      eyebrow={faqCopy.eyebrow}
      title={faqPage.title}
      intro={<p>{faqCopy.intro(index.length)}</p>}
      actions={
        <>
          <ButtonLink href={links.helpCenter} size="lg">
            Help <strong>Center</strong>
          </ButtonLink>
          <ButtonLink href={links.contact} variant="secondary" size="lg">
            Contact <strong>Us</strong>
          </ButtonLink>
        </>
      }
      aside={<FaqSearch items={index} groups={faqPage.groups.map((g) => ({ id: `faq-${g.id}`, title: g.title, count: g.items.length }))} />}
    />
  );
}
