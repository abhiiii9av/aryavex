"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "The Platform", href: "/#products" },
  // { label: "Our Story", href: "/#why-aryavex" },
  { label: "Industry Insights", href: "/" }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-50">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden border border-[rgba(170,184,198,0.42)] bg-[rgba(255,255,255,0.8)] px-6 py-3 shadow-[0_18px_48px_rgba(30,24,14,0.06)] backdrop-blur-md">
          <div className="navbar-network-pattern pointer-events-none absolute inset-y-0 right-0 hidden lg:block lg:left-[17rem]" />
          <div className="absolute inset-y-0 hidden lg:block lg:left-[14.75rem] lg:w-44 lg:bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.92)_40%,rgba(255,255,255,0)_100%)]" />
          <div className="absolute inset-y-0 right-0 hidden lg:block lg:w-[56%] lg:bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.2)_18%,rgba(255,255,255,0.5)_52%,rgba(255,255,255,0.72)_100%)]" />

          <div className="relative z-10 flex items-center justify-between gap-6">
            <Link href="/" className="relative z-10 flex shrink-0 items-center lg:w-[14.5rem]">
              <Image
                src="/aryavex-logo.png"
                alt="Aryavex Technologies Pvt Ltd"
                width={200}
                height={50}
                className="h-auto w-[12.25rem] sm:w-[13.5rem] lg:w-[12rem]"
                priority
              />
            </Link>

            <nav className="hidden items-center gap-10 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative pb-1 font-editorial text-[0.98rem] tracking-[0.01em] text-[rgba(22,20,17,0.86)] transition hover:text-[var(--color-ink)]"
                >
                  {item.label}
                  <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[rgba(19,63,135,0.7)] transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>

            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="group font-editorial inline-flex items-center border border-[var(--color-ink)] px-8 py-3 text-[1.05rem] text-[var(--color-ink)] transition hover:bg-[var(--color-ink)] hover:text-white"
              >
                <span className="text-[var(--color-ink)] transition group-hover:text-white">
                  Contact Us
                </span>
              </Link>
            </div>

            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center border border-[rgba(170,184,198,0.5)] bg-white/80 text-[var(--color-ink)] lg:hidden"
            >
              <span className="text-lg">{isOpen ? "×" : "≡"}</span>
            </button>
          </div>

          {isOpen ? (
            <div className="relative z-10 mt-4 border border-[rgba(170,184,198,0.45)] bg-white/92 p-4 shadow-[0_14px_32px_rgba(30,24,14,0.05)] lg:hidden">
              <nav className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-editorial px-3 py-2 text-[1.02rem] text-[var(--color-ink)] transition hover:bg-[#f3efe7]"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="font-editorial mt-2 inline-flex items-center justify-center border border-[var(--color-ink)] px-5 py-3 text-[1.05rem]"
                >
                  Contact Us
                </Link>
              </nav>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
