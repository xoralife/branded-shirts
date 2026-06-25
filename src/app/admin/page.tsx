"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Shirt, ShoppingBag, IndianRupee, Clock, Truck, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orderStats, setOrderStats] = useState({
    total: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, revenue: 0,
  });

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: Product[]) => setProducts(data));

    fetch("/api/orders")
      .then((r) => r.json())
      .then((orders) => {
        setOrderStats({
          total: orders.length,
          processing: orders.filter((o: { status: string }) => o.status === "Processing").length,
          shipped: orders.filter((o: { status: string }) => o.status === "Shipped").length,
          delivered: orders.filter((o: { status: string }) => o.status === "Delivered").length,
          cancelled: orders.filter((o: { status: string }) => o.status === "Cancelled").length,
          revenue: orders
            .filter((o: { status: string }) => o.status === "Delivered")
            .reduce((sum: number, o: { total: number }) => sum + o.total, 0),
        });
      });
  }, []);

  const productCards = [
    { label: "Total Products", value: products.length, icon: Package, color: "bg-blue-500", bg: "bg-blue-50" },
    { label: "Shirts", value: products.filter((p) => p.category === "shirts").length, icon: Shirt, color: "bg-[#1E3A5F]", bg: "bg-[#E8F4FD]" },
    { label: "Trousers", value: products.filter((p) => p.category === "trousers").length, icon: ShoppingBag, color: "bg-green-500", bg: "bg-green-50" },
    { label: "Total Value", value: `Rs.${(products.reduce((s, p) => s + p.price, 0)).toLocaleString()}`, icon: IndianRupee, color: "bg-purple-500", bg: "bg-purple-50" },
  ];

  const orderCards = [
    { label: "Total Orders", value: orderStats.total, icon: Package, color: "bg-gray-600" },
    { label: "Processing", value: orderStats.processing, icon: Clock, color: "bg-yellow-500" },
    { label: "Shipped", value: orderStats.shipped, icon: Truck, color: "bg-blue-500" },
    { label: "Delivered", value: orderStats.delivered, icon: CheckCircle, color: "bg-green-500" },
    { label: "Cancelled", value: orderStats.cancelled, icon: XCircle, color: "bg-red-500" },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1 mb-8">Welcome to the admin panel</p>
      </motion.div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">Products Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {productCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${card.bg} rounded-xl p-4 sm:p-6`}
            >
              <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
                <Icon size={20} className="text-white" />
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{card.label}</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{card.value}</p>
            </motion.div>
          );
        })}
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">Orders Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
        {orderCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="bg-white rounded-xl border border-gray-100 p-4 text-center"
            >
              <div className={`w-8 h-8 mx-auto mb-2 rounded-lg ${card.color} flex items-center justify-center`}>
                <Icon size={16} className="text-white" />
              </div>
              <p className="text-lg font-bold text-gray-900">{card.value}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">{card.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Products</h2>
            <Link href="/admin/products" className="text-xs text-[#1E3A5F] hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm">
                    {p.category === "shirts" ? "👔" : "👖"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{p.category}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[#1E3A5F]">Rs.{p.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl border border-gray-100 p-6"
        >
          <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/products/add" className="p-4 rounded-xl border border-gray-100 hover:border-[#1E3A5F]/30 hover:bg-[#E8F4FD] transition-all text-center">
              <p className="text-2xl mb-1">➕</p>
              <p className="text-sm font-medium text-gray-900">Add Product</p>
            </Link>
            <Link href="/admin/products" className="p-4 rounded-xl border border-gray-100 hover:border-[#1E3A5F]/30 hover:bg-[#E8F4FD] transition-all text-center">
              <p className="text-2xl mb-1">📦</p>
              <p className="text-sm font-medium text-gray-900">Products</p>
            </Link>
            <Link href="/admin/orders" className="p-4 rounded-xl border border-gray-100 hover:border-[#1E3A5F]/30 hover:bg-[#E8F4FD] transition-all text-center">
              <p className="text-2xl mb-1">📋</p>
              <p className="text-sm font-medium text-gray-900">Orders</p>
            </Link>
            <Link href="/" className="p-4 rounded-xl border border-gray-100 hover:border-[#1E3A5F]/30 hover:bg-[#E8F4FD] transition-all text-center">
              <p className="text-2xl mb-1">🏪</p>
              <p className="text-sm font-medium text-gray-900">View Store</p>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
