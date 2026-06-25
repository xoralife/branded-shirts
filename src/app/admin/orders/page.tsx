"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useToast } from "@/components/Toast";

interface Order {
  id: number;
  customer: string;
  email: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: string;
  date: string;
}

const statusOptions = ["Processing", "Shipped", "Delivered", "Cancelled"];

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then(setOrders);
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      const updated = await res.json();
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
      showToast(`Order #${id} status updated to ${status}`, "success");
    } else {
      showToast("Failed to update order status", "error");
    }
  };

  const filtered = orders.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      String(o.id).includes(search)
  );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 mt-1">
            Manage customer orders ({orders.length} orders)
          </p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F] w-full sm:w-64"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-100">No orders found</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">Items</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">Total</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((order, i) => (
                      <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">#{order.id}</td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900 whitespace-nowrap">{order.customer}</p>
                            <p className="text-xs text-gray-400">{order.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-0.5 min-w-[140px]">
                            {order.items.map((item, j) => (
                              <p key={j} className="text-xs text-gray-600 whitespace-nowrap">{item.name} x{item.qty}</p>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-semibold text-[#1E3A5F] whitespace-nowrap">Rs.{order.total.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`px-2.5 py-1 text-xs font-bold rounded-full border-0 cursor-pointer outline-none ${statusColors[order.status] || "bg-gray-100 text-gray-600"}`}
                          >
                            {statusOptions.map((s) => (<option key={s} value={s}>{s}</option>))}
                          </select>
                        </td>
                        <td className="py-3 px-4 text-gray-500 whitespace-nowrap">{order.date}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden space-y-3">
              {filtered.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white rounded-xl border border-gray-100 p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">#{order.id}</span>
                    <span className="text-xs text-gray-400">{order.date}</span>
                  </div>
                  <p className="font-medium text-gray-900 text-sm">{order.customer}</p>
                  <p className="text-xs text-gray-400 mb-2">{order.email}</p>
                  <div className="text-xs text-gray-600 mb-3">
                    {order.items.map((item, j) => (
                      <p key={j}>{item.name} x{item.qty}</p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1E3A5F]">Rs.{order.total.toLocaleString()}</span>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-full border-0 cursor-pointer outline-none ${statusColors[order.status] || "bg-gray-100 text-gray-600"}`}
                    >
                      {statusOptions.map((s) => (<option key={s} value={s}>{s}</option>))}
                    </select>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
