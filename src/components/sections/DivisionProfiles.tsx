import {
  advocacyCalendar,
  advocacyPrograms,
  economicCalendar,
  economicPrograms,
  humasPrograms,
  type CalendarItem,
  type Program,
} from "@/data/program-kerja";

type Division = {
  name: string;
  summary: string;
  source: string;
  background?: string;
  scope?: string[];
  functions?: string[];
  principles?: string[];
  vision?: string;
  missions?: string[];
  motto?: { title: string; meaning: string };
  trilogy?: { title: string; meaning: string }[];
  slogan?: string;
  logoMeanings?: { element: string; meaning: string }[];
  programs?: Program[];
  calendar?: CalendarItem[];
  unavailable?: boolean;
};

const educationLogoMeanings = [
  {
    element: "Lingkaran",
    meaning: "Persatuan, kesinambungan, dan kebersamaan anggota.",
  },
  {
    element: "Bingkai lingkaran ganda",
    meaning: "Komitmen, perlindungan nilai, dan keteguhan organisasi.",
  },
  {
    element: "Perisai dengan ujung bawah",
    meaning: "Keteguhan pendirian dan perlindungan terhadap nilai-nilai luhur.",
  },
  {
    element: "Bintang di bagian atas",
    meaning: "Cita-cita tinggi, arah perjuangan, dan harapan masa depan.",
  },
  {
    element: "Ranting daun kanan dan kiri",
    meaning: "Pertumbuhan, perkembangan, pencapaian, dan keseimbangan.",
  },
  {
    element: "Empat ornamen bunga di sisi kiri dan kanan",
    meaning:
      "Potensi generasi muda yang tumbuh melalui pendidikan, pembinaan, dan pendampingan.",
  },
  {
    element: "Bunga geometris delapan kelopak (teratai)",
    meaning:
      "Keberagaman potensi, keharmonisan, dan ilmu yang terus berkembang.",
  },
  {
    element: "Cahaya di pusat bunga",
    meaning:
      "Ilmu pengetahuan, pencerahan, dan nilai spiritual sebagai pusat kehidupan.",
  },
  {
    element: "Buku terbuka",
    meaning: "Pendidikan, literasi, pembelajaran, dan keterbukaan terhadap pengetahuan.",
  },
  {
    element: "Dua halaman buku",
    meaning: "Keseimbangan antara pengetahuan dan penerapannya dalam kehidupan.",
  },
  {
    element: "Pita di bagian bawah",
    meaning: "Wadah untuk menyampaikan prinsip dan semboyan perjuangan divisi.",
  },
  {
    element: "Bentuk menyerupai api",
    meaning: "Semangat, motivasi, dan gairah untuk terus berkembang.",
  },
  {
    element: "Bentuk menyerupai daun",
    meaning: "Pertumbuhan, kehidupan, dan proses pembinaan.",
  },
  {
    element: "Tulang atau urat daun",
    meaning: "Pengetahuan yang menjadi dasar dan menghubungkan berbagai potensi.",
  },
  {
    element: "Tiga garis emas",
    meaning: "Tiga tahapan gerakan divisi: Ngaji, Ngarti, Ngabakti.",
  },
  {
    element: "Arah bentuk yang menjulang",
    meaning: "Perkembangan, kemajuan, dan cita-cita yang terus ditingkatkan.",
  },
  {
    element: "Tipografi serif",
    meaning: "Kewibawaan, intelektualitas, tradisi, dan karakter yang kuat.",
  },
  {
    element: "Susunan tiga baris tulisan",
    meaning: "Penegasan bahwa ketiga nilai merupakan satu kesatuan.",
  },
  {
    element: "Emas muda (#B3902F, perkiraan)",
    meaning: "Prestasi, harapan, keunggulan, dan potensi generasi muda.",
  },
  {
    element: "Emas tua / gold olive (#916E00)",
    meaning: "Kemuliaan, kebijaksanaan, keteguhan, dan kedewasaan dalam bertindak.",
  },
  {
    element: "Putih (#FFFFFF)",
    meaning: "Ketulusan, kesucian niat, keterbukaan, dan kejujuran.",
  },
  {
    element: "Hitam (#171717)",
    meaning: "Ketegasan, kedisiplinan, dan kekuatan prinsip.",
  },
];

const divisions: Division[] = [
  {
    name: "Divisi Kesejahteraan Sosial",
    summary: "Belum ada dokumen materi khusus untuk divisi ini.",
    source: "",
    unavailable: true,
  },
  {
    name: "Divisi Pendidikan, Pelatihan & Kerohanian",
    summary:
      "Membina generasi muda agar berilmu, terampil, beriman, berakhlak mulia, dan berkontribusi bagi masyarakat.",
    source: "MAKNA DAN LOGO DIVISI PENDIDIKAN PELATIHAN DAN KEROHANIAN.pdf",
    vision:
      "Terwujudnya generasi muda Karang Taruna Sareundeuk Desa Sukamanah yang berilmu, terampil, beriman, berakhlak mulia, serta mampu memberikan kontribusi nyata bagi kemajuan masyarakat.",
    missions: [
      "Meningkatkan kualitas pendidikan generasi muda melalui kegiatan pembelajaran, literasi, diskusi, pendampingan, dan pengembangan wawasan.",
      "Mengembangkan keterampilan dan potensi pemuda melalui pelatihan, pembinaan, pengembangan kreativitas, kepemimpinan, kewirausahaan, dan keterampilan praktis.",
      "Membangun karakter dan spiritualitas generasi muda melalui pembinaan keagamaan, penguatan nilai moral, pembiasaan ibadah, dan penanaman akhlak mulia.",
      "Mendorong pengamalan ilmu dan keterampilan melalui kegiatan sosial, pengabdian masyarakat, dan kontribusi nyata bagi lingkungan Desa Sukamanah.",
      "Menciptakan lingkungan pembelajaran yang kolaboratif dan berkelanjutan dengan melibatkan pemerintah desa, lembaga pendidikan, tokoh agama, tokoh masyarakat, dan berbagai pihak terkait.",
      "Menanamkan nilai-nilai kebersamaan, kedisiplinan, tanggung jawab, dan kepedulian sosial sebagai karakter dasar generasi muda Sareundeuk.",
    ],
    motto: {
      title: "Ad Astra Per Aspera",
      meaning: "Menuju cita-cita luhur melalui ketekunan dan perjuangan.",
    },
    trilogy: [
      { title: "Ngaji", meaning: "Menuntut ilmu dan memperluas wawasan." },
      {
        title: "Ngarti",
        meaning: "Memahami, mengembangkan kemampuan, dan menerapkan ilmu.",
      },
      { title: "Ngabakti", meaning: "Mengamalkan ilmu melalui akhlak dan pengabdian." },
    ],
    slogan:
      "Ilmu sebagai bekal, iman sebagai pedoman, pengabdian sebagai tujuan.",
    logoMeanings: educationLogoMeanings,
  },
  {
    name: "Divisi Pengembangan Potensi & Ekonomi Kreatif",
    summary:
      "Membuka ruang produktif bagi pemuda dan membantu potensi ekonomi warga berkembang melalui kegiatan yang realistis, terukur, dan sesuai sumber daya.",
    source:
      "Rancangan_Proker_SOP_Divisi_Pengembangan_Potensi_Ekonomi_Kreatif_Sareundeuk_2026-2027.docx",
    background:
      "Pada periode awal, divisi memprioritaskan perdagangan berbasis pesanan, pemasaran produk warga, pemanfaatan keterampilan kreatif pemuda, dan pemetaan potensi. Kegiatan dapat dimulai skala kecil, tanpa mengharuskan modal besar atau usaha permanen.",
    scope: [
      "Mengembangkan potensi produktif pemuda berdasarkan minat, keterampilan, produk, dan jasa yang dapat ditawarkan.",
      "Mengembangkan kegiatan ekonomi sederhana: pre-order sembako, titip jual produk warga, lapak pemuda, dan pesanan konsumsi kegiatan.",
      "Mengembangkan jasa kreatif seperti desain grafis, percetakan melalui mitra, banner, undangan, poster, fotografi, editing video, dan dokumentasi.",
      "Memberi pendampingan dasar usaha, pemasaran, penentuan harga, pencatatan transaksi, dan evaluasi kelayakan.",
      "Menjajaki pemasok, pelanggan, toko mitra, BUMDes, UMKM, dan pihak lain yang relevan.",
    ],
    principles: [
      "Memulai program berdasarkan kebutuhan nyata dan kemampuan anggota.",
      "Menghitung harga, modal, komisi, margin, biaya, dan risiko stok sebelum transaksi.",
      "Mengutamakan pre-order, titip jual, atau kerja sama pemasok untuk mengurangi risiko stok.",
      "Memisahkan pencatatan dana kegiatan dan dana usaha sesuai keputusan organisasi; menyimpan bukti transaksi.",
      "Tidak menjanjikan harga murah, keuntungan, atau keberhasilan sebelum data dan kesepakatan tersedia.",
      "Menetapkan penanggung jawab, jadwal, keluaran, indikator, dokumentasi, dan evaluasi untuk setiap program.",
    ],
    programs: economicPrograms,
    calendar: economicCalendar,
  },
  {
    name: "Divisi Olahraga, Seni & Budaya",
    summary: "Belum ada dokumen materi khusus untuk divisi ini.",
    source: "",
    unavailable: true,
  },
  {
    name: "Divisi Hubungan Masyarakat & Kerja Sama",
    summary:
      "Bertanggung jawab menjalin komunikasi dan kerja sama dengan pihak internal maupun eksternal, serta mengelola publikasi dan dokumentasi kegiatan untuk membangun citra positif Karang Taruna.",
    source: "PROKER HUMAS & KERJA SAMA.pdf",
    functions: [
      "Menjalin komunikasi dan kerja sama dengan Pemerintah Desa, tokoh masyarakat, serta pihak eksternal untuk mendukung program kerja Karang Taruna.",
      "Mengelola publikasi, media sosial, dan dokumentasi kegiatan untuk menyebarkan informasi, membangun citra positif, serta mendukung evaluasi dan pelaporan Karang Taruna.",
    ],
    scope: [
      "Hubungan dengan Pemerintah Desa dan tokoh masyarakat.",
      "Kerja sama dengan pihak eksternal dan sponsor.",
      "Publikasi serta pengelolaan media sosial.",
      "Dokumentasi dan arsip kegiatan.",
    ],
    programs: humasPrograms,
  },
  {
    name: "Divisi Advokasi, Hukum & Lingkungan Hidup",
    summary:
      "Menampung aspirasi dan mengawal tindak lanjut, meningkatkan kesadaran hukum serta jalur rujukan, dan mendorong pemantauan serta kepedulian lingkungan.",
    source: "PROGRAM KERJA DIVISI ADVOKASI, HUKUM DAN LINGKUNGAN HIDUP.pdf",
    scope: [
      "Advokasi: menampung aspirasi, mendokumentasikan persoalan, menyampaikan usulan atau pengaduan, dan mengawal tindak lanjut.",
      "Hukum: meningkatkan kesadaran hukum, memberi informasi jalur pengaduan, dan merujuk persoalan kepada pihak berwenang atau tenaga kompeten.",
      "Lingkungan hidup: memetakan kebersihan dan lingkungan, mendorong pengurangan sampah, memantau berdasarkan observasi, serta mengawal pengaduan ke instansi teknis.",
    ],
    principles: [
      "Berbasis fakta dan bukti yang dapat diperiksa; dugaan tidak dipublikasikan sebagai kesimpulan terbukti.",
      "Mengutamakan dialog, keselamatan, perlindungan anak dan kelompok rentan, serta kerahasiaan data pribadi.",
      "Menghormati kewenangan pemerintah desa, kecamatan, DLH, aparat penegak hukum, dan lembaga bantuan hukum.",
      "Setiap kegiatan memiliki penanggung jawab, jadwal, keluaran, dokumentasi, dan evaluasi.",
      "Tidak melakukan konfrontasi, penyitaan, pemeriksaan paksa, penegakan hukum mandiri, atau pengambilan sampel berisiko tanpa pihak kompeten.",
    ],
    programs: advocacyPrograms,
    calendar: advocacyCalendar,
  },
  {
    name: "Divisi Logistik",
    summary: "Belum ada dokumen materi khusus untuk divisi ini.",
    source: "",
    unavailable: true,
  },
];

function Disclosure({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-t border-primary-charcoal/10 py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-sm font-semibold text-primary-charcoal marker:hidden">
        {title}
        <span
          aria-hidden="true"
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-yellow/15 text-primary-charcoal transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="pt-4 text-sm leading-6 text-neutral-grey">{children}</div>
    </details>
  );
}

function TextList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-yellow" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ProgramDetails({ program }: { program: Program }) {
  return (
    <details className="rounded-xl border border-primary-charcoal/10 bg-warm-white p-4">
      <summary className="cursor-pointer list-none font-heading text-sm font-semibold text-primary-charcoal marker:hidden">
        <span className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>{program.name}</span>
          <span className="w-fit rounded-full bg-accent-red/10 px-3 py-1 text-xs font-semibold text-accent-red">
            Rancangan Program Kerja
          </span>
        </span>
      </summary>
      <div className="mt-4 space-y-3 border-t border-primary-charcoal/10 pt-4 text-sm leading-6 text-neutral-grey">
        <p>
          <span className="font-semibold text-primary-charcoal">Fokus: </span>
          {program.focus}
        </p>
        {program.period && (
          <p>
            <span className="font-semibold text-primary-charcoal">Waktu: </span>
            {program.period}
          </p>
        )}
        {program.steps && (
          <div>
            <p className="mb-2 font-semibold text-primary-charcoal">
              SOP dalam dokumen:
            </p>
            <ol className="list-inside list-decimal space-y-2">
              {program.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </details>
  );
}

function CalendarTable({ items }: { items: CalendarItem[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-primary-charcoal/10">
      <table className="w-full min-w-[680px] border-collapse text-left text-sm">
        <thead className="bg-primary-charcoal text-warm-white">
          <tr>
            <th className="px-4 py-3 font-heading font-semibold">Bulan</th>
            <th className="px-4 py-3 font-heading font-semibold">Rencana kegiatan</th>
            <th className="px-4 py-3 font-heading font-semibold">Penanggung jawab</th>
            <th className="px-4 py-3 font-heading font-semibold">Keluaran</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.month} className="border-t border-primary-charcoal/10 align-top">
              <th scope="row" className="whitespace-nowrap px-4 py-3 font-semibold text-primary-charcoal">
                {item.month}
              </th>
              <td className="px-4 py-3">{item.activity}</td>
              <td className="px-4 py-3">{item.responsible}</td>
              <td className="px-4 py-3">{item.output}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DivisionMaterial({ division }: { division: Division }) {
  return (
    <article className="flex flex-col rounded-3xl bg-white p-5 text-primary-charcoal shadow-sm ring-1 ring-primary-charcoal/5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="max-w-xl font-heading text-xl font-semibold leading-7 sm:text-2xl">
          {division.name}
        </h3>
        <span className="rounded-full bg-primary-yellow/15 px-3 py-1 text-xs font-semibold text-primary-charcoal">
          Materi tersedia
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-neutral-grey">{division.summary}</p>

      <div className="mt-5">
        {division.background && (
          <Disclosure title="Latar belakang">
            <p>{division.background}</p>
          </Disclosure>
        )}
        {division.vision && (
          <Disclosure title="Visi dan misi">
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-semibold text-primary-charcoal">Visi</h4>
                <p>{division.vision}</p>
              </div>
              {division.missions && (
                <div>
                  <h4 className="mb-2 font-semibold text-primary-charcoal">Misi</h4>
                  <ol className="list-inside list-decimal space-y-2">
                    {division.missions.map((mission) => (
                      <li key={mission}>{mission}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </Disclosure>
        )}
        {division.motto && (
          <Disclosure title="Motto dan Trilogi Gerak">
            <div className="space-y-4">
              <div>
                <p className="font-heading font-semibold uppercase tracking-wide text-primary-charcoal">
                  {division.motto.title}
                </p>
                <p className="mt-1">{division.motto.meaning}</p>
              </div>
              {division.trilogy?.map((item) => (
                <div key={item.title}>
                  <h4 className="font-semibold text-primary-charcoal">{item.title}</h4>
                  <p>{item.meaning}</p>
                </div>
              ))}
              {division.slogan && (
                <p className="border-l-2 border-primary-yellow pl-4 font-medium italic text-primary-charcoal">
                  “{division.slogan}”
                </p>
              )}
            </div>
          </Disclosure>
        )}
        {division.logoMeanings && (
          <Disclosure title="Semboyan, makna logo, dan warna">
            <div className="space-y-4">
              <p className="font-semibold uppercase text-primary-charcoal">
                “{division.slogan}”
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {division.logoMeanings.map((item) => (
                  <li key={item.element} className="rounded-xl bg-warm-white p-3">
                    <p className="font-semibold text-primary-charcoal">{item.element}</p>
                    <p className="mt-1">{item.meaning}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Disclosure>
        )}
        {division.functions && (
          <Disclosure title="Fungsi divisi">
            <TextList items={division.functions} />
          </Disclosure>
        )}
        {division.scope && (
          <Disclosure title="Ruang lingkup kerja">
            <TextList items={division.scope} />
          </Disclosure>
        )}
        {division.principles && (
          <Disclosure title="Prinsip pelaksanaan">
            <TextList items={division.principles} />
          </Disclosure>
        )}
        {division.programs && (
          <Disclosure title="Program kerja dan fokus kegiatan">
            <div className="space-y-3">
              {division.programs.map((program) => (
                <ProgramDetails key={program.name} program={program} />
              ))}
            </div>
          </Disclosure>
        )}
        {division.calendar && (
          <Disclosure title="Kalender program kerja">
            <CalendarTable items={division.calendar} />
          </Disclosure>
        )}
        {!division.calendar && division.name.includes("Hubungan Masyarakat") && (
          <p className="border-t border-primary-charcoal/10 py-4 text-sm leading-6 text-neutral-grey">
            Dokumen Humas tidak mencantumkan kalender program atau SOP.
          </p>
        )}
        {division.name.includes("Pendidikan") && (
          <p className="border-t border-primary-charcoal/10 py-4 text-sm leading-6 text-neutral-grey">
            Dokumen ini memuat visi-misi, motto, Trilogi Gerak, semboyan, dan
            makna logo; tidak mencantumkan daftar program kerja, kalender, atau
            SOP.
          </p>
        )}
      </div>
      <p className="mt-auto border-t border-primary-charcoal/10 pt-4 text-xs leading-5 text-neutral-grey">
        Sumber: {division.source}
      </p>
    </article>
  );
}

export default function DivisionProfiles() {
  return (
    <section
      id="bidang"
      className="bg-warm-white px-5 py-20 text-primary-charcoal sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-neutral-grey">
            Profil dan ruang lingkup
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Bidang Organisasi
          </h2>
          <p className="mt-5 text-base leading-7 text-neutral-grey sm:text-lg sm:leading-8">
            Kenali materi, ruang lingkup, dan rancangan kegiatan setiap divisi
            Karang Taruna Sareundeuk.
          </p>
        </header>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {divisions.map((division) =>
            division.unavailable ? (
              <article
                key={division.name}
                className="flex min-h-52 flex-col justify-between rounded-3xl border border-dashed border-primary-charcoal/20 bg-white/60 p-6 sm:p-8"
              >
                <div>
                  <h3 className="font-heading text-xl font-semibold sm:text-2xl">
                    {division.name}
                  </h3>
                  <p className="mt-4 leading-7 text-neutral-grey">
                    Informasi akan diperbarui.
                  </p>
                </div>
                <span className="mt-6 w-fit rounded-full bg-primary-charcoal/5 px-3 py-1 text-xs font-semibold text-neutral-grey">
                  Materi belum tersedia
                </span>
              </article>
            ) : (
              <DivisionMaterial key={division.name} division={division} />
            ),
          )}
        </div>

        <p className="mt-8 text-center text-sm leading-6 text-neutral-grey">
          Seluruh program kerja yang tercantum masih berupa rancangan dan belum
          dianggap sebagai program resmi sebelum disahkan melalui Rapat Kerja.
        </p>
      </div>
    </section>
  );
}
