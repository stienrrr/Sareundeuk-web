export default function AdminDashboardPage() {
  return (
    <section
      aria-labelledby="dashboard-placeholder-title"
      className="rounded-3xl border border-primary-charcoal/10 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="mb-5 h-1 w-12 rounded-full bg-primary-yellow" />
      <h1
        className="font-heading text-xl font-semibold"
        id="dashboard-placeholder-title"
      >
        Fondasi dashboard siap
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-primary-charcoal/65">
        Ringkasan kegiatan dan fitur pengelolaan akan ditambahkan pada tahap
        berikutnya.
      </p>
    </section>
  );
}
