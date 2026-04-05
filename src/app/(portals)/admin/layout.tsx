import Link from "next/link";
import { LayoutDashboard, FileText, FileSpreadsheet, Package, Truck, Users, FileEdit, ShieldAlert } from "lucide-react";

export default function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-[#FAFAFA]">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-border bg-[#F4F4F5] flex flex-col shadow-sm hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-border bg-white">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[#1A1A1A]">
            <ShieldAlert className="w-6 h-6 text-red-500" />
            Control Room
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#1A1A1A] hover:bg-black/5 rounded-lg">
             <LayoutDashboard className="w-4 h-4" /> Global Dashboard
          </Link>
          <div className="pt-4 pb-2 px-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">Procurement</div>
          <Link href="/admin/requests" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#1A1A1A] hover:bg-black/5 rounded-lg">
             <FileText className="w-4 h-4" /> Intake & Triage
          </Link>
          <Link href="/admin/quotations" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#1A1A1A] hover:bg-black/5 rounded-lg">
             <FileSpreadsheet className="w-4 h-4" /> Quotation Bids
          </Link>
          <div className="pt-4 pb-2 px-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">Operations</div>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#1A1A1A] hover:bg-black/5 rounded-lg">
             <Package className="w-4 h-4" /> Master Orders
          </Link>
          <Link href="/admin/shipments" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#1A1A1A] hover:bg-black/5 rounded-lg">
             <Truck className="w-4 h-4" /> Shiprocket Sync
          </Link>
          <div className="pt-4 pb-2 px-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">Ecosystem</div>
          <Link href="/admin/vendors" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#1A1A1A] hover:bg-black/5 rounded-lg">
             <Users className="w-4 h-4" /> Vendor Approvals
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#1A1A1A] hover:bg-black/5 rounded-lg">
             <FileEdit className="w-4 h-4" /> Blog CMS
          </Link>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col max-h-screen overflow-hidden">
        <header className="h-16 border-b border-border bg-white flex items-center px-8 justify-between shrink-0">
          <h1 className="font-semibold text-lg text-[#1A1A1A]">Platform Operations</h1>
          <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 border border-red-200 flex items-center justify-center font-bold">A</div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
