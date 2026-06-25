"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowLeft, IndianRupee, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Breadcrumb from "@/components/Breadcrumb";
import FeedbackList from "@/components/FeedbackList";
import FeedbackForm from "@/components/FeedbackForm";

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

export default function ProductDetail() {
  const params = useParams();
  const id = Number(params.id);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const { addItem, setIsOpen } = useCart();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((p) => {
        setProduct(p);
        setSelectedSize(p.sizes[1] || p.sizes[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#1E3A5F]/20 border-t-[#1E3A5F] rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Product not found</h2>
          <Link href="/shirts" className="text-[#1E3A5F] hover:underline">Back to Shirts</Link>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product, selectedSize);
    setIsOpen(true);
  };

  const categoryLabel = product.category === "shirts" ? "Shirts" : "Trousers";
  const categoryUrl = product.category === "shirts" ? "/shirts" : "/trousers";

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: categoryLabel, href: categoryUrl },
          { label: product.name },
        ]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden mt-6">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="space-y-3">
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 via-gray-50 to-gray-100 flex items-center justify-center overflow-hidden relative">
                {(product.images?.[selectedImage] || product.image)?.startsWith("/upload") ? (
                  <>
                    <img src={product.images?.[selectedImage] || product.image} alt={product.name} className="w-full h-full object-cover" />
                    {product.images && product.images.length > 1 && (
                      <>
                        <button onClick={() => setSelectedImage((prev) => (prev - 1 + product.images!.length) % product.images!.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow">
                          <ChevronLeft size={18} />
                        </button>
                        <button onClick={() => setSelectedImage((prev) => (prev + 1) % product.images!.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow">
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <span className="text-8xl">{product.category === "shirts" ? "👔" : "👖"}</span>
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${selectedImage === i ? "border-[#1E3A5F]" : "border-gray-200 hover:border-gray-300"}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              {product.badge && (
                <span className={`inline-block self-start px-3 py-1 text-xs font-bold rounded-full mb-4 ${product.badge === "New" ? "bg-[#1E3A5F] text-white" : "bg-red-500 text-white"}`}>
                  {product.badge}
                </span>
              )}
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{categoryLabel}</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{product.description}</p>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-bold text-[#1E3A5F]">Rs.{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">Rs.{product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <div className="mb-8">
                <p className="text-sm font-medium text-gray-700 mb-3">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 text-sm font-medium rounded-lg border transition-colors ${selectedSize === size ? "border-[#1E3A5F] bg-[#1E3A5F] text-white" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleAdd}
                className="w-full py-3.5 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#162D4A] transition-colors flex items-center justify-center gap-2">
                <ShoppingBag size={18} /> Add to Cart
              </button>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><IndianRupee size={14} /> Free shipping</span>
                  <span className="flex items-center gap-1">✓ Easy returns</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-10 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6"><MessageSquare size={20} /> Reviews</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <FeedbackList productId={id} refreshKey={feedbackKey} />
            <FeedbackForm productId={id} onSubmitted={() => setFeedbackKey((k) => k + 1)} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
