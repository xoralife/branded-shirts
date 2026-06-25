"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Mail, Phone } from "lucide-react";

interface Customer {
  id: number; name: string; email: string; phone: string; orders: number; totalSpent: number; joined: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/customers").then((r) => r.json()).then(setCustomers);
  }, []);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500 mt-1">{customers.length} total customers</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F] w-full sm:w-64" />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="hidden sm:block bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Orders</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Spent</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4"><span className="font-medium text-gray-900">{c.name}</span></td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-gray-500"><Mail size={12} />{c.email}</span>
                      <span className="flex items-center gap-1 text-xs text-gray-500"><Phone size={12} />{c.phone}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{c.orders}</td>
                  <td className="py-3 px-4 font-semibold text-[#1E3A5F]">Rs.{c.totalSpent.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-500">{c.joined}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sm:hidden space-y-3">
          {filtered.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
              className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-900">{c.name}</span>
                <span className="text-xs text-gray-400">{c.joined}</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">{c.email} | {c.phone}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{c.orders} orders</span>
                <span className="font-semibold text-[#1E3A5F]">Rs.{c.totalSpent.toLocaleString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
