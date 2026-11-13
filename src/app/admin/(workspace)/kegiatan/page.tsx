import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Activity } from "@/types/activity";

const ALLOWED_ROLES = new Set([
  "admin_utama",
  "pengurus_inti",
  "anggota_bidang",
  "koordinator_bidang",
]);

function formatActivityDate(activityDate: string): string {
  const date = new Date(
    /^\d{4}-\d{2}-\d{2}$/.test(activityDate)
      ? `${activityDate}T00:00:00`
      : activityDate,
  );

  if (Number.isNaN(date.getTime())) {
    return activityDate;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function StatusBadge({ status }: { status: Activity["status"] }) {
  const isPublished = status === "published";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        isPublished
          ? "bg-emerald-100 text-emerald-800"
          : "bg-primary-yellow/20 text-primary-charcoal"
      }`}
    >
      {isPublished ? "Published" : "Draft"}
    </span>
  );
}

export default async function AdminActivitiesPage() {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    redirect("/admin/login");
  }

  const role = authData.user.app_metadata?.role;
  if (typeof role !== "string" || !ALLOWED_ROLES.has(role)) {
    redirect("/admin/clear-session");
  }

  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("activity_date", { ascending: false });

  if (error) {
    throw new Error("Gagal memuat daftar kegiatan.");
  }

  const activities = (data ?? []) as unknown as Activity[];

  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-4 h-1 w-12 rounded-full bg-primary-yellow" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-charcoal/55">
            Ruang Pengurus
          </p>
          <h1 className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Kelola Kegiatan
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-primary-charcoal/65">
            Tambahkan, perbarui, dan kelola publikasi kegiatan Karang Taruna.
          </p>
        </div>

        <Link
          href="/admin/kegiatan/tambah"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-yellow px-4 text-sm font-semibold text-primary-charcoal shadow-sm transition hover:bg-primary-yellow/85"
        >
          Tambah Kegiatan
        </Link>
      </div>

      {activities.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-primary-charcoal/20 bg-white p-6 text-center shadow-sm sm:mt-10 sm:p-10">
          <h2 className="font-heading text-lg font-semibold">
            Belum ada kegiatan
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-primary-charcoal/65">
            Buat kegiatan pertama untuk mulai menyimpan dokumentasi dan berita acara.
          </p>
          <Link
            href="/admin/kegiatan/tambah"
            className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl border border-primary-charcoal/15 px-4 text-sm font-semibold transition hover:bg-primary-charcoal/5"
          >
            Tambah Kegiatan
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-3xl border border-primary-charcoal/10 bg-white shadow-sm sm:mt-10">
          <div className="hidden grid-cols-[minmax(0,1.5fr)_minmax(9rem,1fr)_minmax(10rem,1fr)_auto] gap-5 border-b border-primary-charcoal/10 bg-primary-charcoal/[0.03] px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-primary-charcoal/55 md:grid">
            <span>Kegiatan</span>
            <span>Tanggal</span>
            <span>Status</span>
            <span className="sr-only">Aksi</span>
          </div>

          <ul className="divide-y divide-primary-charcoal/10">
            {activities.map((activity) => (
              <li
                key={activity.id}
                className="grid gap-4 px-5 py-5 sm:px-6 md:grid-cols-[minmax(0,1.5fr)_minmax(9rem,1fr)_minmax(10rem,1fr)_auto] md:items-center md:gap-5"
              >
                <div className="min-w-0">
                  <h2 className="truncate font-heading text-base font-semibold sm:text-lg">
                    {activity.title}
                  </h2>
                  <p className="mt-1 text-sm text-primary-charcoal/65">
                    {activity.category ?? "Tanpa kategori"}
                  </p>
                  <p className="mt-2 text-sm text-primary-charcoal/65 md:hidden">
                    {formatActivityDate(activity.activity_date)} · {activity.location}
                  </p>
                  <p className="mt-1 hidden text-sm text-primary-charcoal/65 md:block">
                    {activity.location}
                  </p>
                </div>

                <p className="hidden text-sm text-primary-charcoal/70 md:block">
                  {formatActivityDate(activity.activity_date)}
                </p>

                <div>
                  <StatusBadge status={activity.status} />
                </div>

                <Link
                  href={`/admin/kegiatan/${activity.id}/edit`}
                  className="inline-flex min-h-10 items-center justify-center rounded-xl border border-primary-charcoal/15 px-3 text-sm font-semibold transition hover:bg-primary-charcoal/5 md:justify-self-end"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
