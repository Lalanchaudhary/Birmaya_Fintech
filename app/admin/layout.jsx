"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return children;
  }

  return (
    <section className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          <AdminSidebar />
          <main>{children}</main>
        </div>
      </div>
    </section>
  );
}
