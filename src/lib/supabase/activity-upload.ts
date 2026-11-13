import "server-only";

import { randomUUID } from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import type { ActivityImage } from "@/types/activity";

const ALLOWED_ROLES = new Set([
  "admin_utama",
  "pengurus_inti",
  "anggota_bidang",
  "koordinator_bidang",
]);

const ACTIVITY_IMAGES_BUCKET = "activity-images";
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const IMAGE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

async function removeUploadedFiles(
  supabase: Awaited<ReturnType<typeof createClient>>,
  storagePaths: string[],
): Promise<string | null> {
  if (storagePaths.length === 0) return null;

  try {
    const { error } = await supabase.storage
      .from(ACTIVITY_IMAGES_BUCKET)
      .remove(storagePaths);

    return error?.message ?? null;
  } catch (error) {
    return error instanceof Error ? error.message : "Kesalahan tidak diketahui.";
  }
}

function rollbackFailureMessage(
  context: string,
  storagePaths: string[],
  rollbackError: string,
): string {
  return `${context} Rollback gagal (${rollbackError}). File yang perlu dibersihkan: ${storagePaths.join(", ")}.`;
}

export async function uploadActivityImages(
  activityId: string,
  files: File[],
): Promise<ActivityImage[]> {
  if (!activityId.trim()) {
    throw new Error("ID kegiatan wajib diisi.");
  }

  if (!Array.isArray(files) || files.length === 0) {
    throw new Error("Pilih setidaknya satu file foto kegiatan.");
  }

  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    throw new Error("Sesi pengguna tidak ditemukan atau tidak valid.");
  }

  const role = authData.user.app_metadata?.role;
  if (typeof role !== "string" || !ALLOWED_ROLES.has(role)) {
    throw new Error("Anda tidak memiliki izin untuk mengunggah foto kegiatan.");
  }

  const { data: activity, error: activityError } = await supabase
    .from("activities")
    .select("id")
    .eq("id", activityId)
    .maybeSingle();

  if (activityError) {
    throw new Error(`Gagal memeriksa kegiatan sebelum upload: ${activityError.message}`);
  }

  if (!activity) {
    throw new Error(`Kegiatan dengan id "${activityId}" tidak ditemukan.`);
  }

  const fileExtensions = files.map((file, index) => {
    if (file.size === 0) {
      throw new Error(`File foto ke-${index + 1} kosong.`);
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new Error(`File foto ke-${index + 1} melebihi batas 5 MB.`);
    }

    const extension = IMAGE_EXTENSIONS[file.type];
    if (!extension) {
      throw new Error(
        `Tipe file foto ke-${index + 1} tidak didukung. Gunakan JPEG, PNG, atau WebP.`,
      );
    }

    return extension;
  });

  const { data: highestSortOrder, error: sortOrderError } = await supabase
    .from("activity_images")
    .select("sort_order")
    .eq("activity_id", activityId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (sortOrderError) {
    throw new Error(
      `Gagal memeriksa urutan foto kegiatan sebelum upload: ${sortOrderError.message}`,
    );
  }

  const firstSortOrder = highestSortOrder
    ? highestSortOrder.sort_order + 1
    : 0;

  const uploadedPaths: string[] = [];
  const metadata = files.map((file, index) => {
    const storagePath = `${activityId}/${randomUUID()}.${fileExtensions[index]}`;
    return {
      file,
      row: {
        activity_id: activityId,
        storage_path: storagePath,
        alt_text: null,
        sort_order: firstSortOrder + index,
      },
    };
  });

  for (const { file, row } of metadata) {
    try {
      const { error } = await supabase.storage
        .from(ACTIVITY_IMAGES_BUCKET)
        .upload(row.storage_path, file, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        const rollbackError = await removeUploadedFiles(supabase, uploadedPaths);
        const message = `Gagal mengunggah foto kegiatan: ${error.message}`;
        if (rollbackError) {
          throw new Error(
            rollbackFailureMessage(message, uploadedPaths, rollbackError),
          );
        }
        throw new Error(message);
      }

      uploadedPaths.push(row.storage_path);
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("Gagal mengunggah foto kegiatan:")) {
        throw error;
      }

      const rollbackError = await removeUploadedFiles(supabase, uploadedPaths);
      const message = `Gagal mengunggah foto kegiatan: ${error instanceof Error ? error.message : "kesalahan tidak diketahui."}`;
      if (rollbackError) {
        throw new Error(rollbackFailureMessage(message, uploadedPaths, rollbackError));
      }
      throw new Error(message);
    }
  }

  const { data: insertedImages, error: insertError } = await supabase
    .from("activity_images")
    .insert(metadata.map(({ row }) => row))
    .select("*");

  if (insertError || !insertedImages) {
    const rollbackError = await removeUploadedFiles(supabase, uploadedPaths);
    const message = insertError
      ? `Gagal menyimpan metadata foto kegiatan: ${insertError.message}`
      : "Gagal menyimpan metadata foto kegiatan: data tidak dikembalikan.";

    if (rollbackError) {
      throw new Error(rollbackFailureMessage(message, uploadedPaths, rollbackError));
    }
    throw new Error(message);
  }

  return insertedImages as unknown as ActivityImage[];
}
