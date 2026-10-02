export const PAGE_SIZE = 4;

export function parsePageParam(value) {
  const param = Array.isArray(value) ? value[0] : value;
  if (typeof param !== "string" || !/^\d+$/.test(param)) return 1;
  const page = Number(param);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

export function estimateReadingTime(markdown = "") {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function filterPosts(posts, { query = "", category = "All" } = {}) {
  const term = query.trim().toLocaleLowerCase("en");
  return posts.filter((post) => {
    const matchesCategory = category === "All" || post.category === category;
    const text = [post.title, post.description, post.category, ...(post.tags || [])]
      .join(" ")
      .toLocaleLowerCase("en");
    return matchesCategory && (!term || text.includes(term));
  });
}

export function paginatePosts(posts, page = 1, pageSize = PAGE_SIZE) {
  const pageCount = Math.max(1, Math.ceil(posts.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), pageCount);
  const start = (currentPage - 1) * pageSize;
  return { posts: posts.slice(start, start + pageSize), page: currentPage, pageCount };
}
