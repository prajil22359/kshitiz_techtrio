"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type RequestRow = {
  id: string;
  request_code: string;
  title: string;
};

type RequestItemRow = {
  id: string;
  item_name: string;
  quantity: number;
  min_price: number | null;
  max_price: number | null;
};

type QuoteSpeed = "same-day" | "next-day" | "two-day";

export default function CuratedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const requestId = searchParams.get("requestId");

  const [request, setRequest] = useState<RequestRow | null>(null);
  const [items, setItems] = useState<RequestItemRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [quoteSpeed, setQuoteSpeed] = useState<Record<string, QuoteSpeed>>({});

  useEffect(() => {
    const fetchData = async () => {
      if (!requestId) return;

      const { data: requestData } = await supabase
        .from("requests")
        .select("id, request_code, title")
        .eq("id", requestId)
        .single();

      const { data: itemsData } = await supabase
        .from("request_items")
        .select("id, item_name, quantity, min_price, max_price")
        .eq("request_id", requestId);

      setRequest(requestData as RequestRow);
      setItems((itemsData ?? []) as RequestItemRow[]);

      // default quote speed
      const initial: Record<string, QuoteSpeed> = {};
      (itemsData ?? []).forEach((item) => {
        initial[item.id] = "next-day";
      });

      setQuoteSpeed(initial);
      setLoading(false);
    };

    fetchData();
  }, [requestId]);

  const totalBudget = useMemo(() => {
    return items.reduce(
      (acc, item) => ({
        min: acc.min + Number(item.min_price ?? 0),
        max: acc.max + Number(item.max_price ?? 0),
      }),
      { min: 0, max: 0 }
    );
  }, [items]);

  const handleSubmit = async () => {
    if (!requestId) return;

    // 🚀 future: save quote speeds in DB

    await supabase
      .from("requests")
      .update({
        stage: "quotation_curation",
        status: "awaiting_customer_confirmation",
      })
      .eq("id", requestId);

    await supabase.from("request_status_history").insert([
      {
        request_id: requestId,
        status: "sent_to_customer",
        message: "Sent for quotation curation",
      },
    ]);

    router.push(`/client/dashboard`);
  };

  if (loading) {
    return <div className="p-8">Loading curated plan...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">
            {request?.title || "Curated Plan"}
          </h1>
          <p className="text-muted-foreground text-sm">
            Req ID: {request?.request_code}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() =>
            router.push(`/client/requests/timeline?requestId=${requestId}`)
          }
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {/* ITEMS */}
      <div className="bg-white rounded-[32px] p-8 shadow-soft border">
        <h2 className="text-xl font-bold mb-6">Set quote speed per item</h2>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-2xl p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{item.item_name}</h3>
                <p className="text-sm text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>

              <div className="flex gap-2">
                {["same-day", "next-day", "two-day"].map((speed) => (
                  <button
                    key={speed}
                    onClick={() =>
                      setQuoteSpeed({
                        ...quoteSpeed,
                        [item.id]: speed as QuoteSpeed,
                      })
                    }
                    className={`px-3 py-1 rounded-full text-sm ${
                      quoteSpeed[item.id] === speed
                        ? "bg-black text-white"
                        : "border"
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-white rounded-[32px] p-8 shadow-soft border">
        <h2 className="text-xl font-bold mb-4">Summary</h2>

        <p className="text-sm text-muted-foreground">
          Total Budget: ₹{totalBudget.min} - ₹{totalBudget.max}
        </p>
      </div>

      {/* ACTION */}
      <div className="flex justify-end">
        <Button onClick={handleSubmit} className="bg-black text-white">
          Confirm & Send
          <CheckCircle2 className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}