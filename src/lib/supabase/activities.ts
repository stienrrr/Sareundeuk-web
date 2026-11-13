import "server-only";

import { createActivityImageSignedUrl } from "@/lib/supabase/activity-images";
import { createClient } from "@/lib/supabase/server";
import type {
  ActivityImage,
  ActivityWithImages,
} from "@/types/activity";

export type ActivityImageWithUrl = ActivityImage & {
  signed_url: string | null;
};

export type PublishedActivity = Omit<ActivityWithImages, "activity_images"> & {
  activity_images: ActivityImageWithUrl[];
};

export async function getPublishedActivities(): Promise<PublishedActivity[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activities")
    .select("*, activity_images(*)")
    .eq("status", "published")
    .order("activity_date", { ascending: false });

  if (error) {
    throw new Error(`Gagal mengambil kegiatan published: ${error.message}`);
  }

  // Database types are not generated in this project; the selected relation is
  // described using the local row types above.
  const activities = (data ?? []) as unknown as ActivityWithImages[];

  return Promise.all(
    activities.map(async (activity) => {
      const activityImages = await Promise.all(
        [...(activity.activity_images ?? [])]
          .sort((a, b) => a.sort_order - b.sort_order)
          .map(async (image) => {
          try {
            const signedUrl = await createActivityImageSignedUrl(image.storage_path);
            return { ...image, signed_url: signedUrl };
          } catch (error) {
            console.warn(
              `Gagal membuat signed URL foto kegiatan (activity_image id: ${image.id}).`,
              error,
            );
            return { ...image, signed_url: null };
          }
          }),
      );

      return { ...activity, activity_images: activityImages };
    }),
  );
}
