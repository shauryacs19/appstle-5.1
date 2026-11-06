import { HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export function CausesPledge({ value, body, names }: { value: string; body: string; names: string[] }) {
  return (
    <Reveal className="relative">
      <div aria-hidden className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-coral-100/70 via-blush-100/60 to-lavender-100/60 blur-2xl" />
      <div className="rounded-4xl bg-white p-6 shadow-float ring-1 ring-navy/8 sm:p-8 short:p-6">
        <span className="grid size-12 place-items-center rounded-2xl bg-coral text-navy">
          <HeartHandshake aria-hidden className="size-6" />
        </span>
        <p className="mt-5 font-display text-[4rem] leading-none font-extrabold tracking-tight text-navy short:mt-4 short:text-[3.3rem]">{value}</p>
        <p className="mt-3 text-[1.02rem] leading-relaxed text-ink-muted short:text-[0.95rem]">{body}</p>
        <ul className="mt-6 flex flex-wrap gap-2 border-t border-navy/8 pt-5 short:mt-4 short:pt-4" aria-label="Organizations we support">
          {names.map((n) => (
            <li key={n}>
              <a href={`#${n.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="inline-flex rounded-full bg-cream-100 px-3 py-1.5 text-sm font-semibold text-navy ring-1 ring-navy/6 hover:bg-cream-200">
                {n}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
