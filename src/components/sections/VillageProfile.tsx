import Image from "next/image";

const historyTimeline = [
  {
    date: "1975",
    description: "Pengajuan pemekaran Desa Rancaekek.",
  },
  {
    date: "23 Juni 1976",
    description: "Persetujuan pemekaran dan terbentuknya Desa Sukamanah.",
  },
  {
    date: "1977",
    description: "Pemilihan kepala desa pertama, dimenangkan Adimaja.",
  },
  {
    date: "Sekitar 1985",
    description: "Pemekaran wilayah yang melahirkan Desa Tegalsumedang.",
  },
];

const villagePotentials = [
  {
    title: "Pertanian",
    description: "Mengangkat potensi pertanian sebagai bagian dari pengembangan desa.",
  },
  {
    title: "Sumber Daya Manusia",
    description: "Mendorong kapasitas dan partisipasi warga dalam pembangunan.",
  },
  {
    title: "Ekonomi Lokal",
    description: "Mendukung aktivitas ekonomi yang tumbuh dari lingkungan desa.",
  },
  {
    title: "Sosial Budaya",
    description: "Merawat kebersamaan dan nilai sosial budaya masyarakat.",
  },
  {
    title: "Kepemudaan",
    description: "Membuka ruang bagi pemuda untuk terlibat dan berkarya.",
  },
];

const draftMissions = [
  "Mendorong pengembangan pertanian dan ekonomi lokal secara berkelanjutan.",
  "Menguatkan kapasitas sumber daya manusia serta partisipasi masyarakat.",
  "Merawat kehidupan sosial budaya dan semangat kebersamaan warga.",
  "Membuka ruang bagi pemuda untuk berkontribusi dalam pembangunan desa.",
];

export default function VillageProfile() {
  return (
    <section
      id="profil-desa"
      className="bg-warm-white px-5 py-20 text-primary-charcoal sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-neutral-grey">
            Profil Wilayah
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Mengenal Desa Sukamanah
          </h2>
          <p className="mt-5 text-base leading-7 text-neutral-grey sm:text-lg sm:leading-8">
            Desa Sukamanah berada di Kecamatan Rancaekek, Kabupaten Bandung.
            Sejarah pemekarannya menjadi bagian dari perjalanan dan identitas
            masyarakat desa hingga kini.
          </p>
        </header>

        <section aria-labelledby="sejarah-title" className="mt-20 lg:mt-28">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-neutral-grey">
                Dari masa ke masa
              </p>
              <h3
                id="sejarah-title"
                className="mt-3 font-heading text-2xl font-semibold sm:text-3xl"
              >
                Sejarah Desa
              </h3>
              <p className="mt-4 max-w-md leading-7 text-neutral-grey">
                Perjalanan Desa Sukamanah tercatat melalui proses pemekaran,
                pembentukan desa, dan perkembangan wilayahnya.
              </p>
            </div>

            <ol className="relative space-y-8 border-l border-primary-yellow/60 pl-6 sm:pl-8">
              {historyTimeline.map((event) => (
                <li key={event.date} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-warm-white bg-primary-yellow ring-2 ring-primary-yellow sm:-left-[39px]"
                  />
                  <p className="font-heading text-lg font-semibold text-primary-charcoal">
                    {event.date}
                  </p>
                  <p className="mt-1 leading-7 text-neutral-grey">
                    {event.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="batas-title" className="mt-20 lg:mt-28">
          <div className="grid overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-primary-charcoal/5 lg:grid-cols-2">
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-neutral-grey">
                Wilayah Desa
              </p>
              <h3
                id="batas-title"
                className="mt-3 font-heading text-2xl font-semibold sm:text-3xl"
              >
                Batas Wilayah
              </h3>
              <p className="mt-4 leading-7 text-neutral-grey">
                Peta berikut mengilustrasikan area dan garis batas wilayah Desa
                Sukamanah.
              </p>
              <p className="mt-4 text-sm leading-6 text-neutral-grey">
                Keterangan nama wilayah pada setiap arah mata angin belum
                dicantumkan karena tidak tersedia pada materi yang ada.
              </p>
            </div>
            <figure className="relative min-h-64 bg-primary-charcoal/10 sm:min-h-80 lg:min-h-full">
              <Image
                src="/images/peta%20desa.png"
                alt="Peta wilayah Desa Sukamanah dengan garis batas area"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-primary-charcoal/75 px-5 py-3 text-sm text-warm-white backdrop-blur-sm">
                Ilustrasi peta wilayah Desa Sukamanah
              </figcaption>
            </figure>
          </div>
        </section>

        <section aria-labelledby="visi-misi-title" className="mt-20 lg:mt-28">
          <div className="rounded-3xl bg-primary-charcoal p-6 text-warm-white sm:p-10 lg:p-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
              <div className="lg:w-1/3">
                <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-primary-yellow">
                  Arah Bersama
                </p>
                <h3
                  id="visi-misi-title"
                  className="mt-3 font-heading text-2xl font-semibold sm:text-3xl"
                >
                  Visi dan Misi
                </h3>
                <p className="mt-4 inline-flex rounded-full border border-primary-yellow/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-yellow">
                  Draft · Bukan informasi resmi pemerintah desa
                </p>
              </div>

              <div className="grid flex-1 gap-8 sm:grid-cols-2">
                <div>
                  <h4 className="font-heading text-lg font-semibold text-primary-yellow">
                    Visi
                  </h4>
                  <p className="mt-3 leading-7 text-warm-white/85">
                    Terwujudnya Desa Sukamanah yang berdaya melalui pertanian,
                    sumber daya manusia, ekonomi lokal, sosial budaya, dan
                    kepemudaan yang berkembang.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold text-primary-yellow">
                    Misi
                  </h4>
                  <ol className="mt-3 space-y-3 text-sm leading-6 text-warm-white/85 sm:text-base">
                    {draftMissions.map((mission) => (
                      <li key={mission} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-yellow"
                        />
                        <span>{mission}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="potensi-title" className="mt-20 lg:mt-28">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-neutral-grey">
                Ruang untuk tumbuh
              </p>
              <h3
                id="potensi-title"
                className="mt-3 font-heading text-2xl font-semibold sm:text-3xl"
              >
                Potensi Desa
              </h3>
            </div>
            <p className="max-w-xl leading-7 text-neutral-grey">
              Bidang-bidang berikut merangkum potensi yang dapat terus
              dikembangkan bersama masyarakat.
            </p>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {villagePotentials.map((potential, index) => (
              <li
                key={potential.title}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary-charcoal/5 sm:p-7"
              >
                <span className="font-heading text-sm font-semibold tracking-[0.12em] text-primary-yellow">
                  0{index + 1}
                </span>
                <h4 className="mt-4 font-heading text-lg font-semibold">
                  {potential.title}
                </h4>
                <p className="mt-2 leading-7 text-neutral-grey">
                  {potential.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
