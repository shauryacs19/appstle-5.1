import { ComparisonLibrary } from "@/components/features/comparison/ComparisonLibrary";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { PageHero } from "@/components/sections/shared/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { comparisonCount, libraryGroups } from "@/data/comparison-pages/cards";
import { comparisonCopy } from "@/data/comparison-pages/copy";
import { libraryCopy } from "@/data/comparison-pages/library";
import { seo } from "@/data/seo";
import { links } from "@/data/site";
import { collectionLd } from "@/lib/jsonld";
import { routes } from "@/lib/routes";
import { LibraryAside } from "./LibraryAside";

export function LibraryPage() {
  return (
    <>
      <JsonLd
        data={collectionLd({
          name: libraryCopy.title,
          description: seo.comparisons.description,
          path: routes.comparisons,
          items: libraryGroups.flatMap((g) => g.cards.map((c) => ({ name: `Appstle vs ${c.short}`, path: c.href }))),
        })}
      />
      <PageHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: "Comparisons", path: routes.comparisons },
        ]}
        eyebrow={libraryCopy.eyebrow}
        title={libraryCopy.title}
        intro={<p>{libraryCopy.intro}</p>}
        actions={
          <>
            <ButtonLink href="#library" size="lg" icon="none">
              Browse all <strong>{comparisonCount}</strong>&nbsp;comparisons
            </ButtonLink>
            <ButtonLink href={links.contact} variant="secondary" size="lg">
              Book a <strong>Demo</strong>
            </ButtonLink>
          </>
        }
        aside={<LibraryAside />}
      />
      <Panel id="library" labelledBy="library-title" fit="flow" className="bg-white ring-1 ring-navy/6">
        <h2 id="library-title" className="sr-only">
          All comparisons
        </h2>
        <ComparisonLibrary groups={libraryGroups} />
      </Panel>
      <CtaBand
        title={comparisonCopy.library.ctaTitle}
        body={comparisonCopy.library.ctaBody}
        actions={
          <>
            <ButtonLink href={links.contact} variant="light" size="lg">
              Contact <strong>Us</strong>
            </ButtonLink>
            <ButtonLink href={links.migrations} variant="outlineLight" size="lg">
              Free <strong>migrations</strong>
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
