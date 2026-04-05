export default function VendorDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1A1A]">Vendor Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your pending actions and active operations.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-border">
          <p className="text-muted-foreground text-sm font-medium">New RFQs</p>
          <p className="text-4xl font-bold text-[#1A1A1A] mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-border">
          <p className="text-muted-foreground text-sm font-medium">Pending Quotes</p>
          <p className="text-4xl font-bold text-[#1A1A1A] mt-2">4</p>
        </div>
        <div className="bg-[#1A1A1A] text-white p-6 rounded-3xl shadow-soft border border-border">
          <p className="text-white/60 text-sm font-medium">Active Orders</p>
          <p className="text-4xl font-bold mt-2">3</p>
        </div>
      </div>
    </div>
  );
}
