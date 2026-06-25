"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import rawProducts from "@/data/products.json";

interface SearchProduct {
  id: number; name: string; category: string; price: number; originalPrice: number | null;
  image: string; images?: string[]; description: string; sizes: string[]; badge: string | null;
}

const products = rawProducts as SearchProduct[];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 transition-colors focus-within:bg-gray-200">
        <Search size={16} className="text-gray-400 mr-2 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value) setIsOpen(true);
          }}
          onFocus={() => query && setIsOpen(true)}
          className="bg-transparent text-sm text-gray-700 outline-none w-28 lg:w-40 placeholder:text-gray-400"
        />
        {query && (
          <button onClick={() => { setQuery(""); setIsOpen(false); }}>
            <X size={14} className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 right-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
          <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
            {results.map((p) => (
              <Link
                key={p.id}
                href={`/${p.category}/${p.id}`}
                onClick={() => { setQuery(""); setIsOpen(false); }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {(p.images?.[0] || p.image)?.startsWith("/upload") ? (
                    <img src={p.images?.[0] || p.image} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg">{p.category === "shirts" ? "👔" : "👖"}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">Rs.{p.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full mt-2 right-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 text-center text-sm text-gray-400 z-50">
          No products found
        </div>
      )}
    </div>
  );
}
