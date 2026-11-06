import { ArrowRightLeft, CreditCard, History, Layers, ShieldCheck, Sparkles, Users, Wrench, type LucideIcon } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { migrationCopy } from "@/data/migrations/copy";
import type { MigrationPage } from "@/data/migrations/types";
import { productById } from "@/data/products";
import { cn } from "@/lib/cn";

function iconFor(title: string): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes("security")) return ShieldCheck;
  if (t.includes("payment")) return CreditCard;
  if (t.includes("legacy")) return History;
  if (t.includes("existing")) return Users;
  if (t.includes("process")) return Wrench;
  if (t.includes("support") || t.includes("tools")) return Layers;
  if (t.includes("transition") || t.includes("simplifying")) return ArrowRightLeft;
  return Sparkles;
}

export function MigrationBlocks({ m }: { m: MigrationPage }) {
  const app = productById[m.product];
  const [first, ...rest] = m.blocks;
  if (!first) return null;
  return (
    <Panel id="why-migrate" labelledBy="why-migrate-title" className={app.accent.soft}>
      <SectionHeading id="why-migrate-title" eyebrow={migrationCopy.blocksEyebrow} title={first.title} description={first.body} dot={app.accent.solid} className="max-w-3xl" titleClassName="lg:text-[2.5rem] short:text-[2.1rem]" />
      <Stagger as="ul" className={cn("mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 short:mt-5", rest.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
        {rest.map((b) => {
          const Icon = iconFor(b.title);
          return (
            <StaggerItem as="li" key={b.title}>
              <div className="flex h-full flex-col rounded-3xl bg-white p-5 ring-1 ring-navy/6 transition duration-300 hover:-translate-y-1 hover:shadow-card short:p-4">
                <span aria-hidden className={cn("grid size-10 place-items-center rounded-2xl short:size-9", app.accent.chip, app.accent.text)}>
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-sans text-[1.02rem] font-semibold tracking-normal text-navy short:mt-3">{b.title}</h3>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-muted short:text-[0.85rem] short:leading-snug">{b.body}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Panel>
  );
}
