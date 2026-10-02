import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CodeBracketIcon,
  PencilSquareIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import PostCard from "@/components/PostCard";
import { getFeaturedPosts } from "@/lib/post";

const interests = [
  {
    Icon: CodeBracketIcon,
    number: "01",
    title: "Thoughtful development",
    description:
      "Practical notes on building faster, more intentional experiences for the web.",
  },
  {
    Icon: PencilSquareIcon,
    number: "02",
    title: "Design that connects",
    description:
      "The typography, interactions, and little details that make products feel human.",
  },
  {
    Icon: SparklesIcon,
    number: "03",
    title: "Learning in public",
    description:
      "What gets learned along the way, from first sketches to finished projects.",
  },
];

export default async function Home() {
  const [lead, ...featured] = await getFeaturedPosts(3);
  return (
    <>
      <section className="overflow-hidden border-b border-line">
        <div className="container-site grid items-center gap-10 pb-16 pt-12 md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:pb-24 md:pt-20 lg:gap-20">
          <div className="relative z-10">
            <h1 className="max-w-[700px] font-display text-[clamp(3.3rem,7.3vw,7.1rem)] leading-[0.99] tracking-[-0.071em]">
              Good ideas deserve a place to{" "}
              <em className="font-normal text-accent">grow</em>
            </h1>
            <p className="mt-8 max-w-[480px] text-[17px] leading-[1.85] text-muted">
              A little space for the things worth thinking about: thoughtful
              design, useful code, and everything learned along the way.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link href="/blog" className="button-primary">
                Explore the journal
              </Link>
              <Link href="/about" className="text-link">
                More about this space <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-line pt-6 text-xs font-semibold text-muted">
              <span>DESIGN / DEVELOPMENT / DISCOVERY</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[510px] md:max-w-none">
            <div className="relative aspect-[0.92] overflow-hidden rounded-t-[190px] rounded-b-[24px] bg-peach sm:aspect-[0.98]">
              <Image
                src="/images/image-3.jpg"
                alt="An open book in warm afternoon light"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 48vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181e18]/45 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 text-sm font-semibold text-white">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-white/75">
                  A note to self
                </span>
                Stay curious. Keep making.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="container-site py-20 md:py-28"
        aria-labelledby="featured-title"
      >
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="featured-title" className="section-title">
              Fresh from the <em>journal</em>
            </h2>
          </div>
          <Link href="/blog" className="text-link mb-2">
            View all stories
          </Link>
        </div>
        {lead && <PostCard post={lead} featured />}
        <div className="mt-11 grid gap-10 sm:grid-cols-2 lg:gap-12">
          {featured.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="container-site py-20 md:py-28">
        <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[26px] bg-forest px-8 py-12 text-white sm:px-12 md:flex-row md:items-end md:px-16 md:py-16">
          <div className="relative z-10">
            <h2 className="max-w-[650px] font-display text-[clamp(2.8rem,5.2vw,5.1rem)] leading-[1.08] tracking-[-0.05em]">
              The next idea starts with{" "}
              <em className="text-peach">a conversation.</em>
            </h2>
            <p className="mt-6 max-w-[440px] text-sm leading-7 text-white/70">
              Have a project in mind, a question, or an interesting link to
              share? There&apos;s room for all of it.
            </p>
          </div>
          <Link
            href="/contact"
            className="relative z-10 inline-flex min-h-12 shrink-0 items-center gap-3 rounded-full bg-peach px-6 py-4 text-sm font-bold text-ink transition hover:bg-white"
          >
            Get in touch
          </Link>
          <span
            className="pointer-events-none absolute -right-12 -top-32 font-display text-[320px] leading-none text-white/[0.045]"
            aria-hidden="true"
          >
            &amp;
          </span>
        </div>
      </section>
    </>
  );
}
