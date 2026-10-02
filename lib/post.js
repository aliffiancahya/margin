import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import {
  estimateReadingTime,
  filterPosts,
  paginatePosts,
} from "./post-utils.mjs";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function toPost(fileName, source) {
  const { data, content } = matter(source);
  return {
    slug: fileName.replace(/\.md$/, ""),
    title: data.title,
    description: data.description,
    date: data.date,
    image: data.image,
    category: data.category,
    tags: data.tags || [],
    featured: Boolean(data.featured),
    author: data.author || "margin. studio",
    readingTime: estimateReadingTime(content),
    markdown: content,
  };
}

export async function getAllPosts() {
  const entries = await readdir(POSTS_DIR);
  const files = entries.filter((file) => file.endsWith(".md"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const source = await readFile(path.join(POSTS_DIR, file), "utf8");
      return toPost(file, source);
    }),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostsPage({ page = 1, query = "", category = "All" } = {}) {
  const all = await getAllPosts();
  const filtered = filterPosts(all, { query, category });
  return { ...paginatePosts(filtered, page), total: filtered.length };
}

export async function getFeaturedPosts(count = 3) {
  const posts = await getAllPosts();
  const featured = posts.filter((post) => post.featured);
  return (featured.length ? featured : posts).slice(0, count);
}

export async function getCategories() {
  const posts = await getAllPosts();
  return ["All", ...new Set(posts.map((post) => post.category))];
}

export async function getSlugs() {
  const entries = await readdir(POSTS_DIR);
  return entries.filter((entry) => entry.endsWith(".md")).map((entry) => entry.slice(0, -3));
}

export async function getPost(slug) {
  if (typeof slug !== "string" || !/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    const source = await readFile(path.join(POSTS_DIR, `${slug}.md`), "utf8");
    const post = toPost(`${slug}.md`, source);
    // Markdown comes only from repository-owned local files, never user input.
    return { ...post, body: marked.parse(post.markdown) };
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

export async function getRelatedPosts(post, count = 2) {
  const posts = (await getAllPosts()).filter((other) => other.slug !== post.slug);
  return posts
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, count);
}
