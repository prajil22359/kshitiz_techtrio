import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Truck, Package, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Active Orders</h1>
          <p className="text-muted-foreground mt-1">Track fulfilled contracts and inbound Shiprocket deliveries.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-border shadow-soft w-full max-w-2xl">
        <div className="flex-1 flex items-center gap-2 px-3">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input 
             type="text" 
             placeholder="Search AWB or PO Number..." 
             className="w-full bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
          />
        </div>
        <div className="w-px h-6 bg-border mx-2"></div>
        <Button variant="ghost" className="rounded-xl flex items-center gap-2 text-muted-foreground">
          <Filter className="w-4 h-4" /> Status
        </Button>
      </div>

      {/* Orders Grid */}
      <div className="space-y-6">
        
        {/* Order Card 1 */}
        <div className="bg-white rounded-[32px] p-8 shadow-soft border border-border flex flex-col md:flex-row gap-8">
          {/* Tracking Visual */}
          <div className="w-full md:w-64 shrink-0 bg-[#FAFAFA] rounded-2xl p-6 border border-border flex flex-col justify-center gap-4">
             <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
               <span>Shiprocket</span>
               <span>AWB: 10429381</span>
             </div>
             <div className="flex items-center justify-center py-4">
                <div className="h-16 w-px bg-muted relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#1A1A1A]"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(176,255,77,0.8)]"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-muted"></div>
                </div>
                <div className="h-16 flex flex-col justify-between ml-4 text-sm font-medium">
                  <span className="text-muted-foreground">Dispatched</span>
                  <span className="text-[#1A1A1A]">In Transit</span>
                  <span className="text-muted-foreground">Expected</span>
                </div>
             </div>
          </div>
          
          {/* Details */}
          <div className="flex-1 flex flex-col">
             <div className="flex justify-between items-start mb-2">
               <h3 className="text-xl font-bold text-[#1A1A1A]">Enterprise Laptops Batch B</h3>
               <Badge variant="premium">In Transit</Badge>
             </div>
             <p className="text-sm text-muted-foreground">PO: #PO-2026-8103 • 50 Items • From: Bangalore HQ</p>
             
             <div className="mt-8 flex items-center gap-6">
               <div className="flex items-center gap-2 text-sm text-[#1A1A1A] font-semibold bg-muted/50 px-4 py-2 rounded-xl">
                 <Truck className="w-4 h-4 text-primary" /> ETA: Tomorrow, 2:00 PM
               </div>
             </div>
             
             <div className="mt-6 flex flex-wrap gap-3 pt-6 border-t border-border">
               <Button variant="outline" className="rounded-full">Download Invoice</Button>
               <Button variant="outline" className="rounded-full flex items-center gap-2">Live Tracking <ExternalLink className="w-4 h-4" /></Button>
             </div>
          </div>
        </div>

        {/* Order Card 2 */}
        <div className="bg-white rounded-[32px] p-8 shadow-soft border border-border flex flex-col md:flex-row gap-8 opacity-75">
          {/* Tracking Visual */}
          <div className="w-full md:w-64 shrink-0 bg-[#FAFAFA] rounded-2xl p-6 border border-border flex flex-col justify-center gap-4">
             <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
               <span>Shiprocket</span>
               <span>AWB: 10839210</span>
             </div>
             <div className="flex items-center justify-center py-4">
                <div className="h-16 w-px bg-primary relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-[3px] border-white shadow-[0_0_10px_rgba(176,255,77,0.8)]"></div>
                </div>
                <div className="h-16 flex flex-col justify-between ml-4 text-sm font-medium">
                  <span className="text-muted-foreground">Dispatched</span>
                  <span className="text-muted-foreground">In Transit</span>
                  <span className="text-[#1A1A1A]">Delivered</span>
                </div>
             </div>
          </div>
          
          {/* Details */}
          <div className="flex-1 flex flex-col">
             <div className="flex justify-between items-start mb-2">
               <h3 className="text-xl font-bold text-[#1A1A1A]">Office Chairs for HQ</h3>
               <Badge variant="secondary">Delivered</Badge>
             </div>
             <p className="text-sm text-muted-foreground">PO: #PO-2026-7944 • 120 Items • From: Delhi Hub</p>
             
             <div className="mt-8 flex items-center gap-6">
               <div className="flex items-center gap-2 text-sm text-[#1A1A1A] font-semibold bg-muted/50 px-4 py-2 rounded-xl">
                 <Package className="w-4 h-4 text-muted-foreground" /> Delivered on Sep 28
               </div>
             </div>
             
             <div className="mt-6 flex flex-wrap gap-3 pt-6 border-t border-border">
               <Button variant="outline" className="rounded-full">View Receipt</Button>
               <Button variant="ghost" className="rounded-full text-muted-foreground">Report Issue</Button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
