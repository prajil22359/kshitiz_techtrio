"use client";

import { 
  CheckCircle2, 
  Search, 
  Download, 
  FileText, 
  Banknote,
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

// Mock Data
const completedOrders = [
  {
    id: "PO-2026-8802",
    client: "All Product God (for Globex)",
    completionDate: "Sep 28, 2026",
    value: "₹ 8,40,000",
    paymentStatus: "Settled in Full",
    paymentDate: "Oct 05, 2026",
    type: "Hardware"
  },
  {
    id: "PO-2026-8795",
    client: "All Product God (for Soylent Corp)",
    completionDate: "Sep 15, 2026",
    value: "₹ 1,12,500",
    paymentStatus: "Settled in Full",
    paymentDate: "Sep 22, 2026",
    type: "Networking"
  },
  {
    id: "PO-2026-8815",
    client: "All Product God (for Initech)",
    completionDate: "Oct 01, 2026",
    value: "₹ 3,50,000",
    paymentStatus: "Pending clearing",
    paymentDate: "Est. Oct 15",
    type: "Software Licenses"
  },
  {
    id: "PO-2026-8740",
    client: "All Product God (for Massive Dynamic)",
    completionDate: "Aug 22, 2026",
    value: "₹ 14,00,000",
    paymentStatus: "Settled in Full",
    paymentDate: "Sep 01, 2026",
    type: "Hardware"
  }
];

export default function VendorCompletedOrders() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Historical Orders</h1>
        <p className="text-muted-foreground mt-1">Review finalized fulfillment data and payment settlements across your vendor account.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search PO number or Client..." className="pl-9 h-11 bg-white shadow-sm border-gray-200" />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="h-11 gap-2 flex-1 sm:flex-none">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button variant="outline" className="h-11 gap-2 flex-1 sm:flex-none">
            <Download className="w-4 h-4" /> Export Ledger
          </Button>
        </div>
      </div>

      <Card className="border-gray-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/80">
            <TableRow>
              <TableHead className="font-semibold px-6 py-4">Order Record</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Finalized On</TableHead>
              <TableHead className="font-semibold">Net Value</TableHead>
              <TableHead className="font-semibold">Settlement Ledger</TableHead>
              <TableHead className="font-semibold text-right px-6">Docs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {completedOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50/50 transition-colors">
                
                <TableCell className="px-6 py-4">
                  <div className="font-bold text-[#1A1A1A]">{order.id}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{order.client}</div>
                </TableCell>
                
                <TableCell>
                  <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100 font-medium border-gray-200">
                    {order.type}
                  </Badge>
                </TableCell>
                
                <TableCell className="text-sm font-medium text-muted-foreground">
                  {order.completionDate}
                </TableCell>
                
                <TableCell className="font-bold text-[#1A1A1A]">
                  {order.value}
                </TableCell>
                
                <TableCell>
                  {order.paymentStatus === "Settled in Full" ? (
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                         <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                       </div>
                       <div>
                         <div className="text-sm font-bold text-emerald-700">{order.paymentStatus}</div>
                         <div className="text-xs text-muted-foreground">Cleared: {order.paymentDate}</div>
                       </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                         <Banknote className="w-3 h-3 text-amber-600" />
                       </div>
                       <div>
                         <div className="text-sm font-bold text-amber-700">{order.paymentStatus}</div>
                         <div className="text-xs text-muted-foreground">{order.paymentDate}</div>
                       </div>
                    </div>
                  )}
                </TableCell>

                <TableCell className="text-right px-6">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                    <FileText className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                    <Download className="w-4 h-4" />
                  </Button>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

    </div>
  );
}
