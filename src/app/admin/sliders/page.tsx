"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, Eye, EyeOff, Upload, X, ImageIcon } from "lucide-react";
import { useToast } from "@/components/Toast";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  link: string;
  image: string | null;
  gradient: string;
  active: boolean;
}

export default function SlidersPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    cta: "Shop Now",
    link: "/shirts",
    image: null as string | null,
  });

  useEffect(() => {
    fetch("/api/slides").then((r) => r.json()).then(setSlides);
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file", "error");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (res.ok) {
      setForm({ ...form, image: data.url });
      showToast("Image uploaded", "success");
    } else {
      showToast("Upload failed", "error");
    }
    setUploading(false);
  };

  const handleAdd = async () => {
    if (!form.title.trim()) return;

    const res = await fetch("/api/slides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        subtitle: form.subtitle || "New Slide",
        description: form.description || "",
        cta: form.cta,
        link: form.link,
        image: form.image,
        gradient: "from-[#1E3A5F] via-[#1E3A5F] to-[#2A4F7F]",
        active: true,
      }),
    });

    if (res.ok) {
      const slide = await res.json();
      setSlides([...slides, slide]);
      setForm({ title: "", subtitle: "", description: "", cta: "Shop Now", link: "/shirts", image: null });
      setShowForm(false);
      showToast("Slide added", "success");
    }
  };

  const toggleActive = async (id: number) => {
    const slide = slides.find((s) => s.id === id);
    if (!slide) return;
    const res = await fetch(`/api/slides/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !slide.active }),
    });
    if (res.ok) {
      setSlides(slides.map((s) => s.id === id ? { ...s, active: !s.active } : s));
      showToast("Slide updated", "success");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this slide?")) return;
    const res = await fetch(`/api/slides/${id}`, { method: "DELETE" });
    if (res.ok) {
      setSlides(slides.filter((s) => s.id !== id));
      showToast("Slide deleted", "success");
    }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hero Slides</h1>
          <p className="text-gray-500 mt-1">Manage homepage banner slides with images</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 bg-[#1E3A5F] text-white text-sm font-semibold rounded-xl hover:bg-[#162D4A] transition-colors flex items-center gap-2">
          <Plus size={18} /> {showForm ? "Cancel" : "Add Slide"}
        </button>
      </motion.div>

      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          className="bg-white rounded-xl border border-gray-100 p-6 mb-6 space-y-4 overflow-hidden">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20" placeholder="Premium Collection" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Subtitle</label>
              <input type="text" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20" placeholder="Shirts & Trousers" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20" placeholder="Elevate your style with our premium collection" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">CTA Text</label>
              <input type="text" value={form.cta} onChange={(e) => setForm({ ...form, cta: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Link</label>
              <input type="text" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
              {form.image ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200 mb-3">
                  <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                  <button onClick={() => setForm({ ...form, image: null })}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#1E3A5F]/40 hover:bg-gray-50 transition-colors"
                >
                  <Upload size={24} className="text-gray-300 mb-2" />
                  <p className="text-sm text-gray-400">Click to upload image</p>
                  <p className="text-xs text-gray-300 mt-1">PNG, JPG, WebP (max 5MB)</p>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              {uploading && <p className="text-xs text-[#1E3A5F] mt-2">Uploading...</p>}
            </div>
          </div>
          <button onClick={handleAdd} disabled={!form.title.trim()}
            className="w-full py-3 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#162D4A] transition-colors disabled:opacity-50">
            Add Slide
          </button>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
        {slides.map((slide, i) => (
          <motion.div key={slide.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-48 h-32 sm:h-auto bg-gray-100 flex-shrink-0 overflow-hidden">
                {slide.image ? (
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center`}>
                    <ImageIcon size={32} className="text-white/40" />
                  </div>
                )}
              </div>
              <div className="flex-1 p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-2 h-full min-h-[40px] rounded-full mt-1 ${slide.active ? "bg-green-400" : "bg-gray-300"}`} />
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{slide.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{slide.subtitle}</p>
                    {slide.image && <p className="text-xs text-green-600 mt-1">✓ Image uploaded</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleActive(slide.id)}
                    className={`p-2 rounded-lg transition-colors ${slide.active ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"}`}>
                    {slide.active ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button onClick={() => handleDelete(slide.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
