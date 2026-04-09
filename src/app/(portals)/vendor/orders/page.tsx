"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  PackageSearch, 
  MapPin, 
  Truck, 
  Receipt,
  Download,
  AlertCircle,
  FileText,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock Data
const orders = [
  {
    id: "PO-2026-8921",
    date: "Oct 12, 2026",
    client: "All Product God (for Acme Corp)",
    items: "Dell Latitude 5430 & 2 more",
    value: "₹ 4,50,000",
    status: "Processing",
    progress: 25,
    dueDate: "Oct 18, 2026"
  },
  {
    id: "PO-2026-8924",
    date: "Oct 10, 2026",
    client: "All Product God (for Innotech)",
    items: "Herman Miller Aeron Chairs (x12)",
    value: "₹ 11,20,000",
    status: "In Transit",
    progress: 75,
    dueDate: "Oct 14, 2026"
  },
  {
    id: "PO-2026-8930",
    date: "Oct 08, 2026",
    client: "All Product God (for GlobalSys)",
    items: "Cisco Meraki Routers (x5)",
    value: "₹ 2,15,000",
    status: "Partially Invoiced",
    progress: 50,
    dueDate: "Oct 20, 2026"
  }
];

export default function VendorActiveOrders() {
  return (
    <div className="space-y-6 relative">

      {/* Header Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-sm bg-gradient-to-br from-white to-gray-50/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Orders</p>
                <h3 className="text-3xl font-bold text-[#1A1A1A] mt-1">3</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <PackageSearch className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm bg-gradient-to-br from-white to-gray-50/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Value</p>
                <h3 className="text-3xl font-bold text-[#1A1A1A] mt-1">₹ 17,85,000</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-white to-gray-50/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ready to Invoice</p>
                <h3 className="text-3xl font-bold text-[#1A1A1A] mt-1">1</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Data Table */}
      <Card className="border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b bg-white flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#1A1A1A]">Ongoing Fulfillment</h2>
        </div>
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="font-semibold px-6 py-4">Order Details</TableHead>
              <TableHead className="font-semibold">Line Items</TableHead>
              <TableHead className="font-semibold">Delivery By</TableHead>
              <TableHead className="font-semibold">Total Value</TableHead>
              <TableHead className="font-semibold text-right px-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                <TableCell className="px-6 py-4 border-l-2 border-transparent group-hover:border-primary transition-all">
                  <div className="font-semibold text-[#1A1A1A]">{order.id}</div>
                  <div className="text-sm text-muted-foreground">{order.client}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] uppercase font-bold tracking-wider">
                      {order.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <PackageSearch className="w-4 h-4" />
                    {order.items}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm font-semibold">{order.dueDate}</div>
                  <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${order.progress === 100 ? 'bg-emerald-500' : 'bg-primary'}`} 
                      style={{ width: `${order.progress}%` }} 
                    />
                  </div>
                </TableCell>
                <TableCell className="font-bold text-[#1A1A1A]">
                  {order.value}
                </TableCell>
                <TableCell className="text-right px-6">
                  <Link href={`/vendor/orders/${order.id}`}>
                    <Button variant="secondary" className="bg-gray-100 shadow-none hover:bg-gray-200 font-semibold group-hover:bg-primary group-hover:text-white transition-colors">
                      Dossier <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
