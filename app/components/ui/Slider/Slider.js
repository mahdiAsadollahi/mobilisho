// components/ui/Slider/Slider.js
"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Slider = ({
  products = [],
  productComponent: ProductComponent,
  className = "",
  slidesPerView = "auto",
}) => {
  const swiperRef = useRef(null);

  return (
    <div className={`curselCards relative ${className}`}>
      <div className="mx-auto mt-4">
        {/* Gradient overlay */}
        <div
          className="absolute left-0 top-0 bottom-0 w-12 bg-white/30 backdrop-blur-3xl z-10 pointer-events-none md:block hidden"
          style={{
            maskImage:
              "linear-gradient(to right, rgb(170, 170, 170), transparent)",
          }}
        ></div>

        {/* موبایل */}
        <div className="flex overflow-x-auto gap-4 snap-x py-4 scrollbar-hide max-w-full relative md:hidden">
          {products.map((product) => (
            <ProductComponent key={product.id} product={product} />
          ))}
        </div>

        {/* دسکتاپ */}
        <div className="max-w-full relative max-md:hidden">
          <Swiper
            dir="rtl"
            spaceBetween={12}
            slidesPerView={slidesPerView}
            className="mySwiper"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} style={{ width: "323.304px" }}>
                <ProductComponent product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Slider;
