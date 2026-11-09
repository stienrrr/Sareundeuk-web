"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { logoutAction } from "@/app/admin/(workspace)/actions";

export type AdminRole =
  | "admin_utama"
  | "pengurus_inti"
  | "anggota_bidang"
  | "koordinator_bidang";

export type AdminViewer = {
  username: string;
  role: AdminRole;
  roleLabel: string;
};

type AdminShellProps = {
  viewer: AdminViewer;
  children: ReactNode;
};

const baseNavItemClass =
  "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition";

function NavIcon({ kind }: { kind: "dashboard" | "activities" | "accounts" | "settings" }) {
  const paths = {
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="11" width="7" height="10" rx="1" />
        <rect x="3" y="13" width="7" height="8" rx="1" />
      </>
    ),
    activities: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    accounts: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4.6V20" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4L7.3 15a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1L11 7.4h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a8 8 0 0 1-.1 2Z" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="size-[18px] shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[kind]}
    </svg>
  );
}

function SidebarContent({
  viewer,
  onNavigate,
}: {
  viewer: AdminViewer;
  onNavigate: () => void;
}) {
  return (
    <>
      <Link
        aria-label="Dashboard Karang Taruna Sareundeuk"
        className="flex items-center gap-3 px-2 py-2"
        href="/admin"
        onClick={onNavigate}
      >
        <Image
          src="/logo/logo-sreundeuk.jpg"
          alt=""
          width={48}
          height={48}
          className="size-12 rounded-full border border-primary-yellow/50 object-cover"
        />
        <span className="min-w-0">
          <span className="block font-heading text-sm font-semibold tracking-[0.12em] text-warm-white">
            SAREUNDEUK
          </span>
          <span className="mt-1 block text-[11px] text-warm-white/55">
            Ruang Pengurus
          </span>
        </span>
      </Link>

      <nav aria-label="Menu admin" className="mt-10 space-y-2">
        <Link
          aria-current="page"
          className={`${baseNavItemClass} bg-primary-yellow font-semibold text-primary-charcoal shadow-sm shadow-black/10`}
          href="/admin"
          onClick={onNavigate}
        >
          <NavIcon kind="dashboard" />
          Dashboard
        </Link>

        <span
          aria-disabled="true"
          className={`${baseNavItemClass} cursor-not-allowed text-warm-white/45`}
          title="Segera hadir"
        >
          <NavIcon kind="activities" />
          <span className="flex-1">Kelola Kegiatan</span>
          <span className="text-[10px] font-normal">Segera</span>
        </span>

        {viewer.role === "admin_utama" ? (
          <span
            aria-disabled="true"
            className={`${baseNavItemClass} cursor-not-allowed text-warm-white/45`}
            title="Segera hadir"
          >
            <NavIcon kind="accounts" />
            <span className="flex-1">Kelola Akun</span>
            <span className="text-[10px] font-normal">Segera</span>
          </span>
        ) : null}

        <span
          aria-disabled="true"
          className={`${baseNavItemClass} cursor-not-allowed text-warm-white/45`}
          title="Segera hadir"
        >
          <NavIcon kind="settings" />
          <span className="flex-1">Pengaturan</span>
          <span className="text-[10px] font-normal">Segera</span>
        </span>
      </nav>

      <div className="mt-auto border-t border-warm-white/10 pt-5">
        <p className="truncate px-3 text-sm font-semibold text-warm-white">
          {viewer.username}
        </p>
        <p className="mt-1 px-3 text-xs text-primary-yellow">{viewer.roleLabel}</p>
      </div>
    </>
  );
}

export default function AdminShell({ viewer, children }: AdminShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-[100svh] flex-1 bg-warm-white text-primary-charcoal">
      {mobileMenuOpen ? (
        <button
          aria-label="Tutup menu admin"
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          type="button"
        />
      ) : null}

      <aside
        aria-label="Sidebar admin"
        className={`fixed inset-y-0 left-0 z-40 flex w-[min(19rem,85vw)] flex-col bg-primary-charcoal px-5 py-6 shadow-2xl shadow-black/20 transition-transform duration-200 md:static md:z-auto md:w-64 md:translate-x-0 md:shadow-none ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent
          viewer={viewer}
          onNavigate={() => setMobileMenuOpen(false)}
        />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex min-h-[76px] items-center justify-between gap-3 border-b border-primary-charcoal/10 bg-warm-white/95 px-4 backdrop-blur sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary-charcoal/10 text-primary-charcoal md:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              type="button"
            >
              <svg
                aria-hidden="true"
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                {mobileMenuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold sm:text-base">
                Karang Taruna Sareundeuk
              </p>
              <p className="hidden text-xs text-primary-charcoal/55 sm:block">
                Ruang administrasi
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <div className="max-w-24 text-right sm:max-w-40">
              <p className="truncate text-xs font-semibold sm:text-sm">
                {viewer.username}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-primary-charcoal/60 sm:text-xs">
                {viewer.roleLabel}
              </p>
            </div>
            <form action={logoutAction}>
              <button
                aria-label="Keluar"
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-primary-charcoal/15 px-3 text-sm font-semibold transition hover:border-primary-yellow hover:bg-primary-yellow/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-yellow"
                type="submit"
              >
                <svg
                  aria-hidden="true"
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 17l5-5-5-5M15 12H3m9-8h6a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-6" />
                </svg>
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-7 sm:py-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
