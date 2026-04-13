import Link from "next/link";
import { Building2, Store } from "lucide-react";

export default function Register() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Abstract Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center relative z-10 mb-16 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A1A1A]">
          Join the network.
        </h2>
        <p className="mt-4 text-xl text-muted-foreground font-medium">
          Whether you are requesting procurement services or supplying them, select your role below to get started.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-8">
        
        {/* Client Registration Option */}
        <Link href="/register/client" className="group">
           <div className="bg-white rounded-[32px] p-10 border-2 border-border shadow-soft hover:border-primary hover:shadow-[0_8px_30px_rgb(176,255,77,0.2)] transition-all duration-300 h-full flex flex-col items-center text-center cursor-pointer relative overflow-hidden bg-gradient-to-b hover:from-primary/5 hover:to-transparent">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">I am a Business</h3>
              <p className="text-muted-foreground text-lg flex-1">
                 You are an enterprise or startup looking to drastically speed up and simplify your operational procurement flows. Let us manage the bidding.
              </p>
              <div className="mt-8 font-bold text-[#1A1A1A] flex items-center gap-2 group-hover:text-primary transition-colors">
                Register as Client →
              </div>
           </div>
        </Link>

        {/* Vendor Registration Option */}
        <Link href="/register/vendor" className="group">
           <div className="bg-[#1A1A1A] rounded-[32px] p-10 border-2 border-[#27272A] shadow-soft hover:border-black transition-all hover:shadow-2xl duration-300 h-full flex flex-col items-center text-center cursor-pointer relative overflow-hidden">
              <div className="w-20 h-20 bg-[#27272A] rounded-full flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300 border border-zinc-700">
                 <Store className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">I am a Vendor</h3>
              <p className="text-zinc-400 text-lg flex-1">
                 You are a verified supplier or brand seeking automated, high-volume B2B leads. Enter the triage gatekeeper queue.
              </p>
              <div className="mt-8 font-bold text-white flex items-center gap-2 group-hover:text-primary transition-colors">
                Apply as Vendor →
              </div>
           </div>
        </Link>

      </div>

      <p className="mt-12 text-center text-base text-muted-foreground font-medium relative z-10">
        Already have an account?{" "}
        <Link href="/login" className="font-bold leading-6 text-[#1A1A1A] hover:text-primary transition-colors">
          Sign in here.
        </Link>
      </p>

    </div>
  );
}