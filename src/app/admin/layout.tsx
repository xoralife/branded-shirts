"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Shirt,
  LogOut,
  Menu,
  X,
  Package,
  Settings,
  Grid3X3,
  Users,
  BarChart3,
  Image,
} from "lucide-react";
import AdminAuthCheck from "@/components/AdminAuthCheck";
import { ToastProvider } from "@/components/Toast";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Shirt },
  { label: "Categories", href: "/admin/categories", icon: Grid3X3 },
  { label: "Orders", href: "/admin/orders", icon: Package },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Sliders", href: "/admin/sliders", icon: Image },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  return (
    <>
      <AdminAuthCheck />
      <div className="min-h-screen bg-gray-50 flex">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0F2440] text-white transform transition-transform duration-200 lg:translate-x-0 lg:static lg:inset-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-16 flex items-center px-6 border-b border-white/10">
            <Link href="/admin" className="text-lg font-bold tracking-tight">
              ADMIN <span className="font-light text-white/60">Panel</span>
            </Link>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors w-full"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <Menu size={22} />
            </button>

            <div className="flex items-center gap-3 ml-auto">
              <Link
                href="/"
                className="text-sm text-gray-400 hover:text-[#1E3A5F] transition-colors"
              >
                View Store
              </Link>
              <div className="w-8 h-8 rounded-full bg-[#1E3A5F] flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
            <ToastProvider>{children}</ToastProvider>
          </main>
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
}
