import Link from "next/link";
import type { ReactNode } from "react";
import type { Accent } from "@/data/products";
import { cn } from "@/lib/cn";

export function Chip({ children, accent, href, className }: { children: ReactNode; accent?: Accent; href?: string; className?: string }) {
  const cls = cn(
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.8rem] font-semibold text-navy ring-1 ring-navy/8",
    accent ? accent.chip : "bg-white",
    href && "transition hover:ring-navy/25",
    className,
  );
  return href ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <span className={cls}>{children}</span>
  );
}
