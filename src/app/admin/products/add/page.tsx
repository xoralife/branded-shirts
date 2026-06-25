"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/Toast";

const defaultSizes = ["S", "M", "L", "XL", "XXL"];

export default function AddProduct() {
  const router = useRouter();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    category: "shirts" as "shirts" | "trousers",
    price: "",
    originalPrice: "",
    description: "",
    sizes: ["M", "L", "XL"],
    badge: "",
    images: [] as string[],
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSize = (size: string) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) {
        showToast(`${file.name} is not an image`, "error");
        continue;
      }
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setForm((prev) => ({ ...prev, images: [...prev.images, data.url] }));
      } else {
        showToast(`Failed to upload ${file.name}`, "error");
      }
    }
    setUploading(false);
    showToast("Images uploaded", "success");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const body = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      description: form.description,
      image: form.images[0] || `/${form.category === "shirts" ? "shirt" : "trouser"}${Date.now()}.jpg`,
      images: form.images.length > 0 ? form.images : undefined,
      sizes: form.sizes,
      badge: form.badge || null,
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      showToast("Product added", "success");
      router.push("/admin/products");
    } else {
      showToast("Failed to add product", "error");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Link href="/admin/products" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#1E3A5F] transition-colors mb-4">
          <ArrowLeft size={16} /> Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
      </motion.div>

      <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F]"
              placeholder="Classic Navy Fit Shirt" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as "shirts" | "trousers" })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F]">
              <option value="shirts">Shirts</option>
              <option value="trousers">Trousers</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (PKR)</label>
            <input type="number" required min={0} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F]" placeholder="2499" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Original Price (optional)</label>
            <input type="number" min={0} value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F]" placeholder="3299" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F] resize-none"
            placeholder="Product description..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Images (max 5)</label>
          {form.images.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {form.images.map((img, i) => (
                <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setForm({ ...form, images: form.images.filter((_, j) => j !== i) })}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 text-xs">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#1E3A5F]/40 hover:bg-gray-50 transition-colors">
            <Upload size={24} className="text-gray-300 mb-2" />
            <p className="text-sm text-gray-400">Click to upload product images</p>
            <p className="text-xs text-gray-300 mt-1">PNG, JPG, WebP (max 5MB each, select multiple)</p>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={uploading} />
          {uploading && <p className="text-xs text-[#1E3A5F] mt-2">Uploading...</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Badge (optional)</label>
          <select value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F]">
            <option value="">None</option>
            <option value="New">New</option>
            <option value="Sale">Sale</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
          <div className="flex flex-wrap gap-2">
            {defaultSizes.map((size) => (
              <button key={size} type="button" onClick={() => toggleSize(size)}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${form.sizes.includes(size) ? "border-[#1E3A5F] bg-[#1E3A5F] text-white" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                {size}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" disabled={saving || uploading}
          className="w-full py-3 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#162D4A] transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
          <Save size={18} />
          {saving ? "Saving..." : "Save Product"}
        </button>
      </motion.form>
    </div>
  );
}
