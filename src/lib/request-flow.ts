export type RequestItem = {
  id: string;
  name: string;
  quantity: number;
  quality: string;
  priceRangeMin: number;
  priceRangeMax: number;
  comment: string;
};

export type DeliveryTimeline = "rush" | "standard" | "flexible";

export type QuoteSpeed = "same-day" | "next-day" | "two-day";

export type RequestDraft = {
  items: RequestItem[];
  deliveryTimeline: DeliveryTimeline;
  quoteSpeedByItemId: Record<string, QuoteSpeed>;
  updatedAt: string;
};

const REQUEST_DRAFT_STORAGE_KEY = "client-request-draft";

export const deliveryTimelineOptions: Array<{
  value: DeliveryTimeline;
  label: string;
  description: string;
}> = [
  {
    value: "rush",
    label: "Rush delivery",
    description: "Prioritize fast-turnaround vendors and compressed quote windows.",
  },
  {
    value: "standard",
    label: "Standard delivery",
    description: "Balance speed and cost across the curated vendor set.",
  },
  {
    value: "flexible",
    label: "Flexible delivery",
    description: "Broaden the vendor pool for the most cost-efficient route.",
  },
];

export const quoteSpeedOptions: Array<{
  value: QuoteSpeed;
  label: string;
  description: string;
}> = [
  {
    value: "same-day",
    label: "Same day",
    description: "Need the quotation back immediately.",
  },
  {
    value: "next-day",
    label: "Within 24h",
    description: "Quote can arrive by the next business day.",
  },
  {
    value: "two-day",
    label: "Within 48h",
    description: "Keep this item on a standard review window.",
  },
];

export function createRequestDraft(items: RequestItem[]): RequestDraft {
  return {
    items,
    deliveryTimeline: "standard",
    quoteSpeedByItemId: items.reduce<Record<string, QuoteSpeed>>((accumulator, item) => {
      accumulator[item.id] = "next-day";
      return accumulator;
    }, {}),
    updatedAt: new Date().toISOString(),
  };
}

export function loadRequestDraft(): RequestDraft | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawDraft = window.sessionStorage.getItem(REQUEST_DRAFT_STORAGE_KEY);

  if (!rawDraft) {
    return null;
  }

  try {
    return JSON.parse(rawDraft) as RequestDraft;
  } catch {
    return null;
  }
}

export function saveRequestDraft(draft: RequestDraft) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(REQUEST_DRAFT_STORAGE_KEY, JSON.stringify(draft));
}

export function getDeliveryTimelineLabel(value: DeliveryTimeline) {
  return deliveryTimelineOptions.find((option) => option.value === value)?.label ?? "Standard delivery";
}

export function getQuoteSpeedLabel(value: QuoteSpeed) {
  return quoteSpeedOptions.find((option) => option.value === value)?.label ?? "Within 24h";
}