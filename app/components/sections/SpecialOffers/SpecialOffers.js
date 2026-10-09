"use client";

import SectionHeader from "@/app/components/ui/SectionHeader";
import Slider from "@/app/components/ui/Slider";
import ProductCard from "@/app/components/ui/ProductCard";
import { FaRegClock } from "react-icons/fa";

const SpecialOffers = ({ products = [] }) => {
  const defaultProducts = [
    {
      id: 1,
      name: "ایرپاد پرو ۲ اورجینال اپل – نات اکتیو",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/1-min-1-300x300.webp",
      price: 16499000,
      originalPrice: 17500000,
      discount: 6,
      rating: 4.5,
      href: "https://tec.shuner.ir/product/airpods-pro-2nd-generation/",
      freeShipping: true,
    },
    {
      id: 2,
      name: "هدست پلی استیشن سونی اسلیم چریکی",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/1-min-300x300.png",
      price: 4750000,
      originalPrice: 4900000,
      discount: 3,
      rating: 4.2,
      href: "https://tec.shuner.ir/product/%d9%87%d8%af%d8%b3%d8%aa-%d9%be%d9%84%db%8c-%d8%a7%d8%b3%d8%aa%db%8c%d8%b4%d9%86-%d8%b3%d9%88%d9%86%db%8c-%d8%a7%d8%b3%d9%84%db%8c%d9%85-%da%86%d8%b1%db%8c%da%a9%db%8c-%d9%85%d8%af%d9%84-pulse-elite-w/",
      freeShipping: false,
    },
  ];

  const productsData = products.length > 0 ? products : defaultProducts;

  return (
    <section className="container mt-10">
      <div className="relative overflow-hidden rounded-2طم bg-linear-to-br from-gray-100 via-gray-50 to-white border border-gray-200/80 p-5 sm:p-6 lg:p-8 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.15)]">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gray-300/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-slate-300/40 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-gray-200/30 blur-3xl pointer-events-none" />

        <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,#0f172a_1px,transparent_0)] bg-size-[20px_20px]" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-linear-to-r from-red-600 to-red-800 text-white text-xs font-semibold shadow-md shadow-gray-900/25">
              <FaRegClock className="text-sm" />
              <span>فرصت محدود</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-xs text-gray-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-gray-800 animate-pulse" />
              <span>پیشنهاد امروز</span>
            </div>
          </div>

          <SectionHeader
            title="پیشنهادات ویژه"
            subtitle="نمایش همه"
            icon="gift"
            href="/special-offers"
          />
        </div>

        <Slider
          products={productsData}
          productComponent={ProductCard}
          slidesPerView="auto"
          variant="soft"
        />
      </div>
    </section>
  );
};

export default SpecialOffers;
