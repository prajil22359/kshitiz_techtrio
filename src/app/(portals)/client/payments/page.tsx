"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Receipt, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/payments/client", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          setError(errData?.error || "Failed to load payments");
          setPayments([]);
          return;
        }

        const data = await res.json();
        setPayments(Array.isArray(data) ? data : []);
        setError("");
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError("Could not load payments");
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const totalOutstanding = payments
    .filter(p => p.status !== "SUCCESS")
    .reduce((sum, p) => sum + p.amount, 0);

  const nextPending = payments.find(p => p.status !== "SUCCESS");

  return (
    <div className="max-w-5xl mx-auto space-y-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Payments & Invoices</h1>
          <p className="text-muted-foreground mt-1">
            Manage your financial obligations and download receipts.
          </p>
        </div>
      </div>

      {/* Hero Overview */}
      <div className="bg-[#1A1A1A] rounded-[32px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div>
          <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">
            Total Outstanding
          </p>

          <div className="flex items-baseline gap-4">
            <h2 className="text-5xl font-bold tracking-tight">
              ₹{totalOutstanding}
            </h2>

            {nextPending && (
              <span className="text-primary text-sm font-semibold bg-primary/10 px-3 py-1 rounded-full">
                Pending
              </span>
            )}
          </div>

          <p className="text-white/80 text-sm mt-4">
            {nextPending
              ? `Next payment due on ${new Date(nextPending.deadline).toLocaleDateString()}`
              : "All payments completed 🎉"}
          </p>
        </div>

        <Button
          size="lg"
          className="rounded-full shadow-[0_0_15px_rgba(176,255,77,0.3)] bg-primary text-black hover:bg-primary/90 h-14 px-8 text-lg font-bold w-full md:w-auto"
          onClick={() => {
            if (nextPending) pay(nextPending.id);
          }}
        >
          Pay Now <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Invoice Table Container */}
      <div className="bg-white rounded-[32px] shadow-soft border border-border overflow-hidden">
        <div className="px-8 py-6 border-b border-border flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#1A1A1A]">Recent Invoices</h3>
          <Button variant="ghost" className="text-muted-foreground">
            View All
          </Button>
        </div>

        <div className="divide-y divide-border">

          {loading && (
            <div className="p-8 text-center text-muted-foreground">
              Loading payments...
            </div>
          )}

          {error && !loading && (
            <div className="p-8 text-center">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          {!loading && !error && payments.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No payment requests yet
            </div>
          )}

          {payments.map((p) => (
            <div
              key={p.id}
              className={`p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/30 transition-colors ${
                p.status === "SUCCESS" ? "opacity-60 grayscale-[0.2]" : ""
              }`}
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30 text-primary">
                  <Receipt className="w-5 h-5" />
                </div>

                <div>
                  <h4 className="font-bold text-lg text-[#1A1A1A]">
                    {p.request_title || `Payment #${p.id.slice(0, 6)}`}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Deadline: {new Date(p.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                <div className="text-right">
                  <p className="text-lg font-bold text-[#1A1A1A]">
                    ₹{p.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Created {new Date(p.created_at).toLocaleDateString()}
                  </p>
                </div>

                {/* STATUS */}
                <Badge
                  variant={p.status === "SUCCESS" ? "secondary" : "outline"}
                  className={
                    p.status === "SUCCESS"
                      ? ""
                      : "border-primary text-[#1A1A1A]"
                  }
                >
                  {p.status}
                </Badge>

                {/* ACTION */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Download className="w-4 h-4" />
                  </Button>

                  {p.status !== "SUCCESS" && (
                    <Button
                      className="rounded-full bg-[#1A1A1A] text-white hover:bg-black"
                      onClick={() => pay(p.id)}
                    >
                      Pay
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

async function pay(id: string) {
  try {
    const res = await fetch("/api/payments/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      alert(errorData?.error || "Payment initiation failed");
      return;
    }

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Payment initiation failed - no redirect URL");
    }
  } catch (err) {
    console.error("Payment error:", err);
    alert("Payment initiation failed");
  }
}