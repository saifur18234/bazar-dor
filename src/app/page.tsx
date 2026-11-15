import AllProductsSection from "@/components/AllProductsSection";
import Hero from "@/components/Hero";
import PriceDecreaseSection from "@/components/PriceDcreaseSection";
import PriceIncreaseSection from "@/components/PriceIncreaseSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen  px-4 py-[30px] ">
      <Hero />
      <PriceIncreaseSection />
      <PriceDecreaseSection />
      <AllProductsSection />
    </main>
  );
}
