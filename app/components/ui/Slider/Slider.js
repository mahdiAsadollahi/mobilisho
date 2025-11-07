// components/ui/Slider/Slider.js
"use client";

import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Slider = ({
  products = [],
  productComponent: ProductComponent,
  className = "",
  slidesPerView = "auto",
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

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
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
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

          {/* Navigation buttons */}
          <button
            ref={prevRef}
            className="hidden md:flex absolute -left-6 z-10 top-2/4 -translate-y-1/2 hover:bg-[#f7f8fa] hover:text-black text-black backdrop-blur-lg rounded-xl shadow px-2 py-[20px] transition-all"
          >
            <FaChevronRight size={20} />
          </button>
          <button
            ref={nextRef}
            className="hidden md:flex absolute -right-6 z-10 top-2/4 -translate-y-1/2 hover:bg-[#f7f8fa] hover:text-black text-black backdrop-blur-lg rounded-xl shadow px-2 py-[20px] transition-all"
          >
            <FaChevronLeft size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
