// components/ui/ProductCard/ProductCard.js
"use client";

import Link from "next/link";
import {
  FaStar,
  FaTruck,
  FaHeart,
  FaRegHeart,
  FaFire,
  FaBolt,
  FaShieldAlt,
  FaCrown,
} from "react-icons/fa";
import {
  IoDiamondOutline,
  IoBagCheckOutline,
  IoFlashOutline,
} from "react-icons/io5";
import { GiPriceTag, GiThreeLeaves } from "react-icons/gi";
import TomanIcon from "../TomanIcon/TomanIcon";

const ProductCard = ({ product, className = "" }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  return (
    <div
      className={`group bg-white snap-start relative rounded-3xl max-w-[301px] min-w-[268.9px] max-h-[388px] max-md:max-h-[330px] max-md:min-w-[190px] p-4 border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer max-md:max-w-[240px] ${className}`}
    >
      <Link href={product.href} className="block h-full">
        {/* تصویر محصول */}
        <div className="relative">
          <div className="w-full flex justify-center items-center">
            <div className="aspect-square overflow-hidden rounded-2xl w-[200px] bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
              <img
                loading="lazy"
                src={product.image}
                alt={product.name}
                className="object-cover object-center w-full h-full mix-blend-multiply rounded-2xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* ریتینگ */}
          <div className="absolute left-2 top-2 flex items-start">
            <div className="flex gap-1 flex-row-reverse rounded-xl px-2 py-1 items-center justify-center bg-white/90 backdrop-blur-sm shadow-sm">
              <FaStar className="text-yellow-400 fill-current" size={14} />
              <div className="text-[13px] font-medium text-gray-700">
                {product.rating || 0}
              </div>
            </div>
          </div>

          {/* آیکون ارسال رایگان */}
          {product.freeShipping && (
            <div className="absolute right-2 top-2 flex items-start">
              <div className="flex gap-1 flex-row-reverse rounded-xl px-2 py-1 items-center justify-center bg-green-500 text-white shadow-sm">
                <FaTruck size={12} />
                <span className="text-[10px] font-medium">رایگان</span>
              </div>
            </div>
          )}

          {/* آیکون گارانتی */}
          {product.warranty && (
            <div className="absolute left-2 bottom-2 flex items-start">
              <div className="flex gap-1 flex-row-reverse rounded-xl px-2 py-1 items-center justify-center bg-blue-500 text-white shadow-sm">
                <FaShieldAlt size={12} />
                <span className="text-[10px] font-medium">
                  {product.warranty}
                </span>
              </div>
            </div>
          )}

          {/* آیکون علاقه‌مندی */}
          <button
            className="absolute right-2 bottom-2 flex items-center justify-center w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 transition-all duration-200 opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle add to wishlist
            }}
          >
            <FaRegHeart
              size={14}
              className="text-gray-400 group-hover:text-red-500 transition-colors"
            />
          </button>
        </div>

        {/* عنوان محصول */}
        <h3 className="text-sm md:text-[15px] text-gray-800 mt-4 mb-16 h-[60px] text-right overflow-hidden leading-6 font-medium line-clamp-2">
          {product.name}
        </h3>

        {/* قیمت و اطلاعات */}
        <div className="absolute bottom-4 left-4 right-4">
          {/* قیمت با تخفیف */}
          {hasDiscount && (
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <GiPriceTag className="text-gray-400 text-lg" />
                <span className="line-through text-gray-400 text-sm font-medium">
                  {formatPrice(product.originalPrice)}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs bg-gradient-to-r from-primary to-primary/90 text-white px-3 py-1 rounded-full font-medium shadow-sm">
                <IoFlashOutline size={12} />
                {product.discount}% تخفیف
              </div>
            </div>
          )}

          {/* قیمت اصلی */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-bold text-[16px] flex items-center gap-1">
                {formatPrice(product.price)}
                <TomanIcon />
              </span>

              {/* برچسب پرفروش */}
              {product.isBestSeller && (
                <div className="flex items-center gap-1 text-[10px] bg-orange-500 text-white px-2 py-1 rounded-full font-medium">
                  <FaFire size={10} />
                  پرفروش
                </div>
              )}

              {/* برچسب جدید */}
              {product.isNew && (
                <div className="flex items-center gap-1 text-[10px] bg-green-500 text-white px-2 py-1 rounded-full font-medium">
                  <GiThreeLeaves size={10} />
                  جدید
                </div>
              )}

              {/* برچسب ویژه */}
              {product.isSpecial && (
                <div className="flex items-center gap-1 text-[10px] bg-purple-500 text-white px-2 py-1 rounded-full font-medium">
                  <FaCrown size={10} />
                  ویژه
                </div>
              )}
            </div>

            {/* موجودی */}
            <div
              className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded-full font-medium ${
                product.inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.inStock ? (
                <>
                  <IoBagCheckOutline size={12} />
                  موجود
                </>
              ) : (
                <>
                  <FaBolt size={12} />
                  ناموجود
                </>
              )}
            </div>
          </div>

          {/* نوار پیشرفت موجودی */}
          {product.stockPercentage && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div
                  className="bg-green-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${product.stockPercentage}%` }}
                ></div>
              </div>
              <div className="text-[10px] text-gray-500 text-left mt-1 flex items-center gap-1">
                <IoDiamondOutline size={10} />
                تنها {product.stockCount} عدد در انبار باقی مانده
              </div>
            </div>
          )}
        </div>

        {/* افکت هاور */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300 pointer-events-none"></div>
      </Link>
    </div>
  );
};


export default ProductCard;
