"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Blogs", href: "/admin/blogs" },
  { label: "Jobs", href: "/admin/jobs" },
  { label: "LoanChat Leads", href: "/admin/leads" },
  { label: "Query", href: "/admin/queries" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="bg-white border border-gray-200 rounded-xl p-4 h-fit lg:sticky lg:top-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Admin Dashboard</h2>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 w-full border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </aside>
  );
}
