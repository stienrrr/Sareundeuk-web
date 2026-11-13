import "server-only";

import { createClient } from "@/lib/supabase/server";
import type {
  Activity,
  CreateActivityInput,
  UpdateActivityInput,
} from "@/types/activity";

const ALLOWED_ROLES = new Set([
  "admin_utama",
  "pengurus_inti",
  "anggota_bidang",
  "koordinator_bidang",
]);

export async function createActivity(
  input: CreateActivityInput,
): Promise<Activity> {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    throw new Error("Sesi pengguna tidak ditemukan atau tidak valid.");
  }

  const role = authData.user.app_metadata?.role;
  if (typeof role !== "string" || !ALLOWED_ROLES.has(role)) {
    throw new Error("Anda tidak memiliki izin untuk membuat kegiatan.");
  }

  const { data, error } = await supabase
    .from("activities")
    .insert({ ...input, created_by: authData.user.id })
    .select("*")
    .single();

  if (error) {
    throw new Error(`Gagal membuat kegiatan: ${error.message}`);
  }

  if (!data) {
    throw new Error("Gagal membuat kegiatan: data kegiatan tidak dikembalikan.");
  }

  return data as unknown as Activity;
}

export async function updateActivity(
  id: string,
  input: UpdateActivityInput,
): Promise<Activity> {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    throw new Error("Sesi pengguna tidak ditemukan atau tidak valid.");
  }

  const role = authData.user.app_metadata?.role;
  if (typeof role !== "string" || !ALLOWED_ROLES.has(role)) {
    throw new Error("Anda tidak memiliki izin untuk mengubah kegiatan.");
  }

  const updateValues = {
    title: input.title,
    category: input.category,
    activity_date: input.activity_date,
    location: input.location,
    description: input.description,
    minutes_title: input.minutes_title,
    minutes_date: input.minutes_date,
    minutes_location: input.minutes_location,
    status: input.status,
  };

  const { data, error } = await supabase
    .from("activities")
    .update(updateValues)
    .eq("id", id)
    .select("*")
    .single();

  if (error?.code === "PGRST116") {
    throw new Error(`Kegiatan dengan id "${id}" tidak ditemukan.`);
  }

  if (error) {
    throw new Error(`Gagal memperbarui kegiatan: ${error.message}`);
  }

  if (!data) {
    throw new Error(`Kegiatan dengan id "${id}" tidak ditemukan.`);
  }

  return data as unknown as Activity;
}

export async function deleteActivity(id: string): Promise<void> {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    throw new Error("Sesi pengguna tidak ditemukan atau tidak valid.");
  }

  const role = authData.user.app_metadata?.role;
  if (typeof role !== "string" || !ALLOWED_ROLES.has(role)) {
    throw new Error("Anda tidak memiliki izin untuk menghapus kegiatan.");
  }

  const { data: imageRows, error: imageQueryError } = await supabase
    .from("activity_images")
    .select("storage_path")
    .eq("activity_id", id);

  if (imageQueryError) {
    throw new Error(
      `Gagal mengambil path foto kegiatan sebelum penghapusan: ${imageQueryError.message}`,
    );
  }

  const storagePaths = (imageRows ?? []).map((image) => image.storage_path);
  if (storagePaths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("activity-images")
      .remove(storagePaths);

    if (storageError) {
      throw new Error(
        `Gagal menghapus file foto dari Storage; data kegiatan belum dihapus. ${storageError.message}`,
      );
    }
  }

  const { data: deletedRows, error: deleteError } = await supabase
    .from("activities")
    .delete()
    .eq("id", id)
    .select("id");

  if (deleteError) {
    throw new Error(
      `File foto kegiatan sudah dihapus (atau tidak ada foto), tetapi data kegiatan masih tersimpan atau gagal dihapus: ${deleteError.message}`,
    );
  }

  if (!deletedRows || deletedRows.length === 0) {
    throw new Error(
      `File foto kegiatan sudah dihapus (atau tidak ada foto), tetapi kegiatan dengan id "${id}" masih tersimpan atau tidak ditemukan untuk dihapus.`,
    );
  }
}
