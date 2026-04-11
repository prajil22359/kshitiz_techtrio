"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bot, User, Sparkles, CheckCircle2, Send, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  items?: Array<{
    name: string;
    category: string;
    quantity: string;
  }>;
};

const demoPrompt = "I need to set up a new premium 20-seat cafe in our Mumbai office branch. We need everything from a commercial espresso machine down to tables and ambient lighting. It needs to look high-end, similar to a Blue Tokai. We need this within 14 days.";
const demoResponse = "api implementation remaining only a test output";
const demoItems = [
  { name: "Commercial Espresso Machine", category: "Appliances", quantity: "x1" },
  { name: "Premium Wooden Cafe Tables (Small)", category: "Furniture", quantity: "x10" },
  { name: "Upholstered Premium Chairs", category: "Furniture", quantity: "x20" },
  { name: "Commercial Coffee Grinder", category: "Appliances", quantity: "x2" },
];

export default function NewRequest() {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const sendDemoMessage = () => {
    const userMessage = draft.trim() || demoPrompt;

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        role: "user",
        content: userMessage,
      },
      {
        id: Date.now() + 1,
        role: "assistant",
        content: demoResponse,
        items: demoItems,
      },
    ]);

    setDraft("");
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-5xl flex-col px-4">
      <div className="shrink-0 border-b border-border pb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href="/client/requests"
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-[#F3F3F3] hover:text-[#1A1A1A]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Link>
            
            <h2 className="flex items-center gap-2 text-2xl font-bold text-[#1A1A1A]">
              <Sparkles className="h-6 w-6 text-primary" />
              AI Concierge
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Describe what you need, then press send to generate a clean demo preview.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        <div className="space-y-5">
          {messages.length === 0 ? (
            <div className="grid min-h-[calc(100vh-22rem)] place-items-center rounded-[28px] border border-dashed border-border bg-white/70 px-6 text-center shadow-sm">
              <div className="max-w-xl space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">Ready to build your request</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Use the composer below to add a message. The preview area will update with a user bubble and a demo assistant response.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-[#FAFAFA] p-4 text-left text-sm text-[#1A1A1A] shadow-sm">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Example prompt
                  </span>
                  <p>{demoPrompt}</p>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${message.role === "user" ? "ml-auto max-w-[88%] flex-row-reverse" : "max-w-[88%]"}`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${message.role === "user" ? "border-border bg-muted" : "border-primary/30 bg-primary/15"}`}
                >
                  {message.role === "user" ? (
                    <User className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Bot className="h-5 w-5 text-primary" />
                  )}
                </div>

                <div
                  className={`rounded-[24px] px-5 py-4 text-sm leading-relaxed shadow-sm ${message.role === "user" ? "rounded-br-sm bg-[#1A1A1A] text-white" : "rounded-bl-sm border border-border bg-white text-[#1A1A1A]"}`}
                >
                  {message.content}
                  {message.role === "assistant" && (
                    <div className="mt-4 space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Demo output
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Got it! A premium 20-seat cafe setup in Mumbai. I’ve broken down your request into a structured item manifest based on high-end branch standards.
                      </p>

                      {message.items && (
                        <div className="overflow-hidden rounded-[24px] border border-border shadow-sm">
                          <div className="flex items-center justify-between border-b border-border bg-[#FAFAFA] px-5 py-4">
                            <h4 className="font-semibold text-[#1A1A1A]">Structured Item Manifest</h4>
                            <Badge variant="outline">Auto-generated</Badge>
                          </div>

                          <div className="divide-y divide-border">
                            {message.items.map((item) => (
                              <div key={item.name} className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-muted/30">
                                <div>
                                  <p className="font-medium text-[#1A1A1A]">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">Category: {item.category}</p>
                                </div>
                                <div className="font-semibold text-[#1A1A1A]">{item.quantity}</div>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-end gap-3 border-t border-border bg-[#FAFAFA] p-4">
                            <Button variant="ghost" className="text-muted-foreground">
                              Edit List
                            </Button>
                            <Button className="rounded-full shadow-sm pr-4">
                              Confirm & Send to Triage <CheckCircle2 className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="shrink-0 border-t border-border bg-[#FAFAFA]/95 pt-4 backdrop-blur-sm">
        <div className="rounded-[28px] border border-border bg-white p-2 pl-4 pr-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <div className="flex items-center gap-3">
            <Input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type your request here..."
              className="h-11 flex-1 border-0 bg-transparent text-base shadow-none placeholder:text-muted-foreground focus-visible:ring-0"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  sendDemoMessage();
                }
              }}
            />
            <Button onClick={sendDemoMessage} size="icon" className="h-11 w-11 rounded-full shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="mt-4 text-center text-xs font-medium text-muted-foreground">
          This is a demo preview. The assistant response is a placeholder until API implementation is ready.
        </p>
      </div>
    </div>
  );
}
