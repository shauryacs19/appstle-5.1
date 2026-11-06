"use client";

import { Doodles, type DoodleSpot } from "./Doodles";

const footerSpots: DoodleSpot[] = [
  { name: "sparkle", className: "hidden md:block right-[3%] top-[8%] size-12 text-white/45", rotate: 10 },
  { name: "heart", className: "hidden md:block left-[38%] bottom-[22%] size-10 text-white/30", rotate: -8 },
];

export function FooterDoodles() {
  return <Doodles autoplay spots={footerSpots} className="z-0" />;
}
