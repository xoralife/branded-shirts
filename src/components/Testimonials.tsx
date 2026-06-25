"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Khan",
    role: "Verified Buyer",
    text: "Excellent quality shirts! The fabric is premium and the fit is perfect. Will definitely order again.",
    rating: 5,
  },
  {
    name: "Sara Ali",
    role: "Verified Buyer",
    text: "Bought trousers for my husband. Great quality and fast delivery. Highly recommended!",
    rating: 5,
  },
  {
    name: "Usman Raza",
    role: "Verified Buyer",
    text: "The formal shirt collection is amazing. Perfect for office wear. Great value for money.",
    rating: 4,
  },
  {
    name: "Zainab Fatima",
    role: "Verified Buyer",
    text: "Love the fabric quality and stitching. My go-to store for branded clothing now!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#1E3A5F] font-semibold text-sm tracking-[0.2em] uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className={j < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-400">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
