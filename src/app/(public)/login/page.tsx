"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { PackageSearch } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      const user = data.user;
      if (!user) {
        setMessage("Login succeeded but user session was not created.");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        setMessage(profileError.message);
        return;
      }

      if (!profile) {
        setMessage("No profile found. Please complete registration first.");
        router.push("/register");
        return;
      }

      if (profile.role === "client") {
        router.push("/client/dashboard");
      } else if (profile.role === "vendor") {
        router.push("/vendor/dashboard");
      } else if (profile.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  }

  async function signInWithGoogle() {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    }
  }

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
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="admin@allproductgod.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-muted-foreground">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-semibold text-primary hover:text-black transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full justify-center text-base h-14 bg-[#1A1A1A] text-white hover:bg-black font-semibold rounded-2xl"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>

              <Button
                type="button"
                onClick={signInWithGoogle}
                className="w-full h-14 flex items-center justify-center gap-2 border-2 border-border/50 rounded-2xl bg-[#FAFAFA] hover:bg-muted/50 font-semibold text-[#1A1A1A] transition-colors"
                variant="outline"
                disabled={loading}
              >
                <FcGoogle className="w-5 h-5" />
                <span className="text-base">Sign in with Google</span>
              </Button>
            </div>

            {message ? <p className="text-sm text-rose-600">{message}</p> : null}
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-muted-foreground font-medium">New to All Product God?</span>
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

        <p className="mt-10 text-center gap-2 text-sm text-muted-foreground font-medium flex justify-center items-center">
          Internal operations team?
          <Link href="/admin/dashboard" className="font-semibold leading-6 text-[#1A1A1A] hover:text-primary transition-colors">
            Admin Sign In →
          </Link>
        </p>
      </div>
    </div>
  );
}