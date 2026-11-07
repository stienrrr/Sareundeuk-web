import Link from "next/link";
import { programStatus, programWorkGroups } from "@/data/program-kerja";

export default function ProgramWork() {
  return (
    <section className="bg-warm-white px-5 py-16 text-primary-charcoal sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-neutral-grey">
            Rencana kegiatan organisasi
          </p>
          <h1 className="mt-3 font-heading text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Program Kerja
          </h1>
          <p className="mt-5 text-base leading-7 text-neutral-grey sm:text-lg sm:leading-8">
            Daftar program dikelompokkan berdasarkan status pengesahannya.
          </p>
        </header>

        <section
          aria-labelledby="approved-programs-title"
          className="mt-10 rounded-3xl border border-primary-charcoal/10 bg-white p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-center gap-3">
            <h2
              id="approved-programs-title"
              className="font-heading text-xl font-semibold sm:text-2xl"
            >
              Program Kerja Disahkan
            </h2>
            <span className="rounded-full bg-primary-charcoal/10 px-3 py-1 text-xs font-semibold text-neutral-grey">
              Belum tersedia
            </span>
          </div>
          <p className="mt-3 max-w-3xl leading-7 text-neutral-grey">
            Belum ada daftar program kerja yang disahkan melalui Rapat Kerja
            dalam materi yang tersedia. Program akan ditampilkan di bagian ini
            setelah pengesahan.
          </p>
        </section>

        <section aria-labelledby="draft-programs-title" className="mt-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-neutral-grey">
                Materi yang tersedia
              </p>
              <h2
                id="draft-programs-title"
                className="mt-2 font-heading text-2xl font-semibold sm:text-3xl"
              >
                Rancangan Program Kerja
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-neutral-grey">
              Rancangan berikut belum disahkan melalui Rapat Kerja dan bukan
              program resmi.
            </p>
          </div>

          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            {programWorkGroups.map((group) => (
              <article
                key={group.division}
                className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-primary-charcoal/5 sm:p-7"
              >
                <h3 className="font-heading text-lg font-semibold sm:text-xl">
                  {group.division}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.programs.map((program) => (
                    <li key={program.name}>
                      <details className="rounded-2xl border border-primary-charcoal/10 bg-warm-white p-4">
                        <summary className="flex cursor-pointer list-none flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <span className="font-heading text-sm font-semibold text-primary-charcoal">
                            {program.name}
                          </span>
                          <span className="w-fit rounded-full bg-accent-red/10 px-3 py-1 text-xs font-semibold text-accent-red">
                            {programStatus}
                          </span>
                        </summary>
                        <div className="mt-4 space-y-3 border-t border-primary-charcoal/10 pt-4 text-sm leading-6 text-neutral-grey">
                          <p>
                            <span className="font-semibold text-primary-charcoal">
                              Fokus kegiatan: 
                            </span>
                            {program.focus}
                          </p>
                          {program.period && (
                            <p>
                              <span className="font-semibold text-primary-charcoal">
                                Waktu: 
                              </span>
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
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-6 text-sm leading-6 text-neutral-grey">
            Kalender program dan materi divisi lainnya tersedia di halaman{" "}
            <Link
              href="/bidang"
              className="font-semibold text-primary-charcoal underline decoration-primary-yellow decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-yellow"
            >
              Bidang
            </Link>
            .
          </p>
        </section>
      </div>
    </section>
  );
}
