// components/sections/SpecialOffers/SpecialOffers.js
"use client";

import SectionHeader from "@/app/components/ui/SectionHeader";
import Slider from "@/app/components/ui/Slider";
import ProductCard from "@/app/components/ui/ProductCard";

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
    // ... سایر محصولات
  ];

  const productsData = products.length > 0 ? products : defaultProducts;

  return (
    <div className="container text-[#1B1F22]">
      <div className="headCoursel flex-col mt-8">
        {/* هدر بخش */}
        <div className="flex justify-between items-center mb-6">
          <SectionHeader
            title="پیشنهادات ویژه"
            subtitle="نمایش همه"
            icon="gift"
            href="/special-offers"
          />
        </div>

        {/* اسلایدر محصولات */}
        <Slider
          products={productsData}
          productComponent={ProductCard}
          slidesPerView="auto"
        />
      </div>
    </div>
  );
};

export default SpecialOffers;
