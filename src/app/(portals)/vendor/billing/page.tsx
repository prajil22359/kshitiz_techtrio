"use client";

import Link from "next/link";
import { 
  Receipt, 
  ArrowRight,
  Landmark,
  FileText,
  CheckCircle2,
  AlertCircle,
  Download,
  Building2,
  Clock
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock Data
const pendingInvoices = [
  {
    id: "INV-01",
    tag: "Advance (50%)",
    po: "PO-2026-8921",
    submittedOn: "Oct 12, 2026",
    value: "₹ 2,25,000",
    status: "Processing Clearance",
    eta: "Next Settlement Cycle (Oct 15)"
  },
  {
    id: "INV-RE-491",
    tag: "Final Fulfillment",
    po: "PO-2026-8902",
    submittedOn: "Oct 09, 2026",
    value: "₹ 1,12,000",
    status: "Awaiting All Product God Approval",
    eta: "Estimating..."
  }
];

const settledInvoices = [
  {
    id: "INV-FE-331",
    tag: "Final Fulfillment",
    po: "PO-2026-8795",
    clearedOn: "Sep 22, 2026",
    value: "₹ 1,12,500",
    ref: "TXN-8829103991A"
  },
  {
    id: "INV-AD-330",
    tag: "Advance (100%)",
    po: "PO-2026-8802",
    clearedOn: "Sep 15, 2026",
    value: "₹ 8,40,000",
    ref: "TXN-4421101929X"
  }
];

export default function VendorBillingHub() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">Billing & Ledger</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-lg">
          Track outstanding clearances, download tax statements, and manage your connected payout configurations natively.
        </p>
      </div>

      {/* Financial Pulse Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-sm bg-gray-50/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Clearance</p>
                <h3 className="text-3xl font-bold text-[#1A1A1A] mt-1 text-emerald-700">₹ 3,37,000</h3>
                <p className="text-xs text-muted-foreground mt-2 font-medium">Spanning 2 active invoices</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm bg-gray-50/50 hidden md:block">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Settled (YTD)</p>
                <h3 className="text-3xl font-bold text-[#1A1A1A] mt-1">₹ 24,50,000</h3>
                <p className="text-xs text-muted-foreground mt-2 font-medium">100% payout success rate</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payout Routing (Mock FinTech element for investor wow-factor) */}
        <Card className="border-none shadow-sm bg-gradient-to-br from-[#1A1A1A] to-gray-800 text-white relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 blur-xl w-32 h-32 bg-white rounded-full"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-white/70">Secure Payout Routing</p>
                <h3 className="text-lg font-bold text-white mt-1 flex items-center gap-2">
                  <Landmark className="w-4 h-4" /> HDFC Bank Ltd.
                </h3>
                <p className="text-xs font-mono text-white/60 mt-1 tracking-widest">•••• •••• 8922</p>
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-3">Verified Target</p>
              </div>
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="bg-gray-100 p-1 rounded-xl h-14 mb-8">
          <TabsTrigger value="pending" className="rounded-lg h-full px-8 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Processing Payments
          </TabsTrigger>
          <TabsTrigger value="cleared" className="rounded-lg h-full px-8 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm text-muted-foreground data-[state=active]:text-foreground">
            Cleared Ledger
          </TabsTrigger>
        </TabsList>

        {/* --- PENDING TAB --- */}
        <TabsContent value="pending" className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
           <Card className="border-gray-200 shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                     <TableHead className="font-semibold px-6 py-4">Invoice Ledger</TableHead>
                     <TableHead className="font-semibold">Linked PO</TableHead>
                     <TableHead className="font-semibold">Billed On</TableHead>
                     <TableHead className="font-semibold">Value</TableHead>
                     <TableHead className="font-semibold">Clearance Status</TableHead>
                     <TableHead className="text-right px-6 font-semibold">Docs</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white">
                   {pendingInvoices.map((inv) => (
                     <TableRow key={inv.id} className="hover:bg-gray-50/50 group">
                       <TableCell className="px-6 py-4 border-l-2 border-transparent group-hover:border-primary transition-all">
                         <div className="font-bold text-[#1A1A1A] flex items-center gap-2">
                           <FileText className="w-4 h-4 text-primary" /> {inv.id}
                         </div>
                         <div className="text-xs text-muted-foreground font-medium mt-1">{inv.tag}</div>
                       </TableCell>
                       <TableCell>
                         <Link href={`/vendor/orders/${inv.po}`} className="font-semibold text-primary hover:underline">
                           {inv.po}
                         </Link>
                       </TableCell>
                       <TableCell className="text-sm font-medium text-muted-foreground">{inv.submittedOn}</TableCell>
                       <TableCell className="font-bold text-[#1A1A1A]">{inv.value}</TableCell>
                       <TableCell>
                         <Badge variant="outline" className={`
                           ${inv.status.includes('Processing') ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-blue-50 text-blue-700 border-blue-200'} font-semibold py-1
                         `}>
                           {inv.status}
                         </Badge>
                         <span className="block text-[10px] text-muted-foreground uppercase font-bold mt-2 tracking-wide">{inv.eta}</span>
                       </TableCell>
                       <TableCell className="text-right px-6">
                         <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <Download className="w-4 h-4" />
                         </Button>
                       </TableCell>
                     </TableRow>
                   ))}
                </TableBody>
              </Table>
              
              <div className="p-4 bg-gray-50 border-t flex items-start gap-3">
                 <AlertCircle className="w-4 h-4 mt-0.5 text-muted-foreground" />
                 <p className="text-xs text-muted-foreground font-medium">
                   All Product God Procurement Services runs batch clearances every Tuesday and Friday. Funds typically reflect in your registered bank account within 24 hours of clearance.
                 </p>
              </div>
           </Card>
        </TabsContent>


        {/* --- CLEARED HISTORY TAB --- */}
        <TabsContent value="cleared" className="animate-in fade-in slide-in-from-bottom-2">
           <Card className="border-gray-200 shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                     <TableHead className="font-semibold px-6 py-4">Settled Invoice</TableHead>
                     <TableHead className="font-semibold">Linked PO</TableHead>
                     <TableHead className="font-semibold">Cleared Date</TableHead>
                     <TableHead className="font-semibold">Net Value</TableHead>
                     <TableHead className="font-semibold">Bank Ref (UTR)</TableHead>
                     <TableHead className="text-right px-6 font-semibold">Docs</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white">
                   {settledInvoices.map((inv) => (
                     <TableRow key={inv.id} className="hover:bg-gray-50/50">
                       <TableCell className="px-6 py-4 border-l-2 border-emerald-500">
                         <div className="font-bold text-[#1A1A1A]">{inv.id}</div>
                         <div className="text-xs text-muted-foreground font-medium mt-1">{inv.tag}</div>
                       </TableCell>
                       <TableCell>
                         <span className="font-medium text-muted-foreground">
                           {inv.po}
                         </span>
                       </TableCell>
                       <TableCell className="text-sm font-medium text-muted-foreground">{inv.clearedOn}</TableCell>
                       <TableCell className="font-bold text-emerald-700">{inv.value}</TableCell>
                       <TableCell>
                         <span className="font-mono text-xs font-semibold bg-gray-100 px-2 py-1 rounded border border-gray-200">
                           {inv.ref}
                         </span>
                       </TableCell>
                       <TableCell className="text-right px-6">
                         <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <Download className="w-4 h-4" />
                         </Button>
                       </TableCell>
                     </TableRow>
                   ))}
                </TableBody>
              </Table>
           </Card>
        </TabsContent>

      </Tabs>

    </div>
  );
}
