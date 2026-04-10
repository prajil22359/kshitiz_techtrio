"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Store, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";

type AuthUser = {
  id: string;
  email?: string | null;
  user_metadata?: {
    full_name?: string;
    first_name?: string;
    last_name?: string;
  };
};

export default function VendorRegistration() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    fullName: "",
    businessName: "",
    phone: "",
    alternateEmail: "",
  });

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (user) {
        setAuthUser(user);
        setFormData((prev) => ({
          ...prev,
          email: user.email ?? prev.email,
          fullName:
            user.user_metadata?.full_name ??
            `${user.user_metadata?.first_name ?? ""} ${user.user_metadata?.last_name ?? ""}`.trim() ??
            prev.fullName,
        }));
        setStep(2);
      }
    };

    loadSession();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createAuthAccount = async () => {
    setLoading(true);
    setMessage("");

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: fullName,
            role: "vendor",
          },
        },
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (!data.user) {
        setMessage("Account created. Please verify your email, then continue.");
        return;
      }

      setAuthUser(data.user);
      setFormData((prev) => ({ ...prev, fullName }));
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (!authUser) {
      setMessage("Please create the auth account first.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.from("users").upsert(
        [
          {
            id: authUser.id,
            email: formData.email || authUser.email || "",
            name: formData.fullName,
            role: "vendor",
            company_name: formData.businessName,
            phone: formData.phone,
            alternate_email: formData.alternateEmail || null,
          },
        ],
        { onConflict: "id" }
      );

      if (error) {
        setMessage(error.message);
        return;
      }

      router.push("/vendor/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const isStep1Valid =
    formData.firstName && formData.lastName && formData.email && formData.password;

  const isStep2Valid =
    formData.fullName && formData.businessName && formData.phone;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />

      <div className="hidden lg:flex w-1/2 flex-col justify-between p-16 z-10">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-[#1A1A1A]">
            <div className="bg-[#1A1A1A] p-2 rounded-xl">
              <Store className="w-6 h-6 text-primary" />
            </div>
            All Product God
          </Link>

          <div className="mt-32 max-w-lg">
            <h1 className="text-5xl font-extrabold text-[#1A1A1A] leading-tight">
              Scale your B2B sales automation.
            </h1>

            <p className="mt-6 text-xl text-muted-foreground">
              Join thousands of verified suppliers fulfilling enterprise requests effortlessly.
            </p>

            <div className="mt-12 space-y-6">
              {[
                "Instant access to verified enterprise RFQs",
                "Automated quoting & intelligent bid matching",
                "Guaranteed payment protection & fast settlements",
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-4 font-medium">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} All Product God Corp.
        </p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10">
        <div className="w-full max-w-md bg-white p-10 rounded-[32px] shadow-2xl shadow-primary/5 border border-border/50">
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${(step - 1) * 100}%)` }}
            >
              <div className="w-full flex-shrink-0">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-[#1A1A1A]">Create Account</h2>
                  <p className="text-muted-foreground mt-1">Register as a supplier</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#1A1A1A]">First Name</label>
                      <Input
                        name="firstName"
                        placeholder="John"
                        className="h-12 rounded-2xl bg-gray-50/70 border-gray-200 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/30"
                        onChange={handleChange}
                        value={formData.firstName}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#1A1A1A]">Last Name</label>
                      <Input
                        name="lastName"
                        placeholder="Doe"
                        className="h-12 rounded-2xl bg-gray-50/70 border-gray-200 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/30"
                        onChange={handleChange}
                        value={formData.lastName}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#1A1A1A]">Email</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="john@email.com"
                      className="h-12 rounded-2xl bg-gray-50/70 border-gray-200 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/30"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#1A1A1A]">Password</label>
                    <Input
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="h-12 rounded-2xl bg-gray-50/70 border-gray-200 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/30"
                      onChange={handleChange}
                      value={formData.password}
                    />
                  </div>

                  <Button
                    className="w-full h-12 text-base font-semibold mt-4 shadow-sm group"
                    onClick={createAuthAccount}
                    disabled={!isStep1Valid || loading}
                    type="button"
                  >
                    Create Vendor Profile
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <div className="flex items-center gap-3 py-2">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs font-semibold tracking-widest text-muted-foreground">
                      OR
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-2xl flex items-center gap-3 border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-all duration-200"
                    onClick={async () => {
                      await supabase.auth.signInWithOAuth({
                        provider: "google",
                        options: {
                          redirectTo: `${window.location.origin}/register/vendor`,
                        },
                      });
                    }}
                    type="button"
                    disabled={loading}
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      className="w-5 h-5"
                      alt="Google"
                    />
                    <span className="font-medium">Sign up with Google</span>
                  </Button>

                  <p className="pt-2 text-sm text-center text-muted-foreground">
                    Already registered?{" "}
                    <Link href="/login" className="font-semibold text-[#1A1A1A] hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>

              <div className="w-full flex-shrink-0 space-y-5">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-[#1A1A1A]">Complete Profile</h2>
                  <p className="text-muted-foreground">Few more details</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#1A1A1A]">Full Name</label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="h-12 bg-gray-50/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#1A1A1A]">Business Name</label>
                  <Input
                    name="businessName"
                    placeholder="e.g. John Traders Inc."
                    className="h-12 bg-gray-50/50"
                    onChange={handleChange}
                    value={formData.businessName}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Phone Number</label>
                  <div className="flex gap-2">
                    <Input disabled placeholder="+91" className="h-12 w-20 bg-gray-100 text-center font-medium" />
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="98765 43210"
                      className="h-12 flex-1 bg-gray-50/50"
                      onChange={handleChange}
                      value={formData.phone}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#1A1A1A]">
                    Alternate Business Email
                  </label>
                  <Input
                    name="alternateEmail"
                    type="email"
                    placeholder="john@business.com (Optional)"
                    className="h-12 bg-gray-50/50"
                    onChange={handleChange}
                    value={formData.alternateEmail}
                  />
                </div>

                <Button
                  className="w-full h-12 text-base font-semibold mt-4 shadow-sm group bg-[#A3F43A] hover:bg-[#8FE12F] text-black disabled:opacity-100 disabled:bg-[#A3F43A] disabled:text-black"
                  disabled={!isStep2Valid || loading}
                  onClick={handleContinue}
                  type="button"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-muted-foreground w-full"
                  type="button"
                >
                  ← Back
                </button>

                {message ? <p className="text-sm text-rose-600 text-center">{message}</p> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}