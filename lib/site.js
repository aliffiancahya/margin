/**
 * Customize your portfolio here. See README.md for the two environment variables.
 * Empty social links are intentionally hidden rather than pointing to fake profiles.
 */
export const site = {
  name: "margin",
  title: "margin - Notes on design & development",
  description:
    "A thoughtfully built digital journal about web development, design, and the details that make the internet feel human.",
  shortDescription: "A little space for big ideas about the web.",
  author: "margin. studio",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};
