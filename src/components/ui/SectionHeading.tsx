import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { cn } from "@/lib/cn";

export function Eyebrow({ children, className, dot = "bg-orange" }: { children: ReactNode; className?: string; dot?: string }) {
  return (
    <p className={cn("eyebrow inline-flex items-center gap-2 text-accent", className)}>
      <span aria-hidden className={cn("size-1.5 rounded-full", dot)} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  dot,
  id,
  titleClassName,
  descriptionClassName,
  tone = "dark",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  dot?: string;
  id?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      {eyebrow && (
        <Reveal>
          <Eyebrow dot={dot} className={cn(align === "center" && "justify-center", tone === "light" && "text-white/75")}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <h2
        id={id}
        className={cn(
          "mt-4 text-[2.15rem] leading-[1.05] font-bold sm:text-5xl lg:text-[3.4rem] short:mt-3 short:text-[2.6rem]",
          tone === "dark" ? "text-ink" : "text-white",
          titleClassName,
        )}
      >
        <SplitText delay={0.05}>{title}</SplitText>
      </h2>
      {description && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-5 text-lg leading-relaxed short:mt-3 short:text-base",
              tone === "dark" ? "text-ink-muted" : "text-white/80",
              align === "center" && "mx-auto max-w-xl",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
