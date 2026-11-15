import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Marque from "@/components/Marque";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Noto_Sans_Bengali } from "next/font/google";

const bengaliFont = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর, দাম তুলনা ও মূল্য পরিবর্তন জানুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${bengaliFont.variable} font-sans   ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className=" min-h-full flex flex-col">
        <Navbar />
        <Marque />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
