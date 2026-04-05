import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminRequestsMaster() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Client Requests</h1>
          <p className="text-muted-foreground mt-1">Master intake queue.</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-soft border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#FAFAFA] border-b border-border">
            <tr>
              <th className="p-4 font-semibold text-sm">ID</th>
              <th className="p-4 font-semibold text-sm">Client</th>
              <th className="p-4 font-semibold text-sm">Title</th>
              <th className="p-4 font-semibold text-sm">Status</th>
              <th className="p-4 font-semibold text-sm">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-muted/30">
              <td className="p-4 text-sm font-medium">REQ-8492</td>
              <td className="p-4 text-sm">Acme Corp</td>
              <td className="p-4 text-sm">20-seat cafe setup in Mumbai</td>
              <td className="p-4"><Badge variant="outline" className="border-red-500 text-red-500">Awaiting Triage</Badge></td>
              <td className="p-4">
                <Link href="/admin/requests/REQ-8492/triage">
                  <Button variant="outline" size="sm" className="rounded-full">Triage Now</Button>
                </Link>
              </td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-4 text-sm font-medium">REQ-8103</td>
              <td className="p-4 text-sm">FinTech Inc</td>
              <td className="p-4 text-sm">Enterprise Laptops</td>
              <td className="p-4"><Badge variant="outline" className="border-primary text-[#1A1A1A]">Compare Bids</Badge></td>
              <td className="p-4">
                <Link href="/admin/requests/REQ-8103/compare">
                  <Button size="sm" className="rounded-full bg-[#1A1A1A] text-white">Compare</Button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
