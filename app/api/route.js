import { NextResponse } from "next/server";
import { getPostsPage } from "@/lib/post";
import { parsePageParam } from "@/lib/post-utils.mjs";

/** Public, read-only content endpoint. Example: GET /api?q=design&category=Design&page=1 */
export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const query = (params.get("q") || "").slice(0, 80);
  const category = (params.get("category") || "All").slice(0, 40);
  const { posts, page, pageCount, total } = await getPostsPage({
    page: parsePageParam(params.get("page")), query, category,
  });
  // Never expose raw Markdown or rendered HTML through the listing endpoint.
  const items = posts.map(({ markdown, ...post }) => post);
  return NextResponse.json({ posts: items, page, pageCount, total });
}
