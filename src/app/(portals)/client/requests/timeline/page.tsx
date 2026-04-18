"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  AlertCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import {
  deliveryTimelineOptions,
  getDeliveryTimelineLabel,
  type DeliveryTimeline,
} from "@/lib/request-flow";

type RequestRow = {
  id: string;
  request_code: string;
  title: string;
  status: string;
  stage: string;
  item_count: number;
  requested_at: string;
  min_budget: number | null;
  max_budget: number | null;
};

type RequestItemRow = {
  id: string;
  item_name: string;
  quantity: number;
  quality: string | null;
  min_price: number | null;
  max_price: number | null;
  notes: string | null;
};

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

export default function ReviewTimelinePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId");

  const [items, setItems] = useState<RequestItemRow[]>([]);
  const [request, setRequest] = useState<RequestRow | null>(null);
  const [deliveryTimeline, setDeliveryTimeline] =
    useState<DeliveryTimeline>("standard");
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequest = async () => {
      if (!requestId) {
        setLoadError("Missing request id.");
        setLoading(false);
        setIsReady(true);
        return;
      }

      setLoading(true);
      setLoadError(null);

      const { data: requestData, error: requestError } = await supabase
        .from("requests")
        .select(
          "id, request_code, title, status, stage, item_count, requested_at, min_budget, max_budget"
        )
        .eq("id", requestId)
        .single();

      if (requestError) {
        console.error("Failed to fetch request:", requestError);
        setLoadError("Could not load this request.");
        setLoading(false);
        setIsReady(true);
        return;
      }

      const { data: itemsData, error: itemsError } = await supabase
        .from("request_items")
        .select("id, item_name, quantity, quality, min_price, max_price, notes")
        .eq("request_id", requestId)
        .order("created_at", { ascending: true });

      if (itemsError) {
        console.error("Failed to fetch request items:", itemsError);
        setLoadError("Could not load request items.");
      }

      setRequest(requestData as RequestRow);
      setItems((itemsData ?? []) as RequestItemRow[]);
      setLoading(false);
      setIsReady(true);
    };

    fetchRequest();
  }, [requestId]);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.quantity ?? 0), 0),
    [items]
  );

  const estimatedRange = useMemo(
    () =>
      items.reduce(
        (range, item) => ({
          min: range.min + Number(item.min_price ?? 0),
          max: range.max + Number(item.max_price ?? 0),
        }),
        { min: 0, max: 0 }
      ),
    [items]
  );

  const handleContinue = () => {
    if (!requestId) return;

    const deliveryParam = encodeURIComponent(deliveryTimeline);
    router.push(
      `/client/requests/timeline/curated?requestId=${requestId}&deliveryTimeline=${deliveryParam}`
    );
  };

  const hasDraft = items.length > 0;

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h1 className="text-3xl font-bold text-[#1A1A1A]">
              {request?.title || "Review request before curation"}
            </h1>
            <Badge variant="premium">
              {getStatusText(request?.status || "pending_review")}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm font-medium">
            Req ID: {request?.request_code ?? "#—"} | Review the request before curated matching
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() =>
              router.push(`/client/requests/options/table?requestId=${requestId ?? ""}`)
            }
          >
            <ArrowLeft className="w-4 h-4" />
            Edit request
          </Button>
          <Button
            className="rounded-full shadow-soft bg-[#1A1A1A] text-white hover:bg-black"
            onClick={handleContinue}
            disabled={!requestId || loading}
          >
            Continue to curated
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[32px] shadow-soft border border-border">
        <h3 className="font-semibold text-lg text-[#1A1A1A] mb-8">
          Status Timeline
        </h3>
        <div className="relative flex items-center justify-between px-4 sm:px-12 gap-4">
          <div className="absolute top-1/2 left-16 right-16 h-1 bg-muted -translate-y-1/2 rounded-full z-0" />
          <div className="absolute top-1/2 left-16 right-[40%] h-1 bg-primary -translate-y-1/2 rounded-full z-0 transition-all duration-1000" />

          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-[0_0_15px_rgba(176,255,77,0.5)]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-sm font-semibold text-[#1A1A1A] text-center">
              Requested
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center shadow-lg border-4 border-white">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-[#1A1A1A] text-center">
              Review
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-muted flex items-center justify-center text-muted-foreground">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-muted-foreground text-center">
              Curated
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-3 hidden sm:flex">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-muted flex items-center justify-center text-muted-foreground">
              <Truck className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-muted-foreground text-center">
              Fulfillment
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] p-8 shadow-soft border border-border">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1A]">
                  Review your request
                </h2>
                <p className="text-muted-foreground mt-2">
                  Check the staged items before we curate vendor quotes.
                </p>
              </div>
              <Badge variant="secondary" className="shrink-0">
                {isReady
                  ? `${items.length} item${items.length === 1 ? "" : "s"}`
                  : "Loading request"}
              </Badge>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                Loading request from Supabase...
              </div>
            ) : loadError ? (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                {loadError}
              </div>
            ) : hasDraft ? (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-border p-4">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="font-semibold text-[#1A1A1A]">
                          {item.item_name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}x • Quality: {item.quality || "Not set"}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground md:text-right">
                        <p>
                          Budget: ₹{Number(item.min_price ?? 0).toLocaleString()} - ₹
                          {Number(item.max_price ?? 0).toLocaleString()}
                        </p>
                        {item.notes ? <p className="mt-1">Note: {item.notes}</p> : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                No items were found for this request.
              </div>
            )}
          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-soft border border-border">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1A]">
                  Delivery timeline
                </h2>
                <p className="text-muted-foreground mt-2">
                  Choose when this request needs to land. This shapes the curated vendor shortlist.
                </p>
              </div>
              <CalendarDays className="w-5 h-5 text-primary shrink-0" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {deliveryTimelineOptions.map((option) => {
                const isSelected = deliveryTimeline === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setDeliveryTimeline(option.value)}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-[0_8px_30px_rgb(176,255,77,0.12)]"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-[#1A1A1A]">
                        {option.label}
                      </h3>
                      {isSelected ? <Badge variant="premium">Selected</Badge> : null}
                    </div>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-primary" />
              <span>
                Current target: {getDeliveryTimelineLabel(deliveryTimeline)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[32px] p-8 shadow-soft border border-border sticky top-24">
            <h2 className="text-xl font-bold tracking-tight text-[#1A1A1A]">
              Review summary
            </h2>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Items captured</span>
                <span className="font-semibold text-[#1A1A1A]">{items.length}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Units requested</span>
                <span className="font-semibold text-[#1A1A1A]">{totalItems}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Estimated budget band</span>
                <span className="font-semibold text-[#1A1A1A]">
                  ₹{estimatedRange.min.toLocaleString()} - ₹{estimatedRange.max.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Delivery timeline</span>
                <span className="font-semibold text-[#1A1A1A]">
                  {getDeliveryTimelineLabel(deliveryTimeline)}
                </span>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Any item changes should happen before curated matching. Once you continue, the next step will ask how fast each item needs its quotation.
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-full"
                onClick={() =>
                  router.push(`/client/requests/options/table?requestId=${requestId ?? ""}`)
                }
              >
                Back to table
              </Button>
              <Button
                className="flex-1 rounded-full bg-[#1A1A1A] text-white hover:bg-black"
                onClick={handleContinue}
                disabled={!hasDraft || loading || !requestId}
              >
                Curated plan
              </Button>
            </div>
          </div>

          <div className="bg-[#1A1A1A] text-white rounded-[32px] p-8 shadow-soft">
            <h3 className="text-lg font-semibold">What happens next</h3>
            <p className="text-white/70 mt-3 text-sm leading-6">
              After review, each item gets a delivery-speed preference in the curated step. That lets procurement prioritize fast-quote items without slowing down the rest of the request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}