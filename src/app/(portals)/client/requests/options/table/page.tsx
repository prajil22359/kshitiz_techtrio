"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type TableItem = {
  id: string;
  name: string;
  quantity: string;
  quality: string;
  priceRange: string;
  comment: string;
};

export default function TablePage() {
  const [items, setItems] = useState<TableItem[]>([
    {
      id: "1",
      name: "",
      quantity: "",
      quality: "",
      priceRange: "",
      comment: "",
    },
  ]);

  const handleAddRow = () => {
    const newItem: TableItem = {
      id: Date.now().toString(),
      name: "",
      quantity: "",
      quality: "",
      priceRange: "",
      comment: "",
    };
    setItems([...items, newItem]);
  };

  const handleUpdateItem = (id: string, field: keyof TableItem, value: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleDeleteRow = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = () => {
    const filledItems = items.filter((item) => item.name.trim());
    if (filledItems.length === 0) {
      alert("Please add at least one item");
      return;
    }
    console.log("Submitted items:", filledItems);
    // TODO: Submit to API
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Link href="/client/requests/options">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Options
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Items List</h1>
          <p className="text-lg text-slate-600">Add the items you need to purchase</p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Quality</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Price Range</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Comment</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <Input
                        value={item.name}
                        onChange={(e) => handleUpdateItem(item.id, "name", e.target.value)}
                        placeholder="e.g., Office Chairs"
                        className="border-slate-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Input
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(item.id, "quantity", e.target.value)}
                        placeholder="e.g., 10 units"
                        className="border-slate-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Input
                        value={item.quality}
                        onChange={(e) => handleUpdateItem(item.id, "quality", e.target.value)}
                        placeholder="e.g., Premium"
                        className="border-slate-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Input
                        value={item.priceRange}
                        onChange={(e) => handleUpdateItem(item.id, "priceRange", e.target.value)}
                        placeholder="e.g., $100-$200"
                        className="border-slate-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Input
                        value={item.comment}
                        onChange={(e) => handleUpdateItem(item.id, "comment", e.target.value)}
                        placeholder="Additional notes"
                        className="border-slate-300"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDeleteRow(item.id)}
                        className="text-red-600 hover:text-red-800 font-medium disabled:text-slate-300 transition-colors"
                        disabled={items.length === 1}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Row Button */}
        <div className="flex gap-4 mb-8">
          <Button
            onClick={handleAddRow}
            variant="outline"
            className="gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Item
          </Button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Check className="w-5 h-5" />
            Confirm List
          </Button>
        </div>
      </div>
    </div>
  );
}
