"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    function onEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  function isActive(href) {
    return href === "/" ? pathname === href : pathname.startsWith(href);
  }

  return (
    <header className="relative z-30 border-b border-line bg-paper/95">
      <nav
        aria-label="Main navigation"
        className="container-site flex min-h-[82px] items-center justify-center gap-8"
      >
        <Link
          href="/"
          className="inline-flex items-center font-display text-[34px] font-bold leading-none tracking-[-0.07em]"
          aria-label={`${site.name} homepage`}
        >
          {site.name.replace(/\.$/, "")}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.slice(0, 3).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={`py-2 text-sm font-semibold transition hover:text-accent ${
                isActive(href) ? "text-accent" : "text-ink"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="hidden min-h-11 items-center rounded-full border border-ink px-5 text-sm font-bold transition hover:bg-ink hover:text-white md:inline-flex"
        >
          +
        </Link>

        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-line p-2.5 md:hidden"
        >
          {open ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </nav>
      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-line bg-paper px-5 pb-5 pt-3 shadow-soft md:hidden"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={isActive(href) ? "page" : undefined}
              className={`block border-b border-line py-4 text-lg font-semibold ${isActive(href) ? "text-accent" : "text-ink"}`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
