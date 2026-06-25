"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import StarRating from "./StarRating";

interface FeedbackItem {
  id: number;
  productId: number;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
  approved: boolean;
}

interface Props {
  productId: number;
  refreshKey: number;
}

export default function FeedbackList({ productId, refreshKey }: Props) {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/feedback?productId=${productId}`)
      .then((r) => r.json())
      .then((data: FeedbackItem[]) => {
        setFeedback(data.filter((f) => f.approved));
        setLoading(false);
      });
  }, [productId, refreshKey]);

  if (loading) return <div className="text-sm text-gray-400 py-4">Loading reviews...</div>;

  if (feedback.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
        <p className="text-sm">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  const avg = Math.round((feedback.reduce((s, f) => s + f.rating, 0) / feedback.length) * 10) / 10;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-bold text-gray-900">{avg}</span>
        <div>
          <StarRating rating={Math.round(avg)} />
          <p className="text-xs text-gray-400 mt-0.5">{feedback.length} review{feedback.length > 1 ? "s" : ""}</p>
        </div>
      </div>
      {feedback.map((fb, i) => (
        <motion.div key={fb.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
          className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center text-xs font-bold text-[#1E3A5F]">
                {fb.customerName.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-sm text-gray-900">{fb.customerName}</span>
            </div>
            <span className="text-xs text-gray-400">{fb.createdAt}</span>
          </div>
          <StarRating rating={fb.rating} size={14} />
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">{fb.comment}</p>
        </motion.div>
      ))}
    </div>
  );
}
