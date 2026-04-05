"use client";

import Link from "next/link";
import { Store, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VendorRegistration() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex relative overflow-hidden">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" />

      {/* Left Column: Brand & Benefits */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-16 relative z-10">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl text-[#1A1A1A]">
            <div className="bg-[#1A1A1A] p-2 rounded-xl">
              <Store className="w-6 h-6 text-primary" />
            </div>
            TechTrio
          </Link>
          
          <div className="mt-32 max-w-lg">
            <h1 className="text-5xl font-extrabold text-[#1A1A1A] tracking-tight leading-tight">
              Scale your B2B sales automation.
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              Join thousands of verified suppliers fulfilling enterprise requests effortlessly through our streamlined portal.
            </p>
            
            <div className="mt-12 space-y-6">
              {[
                "Instant access to verified enterprise RFQs",
                "Automated quoting & intelligent bid matching",
                "Guaranteed payment protection & fast settlements"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 text-[#1A1A1A] font-medium">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground font-medium">
          © {new Date().getFullYear()} TechTrio Corp. All rights reserved.
        </p>
      </div>

      {/* Right Column: Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md bg-white p-10 rounded-[32px] shadow-2xl shadow-primary/5 border border-border/50">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">Create Account</h2>
            <p className="text-muted-foreground">Register as a supplier on TechTrio</p>
          </div>

          <form className="space-y-5" action="/vendor/dashboard" onSubmit={() => localStorage.removeItem("vendor_verified")}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">First Name</label>
                <Input placeholder="John" className="h-12 bg-gray-50/50" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Last Name</label>
                <Input placeholder="Doe" className="h-12 bg-gray-50/50" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Business Name</label>
              <Input placeholder="Acme Technologies Pvt Ltd" className="h-12 bg-gray-50/50" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Work Email</label>
              <Input type="email" placeholder="john@acme.com" className="h-12 bg-gray-50/50" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Mobile Contact</label>
              <div className="flex gap-2">
                <Input disabled placeholder="+91" className="h-12 w-20 bg-gray-100 text-center font-medium" />
                <Input type="tel" placeholder="98765 43210" className="h-12 flex-1 bg-gray-50/50" required />
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <label className="text-sm font-semibold text-foreground">Set Password</label>
              <Input type="password" placeholder="••••••••" className="h-12 bg-gray-50/50" required />
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold mt-4 shadow-sm group">
              Create Vendor Profile
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground font-medium">
            Already registered?{" "}
            <Link href="/login" className="font-bold text-[#1A1A1A] hover:text-primary transition-colors">
              Sign in to portal
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
