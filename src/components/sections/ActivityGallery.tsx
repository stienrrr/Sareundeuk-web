import Image from "next/image";

export default function ActivityGallery() {
  return (
    <section className="bg-warm-white px-5 py-16 text-primary-charcoal sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-primary-yellow sm:text-base">
            Dokumentasi
          </p>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Kegiatan Karang Taruna Sareundeuk
          </h1>
          <p className="mt-5 text-base leading-7 text-neutral-grey sm:text-lg sm:leading-8">
            Dokumentasi visual Karang Taruna Sareundeuk. Informasi acara dan
            tanggal akan ditambahkan setelah tersedia.
          </p>
        </div>

        <figure className="mt-10 overflow-hidden rounded-3xl bg-primary-charcoal shadow-xl sm:mt-12">
          <div className="relative aspect-[4/3] sm:aspect-[16/9]">
            <Image
              src="/images/kegiatan-sareundeuk.jpg"
              alt="Dokumentasi visual Karang Taruna Sareundeuk"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
          <figcaption className="px-5 py-4 text-sm text-warm-white/85 sm:px-7 sm:py-5 sm:text-base">
            Dokumentasi Karang Taruna Sareundeuk
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
