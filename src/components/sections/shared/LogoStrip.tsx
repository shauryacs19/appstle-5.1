import Image from "next/image";
import { Marquee } from "@/components/ui/Marquee";
import { merchantLogos } from "@/data/merchants";

export function LogoStrip({ title, names }: { title: string; names?: string[] }) {
  const logos = names
    ? names.map((n) => merchantLogos.find((m) => m.name === n)).filter((m): m is (typeof merchantLogos)[number] => m !== undefined)
    : merchantLogos;
  return (
    <section aria-label={title} className="px-3 py-6 sm:px-5 lg:px-6">
      <div className="mx-auto max-w-site">
        <p className="text-center text-[0.95rem] font-medium text-ink-muted">{title}</p>
        <Marquee label={title} duration={55} className="mt-6">
          {logos.map((m) => (
            <div key={m.name} className="mx-7 flex h-12 items-center">
              <Image src={m.logo} alt={m.name} sizes="140px" className="h-8 w-auto max-w-[8.5rem] object-contain opacity-70 grayscale" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
