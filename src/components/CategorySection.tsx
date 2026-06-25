"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Premium Shirts",
    description: "Formal, casual & party wear shirts",
    link: "/shirts",
    gradient: "from-[#1E3A5F] to-[#2A4F7F]",
    count: "24+ Designs",
  },
  {
    name: "Trendy Trousers",
    description: "Chinos, formal & casual trousers",
    link: "/trousers",
    gradient: "from-[#162D4A] to-[#1E3A5F]",
    count: "18+ Designs",
  },
];

export default function CategorySection() {
  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-[#1E3A5F] font-semibold text-sm tracking-[0.2em] uppercase">
            Collections
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            Shop by Category
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Explore our curated collections of premium shirts and trousers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={cat.link}
                className={`block relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.gradient} p-8 sm:p-12 group cursor-pointer`}
              >
                <div className="relative z-10">
                  <span className="text-white/60 text-sm font-medium">
                    {cat.count}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-3">
                    {cat.name}
                  </h3>
                  <p className="text-white/70 mb-6 max-w-xs">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all duration-300">
                    Shop Now <ArrowRight size={18} />
                  </span>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
