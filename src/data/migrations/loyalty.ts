import { examplePlatforms } from "./steps";
import type { MigrationPage } from "./types";

export const loyaltyMigration: MigrationPage = {
  product: "loyalty",
  slug: "loyalty-rewards",
  seoKey: "migrationLoyalty",
  name: "Loyalty & Rewards",
  hero: {
    title: "Looking to migrate your store’s loyalty program to Appstle Loyalty & Rewards?",
    points: [
      "Appstle Loyalty comes equipped with a dedicated Migrations page containing all the tools you need to migrate from all major loyalty apps.",
      "Should you require assistance, our dedicated team has you covered. With thousands of successful migrations under its belt, our team has the tools, experience, and hands-on expertise to help you with your custom migration.",
    ],
  },
  free: false,
  anywhere: {
    title: "Migrate from anywhere",
    body: "Appstle supports migrations from all V1 and V2 Loyalty, Rewards, and Referrals apps in the Shopify ecosystem, as well as from other selective non-Shopify ecommerce platforms.",
  },
  platforms: examplePlatforms,
  apps: {
    title: "Example Loyalty & Rewards apps you can migrate from",
    names: [
      "Joy",
      "Love Loyalty",
      "Growave",
      "Rivo",
      "WooCommerce",
      "WordPress",
      "Wix",
      "Magento",
      "Stamped",
      "Square",
      "BigCommerce",
      "LoyaltyLion",
      "Yotpo",
      "Rivyo",
      "Rise.ai",
      "Smile.io",
      "Loloyal",
      "Lightspeed",
      "Glow",
    ],
  },
  stats: true,
  blocks: [
    {
      title: "Elevate Your Loyalty Program with Appstle",
      body: "At Appstle, we understand the importance of a smooth transition when it comes to managing your subscriptions. Our payment method migration service is designed to make the process as effortless as possible, ensuring that your existing subscribers experience minimal disruptions.",
    },
    {
      title: "Enhancing your loyalty experience",
      body: "At Appstle, we are dedicated to enhancing your loyalty program and delivering a host of benefits that go beyond the migration process. Our expertise in loyalty program management extends to ensuring your loyalty program remains a valuable asset to your business.",
    },
    {
      title: "Support and tools for success",
      body: "We provide ongoing support for streamlined program management. Our intuitive tools and platforms empower you to effortlessly oversee your program, make data-driven decisions, and optimize member engagement. We offer features that enable personalized rewards, interactive communication, and a seamless member experience.",
    },
    {
      title: "Security you can trust",
      body: "Appstle takes data security seriously. We ensure that your loyalty program complies with industry regulations and adheres to the highest standards of data protection. Your members’ sensitive information is safeguarded, building trust and loyalty in your program.",
    },
  ],
  path: {
    title: "Loyalty, Rewards, and Referrals Migration Path",
    steps: [
      {
        title: "Install Appstle Loyalty & Rewards in your store",
        points: [
          "Install Appstle Loyalty & Rewards, and set up a loyalty and rewards plan.",
          "Optionally, upon completion, you can conduct at least 1 test order in your store to ensure it is working as intended.",
          "Once finished, reach out to support via email, Appstle's contact page, or through the Intercom chat to discuss migrating your current loyalty customers and their points from your current platform.",
        ],
      },
      {
        title: "Obtain the necessary data files for migration",
        points: [
          "This will be a .csv file of your customer data obtainable in your current loyalty app. For the apps that require them, the steps needed to obtain said data will be outlined in the individual app sections in the \"Migrations\" tab of our app.",
          "If you are also looking to migrate platforms, you must first ensure that your customer base from your current ecommerce platform is migrated over to Shopify.",
        ],
      },
      {
        title: "Executing the migration",
        points: ["Ensure that your data is in the proper format requested for your current app, then hit \"Import.\""],
      },
      {
        title: "Testing before the final switch",
        points: [
          "Once you view and confirm that the data is correct, you can cancel your previous loyalty platform, then activate Appstle Loyalty.",
          "Congratulations! The migration process is complete!",
        ],
      },
    ],
  },
  cta: {
    title: "Make the switch today",
    body: "Ready to take your loyalty program to new heights? Contact us today to discuss your project and discover how Appstle can assist you in achieving a successful transition and ongoing program excellence. With our expertise, commitment to excellence, and comprehensive solutions, your loyalty program will continue to thrive and deliver results.",
  },
};
