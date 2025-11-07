// components/CategoriesSection/CategoriesSlider.js
"use client";

import { forwardRef, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import CategoryCard from "../CategoryCard/CategoryCard";

const CategoriesSlider = forwardRef(({ categories }, ref) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex items-center justify-center relative">
      {/* دکمه اسکرول به چپ */}
      <button
        type="button"
        className="hidden md:flex absolute -left-6 z-10 top-2/4 -translate-y-1/2 hover:bg-[#f7f8fa] hover:text-black text-black backdrop-blur-lg rounded-xl shadow px-2 py-5 transition-all"
        aria-label="اسکرول به چپ"
        onClick={() => scroll("left")}
      >
        <IoIosArrowBack size={26} />
      </button>

      {/* کانتینر اسکرول */}
      <div
        ref={scrollContainerRef}
        className="flex flex-row items-center pt-10 pb-10 pr-8 gap-3 mt-0 overflow-x-auto scrollbar-hide pl-4 md:min-w-[1180px]"
        style={{ scrollBehavior: "smooth" }}
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {/* دکمه اسکرول به راست */}
      <button
        type="button"
        className="hidden md:flex absolute -right-6 z-10 top-2/4 -translate-y-1/2 hover:bg-[#f7f8fa] hover:text-black text-black backdrop-blur-lg rounded-xl shadow px-2 py-5 transition-all"
        aria-label="اسکرول به راست"
        onClick={() => scroll("right")}
      >
        <IoIosArrowBack size={26} className="rotate-180" />
      </button>
    </div>
  );
});

CategoriesSlider.displayName = "CategoriesSlider";

export default CategoriesSlider;
