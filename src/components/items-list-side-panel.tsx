"use client";

import { useState } from "react";
import { Plus, X, Trash2, Edit2, Check } from "lucide-react";
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

type ItemsListSidePanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (items: TableItem[]) => void;
};

export function ItemsListSidePanel({
  isOpen,
  onClose,
  onSubmit,
}: ItemsListSidePanelProps) {
  const [items, setItems] = useState<TableItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    quality: "",
    priceRange: "",
    comment: "",
  });

  const handleOpenForm = (item?: TableItem) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        name: item.name,
        quantity: item.quantity,
        quality: item.quality,
        priceRange: item.priceRange,
        comment: item.comment,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        quantity: "",
        quality: "",
        priceRange: "",
        comment: "",
      });
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      quantity: "",
      quality: "",
      priceRange: "",
      comment: "",
    });
  };

  const handleSubmitForm = () => {
    if (!formData.name.trim()) {
      alert("Please enter an item name");
      return;
    }

    if (editingId) {
      setItems(
        items.map((item) =>
          item.id === editingId
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      const newItem: TableItem = {
        id: Date.now().toString(),
        ...formData,
      };
      setItems([...items, newItem]);
    }

    handleCloseForm();
  };

  const handleDeleteRow = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleConfirm = () => {
    if (items.length === 0) {
      alert("Please add at least one item");
      return;
    }
    console.log("Submitted items:", items);
    onSubmit?.(items);
    handleClose();
  };

  const handleClose = () => {
    setItems([]);
    setShowForm(false);
    setEditingId(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={handleClose}
      />

      {/* Side Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Your Items List</h2>
            <p className="text-sm text-slate-600 mt-1">Add the items you need to purchase</p>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Table or Empty State */}
          {items.length > 0 ? (
            <div className="bg-white rounded-lg shadow overflow-hidden mb-6 border border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">Qty</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">Quality</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">Price</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-xs text-slate-900 font-medium">{item.name}</td>
                        <td className="px-4 py-3 text-xs text-slate-700">{item.quantity}</td>
                        <td className="px-4 py-3 text-xs text-slate-700">{item.quality}</td>
                        <td className="px-4 py-3 text-xs text-slate-700">{item.priceRange}</td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenForm(item)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRow(item.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-lg p-8 mb-6 text-center border border-dashed border-slate-300">
              <p className="text-slate-600">No items added yet. Click "Add Item" to get started.</p>
            </div>
          )}

          {/* Add Item Button */}
          <Button
            onClick={() => handleOpenForm()}
            variant="outline"
            className="gap-2 w-full mb-6"
          >
            <Plus className="w-5 h-5" />
            Add Item
          </Button>

          {/* Confirm Button */}
          <Button
            onClick={handleConfirm}
            disabled={items.length === 0}
            className="gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-300"
          >
            <Check className="w-5 h-5" />
            Confirm List
          </Button>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingId ? "Edit Item" : "Add New Item"}
                </h2>
                <button
                  onClick={handleCloseForm}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

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
                    className="border-slate-300 min-h-24"
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-end">
                <Button
                  onClick={handleCloseForm}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitForm}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {editingId ? "Update Item" : "Add Item"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
