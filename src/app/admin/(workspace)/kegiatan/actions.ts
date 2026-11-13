"use server";

import {
  createActivity,
  deleteActivity,
  updateActivity,
} from "@/lib/supabase/activity-actions";
import { uploadActivityImages } from "@/lib/supabase/activity-upload";
import type {
  Activity,
  ActivityImage,
  CreateActivityInput,
  UpdateActivityInput,
} from "@/types/activity";

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

const CREATE_ACTIVITY_ERROR =
  "Gagal membuat kegiatan. Silakan periksa data dan coba lagi.";
const UPDATE_ACTIVITY_ERROR =
  "Gagal memperbarui kegiatan. Silakan coba lagi.";
const DELETE_ACTIVITY_ERROR = "Gagal menghapus kegiatan. Silakan coba lagi.";
const UPLOAD_IMAGES_ERROR = "Gagal mengunggah foto. Silakan coba lagi.";

function getRequiredString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getOptionalString(value: unknown): string | null | undefined {
  if (value === undefined || value === null) return null;
  if (typeof value !== "string") return undefined;

  return value.trim() || null;
}

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function sanitizeActivityInput(
  input: CreateActivityInput | UpdateActivityInput,
): CreateActivityInput | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const values = input as Record<string, unknown>;
  const title = getRequiredString(values.title);
  const activityDate = getRequiredString(values.activity_date);
  const location = getRequiredString(values.location);
  const description = getRequiredString(values.description);
  const minutesTitle = getRequiredString(values.minutes_title);
  const minutesLocation = getRequiredString(values.minutes_location);
  const category = getOptionalString(values.category);
  const minutesDate = getOptionalString(values.minutes_date);
  const status = values.status;

  if (
    !title ||
    !activityDate ||
    !location ||
    !description ||
    !minutesTitle ||
    !minutesLocation ||
    category === undefined ||
    minutesDate === undefined ||
    (status !== "draft" && status !== "published") ||
    !isValidDate(activityDate) ||
    (minutesDate !== null && !isValidDate(minutesDate))
  ) {
    return null;
  }

  return {
    title,
    category,
    activity_date: activityDate,
    location,
    description,
    minutes_title: minutesTitle,
    minutes_date: minutesDate,
    minutes_location: minutesLocation,
    status,
  };
}

export async function createActivityAction(
  input: CreateActivityInput,
): Promise<ActionResult<Activity>> {
  const validatedInput = sanitizeActivityInput(input);
  if (!validatedInput) {
    return { success: false, error: CREATE_ACTIVITY_ERROR };
  }

  try {
    const activity = await createActivity(validatedInput);
    return { success: true, data: activity };
  } catch {
    return { success: false, error: CREATE_ACTIVITY_ERROR };
  }
}

export async function updateActivityAction(
  id: string,
  input: UpdateActivityInput,
): Promise<ActionResult<Activity>> {
  const validatedInput = sanitizeActivityInput(input);
  if (!validatedInput) {
    return { success: false, error: UPDATE_ACTIVITY_ERROR };
  }

  try {
    const activity = await updateActivity(id, validatedInput);
    return { success: true, data: activity };
  } catch {
    return { success: false, error: UPDATE_ACTIVITY_ERROR };
  }
}

export async function deleteActivityAction(
  id: string,
): Promise<ActionResult<null>> {
  try {
    await deleteActivity(id);
    return { success: true, data: null };
  } catch {
    return { success: false, error: DELETE_ACTIVITY_ERROR };
  }
}

export async function uploadActivityImagesAction(
  formData: FormData,
): Promise<ActionResult<ActivityImage[]>> {
  const activityId = formData.get("activityId");
  const entries = formData.getAll("files");
  const files = entries.filter((entry): entry is File => entry instanceof File);

  if (
    typeof activityId !== "string" ||
    activityId.trim().length === 0 ||
    files.length === 0 ||
    files.length !== entries.length ||
    files.some((file) => file.size === 0)
  ) {
    return { success: false, error: UPLOAD_IMAGES_ERROR };
  }

  try {
    const images = await uploadActivityImages(activityId, files);
    return { success: true, data: images };
  } catch {
    return { success: false, error: UPLOAD_IMAGES_ERROR };
  }
}
