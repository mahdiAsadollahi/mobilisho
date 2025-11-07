// components/ui/BlogSlider/BlogSlider.js
"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BlogSlider = ({
  posts = [],
  postComponent: PostComponent,
  className = "",
  slidesPerView = "auto",
}) => {
  const swiperRef = useRef(null);

  return (
    <div className={`blogSlider relative ${className}`}>
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
          {posts.map((post) => (
            <div
              key={post.id}
              className="min-w-[280px] max-w-[420px] shrink-0"
            >
              <PostComponent product={post} />
            </div>
          ))}
        </div>

        {/* دسکتاپ */}
        <div className="max-w-full relative max-md:hidden">
          <Swiper
            dir="rtl"
            spaceBetween={16}
            slidesPerView={slidesPerView}
            className="mySwiper"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id} style={{ width: "420px" }}>
                <PostComponent product={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default BlogSlider;
