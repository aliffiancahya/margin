import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, CheckIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "About the journal",
  description:
    "The thinking behind margin.: an editorial blog made with Next.js, Markdown, and care for the details.",
};

const decisions = [
  {
    number: "01",
    title: "Content first",
    body: "Articles live in Markdown, so publishing is simple, portable, and easy to version. No external CMS or API key required.",
  },
  {
    number: "02",
    title: "Designed to feel good",
    body: "Warm neutrals, expressive editorial type, responsive layouts, and sensible motion let the stories lead.",
  },
  {
    number: "03",
    title: "The details count",
    body: "Search, topic filters, accessible navigation, reading time, related stories, and sharing make this more than a landing page.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-site grid items-center gap-12 py-16 md:grid-cols-2 md:gap-20 md:py-24">
          <div>
            <h1 className="font-display text-[clamp(3.2rem,6.4vw,6.5rem)] leading-[1.04] tracking-[-0.065em]">
              A home for <em className="text-accent">curiosity</em>
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-9 text-muted">
              margin is a place for looking a little closer at how good digital
              experiences get made one idea, experiment, and lesson at a time.
            </p>
            <Link href="/blog" className="button-primary mt-9">
              Read the journal
            </Link>
          </div>
          <div className="relative">
            <div className="relative aspect-[0.94] overflow-hidden rounded-t-[170px] rounded-b-[20px] bg-peach">
              <Image
                src="/images/image-4.jpg"
                alt="Sunlight through trees by a quiet lakeside"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container-site py-20 text-center md:py-24">
        <p className="eyebrow mb-4">Have something interesting in mind?</p>
        <h2 className="mx-auto max-w-2xl font-display text-[clamp(2.8rem,5vw,5rem)] leading-tight tracking-[-0.05em]">
          Good things start with <em>a hello</em>
        </h2>
        <Link href="/contact" className="button-primary mt-8">
          Start a conversation
        </Link>
      </section>
    </>
  );
}
