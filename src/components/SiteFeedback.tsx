"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, CheckCircle, MessageSquare } from "lucide-react";
import StarRating from "./StarRating";

export default function SiteFeedback() {
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
        body: JSON.stringify({ ...form, productId: 0 }),
      });
      setSubmitted(true);
      setForm({ customerName: "", rating: 5, comment: "" });
    } catch {}
    setSending(false);
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center">
              <MessageSquare size={24} className="text-[#1E3A5F]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Share Your Feedback</h2>
            <p className="text-gray-500 text-sm sm:text-base">Help us improve by sharing your experience</p>
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-500 text-sm">Your feedback has been submitted and will be visible after approval.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name *</label>
                  <input type="text" required value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Rating *</label>
                  <div className="h-[42px] flex items-center">
                    <StarRating rating={form.rating} size={28} interactive onChange={(r) => setForm({ ...form, rating: r })} />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Review *</label>
                <textarea required rows={4} value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 resize-none" placeholder="Tell us about your experience..." />
              </div>
              <button type="submit" disabled={sending}
                className="w-full py-3 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#162D4A] transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                <Send size={18} /> {sending ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
