"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchBar from "./SearchBar";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shirts", href: "/shirts" },
  { label: "Trousers", href: "/trousers" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-[#1E3A5F]">
              BRANDED
            </span>
            <span className="hidden sm:inline text-xl font-light text-gray-400">
              |
            </span>
            <span className="hidden sm:inline text-sm font-medium text-gray-500 uppercase tracking-widest">
              Store
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-[#1E3A5F]" : "text-gray-600 hover:text-[#1E3A5F]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <SearchBar />
            </div>
            <Link
              href="/wishlist"
              className="relative p-2 text-gray-600 hover:text-[#1E3A5F] transition-colors"
            >
              <Heart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-[#1E3A5F] transition-colors"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#1E3A5F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-[#1E3A5F] transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="lg:hidden overflow-hidden border-t border-gray-100 bg-white"
      >
        <div className="px-4 py-4 space-y-4">
          <div className="sm:hidden">
            <SearchBar />
          </div>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-gray-600 hover:text-[#1E3A5F] hover:bg-gray-50 transition-colors py-2.5 px-3 rounded-lg"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/wishlist" onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#1E3A5F] hover:bg-gray-50 transition-colors py-2.5 px-3 rounded-lg">
              <Heart size={16} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
