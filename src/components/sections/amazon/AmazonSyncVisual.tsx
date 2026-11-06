import { ArrowLeftRight, ShoppingBag, Store } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export function AmazonSyncVisual({ synced }: { synced: string[] }) {
  return (
    <div className="relative rounded-4xl bg-white p-6 shadow-float ring-1 ring-navy/8 sm:p-8 short:p-6">
      <div aria-hidden className="bg-dots-ink absolute inset-0 -z-10 rounded-4xl opacity-40" />
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="rounded-3xl bg-mint-50 p-4 text-center ring-1 ring-navy/6">
          <Store aria-hidden className="mx-auto size-7 text-mint-700" />
          <p className="mt-2 text-sm font-semibold text-navy">Shopify store</p>
        </div>
        <span className="grid size-11 place-items-center rounded-full bg-cobalt text-white shadow-glow">
          <ArrowLeftRight aria-hidden className="size-5 motion-safe:animate-pulse" />
        </span>
        <div className="rounded-3xl bg-peach/50 p-4 text-center ring-1 ring-navy/6">
          <ShoppingBag aria-hidden className="size-7 mx-auto text-coral-700" />
          <p className="mt-2 text-sm font-semibold text-navy">Amazon Marketplace</p>
        </div>
      </div>
      <p className="mt-6 text-center text-[0.78rem] font-semibold tracking-[0.14em] text-ink-subtle uppercase short:mt-4">Synced in real time</p>
      <Stagger as="ul" className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {synced.map((s) => (
          <StaggerItem as="li" key={s} className="flex items-center gap-2.5 rounded-2xl bg-cream-50 px-3.5 py-2.5 text-[0.9rem] font-medium text-navy ring-1 ring-navy/6 short:py-2">
            <span aria-hidden className="size-2 rounded-full bg-mint" />
            {s}
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
