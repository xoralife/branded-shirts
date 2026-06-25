"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
    isOpen,
    setIsOpen,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#1E3A5F]" />
                <span className="font-semibold text-gray-900">
                  Cart ({totalItems})
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4">
                <ShoppingBag size={48} strokeWidth={1} />
                <p className="text-sm">Your cart is empty</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-[#1E3A5F] text-white text-sm font-medium rounded-lg hover:bg-[#162D4A] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize}`}
                      className="flex gap-4 bg-gray-50 rounded-xl p-3"
                    >
                      <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {item.image && (item.image.startsWith("/upload") || item.image.startsWith("/uploads")) ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl">{item.category === "shirts" ? "👔" : "👖"}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Size: {item.selectedSize}
                        </p>
                        <p className="text-sm font-bold text-[#1E3A5F] mt-1">
                          Rs.{item.price.toLocaleString()}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.selectedSize,
                                  item.quantity - 1
                                )
                              }
                              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-medium w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.selectedSize,
                                  item.quantity + 1
                                )
                              }
                              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              removeItem(item.id, item.selectedSize)
                            }
                            className="text-xs text-red-400 hover:text-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold text-lg text-[#1E3A5F]">
                      Rs.{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-3 bg-[#1E3A5F] text-white text-center font-semibold rounded-xl hover:bg-[#162D4A] transition-colors"
                  >
                    Checkout
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
