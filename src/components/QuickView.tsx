"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  image: string;
  images?: string[];
  description: string;
  sizes: string[];
  badge: string | null;
}

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const { addItem, setIsOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState(product?.sizes[1] || product?.sizes[0] || "");
  const [qvImage, setQvImage] = useState(0);

  if (!product) return null;

  const handleAdd = () => {
    addItem(product, selectedSize);
    setIsOpen(true);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="relative p-6 sm:p-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X size={20} />
            </button>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-blue-50 via-gray-50 to-gray-100 flex items-center justify-center overflow-hidden relative">
                  {(product.images?.[qvImage] || product.image)?.startsWith("/upload") ? (
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={qvImage}
                        src={product.images?.[qvImage] || product.image}
                        alt={product.name}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    </AnimatePresence>
                  ) : (
                    <span className="text-8xl">{product.category === "shirts" ? "👔" : "👖"}</span>
                  )}
                </div>
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {product.images.map((img, i) => (
                      <button key={i} onClick={() => setQvImage(i)}
                        className={`w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${qvImage === i ? "border-[#1E3A5F]" : "border-gray-200 hover:border-gray-300"}`}>
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                {product.badge && (
                  <span
                    className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-3 ${
                      product.badge === "New"
                        ? "bg-[#1E3A5F] text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {product.badge}
                  </span>
                )}
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  {product.category}
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-[#1E3A5F]">
                    Rs.{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      Rs.{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Select Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                          selectedSize === size
                            ? "border-[#1E3A5F] bg-[#1E3A5F] text-white"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleAdd}
                  className="w-full py-3 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#162D4A] transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
