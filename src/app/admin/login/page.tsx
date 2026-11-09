import type { Metadata } from "next";
import Image from "next/image";
import LoginForm from "@/app/admin/login/LoginForm";

export const metadata: Metadata = {
  title: "Masuk Pengurus | Karang Taruna Sareundeuk",
  description: "Halaman masuk pengurus Karang Taruna Sareundeuk.",
  robots: {
    index: false,
    follow: false,
  },
};

function DecorativeMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 220"
      fill="none"
      className="pointer-events-none absolute -right-16 -top-20 hidden w-64 text-primary-yellow/10 sm:block lg:w-80"
    >
      <circle cx="110" cy="110" r="82" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="110" cy="110" r="58" stroke="currentColor" strokeWidth="1.5" />
      <path d="M110 12v196M12 110h196M41 41l138 138M179 41 41 179" stroke="currentColor" />
      <circle cx="110" cy="110" r="9" fill="currentColor" />
    </svg>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="relative isolate flex min-h-[100svh] flex-1 items-center overflow-hidden bg-primary-charcoal px-4 py-8 text-warm-white sm:px-6 sm:py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_15%,rgba(206,179,28,0.12),transparent_42%),radial-gradient(ellipse_at_90%_85%,rgba(245,243,238,0.06),transparent_38%)]"
      />

      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#242129] shadow-2xl shadow-black/30 lg:grid-cols-[1.02fr_0.98fr]">
        <section className="relative flex min-h-64 flex-col justify-between overflow-hidden p-7 sm:p-10 lg:min-h-[620px] lg:p-12">
          <DecorativeMark />

          <div className="relative z-10 flex items-center gap-4">
            <div className="rounded-full border border-primary-yellow/40 bg-primary-charcoal p-1.5 shadow-lg shadow-black/20">
              <Image
                src="/logo/logo-sreundeuk.jpg"
                alt=""
                width={64}
                height={64}
                className="size-14 rounded-full object-cover sm:size-16"
              />
            </div>
            <div>
              <p className="font-heading text-lg font-semibold tracking-[0.16em] text-warm-white sm:text-xl">
                SAREUNDEUK
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-warm-white/55">
                Desa Sukamanah
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-10 max-w-md lg:mt-16">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-primary-yellow" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-yellow">
                Ruang Pengurus
              </span>
            </div>
            <h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-warm-white sm:text-4xl lg:text-[2.75rem]">
              Bersama bergerak,
              <span className="mt-1 block text-primary-yellow">untuk Sareundeuk.</span>
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-warm-white/65 sm:text-base">
              Masuk ke ruang pengurus Karang Taruna untuk melanjutkan kerja dan
              kolaborasi bagi lingkungan kita.
            </p>
          </div>

          <p className="relative z-10 mt-10 text-xs tracking-wide text-warm-white/40">
            Karang Taruna Sareundeuk · Desa Sukamanah
          </p>
        </section>

        <section className="bg-warm-white px-6 py-8 text-primary-charcoal sm:px-10 sm:py-11 lg:flex lg:items-center lg:px-12">
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-charcoal/50">
                Akses administrasi
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Selamat datang
              </h2>
              <p className="mt-2 text-sm leading-6 text-primary-charcoal/65">
                Masukkan username dan password pengurus Anda.
              </p>
            </div>

            <LoginForm />

            <div className="mt-8 flex items-start gap-3 border-t border-primary-charcoal/10 pt-5 text-xs leading-5 text-primary-charcoal/55">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="mt-0.5 size-4 shrink-0 text-primary-charcoal/60"
              >
                <path
                  d="M6.25 8.33V6.67a3.75 3.75 0 0 1 7.5 0v1.66m-8.33 0h9.16c.46 0 .84.38.84.84v6.66c0 .46-.38.84-.84.84H5.42a.84.84 0 0 1-.84-.84V9.17c0-.46.38-.84.84-.84Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Halaman ini khusus untuk pengurus Karang Taruna Sareundeuk.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
