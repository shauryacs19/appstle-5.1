import type { StaticImageData } from "next/image";
import type { ProductId } from "./products";
import originalOrganic from "@/assets/reviews/original-organic.webp";
import motorizedCoffee from "@/assets/reviews/motorized-coffee.webp";
import bourbonBrothers from "@/assets/reviews/bourbon-brothers.webp";
import belleFemme from "@/assets/reviews/belle-femme.webp";
import loveorie from "@/assets/reviews/loveorie.webp";
import evivo from "@/assets/reviews/evivo.webp";
import north from "@/assets/reviews/north.webp";
import wickAndJane from "@/assets/reviews/wick-and-jane.webp";
import mehlora from "@/assets/reviews/mehlora.webp";
import moms from "@/assets/reviews/moms.webp";
import aluda from "@/assets/reviews/aluda.webp";
import myDiy from "@/assets/reviews/my-diy.webp";
import ox from "@/assets/reviews/ox.webp";
import elklook from "@/assets/reviews/elklook.webp";

export type Testimonial = {
  merchant: string;
  logo: StaticImageData;
  product: ProductId;
  quote: string;
  source: string;
};

const HOME = "https://appstle.com/";
const MEMBERSHIPS = "https://appstle.com/products/ecommerce-memberships/";

export const testimonials: Testimonial[] = [
  {
    merchant: "Motorized Coffee Company",
    logo: motorizedCoffee,
    product: "subscriptions",
    quote:
      "FIRST app to implement shipping profiles for subscriptions, while every other app blames Shopify about how “it can’t be done”. … Best customer service and best features of any subscription app.",
    source: HOME,
  },
  {
    merchant: "Mehlora",
    logo: mehlora,
    product: "memberships",
    quote:
      "A robust membership app that works perfectly with our business model. We couldn’t find any other membership app that had the ability to stack membership exclusive perks and discounts based on customers membership status.",
    source: MEMBERSHIPS,
  },
  {
    merchant: "Bourbon Brothers Australia",
    logo: bourbonBrothers,
    product: "subscriptions",
    quote:
      "Appstle has been fantastic. I run a very specific subscription service that has a lot of variables. Appstle caters from them all, is easy to set up and use.",
    source: HOME,
  },
  {
    merchant: "North 44 Farm",
    logo: north,
    product: "subscriptions",
    quote:
      "Great product and great team! I migrated our subscription offerings from another subscription service, the Appstle team has been incredibly helpful in this migration and their subscription product is the best one I’ve worked with.",
    source: HOME,
  },
  {
    merchant: "Belle Femme",
    logo: belleFemme,
    product: "subscriptions",
    quote: "By far the most customization flexibility of any subscription app. … I’m really happy I’ve switched to Appstle",
    source: HOME,
  },
  {
    merchant: "OX",
    logo: ox,
    product: "memberships",
    quote: "Absolutely amazing onboarding experience! They walked me through every step properly! Would definitely recommend this app",
    source: MEMBERSHIPS,
  },
  {
    merchant: "Wick & Jane",
    logo: wickAndJane,
    product: "subscriptions",
    quote:
      "I use this app for my first ever subscription service and I am blown away by how easy it is to use and how amazing their customer service is! … he even changed up the widget so it matched my theme colors!",
    source: HOME,
  },
  {
    merchant: "Evivo",
    logo: evivo,
    product: "subscriptions",
    quote:
      "Hands down one of the best apps we’ve used and one of the best customer support experiences. The app is very robust and the customer support team is amazing …",
    source: HOME,
  },
  {
    merchant: "Moms Gone Wild",
    logo: moms,
    product: "memberships",
    quote:
      "I absolutely love this app. The developers have the BEST customer service. They respond to questions and concerns patiently and within minutes. … I’m now up and running with hundreds of happy members!",
    source: MEMBERSHIPS,
  },
  {
    merchant: "The Original Organic Co.",
    logo: originalOrganic,
    product: "subscriptions",
    quote:
      "Putting the incredible customer service aside, the app itself is extremely user friendly unlike other apps available. Would highly recommend!",
    source: HOME,
  },
  {
    merchant: "My DIY Supplies",
    logo: myDiy,
    product: "memberships",
    quote:
      "Let me just say that the staff here has exceeded my expectations more than I can express. … I am a customer for life and look forward to any more apps they develop.",
    source: MEMBERSHIPS,
  },
  {
    merchant: "Loveorie",
    logo: loveorie,
    product: "subscriptions",
    quote:
      "The customer service team is the best!! They literally helped us set up everything and made it very easy! Also, they are always super helpful whenever we have questions and they provide solutions right away!",
    source: HOME,
  },
  {
    merchant: "ELKLOOK",
    logo: elklook,
    product: "memberships",
    quote:
      "I have to say that this is a very good team, their technology is very strong, and their service attitude is very good. I can responsibly say that this app can meet your needs and can also be customized to your needs, they deserve to be praised for their efforts.",
    source: MEMBERSHIPS,
  },
  {
    merchant: "Aluda Toys",
    logo: aluda,
    product: "memberships",
    quote:
      "The customer service is amazing and the app works great!! I don’t write reviews often but when I do it must mean something. … Each time they wrote back in 2 mins or less!!",
    source: MEMBERSHIPS,
  },
];

