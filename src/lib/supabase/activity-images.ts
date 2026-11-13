import "server-only";

import { createClient } from "@/lib/supabase/server";

const ACTIVITY_IMAGES_BUCKET = "activity-images";
const SIGNED_URL_EXPIRY_SECONDS = 60 * 60;

export async function createActivityImageSignedUrl(
  storagePath: string,
): Promise<string> {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from(ACTIVITY_IMAGES_BUCKET)
    .createSignedUrl(storagePath, SIGNED_URL_EXPIRY_SECONDS);

  if (error) {
    throw new Error(`Gagal membuat signed URL foto kegiatan: ${error.message}`);
  }

  if (!data.signedUrl) {
    throw new Error("Gagal membuat signed URL foto kegiatan: URL tidak tersedia.");
  }

  return data.signedUrl;
}
