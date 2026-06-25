"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Camera,
  MessageCircle,
} from "lucide-react";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/" },
      { label: "Shirts", href: "/shirts" },
      { label: "Trousers", href: "/trousers" },
      { label: "New Arrivals", href: "/shirts" },
      { label: "Sale", href: "/trousers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "#contact-form" },
      { label: "FAQs", href: "#" },
      { label: "Shipping Info", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Size Guide", href: "/size-guide" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0F2440] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">
              BRANDED <span className="font-light text-white/60">Store</span>
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Premium shirts and trousers for the modern gentleman. Quality,
              style, and comfort since 2021.
            </p>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1E3A5F] cursor-pointer transition-colors">
                <Globe size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1E3A5F] cursor-pointer transition-colors">
                <Camera size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1E3A5F] cursor-pointer transition-colors">
                <MessageCircle size={18} />
              </div>
            </div>
          </motion.div>

          {footerLinks.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-white/40" />
              <span className="text-sm text-white/60">info@brandedstore.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-white/40" />
              <span className="text-sm text-white/60">+92 300 1234567</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-white/40" />
              <span className="text-sm text-white/60">Karachi, Pakistan</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              &copy; 2026 Branded Store. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
