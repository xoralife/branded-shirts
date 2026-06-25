"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/Toast";

export default function SettingsPage() {
  const [form, setForm] = useState({
    storeName: "", storeEmail: "", storePhone: "", storeAddress: "",
    currency: "PKR", taxRate: "0", shippingFee: "200",
    freeShippingThreshold: "3000", jazzcashNumber: "", easypaisaNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then((data) => {
      setForm(data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      showToast("Settings saved successfully", "success");
    } else {
      showToast("Failed to save settings", "error");
    }
    setSaving(false);
  };

  if (loading) return <div className="text-center py-12 text-gray-400">Loading...</div>;

  return (
    <div className="max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#1E3A5F] transition-colors mb-4">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
        <p className="text-gray-500 mt-1">Manage your store configuration</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-100 p-6 space-y-6"
      >
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Store Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Store Name</label>
              <input type="text" required value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Store Email</label>
              <input type="email" required value={form.storeEmail} onChange={(e) => setForm({ ...form, storeEmail: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
              <input type="text" required value={form.storePhone} onChange={(e) => setForm({ ...form, storePhone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
              <input type="text" required value={form.storeAddress} onChange={(e) => setForm({ ...form, storeAddress: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F]" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Payment & Shipping</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Currency</label>
              <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F]">
                <option value="PKR">PKR (Rs.)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tax Rate (%)</label>
              <input type="number" min="0" max="100" value={form.taxRate} onChange={(e) => setForm({ ...form, taxRate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Shipping Fee (PKR)</label>
              <input type="number" min="0" value={form.shippingFee} onChange={(e) => setForm({ ...form, shippingFee: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Free Shipping Over (PKR)</label>
              <input type="number" min="0" value={form.freeShippingThreshold} onChange={(e) => setForm({ ...form, freeShippingThreshold: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">JazzCash Number</label>
              <input type="text" value={form.jazzcashNumber} onChange={(e) => setForm({ ...form, jazzcashNumber: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">EasyPaisa Number</label>
              <input type="text" value={form.easypaisaNumber} onChange={(e) => setForm({ ...form, easypaisaNumber: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F]" />
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving}
          className="w-full py-3 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#162D4A] transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
          <Save size={18} /> {saving ? "Saving..." : "Save Settings"}
        </button>
      </motion.form>
    </div>
  );
}
