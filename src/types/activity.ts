export type ActivityStatus = "draft" | "published";

/** Represents one row in the Supabase activities table. */
export type Activity = {
  id: string;
  title: string;
  category: string | null;
  activity_date: string;
  location: string;
  description: string;
  minutes_title: string;
  minutes_date: string | null;
  minutes_location: string;
  status: ActivityStatus;
  created_by: string;
  created_at: string;
  updated_at: string;
};

/** Represents one row in the Supabase activity_images table. */
export type ActivityImage = {
  id: string;
  activity_id: string;
  storage_path: string;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
};

/** Represents an activity together with its related images. */
export type ActivityWithImages = Activity & {
  activity_images: ActivityImage[];
};

/** Fields supplied when creating an activity. */
export type CreateActivityInput = Omit<
  Activity,
  "id" | "created_by" | "created_at" | "updated_at"
>;

/** Fields that can be changed when updating an activity. */
export type UpdateActivityInput = Partial<CreateActivityInput>;
