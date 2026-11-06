import Image from "next/image";
import { PauseToggle } from "@/components/ui/PauseToggle";
import type { Testimonial } from "@/data/testimonials";

export function ReviewWall({ items }: { items: Testimonial[] }) {
  const half = Math.ceil(items.length / 2);
  const row = (list: Testimonial[], r: number) => (
    <div
      key={r}
      className="overflow-hidden py-2 motion-reduce:scrollbar-none motion-reduce:overflow-x-auto"
    >
      <ul
        className="flex w-max items-stretch motion-safe:animate-review-scroll"
        style={{
          ["--dur" as string]: `${list.length * 11}s`,
          animationDirection: r === 0 ? "reverse" : undefined,
          animationDelay: r === 1 ? `${-list.length * 11 * 0.37}s` : undefined,
        }}
      >
        {[...list, ...list].map((t, i) => (
          <li key={`${t.merchant}-${i}`} aria-hidden={i >= list.length || undefined} className="flex shrink-0 pr-5 sm:pr-8 lg:pr-6">
            <ReviewCard t={t} />
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div data-pausable="" className="group/wall relative" role="region" aria-label="Merchant reviews">
      <PauseToggle label="scrolling reviews" className="absolute -top-11 right-0 z-10" />
      <div className="grid gap-3 sm:gap-4">{[items.slice(0, half), items.slice(half)].map(row)}</div>
    </div>
  );
}

function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-[17rem] flex-col justify-between gap-4 rounded-[1.25rem] bg-white p-4 ring-1 ring-line transition-[translate,rotate,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-float sm:w-[21rem] sm:p-5">
      <div className="flex flex-col gap-2">
        <span className="flex gap-0.5 text-[#FEC84B]" role="img" aria-label="Rated 5 out of 5">
          {Array.from({ length: 5 }, (_, i) => (
            <svg key={i} viewBox="0 0 20 20" className="size-4" aria-hidden>
              <path
                fill="currentColor"
                d="M9.07 2.85c.3-.92 1.6-.92 1.9 0l1.36 4.18a1 1 0 0 0 .95.69h4.4c.97 0 1.37 1.24.59 1.81l-3.56 2.59a1 1 0 0 0-.36 1.12l1.36 4.18c.3.92-.76 1.69-1.54 1.12l-3.56-2.59a1 1 0 0 0-1.18 0l-3.56 2.59c-.78.57-1.84-.2-1.54-1.12l1.36-4.18a1 1 0 0 0-.36-1.12L1.73 9.53c-.78-.57-.38-1.81.59-1.81h4.4a1 1 0 0 0 .95-.69l1.4-4.18Z"
              />
            </svg>
          ))}
        </span>
        <blockquote className="line-clamp-3 font-sans text-[0.92rem] leading-[1.4rem] font-medium text-ink">
          {t.quote}
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-2.5 border-t border-[#ECE3D3] pt-3">
        <span className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-black/5">
          <Image src={t.logo} alt="" sizes="44px" className="max-h-6 w-auto max-w-7 object-contain" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[0.88rem] leading-tight font-semibold text-ink">{t.merchant}</span>
      </figcaption>
    </figure>
  );
}
