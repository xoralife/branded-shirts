"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, X, CheckCircle } from "lucide-react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const [paying, setPaying] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"jazzcash" | "easypaisa" | null>(null);
  const [paymentNumber, setPaymentNumber] = useState("");
  const [paid, setPaid] = useState(false);

  const handlePay = async (method: "jazzcash" | "easypaisa") => {
    setPaying(true);
    setPaymentMethod(method);

    const settingsRes = await fetch("/api/settings");
    const settings = await settingsRes.json();
    const number = method === "jazzcash" ? settings.jazzcashNumber : settings.easypaisaNumber;
    setPaymentNumber(number || "Not configured");
    setPaying(false);
  };

  const confirmPayment = async () => {
    const order = {
      customer: "Guest",
      email: "guest@example.com",
      items: items.map((i) => ({
        name: i.name,
        qty: i.quantity,
        price: i.price,
      })),
      total: totalPrice,
      status: "Processing",
      paymentMethod,
    };

    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    setPaid(true);
    clearCart();
  };

  if (paid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
          <p className="text-gray-500 mb-6">Thank you for your purchase. We'll process your order soon.</p>
          <Link href="/" className="inline-flex px-6 py-3 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#162D4A] transition-colors">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some products to get started</p>
          <Link href="/" className="inline-flex px-6 py-3 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#162D4A] transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Breadcrumb items={[{ label: "Checkout" }]} />
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-500 mt-1">Review your order and pay</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div key={`${item.id}-${item.selectedSize}`} layout
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl p-4 flex gap-4 border border-gray-100">
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {item.image && (item.image.startsWith("/upload") || item.image.startsWith("/uploads")) ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl">{item.category === "shirts" ? "👔" : "👖"}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-400">Size: {item.selectedSize}</p>
                  <p className="text-lg font-bold text-[#1E3A5F] mt-1">Rs.{item.price.toLocaleString()}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id, item.selectedSize)} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">Rs.{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
            <button onClick={clearCart} className="text-sm text-gray-400 hover:text-red-500 transition-colors">Clear Cart</button>
          </div>

          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-100 sticky top-28">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">Rs.{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-lg text-[#1E3A5F]">Rs.{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button onClick={() => handlePay("jazzcash")}
                  className="w-full py-3 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#162D4A] transition-colors disabled:opacity-50"
                  disabled={paying}>
                  {paying ? "Loading..." : "Pay with JazzCash"}
                </button>
                <button onClick={() => handlePay("easypaisa")}
                  className="w-full py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
                  disabled={paying}>
                  {paying ? "Loading..." : "Pay with EasyPaisa"}
                </button>
                <p className="text-[10px] text-gray-400 text-center">Secure payment powered by JazzCash & EasyPaisa</p>
              </div>

              <div className="mt-6 flex justify-center gap-3">
                <div className="h-8 px-3 bg-gray-100 rounded flex items-center text-xs font-semibold text-gray-600">JazzCash</div>
                <div className="h-8 px-3 bg-red-50 rounded flex items-center text-xs font-semibold text-red-600">EasyPaisa</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {paymentMethod && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setPaymentMethod(null)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8">
              <button onClick={() => setPaymentMethod(null)} className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded transition-colors">
                <X size={20} />
              </button>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Your Payment</h3>
              <p className="text-gray-500 text-sm mb-6">
                Send <strong className="text-[#1E3A5F]">Rs.{totalPrice.toLocaleString()}</strong> to the following {paymentMethod === "jazzcash" ? "JazzCash" : "EasyPaisa"} account:
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-center mb-6">
                <p className="text-xs text-gray-400 mb-1">Send to this number</p>
                <p className="text-2xl font-bold text-[#1E3A5F]">{paymentNumber}</p>
              </div>
              <p className="text-xs text-gray-400 mb-6 text-center">After sending payment, click "I've Paid" to confirm your order</p>
              <button onClick={confirmPayment}
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <CheckCircle size={18} /> I've Paid
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
