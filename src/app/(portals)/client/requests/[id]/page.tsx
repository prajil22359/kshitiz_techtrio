import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChevronRight, Truck, Clock, Package } from "lucide-react";

export default function ProposalView() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-[#1A1A1A]">20-seat cafe setup in Mumbai</h1>
            <Badge variant="premium">Awaiting Approval</Badge>
          </div>
          <p className="text-muted-foreground text-sm font-medium">Req ID: #REQ-8492-MB | Created on Oct 24, 2026</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="rounded-full">Download PDF</Button>
           <Button className="rounded-full shadow-soft bg-[#1A1A1A] text-white hover:bg-black">Approve All Premium</Button>
        </div>
      </div>

      {/* Tracking Line */}
      <div className="bg-white p-8 rounded-[32px] shadow-soft border border-border">
         <h3 className="font-semibold text-lg text-[#1A1A1A] mb-8">Status Timeline</h3>
         <div className="relative flex items-center justify-between px-4 sm:px-12">
            {/* Horizontal Line behind */}
            <div className="absolute top-1/2 left-16 right-16 h-1 bg-muted -translate-y-1/2 rounded-full z-0" />
            <div className="absolute top-1/2 left-16 right-1/2 h-1 bg-primary -translate-y-1/2 rounded-full z-0 transition-all duration-1000" />
            
            {/* Nodes */}
            <div className="relative z-10 flex flex-col items-center gap-3 focus:outline-none">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-[0_0_15px_rgba(176,255,77,0.5)]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-[#1A1A1A] text-center">Requested</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center shadow-lg border-4 border-white">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-[#1A1A1A] text-center">Curated</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-muted flex items-center justify-center text-muted-foreground">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-muted-foreground text-center">In Transit</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-3 hidden sm:flex">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-muted flex items-center justify-center text-muted-foreground">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-muted-foreground text-center">Delivered</span>
            </div>
         </div>
      </div>

      {/* Vendor Quote Comparison Container */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1A]">Curated Options</h2>
        <p className="text-muted-foreground">Our operation team has vetted over 15 bids for your manifest. Please select the tier that fits your budget.</p>

        {/* Item 1 */}
        <div className="bg-white rounded-[32px] p-8 shadow-soft border border-border">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <div>
              <h3 className="text-xl font-bold text-[#1A1A1A]">1. Commercial Espresso Machine</h3>
              <p className="text-sm text-muted-foreground">Quantity: 1x</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Basic Card */}
            <div className="rounded-2xl border border-border p-6 flex flex-col hover:border-primary/50 transition-colors group cursor-pointer">
              <Badge variant="secondary" className="w-max mb-4">Basic Tier</Badge>
              <h4 className="font-bold text-lg text-[#1A1A1A]">₹280,000</h4>
              <p className="text-sm font-medium text-muted-foreground mt-1 mb-6">Delivery: 7 Days (ETA: Oct 31)</p>
              
              <ul className="text-sm space-y-3 mb-8 flex-1 text-muted-foreground group-hover:text-foreground transition-colors">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 shrink-0 text-primary" /> Single Group Head</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 shrink-0 text-primary" /> Baseline Build Quality</li>
                <li className="flex items-center gap-2 line-through opacity-50"><ChevronRight className="w-4 h-4 shrink-0" /> No warranty included</li>
              </ul>
              <Button variant="outline" className="w-full rounded-xl">Select Basic</Button>
            </div>

            {/* Premium Card (Selected/Highlighted) */}
            <div className="rounded-2xl border-2 border-primary p-6 flex flex-col relative shadow-[0_8px_30px_rgb(176,255,77,0.15)] bg-primary/[0.02]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Recommended
              </div>
              <Badge variant="outline" className="w-max mb-4 border-primary text-[#1A1A1A]">Premium Tier</Badge>
              <h4 className="font-bold text-lg text-[#1A1A1A]">₹390,000</h4>
              <p className="text-sm font-medium text-[#1A1A1A] mt-1 mb-6">Delivery: 3 Days (ETA: Oct 27)</p>
              
              <ul className="text-sm space-y-3 mb-8 flex-1 text-[#1A1A1A] font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-primary" /> Dual Group Head</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-primary" /> Stainless Steel Build</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-primary" /> 1-Year Priority Warranty</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-primary" /> Free Installation Support</li>
              </ul>
              <Button className="w-full rounded-xl bg-[#1A1A1A] text-white hover:bg-black">Selected</Button>
            </div>

            {/* Intermediate Card */}
            <div className="rounded-2xl border border-border p-6 flex flex-col hover:border-primary/50 transition-colors group cursor-pointer opacity-70 hover:opacity-100">
              <Badge variant="secondary" className="w-max mb-4">Intermediate Tier</Badge>
              <h4 className="font-bold text-lg text-[#1A1A1A]">₹320,000</h4>
              <p className="text-sm font-medium text-muted-foreground mt-1 mb-6">Delivery: 5 Days (ETA: Oct 29)</p>
              
              <ul className="text-sm space-y-3 mb-8 flex-1 text-muted-foreground group-hover:text-foreground transition-colors">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 shrink-0 text-primary" /> Heat Exchange Boiler</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 shrink-0 text-primary" /> Mid-range Build Quality</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 shrink-0 text-primary" /> 6-Month limited warranty</li>
              </ul>
              <Button variant="outline" className="w-full rounded-xl">Select Intermediate</Button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
