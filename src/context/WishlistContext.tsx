"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  image: string;
  images?: string[];
  description: string;
  sizes: string[];
  badge: string | null;
}

interface WishlistContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  isWishlisted: (id: number) => boolean;
  totalItems: number;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => (prev.find((i) => i.id === product.id) ? prev : [...prev, product]));
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const isWishlisted = useCallback((id: number) => {
    return items.some((i) => i.id === id);
  }, [items]);

  const clearWishlist = useCallback(() => setItems([]), []);

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isWishlisted, totalItems: items.length, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
