// components/ui/ProductDetail/ProductInfo.js
"use client";

import { FaHeart, FaStar } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

const ProductInfo = ({ product }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {product.name}
        </h1>
        <p className="text-gray-600 text-sm">{product.englishName}</p>
      </div>

      {/* آمار محصول */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <FaHeart className="text-red-500" />
          <span>{product.satisfactionRate}٪ رضایت کاربران</span>
        </div>
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500" />
          <span>{product.reviewCount} دیدگاه</span>
        </div>
      </div>

      {/* ویژگی‌ها */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">ویژگی‌های اصلی</h3>
        <div className="grid grid-cols-2 gap-3">
          {product.features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-3 border border-gray-100"
            >
              <div className="text-xs text-gray-500 mb-1">{feature.label}</div>
              <div className="text-sm font-medium text-gray-900">
                {feature.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* هشدار گارانتی */}
      {product.hasWarranty && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <IoIosWarning className="text-blue-500 text-xl mt-0.5 shrink-0" />
            <div className="text-sm text-blue-800">
              دارای گارانتی ۱۲ ماهه شرکتی می‌باشد، در حفظ کارت گارانتی کوشا
              باشید.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
