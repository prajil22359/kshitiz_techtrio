"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft, ArrowRight, Clock, Package, Truck } from "lucide-react";
import {
  getDeliveryTimelineLabel,
  getQuoteSpeedLabel,
  loadRequestDraft,
  quoteSpeedOptions,
  saveRequestDraft,
  type QuoteSpeed,
  type RequestItem,
} from "@/lib/request-flow";

export default function CuratedPage() {
  const router = useRouter();
  const [items, setItems] = useState<RequestItem[]>([]);
  const [quoteSpeedByItemId, setQuoteSpeedByItemId] = useState<Record<string, QuoteSpeed>>({});
  const [deliveryTimelineLabel, setDeliveryTimelineLabel] = useState("Standard delivery");

  useEffect(() => {
    const draft = loadRequestDraft();

    if (draft) {
      setItems(draft.items);
      setQuoteSpeedByItemId(draft.quoteSpeedByItemId);
      setDeliveryTimelineLabel(getDeliveryTimelineLabel(draft.deliveryTimeline));
    }
  }, []);

  const speedCounts = useMemo(() => {
    return Object.values(quoteSpeedByItemId).reduce(
      (accumulator, speed) => {
        accumulator[speed] += 1;
        return accumulator;
      },
      { "same-day": 0, "next-day": 0, "two-day": 0 } as Record<QuoteSpeed, number>
    );
  }, [quoteSpeedByItemId]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSpeedChange = (itemId: string, speed: QuoteSpeed) => {
    setQuoteSpeedByItemId((current) => ({ ...current, [itemId]: speed }));
  };

  const handleSavePlan = () => {
    const draft = loadRequestDraft();

    if (!draft) {
      return;
    }

    saveRequestDraft({
      ...draft,
      quoteSpeedByItemId,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-[#1A1A1A]">Curated by item speed</h1>
            <Badge variant="premium">Plan selection</Badge>
          </div>
          <p className="text-muted-foreground text-sm font-medium">Match each item to the quote speed it needs after review.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full" onClick={() => router.push("/client/requests/timeline")}>
            <ArrowLeft className="w-4 h-4" />
            Back to review
          </Button>
          <Button className="rounded-full shadow-soft bg-[#1A1A1A] text-white hover:bg-black" onClick={handleSavePlan}>
            Save curated plan
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[32px] shadow-soft border border-border">
        <h3 className="font-semibold text-lg text-[#1A1A1A] mb-8">Status Timeline</h3>
        <div className="relative flex items-center justify-between px-4 sm:px-12 gap-4">
          <div className="absolute top-1/2 left-16 right-16 h-1 bg-muted -translate-y-1/2 rounded-full z-0" />
          <div className="absolute top-1/2 left-16 right-[18%] h-1 bg-primary -translate-y-1/2 rounded-full z-0 transition-all duration-1000" />

          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-[0_0_15px_rgba(176,255,77,0.5)]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-sm font-semibold text-[#1A1A1A] text-center">Requested</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-[0_0_15px_rgba(176,255,77,0.5)]">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-[#1A1A1A] text-center">Review</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center shadow-lg border-4 border-white">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-[#1A1A1A] text-center">Curated</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-3 hidden sm:flex">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-muted flex items-center justify-center text-muted-foreground">
              <Truck className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-muted-foreground text-center">Fulfillment</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] p-8 shadow-soft border border-border">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1A]">Item-based curation</h2>
                <p className="text-muted-foreground mt-2">Choose how quickly each item needs a quotation.</p>
              </div>
              <Badge variant="secondary" className="shrink-0">
                {items.length} item{items.length === 1 ? "" : "s"}
              </Badge>
            </div>

            <div className="space-y-4">
              {items.length > 0 ? (
                items.map((item) => {
                  const selectedSpeed = quoteSpeedByItemId[item.id] ?? "next-day";

                  return (
                    <div key={item.id} className="rounded-2xl border border-border p-5">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="font-semibold text-[#1A1A1A]">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}x • Delivery focus: {deliveryTimelineLabel}
                          </p>
                        </div>
                        <Badge variant="premium">{getQuoteSpeedLabel(selectedSpeed)}</Badge>
                      </div>

                      <div className="mt-4 grid gap-3 md:grid-cols-3">
                        {quoteSpeedOptions.map((option) => {
                          const isSelected = selectedSpeed === option.value;

                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => handleSpeedChange(item.id, option.value)}
                              className={`rounded-2xl border p-4 text-left transition-all ${
                                isSelected
                                  ? "border-primary bg-primary/5 shadow-[0_8px_30px_rgb(176,255,77,0.12)]"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3 mb-2">
                                <h4 className="font-semibold text-[#1A1A1A]">{option.label}</h4>
                                {isSelected ? <Badge variant="outline">Selected</Badge> : null}
                              </div>
                              <p className="text-sm text-muted-foreground">{option.description}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                  No items were staged for curation. Return to review and submit a request first.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[32px] p-8 shadow-soft border border-border sticky top-24">
            <h2 className="text-xl font-bold tracking-tight text-[#1A1A1A]">Plan summary</h2>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Items requested</span>
                <span className="font-semibold text-[#1A1A1A]">{items.length}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Units</span>
                <span className="font-semibold text-[#1A1A1A]">{totalItems}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Same day</span>
                <span className="font-semibold text-[#1A1A1A]">{speedCounts["same-day"]}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Within 24h</span>
                <span className="font-semibold text-[#1A1A1A]">{speedCounts["next-day"]}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Within 48h</span>
                <span className="font-semibold text-[#1A1A1A]">{speedCounts["two-day"]}</span>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Per-item quote speed lets procurement prioritize fast-response items while keeping slower items in the same request.
            </div>

            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="flex-1 rounded-full" onClick={() => router.push("/client/requests/timeline")}>
                Review
              </Button>
              <Button className="flex-1 rounded-full bg-[#1A1A1A] text-white hover:bg-black" onClick={handleSavePlan} disabled={items.length === 0}>
                Confirm
              </Button>
            </div>
          </div>

          <div className="bg-[#1A1A1A] text-white rounded-[32px] p-8 shadow-soft">
            <h3 className="text-lg font-semibold">What curation changes now</h3>
            <p className="text-white/70 mt-3 text-sm leading-6">
              Faster quote requests will surface vendors who can respond earlier, while longer windows can widen the pool for lower-cost options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}