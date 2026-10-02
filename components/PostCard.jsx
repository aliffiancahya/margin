import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { formatDate } from "@/lib/post-utils.mjs";

export default function PostCard({ post, featured = false }) {
  if (featured) {
    return (
      <article className="group grid overflow-hidden rounded-[22px] border border-line bg-white shadow-soft lg:grid-cols-[1.13fr_1fr]">
        <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true" className="relative block min-h-[270px] overflow-hidden bg-peach sm:min-h-[340px] lg:min-h-[410px]">
          <Image src={post.image} alt="" fill priority sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        </Link>
        <div className="flex flex-col justify-center p-7 sm:p-11 lg:p-12">
          <span className="eyebrow">Editor&apos;s pick <span className="mx-2 text-muted/50">/</span> {post.category}</span>
          <h3 className="mt-6 font-display text-[clamp(2.2rem,3.3vw,3.7rem)] leading-[1.11] tracking-[-0.045em]">
            <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-accent">{post.title}</Link>
          </h3>
          <p className="mt-5 max-w-[390px] text-[15px] leading-7 text-muted">{post.description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <span className="text-xs font-semibold text-muted">{formatDate(post.date)} <span className="mx-1">·</span> {post.readingTime} min read</span>
            <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-bold hover:text-accent">Read story <ArrowRightIcon className="h-4 w-4" /></Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col">
      <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true" className="relative block aspect-[1.48] overflow-hidden rounded-[18px] bg-peach">
        <Image src={post.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.055]" />
        <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-paper text-ink shadow-sm transition-colors group-hover:bg-accent group-hover:text-white" aria-hidden="true"><ArrowUpRightIcon className="h-5 w-5" /></span>
      </Link>
      <div className="mt-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.13em] text-muted"><span className="text-accent">{post.category}</span><span aria-hidden="true">·</span><span>{post.readingTime} min read</span></div>
      <h3 className="mt-3 font-display text-[29px] leading-[1.2] tracking-[-0.035em] sm:text-[32px]"><Link href={`/blog/${post.slug}`} className="transition-colors hover:text-accent">{post.title}</Link></h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted">{post.description}</p>
      <div className="mt-5 border-t border-line pt-4 text-xs font-semibold text-muted">{formatDate(post.date)}</div>
    </article>
  );
}
