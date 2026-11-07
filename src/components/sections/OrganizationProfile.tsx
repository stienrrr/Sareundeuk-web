import Image from "next/image";

const organizationHistory = [
  {
    date: "1 Januari 2011",
    description: "Karang Taruna Sareundeuk berdiri, didirikan oleh pemuda-pemudi Desa Sukamanah.",
  },
  {
    date: "Oktober 2026",
    description: "Melalui Musyawarah Besar, disusun AD/ART organisasi.",
  },
];

const organizationActivities = [
  "Pembinaan pemuda",
  "Sosial kemasyarakatan",
  "Pelatihan",
  "Olahraga",
  "Seni budaya",
  "Lingkungan",
  "Ekonomi produktif",
  "Pemberdayaan masyarakat",
];

const supervisoryGroups = [
  {
    title: "Pembina",
    members: [
      { name: "H. Dede Rahim", detail: "Kepala Desa Sukamanah" },
      {
        name: "Dr. H. Cecep Suhendar, S.Pd., M.Si.",
        detail: "Anggota DPRD Kabupaten Bandung",
      },
    ],
  },
  {
    title: "Penasihat",
    members: [
      {
        name: "Dadi Febrianto, A.M.K.",
        detail: "Ketua BPD Desa Sukamanah",
      },
    ],
  },
];

const coreManagement = [
  { title: "Ketua", name: "Ramadan Oktaviana" },
  { title: "Sekretaris", name: "Siti Nurhasanah" },
  { title: "Bendahara", name: "Citra Nurrani" },
];

const divisions = [
  {
    title: "Divisi Kesejahteraan Sosial",
    members: [
      "Engkus Kusnadi",
      "Denis Adnan Fajar",
      "Fashan Hasbi Sofwan",
      "Anggi Dewi Fitriani",
      "Iis Nurfitriani",
    ],
  },
  {
    title: "Divisi Pendidikan, Pelatihan & Kerohanian",
    members: [
      "Ilman Khoirul Anwar",
      "Azka Hilmawan",
      "Syifa Seftia Az-Zahra",
      "Annisa Fitri Novalia",
      "Lia",
    ],
  },
  {
    title: "Divisi Pengembangan Potensi & Ekonomi Kreatif",
    members: [
      "Agus Kusnadi",
      "Iqbal Muhammad Rasya",
      "Widara Cahaya Mustika",
      "Salsa Herdianti",
      "Silvia Septiani",
    ],
  },
  {
    title: "Divisi Olahraga, Seni & Budaya",
    members: [
      "Tri Octaviani",
      "Ade Reza Taryana",
      "Dika Adi Rahma Putra",
      "Najwa Tusifa Andrianty",
      "Nur Latipah Pebiola",
    ],
  },
  {
    title: "Divisi Hubungan Masyarakat & Kerja Sama",
    members: [
      "Wida Adila Nurfadillah",
      "Mahesa",
      "Treza Subangkit",
      "Chelsea Zahra Mahesti",
      "Aulya Septyani",
    ],
  },
  {
    title: "Divisi Advokasi, Hukum & Lingkungan Hidup",
    members: [
      "Faizal Akbar Budiansyah",
      "Salsa Rabi Awalia",
      "Qothrunnada Permata Utami",
      "Bayu Diansyah",
    ],
  },
  {
    title: "Divisi Logistik",
    members: [
      "Rizal Somantri",
      "Pirmansah",
      "Muhammad Rully Ramdni",
      "Syamsi Nur Ilham",
      "Firman Septi Gunawan",
      "Kayla Maharani Dzulhijjah",
      "Naisya Sakura Aprilia",
    ],
  },
];

const logoElements = [
  "Lingkaran",
  "Tulisan Karang Taruna dan Sareundeuk",
  "Lambang Karang Taruna",
  "Identitas Sukamanah dan Rancaekek",
  "Kujang",
  "Warna hitam, kuning, merah, dan putih",
];

export default function OrganizationProfile() {
  return (
    <section
      id="karang-taruna"
      className="bg-primary-charcoal px-5 py-20 text-warm-white sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-primary-yellow">
            Profil Organisasi
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Karang Taruna Sareundeuk
          </h2>
          <p className="mt-5 text-base leading-7 text-warm-white/75 sm:text-lg sm:leading-8">
            Wadah pemuda-pemudi Desa Sukamanah untuk seiring sejalan, bergerak
            bersama, dan mengambil bagian dalam kehidupan masyarakat.
          </p>
        </header>

        <section aria-labelledby="organisasi-sejarah" className="mt-20 lg:mt-28">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-primary-yellow">
                Jejak Organisasi
              </p>
              <h3
                id="organisasi-sejarah"
                className="mt-3 font-heading text-2xl font-semibold sm:text-3xl"
              >
                Sejarah Singkat
              </h3>
              <p className="mt-4 max-w-md leading-7 text-warm-white/70">
                Perjalanan organisasi dimulai dari inisiatif pemuda-pemudi desa
                dan berlanjut dengan penyusunan aturan bersama.
              </p>
            </div>

            <ol className="relative space-y-8 border-l border-primary-yellow/60 pl-6 sm:pl-8">
              {organizationHistory.map((event) => (
                <li key={event.date} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-primary-charcoal bg-primary-yellow ring-2 ring-primary-yellow sm:-left-[39px]"
                  />
                  <p className="font-heading text-lg font-semibold text-warm-white">
                    {event.date}
                  </p>
                  <p className="mt-1 leading-7 text-warm-white/70">
                    {event.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="makna-sareundeuk" className="mt-20 lg:mt-28">
          <div className="overflow-hidden rounded-3xl bg-warm-white text-primary-charcoal">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-6 sm:p-10 lg:p-14">
                <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-neutral-grey">
                  Nilai yang menyatukan
                </p>
                <h3
                  id="makna-sareundeuk"
                  className="mt-3 font-heading text-2xl font-semibold sm:text-3xl"
                >
                  Makna Nama Sareundeuk
                </h3>
                <p className="mt-5 text-lg leading-8 text-primary-charcoal/80">
                  Berasal dari bahasa Sunda, Sareundeuk bermakna seiring
                  sejalan, kompak, dan bergerak bersama.
                </p>
              </div>
              <div className="grid grid-cols-1 divide-y divide-primary-charcoal/10 bg-white/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {["Kebersamaan", "Kekeluargaan", "Gotong royong"].map(
                  (value, index) => (
                    <div
                      key={value}
                      className="flex items-center gap-4 px-6 py-5 sm:flex-col sm:items-start sm:justify-center sm:px-5 sm:py-8"
                    >
                      <span className="font-heading text-sm font-semibold text-primary-yellow">
                        0{index + 1}
                      </span>
                      <p className="font-heading text-base font-semibold sm:text-lg">
                        {value}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="tujuan-organisasi" className="mt-20 lg:mt-28">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-primary-yellow">
                Peran dan kegiatan
              </p>
              <h3
                id="tujuan-organisasi"
                className="mt-3 font-heading text-2xl font-semibold sm:text-3xl"
              >
                Tujuan dan Peran Organisasi
              </h3>
              <p className="mt-4 leading-7 text-warm-white/70">
                Berdasarkan materi kegiatan yang tersedia, organisasi menjadi
                wadah pembinaan dan partisipasi pemuda serta mendorong kontribusi
                dalam kehidupan sosial dan pemberdayaan masyarakat.
              </p>
              <p className="mt-5 inline-flex rounded-full border border-primary-yellow/50 px-4 py-2 text-sm font-semibold text-primary-yellow">
                Rentang usia anggota: 13–45 tahun
              </p>
            </div>

            <div>
              <h4 className="font-heading text-lg font-semibold text-warm-white">
                Kegiatan organisasi
              </h4>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {organizationActivities.map((activity, index) => (
                  <li
                    key={activity}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-yellow/15 font-heading text-xs font-semibold text-primary-yellow"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-warm-white/90 sm:text-base">
                      {activity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="struktur-organisasi" className="mt-20 lg:mt-28">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-primary-yellow">
                Tata kelola
              </p>
              <h3
                id="struktur-organisasi"
                className="mt-3 font-heading text-2xl font-semibold sm:text-3xl"
              >
                Struktur Kepengurusan
              </h3>
            </div>
            <p className="inline-flex w-fit rounded-full border border-primary-yellow/40 px-4 py-2 font-heading text-sm font-semibold text-primary-yellow">
              Masa Bakti 2026–2031
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {supervisoryGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-2xl border border-primary-yellow/30 bg-white/[0.06] p-5 sm:p-6"
              >
                <h4 className="font-heading text-lg font-semibold text-primary-yellow">
                  {group.title}
                </h4>
                <ul className="mt-4 space-y-4">
                  {group.members.map((member) => (
                    <li key={member.name}>
                      <p className="font-semibold text-warm-white">
                        {member.name}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-warm-white/65">
                        {member.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="mx-auto flex h-12 w-px flex-col items-center bg-primary-yellow/50"
          >
            <span className="-mb-1 size-2 rounded-full bg-primary-yellow" />
          </div>

          <div className="rounded-3xl border border-primary-yellow/40 bg-primary-yellow/[0.08] p-5 sm:p-7">
            <h4 className="text-center font-heading text-lg font-semibold text-primary-yellow">
              Pengurus Inti
            </h4>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {coreManagement.map((person) => (
                <li
                  key={person.title}
                  className="rounded-2xl border border-white/10 bg-primary-charcoal/60 p-4 text-center sm:p-5"
                >
                  <p className="text-sm font-medium text-warm-white/65">
                    {person.title}
                  </p>
                  <p className="mt-2 font-heading font-semibold text-warm-white">
                    {person.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div
            aria-hidden="true"
            className="mx-auto h-10 w-px bg-primary-yellow/50"
          />
          <div className="border-t border-primary-yellow/30 pt-6">
            <p className="text-center font-heading text-sm font-semibold uppercase tracking-[0.18em] text-primary-yellow">
              Tujuh Divisi
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {divisions.map((division) => (
                <li
                  key={division.title}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full border-2 border-primary-charcoal bg-primary-yellow"
                  />
                  <h4 className="font-heading text-base font-semibold leading-6 text-warm-white sm:text-lg">
                    {division.title}
                  </h4>
                  <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                    {division.members.map((member) => (
                      <li
                        key={member}
                        className="flex items-start gap-2 text-sm leading-6 text-warm-white/75"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-yellow"
                        />
                        <span>{member}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="identitas-organisasi" className="mt-20 lg:mt-28">
          <div className="grid gap-8 rounded-3xl bg-warm-white p-6 text-primary-charcoal sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14 lg:p-14">
            <div className="flex justify-center">
              <Image
                src="/logo/logo-sreundeuk.jpg"
                alt="Logo asli Karang Taruna Sareundeuk, Sukamanah, Rancaekek"
                width={640}
                height={640}
                sizes="(max-width: 1024px) 80vw, 360px"
                className="size-56 rounded-full border-4 border-primary-charcoal/10 object-cover sm:size-72"
              />
            </div>
            <div>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-neutral-grey">
                Lambang dan warna
              </p>
              <h3
                id="identitas-organisasi"
                className="mt-3 font-heading text-2xl font-semibold sm:text-3xl"
              >
                Logo dan Identitas Organisasi
              </h3>
              <p className="mt-4 leading-7 text-neutral-grey">
                Logo asli ditampilkan tanpa perubahan. Unsur-unsur berikut
                dicatat sebagai bagian visual yang tampak pada logo.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {logoElements.map((element) => (
                  <li key={element} className="flex items-start gap-3 leading-6">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-2 shrink-0 rounded-full bg-primary-yellow"
                    />
                    <span>{element}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-neutral-grey">
                Materi yang tersedia belum merinci arti simbolik setiap unsur
                dan warna, sehingga bagian ini tidak memberi tafsir tambahan.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
