"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const finish = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (!profile) {
        router.replace("/register");
        return;
      }

      if (profile.role === "client") {
        router.replace("/client/dashboard");
      } else if (profile.role === "vendor") {
        router.replace("/vendor/dashboard");
      } else if (profile.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/");
      }
    };

    finish();
  }, [router]);

  return <div className="min-h-screen flex items-center justify-center">Signing you in...</div>;
}