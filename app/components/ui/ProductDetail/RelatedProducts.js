// components/ui/ProductDetail/RelatedProducts.js
"use client";

import ProductCard from "../ProductCard/ProductCard";
import { FaHeadphones } from "react-icons/fa";

const RelatedProducts = ({ products }) => {
  return (
    <div className="container-full px-2.5 text-[#1B1F22]">
      <div className="headCoursel flex-col mt-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4 md:gap-4">
            <div className="flex justify-center items-center w-12 h-12 bg-white border border-gray-200 rounded-xl hover:bg-white text-primary">
              <FaHeadphones className="text-blue-500 text-xl" />
            </div>
            <div className="flex flex-col items-start justify-center gap-1">
              <h3 className="text-lg md:text-3xl ml-8 tracking-[-0.065em] text-secondary">
                محصولات مرتبط
              </h3>
              <span className="tracking-[-0.065em] text-xs text-gray-400 cursor-pointer">
                نمایش همه
              </span>
            </div>
          </div>
        </div>

        <div className="curselCards relative">
          <div className="mx-auto mt-4">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-white/30 backdrop-blur-3xl z-10 pointer-events-none md:block hidden"></div>

            {/* اسلایدر محصولات */}
            <div className="flex gap-4 overflow-x-auto pb-4">
              {products.map((product, index) => (
                <div key={index} className="min-w-[280px] shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
