import React from "react";
import ImageSlider from "@/app/components/ImageSlider/ImageSlider";
import CategoriesSection from "@/app/components/CategoriesSection/CategoriesSection";
import SpecialOffers from "@/app/components/sections/SpecialOffers/SpecialOffers";
import BannerSection from "@/app/components/BannerSection/BannerSection ";
import NewProducts from "@/app/components/sections/NewProducts";
import BannerSection2 from "@/app/components/BannerSection2/BannerSection2";

function page() {
  const customProducts = [
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
    {
      id: 3,
      name: "لپ تاپ مک بوک پرو 16 اینچی اپل",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/52911bcdb01c4122759b430697732b2bf538c784_1731164433-300x300.webp",
      price: 85000000,
      originalPrice: 92000000,
      discount: 8,
      rating: 4.8,
      href: "https://tec.shuner.ir/product/macbook-pro-16/",
      freeShipping: true,
    },
    {
      id: 4,
      name: "آیفون 15 پرو مکس 256 گیگ",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/iphone-15-pro-max-300x300.webp",
      price: 68000000,
      originalPrice: 72000000,
      discount: 6,
      rating: 4.7,
      href: "https://tec.shuner.ir/product/iphone-15-pro-max/",
      freeShipping: true,
    },
    {
      id: 5,
      name: "ساعت اپل واچ سری 8",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/apple-watch-series-8-300x300.webp",
      price: 18500000,
      originalPrice: 19500000,
      discount: 5,
      rating: 4.4,
      href: "https://tec.shuner.ir/product/apple-watch-series-8/",
      freeShipping: false,
    },
    {
      id: 6,
      name: "تبلت آیپد پرو 12.9 اینچی",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/ipad-pro-12-9-300x300.webp",
      price: 45000000,
      originalPrice: 48000000,
      discount: 6,
      rating: 4.6,
      href: "https://tec.shuner.ir/product/ipad-pro-12-9/",
      freeShipping: true,
    },
    {
      id: 7,
      name: "ماوس وایرلس اپل مجیک موس",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/magic-mouse-300x300.webp",
      price: 3200000,
      originalPrice: 3500000,
      discount: 9,
      rating: 4.1,
      href: "https://tec.shuner.ir/product/magic-mouse/",
      freeShipping: false,
    },
    {
      id: 8,
      name: "کیبورد اپل مجیک کیبورد",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/magic-keyboard-300x300.webp",
      price: 8500000,
      originalPrice: 9000000,
      discount: 6,
      rating: 4.3,
      href: "https://tec.shuner.ir/product/magic-keyboard/",
      freeShipping: true,
    },
  ];

  return (
    <div>
      <ImageSlider />
      <CategoriesSection />
      <SpecialOffers products={customProducts} />
      <BannerSection />
      <NewProducts />
      <BannerSection2 />
    </div>
  );
}

export default page;
