"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, CheckCircle } from "lucide-react";
import StarRating from "./StarRating";

interface Props {
  productId: number;
  onSubmitted: () => void;
}

export default function FeedbackForm({ productId, onSubmitted }: Props) {
  const [form, setForm] = useState({ customerName: "", rating: 5, comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName.trim() || !form.comment.trim()) return;
    setSending(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, productId }),
      });
      setSubmitted(true);
      setForm({ customerName: "", rating: 5, comment: "" });
      onSubmitted();
    } catch {}
    setSending(false);
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 rounded-xl p-4 flex items-center gap-3 text-sm text-green-700">
        <CheckCircle size={18} /> Thank you! Your review will be visible after approval.
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
      <h4 className="font-semibold text-gray-900 flex items-center gap-2"><Star size={16} /> Write a Review</h4>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Your Name *</label>
          <input type="text" required value={form.customerName}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Rating *</label>
          <div className="h-[42px] flex items-center">
            <StarRating rating={form.rating} size={24} interactive onChange={(r) => setForm({ ...form, rating: r })} />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Review *</label>
        <textarea required rows={3} value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 resize-none" placeholder="Share your experience..." />
      </div>
      <button type="submit" disabled={sending}
        className="px-6 py-2.5 bg-[#1E3A5F] text-white text-sm font-semibold rounded-xl hover:bg-[#162D4A] transition-colors flex items-center gap-2 disabled:opacity-50">
        <Send size={15} /> {sending ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
