import ActivityCreateForm from "./ActivityCreateForm";

export default function AddActivityPage() {
  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="mb-8">
        <div className="mb-4 h-1 w-12 rounded-full bg-primary-yellow" />
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-charcoal/55">
          Kelola Kegiatan
        </p>
        <h1 className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Tambah Kegiatan
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-primary-charcoal/65">
          Lengkapi informasi kegiatan dan berita acara sebelum menyimpannya.
        </p>
      </div>

      <ActivityCreateForm />
    </section>
  );
}
