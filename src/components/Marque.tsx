"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { Chip } from "@heroui/react";
import Link from "next/link";

const LIVE_FARES = [
  {
    id: 7,
    slug: "dhaka-to-chattogram-train",
    nameBn: "ঢাকা → চট্টগ্রাম",
    serviceType: "ইন্টারসিটি ট্রেন",
    image: "🚆",
    today: "৬৫০",
    change: { dir: "up", pct: "১.৭%" },
  },
  {
    id: 8,
    slug: "dhaka-to-sylhet-train",
    nameBn: "ঢাকা → সিলেট",
    serviceType: "ইন্টারসিটি ট্রেন",
    image: "🚆",
    today: "৫৫০",
    change: { dir: "down", pct: "১.৩%" },
  },
  {
    id: 9,
    slug: "dhaka-to-rajshahi-train",
    nameBn: "ঢাকা → রাজশাহী",
    serviceType: "ইন্টারসিটি ট্রেন",
    image: "🚆",
    today: "৬০০",
    change: { dir: "flat", pct: "০.০%" },
  },
  {
    id: 10,
    slug: "dhaka-to-khulna-train",
    nameBn: "ঢাকা → খুলনা",
    serviceType: "ইন্টারসিটি ট্রেন",
    image: "🚆",
    today: "৮৫০",
    change: { dir: "up", pct: "২.২%" },
  },
  {
    id: 1,
    slug: "dhaka-to-chattogram-ac-bus",
    nameBn: "ঢাকা → চট্টগ্রাম",
    serviceType: "AC বাস",
    image: "🚌",
    today: "১২০০",
    change: { dir: "up", pct: "২.৫%" },
  },
  {
    id: 13,
    slug: "dhaka-to-barishal-launch-deck",
    nameBn: "ঢাকা → বরিশাল",
    serviceType: "ডেক",
    image: "🚢",
    today: "৫০০",
    change: { dir: "up", pct: "২.৭%" },
  },
  {
    id: 19,
    slug: "dhaka-to-coxbazar-economy-flight",
    nameBn: "ঢাকা → কক্সবাজার",
    serviceType: "Economy",
    image: "✈️",
    today: "৫৫০০",
    change: { dir: "up", pct: "৪.২%" },
  },
  {
    id: 25,
    slug: "gulshan-to-airport-car",
    nameBn: "গুলশান → হযরত শাহজালাল বিমানবন্দর",
    serviceType: "Car",
    image: "🚕",
    today: "৮৫০",
    change: { dir: "up", pct: "৩.৫%" },
  },
];

export default function Marque() {
  return (
    <div className="w-full bg-[#0b1324] text-white flex items-center h-11 overflow-hidden border-b border-slate-800">
      {/* Scrolling Marquee Section */}
      <Marquee
        pauseOnHover={true}
        speed={45}
        gradient={false}
        className="flex items-center h-full overflow-hidden"
      >
        {LIVE_FARES.map((item) => {
          const isUp = item.change.dir === "up";
          const isDown = item.change.dir === "down";

          return (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className="flex items-center gap-2 mx-3 px-3 py-1 rounded-lg hover:bg-slate-800/80 transition-colors whitespace-nowrap text-xs sm:text-sm"
            >
              {/* Transport Icon */}
              <span className="text-base leading-none">{item.image}</span>

              {/* Route Name */}
              <span className="font-bold text-white">{item.nameBn}</span>

              {/* Service Type */}
              <span className="text-slate-400 text-xs">
                ({item.serviceType})
              </span>

              {/* Today's Fare */}
              <span className="font-bold text-[#fbbf24]">
                {item.today} টাকা
              </span>

              {/* Price Change Chip */}
              <Chip
                size="sm"
                className={`px-2 py-0.5 h-5 rounded-full text-[11px] font-bold flex items-center gap-0.5 ${
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
