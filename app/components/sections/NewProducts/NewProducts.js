// components/sections/NewProducts/NewProducts.js
"use client";

import SectionHeader from "@/app/components/ui/SectionHeader";
import Slider from "@/app/components/ui/Slider";
import ProductCard from "@/app/components/ui/ProductCard";

const NewProducts = ({ products = [] }) => {
  const defaultProducts = [
    {
      id: 1,
      name: "ایرپاد پرو ۳ اورجینال اپل - مدل 2024",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/airpods-pro-3-300x300.webp",
      price: 18999000,
      originalPrice: null, // بدون تخفیف
      discount: 0, // تخفیف صفر
      rating: 4.7,
      href: "https://tec.shuner.ir/product/airpods-pro-3/",
      freeShipping: true,
      isNew: true, // پراپ جدید برای نمایش برچسب محصول جدید
    },
    {
      id: 2,
      name: "آیفون 16 پرو مکس 512 گیگ",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/iphone-16-pro-max-300x300.webp",
      price: 89000000,
      originalPrice: null,
      discount: 0,
      rating: 4.9,
      href: "https://tec.shuner.ir/product/iphone-16-pro-max/",
      freeShipping: true,
      isNew: true,
    },
    {
      id: 3,
      name: "مک بوک ایر 15 اینچی M3",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/macbook-air-15-m3-300x300.webp",
      price: 65000000,
      originalPrice: null,
      discount: 0,
      rating: 4.8,
      href: "https://tec.shuner.ir/product/macbook-air-15-m3/",
      freeShipping: true,
      isNew: true,
    },
    {
      id: 4,
      name: "اپل واچ سری 10",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/apple-watch-series-10-300x300.webp",
      price: 22000000,
      originalPrice: null,
      discount: 0,
      rating: 4.6,
      href: "https://tec.shuner.ir/product/apple-watch-series-10/",
      freeShipping: false,
      isNew: true,
    },
    {
      id: 5,
      name: "آیپد ایر 6 نسل ششم",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/ipad-air-6-300x300.webp",
      price: 38000000,
      originalPrice: null,
      discount: 0,
      rating: 4.5,
      href: "https://tec.shuner.ir/product/ipad-air-6/",
      freeShipping: true,
      isNew: true,
    },
    {
      id: 6,
      name: "ماوس مجیک پرو اپل",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/magic-mouse-pro-300x300.webp",
      price: 5500000,
      originalPrice: null,
      discount: 0,
      rating: 4.3,
      href: "https://tec.shuner.ir/product/magic-mouse-pro/",
      freeShipping: false,
      isNew: true,
    },
    {
      id: 7,
      name: "کیبورد مجیک پرو مکس",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/magic-keyboard-pro-max-300x300.webp",
      price: 12500000,
      originalPrice: null,
      discount: 0,
      rating: 4.4,
      href: "https://tec.shuner.ir/product/magic-keyboard-pro-max/",
      freeShipping: true,
      isNew: true,
    },
    {
      id: 8,
      name: "ایرتگ پرو اپل",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/airtag-pro-300x300.webp",
      price: 2800000,
      originalPrice: null,
      discount: 0,
      rating: 4.2,
      href: "https://tec.shuner.ir/product/airtag-pro/",
      freeShipping: false,
      isNew: true,
    },
  ];

  const productsData = products.length > 0 ? products : defaultProducts;

  return (
    <div className="container text-[#1B1F22]">
      <div className="headCoursel flex-col mt-8">
        {/* هدر بخش */}
        <div className="flex justify-between items-center mb-6">
          <SectionHeader
            title="محصولات جدید"
            subtitle="نمایش همه"
            icon="new" // یا از آیکون مناسب دیگری استفاده کنید
            href="/new-products"
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

export default NewProducts;
