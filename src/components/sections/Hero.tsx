import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative isolate mx-4 mt-6 flex min-h-[620px] items-center overflow-hidden rounded-[2rem] bg-primary-charcoal sm:mx-6 md:min-h-[680px]"
    >
      <Image
        src="/images/hero-sareundeuk.jpg"
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 100vw, 1440px"
        className="object-cover object-center"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-primary-charcoal/95 via-primary-charcoal/70 to-primary-charcoal/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-primary-charcoal/45 via-transparent to-primary-charcoal/10"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="mb-5 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary-yellow sm:text-base">
            Karang Taruna Sareundeuk · Desa Sukamanah
          </p>
          <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-warm-white sm:text-5xl lg:text-7xl">
            Bersama Membangun, Bergerak untuk Masyarakat.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-warm-white/85 sm:text-lg sm:leading-8">
            Ruang bagi pemuda Desa Sukamanah untuk tumbuh, berkarya, dan bergerak
            bersama membangun masyarakat.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/karang-taruna"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary-yellow px-7 py-3 font-semibold text-primary-charcoal transition-colors hover:bg-warm-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-yellow"
            >
              Kenali Kami
            </Link>
            <Link
              href="/kegiatan"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-warm-white/50 px-7 py-3 font-semibold text-warm-white transition-colors hover:border-primary-yellow hover:text-primary-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-yellow"
            >
              Lihat Kegiatan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
