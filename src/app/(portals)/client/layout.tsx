import Link from "next/link";
import { PackageSearch, LayoutDashboard, ShoppingCart, CreditCard, Settings, FileText } from "lucide-react";

export default function ClientPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-[#FAFAFA]">
      {/* Slim Sidebar */}
      <aside className="w-64 border-r border-border bg-white flex flex-col shadow-sm hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[#1A1A1A]">
            <PackageSearch className="w-6 h-6 text-primary" />
            TechTrio Client
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/client/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/client/requests" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-foreground bg-muted/50 rounded-lg">
            <FileText className="w-4 h-4" /> My Requests
          </Link>
          <Link href="/client/orders" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors">
            <ShoppingCart className="w-4 h-4" /> Orders
          </Link>
          <Link href="/client/payments" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors">
            <CreditCard className="w-4 h-4" /> Payments
          </Link>
          <Link href="/client/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors">
            <Settings className="w-4 h-4" /> Settings
          </Link>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col max-h-screen overflow-hidden">
        <header className="h-16 border-b border-border bg-white flex items-center px-8 justify-between shrink-0">
          <h1 className="font-semibold text-lg">My Dashboard</h1>
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">C</div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
