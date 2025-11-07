// components/CategoriesSection/CategoriesSlider.js
"use client";

import { forwardRef, useRef } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";

const CategoriesSlider = forwardRef(({ categories }, ref) => {
  const scrollContainerRef = useRef(null);

  return (
    <div className="flex items-center justify-center relative">
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
    </div>
  );
});

CategoriesSlider.displayName = "CategoriesSlider";

export default CategoriesSlider;
