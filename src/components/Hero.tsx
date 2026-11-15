import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <section className="  px-4 sm:px-6 lg:px-8 mx-auto flex min-h-[284px] max-w-7xl items-center justify-between gap-8 rounded-[24px] border border-[#dce8df] bg-[#f8fbf9] p-4 max-md:flex-col max-md:gap-5 max-md:p-6 max-md:text-center">
      {/* Left Content */}
      <div className="flex-1">
        {/* Date */}
        <span className="inline-block rounded-full bg-[#e1f2e7] px-3 py-1 text-sm font-medium text-[#07883f]">
          {formattedDate}
        </span>

        {/* Heading */}
        <h1 className="mt-2 mb-4 text-3xl font-bold leading-tight text-[#1c2920] md:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        {/* Description */}
        <p className="mb-6 max-w-[570px] text-base leading-relaxed text-[#6b756e] max-md:mx-auto">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        {/* Button */}
        <Link href={"/#all-products"}>
          <Button
            type="button"
            variant="primary"
            className="inline-block rounded-lg bg-[#078b43] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#056d34]"
          >
            <span>সব পণ্য দেখুন</span>
          </Button>
        </Link>
      </div>

      {/* Right Image */}
      <div className="relative w-[360px] shrink-0 max-md:w-[320px]">
        <Image
          src={"/bazar-hero.png"}
          alt="বাজারের পণ্যের ঝুড়ি"
          width={400}
          height={380}
          priority
          className="h-auto w-full object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;
