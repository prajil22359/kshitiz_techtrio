"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type RequestRow = {
  id: string;
  request_code: string;
  title: string;
  item_count: number;
  requested_at: string;
  status: string;
  stage: string;
};

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "pending_review":
      return "pending";
    case "awaiting_customer_confirmation":
      return "premium";
    case "confirmed":
    case "ordered":
    case "completed":
      return "secondary";
    case "cancelled":
      return "destructive";
    default:
      return "premium";
  }
}

function getStatusText(status: string) {
  switch (status) {
    case "draft":
      return "Draft";
    case "pending_review":
      return "Awaiting Approval";
    case "awaiting_customer_confirmation":
      return "Awaiting Confirmation";
    case "confirmed":
      return "Confirmed";
    case "ordered":
      return "Ordered";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    default:
      return status;
  }
}

function getStageText(stage: string) {
  switch (stage) {
    case "request_raised":
      return "Requested";
    case "discovery_call":
      return "Discovery";
    case "scope_finalized":
      return "Scoping";
    case "quotation_curation":
      return "Curated";
    case "review_approval":
      return "Review";
    case "order_placed":
      return "Order Placed";
    default:
      return stage;
  }
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("requests")
        .select("id, request_code, title, item_count, requested_at, status, stage")
        .order("requested_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch requests:", error);
        setRequests([]);
      } else {
        setRequests((data ?? []) as RequestRow[]);
      }

      setLoading(false);
    };

    fetchRequests();
  }, []);

  const filteredRequests = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return requests;

    return requests.filter((request) => {
      return (
        request.request_code.toLowerCase().includes(q) ||
        request.title.toLowerCase().includes(q)
      );
    });
  }, [requests, search]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground mt-1 text-lg">
            Track and manage all your procurement requests.
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-border shadow-soft flex-1 max-w-2.5xl">
          <div className="flex-1 flex items-center gap-2 px-3">
            <Search className="w-6 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by ID or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-base placeholder:text-muted-foreground"
            />
          </div>
          <div className="w-px h-6 bg-border mx-2"></div>
          <Button variant="ghost" className="rounded-xl flex items-center gap-2 text-muted-foreground">
            <Filter className="w-4 h-4" /> Filter
          </Button>
        </div>

        <Link href="/client/requests/options">
          <Button size="lg" className="rounded-full shadow-soft h-12 px-8">
            Start New Request
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-[24px] p-6 shadow-soft border border-border">
            Loading requests...
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="bg-white rounded-[24px] p-6 shadow-soft border border-border text-muted-foreground">
            No requests found.
          </div>
        ) : (
          filteredRequests.map((request) => {
            const requestedDate = new Date(request.requested_at).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            );

            return (
              <Link
                key={request.id}
                href={`/client/requests/timeline?requestId=${request.id}`}
                className="block"
              >
                <div className="bg-white rounded-[24px] p-6 shadow-soft border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <span className="font-bold text-muted-foreground text-sm">
                        {request.request_code}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1A1A] group-hover:text-primary transition-colors">
                        {request.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {request.item_count} Items • Requested {requestedDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 md:gap-12">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium text-[#1A1A1A]">
                        {getStageText(request.stage)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {request.status === "pending_review"
                          ? "Admin Review"
                          : request.status === "awaiting_customer_confirmation"
                            ? "Customer Approval"
                            : request.status === "ordered"
                              ? "Order Placed"
                              : "Action Required"}
                      </p>
                    </div>

                    <Badge variant={getStatusBadgeVariant(request.status) as any}>
                      {getStatusText(request.status)}
                    </Badge>

                    <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -ml-4" />
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}