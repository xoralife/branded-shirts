"use client";

import { motion } from "framer-motion";
import Breadcrumb from "@/components/Breadcrumb";

const shirtSizes = [
  { size: "S", chest: "36-38", waist: "30-32", length: "27" },
  { size: "M", chest: "38-40", waist: "32-34", length: "28" },
  { size: "L", chest: "40-42", waist: "34-36", length: "29" },
  { size: "XL", chest: "42-44", waist: "36-38", length: "30" },
  { size: "XXL", chest: "44-46", waist: "38-40", length: "31" },
];

const trouserSizes = [
  { size: "30", waist: "30", hip: "38", inseam: "32" },
  { size: "32", waist: "32", hip: "40", inseam: "32" },
  { size: "34", waist: "34", hip: "42", inseam: "33" },
  { size: "36", waist: "36", hip: "44", inseam: "33" },
  { size: "38", waist: "38", hip: "46", inseam: "34" },
];

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Breadcrumb items={[{ label: "Size Guide" }]} />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Size Guide
          </h1>
          <p className="text-gray-500 mt-2 mb-10">
            Find your perfect fit with our measurement guide
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Shirts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Size</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Chest (inches)</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Waist (inches)</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Length (inches)</th>
                </tr>
              </thead>
              <tbody>
                {shirtSizes.map((s) => (
                  <tr key={s.size} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#1E3A5F]">{s.size}</td>
                    <td className="py-3 px-4 text-gray-600">{s.chest}</td>
                    <td className="py-3 px-4 text-gray-600">{s.waist}</td>
                    <td className="py-3 px-4 text-gray-600">{s.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Trousers</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Size</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Waist (inches)</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Hip (inches)</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Inseam (inches)</th>
                </tr>
              </thead>
              <tbody>
                {trouserSizes.map((s) => (
                  <tr key={s.size} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#1E3A5F]">{s.size}</td>
                    <td className="py-3 px-4 text-gray-600">{s.waist}</td>
                    <td className="py-3 px-4 text-gray-600">{s.hip}</td>
                    <td className="py-3 px-4 text-gray-600">{s.inseam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-4 bg-[#E8F4FD] rounded-xl">
            <p className="text-sm text-[#1E3A5F]">
              <strong>Tip:</strong> Measure around the fullest part of your chest, keeping the tape measure horizontal. For waist, measure around your natural waistline.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
