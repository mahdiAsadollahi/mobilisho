// components/ImageSlider.js
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ImageSlider = ({ slides }) => {
  const sliderData = slides || [
    {
      mobile:
        "https://tec.shuner.ir/wp-content/uploads/2025/08/Frame-10-min-1-1.webp",
      desktop:
        "https://tec.shuner.ir/wp-content/uploads/2025/08/Frame-7-min-2-1.webp",
      alt: "Slide 1",
    },
    {
      mobile:
        "https://tec.shuner.ir/wp-content/uploads/2025/08/Frame-11-min-1-1.webp",
      desktop:
        "https://tec.shuner.ir/wp-content/uploads/2025/08/Frame-8-min-2-1.webp",
      alt: "Slide 2",
    },
    {
      mobile:
        "https://tec.shuner.ir/wp-content/uploads/2025/08/Frame-12-min-1-1.webp",
      desktop:
        "https://tec.shuner.ir/wp-content/uploads/2025/08/Frame-9-min-3-1.webp",
      alt: "Slide 3",
    },
  ];

  return (
    <div className="w-full container mx-auto px-4">
      <Swiper
        dir="rtl"
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={600}
        className="swiper-main rounded-none relative md:-mt-12"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative border border-gray-200 max-md:mt-4 mt-16 md:h-[360px] h-80 w-full max-w-[97%] mx-auto flex items-center rounded-3xl overflow-hidden">
              {/* تصویر موبایل */}
              <div className="w-full h-full md:hidden flex">
                <img
                  src={slide.mobile}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* تصویر دسکتاپ */}
              <img
                src={slide.desktop}
                alt={slide.alt}
                className="w-full h-full object-cover max-md:hidden"
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Pagination */}
        <div className="custom-pagination" />
      </Swiper>
    </div>
  );
};

export default ImageSlider;
