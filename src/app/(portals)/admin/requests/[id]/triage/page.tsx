import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminTriage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1A1A]">Intake Triage #REQ-8492</h1>
        <p className="text-muted-foreground mt-1">Review AI-structured list and dispatch RFQs to vendors.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         <div className="bg-white p-6 rounded-3xl shadow-soft border border-border lg:col-span-2">
            <h3 className="font-bold text-lg mb-4">Confirmed Client Manifest</h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center pb-4 border-b border-border">
                  <div>
                    <p className="font-medium">Commercial Espresso Machine</p>
                    <p className="text-sm text-muted-foreground">Qty: 1</p>
                  </div>
                  <Button variant="outline" className="rounded-full">Blast RFQ to Vendors</Button>
               </div>
               <div className="flex justify-between items-center pb-4 border-b border-border">
                  <div>
                    <p className="font-medium">Cafe Tables (Small)</p>
                    <p className="text-sm text-muted-foreground">Qty: 10</p>
                  </div>
                  <Button variant="outline" className="rounded-full border-green-500 text-green-600">RFQ Sent (5 Vendors)</Button>
               </div>
            </div>
         </div>
         
         <div className="bg-[#FAFAFA] p-6 rounded-3xl shadow-inner border border-border">
            <h3 className="font-bold text-lg mb-4">Vendor Database</h3>
            <p className="text-sm text-muted-foreground">Search and multi-select vendors to receive these RFQs.</p>
            {/* Vendor List mock */}
            <div className="mt-4 space-y-2">
               <div className="p-3 bg-white border border-border rounded-xl flex justify-between items-center">
                  <span className="text-sm font-medium">Coffee Suppliers India</span>
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
