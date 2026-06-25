"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Check, X } from "lucide-react";
import { useToast } from "@/components/Toast";
import StarRating from "@/components/StarRating";

interface Feedback {
  id: number;
  productId: number;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
  approved: boolean;
}

export default function AdminFeedback() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [search, setSearch] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    fetch("/api/feedback").then((r) => r.json()).then(setFeedback);
  }, []);

  const toggleApproval = async (fb: Feedback) => {
    const res = await fetch(`/api/feedback/${fb.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: !fb.approved }),
    });
    if (res.ok) {
      setFeedback(feedback.map((f) => f.id === fb.id ? { ...f, approved: !f.approved } : f));
      showToast(`Review ${fb.approved ? "unapproved" : "approved"}`, "success");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this review?")) return;
    const res = await fetch(`/api/feedback/${id}`, { method: "DELETE" });
    if (res.ok) {
      setFeedback(feedback.filter((f) => f.id !== id));
      showToast("Review deleted", "success");
    }
  };

  const filtered = feedback.filter(
    (f) => f.customerName.toLowerCase().includes(search.toLowerCase()) || f.comment.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
          <p className="text-gray-500 mt-1">{feedback.length} reviews ({feedback.filter((f) => f.approved).length} approved)</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search reviews..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 w-full sm:w-64" />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-100">No reviews found</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((fb, i) => (
              <motion.div key={fb.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center text-xs font-bold text-[#1E3A5F]">
                        {fb.customerName.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">{fb.customerName}</span>
                      <StarRating rating={fb.rating} size={14} />
                      <span className="text-xs text-gray-400">Product #{fb.productId}</span>
                    </div>
                    <p className="text-sm text-gray-600">{fb.comment}</p>
                    <p className="text-xs text-gray-300 mt-2">{fb.createdAt}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => toggleApproval(fb)}
                      className={`p-2 rounded-lg transition-colors ${fb.approved ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"}`}>
                      {fb.approved ? <Check size={18} /> : <X size={18} />}
                    </button>
                    <button onClick={() => handleDelete(fb.id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
