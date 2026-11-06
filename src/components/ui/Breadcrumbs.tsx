import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, type Crumb } from "@/lib/jsonld";
import { cn } from "@/lib/cn";

export function Breadcrumbs({ items, className, tone = "dark" }: { items: Crumb[]; className?: string; tone?: "dark" | "light" }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-[0.82rem]", className)}>
        <ol className={cn("flex flex-wrap items-center gap-1", tone === "dark" ? "text-ink-subtle" : "text-white/70")}>
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.path} className="inline-flex items-center gap-1">
                {last ? (
                  <span aria-current="page" className={cn("font-medium", tone === "dark" ? "text-navy" : "text-white")}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="rounded hover:underline">
                      {c.name}
                    </Link>
                    <ChevronRight aria-hidden className="size-3.5 opacity-60" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(items)} />
    </>
  );
}
