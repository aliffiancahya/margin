import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import ShareLinkButton from "@/components/ShareLinkButton";
import PostCard from "@/components/PostCard";
import { formatDate } from "@/lib/post-utils.mjs";
import { getPost, getRelatedPosts, getSlugs } from "@/lib/post";

export async function generateStaticParams() {
  return (await getSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, images: [{ url: post.image }] },
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  const related = await getRelatedPosts(post);

  return (
    <>
      <article>
        <header className="container-site max-w-[1020px] pb-12 pt-12 text-center md:pb-16 md:pt-20">
          <nav aria-label="Breadcrumb" className="mb-12 flex items-center justify-center gap-2 text-xs font-semibold text-muted"><Link href="/blog" className="transition hover:text-accent">Journal</Link><span aria-hidden="true">/</span><span className="text-accent">{post.category}</span></nav>
          <p className="eyebrow mb-6">{post.category} <span className="mx-2 text-muted/40">/</span> {post.readingTime} minute read</p>
          <h1 className="mx-auto max-w-[900px] font-display text-[clamp(2.9rem,7vw,6.2rem)] leading-[1.06] tracking-[-0.065em]">{post.title}</h1>
          <p className="mx-auto mt-7 max-w-[680px] text-lg leading-8 text-muted">{post.description}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs font-semibold text-muted"><span>By {post.author}</span><span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" /><time dateTime={post.date}>{formatDate(post.date)}</time><span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" /><ShareLinkButton /></div>
        </header>
        <div className="container-site"><div className="relative aspect-[1.6] max-h-[620px] overflow-hidden rounded-[20px] bg-peach sm:aspect-[2.15]"><Image src={post.image} alt="" fill priority sizes="(max-width: 1240px) 100vw, 1150px" className="object-cover" /></div></div>
        <div className="container-site mx-auto grid max-w-[1040px] gap-10 pb-20 pt-12 md:grid-cols-[160px_minmax(0,1fr)] md:gap-14 md:pt-20">
          <aside className="hidden md:block"><div className="sticky top-10"><p className="eyebrow mb-4">Filed under</p><div className="flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="pill">{tag}</span>)}</div><div className="mt-9 h-px bg-line" /><p className="mt-6 font-display text-xl italic text-muted">Make something good today.</p></div></aside>
          <div className="min-w-0"><div className="article-prose" dangerouslySetInnerHTML={{ __html: post.body }} /><div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-y border-line py-6"><div className="flex flex-wrap gap-2 md:hidden">{post.tags.map((tag) => <span key={tag} className="pill">{tag}</span>)}</div><p className="font-display text-xl italic text-muted">Enjoyed the read?</p><ShareLinkButton /></div><Link href="/blog" className="mt-9 inline-flex items-center gap-3 text-sm font-bold transition hover:text-accent"><ArrowLeftIcon className="h-4 w-4" /> Back to the journal</Link></div>
        </div>
      </article>
      {related.length > 0 && <section className="border-t border-line bg-[#f0efe8]"><div className="container-site py-20 md:py-24"><div className="mb-10 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow mb-3">Keep turning the page</p><h2 className="section-title">You might also <em>like.</em></h2></div><Link href="/blog" className="text-link">All articles <ArrowRightIcon className="h-4 w-4" /></Link></div><div className="grid gap-10 sm:grid-cols-2">{related.map((other) => <PostCard key={other.slug} post={other} />)}</div></div></section>}
    </>
  );
}
