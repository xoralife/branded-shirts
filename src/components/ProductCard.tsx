"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Eye, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import QuickView from "./QuickView";

interface ProductCardProps {
  product: {
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
  };
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addItem, setIsOpen } = useCart();
  const { addItem: addWish, removeItem: removeWish, isWishlisted } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const wished = isWishlisted(product.id);

  const toggleWish = () => {
    if (wished) removeWish(product.id);
    else addWish(product);
  };
  const [quickViewProduct, setQuickViewProduct] = useState<typeof product | null>(null);

  const handleAddToCart = () => {
    addItem(product, selectedSize);
    setIsOpen(true);
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
    >
      <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {(product.images?.[0] || product.image)?.startsWith("/upload") ? (
            <img src={product.images?.[0] || product.image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center ${
                product.category === "shirts"
                  ? "bg-gradient-to-br from-blue-50 to-gray-100"
                  : "bg-gradient-to-br from-gray-50 to-gray-200"
              }`}
            >
              <span className="text-6xl font-bold text-[#1E3A5F]/10 select-none">
                {product.category === "shirts" ? "👔" : "👖"}
              </span>
            </div>
          )}
        </div>

        <button onClick={toggleWish}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm">
          <Heart size={15} className={wished ? "fill-red-500 text-red-500" : "text-gray-400"} />
        </button>

        {product.badge && (
          <span
            className={`absolute top-3 left-3 z-10 px-3 py-1 text-xs font-bold rounded-full ${
              product.badge === "New"
                ? "bg-[#1E3A5F] text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {product.badge}
          </span>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

        <button
          onClick={() => setQuickViewProduct(product)}
          className="absolute bottom-3 right-16 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full shadow-md flex items-center justify-center sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-100"
        >
          <Eye size={16} />
        </button>
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full shadow-md flex items-center justify-center sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#1E3A5F] hover:text-white"
        >
          <ShoppingBag size={16} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#1E3A5F]">
            Rs.{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              Rs.{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <div className="flex gap-1 mt-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`text-[10px] px-2 py-1 border rounded font-medium transition-colors ${
                selectedSize === size
                  ? "border-[#1E3A5F] bg-[#1E3A5F] text-white"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      </motion.div>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  );
}
