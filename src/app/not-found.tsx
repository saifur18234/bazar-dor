import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] px-4 py-10">
      <div className="max-w-lg w-full text-center">
        {/* Emoji */}
        <div className="text-8xl sm:text-9xl mb-6">🔍</div>

        {/* Error Code */}
        <h1 className="text-7xl sm:text-8xl font-black text-emerald-600 mb-4">
          404
        </h1>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
          পেজটি পাওয়া যায়নি!
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-8">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি খুঁজে পাওয়া যায়নি। হয়তো পেজটি
          সরানো হয়েছে অথবা ঠিকানাটি ভুল। বাজার দর দেখতে হোম পেজে ফিরে যান।
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <Home size={18} />
          হোম পেজে ফিরে যান
        </Link>

        {/* Branding */}
        <p className="mt-12 text-xs text-slate-400">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
      </div>
    </main>
  );
}
