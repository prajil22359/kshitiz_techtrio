"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PackageSearch, LayoutDashboard, ShoppingCart, CreditCard, Settings, FileText } from "lucide-react";

export default function ClientPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const titleByRoute = [
    { path: "/client/dashboard", title: "Dashboard" },
    { path: "/client/requests", title: "My Requests" },
    { path: "/client/orders", title: "Orders" },
    { path: "/client/payments", title: "Payments" },
    { path: "/client/settings", title: "Settings" },
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const pageTitle = titleByRoute.find((item) => isActive(item.path))?.title ?? "Settings";

  return (
    <div className="flex min-h-screen w-full bg-[#FAFAFA]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-[#1A1A1A] text-white flex flex-col shadow-sm hidden md:flex sticky top-0 h-screen overflow-y-auto">
        <div className="h-16 flex flex-shrink-0 items-center px-6 border-b border-white/10 sticky top-0 bg-[#1A1A1A] z-10">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
            <div className="bg-primary/20 p-1.5 rounded-lg">
              <PackageSearch className="w-5 h-5 text-primary" />
            </div>
            All Product God Client
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/client/dashboard"
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive("/client/dashboard") ? "bg-primary/10 text-primary" : "text-white/70 hover:text-white hover:bg-white/10"}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>

          <Link
            href="/client/requests"
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive("/client/requests") ? "bg-primary/10 text-primary" : "text-white/70 hover:text-white hover:bg-white/10"}`}
          >
            <FileText className="w-4 h-4" /> My Requests
          </Link>

          <Link
            href="/client/orders"
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive("/client/orders") ? "bg-primary/10 text-primary" : "text-white/70 hover:text-white hover:bg-white/10"}`}
          >
            <ShoppingCart className="w-4 h-4" /> Orders
          </Link>

          <Link
            href="/client/payments"
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive("/client/payments") ? "bg-primary/10 text-primary" : "text-white/70 hover:text-white hover:bg-white/10"}`}
          >
            <CreditCard className="w-4 h-4" /> Payments
          </Link>

          <Link
            href="/client/settings"
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive("/client/settings") ? "bg-primary/10 text-primary" : "text-white/70 hover:text-white hover:bg-white/10"}`}
          >
            <Settings className="w-4 h-4" /> Settings
          </Link>
        </nav>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border bg-white flex items-center px-8 justify-between shrink-0 sticky top-0 z-10 shadow-sm">
          <h1 className="font-semibold text-lg">{pageTitle}</h1>
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border border-primary/20">C</div>
        </header>

        <div className="flex-1 overflow-y-auto bg-gray-50/30">
          <div className="p-4 md:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
