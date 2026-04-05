import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminCompare() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1A1A]">Curate Bids #REQ-8103</h1>
        <p className="text-muted-foreground mt-1">Compare incoming vendor quotes and construct tiers for the client presentation.</p>
      </div>

      <div className="space-y-4">
         {/* Accordion Wrapper Mock */}
         <div className="bg-white rounded-3xl shadow-soft border border-border overflow-hidden">
            <div className="p-6 bg-[#FAFAFA] flex justify-between items-center border-b border-border cursor-pointer">
               <h3 className="font-bold text-lg">1. Enterprise Laptops (Qty: 50)</h3>
               <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Expand to Compare 3 Bids</span>
            </div>
            <div className="p-6 bg-white">
               <table className="w-full text-left">
                  <thead className="border-b border-border">
                    <tr>
                       <th className="pb-3 font-semibold text-sm">Vendor</th>
                       <th className="pb-3 font-semibold text-sm">Total Quote</th>
                       <th className="pb-3 font-semibold text-sm">ETA</th>
                       <th className="pb-3 font-semibold text-sm">Assign Tier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                     <tr>
                        <td className="py-4 text-sm font-medium">TechNova Systems</td>
                        <td className="py-4 text-sm">₹6,500,000</td>
                        <td className="py-4 text-sm">3 Days</td>
                        <td className="py-4">
                           <div className="flex gap-2">
                             <Button variant="outline" size="sm" className="rounded-full">Basic</Button>
                             <Button variant="outline" size="sm" className="rounded-full">Inter</Button>
                             <Button size="sm" className="rounded-full shadow-soft bg-[#1A1A1A] text-white">Premium</Button>
                           </div>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
}
