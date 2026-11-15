"use client";

import React from "react";
import { Card, Chip, Separator } from "@heroui/react";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { IProduct } from "@/types/type";
import { unitLabels } from "@/lib/utils";

export default function ProductCard({ product }: { product: IProduct }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const unitLabel = unitLabels[product.unit] ?? product.unit;

  return (
    <Link href={`/product/${product.id}`} className="block  group">
      <Card
        className="
                    h-full
                    p-4
                    rounded-2xl
                    bg-[#fbfdfb]
                    border border-[#dfe8e1]
                    shadow-none
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-green-700
                "
      >
        {/* Product Header */}
        <div className="flex items-center gap-3">
          {/* Product Emoji */}
          <div
            className="
                        w-14 h-14
                        rounded-2xl
                        bg-[#f0f5f1]
                        flex items-center justify-center
                        text-2xl
                        shrink-0
                    "
          >
            {product.image}
          </div>

          {/* Product Name & Unit */}
          <div className="flex flex-col gap-0.5">
            <h3 className="text-lg font-bold text-slate-900">
              {product.nameBn}
            </h3>

            <p className="text-sm text-slate-500">{unitLabel}</p>
          </div>
        </div>

        {/* Today's Price */}
        <div className="mt-3">
          <Card.Footer className="p-0 flex items-end justify-between">
            {/* Price */}
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-slate-400 font-medium">
                আজকের দাম
              </span>

              <div className="text-lg font-extrabold text-slate-900">
                {product.today.toLocaleString("bn-BD")} টাকা
              </div>
            </div>

            {/* Price Change Badge */}
            <Chip
              size="sm"
              className={`px-2.5 py-0.5 h-6 rounded-full text-xs font-bold border ${
                isUp
                  ? "bg-[#f0f5f1] text-[#dc2626] border-transparent"
                  : isDown
                    ? "bg-[#ecfdf5] text-[#059669] border-transparent"
                    : "bg-slate-100 text-slate-600 border-transparent"
              }`}
            >
              {isUp && "▲ "}
              {isDown && "▼ "}
              {!isUp && !isDown && "— "}
              {Math.abs(product.change.pct).toLocaleString("bn-BD", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
              %
            </Chip>
          </Card.Footer>
        </div>
      </Card>
    </Link>
  );
}
