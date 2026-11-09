"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const normalizedPath = pathname?.replace(/\/+$/, "") || "/";

  if (normalizedPath === "/admin" || normalizedPath.startsWith("/admin/")) {
    return null;
  }

  return <Navbar />;
}
