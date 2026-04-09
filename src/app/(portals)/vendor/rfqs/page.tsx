"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  FileText, 
  Zap, 
  AlertCircle,
  PackageSearch,
  Check,
  Building2
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Mock Data
const openRequests = [
  {
    id: "RFQ-2026-901",
    client: "GlobalSys Corp",
    items: "Dell Latitude 5430 (i7, 16GB) x 50",
    deadline: "Oct 15, 2026 (2 days left)",
    budget: "Strict",
    status: "Urgent"
  },
  {
    id: "RFQ-2026-905",
    client: "Acme Enterprises",
    items: "Cisco Catalyst 9300 Switches x 5",
    deadline: "Oct 18, 2026",
    budget: "Flexible",
    status: "New"
  }
];

const activeBids = [
  {
    id: "RFQ-2026-885",
    client: "Innotech Labs",
    items: "Herman Miller Aeron Chairs x 20",
    submittedOn: "Oct 10, 2026",
    myQuote: "₹ 18,40,000",
    status: "Under Review"
  }
];

const historical = [
  {
    id: "RFQ-2026-850",
    client: "Soylent Corp",
    items: "MacBook Pro M3 x 10",
    outcome: "Won",
    date: "Sep 22, 2026",
    convertedTo: "PO-2026-8795"
  },
  {
    id: "RFQ-2026-842",
    client: "Massive Dynamic",
    items: "Server Racks x 2",
    outcome: "Lost - Price to High",
    date: "Sep 18, 2026",
    convertedTo: null
  }
];

export default function VendorRFQHub() {
  const [selectedRfq, setSelectedRfq] = useState<typeof openRequests[0] | null>(null);
  const [isQuoted, setIsQuoted] = useState(false);
  const [autofillActive, setAutofillActive] = useState(false);
  const [price, setPrice] = useState("");
  const [leadTime, setLeadTime] = useState("");

  const handleAutofill = () => {
    setAutofillActive(true);
    setPrice("65000"); // Mock catalog price
    setLeadTime("14");
    setTimeout(() => setAutofillActive(false), 1000);
  };

  const handleSubmitQuote = () => {
    setIsQuoted(true);
    setTimeout(() => {
      setIsQuoted(false);
      // In a real app we would close the sheet here
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Quote Success Overlay Animation */}
      {isQuoted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white p-8 rounded-[32px] shadow-2xl flex flex-col items-center max-w-md w-full animate-in zoom-in-95 duration-500 relative overflow-hidden">
             <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6 shadow-inner ring-8 ring-primary/10">
               <CheckCircle2 className="w-10 h-10 animate-in zoom-in duration-300 delay-150" />
             </div>
             
             <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2 text-center">Quote Submitted!</h3>
             <p className="text-muted-foreground text-center mb-6 text-sm">
               Your binding bid has been securely routed to All Product God Admins. You will be notified instantly if you win the contract.
             </p>
             
             <div className="mt-4 flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 px-4 py-2 rounded-full">
                Moving to "Active Bids" <ArrowRight className="w-4 h-4 animate-pulse" />
             </div>
           </div>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">RFQ Pipeline</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-lg">
          Manage all incoming procurement requests. Submit binding quotes quickly using your catalog prices or negotiate custom deals.
        </p>
      </div>

      <Tabs defaultValue="open" className="w-full">
        <TabsList className="bg-gray-100 p-1 rounded-xl h-14 mb-8">
          <TabsTrigger value="open" className="rounded-lg h-full px-8 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Open Requests <Badge className="ml-2 bg-primary text-primary-foreground border-none">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="active" className="rounded-lg h-full px-8 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm text-muted-foreground data-[state=active]:text-foreground">
            Active Bids
          </TabsTrigger>
          <TabsTrigger value="historical" className="rounded-lg h-full px-8 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm text-muted-foreground data-[state=active]:text-foreground">
            Historical
          </TabsTrigger>
        </TabsList>

        {/* --- OPEN REQUESTS TAB --- */}
        <TabsContent value="open" className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
          {openRequests.map((rfq) => (
            <Card key={rfq.id} className="border-gray-200 shadow-sm hover:border-primary/50 transition-colors group">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-[#1A1A1A]">{rfq.id}</h3>
                      <Badge variant="outline" className={rfq.status === 'Urgent' ? 'bg-red-50 text-red-700 border-red-200 uppercase font-bold' : 'bg-blue-50 text-blue-700 border-blue-200 uppercase font-bold'}>
                        {rfq.status}
                      </Badge>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Building2 className="w-4 h-4" /> End-Client Context: {rfq.client}
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end">
                    <div className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
                      <Clock className="w-4 h-4 text-amber-600" /> Bidding closes: {rfq.deadline}
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">Budget: {rfq.budget}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-white rounded-lg shadow-sm border flex items-center justify-center shrink-0">
                       <PackageSearch className="w-5 h-5 text-muted-foreground" />
                     </div>
                     <div>
                       <span className="text-xs uppercase font-bold text-muted-foreground tracking-wider mb-1 block">Requested Spec</span>
                       <span className="font-semibold text-foreground">{rfq.items}</span>
                     </div>
                   </div>
                   
                   <Sheet>
                     <SheetTrigger render={<Button className="w-full md:w-auto h-11 px-6 font-bold shadow-sm" onClick={() => setSelectedRfq(rfq)} />}>
                       Review & Quote <ArrowRight className="w-4 h-4 ml-2" />
                     </SheetTrigger>
                     
                     <SheetContent className="w-full sm:max-w-xl overflow-y-auto border-l-0 shadow-2xl p-0">
                       <div className="bg-[#1A1A1A] p-6 text-white relative">
                          <Badge className="bg-primary/20 text-primary border-primary/50 mb-3">{rfq.status} Request</Badge>
                          <h2 className="text-2xl font-extrabold">{rfq.id}</h2>
                          <div className="text-white/60 text-sm mt-1 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Deadline: {rfq.deadline}
                          </div>
                       </div>
                       
                       <div className="p-6 space-y-8">
                          
                          {/* Details */}
                          <div className="bg-gray-50 rounded-xl p-5 border border-border">
                            <h4 className="font-bold text-[#1A1A1A] mb-3 text-sm uppercase tracking-wider text-muted-foreground">Requisition Details</h4>
                            <p className="text-lg font-semibold text-foreground">{rfq.items}</p>
                            <p className="text-sm text-muted-foreground mt-2 border-t pt-2 border-border/50">
                              All Product God requires a binding quote including standard shipping to Gurugram, HR.
                            </p>
                          </div>

                          {/* Quick Quote Autofill */}
                          <Card className="bg-primary/5 border-primary/20 shadow-none relative overflow-hidden group hover:bg-primary/10 transition-colors cursor-pointer" onClick={handleAutofill}>
                             <CardContent className="p-4 flex items-center gap-4">
                               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                                 {autofillActive ? <Check className="w-5 h-5 text-emerald-600" /> : <Zap className="w-5 h-5 text-primary" />}
                               </div>
                               <div>
                                 <p className="font-bold text-primary">Quote at Catalog Retail Price</p>
                                 <p className="text-xs text-primary/70">Automatically pull unit prices & lead times from your Catalog Hub database.</p>
                               </div>
                             </CardContent>
                          </Card>

                          {/* Bidding Form */}
                          <div className="space-y-5 border border-border rounded-2xl p-6 shadow-sm">
                             <h4 className="font-bold text-[#1A1A1A] text-lg flex items-center gap-2">
                               <FileText className="w-5 h-5 text-muted-foreground" /> Your Binding Bid
                             </h4>
                             
                             <div className="space-y-4 pt-2">
                               <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-2">
                                   <label className="text-sm font-semibold">Unit Price (₹)</label>
                                   <Input 
                                     type="number" 
                                     placeholder="e.g. 65000" 
                                     className={`h-11 font-medium ${autofillActive ? 'ring-2 ring-emerald-500 bg-emerald-50' : ''}`}
                                     value={price}
                                     onChange={(e) => setPrice(e.target.value)}
                                   />
                                 </div>
                                 <div className="space-y-2">
                                   <label className="text-sm font-semibold">Lead Time (Days)</label>
                                   <Input 
                                     type="number" 
                                     placeholder="e.g. 14" 
                                     className={`h-11 font-medium ${autofillActive ? 'ring-2 ring-emerald-500 bg-emerald-50' : ''}`}
                                     value={leadTime}
                                     onChange={(e) => setLeadTime(e.target.value)}
                                   />
                                 </div>
                               </div>

                               <div className="space-y-2">
                                 <label className="text-sm font-semibold">Taxes & Warranty Notes</label>
                                 <Input placeholder="Inclusive of 18% GST. 1yr Manufacturer Warranty." className="h-11" />
                               </div>
                             </div>

                             <div className="bg-amber-50 p-3 rounded-lg flex gap-3 text-amber-900 border border-amber-200 mt-4">
                               <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                               <p className="text-xs font-medium">By submitting, you agree to fulfill the order at these exact rates if accepted by All Product God within 48 hours.</p>
                             </div>

                             <Button className="w-full h-12 text-base font-bold shadow-sm" onClick={handleSubmitQuote}>
                               Submit Binding Quote
                             </Button>
                          </div>

                       </div>
                     </SheetContent>
                   </Sheet>
                </div>

              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* --- ACTIVE BIDS TAB --- */}
        <TabsContent value="active" className="animate-in fade-in slide-in-from-bottom-2">
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
               {activeBids.map((bid) => (
                 <div key={bid.id} className="p-6 border-b hover:bg-gray-50/50 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                   <div className="space-y-1">
                     <div className="flex items-center gap-3">
                       <h3 className="text-lg font-bold text-[#1A1A1A]">{bid.id}</h3>
                       <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 font-semibold">{bid.status}</Badge>
                     </div>
                     <p className="text-sm font-medium text-foreground">{bid.items}</p>
                     <p className="text-xs text-muted-foreground font-medium">Submitted on {bid.submittedOn}</p>
                   </div>
                   
                   <div className="flex flex-col md:items-end">
                     <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-1 block">Your Quote Value</span>
                     <span className="text-xl font-bold text-[#1A1A1A]">{bid.myQuote}</span>
                   </div>
                 </div>
               ))}
               <div className="p-6 text-center text-sm text-muted-foreground font-medium">
                 End of active bids.
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- HISTORICAL TAB --- */}
        <TabsContent value="historical" className="animate-in fade-in slide-in-from-bottom-2">
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
               {historical.map((hist) => (
                 <div key={hist.id} className="p-6 border-b hover:bg-gray-50/50 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                   <div className="space-y-1">
                     <div className="flex items-center gap-3">
                       <h3 className="text-lg font-bold text-[#1A1A1A]">{hist.id}</h3>
                       {hist.outcome === 'Won' ? (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold">Contract Won</Badge>
                       ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-200 font-semibold">Contract Lost</Badge>
                       )}
                     </div>
                     <p className="text-sm font-medium text-foreground">{hist.items}</p>
                     <p className="text-xs text-muted-foreground font-medium">Concluded on {hist.date}</p>
                   </div>
                   
                   <div className="flex flex-col md:items-end">
                     {hist.convertedTo && (
                       <Link href={`/vendor/orders/${hist.convertedTo}`}>
                          <Button variant="outline" size="sm" className="font-bold">
                            View Order {hist.convertedTo} <ArrowRight className="w-3 h-3 ml-2" />
                          </Button>
                       </Link>
                     )}
                   </div>
                 </div>
               ))}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

    </div>
  );
}
