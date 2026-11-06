import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { notFoundCopy as c } from "@/data/not-found";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: { absolute: "Page not found | Appstle" }, robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <section aria-labelledby="page-title" className="relative isolate overflow-hidden">
          <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_20%,#000_30%,transparent_75%)]" />
          <div className="mx-auto max-w-site px-5 pt-16 pb-section sm:px-8">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h1 id="page-title" className="mt-4 max-w-3xl text-[2.5rem] leading-[1.02] font-extrabold tracking-[-0.035em] text-navy sm:text-[3.4rem]">
              {c.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{c.body}</p>
            <ButtonLink href={routes.home} size="lg" className="mt-8">
              Back to <strong>Home</strong>
            </ButtonLink>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {c.groups.map((g) => (
                <nav key={g.title} aria-label={g.title}>
                  <p className="eyebrow text-ink-subtle">{g.title}</p>
                  <ul className="mt-3 grid gap-2">
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <SmartLink href={l.href} className="font-semibold text-cobalt-700 hover:underline">
                          {l.label}
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
