import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[65vh] flex-col items-center justify-center py-20 text-center"><p className="eyebrow mb-5">Error 404 / A small detour</p><p className="font-display text-[clamp(7rem,21vw,15rem)] leading-none tracking-[-0.1em] text-peach" aria-hidden="true">404</p><h1 className="-mt-5 font-display text-[clamp(2.7rem,5vw,4.5rem)] leading-tight tracking-tight">This page wandered off.</h1><p className="mt-5 max-w-md text-base leading-8 text-muted">The link may have moved, or the page might not exist yet. There are plenty of other ideas to explore.</p><Link href="/" className="button-primary mt-8"><ArrowLeftIcon className="h-4 w-4" /> Back home</Link></section>
  );
}
