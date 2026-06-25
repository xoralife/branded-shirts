"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  badge: string | null;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
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
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Product
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Category
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Price
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Badge
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm">
                        {p.category === "shirts" ? "👔" : "👖"}
                      </div>
                      <span className="font-medium text-gray-900">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="capitalize text-gray-600">{p.category}</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#1E3A5F]">
                    Rs.{p.price.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    {p.badge ? (
                      <span
                        className={`px-2 py-0.5 text-xs font-bold rounded-full ${
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
                        onClick={() =>
                          router.push(`/admin/products/${p.id}/edit`)
                        }
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
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
