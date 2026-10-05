"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/jobs", label: "Find jobs" },
  { href: "/resources", label: "Job boards & rights" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-mist-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid h-10 w-10 place-items-center rounded-2xl bg-ink-900 text-lg text-brand-300"
          >
            🤟
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold tracking-tight text-ink-900">
              SignWorks
            </span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
              Deaf talent, hired
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                isActive(link.href)
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-700 hover:bg-mist-100 hover:text-ink-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/post" className="btn btn-dark hidden sm:inline-flex">
            Post a job
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="btn btn-ghost px-3 md:hidden"
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
            <span className="sr-only">Toggle navigation</span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-mist-200 bg-white md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col p-3">
            {[...links, { href: "/post", label: "Share a job" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-800 hover:bg-mist-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

