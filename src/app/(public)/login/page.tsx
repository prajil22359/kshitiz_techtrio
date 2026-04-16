"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const redirectByRole = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      setError("User session not found.");
      setLoading(false);
      return;
    }

    const user = userData.user;

    // ✅ ONLY trust DB
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    if (!profile) {
      setError("Profile not found. Please complete signup.");
      setLoading(false);
      return;
    }

    const role = profile.role;

    // ✅ detect which login page user is on
    const currentPath = window.location.pathname;
    const isVendorLogin = currentPath.includes("vendor");
    const isClientLogin = currentPath.includes("client");

    if (isVendorLogin && role !== "vendor") {
      setError("This account is registered as client. Please login from client panel.");
      setLoading(false);
      return;
    }

    if (isClientLogin && role !== "client") {
      setError("This account is registered as vendor. Please login from vendor panel.");
      setLoading(false);
      return;
    }

    // ✅ SINGLE redirect
    router.push(role === "vendor" ? "/vendor/dashboard" : "/client/dashboard");
    router.refresh();
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    await redirectByRole();
  };

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?flow=login`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div>
        <Link href="/">
          <Button variant="outline" className="absolute top-6 left-6">
            <PackageSearch className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-white border border-border rounded-2xl shadow-soft flex items-center justify-center mb-6">
          <PackageSearch className="w-8 h-8 text-primary" />
        </div>
        <h2 className="mt-2 text-center text-4xl font-bold tracking-tight text-[#1A1A1A]">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-base text-muted-foreground font-medium">
          Sign in to your All Product God dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-10 px-6 sm:px-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] border border-border border-b-4 border-b-border/60">
          <form className="space-y-6" onSubmit={handleEmailSignIn}>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-semibold text-[#1A1A1A] mb-2"
              >
                Email address
              </Label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="admin@allproductgod.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-semibold text-[#1A1A1A] mb-2"
              >
                Password
              </Label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm font-medium text-muted-foreground"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-primary hover:text-black transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {error ? <p className="text-sm font-medium text-red-500">{error}</p> : null}

            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full justify-center text-base h-14 bg-[#1A1A1A] text-white hover:bg-black font-semibold rounded-2xl"
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>

              <Button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full h-14 flex items-center justify-center gap-2 border-2 border-border/50 rounded-2xl bg-[#FAFAFA] hover:bg-muted/50 font-semibold text-[#1A1A1A] transition-colors"
                variant="outline"
              >
                <FcGoogle className="w-5 h-5" />
                <span className="text-base">Sign in with Google</span>
              </Button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-muted-foreground font-medium">
                  New to All Product God?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/register">
                <Button
                  variant="outline"
                  className="w-full h-14 rounded-2xl font-bold bg-[#FAFAFA] border-2 border-border/50 text-[#1A1A1A] hover:bg-muted/50"
                >
                  Create an account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}