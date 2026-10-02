import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import BlogFilters from "@/components/BlogFilters";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { getCategories, getPostsPage } from "@/lib/post";
import { parsePageParam } from "@/lib/post-utils.mjs";

export const metadata = {
  title: "The journal",
  description:
    "Browse notes on web development, thoughtful design, and learning in public.",
};

export default async function BlogPage({ searchParams = {} }) {
  const query =
    typeof searchParams.q === "string"
      ? searchParams.q.trim().slice(0, 80)
      : "";
  const categories = await getCategories();
  const category = categories.includes(searchParams.category)
    ? searchParams.category
    : "All";
  const { page, pageCount, posts, total } = await getPostsPage({
    page: parsePageParam(searchParams.page),
    query,
    category,
  });
  const isFiltered = query || category !== "All";

  return (
    <>
      <section className="border-b border-line bg-[#f0efe8]">
        <div className="container-site py-16 md:py-24">
          <h1 className="max-w-3xl font-display text-[clamp(3.3rem,8vw,7rem)] leading-[1] tracking-[-0.065em]">
            The <em className="text-accent">journal</em>
          </h1>
          <p className="mt-6 max-w-[550px] text-base leading-8 text-muted">
            A growing collection of notes about the web, making things, and
            getting a little better every day.
          </p>
        </div>
      </section>
      <section className="container-site py-14 md:py-20" aria-label="Articles">
        <BlogFilters
          categories={categories}
          query={query}
          category={category}
        />
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-3xl tracking-tight">
            {query
              ? `Results for “${query}”`
              : category === "All"
                ? "All stories"
                : `${category} stories`}
          </h2>
          <p className="text-xs font-semibold text-muted">
            {total} {total === 1 ? "article" : "articles"}
          </p>
        </div>
        {posts.length ? (
          <div className="grid gap-x-9 gap-y-14 sm:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-[24px] border border-dashed border-[#c9c9bd] bg-white/50 px-7 py-20 text-center">
            <span
              className="mb-4 block font-display text-5xl text-accent"
              aria-hidden="true"
            >
              ✳
            </span>
            <h3 className="font-display text-3xl">Nothing here just yet.</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-muted">
              Try another search or clear your filters. There&apos;s more to
              discover in the full journal.
            </p>
            <Link href="/blog" className="button-primary mt-6">
              See all articles <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        )}
        {posts.length > 0 && (
          <div className="mt-14">
            <Pagination
              page={page}
              pageCount={pageCount}
              query={query}
              category={category}
            />
          </div>
        )}
        {!isFiltered && (
          <p className="mt-10 text-center text-xs text-muted">
            A good idea is always worth writing down.
          </p>
        )}
      </section>
    </>
  );
}
