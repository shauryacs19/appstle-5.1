import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

function windowed(page: number, pages: number) {
  const set = new Set([1, pages, page - 1, page, page + 1].filter((n) => n >= 1 && n <= pages));
  const list = [...set].sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  list.forEach((n, i) => {
    if (i > 0 && n - list[i - 1] > 1) out.push("gap");
    out.push(n);
  });
  return out;
}

export function Pagination({ page, pages, hrefs, label = "Pagination" }: { page: number; pages: number; hrefs: string[]; label?: string }) {
  if (pages <= 1) return null;
  const href = (n: number) => hrefs[n - 1];
  const step = "inline-flex h-10 items-center gap-1 rounded-full px-4 text-sm font-semibold transition";
  return (
    <nav aria-label={label} className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" className={cn(step, "bg-white text-navy ring-1 ring-navy/10 hover:ring-navy/25")}>
          <ChevronLeft aria-hidden className="size-4" /> Previous
        </Link>
      ) : (
        <span aria-hidden className={cn(step, "text-navy/30")}>
          <ChevronLeft className="size-4" /> Previous
        </span>
      )}
      <ol className="flex flex-wrap items-center gap-1.5">
        {windowed(page, pages).map((n, i) =>
          n === "gap" ? (
            <li key={`gap-${i}`} aria-hidden className="px-1 text-ink-subtle">
              …
            </li>
          ) : (
            <li key={n}>
              <Link
                href={href(n)}
                aria-current={n === page ? "page" : undefined}
                aria-label={`Page ${n}`}
                className={cn(
                  "grid size-10 place-items-center rounded-full text-sm font-semibold tabular-nums transition",
                  n === page ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-navy/10 hover:ring-navy/25",
                )}
              >
                {n}
              </Link>
            </li>
          ),
        )}
      </ol>
      {page < pages ? (
        <Link href={href(page + 1)} rel="next" className={cn(step, "bg-white text-navy ring-1 ring-navy/10 hover:ring-navy/25")}>
          Next <ChevronRight aria-hidden className="size-4" />
        </Link>
      ) : (
        <span aria-hidden className={cn(step, "text-navy/30")}>
          Next <ChevronRight className="size-4" />
        </span>
      )}
    </nav>
  );
}
