import Link from "next/link";
import type { ComponentProps } from "react";

const EXTERNAL_LINKS = false;
const isExternal = (href: string) => /^(https?:)?\/\//i.test(href);

export function SmartLink({ href, ...props }: Omit<ComponentProps<"a">, "href"> & { href: string }) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  if (isExternal(href) && !EXTERNAL_LINKS) return <a {...props} aria-disabled="true" />;
  return <a href={href} {...props} />;
}
