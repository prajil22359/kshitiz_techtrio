"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Truck, Package, ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

type OrderRow = {
  id: string;
  order_number: string | null;
  po_number: string | null;
  title: string;
  source: string | null;
  awb_number: string | null;
  status: string;
  eta_text: string | null;
  delivered_text: string | null;
  tracking_url: string | null;
  invoice_url: string | null;
  item_count: number | null;
  created_at: string;
};

function getBadgeVariant(status: string) {
  switch (status) {
    case "in_transit":
      return "premium";
    case "delivered":
      return "secondary";
    case "pending":
      return "pending";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "in_transit":
      return "In Transit";
    case "delivered":
      return "Delivered";
    case "pending":
      return "Pending";
    case "cancelled":
      return "Cancelled";
    default:
      return status;
  }
}

function formatDateLabel(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("orders")
        .select(
          "id, order_number, po_number, title, source, awb_number, status, eta_text, delivered_text, tracking_url, invoice_url, item_count, created_at"
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      } else {
        setOrders((data ?? []) as OrderRow[]);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        !q ||
        (order.awb_number ?? "").toLowerCase().includes(q) ||
        (order.po_number ?? "").toLowerCase().includes(q) ||
        order.title.toLowerCase().includes(q) ||
        (order.order_number ?? "").toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" ? true : order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Active Orders</h1>
          <p className="text-muted-foreground mt-1">
            Track fulfilled contracts and inbound Shiprocket deliveries.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-border shadow-soft w-full max-w-2xl">
        <div className="flex-1 flex items-center gap-2 px-3">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search AWB or PO Number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
          />
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-transparent outline-none text-sm text-[#1A1A1A] pr-2"
        >
          <option value="all">Status</option>
          <option value="in_transit">In Transit</option>
          <option value="delivered">Delivered</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="bg-white rounded-[32px] p-8 shadow-soft border border-border">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading orders...
          </div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-[32px] p-8 shadow-soft border border-border text-muted-foreground">
          No orders found.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const isDelivered = order.status === "delivered";

            return (
              <div
                key={order.id}
                className={`bg-white rounded-[32px] p-8 shadow-soft border border-border flex flex-col md:flex-row gap-8 ${
                  isDelivered ? "opacity-75" : ""
                }`}
              >
                <div className="w-full md:w-64 shrink-0 bg-[#FAFAFA] rounded-2xl p-6 border border-border flex flex-col justify-center gap-4">
                  <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <span>Shiprocket</span>
                    <span>AWB: {order.awb_number || "—"}</span>
                  </div>

                  <div className="flex items-center justify-center py-4">
                    <div
                      className={`h-16 w-px relative ${
                        isDelivered ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#1A1A1A]" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(176,255,77,0.8)]" />
                      <div
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${
                          isDelivered
                            ? "w-4 h-4 rounded-full bg-primary border-[3px] border-white shadow-[0_0_10px_rgba(176,255,77,0.8)]"
                            : "w-3 h-3 rounded-full bg-muted"
                        }`}
                      />
                    </div>

                    <div className="h-16 flex flex-col justify-between ml-4 text-sm font-medium">
                      <span className="text-muted-foreground">Dispatched</span>
                      <span className={isDelivered ? "text-muted-foreground" : "text-[#1A1A1A]"}>
                        In Transit
                      </span>
                      <span className={isDelivered ? "text-[#1A1A1A]" : "text-muted-foreground"}>
                        Expected
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2 gap-3">
                    <h3 className="text-xl font-bold text-[#1A1A1A]">
                      {order.title}
                    </h3>
                    <Badge variant={getBadgeVariant(order.status) as any}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    PO: {order.po_number || "—"} • {order.item_count ?? 0} Items • From:{" "}
                    {order.source || "—"}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    {order.eta_text ? (
                      <div className="flex items-center gap-2 text-sm text-[#1A1A1A] font-semibold bg-muted/50 px-4 py-2 rounded-xl">
                        <Truck className="w-4 h-4 text-primary" />
                        ETA: {order.eta_text}
                      </div>
                    ) : order.delivered_text ? (
                      <div className="flex items-center gap-2 text-sm text-[#1A1A1A] font-semibold bg-muted/50 px-4 py-2 rounded-xl">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        {order.delivered_text}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-[#1A1A1A] font-semibold bg-muted/50 px-4 py-2 rounded-xl">
                        <Truck className="w-4 h-4 text-primary" />
                        Created {formatDateLabel(order.created_at)}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3 pt-6 border-t border-border">
                    {order.invoice_url ? (
                      <a href={order.invoice_url} target="_blank" rel="noreferrer">
                        <Button variant="outline" className="rounded-full">
                          Download Invoice
                        </Button>
                      </a>
                    ) : (
                      <Button variant="outline" className="rounded-full" disabled>
                        Download Invoice
                      </Button>
                    )}

                    {order.tracking_url ? (
                      <a href={order.tracking_url} target="_blank" rel="noreferrer">
                        <Button variant="outline" className="rounded-full flex items-center gap-2">
                          Live Tracking <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                    ) : (
                      <Button variant="outline" className="rounded-full flex items-center gap-2" disabled>
                        Live Tracking <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}