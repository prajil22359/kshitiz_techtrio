"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  Store, 
  LayoutDashboard, 
  Inbox, 
  PackageSearch, 
  Database,
  Receipt,
  LogOut,
  Settings,
  HelpCircle,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Clock,
  PlusCircle,
  FileText,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function VendorPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    setIsVerified(localStorage.getItem("vendor_verified") === "true");
  }, [pathname]);

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#FAFAFA]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-[#1A1A1A] text-white flex flex-col shadow-sm hidden md:flex sticky top-0 h-screen overflow-y-auto">
        <div className="h-16 flex flex-shrink-0 items-center px-6 border-b border-white/10 sticky top-0 bg-[#1A1A1A] z-10">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
            <div className="bg-primary/20 p-1.5 rounded-lg">
              <Store className="w-5 h-5 text-primary" />
            </div>
            TechTrio
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-6">
          
          {/* Main */}
          <div className="space-y-1">
            <Link 
              href="/vendor/dashboard" 
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive('/vendor/dashboard') ? 'bg-primary/10 text-primary' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
          </div>

          {/* RFQ Pipeline */}
          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
              Bidding
            </h3>
            <Link href="/vendor/rfqs" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === '/vendor/rfqs' ? 'bg-primary/10 text-primary' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
              <Inbox className="w-4 h-4" /> RFQ Pipeline
            </Link>
          </div>

          {/* ORDERS Section */}
          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
              Orders
            </h3>
            <Link href="/vendor/orders" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === '/vendor/orders' ? 'bg-primary/10 text-primary' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
              <PackageSearch className="w-4 h-4" /> Active
            </Link>
            <Link href="/vendor/orders/completed" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === '/vendor/orders/completed' ? 'bg-primary/10 text-primary' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
              <CheckCircle2 className="w-4 h-4" /> Completed
            </Link>
          </div>

          {/* CATALOG Section */}
          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
              Catalog
            </h3>
            <Link href="/vendor/catalog" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === '/vendor/catalog' ? 'bg-primary/10 text-primary' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
              <Database className="w-4 h-4" /> Catalog Hub
            </Link>
          </div>

          {/* BILLING Section */}
          <div className="space-y-1 pb-8">
            <h3 className="px-3 text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
              Finance
            </h3>
            <Link href="/vendor/billing" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === '/vendor/billing' ? 'bg-primary/10 text-primary' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
              <Receipt className="w-4 h-4" /> Billing & Ledger
            </Link>
          </div>
        </nav>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-white flex items-center px-8 justify-between shrink-0 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-lg text-[#1A1A1A] capitalize">
              {pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            
            <div className="flex items-center gap-4 text-muted-foreground mr-4 border-r pr-6">
              <button className="hover:text-foreground transition-colors flex items-center gap-2 text-sm font-medium">
                <Settings className="w-4 h-4" />
                <span className="hidden lg:inline">Settings</span>
              </button>
              <button className="hover:text-foreground transition-colors flex items-center gap-2 text-sm font-medium">
                <HelpCircle className="w-4 h-4" />
                <span className="hidden lg:inline">Support</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-foreground">John Doe</span>
                {isVerified ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-[10px] h-4 px-1 pb-[1px] uppercase tracking-wider font-semibold">
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] h-4 px-1 pb-[1px] uppercase tracking-wider font-semibold">
                    Unverified
                  </Badge>
                )}
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors relative group">
                V
                {/* Simple Hover Dropdown for MVP */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="p-1">
                    <button 
                      onClick={() => { localStorage.removeItem('vendor_verified'); window.location.href='/login'; }}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                    >
                       <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50/30">
          {/* KYC Prompt Banner */}
          {!isVerified && (
            <div className="bg-amber-500 text-white px-6 py-3 flex items-center justify-between shadow-sm border-b border-amber-600">
               <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 opacity-90" />
                  <p className="font-medium text-sm">Your account setup is incomplete. You cannot receive active RFQs or Orders until your KYC verification is completed.</p>
               </div>
               <Link href="/vendor/onboarding">
                 <Button size="sm" variant="secondary" className="bg-white text-amber-900 border-none hover:bg-gray-50 h-8 font-bold">
                   Complete Verification →
                 </Button>
               </Link>
            </div>
          )}
          
          <div className="p-4 md:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
