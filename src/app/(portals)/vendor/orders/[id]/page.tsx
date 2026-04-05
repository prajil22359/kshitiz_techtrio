"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Download, PackageSearch, MapPin, Truck, Receipt, 
  AlertCircle, CheckCircle2, Clock, ArrowRight, UploadCloud, 
  MessageSquare, Box, User, CreditCard
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock Data targeting ID PO-2026-8921
const order = {
  id: "PO-2026-8921",
  date: "Oct 12, 2026",
  client: "TechTrio Procurement Services",
  endClient: "Acme Corp (Tower B, Cyber City, DLF Phase 2)",
  status: "Manufacturing",
  value: "₹ 4,50,000",
  dueDate: "Oct 18, 2026"
};

const lineItems = [
  { id: "SKU-4819", name: "Dell Latitude 5430 (i7, 16GB)", qty: 5, price: "₹ 65,000", status: "Prepared" },
  { id: "SKU-2291", name: "Dell Essential Briefcase 15", qty: 5, price: "₹ 2,500", status: "In Transit" },
  { id: "SKU-1011", name: "Logitech MX Master 3S", qty: 5, price: "₹ 8,000", status: "Pending" }
];

export default function OrderDedicatedPage() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [invoiceRaised, setInvoiceRaised] = useState(false);

  const handleRaiseInvoice = () => {
    setIsDialogOpen(false);
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setInvoiceRaised(true);
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Invoice Routing Overlay Animation */}
      {showAnimation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white p-8 rounded-[32px] shadow-2xl flex flex-col items-center max-w-md w-full animate-in zoom-in-95 duration-500 relative overflow-hidden">
             
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-emerald-500/20 blur-[60px] rounded-full pointer-events-none" />

             <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
               <Receipt className="w-10 h-10 animate-bounce" />
             </div>
             
             <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2 text-center">Invoice Raised!</h3>
             <p className="text-muted-foreground text-center mb-6">
               Your invoice has been generated and routed to TechTrio for clearance. It is now visible in your Billing Hub.
             </p>
             
             <div className="w-full bg-gray-50 rounded-xl p-4 border flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Order ID</span>
                <span className="text-sm font-bold text-foreground">{order.id}</span>
             </div>

             <div className="mt-8 flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 px-4 py-2 rounded-full">
                Moving to Billing <ArrowRight className="w-4 h-4 animate-pulse" />
             </div>
           </div>
        </div>
      )}

      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/vendor/orders" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 font-medium mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Ongoing Orders
          </Link>
          <div className="flex items-center gap-3">
             <h1 className="text-3xl font-extrabold text-[#1A1A1A]">{order.id}</h1>
             <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 uppercase tracking-wider font-bold">
               {order.status}
             </Badge>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="bg-white">
            <Download className="w-4 h-4 mr-2" /> Download PO
          </Button>
          <Button className="shadow-sm">
            <MapPin className="w-4 h-4 mr-2" /> Add Tracking
          </Button>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-900 shadow-sm border-l-4 border-l-amber-500">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 opacity-90" />
        <div className="text-sm">
          <span className="font-bold block mb-1">Billing Protocol Active</span>
          Under current terms, all advance & split invoices must be raised directly to <span className="font-semibold">{order.client}</span>. Do not invoice the end-client.
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* --- LEFT / MAIN COLUMN (Logistics & Items) --- */}
        <div className="xl:col-span-2 space-y-6">

          {/* Logistics Stepper Bento */}
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Truck className="w-5 h-5 text-muted-foreground" />
                Fulfillment Logistics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              
              {/* Premium Stepper */}
              <div className="relative flex justify-between items-center mb-8 max-w-2xl mx-auto">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 -z-10 rounded-full"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[35%] h-1 bg-primary -z-10 rounded-full"></div>
                
                <div className="flex flex-col items-center gap-2 bg-white px-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold ring-4 ring-white shadow-sm"><CheckCircle2 className="w-5 h-5"/></div>
                  <span className="text-xs font-bold">Confirmed</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white px-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold ring-4 ring-white shadow-sm"><Box className="w-4 h-4"/></div>
                  <span className="text-xs font-bold">Manufacturing</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white px-2 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-gray-200 text-muted-foreground flex items-center justify-center font-bold ring-4 ring-white"><Truck className="w-4 h-4"/></div>
                  <span className="text-xs font-bold">Dispatched</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white px-2 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-gray-200 text-muted-foreground flex items-center justify-center font-bold ring-4 ring-white"><MapPin className="w-4 h-4"/></div>
                  <span className="text-xs font-bold">Delivered</span>
                </div>
              </div>

              <div className="bg-gray-50 border rounded-xl p-5 flex items-start gap-4">
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 uppercase font-bold text-gray-500">AC</div>
                 <div>
                   <p className="text-sm font-semibold text-[#1A1A1A]">Drop-ship Context: {order.endClient}</p>
                   <p className="text-sm text-muted-foreground mt-1">Please ensure white-label packaging. Standard delivery ETA assigned.</p>
                 </div>
              </div>

            </CardContent>
          </Card>

          {/* Line Items Bento */}
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b pb-4 flex flex-row justify-between items-center">
              <CardTitle className="text-lg flex items-center gap-2">
                <PackageSearch className="w-5 h-5 text-muted-foreground" />
                Line Items
              </CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/30">
                    <TableHead className="w-16">Item</TableHead>
                    <TableHead>Specification</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right pr-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lineItems.map((item, i) => (
                    <TableRow key={i} className="hover:bg-gray-50/50">
                      <TableCell>
                         <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border text-xs font-bold text-gray-400">
                           IMG
                         </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-[#1A1A1A]">{item.name}</div>
                        <div className="text-xs text-muted-foreground font-mono mt-1">{item.id}</div>
                      </TableCell>
                      <TableCell className="font-medium text-muted-foreground">x{item.qty}</TableCell>
                      <TableCell className="text-right font-medium">{item.price}</TableCell>
                      <TableCell className="text-right pr-6">
                        <Badge variant="outline" className={`
                          ${item.status === 'Prepared' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : ''}
                          ${item.status === 'In Transit' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                          ${item.status === 'Pending' ? 'bg-gray-50 text-gray-700 border-gray-200' : ''}
                        `}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

        </div>

        {/* --- RIGHT / SIDE COLUMN (Financials & Logs) --- */}
        <div className="xl:col-span-1 space-y-6">

           {/* Financial Pulse Bento */}
           <Card className="border-gray-200 shadow-sm relative overflow-hidden">
             {/* Glow effect */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full"></div>
             
             <CardHeader className="pb-2">
               <CardTitle className="text-lg flex items-center gap-2">
                 <Receipt className="w-5 h-5 text-muted-foreground" />
                 Financial Pulse
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-6">
               
               <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Total PO Value</p>
                  <h3 className="text-3xl font-extrabold text-[#1A1A1A]">{order.value}</h3>
               </div>

               {/* Split Payment Visualizer */}
               <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-emerald-600 uppercase tracking-wider">Invoiced ({invoiceRaised ? '50%' : '0%'})</span>
                    <span className="text-muted-foreground uppercase tracking-wider">Pending ({invoiceRaised ? '50%' : '100%'})</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full flex overflow-hidden">
                    <div className={`h-full bg-emerald-500 transition-all duration-1000 ${invoiceRaised ? 'w-1/2' : 'w-0'}`}></div>
                  </div>
               </div>

               {/* Invoice Ledger mini */}
               {invoiceRaised ? (
                 <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex justify-between items-center text-sm shadow-sm animate-in fade-in slide-in-from-top-2">
                   <div className="flex items-center gap-2 text-emerald-900 font-medium">
                     <CheckCircle2 className="w-4 h-4 text-emerald-600" /> INV-01 (Advance)
                   </div>
                   <span className="font-bold text-emerald-700">₹ 2,25,000</span>
                 </div>
               ) : (
                 <div className="bg-gray-50 border rounded-xl p-5 text-center">
                   <p className="text-sm text-muted-foreground mb-4 font-medium">No invoices raised yet.</p>
                   
                   <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger render={<Button className="w-full bg-[#1A1A1A] hover:bg-black font-bold h-11 shadow-sm" />}>
                          Raise Invoice <ArrowRight className="w-4 h-4 ml-2" />
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[450px]">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">Raise Invoice</DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-6 pt-4">
                          <div className="bg-primary/5 p-4 rounded-xl text-sm border border-primary/20 flex gap-3 text-primary-foreground text-black">
                            <CreditCard className="w-5 h-5 shrink-0 text-primary" />
                            <div>
                              You are invoicing <span className="font-bold">TechTrio Procurement</span> for Order <span className="font-bold">{order.id}</span>.
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-semibold">Invoice Concept</label>
                              <select className="w-full h-11 border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-medium">
                                <option>Advance Payment Request (50%)</option>
                                <option>Partial Delivery Fulfillment</option>
                                <option>Full & Final Settlement</option>
                              </select>
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-semibold">Amount to Raise (₹)</label>
                              <Input type="number" placeholder="e.g. 225000" className="h-12 font-bold text-lg" defaultValue="225000" />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-semibold">Upload Your Tax Invoice (Optional)</label>
                              <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 flex flex-col items-center justify-center gap-2 transition-colors group">
                                <UploadCloud className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                <span className="text-sm text-foreground font-semibold mt-1">Click to upload PDF</span>
                                <span className="text-[11px] text-muted-foreground max-w-[200px] leading-tight">If not uploaded, TechTrio generates an auto-invoice.</span>
                              </div>
                            </div>
                          </div>

                          <Button className="w-full h-12 font-bold text-base shadow-md group" onClick={handleRaiseInvoice}>
                            Submit & Route to Billing
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                 </div>
               )}
               
             </CardContent>
           </Card>

           {/* Activity Log Bento */}
           <Card className="border-gray-200 shadow-sm bg-gray-50/30">
             <CardHeader className="pb-4 border-b">
               <CardTitle className="text-lg flex items-center gap-2">
                 <MessageSquare className="w-5 h-5 text-muted-foreground" />
                 Audit Log
               </CardTitle>
             </CardHeader>
             <CardContent className="p-0">
               <div className="flex flex-col">
                 
                 <div className="p-4 border-b bg-white flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                     <User className="w-4 h-4" />
                   </div>
                   <div>
                     <p className="text-sm font-semibold text-[#1A1A1A]">TechTrio Admin verified PO terms.</p>
                     <p className="text-xs text-muted-foreground mt-1">Oct 12, 10:45 AM</p>
                   </div>
                 </div>

                 <div className="p-4 bg-white flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center shrink-0 border">
                     <PackageSearch className="w-4 h-4" />
                   </div>
                   <div>
                     <p className="text-sm font-semibold text-[#1A1A1A]">Vendor confirmed receipt.</p>
                     <p className="text-xs text-muted-foreground mt-1">Oct 12, 09:30 AM</p>
                   </div>
                 </div>

               </div>
               
               <div className="p-4 border-t bg-gray-50">
                 <div className="relative">
                   <Input placeholder="Add a note to TechTrio..." className="pr-10 h-10 shadow-sm" />
                   <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-10 w-10 text-muted-foreground hover:text-primary">
                     <ArrowRight className="w-4 h-4" />
                   </Button>
                 </div>
               </div>

             </CardContent>
           </Card>

        </div>

      </div>

    </div>
  );
}
