"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu } from "lucide-react";
import { useState } from "react";
import { AppstleLogo } from "@/components/brand/AppstleLogo";
import { ButtonLink } from "@/components/ui/Button";
import { links } from "@/data/links";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: ease.out }}
      className="sticky top-0 z-50 h-[var(--header-h)] bg-transparent px-3 pt-3 sm:px-5 lg:px-6"
    >
      {/* V2's floating rounded bar */}
      <div
        className={cn(
          "mx-auto flex h-[4.25rem] max-w-site items-center justify-between gap-4 rounded-[1.25rem] px-4 ring-1 backdrop-blur-xl transition-[background-color] duration-300 sm:px-5 lg:h-[4.75rem] lg:rounded-[1.5rem] xl:px-7",
          scrolled ? "bg-[#FBF8F3]/90 ring-line" : "bg-[#FBF8F3]/70 ring-line/80",
        )}
      >
        <Link href="/" className="shrink-0 rounded-lg" aria-label="Appstle home">
          <AppstleLogo tone="dark" tagline={false} className="gap-3 [&>svg]:size-9 [&_.font-display]:text-[1.5rem] [&_.font-display]:text-logo" />
        </Link>

        <MegaMenu />

        <div className="flex items-center gap-2">
          <ButtonLink href={links.partnerProgram} size="md" variant="primary" className="hidden sm:inline-flex">
            Become a <strong>Partner</strong>
          </ButtonLink>
          <button
            type="button"
            className={cn("inline-grid size-10 place-items-center rounded-full ring-1 transition lg:hidden", "bg-white/60 text-ink ring-line hover:bg-surface")}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu aria-hidden className="size-5" />
          </button>
        </div>
      </div>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </motion.header>
  );
}
