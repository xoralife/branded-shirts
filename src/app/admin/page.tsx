"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Shirt, ShoppingBag, IndianRupee } from "lucide-react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    shirts: 0,
    trousers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: Product[]) => {
        setProducts(data);
        setStats({
          totalProducts: data.length,
          shirts: data.filter((p) => p.category === "shirts").length,
          trousers: data.filter((p) => p.category === "trousers").length,
          totalRevenue: data.reduce((sum, p) => sum + p.price, 0),
        });
      });
  }, []);

  const cards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Shirts",
      value: stats.shirts,
      icon: Shirt,
      color: "bg-[#1E3A5F]",
      bg: "bg-[#E8F4FD]",
    },
    {
      label: "Trousers",
      value: stats.trousers,
      icon: ShoppingBag,
      color: "bg-green-500",
      bg: "bg-green-50",
    },
    {
      label: "Revenue (PKR)",
      value: `Rs.${stats.totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
      color: "bg-purple-500",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1 mb-8">
          Welcome to the admin panel
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${card.bg} rounded-xl p-4 sm:p-6`}
            >
              <div
                className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}
              >
                <Icon size={20} className="text-white" />
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                {card.label}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {card.value}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Products</h2>
            <Link
              href="/admin/products"
              className="text-xs text-[#1E3A5F] hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {products.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm">
                    {p.category === "shirts" ? "👔" : "👖"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-400 capitalize">
                      {p.category}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[#1E3A5F]">
                  Rs.{p.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-100 p-6"
        >
          <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/products/add"
              className="p-4 rounded-xl border border-gray-100 hover:border-[#1E3A5F]/30 hover:bg-[#E8F4FD] transition-all text-center"
            >
              <p className="text-2xl mb-1">➕</p>
              <p className="text-sm font-medium text-gray-900">Add Product</p>
            </Link>
            <Link
              href="/admin/products"
              className="p-4 rounded-xl border border-gray-100 hover:border-[#1E3A5F]/30 hover:bg-[#E8F4FD] transition-all text-center"
            >
              <p className="text-2xl mb-1">📦</p>
              <p className="text-sm font-medium text-gray-900">Manage Stock</p>
            </Link>
            <Link
              href="/admin/orders"
              className="p-4 rounded-xl border border-gray-100 hover:border-[#1E3A5F]/30 hover:bg-[#E8F4FD] transition-all text-center"
            >
              <p className="text-2xl mb-1">📋</p>
              <p className="text-sm font-medium text-gray-900">View Orders</p>
            </Link>
            <Link
              href="/"
              className="p-4 rounded-xl border border-gray-100 hover:border-[#1E3A5F]/30 hover:bg-[#E8F4FD] transition-all text-center"
            >
              <p className="text-2xl mb-1">🏪</p>
              <p className="text-sm font-medium text-gray-900">View Store</p>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
