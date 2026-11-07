export type Program = {
  name: string;
  focus: string;
  period?: string;
  steps?: string[];
};

export type CalendarItem = {
  month: string;
  activity: string;
  responsible: string;
  output: string;
};

export const advocacyPrograms: Program[] = [
  {
    name: "Sareundeuk Dengar Warga",
    focus: "Penyerapan aspirasi, keluhan, dan kebutuhan masyarakat secara terstruktur.",
    period: "Peluncuran Desember 2026; penerimaan laporan dan pembaruan status setiap bulan sepanjang periode.",
    steps: [
      "Publikasikan kanal aspirasi dan aturan privasi.",
      "Terima laporan dan berikan konfirmasi penerimaan bila identitas atau kontak tersedia.",
      "Catat laporan ke register dan berikan kode kasus.",
      "Lakukan verifikasi awal dan klasifikasi tingkat urgensi.",
      "Tetapkan penanggung jawab dan jalur tindak lanjut.",
      "Teruskan laporan melalui surat, audiensi, atau kanal resmi yang sesuai.",
      "Catat respons, sampaikan perkembangan kepada pelapor, dan arsipkan dokumen.",
      "Evaluasi jumlah laporan, status, kendala, dan pola masalah setiap akhir bulan.",
    ],
  },
  {
    name: "Sareundeuk Peta Masalah",
    focus: "Pemetaan persoalan fasilitas umum, sosial, kebersihan, saluran air, dan lingkungan.",
    period: "Pemetaan awal November 2026; pembaruan Januari, April, Juli, dan Oktober 2027.",
    steps: [
      "Tentukan area pemetaan dan koordinasikan jadwal dengan RT/RW.",
      "Gunakan formulir standar berisi lokasi, tanggal, kategori, uraian fakta, foto, dan potensi risiko.",
      "Lakukan observasi dari tempat yang aman dan dapat diakses secara sah.",
      "Pisahkan fakta yang diamati dari informasi yang disampaikan orang lain.",
      "Berikan tingkat prioritas berdasarkan keselamatan, dampak, dan kemungkinan penanganan.",
      "Validasi daftar dengan pihak lokal yang relevan.",
      "Susun peta dan rekomendasi awal untuk dibahas pada rapat bulanan.",
      "Perbarui status setelah ada penanganan atau perubahan kondisi.",
    ],
  },
  {
    name: "Kawal Aspirasi sampai Tuntas",
    focus: "Pengawalan aspirasi yang membutuhkan tindak lanjut pemerintah desa atau instansi lain.",
    period: "Sesuai laporan prioritas; rapat status setiap bulan; rekap pada Juni dan Oktober 2027.",
    steps: [
      "Periksa kembali bukti dan kronologi aspirasi.",
      "Sepakati rumusan aspirasi dengan pihak yang terdampak sejauh aman dan memungkinkan.",
      "Tentukan penerima surat sesuai kewenangan.",
      "Siapkan surat, lampiran bukti, dan permintaan tindak lanjut yang jelas.",
      "Mintakan persetujuan pengurus sesuai tata kelola organisasi.",
      "Kirim surat dan simpan bukti penerimaan atau nomor tiket.",
      "Catat jawaban, komitmen, penanggung jawab, dan waktu tindak lanjut.",
      "Lakukan follow-up melalui kanal resmi dan laporkan status pada rapat bulanan.",
    ],
  },
  {
    name: "Sareundeuk Sadar Hukum",
    focus:
      "Peningkatan kesadaran hukum masyarakat melalui Informasi Hukum, Pengaduan Masyarakat, dan Pemuda Pelopor Pencegahan Konflik.",
    period:
      "Panduan disiapkan Desember 2026; edukasi pertama Februari 2027; kegiatan pencegahan konflik Mei 2027; edukasi kedua dan pembaruan panduan Agustus 2027.",
    steps: [
      "Identifikasi kebutuhan informasi hukum dan persoalan yang sering muncul melalui aspirasi warga, pemetaan masalah, serta koordinasi dengan RT/RW.",
      "Kumpulkan dan verifikasi materi hukum, kanal pengaduan, kontak instansi, serta prosedur rujukan melalui sumber resmi.",
      "Susun panduan berbahasa sederhana yang mencakup informasi hukum, langkah pengaduan, dan alur rujukan pencegahan konflik.",
      "Tentukan topik, tujuan, narasumber, peserta, jadwal, biaya, dan tempat edukasi.",
      "Ajukan rencana kepada Koordinator dan pengurus sesuai mekanisme persetujuan organisasi.",
      "Laksanakan edukasi dengan materi yang telah diperiksa; catat kehadiran dan evaluasi pemahaman.",
      "Catat pengaduan dan minta persetujuan sebelum meneruskan data pribadi.",
      "Klasifikasikan pengaduan menurut jenis masalah dan kewenangan yang sesuai.",
      "Bantu menyampaikan pengaduan melalui jalur yang sesuai, simpan bukti, dan pantau tindak lanjut.",
      "Untuk konflik, utamakan rujukan kepada pihak berwenang bila ada ancaman, kekerasan, atau kebutuhan perlindungan; jangan melakukan mediasi sendiri.",
      "Jika aman, dorong komunikasi atau dialog sukarela dengan pendampingan pihak kompeten.",
      "Perbarui panduan minimal setiap tiga bulan atau saat kanal/kebijakan berubah.",
      "Susun laporan agregat dengan menjaga kerahasiaan.",
    ],
  },
  {
    name: "Pojok Informasi Hukum dan Pengaduan",
    focus: "Informasi kanal pengaduan dan rujukan.",
  },
  {
    name: "Pemuda Pelopor Pencegahan Konflik",
    focus: "Pencegahan konflik dan rujukan yang aman.",
  },
  {
    name: "Sareundeuk Bersih Berkelanjutan",
    focus: "Aksi kebersihan rutin di titik prioritas dengan evaluasi keberlanjutan.",
    period: "Setiap bulan mulai Desember 2026; evaluasi titik berulang pada April dan September 2027.",
    steps: [
      "Pilih lokasi berdasarkan peta masalah dan koordinasikan dengan RT/RW atau pemilik lokasi.",
      "Pastikan izin, jadwal, peserta, alat, dan mekanisme pengangkutan tersedia.",
      "Identifikasi risiko lapangan dan hentikan kegiatan bila kondisi tidak aman.",
      "Lakukan briefing singkat dan pembagian tugas.",
      "Hindari penanganan limbah berbahaya yang memerlukan tenaga khusus.",
      "Pastikan sampah dibawa ke sistem pengelolaan yang disepakati.",
      "Dokumentasikan kondisi sebelum-sesudah dan catat jumlah peserta.",
      "Periksa kembali lokasi dan catat apakah masalah berulang.",
    ],
  },
  {
    name: "Bank Sampah dan Gerakan Pilah Sampah",
    focus: "Pemilahan sampah dari sumber dan penjajakan pengelolaan berbasis warga.",
    period: "Penjajakan Januari–Februari 2027; uji coba Maret–Juni 2027; evaluasi September 2027.",
    steps: [
      "Survei kebutuhan dan fasilitas yang sudah tersedia di desa atau wilayah sekitar.",
      "Hubungi pengelola atau DLH untuk mengetahui opsi pembinaan dan persyaratan terkini.",
      "Sepakati skala uji coba, jenis sampah, jadwal, lokasi, dan penanggung jawab.",
      "Sosialisasikan aturan pemilahan kepada warga.",
      "Catat peserta dan jumlah sampah berdasarkan data yang benar-benar ditimbang atau dihitung.",
      "Jaga lokasi penyimpanan agar tidak menimbulkan bau, vektor, atau keluhan baru.",
      "Serahkan sampah hanya kepada mitra atau pengelola yang disepakati.",
      "Evaluasi setiap bulan dan perluas hanya jika sistem uji coba berjalan stabil.",
    ],
  },
  {
    name: "Sareundeuk Jaga Sungai",
    focus: "Pemantauan kondisi sungai dan pengawalan dugaan pencemaran atau penumpukan sampah.",
    period: "Pencatatan awal Januari 2027; pemantauan bulanan atau saat ada kejadian; evaluasi Juni dan Oktober 2027.",
    steps: [
      "Tentukan titik pantau yang aman dan sah bersama warga dan pihak terkait.",
      "Gunakan format catatan yang konsisten dan dokumentasikan waktu serta lokasi.",
      "Catat fakta yang diamati dan pisahkan dari dugaan atau keterangan warga.",
      "Informasikan risiko langsung terhadap keselamatan atau sumber air kepada pihak berwenang dan warga terdampak secara proporsional.",
      "Susun laporan berisi lokasi, waktu, kronologi, dampak, bukti, dan tindak lanjut yang diharapkan.",
      "Laporkan kepada pemerintah desa dan/atau DLH melalui kanal resmi; gunakan SP4N-LAPOR! bila sesuai.",
      "Simpan nomor tiket, bukti penerimaan, jawaban, dan dokumen tambahan.",
      "Pantau status dan publikasikan hanya informasi faktual yang aman.",
    ],
  },
  {
    name: "Satu Pemuda Satu Aksi Hijau",
    focus: "Penghijauan berbasis lokasi yang sesuai dan perawatan tanaman.",
    period: "Perencanaan Juni 2027; penanaman Juli 2027 bila memungkinkan; evaluasi Oktober 2027.",
    steps: [
      "Identifikasi lokasi dan minta persetujuan pihak yang berwenang atas lahan.",
      "Periksa kesesuaian lokasi, sumber air, potensi gangguan utilitas, dan kebutuhan perawatan.",
      "Tentukan jenis dan jumlah bibit sesuai sumber daya yang tersedia.",
      "Buat jadwal kerja, daftar peserta, kebutuhan alat, dan penanggung jawab perawatan.",
      "Laksanakan penanaman dengan prosedur aman dan dokumentasikan lokasi.",
      "Catat jumlah bibit tertanam dan kondisi awal.",
      "Periksa tanaman setelah satu, tiga, dan enam bulan sesuai jadwal yang memungkinkan.",
      "Catat tanaman hidup atau mati dan lakukan penyulaman bila sumber daya serta izin tersedia.",
    ],
  },
];

export const advocacyCalendar: CalendarItem[] = [
  { month: "Nov 2026", activity: "Konsolidasi divisi; bentuk register aspirasi; pemetaan awal masalah; koordinasi RT/RW dan pemerintah desa.", responsible: "Koordinator dan seluruh tim", output: "Rencana kerja final, format register, daftar masalah awal." },
  { month: "Des 2026", activity: "Luncurkan kanal Sareundeuk Dengar Warga; susun Pojok Informasi Hukum; aksi bersih titik prioritas.", responsible: "Tim advokasi, hukum, lingkungan", output: "Kanal aktif, panduan awal, dokumentasi aksi." },
  { month: "Jan 2027", activity: "Publikasi ringkasan masalah prioritas; mulai pemantauan sungai; rapat koordinasi pengaduan.", responsible: "Tim advokasi dan lingkungan", output: "Peta masalah versi 1, catatan pemantauan." },
  { month: "Feb 2027", activity: "Edukasi hukum pertama; konsultasi dengan mitra; penjajakan bank sampah/pengelola sampah.", responsible: "Tim hukum dan lingkungan", output: "Materi edukasi, daftar mitra, catatan kebutuhan." },
  { month: "Mar 2027", activity: "Uji coba pilah sampah di satu wilayah; tindak lanjut aspirasi prioritas.", responsible: "Tim lingkungan dan advokasi", output: "Data peserta dan sampah terpilah, status aspirasi." },
  { month: "Apr 2027", activity: "Aksi Sareundeuk Bersih Berkelanjutan; evaluasi titik sampah berulang.", responsible: "Tim lingkungan", output: "Dokumentasi sebelum-sesudah, daftar titik berulang." },
  { month: "Mei 2027", activity: "Audiensi/penyampaian rekomendasi kepada pihak berwenang; edukasi pencegahan konflik.", responsible: "Koordinator dan tim hukum", output: "Surat, notula, daftar tindak lanjut." },
  { month: "Jun 2027", activity: "Evaluasi semester; laporan pengaduan dan lingkungan; tinjau efektivitas kanal aspirasi.", responsible: "Seluruh tim", output: "Laporan semester dan rencana perbaikan." },
  { month: "Jul 2027", activity: "Penghijauan tahap 1 bila lokasi dan bibit siap; penjadwalan perawatan.", responsible: "Tim lingkungan", output: "Daftar tanaman, lokasi, jadwal perawatan." },
  { month: "Agu 2027", activity: "Edukasi hukum kedua; pemutakhiran panduan pengaduan dan kontak resmi.", responsible: "Tim hukum", output: "Materi pembaruan dan dokumentasi." },
  { month: "Sep 2027", activity: "Evaluasi bank sampah/pilah sampah; pemantauan kondisi sungai dan titik prioritas.", responsible: "Tim lingkungan", output: "Data tren sederhana dan status tindak lanjut." },
  { month: "Okt 2027", activity: "Evaluasi akhir periode; survei masalah berulang; penyusunan laporan dan rekomendasi.", responsible: "Koordinator dan seluruh tim", output: "LPJ program, capaian, indikator, rekomendasi periode berikutnya." },
];

export const economicPrograms: Program[] = [
  {
    name: "Sareundeuk Sembako Hemat",
    focus:
      "Penjualan kebutuhan pokok seperti beras, minyak goreng, gula, telur, dan barang kebutuhan rumah tangga lainnya dengan harga kompetitif melalui sistem pre-order.",
    period: "Uji coba Desember 2026; evaluasi bulanan sampai Oktober 2027.",
    steps: ["Survei pemasok, harga, kualitas, minimum order, dan biaya pengiriman.", "Hitung harga jual dan batas minimal pesanan bila diperlukan.", "Ajukan rencana dan mekanisme keuangan untuk disetujui.", "Publikasikan barang dan buka pemesanan dengan batas waktu jelas.", "Konfirmasi pesanan dan pembayaran sesuai aturan yang diumumkan.", "Pesan barang sesuai jumlah yang disepakati dan simpan bukti transaksi.", "Periksa jumlah dan kondisi barang sebelum dibagikan.", "Serahkan pesanan, catat penerimaan, tangani komplain, dan evaluasi."],
  },
  {
    name: "Titip Jual Produk Warga",
    focus:
      "Membantu pemasaran produk rumahan warga, seperti makanan ringan, kerupuk, kue, atau produk lain yang layak dijual, melalui sistem titip jual atau komisi.",
    period: "Penjajakan Desember 2026; uji coba Januari 2027 dan evaluasi berkala.",
    steps: ["Identifikasi calon produk dan hubungi pemiliknya.", "Periksa produk, harga, kemasan, daya tahan, dan kemampuan pasokan.", "Sepakati jumlah barang, harga, komisi, periode, dan penanganan barang sisa/rusak.", "Catat stok awal dan serahkan bukti penerimaan barang.", "Tempatkan atau tawarkan produk melalui saluran yang disepakati.", "Catat setiap penjualan dan sisa stok.", "Rekonsiliasi hasil penjualan serta bayar bagian pemilik sesuai kesepakatan.", "Evaluasi hasil dan putuskan apakah penitipan dilanjutkan."],
  },
  {
    name: "Lapak Usaha Pemuda",
    focus: "Kesempatan berjualan pada kegiatan desa atau Karang Taruna yang telah terjadwal.",
    period: "Menyesuaikan kalender kegiatan desa/Karang Taruna sepanjang periode.",
    steps: ["Identifikasi kegiatan yang sesuai.", "Minta persetujuan penyelenggara dan ketahui aturannya.", "Umumkan kesempatan lapak beserta syarat dan batas pendaftaran.", "Atur penjual sesuai kapasitas lokasi dan jenis kegiatan.", "Susun denah dan kebutuhan perlengkapan bersama pihak terkait.", "Laksanakan lapak tanpa mengambil alih tugas panitia utama.", "Kumpulkan umpan balik penjual dan catat kendala.", "Evaluasi kelayakan model untuk diulang."],
  },
  {
    name: "Unit Pesanan Konsumsi Kegiatan",
    focus:
      "Menerima dan mengoordinasikan pesanan nasi kotak, makanan ringan, atau minuman untuk rapat dan kegiatan melalui kerja sama dengan UMKM/penjual lokal.",
    period: "Penjajakan Februari 2027; uji coba Maret 2027 dan sesuai kebutuhan setelahnya.",
    steps: ["Terima permintaan dan catat tanggal, jumlah, menu, anggaran, lokasi, dan tenggat.", "Konfirmasi ketersediaan serta harga kepada mitra.", "Ajukan penawaran dengan ketentuan yang jelas.", "Dapatkan konfirmasi pesanan dan mekanisme pembayaran.", "Teruskan pesanan kepada mitra dan pantau persiapannya.", "Periksa jumlah dan kondisi pesanan saat diserahkan.", "Catat pembayaran, biaya mitra, komisi/margin, dan bukti transaksi.", "Minta umpan balik dan evaluasi ketepatan layanan."],
  },
  {
    name: "Sareundeuk Punya Potensi",
    focus:
      "Pendataan sederhana terhadap minat, keterampilan, pengalaman, produk, dan jasa produktif pemuda yang dapat dikembangkan menjadi peluang ekonomi.",
    period: "Pendataan awal November 2026; pemutakhiran Mei dan September 2027.",
    steps: ["Tentukan tujuan pendataan dan data minimum yang diperlukan.", "Siapkan formulir serta penjelasan penggunaan data.", "Koordinasikan pelaksanaan dengan divisi terkait.", "Sebarkan formulir dan beri waktu pengisian sukarela.", "Periksa kelengkapan dan kelompokkan data berdasarkan kategori potensi.", "Minta persetujuan sebelum mencantumkan produk/jasa dalam katalog publik.", "Susun ringkasan tanpa membuka data pribadi.", "Bahas hasil dan rekomendasi; perbarui data secara berkala."],
  },
  {
    name: "Jasa Kreatif Pemuda Sareundeuk",
    focus:
      "Menghimpun dan memasarkan jasa kreatif pemuda, termasuk desain banner, spanduk, poster, undangan, desain media sosial, fotografi produk, editing video, dokumentasi, serta pemesanan cetak melalui percetakan mitra.",
    period: "Pendataan Februari 2027; katalog awal Maret 2027; pengembangan pelanggan sepanjang periode.",
    steps: ["Data penyedia jasa dan minta izin untuk menampilkan layanannya.", "Verifikasi layanan, contoh karya, kapasitas, harga, dan waktu pengerjaan.", "Identifikasi percetakan mitra untuk layanan produksi fisik.", "Susun katalog bersama Divisi Humas.", "Terima permintaan dan catat spesifikasi pekerjaan.", "Konfirmasi harga, revisi, tenggat, pembayaran, dan penanggung jawab.", "Minta persetujuan desain akhir sebelum produksi/cetak.", "Serahkan hasil, catat transaksi, minta umpan balik, dan arsipkan."],
  },
];

export const economicCalendar: CalendarItem[] = [
  { month: "Nov 2026", activity: "Konsolidasi; format pencatatan; pemetaan potensi; survei sembako dan pemasok.", responsible: "Koordinator dan seluruh tim", output: "Format data, daftar pemasok, rancangan uji coba." },
  { month: "Des 2026", activity: "Uji coba Sareundeuk Sembako Hemat; data produk warga untuk titip jual.", responsible: "Tim usaha dan pemasaran", output: "Rekap pesanan, transaksi, evaluasi." },
  { month: "Jan 2027", activity: "Evaluasi sembako; uji coba titip jual jika produk dan mitra siap.", responsible: "Tim usaha", output: "Daftar produk, kesepakatan komisi, rekap penjualan." },
  { month: "Feb 2027", activity: "Daftar jasa kreatif pemuda; survei kebutuhan desain/percetakan.", responsible: "Tim potensi dan jasa kreatif", output: "Katalog awal jasa dan daftar penyedia." },
  { month: "Mar 2027", activity: "Uji layanan pesanan konsumsi untuk kegiatan terjadwal.", responsible: "Tim usaha dan mitra UMKM", output: "Daftar menu, penawaran harga, catatan pesanan." },
  { month: "Apr 2027", activity: "Lapak pemuda pada kegiatan yang tersedia; evaluasi titip jual.", responsible: "Tim usaha; koordinasi divisi terkait", output: "Daftar penjual, rekap transaksi, evaluasi." },
  { month: "Mei 2027", activity: "Perbarui pemetaan potensi; kembangkan katalog produk dan jasa.", responsible: "Tim potensi dan pemasaran", output: "Database dan katalog versi 2." },
  { month: "Jun 2027", activity: "Evaluasi semester: margin, biaya, permintaan, komplain, dan manfaat.", responsible: "Koordinator dan seluruh tim", output: "Laporan semester dan rekomendasi." },
  { month: "Jul 2027", activity: "Penjajakan pemasok/mitra tambahan; kembangkan pelanggan jasa kreatif.", responsible: "Tim kemitraan usaha", output: "Daftar calon mitra dan tindak lanjut." },
  { month: "Agu 2027", activity: "Kegiatan ekonomi sesuai permintaan; lapak bila ada agenda sesuai.", responsible: "Tim usaha", output: "Catatan penjualan dan dokumentasi." },
  { month: "Sep 2027", activity: "Evaluasi kelayakan program rutin; data ulang kebutuhan dan minat pemuda.", responsible: "Seluruh tim", output: "Rekap capaian, kendala, dan peluang." },
  { month: "Okt 2027", activity: "Evaluasi akhir periode; laporan dan rekomendasi program lanjutan.", responsible: "Koordinator dan seluruh tim", output: "LPJ dan rencana periode berikutnya." },
];

export const humasPrograms: Program[] = [
      { name: "Menjalin kemitraan dengan pihak eksternal", focus: "Kemitraan dengan pihak eksternal." },
      { name: "Mengelola media sosial resmi Karang Taruna", focus: "Pengelolaan media sosial resmi Karang Taruna." },
      { name: "Membuat postingan/SG PHBN", focus: "Membuat postingan/SG PHBN." },
      { name: "Mendokumentasikan dan mempublikasikan kegiatan Karang Taruna", focus: "Dokumentasi dan publikasi kegiatan Karang Taruna." },
      { name: "Foto Kepengurusan Karang Taruna Sareundeuk", focus: "Foto kepengurusan Karang Taruna Sareundeuk." },
      { name: "Membuat arsip dokumentasi kegiatan", focus: "Arsip dokumentasi kegiatan Karang Taruna." },
    ];

export const programStatus = "Rancangan Program Kerja";

export const programWorkGroups: { division: string; programs: Program[] }[] = [
  { division: "Divisi Advokasi, Hukum & Lingkungan Hidup", programs: advocacyPrograms },
  { division: "Divisi Pengembangan Potensi & Ekonomi Kreatif", programs: economicPrograms },
  { division: "Divisi Hubungan Masyarakat & Kerja Sama", programs: humasPrograms },
];
