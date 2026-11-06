import Image from "next/image";
import { AppstleMark } from "@/components/brand/AppstleLogo";
import type { Partner } from "@/data/partners";
import { cn } from "@/lib/cn";

export function PartnerWall({ rows, className }: { rows: Partner[][]; className?: string }) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-3xl bg-white py-5 shadow-soft ring-1 ring-navy/8",
        className,
      )}
    >
      <p className="sr-only">App partners include {rows.flat().map((p) => p.name).join(", ")}.</p>
      <div aria-hidden className="bg-dots-ink absolute inset-0 -z-10 opacity-25" />

      <div aria-hidden className="grid gap-2.5 [mask-image:linear-gradient(90deg,transparent,#000_16%,#000_84%,transparent)]">
        {rows.map((row, r) => (
          <div key={r} className="overflow-hidden py-1">
            <ul
              className="flex w-max motion-safe:animate-partner-scroll"
              style={{
                ["--dur" as string]: `${row.length * (r === 1 ? 4.2 : 3.6)}s`,
                animationDirection: r === 1 ? "reverse" : undefined,
                animationDelay: `${-r * 2.3}s`,
              }}
            >
              {[...row, ...row, ...row].map((p, i) => (
                <li key={`${p.name}-${i}`} className="shrink-0 pr-2.5">
                  <span className="group grid h-11 min-w-[6.75rem] place-items-center rounded-xl bg-cream-50 px-4 ring-1 ring-navy/6">
                    <Image
                      src={p.logo}
                      alt=""
                      sizes="110px"
                      className="h-5 w-auto max-w-[6.5rem] object-contain opacity-60 mix-blend-multiply grayscale"
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute -inset-12 -z-10 rounded-full bg-[radial-gradient(closest-side,#fff_55%,rgb(255_255_255/0.85)_70%,rgb(255_255_255/0)_100%)]" />
        <div className="absolute -inset-3 -z-10 rounded-[1.6rem] bg-cobalt/10 motion-safe:animate-[pulse-ring_2.8s_ease-out_infinite]" />
        <div className="grid size-16 place-items-center rounded-2xl bg-white ring-1 ring-cobalt-200">
          <AppstleMark className="size-11 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
