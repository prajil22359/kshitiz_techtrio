import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Download, Receipt, ArrowRight } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Payments & Invoices</h1>
          <p className="text-muted-foreground mt-1">Manage your financial obligations and download receipts.</p>
        </div>
      </div>

      {/* Hero Overview */}
      <div className="bg-[#1A1A1A] rounded-[32px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div>
          <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">Total Outstanding</p>
          <div className="flex items-baseline gap-4">
            <h2 className="text-5xl font-bold tracking-tight">₹3,90,000</h2>
            <span className="text-primary text-sm font-semibold bg-primary/10 px-3 py-1 rounded-full">Due in 5 Days</span>
          </div>
          <p className="text-white/80 text-sm mt-4">Next invoice #INV-4928 is due on Oct 30, 2026.</p>
        </div>
        <Button size="lg" className="rounded-full shadow-[0_0_15px_rgba(176,255,77,0.3)] bg-primary text-black hover:bg-primary/90 h-14 px-8 text-lg font-bold w-full md:w-auto">
          Pay Now <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Invoice Table Container */}
      <div className="bg-white rounded-[32px] shadow-soft border border-border overflow-hidden">
        <div className="px-8 py-6 border-b border-border flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#1A1A1A]">Recent Invoices</h3>
          <Button variant="ghost" className="text-muted-foreground">View All</Button>
        </div>
        
        <div className="divide-y divide-border">
          
          {/* Item 1 - Unpaid */}
          <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30 text-primary">
                 <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#1A1A1A]">Invoice #INV-4928</h4>
                <p className="text-sm text-muted-foreground mt-1">For: 20-seat cafe setup in Mumbai</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
              <div className="text-right">
                <p className="text-lg font-bold text-[#1A1A1A]">₹3,90,000</p>
                <p className="text-xs text-muted-foreground">Issued Oct 25, 2026</p>
              </div>
              <Badge variant="outline" className="border-primary text-[#1A1A1A]">Unpaid</Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full"><Download className="w-4 h-4" /></Button>
                <Button className="rounded-full bg-[#1A1A1A] text-white hover:bg-black">Pay</Button>
              </div>
            </div>
          </div>

          {/* Item 2 - Paid */}
          <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/30 transition-colors opacity-75 grayscale-[0.2]">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                 <Receipt className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#1A1A1A]">Invoice #INV-4102</h4>
                <p className="text-sm text-muted-foreground mt-1">For: Enterprise Laptops Batch B</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
              <div className="text-right">
                <p className="text-lg font-bold text-[#1A1A1A]">₹4,500,000</p>
                <p className="text-xs text-muted-foreground">Paid Oct 12, 2026</p>
              </div>
              <Badge variant="secondary">Paid</Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full"><Download className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>

          {/* Item 3 - Paid */}
          <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/30 transition-colors opacity-75 grayscale-[0.2]">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                 <Receipt className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#1A1A1A]">Invoice #INV-3991</h4>
                <p className="text-sm text-muted-foreground mt-1">For: Office Chairs for HQ</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
              <div className="text-right">
                <p className="text-lg font-bold text-[#1A1A1A]">₹1,200,000</p>
                <p className="text-xs text-muted-foreground">Paid Sep 20, 2026</p>
              </div>
              <Badge variant="secondary">Paid</Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full"><Download className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
