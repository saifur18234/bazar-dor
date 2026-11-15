"use client";

import React, { useEffect, useState } from "react";
import { Chip } from "@heroui/react";
import { LayoutGrid } from "lucide-react";
import ProductCard from "./ProductCard";
import { IProduct } from "@/types/type";

export default function AllProductsSection() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: IProduct[] = await res.json();

        setProducts(data);
      } catch (error) {
        console.error("Error loading all products data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <section id="all-products" className="w-full py-12 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-7">
          <div className="flex flex-col items-start gap-2">
            {/* Main Title */}
            <h2 className="text-xm sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>সব পণ্য</span>
            </h2>

            {/* Total Count Text */}
            <span className="text-xm sm:text-sm text-slate-600 font-medium">
              মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
            </span>
          </div>
        </div>

        {/* Cards Grid (3 Columns on Desktop) */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(9)].map((_, idx) => (
              <div
                key={idx}
                className="h-52 rounded-3xl bg-slate-200/60 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
