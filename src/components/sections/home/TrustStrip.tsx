import Image from "next/image";
import { Marquee } from "@/components/ui/Marquee";
import { merchantLogos, pressLogos } from "@/data/merchants";
import { press, proof } from "@/data/site";
import { SmartLink } from "@/components/ui/SmartLink";

export function TrustStrip() {
  return (
    <section id="trust" aria-labelledby="trust-title" className="section-card card-paper relative">
      <div className="mx-auto grid max-w-site items-center gap-5 px-5 py-8 sm:px-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 lg:px-10 lg:py-9">
        <h2 id="trust-title" className="text-center font-sans text-[0.95rem] leading-snug font-medium tracking-normal text-ink-muted lg:text-left">
            Trusted by <strong className="font-semibold text-ink">{proof.merchants.display}</strong> Shopify &amp; Shopify Plus brands
          </h2>
        <Marquee label="Merchants using Appstle" duration={70} className="min-w-0">
          {merchantLogos.map((m) => (
            <div key={m.name} className="flex h-12 w-36 shrink-0 items-center justify-center px-5 sm:w-40">
              <Image
                src={m.logo}
                alt={m.name}
                sizes="140px"
                loading="lazy"
                className="max-h-9 w-auto object-contain transition-[scale] duration-300 hover:scale-110"
              />
            </div>
          ))}
        </Marquee>
      </div>
      <div className="border-t border-dashed border-line/90">
        <ul className="mx-auto flex max-w-site flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-4 sm:px-8" aria-label="As seen on">
          <li className="eyebrow text-ink-subtle">As seen on</li>
          {press.map((p) => (
            <li key={p.outlet}>
              <SmartLink href={p.href} aria-label={`Appstle on ${p.outlet}`} className="hit-area block rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                <Image
                  src={pressLogos[p.outlet]}
                  alt={p.outlet}
                  sizes="120px"
                  loading="lazy"
                  className="h-5 w-auto object-contain transition-[scale] duration-300 hover:scale-110"
                />
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
