"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { useEffect, useState } from "react";

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Basic Intersection Observer to update active state based on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" } // Triggers when element is primarily in the upper view
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: "How It Works", href: "/#how-it-works", id: "how-it-works" },
    { name: "Services", href: "/#services", id: "services" },
    { name: "For Businesses", href: "/#businesses", id: "businesses" },
    { name: "For Vendors", href: "/#vendors", id: "vendors" },
    { name: "Blog", href: "/#blog", id: "blog" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl rounded-full bg-white/80 backdrop-blur-md border border-white/20 shadow-soft px-8 py-4 flex items-center justify-between"
    >
      <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#1A1A1A]">
        <PackageSearch className="w-6 h-6 text-primary" />
        TechTrio
      </Link>
      
      <nav className="hidden md:flex items-center gap-2 text-sm font-semibold">
        {navLinks.map((link) => (
          <Link 
            key={link.id} 
            href={link.href} 
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeSection === link.id 
                ? "bg-[#1A1A1A] text-white shadow-soft scale-105" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-bold text-foreground hover:text-primary transition-colors hover:bg-muted/50 px-4 py-2 rounded-full hidden md:block">
          Login / Register
        </Link>
      </div>
    </motion.header>
  );
}
