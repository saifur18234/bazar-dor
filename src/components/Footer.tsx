import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#eef5f2] border-t border-slate-300  shadow-sm">
      <div className="max-w-6xl mx-auto px-6 sm:px-7 py-7">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          {/* Left Content */}
          <p className="text-xs sm:text-sm text-slate-600">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          {/* Right Content */}
          <p className="text-xs sm:text-sm text-slate-500">
            সকল দাম সম্ভাব্য; বাজার অবস্থা এবং নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
