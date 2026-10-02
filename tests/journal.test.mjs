import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  PAGE_SIZE,
  parsePageParam,
  estimateReadingTime,
  formatDate,
  filterPosts,
  paginatePosts,
} from "../lib/post-utils.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const postsDir = path.join(root, "content", "blog");

test("page query is strict and handles odd input safely", () => {
  for (const invalid of [undefined, null, "", "0", "-2", "1.4", "2abc", "Infinity", "999999999999999999999"]) {
    assert.equal(parsePageParam(invalid), 1);
  }
  assert.equal(parsePageParam("3"), 3);
  assert.equal(parsePageParam(["2", "3"]), 2);
});

test("search, category filtering, and pagination work together", () => {
  const posts = [
    { title: "Next.js foundations", description: "A first post", category: "Development", tags: ["React"] },
    { title: "Design in detail", description: "UI choices", category: "Design", tags: ["Accessibility"] },
    { title: "Accessible React", description: "UI choices", category: "Development", tags: ["Accessibility"] },
  ];
  assert.equal(filterPosts(posts, { query: "rEaCt" }).length, 2);
  assert.equal(filterPosts(posts, { category: "Design" }).length, 1);
  assert.equal(filterPosts(posts, { query: "accessibility", category: "Development" }).length, 1);
  assert.equal(filterPosts(posts, { query: "no results" }).length, 0);
  assert.deepEqual(paginatePosts(posts, 2, 2), { posts: [posts[2]], page: 2, pageCount: 2 });
  assert.deepEqual(paginatePosts(posts, 99, 2), { posts: [posts[2]], page: 2, pageCount: 2 });
  assert.equal(paginatePosts([], 2, PAGE_SIZE).pageCount, 1);
});

test("reading time and human-readable dates are predictable", () => {
  assert.equal(estimateReadingTime(""), 1);
  assert.equal(estimateReadingTime("a ".repeat(450)), 3);
  assert.equal(formatDate("2026-08-19"), "August 19, 2026");
});

test("sample Markdown is complete, unique, linked, and ready to render", async () => {
  const files = (await readdir(postsDir)).filter((file) => file.endsWith(".md"));
  assert.equal(files.length, 6, "demo has six distinct articles");
  const titles = new Set();
  let featured = 0;
  for (const file of files) {
    assert.match(file, /^[a-z0-9-]+\.md$/);
    const source = await readFile(path.join(postsDir, file), "utf8");
    assert.match(source, /^---\n[\s\S]+?\n---\n[\s\S]+/);
    const frontmatter = source.split("\n---\n")[0];
    for (const key of ["title", "description", "date", "image", "author", "category", "tags", "featured"]) {
      assert.match(frontmatter, new RegExp(`^${key}:`, "m"), `${file}: missing ${key}`);
    }
    const title = frontmatter.match(/^title:\s*"?(.+?)"?$/m)?.[1];
    assert.ok(title && !titles.has(title), `${file}: duplicate or missing title`);
    titles.add(title);
    const date = frontmatter.match(/^date:\s*"(\d{4}-\d{2}-\d{2})"$/m)?.[1];
    assert.ok(date && !Number.isNaN(Date.parse(date)), `${file}: invalid ISO date`);
    const image = frontmatter.match(/^image:\s*"(\/[^"]+)"$/m)?.[1];
    assert.ok(image && image.startsWith("/images/"));
    await access(path.join(root, "public", image.slice(1)));
    if (/^featured:\s*true$/m.test(frontmatter)) featured++;
    assert.ok(source.slice(source.indexOf("\n---\n") + 5).trim().length > 500, `${file}: body too short`);
  }
  assert.ok(featured >= 3, "home page has an editorial feature and two cards");
});

test("package manifest and lockfile describe the same install", async () => {
  const manifest = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
  const lockfile = JSON.parse(await readFile(path.join(root, "package-lock.json"), "utf8"));
  assert.equal(manifest.name, lockfile.name);
  assert.equal(manifest.version, lockfile.version);
  assert.deepEqual(manifest.dependencies, lockfile.packages[""].dependencies);
  assert.deepEqual(manifest.devDependencies, lockfile.packages[""].devDependencies);
});
