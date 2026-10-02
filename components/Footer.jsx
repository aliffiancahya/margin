import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-[#f0efe8]">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.3fr_1fr] md:gap-20">
        <div>
          <Link
            href="/"
            className="font-display text-4xl font-bold tracking-[-0.075em]"
          >
            {site.name}
          </Link>

          <p className="mt-4 max-w-[260px] text-sm leading-7 text-muted">
            {site.shortDescription}
            <br />
            Made with care, built for curiosity.
          </p>
        </div>

        <div className="md:justify-self-end">
          <p className="eyebrow mb-5">Find your way</p>

          <div className="grid gap-3 text-sm font-semibold">
            <Link className="w-fit hover:text-accent" href="/blog">
              The journal
            </Link>
            <Link className="w-fit hover:text-accent" href="/about">
              The story
            </Link>
            <Link className="w-fit hover:text-accent" href="/contact">
              Get in touch
            </Link>
          </div>
        </div>
      </div>
      <div className="container-site flex flex-col gap-2 border-t border-[#dbd9d0] py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {site.name} All ideas welcome.
        </span>
        <span>Designed to be read. Built to be shared.</span>
      </div>
    </footer>
  );
}
