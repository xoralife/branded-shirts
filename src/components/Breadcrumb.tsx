"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-400 mb-4 overflow-x-auto whitespace-nowrap pb-1">
      <Link href="/" className="hover:text-[#1E3A5F] transition-colors flex items-center gap-1">
        <Home size={14} /> Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={14} className="text-gray-300" />
          {item.href ? (
            <Link href={item.href} className="hover:text-[#1E3A5F] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
