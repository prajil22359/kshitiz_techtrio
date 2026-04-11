"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
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

type ItemFormSidePanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: Omit<TableItem, "id">) => void;
  editingItem?: TableItem;
};

export function ItemFormSidePanel({
  isOpen,
  onClose,
  onSubmit,
  editingItem,
}: ItemFormSidePanelProps) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    quality: "",
    priceRange: "",
    comment: "",
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        quantity: editingItem.quantity,
        quality: editingItem.quality,
        priceRange: editingItem.priceRange,
        comment: editingItem.comment,
      });
    } else {
      setFormData({
        name: "",
        quantity: "",
        quality: "",
        priceRange: "",
        comment: "",
      });
    }
  }, [editingItem, isOpen]);

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert("Please enter an item name");
      return;
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            {editingItem ? "Edit Item" : "Add New Item"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Item Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Office Chairs"
                className="border-slate-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Quantity
              </label>
              <Input
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                placeholder="e.g., 10 units"
                className="border-slate-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Quality
              </label>
              <Input
                value={formData.quality}
                onChange={(e) =>
                  setFormData({ ...formData, quality: e.target.value })
                }
                placeholder="e.g., Premium, Standard, Budget"
                className="border-slate-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Price Range
              </label>
              <Input
                value={formData.priceRange}
                onChange={(e) =>
                  setFormData({ ...formData, priceRange: e.target.value })
                }
                placeholder="e.g., $100-$200"
                className="border-slate-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Comment/Notes
              </label>
              <Textarea
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                placeholder="Any additional information about this item"
                className="border-slate-300 min-h-32"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editingItem ? "Update Item" : "Add Item"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
