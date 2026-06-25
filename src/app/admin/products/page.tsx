"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/Toast";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  badge: string | null;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Product deleted successfully", "success");
    } else {
      showToast("Failed to delete product", "error");
    }
  };

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">
            Manage your product catalog ({products.length} products)
          </p>
        </motion.div>
        <Link
          href="/admin/products/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white text-sm font-semibold rounded-xl hover:bg-[#162D4A] transition-colors"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F] w-full"
          />
        </div>
        <div className="flex gap-2">
          {["all", "shirts", "trousers"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                filterCategory === cat
                  ? "bg-[#1E3A5F] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat === "all" ? "All" : cat === "shirts" ? "Shirts" : "Trousers"}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">Product</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">Price</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">Badge</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    No products found
                  </td>
                </tr>
              ) : (
                filtered.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm flex-shrink-0">
                          {p.category === "shirts" ? "👔" : "👖"}
                        </div>
                        <span className="font-medium text-gray-900 whitespace-nowrap">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="capitalize text-gray-600 whitespace-nowrap">{p.category}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#1E3A5F] whitespace-nowrap">
                      Rs.{p.price.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      {p.badge ? (
                        <span
                          className={`px-2 py-0.5 text-xs font-bold rounded-full whitespace-nowrap ${
                            p.badge === "New"
                              ? "bg-[#1E3A5F] text-white"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {p.badge}
                        </span>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => router.push(`/admin/products/${p.id}/edit`)}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#1E3A5F] transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
