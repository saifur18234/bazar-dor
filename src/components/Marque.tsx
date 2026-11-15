"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { Chip } from "@heroui/react";
import Link from "next/link";

const LIVE_PRICES = [
  {
    id: 1,
    slug: "sorno-machi-chal",
    nameBn: "স্বর্ণমাছি চাল",
    unitType: "কেজি",
    image: "🍚",
    today: "১৪৮",
    change: { dir: "up", pct: "২.১%" },
  },
  {
    id: 5,
    slug: "mosur-dal",
    nameBn: "মসুর ডাল",
    unitType: "কেজি",
    image: "🫘",
    today: "১৪২",
    change: { dir: "up", pct: "২.৯%" },
  },
  {
    id: 9,
    slug: "sorishar-tel",
    nameBn: "সরিষার তেল",
    unitType: "লিটার",
    image: "🫙",
    today: "৬০০",
    change: { dir: "flat", pct: "২.১%" },
  },
  {
    id: 12,
    slug: "alu",
    nameBn: "আলু",
    unitType: "কেজি",
    image: "🥔",
    today: "৮৫০",
    change: { dir: "down", pct: "-৬.২%" },
  },
  {
    id: 17,
    slug: "rui-mach",
    nameBn: "রুই মাছ",
    unitType: "কেজি",
    image: "🐟",
    today: "৪৬",
    change: { dir: "up", pct: "৪.৫%" },
  },
  {
    id: 22,
    slug: "murgi-r-mangsho",
    nameBn: "মুরগির মাংস",
    unitType: "কেজি",
    image: "🍗",
    today: "২২৫",
    change: { dir: "up", pct: "-১.৩%" },
  },
  {
    id: 26,
    slug: "dim",
    nameBn: "ডিম",
    unitType: "ডজন",
    image: "🥚",
    today: "১৫৮",
    change: { dir: "up", pct: "৩.৯%" },
  },
  {
    id: 29,
    slug: "mokhhan",
    nameBn: "মাখন (১০০ গ্রাম)",
    unitType: "পিছ",
    image: "🧈",
    today: "১৪৫",
    change: { dir: "up", pct: "৩.৬%" },
  },
];

export default function Marque() {
  return (
    <div className="w-full bg-white text-white flex items-center h-11 overflow-hidden border-b border-slate-200">
      {/* Scrolling Marquee Section */}
      <Marquee
        pauseOnHover={true}
        speed={150}
        gradient={false}
        className="flex items-center h-full overflow-hidden"
      >
        {LIVE_PRICES.map((item) => {
          const isUp = item.change.dir === "up";
          const isDown = item.change.dir === "down";

          return (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className="flex items-center gap-2 mx-3 px-3 py-1 rounded-lg  transition-colors whitespace-nowrap text-xs sm:text-sm"
            >
              {/* Product Icon */}
              <span className="text-base leading-none">{item.image}</span>

              {/* Product Name */}
              <span className=" text-black">{item.nameBn}</span>

              {/* Today's Price */}
              <span className="text-xm text-gray-800">{item.today}টাকা</span>

              {/* Unit Type */}
              <span className="text-xm text-gray-800 ">/ {item.unitType}</span>

              {/* Price Change Chip */}
              <Chip
                size="sm"
                className={`px-2 py-0.5 h-5 rounded-full text-xm font-bold flex items-center gap-0.5 ${
                  isUp
                    ? "bg-[#ffe4e6] text-[#e11d48]"
                    : isDown
                      ? "bg-[#d1fae5] text-[#059669]"
                      : "bg-slate-200 text-slate-700"
                }`}
              >
                {isUp && "▲ "}
                {isDown && "▼ "}
                {!isUp && !isDown && "— "}
                {item.change.pct}
              </Chip>
            </Link>
          );
        })}
      </Marquee>
    </div>
  );
}
