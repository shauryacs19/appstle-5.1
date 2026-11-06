import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { libraryGroups } from "@/data/comparison-pages/cards";
import { libraryCopy } from "@/data/comparison-pages/library";
import { summaries } from "@/data/comparison-pages/summaries";
import { routes } from "@/lib/routes";

export function LibraryAside() {
  return (
    <Reveal delay={0.12} className="rounded-4xl bg-white p-5 shadow-card ring-1 ring-navy/6 sm:p-6 short:p-5">
      <ul className="grid gap-1">
        {libraryGroups.map((g) => (
          <li key={g.id}>
            <Link href={`${routes.comparisons}#${g.anchor}`} className="flex items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-cream-100 short:py-1.5">
              <ProductIcon id={g.id} size="sm" />
              <span className="flex-1 font-semibold text-navy">{g.label}</span>
              <span className="text-sm text-ink-subtle tabular-nums">{g.cards.length} comparisons</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t border-navy/8 pt-4 short:mt-3 short:pt-3">
        <p className="eyebrow text-ink-subtle">{libraryCopy.summariesTitle}</p>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {Object.values(summaries).map((s) => (
            <li key={s.path}>
              <Link href={s.path} className="block rounded-2xl bg-cobalt-50 px-4 py-3 text-[0.92rem] leading-snug font-semibold text-navy ring-1 ring-cobalt-100 transition hover:bg-cobalt-100">
                {s.page.title} →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
