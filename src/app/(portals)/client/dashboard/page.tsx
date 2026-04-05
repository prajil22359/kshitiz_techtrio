import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ClientDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Primary Action Card */}
      <div className="bg-white rounded-3xl p-8 shadow-soft border border-border flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Need something new?</h2>
          <p className="text-muted-foreground mt-1">Talk to our AI Concierge to instantly scope your next procurement request.</p>
        </div>
        <Button size="lg" className="rounded-full">Start New Requirement</Button>
      </div>

      {/* Grid of active requests */}
      <h3 className="font-semibold text-lg text-foreground mt-8">Active Requests</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Card */}
        <div className="bg-white rounded-[24px] p-6 shadow-soft border border-border hover:shadow-md transition-shadow cursor-pointer relative top-0 hover:-top-1">
          <div className="flex justify-between items-start mb-4">
            <Badge variant="pending">Scoping</Badge>
            <span className="text-xs text-muted-foreground">Today</span>
          </div>
          <h4 className="font-bold text-lg text-[#1A1A1A] line-clamp-2">20-seat cafe setup in Mumbai</h4>
          <p className="text-sm text-muted-foreground mt-2">Waiting for Admin curation.</p>
        </div>

        {/* Placeholder Card 2 */}
        <div className="bg-white rounded-[24px] p-6 shadow-soft border border-border hover:shadow-md transition-shadow cursor-pointer relative top-0 hover:-top-1">
          <div className="flex justify-between items-start mb-4">
            <Badge variant="premium">In Transit</Badge>
            <span className="text-xs text-muted-foreground">Oct 24</span>
          </div>
          <h4 className="font-bold text-lg text-[#1A1A1A] line-clamp-2">Enterprise Laptops Batch B</h4>
          <p className="text-sm text-muted-foreground mt-2">Dispatched via Shiprocket.</p>
        </div>
      </div>
    </div>
  );
}
