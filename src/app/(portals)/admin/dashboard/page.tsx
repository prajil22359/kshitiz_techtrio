export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1A1A]">Global Metrics</h1>
        <p className="text-muted-foreground mt-1">Platform overview and exception alerts.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-border">
          <p className="text-muted-foreground text-sm font-medium">Pending Triage</p>
          <p className="text-4xl font-bold text-[#1A1A1A] mt-2">8</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-border">
          <p className="text-muted-foreground text-sm font-medium">Quotes to Compare</p>
          <p className="text-4xl font-bold text-primary mt-2">24</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-border">
          <p className="text-muted-foreground text-sm font-medium">Active Shipments</p>
          <p className="text-4xl font-bold text-[#1A1A1A] mt-2">102</p>
        </div>
        <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
          <p className="text-red-500 text-sm font-medium">Transit Exceptions</p>
          <p className="text-4xl font-bold text-red-600 mt-2">3</p>
        </div>
      </div>
    </div>
  );
}
