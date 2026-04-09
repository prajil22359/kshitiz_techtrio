"use client";

import { useState } from "react";
import { 
  Search, 
  Plus, 
  Upload, 
  MoreVertical, 
  Box, 
  AlertCircle,
  Truck,
  Edit2,
  Trash2,
  Download,
  Image as ImageIcon,
  Check,
  ChevronDown
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Dummy Data
const CATALOG_ITEMS = [
  { id: "PRD-001", name: "Dell Latitude 7420", category: "Laptops", price: "₹85,000", stock: 45, zones: "Delhi NCR", eta: "2 Days", status: "Active", imgColor: "bg-blue-100 text-blue-600" },
  { id: "PRD-002", name: "Lenovo ThinkPad X1", category: "Laptops", price: "₹1,12,000", stock: 12, zones: "Pan India", eta: "5 Days", status: "Active", imgColor: "bg-red-100 text-red-600" },
  { id: "PRD-003", name: "Logitech MX Master 3S", category: "Accessories", price: "₹8,500", stock: 0, zones: "Delhi NCR", eta: "1 Day", status: "Needs Attention", imgColor: "bg-gray-100 text-gray-600" },
  { id: "PRD-004", name: "MacBook Pro 16 M3", category: "Laptops", price: "₹2,45,000", stock: 5, zones: "Gurgaon", eta: "2 Days", status: "Active", imgColor: "bg-slate-100 text-slate-800" },
  { id: "PRD-005", name: "Dell Ultrasharp 27\"", category: "Monitors", price: "₹32,000", stock: 18, zones: "Pan India", eta: "4 Days", status: "Draft", imgColor: "bg-indigo-100 text-indigo-600" },
  { id: "PRD-006", name: "Anker USB-C Hub", category: "Accessories", price: "₹4,200", stock: 0, zones: "Pan India", eta: "3 Days", status: "Needs Attention", imgColor: "bg-teal-100 text-teal-600" },
];

export default function CatalogHub() {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(CATALOG_ITEMS.map(i => i.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const toggleItem = (id: string) => {
    const newSet = new Set(selectedItems);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedItems(newSet);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Overview Cards with Premium Gradients */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-4 bg-primary/10 text-primary rounded-2xl shadow-sm">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Active Products</p>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">142</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-white to-red-50/30 border border-red-100/50 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-red-100/50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <CardContent className="p-6 flex items-center gap-4 relative z-10">
            <div className="p-4 bg-red-100 text-red-600 rounded-2xl shadow-sm">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Needs Attention</p>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">2</h3>
              <p className="text-sm text-red-600 mt-1 font-medium flex items-center gap-1">Out of stock</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-white to-blue-50/30 border border-blue-100/50 hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl shadow-sm">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Delivery Zones</p>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">5</h3>
              <p className="text-sm text-blue-600 mt-1 font-medium">Pan India Coverage</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Catalog View */}
      <Card className="border border-border bg-white shadow-sm overflow-hidden">
        
        <Tabs defaultValue="all" className="w-full">
          {/* Header Action Bar */}
          <div className="p-4 border-b border-border flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-white">
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <TabsList className="bg-gray-100/80 p-1 h-10">
                <TabsTrigger value="all" className="rounded-md px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm">All Products</TabsTrigger>
                <TabsTrigger value="active" className="rounded-md px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm">Active</TabsTrigger>
                <TabsTrigger value="attention" className="rounded-md px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm text-red-600 data-[state=active]:text-red-700">Needs Attention</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-9 bg-gray-50/50 focus-visible:bg-white h-10 border-gray-200" />
              </div>

              {/* Bulk Import Dialog */}
              <Dialog>
                <DialogTrigger render={<Button variant="outline" className="h-10 gap-2 border-gray-200 hover:bg-gray-50" />}>
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Bulk Import</span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl">Bulk Upload Catalog</DialogTitle>
                    <DialogDescription>
                      Upload your Excel (.xlsx) file to add or update multiple products.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="border-2 border-dashed border-primary/20 hover:border-primary/50 transition-colors bg-primary/5 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 mt-2 cursor-pointer group">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-lg text-foreground">Click or Drag & Drop</p>
                      <p className="text-sm text-muted-foreground mt-1">Supports EXCEL, CSV up to 10MB</p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-3 text-blue-800">
                      <Box className="w-5 h-5"/> 
                      <div>
                        <p className="font-medium text-sm">Need the upload format?</p>
                        <p className="text-xs opacity-80">Download our structured template</p>
                      </div>
                    </div>
                    <Button size="sm" variant="secondary" className="gap-2 bg-white hover:bg-gray-50 text-blue-700 border border-blue-200">
                      <Download className="w-4 h-4"/> Template
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Add Product Sliding Panel */}
              <Sheet>
                <SheetTrigger render={<Button className="h-10 gap-2 shadow-sm" />}>
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Product</span>
                </SheetTrigger>
                <SheetContent className="sm:max-w-md w-full overflow-y-auto border-l-0 shadow-2xl">
                  <SheetHeader className="mb-6">
                    <SheetTitle className="text-2xl">Create Product</SheetTitle>
                    <SheetDescription>
                      Add a new item to your catalog. Fields marked * are required.
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="space-y-6 pb-20">
                    {/* Image Upload Dummy */}
                    <div className="w-full h-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:bg-gray-100 hover:border-gray-300 transition-colors cursor-pointer">
                      <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                      <span className="text-sm font-medium">Upload Product Image</span>
                      <span className="text-xs opacity-70">PNG, JPG to 2MB</span>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-foreground">Product Name *</label>
                      <Input placeholder="e.g. Dell Latitude 7420" className="h-11" />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-foreground">Description</label>
                      <Textarea placeholder="Detailed product specifications..." className="resize-none h-24" />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-foreground">Category *</label>
                        <DropdownMenu>
                          <DropdownMenuTrigger render={<Button variant="outline" className="w-full justify-between h-11 font-normal text-muted-foreground border-gray-200" />}>
                            Select category <ChevronDown className="w-4 h-4 opacity-50" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-full">
                            <DropdownMenuItem>Laptops</DropdownMenuItem>
                            <DropdownMenuItem>Monitors</DropdownMenuItem>
                            <DropdownMenuItem>Accessories</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-foreground">Price/Unit (₹) *</label>
                        <Input placeholder="0.00" type="number" className="h-11" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-foreground">Initial Stock</label>
                        <Input placeholder="Qty" type="number" className="h-11" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-foreground">Average ETA</label>
                        <Input placeholder="e.g. 2 Days" className="h-11" />
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-semibold text-foreground">Product Status</label>
                          <p className="text-xs text-muted-foreground">Make this product live immediately</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="relative p-4 border-t border-border bg-white flex justify-end gap-3 z-10">
                    <SheetTrigger render={<Button variant="outline" className="w-full sm:w-auto h-11" />}>
                      Cancel
                    </SheetTrigger>
                    <Button className="w-full sm:w-auto h-11 shadow-sm">Save Product</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto min-h-[400px]">
            <TabsContent value="all" className="m-0 border-none p-0 outline-none">
              <Table>
                <TableHeader className="bg-gray-50/80 sticky top-0 z-10 hidden sm:table-header-group border-b">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[50px] px-4">
                      <Checkbox 
                        checked={selectedItems.size === CATALOG_ITEMS.length && CATALOG_ITEMS.length > 0}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="w-[80px] text-xs font-semibold uppercase tracking-wider text-muted-foreground">ID</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Product Details</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Price/Unit</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Inventory & ETA</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CATALOG_ITEMS.map((item) => (
                    <TableRow 
                      key={item.id} 
                      className={`hover:bg-gray-50/50 transition-colors group ${selectedItems.has(item.id) ? 'bg-primary/5' : ''}`}
                      data-state={selectedItems.has(item.id) && "selected"}
                    >
                      <TableCell className="px-4">
                        <Checkbox 
                          checked={selectedItems.has(item.id)}
                          onCheckedChange={() => toggleItem(item.id)}
                          aria-label={`Select ${item.name}`}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground/70">{item.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4 w-max">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${item.imgColor}`}>
                            {item.name.substring(0,2).toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors cursor-pointer">{item.name}</span>
                            <span className="text-xs text-muted-foreground">{item.category} • {item.zones}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-sm text-right">{item.price}</TableCell>
                      <TableCell>
                        <div className="flex flex-col w-max">
                          <span className={`text-sm font-semibold flex items-center gap-1.5 ${item.stock === 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                            {item.stock === 0 ? <AlertCircle className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                            {item.stock === 0 ? 'Out of Stock' : `${item.stock} in stock`}
                          </span>
                          <span className="text-xs text-muted-foreground">Ships in {item.eta}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.status === 'Active' && <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Active</Badge>}
                        {item.status === 'Needs Attention' && <Badge className="bg-red-50 text-red-700 border-red-200">Needs Attention</Badge>}
                        {item.status === 'Draft' && <Badge variant="outline" className="text-gray-500 bg-gray-50">Draft</Badge>}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 data-[state=open]:opacity-100" />}>
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 border-gray-100 shadow-xl rounded-xl">
                            <DropdownMenuItem className="gap-2 cursor-pointer font-medium text-sm">
                              <Edit2 className="w-4 h-4 text-muted-foreground" /> Edit item
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer font-medium text-sm">
                              <Box className="w-4 h-4 text-muted-foreground" /> Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 cursor-pointer font-medium text-sm text-red-600 focus:text-red-700 focus:bg-red-50">
                              <Trash2 className="w-4 h-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            {/* Empty States for other tabs could go here */}
            <TabsContent value="active" className="p-8 text-center text-muted-foreground">
              Filtered to Active Products (Dummy view)
            </TabsContent>
            <TabsContent value="attention" className="p-8 text-center text-muted-foreground">
              Filtered to Items needing attention (Dummy view)
            </TabsContent>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-border flex items-center justify-between bg-gray-50/30">
            <p className="text-sm text-muted-foreground font-medium">Showing 1 to 6 of 142 items</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled className="border-gray-200">Previous</Button>
              <Button variant="outline" size="sm" className="border-gray-200 bg-white">Next</Button>
            </div>
          </div>
        </Tabs>
      </Card>

      {/* Floating Bulk Action Bar (Shows when items are selected) */}
      {selectedItems.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white rounded-full px-6 py-3 shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-10 fade-in z-50">
          <span className="font-medium text-sm">
            <span className="bg-primary/20 text-primary-foreground px-2 py-0.5 rounded-md mr-2">{selectedItems.size}</span>
            Products Selected
          </span>
          <div className="w-px h-5 bg-gray-700" />
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="hover:bg-gray-800 text-white hover:text-white h-8 text-xs font-medium">
              Update Stock
            </Button>
            <Button size="sm" variant="ghost" className="hover:bg-gray-800 text-white hover:text-white h-8 text-xs font-medium">
              Change Status
            </Button>
            <Button size="sm" variant="ghost" className="hover:bg-red-900/50 text-red-400 hover:text-red-300 h-8 text-xs font-medium gap-1.5 ml-2">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
