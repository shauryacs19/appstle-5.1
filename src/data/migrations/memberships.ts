import { examplePlatforms } from "./steps";
import type { MigrationPage } from "./types";

export const membershipsMigration: MigrationPage = {
  product: "memberships",
  slug: "memberships",
  seoKey: "migrationMemberships",
  name: "Memberships",
  hero: {
    title: "Looking to migrate your store’s recurring membership plans to Appstle Memberships?",
    points: [
      "Our dedicated team has you covered. With thousands of successful migrations under its belt, our team has the tools, experience, and hands-on expertise to help you with your custom migration.",
      "Best of all, migrations to Appstle Memberships is complimentary to all our merchants, across plans, including the free plan!",
    ],
  },
  free: true,
  anywhere: {
    title: "Migrate from anywhere",
    body: "Appstle supports migrations from all V1 and V2 subscription apps in the Shopify ecosystem, as well as from other selective non-Shopify ecommerce platforms.",
  },
  platforms: examplePlatforms,
  apps: {
    title: "Example membership apps you can migrate from",
    names: ["Bold", "Conjured", "WooCommerce", "WordPress", "Wix", "Magento", "Simplee", "Square", "BigCommerce"],
  },
  stats: true,
  blocks: [
    {
      title: "Seamlessly Transition Your Membership Site with Appstle",
      body: "We understand that a successful migration of your membership site is crucial for the continuity and growth of your online community. Our expertise in the migration process ensures that your migration project is executed smoothly and efficiently.",
    },
    {
      title: "Simplifying the Membership Migration Process",
      body: "Migrating a membership site can be a daunting task, but with Appstle, you can trust that the process will be simplified for you. Our team specializes in handling every aspect of the membership site migration, making it a seamless experience for both you and your members.",
    },
    {
      title: "A Successful Migration Project",
      body: "A successful migration project requires meticulous planning and execution. At Appstle, we take a tailored approach to each migration, understanding that every membership site is unique. We work closely with you to ensure that all aspects of your site, including user data, content, and payment systems, are seamlessly moved to your new platform.",
    },
  ],
  path: {
    title: "Membership Migration Path",
    steps: [
      {
        title: "Install Appstle Memberships in your store",
        points: [
          "Install Appstle Memberships, and set up a membership plan.",
          "Optionally, upon completion, you can conduct at least 1 membership test order in your store to ensure it is working as intended.",
          "Once finished, reach out to support via email, Appstle's contact page, or through the Intercom chat to discuss migrating your membership contracts from your current platform.",
        ],
      },
      {
        title: "Obtain the necessary data files for migration",
        points: [
          "For the migration process, 2 data files will be needed - 1 with your memberships information and 1 with your customer data",
          "Membership data is obtainable from within your current membership platform. If you are having trouble locating it, check documentation your current memberships software tool or app may have regarding it, or reach out to their support. If necessary, with your permission, our team can attempt to extract the membership data that is required for the migration in your stead.",
          "Customer data is obtainable from within your payment gateway. Please ensure that the gateway you are using is Shopify-supported (ex: Stripe, Shopify Payments, Authorize.net, etc.), Without a Shopify supported payment gateway, a migration to Appstle Memberships would not be possible. For safety concerns, we CANNOT extract your customer data for you; you will have to provide that yourself.",
        ],
      },
      {
        title: "Executing the migration",
        points: [
          "We understand getting data in the right format can be challenging. But Appstle has you covered! If the provided data is not in the format we need, our Migrations Specialists will manually adjust it to meet Shopify requirements, to ensure a seamless transition.",
          "Accurate and up-to-date membership and customer data is critical for a successful migration. Our team will be in constant contact with you during this time, walking you through any necessary corrections should problems in your data arise.",
          "Depending on the challenges in data you received from your current memberships app or software tool, and the size of the data, manual correction may take some time. We request your patience and co-operation during this period. Our ultimate goal is a seamless transition of your memberships, with 0 friction or disturbance to your shoppers.",
          "We will let you know once the migration is successful!",
        ],
      },
      {
        title: "Testing before the final switch",
        points: [
          "Your migrated memberships will be present in a \"Paused\" state in our app to avoid potential double-charging from both Appstle and your previous membership platform.",
          "Once you view and confirm that the data is correct, you can cancel your previous platform, and activate your memberships in Appstle.",
          "Congratulations! The migration process is complete!",
        ],
      },
    ],
  },
  cta: {
    title: "Are you ready to take the next step in your membership site migration journey?",
    body: "Contact us today to discuss your project and discover how Appstle can help you achieve a successful transition. With our expertise and commitment to excellence, your membership site will thrive on its new platform.",
  },
};
