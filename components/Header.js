"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "The Platform", href: "/#products" },
  // { label: "Our Story", href: "/#why-aryavex" },
  { label: "Industry Insights",href:"/blog"}
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-50">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="border border-[var(--color-line)] bg-white/70 px-5 py-2 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/aryavex-logo.png"
                alt="Aryavex Technologies Pvt Ltd"
                width={200}
                height={50}
                className="h-auto w-[13rem] sm:w-[15rem] lg:w-[8rem] ml-[-1rem]"
                priority
              />
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-editorial text-[1.05rem] text-[var(--color-ink)] transition hover:opacity-70"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:block hover:text-white">
              <Link
                href="/contact"
                className="font-editorial inline-flex items-center border border-[var(--color-ink)] px-8 py-3 text-[1.05rem] text-[var(--color-ink)] transition hover:bg-[var(--color-ink)] hover:text-white"
              >
                Contact Us
              </Link>
            </div>

            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center border border-[var(--color-line)] text-[var(--color-ink)] lg:hidden"
            >
              <span className="text-lg">{isOpen ? "×" : "≡"}</span>
            </button>
          </div>

          {isOpen ? (
            <div className="mt-4 border border-[var(--color-line)] bg-white/85 p-4 lg:hidden">
              <nav className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-editorial px-3 py-2 text-[1.05rem] text-[var(--color-ink)] transition hover:bg-[#f3efe7]"
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
