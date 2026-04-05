import { FloatingNav } from "@/components/layout/floating-nav";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate min-h-screen">
      <FloatingNav />
      {children}
    </div>
  );
}
