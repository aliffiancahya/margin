import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Pagination({ page, pageCount, query, category }) {
  if (pageCount <= 1) return null;
  const toPage = (number) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category && category !== "All") params.set("category", category);
    params.set("page", String(number));
    return `/blog?${params.toString()}`;
  };
  return (
    <nav aria-label="Blog pagination" className="flex items-center justify-between gap-4 border-t border-line pt-8">
      {page > 1 ? <Link className="button-outline min-w-[110px] !px-4" href={toPage(page - 1)}><ArrowLeftIcon className="h-4 w-4" /> Previous</Link> : <span className="min-w-[110px]" />}
      <span className="text-xs font-semibold text-muted">Page {page} of {pageCount}</span>
      {page < pageCount ? <Link className="button-outline min-w-[110px] !px-4" href={toPage(page + 1)}>Next <ArrowRightIcon className="h-4 w-4" /></Link> : <span className="min-w-[110px]" />}
    </nav>
  );
}
