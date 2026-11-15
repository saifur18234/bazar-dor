import React from "react";
import Link from "next/link";
import { Card, Chip } from "@heroui/react";
import { Home, ChevronRight, CheckCircle2 } from "lucide-react";
import { IProduct } from "@/types/type";
import { unitTypes, unitLabels } from "@/lib/utils";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  let product: IProduct | null = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
      { cache: "no-store" },
    );
    if (res.ok) {
      product = await res.json();
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
  console.log(product);
  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center space-y-4">
        <span className="text-6xl block">🧺</span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          পাতাটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          আপনি যে পণ্য বা পাতাটি খুঁজছেন সেটি সরানো হয়েছে বা কখনো ছিল না।
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm shadow-md transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  //   // দামের সারসংক্ষেপ
  const markets = [...product.markets].sort((a, b) => a.min - b.min);
  const minOp = markets[0];
  const maxOp = markets.reduce((max, market) =>
    market.max > max.max ? market : max,
  );
  const avgPrice = Math.round(
    markets.reduce((sum, market) => sum + (market.min + market.max) / 2, 0) /
      markets.length,
  );

  //   // বাজারভিত্তিক গড় = (min + max) / 2, কম থেকে বেশি সাজানো
  const rows = markets
    .map((market) => ({
      ...market,
      avg: (market.min + market.max) / 2,
    }))
    .sort((a, b) => a.avg - b.avg);

  return (
    <main className="min-h-screen w-full py-6 sm:py-10 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* ১. ব্রেডক্রাম্ব */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <Home size={14} />
            <span>হোম</span>
          </Link>
          <ChevronRight size={14} />
          <Link
            href={`/category/${product.category}`}
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <span>{product.categoryIcon}</span>
            <span>{product.categoryNameBn}</span>
          </Link>
          <ChevronRight size={14} />
          <span className="font-bold text-slate-900">{product.nameBn}</span>
        </div>

        {/* ২. মেইন রুট হেডার কার্ড */}
        <Card className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs space-y-6">
          <Card.Content className="p-0 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-[#f1f5f9] border border-slate-200/60 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
                {product.image}
              </div>

              <div className="space-y-1">
                <Card.Title className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {product.nameBn}
                </Card.Title>
                <div className="text-sm text-slate-500">
                  {unitLabels[product.unit.toLocaleLowerCase()] ?? product.unit}{" "}
                  .{product.categoryNameBn}
                </div>

                <p className="text-slate-500">
                  গতকালের তুলনায় আজ দাম{" "}
                  <span className="font-bold">
                    {product.change.dir === "up"
                      ? "বেড়েছে"
                      : product.change.dir === "down"
                        ? "কমেছে"
                        : "অপরিবর্তিত আছে"}
                  </span>{" "}
                  {Math.abs(product.change.pct).toLocaleString("bn-BD", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })}
                  %
                </p>
              </div>
            </div>

            {/* আজকের দাম বক্স */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl px-4 py-2.5 flex flex-col md:items-end">
              <span className=" text-[15px] font-medium text-slate-600">
                আজকের দাম
              </span>

              <div className="flex flex-col items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {product.today.toLocaleString("bn-BD")}
                </span>

                <span className="text-[15px] font-medium text-slate-600">
                  টাকা / {unitTypes[product.unit] ?? product.unit}
                </span>
              </div>

              <Chip
                size="sm"
                className={`mt-2 px-2.5 py-0.5 h-auto rounded-full text-xs font-bold ${
                  product.change.dir === "up"
                    ? "bg-rose-50 text-rose-600"
                    : product.change.dir === "down"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-slate-100 text-slate-600"
                }`}
              >
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
              </Chip>
            </div>
          </Card.Content>
        </Card>

        {/* ৩. সর্বনিম্ন, সর্বোচ্চ ও গড় দামের ৩টি কার্ড */}

        {/* Product Details */}
        <div className="w-full rounded-2xl border bg-white p-5 mt-7">
          <h2 className="text-xl font-bold text-left mb-6">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Minimum Price */}
            <div className="rounded-2xl text-sm text-slate-500 border p-6 text-left shadow-sm">
              <p>সর্বনিম্ন দাম</p>
              <h1 className="text-2xl font-extrabold text-green-700">
                {minOp.min.toLocaleString("bn-BD")}
                <span className="text-sm font-normal"> টাকা</span>
              </h1>
              <p>সবচেয়ে কম দামের বাজার</p>
            </div>

            {/* Maximum Price */}
            <div className="rounded-2xl text-sm text-slate-500 border p-6 text-left shadow-sm">
              <p>সর্বাধিক দাম</p>
              <h1 className="text-2xl font-extrabold text-red-700">
                {maxOp.max.toLocaleString("bn-BD")}
                <span className="text-sm font-normal"> টাকা</span>
              </h1>
              <p>সবচেয়ে বেশি দামের বাজার</p>
            </div>

            {/* Average Price */}
            <div className="rounded-2xl text-sm text-slate-500 border p-6 text-left shadow-sm">
              <p>গড় দাম</p>
              <h1 className="text-2xl font-extrabold text-green-700">
                {avgPrice.toLocaleString("bn-BD")}
                <span className="text-sm font-normal"> টাকা</span>
              </h1>
              <p>প্রতি {unitTypes[product.unit] ?? product.unit}-এর হিসাবে</p>
            </div>
          </div>

          {/* ৪. বাজারভিত্তিক দামের তুলনা টেবিল কার্ড */}
          <div className="mt-6 overflow-x-auto  border-slate-200/80">
            <Card className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs space-y-5">
              <Card.Header className="p-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <Card.Title className="text-lg sm:text-xl font-extrabold text-slate-900">
                    বাজারভিত্তিক আজকের দাম
                  </Card.Title>
                </div>
                <Chip
                  size="sm"
                  className="px-3 py-1.5 h-auto rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5"
                >
                  <CheckCircle2 size={14} />
                  <span>সর্বনিম্ন দাম চিহ্নিত করা আছে</span>
                </Chip>
              </Card.Header>

              <Card.Content className="p-0 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-y border-slate-100 text-xs font-bold text-slate-400">
                      <th className="py-4 px-4 text-left font-semibold text-sm sm:text-base text-slate-700">
                        বাজার
                      </th>
                      <th className="py-3 px-4 col-span-2 text-left font-semibold text-sm sm:text-base text-slate-500">
                        বিভাগ
                      </th>
                      <th className="py-3 px-4 col-span-1 text-center font-semibold text-sm sm:text-base text-slate-500">
                        সর্বনিম্ন
                      </th>
                      <th className="py-3 px-4 col-span-1 text-center font-semibold text-sm sm:text-base text-slate-500">
                        সর্বাধিক
                      </th>
                      <th className="py-3 px-4 col-span-1 text-right font-semibold text-sm sm:text-base text-slate-500">
                        গড়
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {rows.map((op, idx) => (
                      <tr
                        key={op.id}
                        className={idx === 0 ? "bg-emerald-50/40" : ""}
                      >
                        <td className="py-3 px-3 font-bold text-slate-600 col-span-2">
                          <div className="flex items-center gap-2 text-left">
                            <span>{op.market}</span>
                            {idx === 0 && (
                              <Chip
                                size="sm"
                                className="px-2 py-0.5 h-auto rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-extrabold"
                              >
                                সর্বনিম্ন
                              </Chip>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3 col-span-2 text-left">
                          {op.division}
                        </td>

                        <td className="py-3 px-3 text-center  text-sm sm:text-base text-slate-800">
                          {op.min.toLocaleString("bn-BD")} টাকা
                        </td>
                        <td className="py-3 px-3 text-center text-sm sm:text-base text-slate-800">
                          {op.max.toLocaleString("bn-BD")} টাকা
                        </td>
                        <td className="py-3 px-3 text-right font-medium text-sm sm:text-base text-slate-900">
                          {op.avg.toLocaleString("bn-BD")}
                          <span className="text-slate-800 font-semibold">
                            {" "}
                            টাকা
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Content>
            </Card>
          </div>
        </div>
        <div className="p-6 mt-3 mb-6">
          {product.image} সব {product.categoryNameBn}
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
