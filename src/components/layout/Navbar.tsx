"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navigationItems = [
  { label: "Beranda", href: "/", available: true },
  { label: "Profil Desa", href: "/profil-desa", available: true },
  { label: "Karang Taruna", href: "/karang-taruna", available: true },
  { label: "Bidang", href: "/bidang", available: true },
  { label: "Program Kerja", href: "/program-kerja", available: true },
  { label: "Kegiatan", href: "/kegiatan", available: true },
  { label: "Kontak", href: "/kontak", available: true },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="px-4 pt-4 sm:px-6">
      <div className="relative mx-auto max-w-[1440px] rounded-3xl bg-primary-charcoal px-4 py-3 text-pure-white shadow-lg sm:px-6 xl:rounded-full xl:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-yellow"
            aria-label="Sareundeuk, ke Beranda"
          >
            <Image
              src="/logo/logo-sreundeuk.jpg"
              alt="Logo Karang Taruna Sareundeuk"
              width={48}
              height={48}
              priority
              className="size-11 shrink-0 rounded-full object-cover sm:size-12"
            />
            <span className="truncate font-heading text-lg font-semibold tracking-[0.12em] sm:text-xl">
              SAREUNDEUK
            </span>
          </Link>

          <nav aria-label="Navigasi utama" className="hidden xl:block">
            <ul className="flex items-center gap-4 2xl:gap-6">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  {item.available ? (
                    <Link
                      href={item.href}
                      className="whitespace-nowrap rounded-sm text-sm font-medium transition-colors hover:text-primary-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-yellow 2xl:text-base"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="cursor-not-allowed whitespace-nowrap rounded-sm text-sm font-medium text-pure-white/50 2xl:text-base"
                    >
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="flex size-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-yellow xl:hidden"
            aria-label={isMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="size-6"
            >
              {isMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <nav
          id="mobile-navigation"
          aria-label="Navigasi utama"
          hidden={!isMenuOpen}
          className="border-t border-white/15 pt-3 xl:hidden"
        >
          <ul className="flex flex-col">
            {navigationItems.map((item) => (
              <li key={item.href}>
                  {item.available ? (
                    <Link
                      href={item.href}
                      className="block rounded-lg px-3 py-3 font-medium transition-colors hover:bg-white/5 hover:text-primary-yellow focus-visible:outline-2 focus-visible:outline-primary-yellow"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="block cursor-not-allowed rounded-lg px-3 py-3 font-medium text-pure-white/50"
                    >
                      {item.label}
                    </span>
                  )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
