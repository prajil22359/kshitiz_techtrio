"use client";

import { useState } from "react";
import { ShieldCheck, UploadCloud, CheckCircle2, AlertTriangle, FileText, Landmark, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VendorOnboarding() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto mt-12 animate-in zoom-in-95 duration-500">
        <Card className="border-none shadow-xl bg-gradient-to-b from-white to-gray-50/50 p-6 text-center">
          <CardContent className="pt-6 flex flex-col items-center">
            <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6">
              <Clock className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Under Review</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
              Your KYC documents have been successfully submitted. Our team is manually verifying your details. This process usually takes 24-48 hours.
            </p>
            <div className="bg-white border rounded-xl p-4 flex items-start gap-4 text-left max-w-md w-full shadow-sm">
              <ShieldCheck className="w-6 h-6 text-emerald-600 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">What happens next?</h4>
                <p className="text-sm text-muted-foreground mt-1">Once approved, the "Unverified" restriction will be lifted and you'll immediately start receiving relevant RFQs in your dashboard.</p>
              </div>
            </div>
            <Button variant="outline" className="mt-8" onClick={() => {
              localStorage.setItem('vendor_verified', 'true');
              window.location.href='/vendor/dashboard';
            }}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">Complete KYC Verification</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          To maintain a high-trust network, we require all suppliers to verify their business identity before participating in bids.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Main Form Area */}
        <div className="md:col-span-2 space-y-6">
          
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50/50 border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Landmark className="w-4 h-4" />
                </div>
                <CardTitle className="text-lg">1. GST Registration</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Goods and Services Tax (GSTIN)</label>
                <Input placeholder="e.g. 22AAAAA0000A1Z5" className="h-11 font-mono uppercase" />
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer group">
                <UploadCloud className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-foreground">Upload GST Certificate</span>
                <span className="text-xs text-muted-foreground">PDF or JPG (Max 5MB)</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50/50 border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <CardTitle className="text-lg">2. Identity Proof (Aadhaar / PAN)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Authorized Signature PAN</label>
                <Input placeholder="e.g. ABCDE1234F" className="h-11 font-mono uppercase" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer group text-center">
                    <UploadCloud className="w-6 h-6 text-muted-foreground" />
                    <span className="text-sm font-medium">Upload PAN Card</span>
                 </div>
                 <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer group text-center">
                    <UploadCloud className="w-6 h-6 text-muted-foreground" />
                    <span className="text-sm font-medium">Upload Aadhaar</span>
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50/50 border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <CardTitle className="text-lg">3. Business ID / Incorporation</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Udyam Registration / CIN</label>
                <Input placeholder="Enter Registration Number" className="h-11 font-mono uppercase" />
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer group text-center">
                 <UploadCloud className="w-6 h-6 text-muted-foreground" />
                 <span className="text-sm font-medium">Upload Business Proof</span>
                 <span className="text-xs text-muted-foreground">(Incorporation Cert., Udyam, etc.)</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            <Button size="lg" className="px-8 shadow-sm text-base h-12" onClick={() => setIsSubmitted(true)}>
              Submit for Verification
            </Button>
          </div>

        </div>

        {/* Sidebar Guidelines */}
        <div className="md:col-span-1 space-y-6 sticky top-24">
          <Card className="bg-primary/5 border-primary/20 shadow-none">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2 text-base">
                <AlertTriangle className="w-4 h-4" />
                Why verification?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/80 space-y-4 leading-relaxed">
              <p>All Product God actively protects both clients and suppliers from fraud.</p>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Ensures faster payments and trust between parties.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Prevents unauthorized bids masquerading as your company.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Locks in legal compliances for high-value orders automatically.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
