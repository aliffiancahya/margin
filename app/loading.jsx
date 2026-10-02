export default function Loading() {
  return (
    <div className="container-site py-16" role="status" aria-label="Loading the journal">
      <div className="mb-5 h-3 w-28 animate-pulse rounded-full bg-line" />
      <div className="mb-5 h-16 w-full max-w-[550px] animate-pulse rounded-xl bg-line" />
      <div className="mb-12 h-6 w-full max-w-[380px] animate-pulse rounded-xl bg-line" />
      <div className="grid gap-8 sm:grid-cols-2"><div className="aspect-[1.5] animate-pulse rounded-[22px] bg-line" /><div className="aspect-[1.5] animate-pulse rounded-[22px] bg-line" /></div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
