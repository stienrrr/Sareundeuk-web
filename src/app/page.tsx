import Link from "next/link";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-neutral-grey">
              Dashboard Utama
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-warm-white sm:text-3xl">
              Jelajahi Sareundeuk
            </h2>
            <p className="mt-4 leading-7 text-warm-white/75">
              Temukan informasi Desa Sukamanah dan Karang Taruna Sareundeuk.
            </p>
          </div>

          <Link
            href="/profil-desa"
            className="mt-8 flex max-w-xl flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-primary-yellow/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-yellow sm:p-8"
          >
            <span className="font-heading text-xl font-semibold text-warm-white">
              Profil Desa Sukamanah
            </span>
            <span className="mt-2 leading-7 text-warm-white/70">
              Lihat sejarah, wilayah, visi-misi draft, dan potensi desa.
            </span>
            <span className="mt-5 font-semibold text-primary-yellow">
              Buka profil desa <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
