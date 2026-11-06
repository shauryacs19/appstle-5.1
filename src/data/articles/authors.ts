export type Author = { name: string; role?: string; bio?: string };

const bios: Record<string, Omit<Author, "name">> = {
  "Vanhishikha Bhargava": {
    role: "Content Marketer, Appstle",
    bio: "Vanhishikha Bhargava is the Content Marketer for Appstle Solutions. You’ll always find her creating content or reading up on the industry with a cup of coffee in hand, which makes her anxious at times! But stay tuned for insightful pieces. Always.",
  },
  "Rakshithaa (Ria) Mahesh": {
    role: "Co-founder & CEO, Appstle",
    bio: "Ria is the co-founder and CEO of Appstle Solutions. Ria is extremely passionate about e-commerce, and building strong products to help merchants in their e-commerce journey. Three things that always catch her interest are technology innovation, human psychology, and traveling.",
  },
  "Hemanth Purswani": {
    role: "Co-founder & CTO, Appstle",
    bio: "Hemant B is the co-founder and Chief Technology Officer of Appstle Solutions. Hemant’s 3 main interests are 1. coding, 2. coding, and 3. coding! His 4th and 5th interests are trains and Agatha Christie novels!",
  },
  "Hussain Qureshi": {
    role: "Product Support Manager, Appstle",
    bio: "Hussain Qureshi is the Product Support Manager at Appstle Solutions. Hussain is level headed and loves interacting with new people and developing strong client relationships. His biggest interests are problem solving (especially tricky ones!), cricket, F1 racing, and European history!",
  },
  Awais: {
    role: "Customer Support Manager, Appstle",
    bio: "Awais is a customer support manager at Appstle Inc, Awais is committed to solving merchants' queries and developing strong working relationships with them. His biggest interests are CX/MX (customer and merchant experience!), football, and political affairs.",
  },
  "Sarah Pruzansky": {
    role: "Content Marketer, Appstle",
    bio: "Sarah Pruzansky is a content marketer for Appstle, and specializes in social media, blog content, influencer marketing, and email campaigns. Whether she's writing for Appstle, engaging on social media, or networking, Sarah always finds a way to keep up with the latest internet trends. In her free time, Sarah enjoys yoga, running, and reading. Stay tuned for more content from Sarah!",
  },
  "Guest Author": { bio: "This is a guest post submitted by our Shopify app partner." },
  "Joy Lake": {
    role: "Business Operations Manager, Appstle Inc.",
    bio: "Joy Lake serves as a Business Operations Manager for Appstle Inc. With over 7 years in B2B and B2C digital marketing strategy and implementation, Joy’s passion lies in providing businesses with efficient and innovative solutions to help them grow and thrive. In her free time, she enjoys, traveling, trying new brunch spots with friends in her hometown of Wichita, Kansas, and playing with her 1-year-old American Akita Winnie.",
  },
};

export const authorFor = (name: string): Author => ({ name: name || "Team Appstle", ...bios[name] });

export const authorContact = {
  lines: [
    "If you are looking to understand more about Appstle Inc’s products and solutions, you can get in touch with us.",
    "Our 24x7x365 available experts will be happy to assist you further.",
  ],
  cta: "Get In Touch",
} as const;

export const initials = (name: string) =>
  name
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
