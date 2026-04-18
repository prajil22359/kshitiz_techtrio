"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, ArrowLeft, Check, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";

type RequestItem = {
  id: string;
  name: string;
  quantity: number;
  quality: string;
  priceRangeMin: number;
  priceRangeMax: number;
  comment: string;
};

type RequestRow = {
  id: string;
  request_code: string;
  title: string;
  item_count: number;
  min_budget: number | null;
  max_budget: number | null;
  status: string;
  stage: string;
};

export default function TablePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const requestId = searchParams.get("requestId");
  const requestTitle = searchParams.get("title")?.trim() || "Untitled request";

  const [items, setItems] = useState<RequestItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(Boolean(requestId));
  const [existingRequest, setExistingRequest] = useState<RequestRow | null>(null);

  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [deleteItemName, setDeleteItemName] = useState<string>("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    quality: "",
    priceRangeMin: "",
    priceRangeMax: "",
    comment: "",
  });

  useEffect(() => {
    const loadExistingRequest = async () => {
      if (!requestId) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data: requestData, error: requestError } = await supabase
        .from("requests")
        .select("id, request_code, title, item_count, min_budget, max_budget, status, stage")
        .eq("id", requestId)
        .single();

      if (requestError) {
        console.error("Failed to load request:", requestError);
        setLoading(false);
        return;
      }

      const { data: itemsData, error: itemsError } = await supabase
        .from("request_items")
        .select("id, item_name, quantity, quality, min_price, max_price, notes")
        .eq("request_id", requestId)
        .order("created_at", { ascending: true });

      if (itemsError) {
        console.error("Failed to load request items:", itemsError);
      }

      setExistingRequest(requestData as RequestRow);
      setItems(
        (itemsData ?? []).map((row) => ({
          id: row.id,
          name: row.item_name,
          quantity: row.quantity,
          quality: row.quality ?? "",
          priceRangeMin: Number(row.min_price ?? 0),
          priceRangeMax: Number(row.max_price ?? 0),
          comment: row.notes ?? "",
        }))
      );

      setLoading(false);
    };

    loadExistingRequest();
  }, [requestId]);

  const handleOpenForm = (item?: RequestItem) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        name: item.name,
        quantity: item.quantity.toString(),
        quality: item.quality,
        priceRangeMin: item.priceRangeMin.toString(),
        priceRangeMax: item.priceRangeMax.toString(),
        comment: item.comment,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        quantity: "",
        quality: "",
        priceRangeMin: "",
        priceRangeMax: "",
        comment: "",
      });
    }
    setIsOpen(true);
  };

  const handleSaveItem = () => {
    if (!formData.name.trim()) {
      alert("Please enter an item name");
      return;
    }

    if (!formData.quantity.trim()) {
      alert("Please enter a quantity");
      return;
    }

    if (!formData.priceRangeMin.trim() || !formData.priceRangeMax.trim()) {
      alert("Please enter both price range values");
      return;
    }

    const quantity = Number(formData.quantity);
    const priceRangeMin = Number(formData.priceRangeMin);
    const priceRangeMax = Number(formData.priceRangeMax);

    if (
      Number.isNaN(quantity) ||
      Number.isNaN(priceRangeMin) ||
      Number.isNaN(priceRangeMax)
    ) {
      alert("Quantity and price range must contain valid numbers");
      return;
    }

    if (priceRangeMin > priceRangeMax) {
      alert("Minimum price cannot be greater than maximum price");
      return;
    }

    if (editingId) {
      setItems(
        items.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: formData.name,
                quantity,
                quality: formData.quality,
                priceRangeMin,
                priceRangeMax,
                comment: formData.comment,
              }
            : item
        )
      );
    } else {
      const newItem: RequestItem = {
        id: Date.now().toString(),
        name: formData.name,
        quantity,
        quality: formData.quality,
        priceRangeMin,
        priceRangeMax,
        comment: formData.comment,
      };
      setItems([...items, newItem]);
    }

    setIsOpen(false);
    setEditingId(null);
    setFormData({
      name: "",
      quantity: "",
      quality: "",
      priceRangeMin: "",
      priceRangeMax: "",
      comment: "",
    });
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteItemId(id);
    setDeleteItemName(name);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!deleteItemId) return;

    setItems(items.filter((item) => item.id !== deleteItemId));

    setDeleteItemId(null);
    setDeleteItemName("");
    setIsDeleteOpen(false);
  };

  const handleConfirmList = async () => {
    if (items.length === 0) {
      alert("Please add at least one item");
      return;
    }

    try {
      const title = requestId
        ? existingRequest?.title || requestTitle
        : requestTitle;

      const minBudget =
        items.length > 0
          ? Math.min(...items.map((item) => item.priceRangeMin))
          : null;

      const maxBudget =
        items.length > 0
          ? Math.max(...items.map((item) => item.priceRangeMax))
          : null;

      if (requestId && existingRequest) {
        const { error: updateError } = await supabase
          .from("requests")
          .update({
            title,
            item_count: items.length,
            min_budget: minBudget,
            max_budget: maxBudget,
          })
          .eq("id", requestId);

        if (updateError) throw updateError;

        const { error: deleteError } = await supabase
          .from("request_items")
          .delete()
          .eq("request_id", requestId);

        if (deleteError) throw deleteError;

        const itemsToInsert = items.map((item) => ({
          request_id: requestId,
          item_name: item.name,
          quantity: item.quantity,
          quality: item.quality,
          min_price: item.priceRangeMin,
          max_price: item.priceRangeMax,
          notes: item.comment,
        }));

        const { error: insertError } = await supabase
          .from("request_items")
          .insert(itemsToInsert);

        if (insertError) throw insertError;

        router.push(`/client/requests/timeline?requestId=${requestId}`);
        return;
      }

      const requestCode = `#${Math.floor(1000 + Math.random() * 9000)}`;

      const { data: requestData, error: requestError } = await supabase
        .from("requests")
        .insert([
          {
            request_code: requestCode,
            client_id: "00000000-0000-0000-0000-000000000001",
            title,
            item_count: items.length,
            min_budget: minBudget,
            max_budget: maxBudget,
            status: "pending_review",
            stage: "request_raised",
          },
        ])
        .select()
        .single();

      if (requestError) throw requestError;

      const createdRequestId = requestData.id;

      const itemsToInsert = items.map((item) => ({
        request_id: createdRequestId,
        item_name: item.name,
        quantity: item.quantity,
        quality: item.quality,
        min_price: item.priceRangeMin,
        max_price: item.priceRangeMax,
        notes: item.comment,
      }));

      const { error: itemsError } = await supabase
        .from("request_items")
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      const { error: statusError } = await supabase
        .from("request_status_history")
        .insert([
          {
            request_id: createdRequestId,
            status: "request_raised",
            message: "Request Raised",
          },
        ]);

      if (statusError) throw statusError;

      router.push(`/client/requests/timeline?requestId=${createdRequestId}`);
    } catch (err) {
      console.error("Failed to save request:", err);
      alert("Error saving request");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-7xl mx-auto">Loading request...</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link
              href={
                requestId
                  ? `/client/requests/timeline?requestId=${requestId}`
                  : `/client/requests/options?title=${encodeURIComponent(requestTitle)}`
              }
            >
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back to Options
              </button>
            </Link>

            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {requestId ? "Edit Request Items" : "Your Items List"}
            </h1>
            <p className="text-lg text-slate-600">
              {requestId
                ? "Edit, delete, or add items in this existing request."
                : "Add the items you need to purchase"}
            </p>
          </div>

          {items.length > 0 ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                        Quality
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                        Price Range
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                        Comment
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {item.quality}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {item.priceRangeMin} - {item.priceRangeMax}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {item.comment}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenForm(item)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(item.id, item.name)}
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
            <div className="bg-white rounded-lg shadow-lg p-12 mb-8 text-center">
              <p className="text-slate-600 mb-6">
                No items added yet. Click &quot;Add Item&quot; to get started.
              </p>
            </div>
          )}

          <div className="flex gap-4 mb-8">
            <Button onClick={() => handleOpenForm()} variant="outline" className="gap-2">
              <Plus className="w-5 h-5" />
              Add Item
            </Button>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleConfirmList}
              disabled={items.length === 0}
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-300"
            >
              <Check className="w-5 h-5" />
              {requestId ? "Save Changes" : "Confirm List"}
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="rounded-none p-0 overflow-hidden">
          <DialogHeader className="bg-slate-900 p-6 text-white">
            <DialogTitle className="text-2xl font-bold text-white">
              {editingId ? "Edit Item" : "Add New Item"}
            </DialogTitle>
            <p className="text-slate-300 text-sm mt-1">
              {editingId
                ? "Update the item details below"
                : "Fill in the item details to add it to your list"}
            </p>
          </DialogHeader>

          <div className="p-6 space-y-6">
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
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                placeholder="e.g., 10"
                className="border-slate-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Quality
              </label>
              <select
                value={formData.quality}
                onChange={(e) =>
                  setFormData({ ...formData, quality: e.target.value })
                }
                className="h-10 w-full border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-slate-400"
              >
                <option value="">Select quality</option>
                <option value="Premium">Premium</option>
                <option value="Standard">Standard</option>
                <option value="Budget">Budget</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Minimum Price
                </label>
                <Input
                  type="number"
                  value={formData.priceRangeMin}
                  onChange={(e) =>
                    setFormData({ ...formData, priceRangeMin: e.target.value })
                  }
                  placeholder="e.g., 100"
                  className="border-slate-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Maximum Price
                </label>
                <Input
                  type="number"
                  value={formData.priceRangeMax}
                  onChange={(e) =>
                    setFormData({ ...formData, priceRangeMax: e.target.value })
                  }
                  placeholder="e.g., 200"
                  className="border-slate-300"
                />
              </div>
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
                className="rounded-sm border-slate-300 min-h-24"
              />
            </div>

            <Button
              onClick={handleSaveItem}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11"
            >
              {editingId ? "Update Item" : "Add Item"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-red-600">
              Delete &quot;{deleteItemName}&quot;?
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>

            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}