"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Breadcrumb from "@/components/Breadcrumb";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem, setIsOpen } = useCart();

  const moveToCart = (product: typeof items[0]) => {
    addItem(product, product.sizes[1] || product.sizes[0]);
    setIsOpen(true);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
            <Heart size={28} className="text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Save items you love to your wishlist</p>
          <Link href="/" className="inline-flex px-6 py-3 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#162D4A] transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Breadcrumb items={[{ label: "Wishlist" }]} />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-500 mt-1">{items.length} saved items</p>
            </div>
            <button onClick={clearWishlist} className="text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1">
              <Trash2 size={14} /> Clear All
            </button>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden group">
              <Link href={`/${product.category}/${product.id}`} className="block aspect-[4/5] bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden relative">
                {(product.images?.[0] || product.image)?.startsWith("/upload") ? (
                  <img src={product.images?.[0] || product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl text-[#1E3A5F]/10">{product.category === "shirts" ? "👔" : "👖"}</span>
                  </div>
                )}
                <button onClick={(e) => { e.preventDefault(); removeItem(product.id); }}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Trash2 size={14} className="text-gray-400 hover:text-red-500" />
                </button>
              </Link>
              <div className="p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{product.category}</p>
                <Link href={`/${product.category}/${product.id}`} className="font-semibold text-gray-900 text-sm hover:text-[#1E3A5F] transition-colors line-clamp-1">{product.name}</Link>
                <p className="text-lg font-bold text-[#1E3A5F] mt-1">Rs.{product.price.toLocaleString()}</p>
                <button onClick={() => moveToCart(product)}
                  className="mt-3 w-full py-2.5 bg-[#1E3A5F] text-white text-sm font-semibold rounded-xl hover:bg-[#162D4A] transition-colors flex items-center justify-center gap-2">
                  <ShoppingBag size={15} /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
