import Image from "next/image";
import { ProductIcon } from "@/components/ui/ProductIcon";
import type { Integration } from "@/data/integrations";
import { productById } from "@/data/products";

export function IntegrationCard({ item }: { item: Integration }) {
  const works = item.listedOn.length > 0;
  return (
    <div
      tabIndex={works ? 0 : undefined}
      className="group/int relative flex h-full items-center gap-3 rounded-2xl bg-white p-2 pr-3 ring-1 ring-navy/8 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-card focus-visible:shadow-card"
    >
      <IntegrationIdentity item={item} />
      {works && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 rounded-2xl bg-navy/95 px-3 text-white opacity-0 transition-opacity duration-200 group-hover/int:opacity-100 group-focus-visible/int:opacity-100">
          <span className="text-[0.65rem] font-semibold tracking-wide text-white/70 uppercase">Works with</span>
          <span className="flex flex-wrap justify-center gap-1">
            {item.listedOn.map((p) => (
              <ProductIcon key={p} id={p} size="sm" className="size-6 rounded-md [&_svg]:size-3.5" />
            ))}
          </span>
          <span className="sr-only">{item.listedOn.map((p) => productById[p].name).join(", ")}</span>
        </span>
      )}
    </div>
  );
}

function IntegrationIdentity({ item }: { item: Integration }) {
  return (
    <>
      <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-cream-50 ring-1 ring-navy/5">
        {item.logo ? (
          <Image src={item.logo} alt="" sizes="40px" className="max-h-8 w-auto max-w-8 object-contain" />
        ) : (
          <span aria-hidden className="font-display text-sm font-bold text-navy">
            {item.name.slice(0, 2)}
          </span>
        )}
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-sm font-semibold text-navy">{item.name}</span>
        <span className="block truncate text-[0.7rem] text-ink-subtle">{item.category}</span>
      </span>
    </>
  );
}
