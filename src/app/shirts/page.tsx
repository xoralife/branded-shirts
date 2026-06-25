"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";
import Breadcrumb from "@/components/Breadcrumb";

export default function ShirtsPage() {
  const shirts = products.filter((p) => p.category === "shirts");

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Breadcrumb items={[{ label: "Shirts" }]} />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Premium Shirts
          </h1>
          <p className="text-gray-500 mt-2">
            Explore our collection of {shirts.length} premium shirts
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {shirts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
