"use client";

import { LinkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ShareLinkButton() {
  const [status, setStatus] = useState("idle");

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <button type="button" onClick={handleClick} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold transition hover:border-ink hover:bg-white" aria-live="polite">
      {status === "copied" ? <CheckIcon className="h-4 w-4 text-forest" /> : <LinkIcon className="h-4 w-4" />}
      {status === "copied" ? "Link copied" : status === "failed" ? "Copy unavailable" : "Copy link"}
    </button>
  );
}
