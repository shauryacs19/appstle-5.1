import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export function OutletWall({ outlets }: { outlets: string[] }) {
  return (
    <div className="rounded-[2rem] bg-white/80 p-6 shadow-card ring-1 ring-navy/8 backdrop-blur sm:p-8 short:p-6">
      <p className="eyebrow text-ink-subtle">As featured in</p>
      <Stagger as="ul" className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 short:mt-4 short:gap-y-3">
        {outlets.map((o) => (
          <StaggerItem as="li" key={o} className="border-b border-navy/8 pb-3 font-display text-[1.45rem] leading-tight font-extrabold tracking-tight text-navy short:pb-2 short:text-[1.25rem]">
            {o}
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
