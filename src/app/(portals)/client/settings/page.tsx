import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Building, MapPin, Bell, Shield, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#1A1A1A]">Account Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your company profile, defaults, and notification preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
           <Button variant="ghost" className="w-full justify-start rounded-xl font-semibold bg-muted/50 text-[#1A1A1A]">
              <Building className="w-5 h-5 mr-3" /> Company Profile
           </Button>
           <Button variant="ghost" className="w-full justify-start rounded-xl text-muted-foreground hover:text-foreground">
              <User className="w-5 h-5 mr-3" /> User Access
           </Button>
           <Button variant="ghost" className="w-full justify-start rounded-xl text-muted-foreground hover:text-foreground">
              <MapPin className="w-5 h-5 mr-3" /> Delivery Addresses
           </Button>
           <Button variant="ghost" className="w-full justify-start rounded-xl text-muted-foreground hover:text-foreground">
              <Wallet className="w-5 h-5 mr-3" /> Billing Details
           </Button>
           <Button variant="ghost" className="w-full justify-start rounded-xl text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5 mr-3" /> Notifications
           </Button>
           <Button variant="ghost" className="w-full justify-start rounded-xl text-muted-foreground hover:text-foreground">
              <Shield className="w-5 h-5 mr-3" /> Security
           </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-8">
           
           <div className="bg-white rounded-[32px] p-8 shadow-soft border border-border">
             <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">Company Profile</h2>
             
             <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="All Product God Corporation" className="rounded-xl h-12" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="grid gap-2">
                     <Label htmlFor="gstin">GSTIN</Label>
                     <Input id="gstin" defaultValue="27AADCB2230M1Z2" className="rounded-xl h-12" disabled />
                     <p className="text-xs text-muted-foreground">To change GSTIN, contact support.</p>
                   </div>
                   <div className="grid gap-2">
                     <Label htmlFor="industry">Industry</Label>
                     <Input id="industry" defaultValue="IT Services" className="rounded-xl h-12" />
                   </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://All Product God.com" className="rounded-xl h-12" />
                </div>
             </div>

             <div className="mt-8 flex justify-end">
               <Button className="rounded-full shadow-soft bg-[#1A1A1A] text-white hover:bg-black px-8">Save Changes</Button>
             </div>
           </div>

           <div className="bg-white rounded-[32px] p-8 shadow-soft border border-border">
             <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">Primary Contact</h2>
             
             <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="Kshitiz Tyagi" className="rounded-xl h-12" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue="kshitiz@All Product God.com" type="email" className="rounded-xl h-12" />
                </div>
                <div className="grid gap-2 md:col-span-2">
                  <Label htmlFor="phone">Phone Number (For Delivery Updates)</Label>
                  <Input id="phone" defaultValue="+91 98765 43210" className="rounded-xl h-12" />
                </div>
             </div>

             <div className="mt-8 flex justify-end">
               <Button className="rounded-full shadow-soft bg-[#1A1A1A] text-white hover:bg-black px-8">Update Contact</Button>
             </div>
           </div>

        </div>

      </div>
    </div>
  );
}
