
import { Suspense, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import AdminShell, {
  type AdminRole,
  type AdminViewer,
} from "@/components/admin/AdminShell";

const ALLOWED_ROLES = new Set<AdminRole>([
  "admin_utama",
  "pengurus_inti",
  "anggota_bidang",
  "koordinator_bidang",
]);

const ROLE_LABELS: Record<AdminRole, string> = {
  admin_utama: "Admin Utama",
  pengurus_inti: "Pengurus Inti",
  anggota_bidang: "Anggota Bidang",
  koordinator_bidang: "Koordinator Bidang",
};

export default function AdminWorkspaceLayout({
  children,
}: LayoutProps<"/admin">) {
  return (
    <Suspense fallback={<AdminWorkspaceFallback />}>
      <AuthenticatedAdminWorkspace>
        {children}
      </AuthenticatedAdminWorkspace>
    </Suspense>
  );
}

function AdminWorkspaceFallback() {
  return (
    <div className="flex min-h-[100svh] flex-1 bg-warm-white">
      <aside
        aria-hidden="true"
        className="hidden w-64 shrink-0 flex-col bg-primary-charcoal p-6 md:flex"
      >
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-full border border-primary-yellow/50 bg-warm-white/10" />
          <div>
            <div className="h-3 w-28 rounded bg-warm-white/20" />
            <div className="mt-2 h-2 w-20 rounded bg-warm-white/10" />
          </div>
        </div>
        <div className="mt-10 h-11 rounded-xl bg-primary-yellow/20" />
        <div className="mt-3 h-11 rounded-xl bg-warm-white/10" />
        <div className="mt-3 h-11 rounded-xl bg-warm-white/10" />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex min-h-[76px] items-center border-b border-primary-charcoal/10 px-5 sm:px-7">
          <div className="h-4 w-52 max-w-full rounded bg-primary-charcoal/10" />
        </header>
        <main
          aria-label="Memuat ruang pengurus"
          className="flex-1 px-4 py-6 sm:px-7 sm:py-8"
        >
          <div className="mx-auto w-full max-w-6xl">
            <div className="h-40 animate-pulse rounded-3xl bg-primary-charcoal/5" />
          </div>
        </main>
      </div>
    </div>
  );
}

async function AuthenticatedAdminWorkspace({
  children,
}: {
  children: ReactNode;
}) {
  await connection();

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/admin/login");
  }

  const role = data.user.app_metadata?.role;

  if (
    typeof role !== "string" ||
    !ALLOWED_ROLES.has(role as AdminRole)
  ) {
    redirect("/admin/clear-session");
  }

  const adminRole = role as AdminRole;

  const viewer: AdminViewer = {
    username: data.user.email?.split("@")[0] ?? "Pengurus",
    role: adminRole,
    roleLabel: ROLE_LABELS[adminRole],
  };

  return <AdminShell viewer={viewer}>{children}</AdminShell>;
}
