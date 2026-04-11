import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function RequestsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground mt-1 text-lg ">Track and manage all your procurement requests.</h1>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-border shadow-soft w-full max-w-2xl">
          <div className="flex-1 flex items-center gap-2 px-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input 
               type="text" 
               placeholder="Search by ID or keyword..." 
               className="w-full bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>
          <div className="w-px h-6 bg-border mx-2"></div>
          <Button variant="ghost" className="rounded-xl flex items-center gap-2 text-muted-foreground">
            <Filter className="w-4 h-4" /> Filter
          </Button>
        </div>
        <Link href="/client/requests/new">
          <Button size="lg" className="rounded-full shadow-soft">Start New Request</Button>
        </Link>
      </div>
      

      {/* Requests List */}
      <div className="space-y-4">
        
        {/* Item 1 */}
        <Link href="/client/requests/REQ-8492" className="block">
          <div className="bg-white rounded-[24px] p-6 shadow-soft border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 group">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                 <span className="font-bold text-muted-foreground text-sm">#8492</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#1A1A1A] group-hover:text-primary transition-colors">20-seat cafe setup in Mumbai</h3>
                <p className="text-sm text-muted-foreground mt-1">14 Items • Requested Oct 24, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-6 md:gap-12">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-[#1A1A1A]">Curated</p>
                <p className="text-xs text-muted-foreground">Action Required</p>
              </div>
              <Badge variant="premium">Awaiting Approval</Badge>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -ml-4" />
            </div>
          </div>
        </Link>

        {/* Item 2 */}
        <Link href="#" className="block">
          <div className="bg-white rounded-[24px] p-6 shadow-soft border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 group">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                 <span className="font-bold text-muted-foreground text-sm">#8103</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#1A1A1A] group-hover:text-primary transition-colors">Enterprise Laptops Batch B</h3>
                <p className="text-sm text-muted-foreground mt-1">50 Items • Requested Oct 12, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-6 md:gap-12">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-[#1A1A1A]">Processing</p>
                <p className="text-xs text-muted-foreground">Admin Review</p>
              </div>
              <Badge variant="pending">Scoping</Badge>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -ml-4" />
            </div>
          </div>
        </Link>

        {/* Item 3 */}
        <Link href="#" className="block opacity-70 hover:opacity-100">
          <div className="bg-white rounded-[24px] p-6 shadow-soft border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 group">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                 <span className="font-bold text-muted-foreground text-sm">#7944</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#1A1A1A] group-hover:text-primary transition-colors">Office Chairs for HQ</h3>
                <p className="text-sm text-muted-foreground mt-1">120 Items • Requested Sep 15, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-6 md:gap-12">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-[#1A1A1A]">Completed</p>
                <p className="text-xs text-muted-foreground">Moved to Orders</p>
              </div>
              <Badge variant="secondary">Awarded</Badge>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -ml-4" />
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}
