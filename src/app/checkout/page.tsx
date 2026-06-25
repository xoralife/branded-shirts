"use client";

import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Add some products to get started
          </p>
          <Link
            href="/"
            className="inline-flex px-6 py-3 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#162D4A] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Breadcrumb items={[{ label: "Checkout" }]} />
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-500 mt-1">Review your order and pay</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={`${item.id}-${item.selectedSize}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl p-4 flex gap-4 border border-gray-100"
              >
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">
                    {item.category === "shirts" ? "👔" : "👖"}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-400">
                    Size: {item.selectedSize}
                  </p>
                  <p className="text-lg font-bold text-[#1E3A5F] mt-1">
                    Rs.{item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-medium w-6 text-center">
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
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, item.selectedSize)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    Rs.
                    {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-100 sticky top-28"
            >
              <h3 className="font-bold text-lg text-gray-900 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">
                    Rs.{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-lg text-[#1E3A5F]">
                    Rs.{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full py-3 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#162D4A] transition-colors">
                  Pay with JazzCash
                </button>
                <button className="w-full py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors">
                  Pay with EasyPaisa
                </button>
                <p className="text-[10px] text-gray-400 text-center">
                  Secure payment powered by JazzCash & EasyPaisa
                </p>
              </div>

              <div className="mt-6 flex justify-center gap-3">
                <div className="h-8 px-3 bg-gray-100 rounded flex items-center text-xs font-semibold text-gray-600">
                  JazzCash
                </div>
                <div className="h-8 px-3 bg-red-50 rounded flex items-center text-xs font-semibold text-red-600">
                  EasyPaisa
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
