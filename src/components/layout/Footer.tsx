import Image from "next/image";
import Link from "next/link";
import { FooterDoodles } from "@/components/features/backdrops/PageDoodles";
import { SocialIcon } from "@/components/brand/SocialIcons";
import { footerColumns } from "@/data/navigation";
import { SmartLink } from "@/components/ui/SmartLink";
import { links } from "@/data/links";
import { socials } from "@/data/site";
import { AppstleLogo } from "@/components/brand/AppstleLogo";
import shopifyLogo from "@/assets/brand/shopify-logo.webp";
import shopifyPlus from "@/assets/brand/shopify-plus.webp";

export function Footer() {
  return (
    <footer className="pattern-dark relative isolate mt-3 bg-[linear-gradient(170deg,#172036_0%,#121A2E_45%,#0C1222_100%)] text-white" aria-labelledby="footer-title">
      <FooterDoodles />
      <h2 id="footer-title" className="sr-only">
        Site footer
      </h2>
      <div className="relative z-10 mx-auto max-w-site px-5 pt-16 pb-10 sm:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Appstle home" className="inline-block rounded-md">
              <AppstleLogo tone="light" className="[&>svg]:size-10 [&_.font-display]:text-[1.6rem] [&_.mt-1]:block!" />
            </Link>
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/70">
              Appstle℠ empowers Shopify merchants to grow and increase their sales through smart, unique, innovative apps.
              Based in Menlo Park, California, with offices in Canada and India.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex h-9 items-center rounded-lg bg-white px-3">
                <Image src={shopifyLogo} alt="Apps for Shopify" className="h-5 w-auto" sizes="100px" />
              </span>
              <span className="inline-flex h-9 items-center rounded-lg bg-white px-3">
                <Image src={shopifyPlus} alt="Apps for Shopify Plus" className="h-4 w-auto" sizes="100px" />
              </span>
            </div>
            <ul className="mt-8 flex gap-2" aria-label="Appstle on social media">
              {socials.map((s) => (
                <li key={s.label}>
                  <SmartLink
                    href={s.href}
                    aria-label={`Appstle on ${s.label}`}
                    className="grid size-10 place-items-center rounded-full bg-white/12 text-white ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-white/15 hover:text-white"
                  >
                    <SocialIcon name={s.label} className="size-4.5" />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid min-w-0 grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 xl:grid-cols-5">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="eyebrow text-white/60">{col.title}</h3>
                <ul className="mt-4 grid gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <SmartLink
                        href={l.href}
                        className="text-[0.92rem] break-words text-white/80 transition hover:text-[#FDBA74] hover:underline hover:underline-offset-4"
                      >
                        {l.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/20 pt-8 text-sm text-white/75 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Appstle℠. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <SmartLink href={links.privacy} className="hover:text-white hover:underline">
                Privacy policy
              </SmartLink>
            </li>
            <li>
              <SmartLink href={links.terms} className="hover:text-white hover:underline">
                Terms &amp; conditions
              </SmartLink>
            </li>
            <li>
              <SmartLink href={links.causes} className="hover:text-white hover:underline">
                Causes we support
              </SmartLink>
            </li>
          </ul>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-white/55">
          Ratings and review counts are from the Shopify App Store as of 22 Oct 2026; the 70,000+ merchant figure is as
          published by Appstle (Dec 2024). Interactive demos on this site use illustrative values and do not create
          orders, bookings or accounts.
        </p>
      </div>
    </footer>
  );
}
