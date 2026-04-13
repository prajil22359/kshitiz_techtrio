"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {FloatingNav} from "@/components/layout/floating-nav";
import { 
  Bot, PackageSearch, ShieldCheck, Zap, Monitor, 
  Coffee, HardHat, Building2, Store, ArrowRight 
} from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col bg-[#FAFAFA] min-h-screen font-sans overflow-x-hidden">
      <FloatingNav />
      
      {/* 1. Hero Section with Floating UI Cards */}
      <section className="relative pt-48 pb-32 px-6 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-16">
          
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-border bg-white px-4 py-1.5 text-sm font-semibold shadow-sm text-muted-foreground mx-auto lg:mx-0"
            >
              <span className="flex h-2.5 w-2.5 rounded-full bg-primary mr-2.5 animate-pulse"></span>
              All Product God Operations Layer
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-[80px] font-black tracking-tight text-[#1A1A1A] leading-[1.05]"
            >
              Procurement <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-500">Uncomplicated.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground font-medium max-w-xl mx-auto lg:mx-0"
            >
              The intelligent B2B managed service locking buyers and premium vendors into a unified, high-speed ecosystem.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 relative w-full h-[500px] hidden md:block"
          >
             {/* Floating UI Elements */}
             <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-0 w-[400px] bg-white rounded-[32px] p-6 shadow-2xl border border-border max-w-full"
             >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-[#1A1A1A]">Structured Manifest</h4>
                  <div className="px-2 py-1 bg-primary/20 text-[#1A1A1A] text-xs font-bold rounded-full">Approved</div>
                </div>
                <div className="space-y-3">
                  <div className="h-10 bg-muted/50 rounded-xl w-full border border-border"></div>
                  <div className="h-10 bg-muted/50 rounded-xl w-full border border-border"></div>
                </div>
             </motion.div>

             <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-0 w-[300px] bg-[#1A1A1A] rounded-[32px] p-6 shadow-2xl border border-[#27272A] z-20"
             >
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black font-bold">
                    14
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Bids Curated</h4>
                    <p className="text-zinc-400 text-sm">Waiting for selection</p>
                  </div>
                </div>
             </motion.div>
          </motion.div>

        </div>
      </section>

      {/* 2. How it works (Horizontal Flow) */}
      <section id="how-it-works" className="py-24 px-6 bg-white border-y border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight">How the machine works</h2>
            <p className="text-lg text-muted-foreground mt-4 font-medium max-w-2xl mx-auto">We abstract away the messy emails, spreadsheets, and endless negotiations into a clean vertical flow.</p>
          </motion.div>

          <div className="flex flex-col md:flex-row relative items-start justify-between gap-8">
            <div className="hidden md:block absolute top-12 left-20 right-20 h-1 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex-1 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-[#FAFAFA] border-2 border-border shadow-soft flex items-center justify-center mb-6 hover:scale-105 transition-transform cursor-pointer">
                 <Bot className="w-10 h-10 text-[#1A1A1A]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">1. AI Scoping</h3>
              <p className="text-muted-foreground text-lg">Clients chat with our conversational intake agent to convert messy thoughts into structured item lists.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex-1 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-[#1A1A1A] border-4 border-white shadow-2xl flex items-center justify-center mb-6 z-10 hover:scale-105 transition-transform cursor-pointer">
                 <Zap className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">2. Triage & RFQ</h3>
              <p className="text-muted-foreground text-lg">Our Admin control room blasts specific lines to the right vendors and forces standardization on bids.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex-1 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-primary border-4 border-white shadow-soft flex items-center justify-center mb-6 hover:scale-105 transition-transform cursor-pointer">
                 <ShieldCheck className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">3. Curated Proposals</h3>
              <p className="text-muted-foreground text-lg">Clients receive isolated "Basic", "Intermediate", and "Premium" options. Single-click to approve and dispatch.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Domain Grid */}
      <section id="domain" className="py-24 px-6 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight mb-16 text-center"
          >
            Core Procurement Domains
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border border-border shadow-sm flex flex-col items-center text-center hover:border-primary transition-colors cursor-default"
            >
              <Monitor className="w-12 h-12 text-[#1A1A1A] mb-6" />
              <h4 className="text-xl font-bold mb-2 text-[#1A1A1A]">IT & Infrastructure</h4>
              <p className="text-muted-foreground">Laptops, networking racks, enterprise displays, and secure hardware deployments.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border border-border shadow-sm flex flex-col items-center text-center hover:border-primary transition-colors cursor-default"
            >
              <Coffee className="w-12 h-12 text-[#1A1A1A] mb-6" />
              <h4 className="text-xl font-bold mb-2 text-[#1A1A1A]">F&B and Lifestyle</h4>
              <p className="text-muted-foreground">Commercial kitchen setups, espresso stations, and branch pantry supplies.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border border-border shadow-sm flex flex-col items-center text-center hover:border-primary transition-colors cursor-default"
            >
              <HardHat className="w-12 h-12 text-[#1A1A1A] mb-6" />
              <h4 className="text-xl font-bold mb-2 text-[#1A1A1A]">Office Fit-outs</h4>
              <p className="text-muted-foreground">Ergonomic seating, acoustic panels, heavy furnishings, and structural accessories.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Services*/}
      <section className="py-24 px-0 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2">
          
          <div id="services" className="p-16 lg:pr-24 lg:border-r border-border flex flex-col justify-center">
            <Building2 className="w-16 h-16 text-[#1A1A1A] mb-8" />
            <h2 className="text-4xl font-bold text-[#1A1A1A] mb-6">For Businesses</h2>
            <p className="text-xl text-muted-foreground font-medium mb-12">Stop wasting 40 hours a week chasing suppliers. You tell the concierge what you need, and we return with a polished selection of quotes you can trust.</p>
            <ul className="space-y-4 mb-12">
              <li className="flex items-center gap-4 text-lg font-semibold text-[#1A1A1A]"><div className="w-3 h-3 rounded-full bg-primary" /> Curated Tiering Options</li>
              <li className="flex items-center gap-4 text-lg font-semibold text-[#1A1A1A]"><div className="w-3 h-3 rounded-full bg-primary" /> End-to-end Logistics via Shiprocket</li>
              <li className="flex items-center gap-4 text-lg font-semibold text-[#1A1A1A]"><div className="w-3 h-3 rounded-full bg-primary" /> Unified Invoicing</li>
            </ul>
            <Link href="/register/client">
              <Button size="lg" className="rounded-full font-bold shadow-soft">Create Client Profile</Button>
            </Link>
          </div>

          <div id="services" className="p-16 lg:pl-24 bg-[#1A1A1A] text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
            <Store className="w-16 h-16 text-primary mb-8 relative z-10" />
            <h2 className="text-4xl font-bold text-white mb-6 relative z-10">For Vendors</h2>
            <p className="text-xl text-zinc-400 font-medium mb-12 relative z-10">Gain access to pre-qualified, high-volume B2B orders without the marketing overhead. We send you the RFQ; you just quote the price.</p>
            <ul className="space-y-4 mb-12 relative z-10">
               <li className="flex items-center gap-4 text-lg font-semibold text-white"><div className="w-3 h-3 rounded-full bg-white" /> Direct high-intent inbound leads</li>
               <li className="flex items-center gap-4 text-lg font-semibold text-white"><div className="w-3 h-3 rounded-full bg-white" /> Automated structured quoting</li>
               <li className="flex items-center gap-4 text-lg font-semibold text-white"><div className="w-3 h-3 rounded-full bg-white" /> Guaranteed payment cycles</li>
            </ul>
            <div className="relative z-10">
               <Link href="/register/vendor">
                 <Button size="lg" variant="outline" className="rounded-full font-bold text-[#1A1A1A] border-white hover:bg-white hover:text-black transition-colors">Apply to Network</Button>
               </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Blog Preview Grid */}
      <section id="blog" className="py-24 px-6 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight">System Logs</h2>
              <p className="text-lg text-muted-foreground mt-4 font-medium">Updates, thought leadership, and platform releases.</p>
            </div>
            <Link href="#" className="hidden md:flex font-bold text-[#1A1A1A] hover:text-primary items-center gap-2">Read all articles <ArrowRight className="w-5 h-5"/></Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <div className="group cursor-pointer">
               <div className="h-64 bg-zinc-200 rounded-[32px] mb-6 overflow-hidden">
                 <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 group-hover:scale-105 transition-transform duration-500"/>
               </div>
               <span className="text-primary font-bold text-sm tracking-wider uppercase mb-2 block">Release</span>
               <h4 className="text-2xl font-bold text-[#1A1A1A] mb-3 group-hover:text-primary transition-colors">All Product God Engine v2.0 is live</h4>
               <p className="text-muted-foreground">A deeper look into how our AI concierge structures untamed raw data into standard manifests.</p>
             </div>
             
             <div className="group cursor-pointer">
               <div className="h-64 bg-zinc-200 rounded-[32px] mb-6 overflow-hidden">
                 <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 group-hover:scale-105 transition-transform duration-500"/>
               </div>
               <span className="text-primary font-bold text-sm tracking-wider uppercase mb-2 block">Operations</span>
               <h4 className="text-2xl font-bold text-[#1A1A1A] mb-3 group-hover:text-primary transition-colors">The Logistics Pipeline</h4>
               <p className="text-muted-foreground">How we are integrating with Shiprocket to provide mile-by-mile analytics on enterprise deliveries.</p>
             </div>

             <div className="group cursor-pointer">
               <div className="h-64 bg-zinc-200 rounded-[32px] mb-6 overflow-hidden">
                 <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 group-hover:scale-105 transition-transform duration-500"/>
               </div>
               <span className="text-primary font-bold text-sm tracking-wider uppercase mb-2 block">Case Study</span>
               <h4 className="text-2xl font-bold text-[#1A1A1A] mb-3 group-hover:text-primary transition-colors">Setting up 15 branches in 30 days</h4>
               <p className="text-muted-foreground">Walk through the timeline of how ACME Corp scaled rapidly without a dedicated procurement team.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Soft Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden bg-[#1A1A1A] flex flex-col items-center text-center">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-primary/20 blur-[150px] pointer-events-none" />
         <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight">Ready to stop chasing quotes?</h2>
            <p className="text-xl text-zinc-400 font-medium">Join the intelligent procurement network today.</p>
            <div className="flex justify-center pt-8">
               <Link href="/register">
                 <Button size="lg" className="h-16 px-10 text-xl font-bold rounded-full shadow-[0_0_40px_rgba(176,255,77,0.4)]">Get Started Today</Button>
               </Link>
            </div>
         </div>
      </section>

      {/* 8. Footer */}
      <footer className="bg-black text-white pt-24 pb-12 px-6 border-t border-zinc-900">
         <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2">
               <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-white mb-6">
                 <PackageSearch className="w-8 h-8 text-primary" />
                 All Product God
               </Link>
               <p className="text-zinc-500 font-medium max-w-sm mb-8">The intelligent B2B managed service locking buyers and premium vendors into a unified, high-speed ecosystem.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Platform</h4>
              <ul className="space-y-4 text-zinc-400 font-medium">
                <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
                <li><Link href="/#services" className="hover:text-white transition-colors">Domains</Link></li>
                <li><Link href="/client/dashboard" className="hover:text-white transition-colors">Client Portal</Link></li>
                <li><Link href="/vendor/dashboard" className="hover:text-white transition-colors">Vendor Portal</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
              <ul className="space-y-4 text-zinc-400 font-medium">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/#blog" className="hover:text-white transition-colors">System Logs</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Legal</h4>
              <ul className="space-y-4 text-zinc-400 font-medium">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Vendor Agreement</Link></li>
              </ul>
            </div>
         </div>

         <div className="max-w-6xl mx-auto pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between text-zinc-600 font-medium">
            <p>© 2026 All Product God Operations Ltd. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
               <span>Twitter</span>
               <span>LinkedIn</span>
            </div>
         </div>
      </footer>

    </main>
  );
}