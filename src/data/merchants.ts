import type { StaticImageData } from "next/image";
import allies from "@/assets/merchants/allies.webp";
import barbell from "@/assets/merchants/barbell-brigade.webp";
import evivo from "@/assets/merchants/evivo.webp";
import inspiredgo from "@/assets/merchants/inspiredgo.webp";
import kinoo from "@/assets/merchants/kinoo.webp";
import kosmos from "@/assets/merchants/kosmos-q.webp";
import max from "@/assets/merchants/max-warehouse.webp";
import mocay from "@/assets/merchants/mocay.webp";
import pela from "@/assets/merchants/pela.webp";
import skinAuthority from "@/assets/merchants/skin-authority.webp";
import tactical from "@/assets/merchants/tactical-gear.webp";
import vedix from "@/assets/merchants/vedix.webp";
import monotype from "@/assets/merchants/monotype.webp";
import otaku from "@/assets/merchants/otaku-box.webp";
import kibbles from "@/assets/merchants/kibbles.webp";
import uaudio from "@/assets/merchants/uaudio.webp";
import forbes from "@/assets/press/forbes.webp";
import bloomberg from "@/assets/press/bloomberg.webp";
import usaToday from "@/assets/press/usa-today.webp";
import businessInsider from "@/assets/press/business-insider.webp";
import yahooFinance from "@/assets/press/yahoo-finance.webp";

export const merchantLogos: { name: string; logo: StaticImageData }[] = [
  { name: "Allies Group", logo: allies },
  { name: "Monotype", logo: monotype },
  { name: "Barbell Brigade", logo: barbell },
  { name: "Evivo", logo: evivo },
  { name: "Pela Earth", logo: pela },
  { name: "InspiredGo", logo: inspiredgo },
  { name: "Skin Authority", logo: skinAuthority },
  { name: "Kinoo", logo: kinoo },
  { name: "Vedix", logo: vedix },
  { name: "Kosmos Q", logo: kosmos },
  { name: "Max Warehouse", logo: max },
  { name: "Caffè Mocay", logo: mocay },
  { name: "Tactical Gear Junkie", logo: tactical },
  { name: "The Otaku Box", logo: otaku },
  { name: "Kibbles 'n Bits", logo: kibbles },
  { name: "Universal Audio", logo: uaudio },
];

export const pressLogos: Record<string, StaticImageData> = {
  Forbes: forbes,
  "Bloomberg Businessweek": bloomberg,
  "USA Today": usaToday,
  "Business Insider": businessInsider,
  "Yahoo Finance": yahooFinance,
};
