"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type RequestRow = {
  id: string;
  request_code: string;
  title: string;
  status: string;
  stage: string;
  requested_at: string;
  item_count: number;
};

function getStageLabel(stage: string) {
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
      return "Fulfillment";
    default:
      return stage;
  }
}

function getStatusSubtitle(status: string) {
  switch (status) {
    case "draft":
      return "Draft in progress.";
    case "pending_review":
      return "Waiting for Admin curation.";
    case "awaiting_customer_confirmation":
      return "Waiting for customer approval.";
    case "confirmed":
      return "Customer confirmed.";
    case "ordered":
      return "Order placed.";
    case "completed":
      return "Request completed.";
    case "cancelled":
      return "Request cancelled.";
    default:
      return "In progress.";
  }
}

function getBadgeVariant(stage: string) {
  switch (stage) {
    case "request_raised":
      return "pending";
    case "discovery_call":
      return "secondary";
    case "scope_finalized":
      return "pending";
    case "quotation_curation":
      return "premium";
    case "review_approval":
      return "secondary";
    case "order_placed":
      return "default";
    default:
      return "secondary";
  }
}

function formatDateLabel(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (sameDay) return "Today";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function ClientDashboard() {
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("requests")
        .select("id, request_code, title, status, stage, requested_at, item_count")
        .order("requested_at", { ascending: false })
        .limit(8);

      if (fetchError) {
        console.error("Failed to load dashboard requests:", fetchError);
        setError("Could not load requests.");
        setRequests([]);
      } else {
        setRequests((data ?? []) as RequestRow[]);
      }

      setLoading(false);
    };

    fetchRequests();
  }, []);

  const activeRequests = useMemo(() => {
    return requests.filter(
      (request) => !["completed", "cancelled"].includes(request.status)
    );
  }, [requests]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl p-8 shadow-soft border border-border flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Need something new?</h2>
          <p className="text-muted-foreground mt-1">
            Talk to our AI Concierge to instantly scope your next procurement request.
          </p>
        </div>

        <Link href="/client/requests/options">
          <Button size="lg" className="rounded-full">
            Start New Requirement
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold text-lg text-foreground">Active Requests</h3>
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading
          </div>
        ) : null}
      </div>

      {error ? (
        <div className="bg-white rounded-[24px] p-6 shadow-soft border border-border text-muted-foreground">
          {error}
        </div>
      ) : activeRequests.length === 0 && !loading ? (
        <div className="bg-white rounded-[24px] p-6 shadow-soft border border-border text-muted-foreground">
          No active requests yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeRequests.slice(0, 2).map((request) => (
            <Link
              key={request.id}
              href={`/client/requests/timeline?requestId=${request.id}`}
              className="block"
            >
              <div className="bg-white rounded-[24px] p-6 shadow-soft border border-border hover:shadow-md transition-shadow cursor-pointer relative top-0 hover:-top-1 h-full">
                <div className="flex justify-between items-start mb-4 gap-3">
                  <Badge variant={getBadgeVariant(request.stage) as any}>
                    {getStageLabel(request.stage)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDateLabel(request.requested_at)}
                  </span>
                </div>

                <h4 className="font-bold text-lg text-[#1A1A1A] line-clamp-2">
                  {request.title}
                </h4>

                <p className="text-sm text-muted-foreground mt-2">
                  {request.item_count} Items • {getStatusSubtitle(request.status)}
                </p>

                <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{request.request_code}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}