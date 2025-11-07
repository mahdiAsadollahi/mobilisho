// components/CategoriesSection/index.js
"use client";

import { useRef } from "react";
import CategoriesHeader from "../CategoriesHeader/CategoriesHeader";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";

const CategoriesSection = ({ categories = [] }) => {
  const sliderRef = useRef(null);

  const defaultCategories = [
    {
      id: 1,
      name: "انوع ایرپاد",
      image: "https://tec.shuner.ir/wp-content/uploads/2025/10/airp-2.webp",
      href: "#",
    },
    {
      id: 2,
      name: "انواع هارد",
      image: "https://tec.shuner.ir/wp-content/uploads/2025/10/hard.webp",
      href: "#",
    },
    {
      id: 3,
      name: "لپ تاپ اپل",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/a26f974b32ebfa8f492b1963cf8ffa20531d0cb3.png",
      href: "#",
    },
    {
      id: 4,
      name: "اپل واچ",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/61Z8y0y2b0L-removebg-preview.png",
      href: "#",
    },
    {
      id: 5,
      name: "لپ تاپ ایسوز",
      image: "https://tec.shuner.ir/wp-content/uploads/2025/10/tuf.webp",
      href: "#",
    },
    {
      id: 6,
      name: "انواع مانیتور",
      image: "https://tec.shuner.ir/wp-content/uploads/2025/10/monitor.webp",
      href: "#",
    },
    {
      id: 7,
      name: "موبایل اپل",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/10/MGFL4-Photoroom.webp",
      href: "#",
    },
    {
      id: 8,
      name: "موبایل سامسونگ",
      image: "https://tec.shuner.ir/wp-content/uploads/2025/10/s24.webp",
      href: "#",
    },
  ];

  const categoriesData = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="bg-[#F5F8FA] mb-10 container flex flex-col px-0 border border-gray-200 justify-center text-[#1B1F22] pt-10 md:pr-10 md:rounded-[40px] mt-10">
      <CategoriesHeader />
      <CategoriesSlider categories={categoriesData} ref={sliderRef} />
    </div>
  );
};

export default CategoriesSection;
