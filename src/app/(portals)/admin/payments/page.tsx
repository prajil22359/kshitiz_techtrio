"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Send } from "lucide-react";

export default function AdminPaymentsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [requestTitle, setRequestTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [clientId, setClientId] = useState("");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/payments/clients");
      const data = await res.json();
      setPayments(data || []);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setPayments([]);
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/api/users/clients");
        const data = await res.json();
        console.log("Fetched clients:", data);
        setClients(data || []);
      } catch (err) {
        console.error("Error fetching clients:", err);
        setClients([]);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleClientSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = clients.find((c) => c.id === e.target.value);
    setClientId(e.target.value);
    setSelectedClient(selected);
  };

  const createRequest = async () => {
    if (!clientId || !amount || !deadline) {
      setMessage("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/payments/create-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestTitle,
          amount: Number(amount),
          deadline,
          clientId,
        }),
      });

      if (res.ok) {
        setMessage("✓ Payment Request Created Successfully");
        setRequestTitle("");
        setAmount("");
        setDeadline("");
        setClientId("");
        setSelectedClient(null);
        await fetchPayments();
        
        setTimeout(() => setMessage(""), 3000);
      } else {
        const errorData = await res.json().catch(() => null);
        setMessage(errorData?.error || "Error creating payment request");
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to create payment request");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Payment Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage payment requests for clients.</p>
        </div>
      </div>

      {/* Create Payment Request Card */}
      <div className="bg-white rounded-[32px] shadow-soft border border-border p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Create Payment Request</h2>
          <p className="text-muted-foreground text-sm mt-1">Send a new payment request to a client</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Request Title */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-semibold text-[#1A1A1A]">Request Title</label>
            <Input
              type="text"
              placeholder="e.g. April Office Equipment Settlement"
              value={requestTitle}
              onChange={(e) => setRequestTitle(e.target.value)}
              className="h-12 rounded-2xl bg-gray-50/70 border-gray-200 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/30"
            />
          </div>

          {/* Client Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#1A1A1A]">Select Client</label>
            <select
              value={clientId}
              onChange={handleClientSelect}
              className="w-full h-12 px-4 rounded-2xl border border-gray-200 bg-gray-50/70 text-sm focus:ring-2 focus:ring-primary/30 focus:border-transparent outline-none"
            >
              <option value="">-- Choose a client --</option>
              {clients && clients.length > 0 ? (
                clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.email} {c.name ? `(${c.name})` : ""}
                  </option>
                ))
              ) : (
                <option disabled>No clients available</option>
              )}
            </select>
            {clients.length === 0 && (
              <p className="text-xs text-yellow-600">No clients found in the system</p>
            )}
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#1A1A1A]">Amount (₹)</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 rounded-2xl bg-gray-50/70 border-gray-200 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/30"
            />
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#1A1A1A]">Deadline</label>
            <Input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="h-12 rounded-2xl bg-gray-50/70 border-gray-200 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/30"
            />
          </div>

          {/* Selected Client Info */}
          {selectedClient && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#1A1A1A]">Client Details</label>
              <div className="h-12 px-4 rounded-2xl border border-primary/30 bg-primary/5 flex items-center text-sm">
                <span className="text-primary font-medium">{selectedClient.name || selectedClient.email}</span>
              </div>
            </div>
          )}
        </div>

        {message && (
          <div className={`p-4 rounded-2xl text-sm font-medium ${
            message.includes("✓") 
              ? "bg-green-50 text-green-700 border border-green-200" 
              : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {message}
          </div>
        )}

        <Button
          onClick={createRequest}
          disabled={loading || !clientId || !amount || !deadline}
          className="w-full md:w-auto h-12 text-base font-semibold shadow-sm group bg-[#A3F43A] hover:bg-[#8FE12F] text-black disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Request"} 
          <Send className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Payments List */}
      <div className="bg-white rounded-[32px] shadow-soft border border-border overflow-hidden">
        <div className="px-8 py-6 border-b border-border flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#1A1A1A]">Recent Payment Requests</h3>
          <span className="text-sm text-muted-foreground">{payments.length} requests</span>
        </div>

        {payments.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No payment requests yet
          </div>
        ) : (
          <div className="divide-y divide-border">
            {payments.map((p) => (
              <div key={p.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30 text-primary font-bold text-sm">
                    ₹
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">{p.client_email}</p>
                    <p className="text-sm text-muted-foreground">₹{Number(p.amount).toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 md:gap-12">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-[#1A1A1A]">{new Date(p.deadline).toLocaleDateString()}</p>
                    <p className="text-xs text-muted-foreground">Due date</p>
                  </div>
                  <Badge variant={p.status === "SUCCESS" ? "secondary" : "pending"}>
                    {p.status || "PENDING"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}