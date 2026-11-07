const contactItems = [
  {
    label: "Lokasi",
    title: "Lihat di Google Maps",
    detail: "Buka lokasi Karang Taruna Sareundeuk di Google Maps.",
    href: "https://maps.app.goo.gl/KEC1G4Pr4BCkKpoE9",
    linkLabel: "Buka Google Maps",
    external: true,
  },
  {
    label: "Instagram",
    title: "@sareundeuk.sukamanah_",
    detail: "Kunjungi akun Instagram Karang Taruna Sareundeuk.",
    href: "https://www.instagram.com/sareundeuk.sukamanah_/",
    linkLabel: "Kunjungi Instagram",
    external: true,
  },
  {
    label: "Email",
    title: "kartasareundeuk@gmail.com",
    detail: "Kirim pesan melalui email kepada Karang Taruna Sareundeuk.",
    href: "mailto:kartasareundeuk@gmail.com",
    linkLabel: "Kirim Email",
    external: false,
  },
];

export default function ContactInfo() {
  return (
    <section className="bg-warm-white px-5 py-16 text-primary-charcoal sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-primary-yellow sm:text-base">
            Hubungi Kami
          </p>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Kontak Karang Taruna Sareundeuk
          </h1>
          <p className="mt-5 text-base leading-7 text-neutral-grey sm:text-lg sm:leading-8">
            Temukan lokasi dan kanal resmi Karang Taruna Sareundeuk melalui
            informasi berikut.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {contactItems.map((item) => (
            <article
              key={item.label}
              className="flex min-h-64 flex-col rounded-3xl border border-primary-charcoal/10 bg-white p-6 shadow-sm sm:p-7"
            >
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-neutral-grey">
                {item.label}
              </p>
              <h2 className="mt-4 break-words font-heading text-xl font-semibold sm:text-2xl">
                {item.title}
              </h2>
              <p className="mt-3 grow leading-7 text-neutral-grey">
                {item.detail}
              </p>
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="mt-6 inline-flex min-h-11 w-fit items-center rounded-full bg-primary-charcoal px-5 py-2.5 font-semibold text-warm-white transition-colors hover:bg-primary-charcoal/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-yellow"
              >
                {item.linkLabel}
                {item.external && (
                  <span aria-hidden="true" className="ml-2">
                    ↗
                  </span>
                )}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
