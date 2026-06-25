"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/Toast";

const initialSlides = [
  { id: 1, title: "Premium Collection", subtitle: "Shirts & Trousers", active: true },
  { id: 2, title: "New Arrivals", subtitle: "Summer Collection 2026", active: true },
  { id: 3, title: "Premium Quality", subtitle: "Crafted for Perfection", active: true },
];

export default function SlidersPage() {
  const [slides, setSlides] = useState(initialSlides);
  const [newTitle, setNewTitle] = useState("");
  const { showToast } = useToast();

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    setSlides([...slides, { id: Date.now(), title: newTitle.trim(), subtitle: "New Slide", active: true }]);
    setNewTitle("");
    showToast("Slide added", "success");
  };

  const toggleActive = (id: number) => {
    setSlides(slides.map((s) => s.id === id ? { ...s, active: !s.active } : s));
    showToast("Slide status updated", "success");
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this slide?")) return;
    setSlides(slides.filter((s) => s.id !== id));
    showToast("Slide deleted", "success");
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Hero Slides</h1>
        <p className="text-gray-500 mt-1">Manage homepage banner slides</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex gap-3 mb-6">
        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="New slide title"
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F]"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()} />
        <button onClick={handleAdd} className="px-4 py-2.5 bg-[#1E3A5F] text-white text-sm font-semibold rounded-xl hover:bg-[#162D4A] transition-colors flex items-center gap-2 whitespace-nowrap">
          <Plus size={18} /> Add Slide
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-3">
        {slides.map((slide, i) => (
          <motion.div key={slide.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-2 h-10 rounded-full ${slide.active ? "bg-green-400" : "bg-gray-300"}`} />
              <div>
                <p className="font-semibold text-gray-900">{slide.title}</p>
                <p className="text-xs text-gray-400">{slide.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleActive(slide.id)}
                className={`p-2 rounded-lg transition-colors ${slide.active ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"}`}>
                {slide.active ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              <button onClick={() => handleDelete(slide.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
