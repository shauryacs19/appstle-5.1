import { companyMedia } from "@/data/media/company";
import type { MediaItem } from "@/data/media";

export type Cause = { id: string; name: string; body: string; media: MediaItem };

export const causesPage = {
  hero: {
    eyebrow: "Giving back",
    title: "Causes and Non-profits We Support",
  },
  pledge: {
    value: "1%",
    body: "Appstle℠ Solutions has partnered with, and donates 1% of its monthly profits to organizations that support children orphaned by the COVID pandemic.",
  },
  causes: [
    {
      id: "girls-who-code",
      name: "Girls Who Code",
      body: "It is no secret that the gender imbalance in the tech industry is stark. Having founded by a female co-founder, Appstle is keen on supporting organizations that work towards closing the gender employment difference in computing and technology.",
      media: companyMedia.causeGirlsWhoCode,
    },
    {
      id: "khan-academy",
      name: "Khan Academy",
      body: "Just like gender, Age, Location, and Economic status should not be a constraint in pursuing one’s dreams. Access to learning should be free for all. On that level, Appstle is dedicated to supporting organizations that democratize education.",
      media: companyMedia.causeKhanAcademy,
    },
    {
      id: "unicef-guardian-circle",
      name: "Unicef Guardian Circle",
      body: "There are several notable causes in the world. The ones that touched our hearts the most, are causes impacting the most vulnerable of our population – children. Both the founders of Appstle℠ have been UNICEF Guardian Circle members for many years. Additionally, Appstle℠ Solutions has partnered with, and donates 1% of its monthly profits to organizations that support children orphaned by the COVID pandemic.",
      media: companyMedia.causeUnicef,
    },
  ] satisfies Cause[],
};
