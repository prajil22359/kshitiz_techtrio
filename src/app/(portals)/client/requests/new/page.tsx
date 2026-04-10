import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, User, CornerDownLeft, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function NewRequest() {
  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col relative px-4">
      
      {/* Header */}
      <div className="pb-6 border-b border-border flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            AI Concierge
          </h2>
          <p className="text-muted-foreground text-sm mt-1">Describe exactly what you need. Let us do the heavy lifting.</p>
        </div>
      </div>

      {/* Chat Area (Auto-scrolling simulation) */}
      <div className="flex-1 overflow-y-auto py-8 space-y-8 no-scrollbar pb-32">
        {/* User Prompt */}
        <div className="flex gap-4 items-start max-w-[85%] ml-auto">
          <div className="bg-[#1A1A1A] text-white p-5 rounded-[24px] rounded-br-sm shadow-sm text-base leading-relaxed">
            I need to set up a new premium 20-seat cafe in our Mumbai office branch. We need everything from a commercial espresso machine down to tables and ambient lighting. It needs to look high-end, similar to a Blue Tokai. We need this within 14 days.
          </div>
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 border border-border">
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        {/* AI Response thinking */}
        <div className="flex gap-4 items-start max-w-[85%]">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-4 w-full">
            <div className="bg-white border border-border p-5 rounded-[24px] rounded-bl-sm shadow-soft text-[#1A1A1A] text-base leading-relaxed">
              Got it! A premium 20-seat cafe setup in Mumbai. I&rsquo;ve broken down your request into a structured item manifest based on high-end branch standards. <br/><br/>
              Please review the list below. If it looks correct, we&rsquo;ll dispatch this to our verified vendors and bring you back curated options.
            </div>

            {/* Structured Output Card */}
            <div className="bg-white border border-border rounded-[24px] shadow-sm overflow-hidden">
               <div className="bg-[#FAFAFA] border-b border-border px-6 py-4 flex justify-between items-center">
                 <h4 className="font-semibold text-[#1A1A1A]">Structured Item Manifest</h4>
                 <Badge variant="outline">Auto-generated</Badge>
               </div>
               <div className="divide-y divide-border">
                 <div className="p-4 px-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
                   <div>
                     <p className="font-medium text-[#1A1A1A]">Commercial Espresso Machine</p>
                     <p className="text-sm text-muted-foreground">Category: Appliances</p>
                   </div>
                   <div className="font-semibold text-[#1A1A1A]">x1</div>
                 </div>
                 <div className="p-4 px-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
                   <div>
                     <p className="font-medium text-[#1A1A1A]">Premium Wooden Cafe Tables (Small)</p>
                     <p className="text-sm text-muted-foreground">Category: Furniture</p>
                   </div>
                   <div className="font-semibold text-[#1A1A1A]">x10</div>
                 </div>
                 <div className="p-4 px-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
                   <div>
                     <p className="font-medium text-[#1A1A1A]">Upholstered Premium Chairs</p>
                     <p className="text-sm text-muted-foreground">Category: Furniture</p>
                   </div>
                   <div className="font-semibold text-[#1A1A1A]">x20</div>
                 </div>
                 <div className="p-4 px-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
                   <div>
                     <p className="font-medium text-[#1A1A1A]">Commercial Coffee Grinder</p>
                     <p className="text-sm text-muted-foreground">Category: Appliances</p>
                   </div>
                   <div className="font-semibold text-[#1A1A1A]">x2</div>
                 </div>
               </div>
               <div className="p-4 bg-[#FAFAFA] flex justify-end items-center gap-3">
                 <Button variant="ghost" className="text-muted-foreground">Edit List</Button>
                 <Link href="/client/dashboard">
                   <Button className="rounded-full shadow-sm pr-4">
                     Confirm & Send to Triage <CheckCircle2 className="w-4 h-4 ml-2" />
                   </Button>
                 </Link>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Input Bar */}
      <div className="absolute bottom-6 left-0 w-full px-4">
        <div className="bg-white rounded-full p-2 pl-6 pr-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-border flex items-center gap-4">
          <input 
            type="text" 
            placeholder="Type your request here..." 
            className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-[#1A1A1A] placeholder:text-muted-foreground text-base"
            disabled
          />
          <Button size="icon" className="rounded-full shrink-0 h-10 w-10">
            <CornerDownLeft className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4 font-medium">
          All Product God AI can make mistakes. Review the structured list before confirming.
        </p>
      </div>

    </div>
  );
}
