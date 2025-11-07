// components/BannerSection2/BannerSection2.js
"use client";

import React from "react";

const BannerSection2 = () => {
  const banners = [
    {
      id: 1,
      href: "https://tec.shuner.ir/",
      desktopImage:
        "https://tec.shuner.ir/wp-content/uploads/2025/08/Frame-6-min-1-1.webp",
      mobileImage:
        "https://tec.shuner.ir/wp-content/uploads/2025/08/Frame-14-2-min-1-1.webp",
    },
    {
      id: 2,
      href: "https://tec.shuner.ir/",
      desktopImage:
        "https://tec.shuner.ir/wp-content/uploads/2025/08/Frame-13-min-1-1.webp",
      mobileImage:
        "https://tec.shuner.ir/wp-content/uploads/2025/08/Frame-15-1-min-1-1.webp",
    },
  ];

  return (
    <div className="container mb-28 text-[#1B1F22] flex flex-col md:flex-row justify-between items-center gap-3 my-10">
      {banners.map((banner) => (
        <a
          key={banner.id}
          href={banner.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-3xl w-full"
        >
          {/* تصویر دسکتاپ */}
          <img
            src={banner.desktopImage}
            alt={`Banner ${banner.id}`}
            className="w-full border border-gray-200 object-cover max-md:hidden rounded-3xl"
          />

          {/* تصویر موبایل */}
          <img
            src={banner.mobileImage}
            alt={`Banner ${banner.id} Mobile`}
            className="w-full border border-gray-200 object-cover max-md:min-h-[165px] md:hidden rounded-3xl"
          />

          {/* افکت hover */}
          <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-linear-to-r from-white/0 via-[--bg-primary-10] to-white/0 rotate-12 pointer-events-none transition-all duration-1000 group-hover:left-[125%]"></span>
        </a>
      ))}
    </div>
  );
};

export default BannerSection2;
