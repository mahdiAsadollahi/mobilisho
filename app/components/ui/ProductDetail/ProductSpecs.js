// components/ui/ProductDetail/ProductSpecs.js
"use client";

import {
  FaTruck,
  FaShieldAlt,
  FaCheckCircle,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import { useState } from "react";

const ProductSpecs = ({ product, onAddToCart, onAddToWishlist }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  const handleWishlistClick = () => {
    setIsInWishlist(!isInWishlist);
    onAddToWishlist && onAddToWishlist();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 sticky top-6">
      <h3 className="font-bold text-lg text-gray-900">مشخصات فنی</h3>

      <div className="space-y-3">
        {/* زمان ارسال */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <FaTruck className="text-lg" />
            <span>زمان ارسال</span>
          </div>
          <span className="text-blue-600 font-medium">
            {product.deliveryTime}
          </span>
        </div>

        {/* ضمانت */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <FaShieldAlt className="text-lg" />
            <span>ضمانت</span>
          </div>
          <span className="text-green-600 font-medium">
            {product.hasWarranty ? "۱۲ ماه" : "ندارد"}
          </span>
        </div>

        {/* وضعیت موجودی */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <FaCheckCircle className="text-lg" />
            <span>موجودی</span>
          </div>
          <span
            className={
              product.inStock
                ? "text-green-600 font-medium"
                : "text-red-600 font-medium"
            }
          >
            {product.inStock ? "موجود" : "ناموجود"}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        {/* قیمت */}
        <div className="space-y-2 mb-6">
          {hasDiscount && (
            <div className="text-gray-400 line-through text-sm">
              {formatPrice(product.originalPrice)} تومان
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            <span className="text-gray-600">تومان</span>
          </div>
          {hasDiscount && (
            <div className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded inline-block">
              {Math.round((1 - product.price / product.originalPrice) * 100)}%
              تخفیف
            </div>
          )}
        </div>

        {/* دکمه‌ها */}
        <div className="space-y-3">
          <button
            onClick={onAddToCart}
            className="w-full bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!product.inStock}
          >
            افزودن به سبد خرید
          </button>

          <button
            onClick={handleWishlistClick}
            className={`w-full border py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
              isInWishlist
                ? "border-red-300 text-red-600 bg-red-50 hover:bg-red-100"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {isInWishlist ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}
            {isInWishlist ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecs;
