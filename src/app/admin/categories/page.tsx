"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/Toast";

const initialCategories = [
  { id: 1, name: "Formal Shirts", slug: "formal-shirts", count: 3 },
  { id: 2, name: "Casual Shirts", slug: "casual-shirts", count: 1 },
  { id: 3, name: "Formal Trousers", slug: "formal-trousers", count: 2 },
  { id: 4, name: "Casual Trousers", slug: "casual-trousers", count: 2 },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newName, setNewName] = useState("");
  const [editName, setEditName] = useState("");
  const { showToast } = useToast();

  const handleAdd = () => {
    if (!newName.trim()) return;
    const slug = newName.toLowerCase().replace(/\s+/g, "-");
    const newCat = { id: Date.now(), name: newName.trim(), slug, count: 0 };
    setCategories([...categories, newCat]);
    setNewName("");
    showToast("Category added", "success");
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this category?")) return;
    setCategories(categories.filter((c) => c.id !== id));
    showToast("Category deleted", "success");
  };

  const handleSaveEdit = (id: number) => {
    if (!editName.trim()) return;
    setCategories(categories.map((c) => c.id === id ? { ...c, name: editName.trim(), slug: editName.toLowerCase().replace(/\s+/g, "-") } : c));
    setEditingId(null);
    showToast("Category updated", "success");
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <p className="text-gray-500 mt-1">Manage product categories</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex gap-3 mb-6">
        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New category name"
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F]"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()} />
        <button onClick={handleAdd} className="px-4 py-2.5 bg-[#1E3A5F] text-white text-sm font-semibold rounded-xl hover:bg-[#162D4A] transition-colors flex items-center gap-2 whitespace-nowrap">
          <Plus size={18} /> Add
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="hidden sm:block bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Slug</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Products</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, i) => (
                <motion.tr key={cat.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {editingId === cat.id ? (
                      <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}
                        className="px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20"
                        onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(cat.id)} autoFocus />
                    ) : (
                      <span className="font-medium text-gray-900">{cat.name}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-500">{cat.slug}</td>
                  <td className="py-3 px-4 text-gray-500">{cat.count} products</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {editingId === cat.id ? (
                        <>
                          <button onClick={() => handleSaveEdit(cat.id)} className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600">Save</button>
                          <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-200">Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => { setEditingId(cat.id); setEditName(cat.name); }} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#1E3A5F]"><Pencil size={16} /></button>
                          <button onClick={() => handleDelete(cat.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600"><Trash2 size={16} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sm:hidden space-y-3">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-2">
                {editingId === cat.id ? (
                  <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 px-2 py-1 border border-gray-200 rounded text-sm" autoFocus />
                ) : (
                  <span className="font-medium text-gray-900">{cat.name}</span>
                )}
                <div className="flex gap-1">
                  {editingId === cat.id ? (
                    <>
                      <button onClick={() => handleSaveEdit(cat.id)} className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-lg">Save</button>
                      <button onClick={() => setEditingId(null)} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setEditingId(cat.id); setEditName(cat.name); }} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(cat.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-500"><Trash2 size={14} /></button>
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-400">Slug: {cat.slug} | {cat.count} products</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
