import type { ReactNode } from "react";

export function HeroCover({ children }: { children: ReactNode }) {
  return <div className="relative aspect-[5/2] overflow-hidden rounded-[2rem] shadow-card ring-1 ring-navy/8 sm:aspect-[2/1] lg:aspect-[4/3] short:aspect-[16/11]">{children}</div>;
}
