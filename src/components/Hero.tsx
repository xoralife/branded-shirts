"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    title: "Premium Collection",
    subtitle: "Shirts & Trousers",
    description: "Elevate your style with our premium branded collection",
    cta: "Shop Now",
    link: "/shirts",
    gradient: "from-[#1E3A5F] via-[#1E3A5F] to-[#2A4F7F]",
  },
  {
    title: "New Arrivals",
    subtitle: "Summer Collection 2026",
    description: "Discover the latest trends in men's fashion",
    cta: "Explore",
    link: "/trousers",
    gradient: "from-[#1E3A5F] via-[#162D4A] to-[#1E3A5F]",
  },
  {
    title: "Premium Quality",
    subtitle: "Crafted for Perfection",
    description: "Experience unmatched comfort and style",
    cta: "View Collection",
    link: "#categories",
    gradient: "from-[#0F2440] via-[#1E3A5F] to-[#1E3A5F]",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[85vh] min-h-[500px] max-h-[800px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[current].gradient}`}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/10" />

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl"
          >
            <span className="inline-block text-white/80 text-sm font-medium tracking-[0.2em] uppercase mb-4">
              {slides[current].subtitle}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {slides[current].title}
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-lg">
              {slides[current].description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={slides[current].link}
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1E3A5F] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {slides[current].cta}
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
