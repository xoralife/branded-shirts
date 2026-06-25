"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, IndianRupee, ShoppingBag, TrendingUp, Users } from "lucide-react";

export default function ReportsPage() {
  const [data, setData] = useState({ products: 0, orders: 0, customers: 0, revenue: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/orders").then((r) => r.json()),
      fetch("/api/customers").then((r) => r.json()),
    ]).then(([products, orders, customers]) => {
      const deliveredRevenue = orders
        .filter((o: { status: string }) => o.status === "Delivered")
        .reduce((sum: number, o: { total: number }) => sum + o.total, 0);
      setData({
        products: products.length,
        orders: orders.length,
        customers: customers.length,
        revenue: deliveredRevenue,
      });
    });
  }, []);

  const cards = [
    { label: "Total Products", value: data.products, icon: Package, change: "+12%", color: "bg-blue-500", bg: "bg-blue-50" },
    { label: "Total Orders", value: data.orders, icon: ShoppingBag, change: "+8%", color: "bg-green-500", bg: "bg-green-50" },
    { label: "Total Customers", value: data.customers, icon: Users, change: "+15%", color: "bg-purple-500", bg: "bg-purple-50" },
    { label: "Revenue (PKR)", value: `Rs.${data.revenue.toLocaleString()}`, icon: IndianRupee, change: "+22%", color: "bg-[#1E3A5F]", bg: "bg-[#E8F4FD]" },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-500 mt-1 mb-8">Performance overview and insights</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`${card.bg} rounded-xl p-4 sm:p-6`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}>
                  <Icon size={20} className="text-white" />
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-green-600"><TrendingUp size={14} />{card.change}</span>
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{card.label}</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{card.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Order Status Distribution</h2>
          <div className="space-y-4">
            {[
              { label: "Processing", value: 25, color: "bg-yellow-400" },
              { label: "Shipped", value: 30, color: "bg-blue-400" },
              { label: "Delivered", value: 35, color: "bg-green-400" },
              { label: "Cancelled", value: 10, color: "bg-red-400" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium text-gray-900">{item.value}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${item.value}%` }} transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full rounded-full ${item.color}`} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Insights</h2>
          <div className="space-y-4">
            {[
              { label: "Average Order Value", value: "Rs. 4,498", icon: ShoppingBag },
              { label: "Conversion Rate", value: "3.2%", icon: TrendingUp },
              { label: "Top Category", value: "Shirts (4 products)", icon: Package },
              { label: "Return Rate", value: "1.8%", icon: Users },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Icon size={16} className="text-gray-500" />
                    </div>
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
