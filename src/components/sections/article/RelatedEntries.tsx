import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TextLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EntryCard, type EntryCardData } from "./EntryCard";

export function RelatedEntries({
  id = "related-entries",
  eyebrow,
  title,
  cards,
  more,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  cards: EntryCardData[];
  more?: { href: string; label: string };
}) {
  if (!cards.length) return null;
  return (
    <Panel id={id} labelledBy={`${id}-title`} bare>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} titleClassName="lg:text-[2.4rem] short:text-[2rem]" />
        {more && (
          <TextLink href={more.href} className="text-cobalt-700">
            {more.label}
          </TextLink>
        )}
      </div>
      <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 short:mt-6">
        {cards.map((c) => (
          <StaggerItem as="li" key={c.href}>
            <EntryCard card={c} />
          </StaggerItem>
        ))}
      </Stagger>
    </Panel>
  );
}
