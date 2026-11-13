"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createActivityAction } from "../actions";
import type { ActivityStatus, CreateActivityInput } from "@/types/activity";

const fieldClassName =
  "mt-2 min-h-11 w-full rounded-xl border border-primary-charcoal/15 bg-warm-white px-3 text-sm text-primary-charcoal outline-none transition placeholder:text-primary-charcoal/40 focus:border-primary-yellow focus:ring-2 focus:ring-primary-yellow/25";

function getRequiredValue(formData: FormData, name: string): string | null {
  const value = formData.get(name);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export default function ActivityCreateForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);

    const title = getRequiredValue(formData, "title");
    const activityDate = getRequiredValue(formData, "activity_date");
    const location = getRequiredValue(formData, "location");
    const description = getRequiredValue(formData, "description");
    const minutesTitle = getRequiredValue(formData, "minutes_title");
    const minutesLocation = getRequiredValue(formData, "minutes_location");
    const status = formData.get("status");

    if (
      !title ||
      !activityDate ||
      !location ||
      !description ||
      !minutesTitle ||
      !minutesLocation ||
      (status !== "draft" && status !== "published")
    ) {
      setError("Lengkapi seluruh field yang wajib diisi.");
      return;
    }

    const category = formData.get("category");
    const minutesDate = formData.get("minutes_date");
    const input: CreateActivityInput = {
      title,
      category:
        typeof category === "string" && category.trim() ? category.trim() : null,
      activity_date: activityDate,
      location,
      description,
      minutes_title: minutesTitle,
      minutes_date:
        typeof minutesDate === "string" && minutesDate ? minutesDate : null,
      minutes_location: minutesLocation,
      status: status as ActivityStatus,
    };

    startTransition(async () => {
      const result = await createActivityAction(input);

      if (!result.success) {
        setError(result.error);
        return;
      }

      router.push("/admin/kegiatan");
      router.refresh();
    });
  }

  return (
    <form
      action={handleSubmit}
      className="rounded-3xl border border-primary-charcoal/10 bg-white p-5 shadow-sm sm:p-8"
    >
      {error ? (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-sm font-semibold">Judul kegiatan</span>
          <input className={fieldClassName} name="title" required type="text" />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Kategori</span>
          <input className={fieldClassName} name="category" type="text" />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Tanggal kegiatan</span>
          <input className={fieldClassName} name="activity_date" required type="date" />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-semibold">Lokasi kegiatan</span>
          <input className={fieldClassName} name="location" required type="text" />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-semibold">Deskripsi kegiatan</span>
          <textarea
            className={`${fieldClassName} min-h-32 py-3`}
            name="description"
            required
          />
        </label>
      </div>

      <fieldset className="mt-8 border-t border-primary-charcoal/10 pt-7">
        <legend className="font-heading text-lg font-semibold">Berita acara</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm font-semibold">Judul berita acara</span>
            <input
              className={fieldClassName}
              name="minutes_title"
              required
              type="text"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Tanggal berita acara</span>
            <input className={fieldClassName} name="minutes_date" type="date" />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Lokasi berita acara</span>
            <input
              className={fieldClassName}
              name="minutes_location"
              required
              type="text"
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="mt-8 border-t border-primary-charcoal/10 pt-7">
        <legend className="font-heading text-lg font-semibold">
          Status publikasi
        </legend>
        <div className="mt-4 flex flex-wrap gap-3">
          <label className="flex min-h-11 items-center gap-2 rounded-xl border border-primary-charcoal/15 px-3 text-sm font-medium">
            <input defaultChecked name="status" type="radio" value="draft" />
            Draft
          </label>
          <label className="flex min-h-11 items-center gap-2 rounded-xl border border-primary-charcoal/15 px-3 text-sm font-medium">
            <input name="status" type="radio" value="published" />
            Published
          </label>
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-primary-charcoal/10 pt-6 sm:flex-row sm:justify-end">
        <Link
          href="/admin/kegiatan"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary-charcoal/15 px-4 text-sm font-semibold transition hover:bg-primary-charcoal/5"
        >
          Batal
        </Link>
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-yellow px-4 text-sm font-semibold text-primary-charcoal shadow-sm transition hover:bg-primary-yellow/85 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
