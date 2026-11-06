import type { MediaItem } from "./index";

const item = (id: string, src: string, width: number, height: number, label: string, alt: string): MediaItem => ({
  id,
  src,
  width,
  height,
  label,
  alt,
  kind: "image",
  status: "placeholder",
});

export const companyMedia = {
  founderRia: item("ABT-1a", "/media/about/founders/ria-mahesh.png", 960, 960, "Founder photo — Ria Mahesh", "Rakshithaa (Ria) Mahesh, Co-founder and CEO of Appstle"),
  founderHemant: item("ABT-1b", "/media/about/founders/hemant-purswani.png", 960, 960, "Founder photo — Hemant Purswani", "Hemant Purswani, Co-founder and Chief Product Officer of Appstle"),
  geoShare: item("MER-1a", "/media/merchants/charts/customer-share-geo.png", 1425, 1222, "Chart — Customer Share Across Geo (data needed)", "Chart: Appstle customer share across geographies"),
  industryShare: item("MER-1b", "/media/merchants/charts/customer-share-industry.png", 1684, 1280, "Chart — Customer Share Across Industry (data needed)", "Chart: Appstle customer share across industries"),
  causeGirlsWhoCode: item("CAU-1a", "/media/causes/girls-who-code.png", 1024, 574, "Girls Who Code image", "Girls Who Code"),
  causeKhanAcademy: item("CAU-1b", "/media/causes/khan-academy.png", 1024, 588, "Khan Academy image", "Khan Academy"),
  causeUnicef: item("CAU-1c", "/media/causes/unicef-guardian-circle.png", 1024, 601, "UNICEF Guardian Circle image", "UNICEF Guardian Circle"),
} satisfies Record<string, MediaItem>;
