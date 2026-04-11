"use client";

import Link from "next/link";
import { Sparkles, ClipboardList, ArrowLeft } from "lucide-react";

export default function OptionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/client/requests">
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Requests
          </button>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Create New Request</h1>
          <p className="text-lg text-slate-600">How would you like to proceed?</p>
        </div>

        {/* Two Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Option 1: Brain Storm Together */}
          <Link href="/client/requests/new">
            <div className="group cursor-pointer h-full">
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-12 h-full flex flex-col items-center justify-center min-h-[400px] hover:scale-105">
                <div className="mb-6 p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                  <Sparkles className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
                  Brain Storm Together
                </h2>
                <p className="text-center text-slate-600 text-lg leading-relaxed">
                  Let our AI help you explore ideas and requirements. Describe what you need and we'll help you build a comprehensive request.
                </p>
              </div>
            </div>
          </Link>

          {/* Option 2: Already Have Something in Mind */}
          <Link href="/client/requests/options/table">
            <div className="group cursor-pointer h-full">
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-12 h-full flex flex-col items-center justify-center min-h-[400px] hover:scale-105">
                <div className="mb-6 p-4 bg-amber-100 rounded-full group-hover:bg-amber-200 transition-colors">
                  <ClipboardList className="w-12 h-12 text-amber-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
                  Already Have Something in Mind
                </h2>
                <p className="text-center text-slate-600 text-lg leading-relaxed">
                  Directly add items to your request in a structured format. Perfect if you know exactly what you need.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}