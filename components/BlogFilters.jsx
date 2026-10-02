import Link from "next/link";
import { MagnifyingGlassIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function BlogFilters({ categories, query, category }) {
  function getCategoryHref(nextCategory) {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (nextCategory !== "All") params.set("category", nextCategory);
    return `/blog${params.size ? `?${params.toString()}` : ""}`;
  }
  return (
    <div className="mb-10 flex flex-col gap-7 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
      <nav className="flex flex-wrap gap-2" aria-label="Filter by topic">
        {categories.map((item) => (
          <Link key={item} href={getCategoryHref(item)} aria-current={category === item ? "page" : undefined} className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${category === item ? "bg-ink text-white" : "border border-line bg-white/60 text-muted hover:border-ink hover:text-ink"}`}>
            {item}
          </Link>
        ))}
      </nav>
      <form action="/blog" method="get" role="search" className="flex w-full max-w-[340px] items-center gap-2 rounded-full border border-line bg-white p-1.5 pl-4 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/15">
        <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
        <label htmlFor="post-search" className="sr-only">Search articles</label>
        <input id="post-search" type="search" name="q" defaultValue={query} placeholder="Search the journal..." maxLength={80} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70" />
        {category !== "All" && <input type="hidden" name="category" value={category} />}
        <button type="submit" aria-label="Search articles" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white transition hover:bg-accent"><ArrowRightIcon className="h-4 w-4" /></button>
      </form>
    </div>
  );
}
