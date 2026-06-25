"use client";

import { motion } from "framer-motion";
import { Shield, Truck, RefreshCw, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders above Rs.3,000",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "7-day return policy for all products",
  },
  {
    icon: Shield,
    title: "100% Authentic",
    description: "Premium quality branded products",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer support team",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-[#1E3A5F] font-semibold text-sm tracking-[0.2em] uppercase">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-6">
              Crafting Style &{" "}
              <span className="text-[#1E3A5F]">Confidence</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Branded Store, we believe that great style starts with great
              clothing. Our curated collection of premium shirts and trousers is
              designed for the modern man who values quality, comfort, and
              sophistication.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              From formal occasions to casual outings, we offer versatile pieces
              that help you look your best every day. Each product is carefully
              selected to ensure the highest standards of craftsmanship and
              design.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-[#E8F4FD] border-2 border-white flex items-center justify-center text-[#1E3A5F] font-bold text-xs"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">500+</span>{" "}
                Happy Customers
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-[#E8F4FD] to-[#1E3A5F]/10 rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🏷️</div>
                  <p className="text-[#1E3A5F] font-semibold">
                    Premium Brand Store
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#1E3A5F] rounded-2xl flex items-center justify-center shadow-xl hidden sm:flex">
              <div className="text-center text-white">
                <p className="text-2xl font-bold">5+</p>
                <p className="text-[10px] uppercase tracking-wider">Years</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl bg-gray-50 hover:bg-[#E8F4FD] transition-colors duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center">
                <feat.icon size={22} className="text-[#1E3A5F]" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                {feat.title}
              </h3>
              <p className="text-xs text-gray-500">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
