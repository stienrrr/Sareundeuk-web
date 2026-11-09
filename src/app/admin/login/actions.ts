"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const ALLOWED_ROLES = new Set([
  "admin_utama",
  "pengurus_inti",
  "anggota_bidang",
  "koordinator_bidang",
]);

export type LoginState = {
  status: "idle" | "error" | "success";
  message: string;
};

const GENERIC_ERROR = "Username atau password tidak valid.";

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const rawUsername = formData.get("username");
  const rawPassword = formData.get("password");

  if (typeof rawUsername !== "string" || typeof rawPassword !== "string") {
    return { status: "error", message: GENERIC_ERROR };
  }

  const username = rawUsername.trim().toLowerCase();
  const password = rawPassword;

  // Usernames akun kelompok menggunakan karakter huruf, angka, dan tanda hubung.
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(username) || password.length === 0) {
    return { status: "error", message: GENERIC_ERROR };
  }

  let hasValidRole = false;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: `${username}@login.sareundeuk.invalid`,
      password,
    });

    if (error || !data.user) {
      return { status: "error", message: GENERIC_ERROR };
    }

    const role = data.user.app_metadata?.role;
    if (typeof role !== "string" || !ALLOWED_ROLES.has(role)) {
      await supabase.auth.signOut({ scope: "local" });
      return { status: "error", message: GENERIC_ERROR };
    }

    hasValidRole = true;
  } catch {
    return { status: "error", message: GENERIC_ERROR };
  }

  if (hasValidRole) {
    redirect("/admin");
  }

  return { status: "error", message: GENERIC_ERROR };
}
