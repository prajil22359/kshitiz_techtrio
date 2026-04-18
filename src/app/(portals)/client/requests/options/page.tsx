"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, ClipboardList, ArrowLeft, Pencil } from "lucide-react";

const STORAGE_KEY = "request-title";

export default function OptionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTitleFromUrl = searchParams.get("title");

  const [title, setTitle] = useState("Untitled request");
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Load title from URL or sessionStorage
  useEffect(() => {
    if (initialTitleFromUrl) {
      setTitle(initialTitleFromUrl);
      sessionStorage.setItem(STORAGE_KEY, initialTitleFromUrl);
    } else {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setTitle(stored);
    }
  }, [initialTitleFromUrl]);

  // ✅ Save title whenever it changes
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, title);
  }, [title]);

  const normalizedTitle = title.trim() || "Untitled request";

  const goTo = (path: string) => {
    router.push(`${path}?title=${encodeURIComponent(normalizedTitle)}`);
  };

  const finishEditing = () => {
    if (!title.trim()) {
      setTitle("Untitled request");
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <Link href="/client/requests">
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Requests
          </button>
        </Link>

        {/* Title Section */}
        <div className="mb-12">
          <p className="text-sm font-medium text-slate-500 mb-2">
            Request Title
          </p>

          {isEditing ? (
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={finishEditing}
              onKeyDown={(e) => {
                if (e.key === "Enter") finishEditing();
                if (e.key === "Escape") {
                  setTitle(normalizedTitle);
                  setIsEditing(false);
                }
              }}
              className="w-full max-w-2xl bg-transparent text-4xl font-bold text-slate-900 outline-none border-b-2 border-slate-300 focus:border-blue-500 pb-2"
              placeholder="Untitled request"
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-3 text-left group"
            >
              <h1 className="text-4xl font-bold text-slate-900">
                {normalizedTitle}
              </h1>
              <Pencil className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
            </button>
          )}

          <p className="text-lg text-slate-600 mt-4">
            How would you like to proceed?
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* AI Option */}
          <div
            onClick={() => goTo("/client/requests/options/ai_chat")}
            className="group cursor-pointer h-full"
          >
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-12 h-full flex flex-col items-center justify-center min-h-[400px] hover:scale-105">
              <div className="mb-6 p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                <Sparkles className="w-12 h-12 text-blue-600" />
              </div>

              <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
                Brain Storm Together
              </h2>

              <p className="text-center text-slate-600 text-lg leading-relaxed">
                Let our AI help you explore ideas and requirements.
                Describe what you need and we&apos;ll help you build a
                comprehensive request.
              </p>
            </div>
          </div>

          {/* Manual Option */}
          <div
            onClick={() => goTo("/client/requests/options/table")}
            className="group cursor-pointer h-full"
          >
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-12 h-full flex flex-col items-center justify-center min-h-[400px] hover:scale-105">
              <div className="mb-6 p-4 bg-amber-100 rounded-full group-hover:bg-amber-200 transition-colors">
                <ClipboardList className="w-12 h-12 text-amber-600" />
              </div>

              <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
                Already Have Something in Mind
              </h2>

              <p className="text-center text-slate-600 text-lg leading-relaxed">
                Directly add items to your request in a structured format.
                Perfect if you know exactly what you need.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}