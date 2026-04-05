import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RFQDetailPage() {
  return (
    <div className="max-w-6xl mx-auto gap-8 grid lg:grid-cols-2">
      {/* Left: Request Details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Commercial Coffee Equipment</h1>
          <p className="text-muted-foreground mt-1">RFQ #REQ-1001</p>
        </div>
        <div className="bg-[#FAFAFA] p-6 rounded-3xl border border-border space-y-4">
           <h3 className="font-semibold text-lg">Requested Items</h3>
           <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>1x Commercial Espresso Machine (Premium)</li>
              <li>2x Commercial Coffee Grinder</li>
           </ul>
        </div>
      </div>

      {/* Right: Submission Form */}
      <div className="bg-white p-8 rounded-3xl shadow-soft border border-border space-y-6">
        <h2 className="text-xl font-bold text-[#1A1A1A]">Your Proposal</h2>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label>Total Price (INR)</Label>
            <Input className="rounded-xl h-12" placeholder="e.g. 280000" />
          </div>
          <div className="grid gap-2">
            <Label>Estimated Delivery Time (Days)</Label>
            <Input className="rounded-xl h-12" placeholder="e.g. 7" />
          </div>
          <div className="grid gap-2">
            <Label>Warranty Terms</Label>
            <Input className="rounded-xl h-12" placeholder="e.g. 1 Year Comprehensive" />
          </div>
          <Button className="w-full rounded-full h-12 bg-[#1A1A1A] text-white hover:bg-black mt-4">Submit Quotation</Button>
        </div>
      </div>
    </div>
  );
}
