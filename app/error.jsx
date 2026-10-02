"use client";

import Link from "next/link";
import { ArrowPathIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ErrorPage({ reset }) {
  return (
    <section className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow mb-5">A small interruption</p>
      <div className="mb-4 font-display text-8xl italic text-accent" aria-hidden="true">Oops.</div>
      <h1 className="font-display text-[clamp(2.6rem,5vw,4rem)] tracking-tight">That didn&apos;t quite work.</h1>
      <p className="mt-5 max-w-md text-base leading-8 text-muted">We couldn&apos;t load this page right now. Try again, or head back to the home page.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3"><button type="button" onClick={() => reset()} className="button-primary"><ArrowPathIcon className="h-4 w-4" /> Try again</button><Link href="/" className="button-outline"><ArrowLeftIcon className="h-4 w-4" /> Go home</Link></div>
    </section>
  );
}
