export type CatalogStatus = "Active" | "Needs Attention" | "Draft";

export type CatalogItem = {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  zones: string;
  eta: string;
  status: CatalogStatus;
  imgColor: string;
};

export const SEED_CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "PRD-001",
    name: "Dell Latitude 7420",
    category: "Laptops",
    price: "₹85,000",
    stock: 45,
    zones: "Delhi NCR",
    eta: "2 Days",
    status: "Active",
    imgColor: "bg-blue-100 text-blue-600",
  },
  {
    id: "PRD-002",
    name: "Lenovo ThinkPad X1",
    category: "Laptops",
    price: "₹1,12,000",
    stock: 12,
    zones: "Pan India",
    eta: "5 Days",
    status: "Active",
    imgColor: "bg-red-100 text-red-600",
  },
  {
    id: "PRD-003",
    name: "Logitech MX Master 3S",
    category: "Accessories",
    price: "₹8,500",
    stock: 0,
    zones: "Delhi NCR",
    eta: "1 Day",
    status: "Needs Attention",
    imgColor: "bg-gray-100 text-gray-600",
  },
  {
    id: "PRD-004",
    name: "MacBook Pro 16 M3",
    category: "Laptops",
    price: "₹2,45,000",
    stock: 5,
    zones: "Gurgaon",
    eta: "2 Days",
    status: "Active",
    imgColor: "bg-slate-100 text-slate-800",
  },
  {
    id: "PRD-005",
    name: "Dell Ultrasharp 27\"",
    category: "Monitors",
    price: "₹32,000",
    stock: 18,
    zones: "Pan India",
    eta: "4 Days",
    status: "Draft",
    imgColor: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "PRD-006",
    name: "Anker USB-C Hub",
    category: "Accessories",
    price: "₹4,200",
    stock: 0,
    zones: "Pan India",
    eta: "3 Days",
    status: "Needs Attention",
    imgColor: "bg-teal-100 text-teal-600",
  },
];
