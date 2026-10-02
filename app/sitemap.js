import { getAllPosts } from "@/lib/post";
import { site } from "@/lib/site";

export default async function sitemap() {
  const pages = ["", "/blog", "/about", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
  }));
  const articles = (await getAllPosts()).map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00Z`),
  }));
  return [...pages, ...articles];
}
