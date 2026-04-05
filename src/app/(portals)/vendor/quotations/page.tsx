import { Badge } from "@/components/ui/badge";

export default function VendorQuotations() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1A1A]">My Quotations</h1>
        <p className="text-muted-foreground mt-1">History of all submissions and their statuses.</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-border flex justify-between items-center opacity-70">
          <div>
            <h3 className="text-xl font-bold text-[#1A1A1A]">Office Chairs Batch A</h3>
            <p className="text-sm text-muted-foreground">Submitted: Oct 20 • Quoted: ₹120,000</p>
          </div>
          <Badge variant="outline">Client Reviewing</Badge>
        </div>
      </div>
    </div>
  );
}
