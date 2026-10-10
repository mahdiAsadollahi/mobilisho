"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { FaHeadphones } from "react-icons/fa";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const RelatedProducts = ({ products }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const isRTL = getComputedStyle(el).direction === "rtl";
    const atStart = isRTL ? scrollLeft >= -2 : scrollLeft <= 2;
    const atEnd = isRTL
      ? Math.abs(scrollLeft) + clientWidth >= scrollWidth - 2
      : scrollLeft + clientWidth >= scrollWidth - 2;

    setCanScrollLeft(!atStart);
    setCanScrollRight(!atEnd);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [products]);

  const scrollByAmount = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cards = container.querySelectorAll("[data-animate]");

    if (prefersReduced) {
      cards.forEach((card) => {
        card.style.opacity = "1";
        card.style.transform = "none";
      });
      return;
    }

    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(24px)";
      card.style.transition =
        "opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target;
          const index = Number(card.dataset.index) || 0;

          if (entry.isIntersecting) {
            setTimeout(() => {
              card.style.transition =
                "opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, index * 60);
          } else {
            card.style.transition =
              "opacity 0.35s ease-in, transform 0.35s ease-in";
            card.style.opacity = "0";
            card.style.transform = "translateY(24px)";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
      observer.disconnect();
    };
  }, [products]);

  if (!products || products.length === 0) return null;

  return (
    <div className="container-full px-2.5 mb-10 text-[#1B1F22] dark:text-gray-100">
      <div className="headCoursel flex-col mt-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 md:gap-4">
            <div className="flex justify-center items-center w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              <FaHeadphones className="text-blue-500 text-xl" />
            </div>
            <div className="flex flex-col items-start justify-center gap-1">
              <h3 className="text-lg md:text-3xl ml-8 tracking-[-0.065em] text-secondary dark:text-white">
                محصولات مرتبط
              </h3>
              <span className="tracking-[-0.065em] text-xs text-gray-400 cursor-pointer hover:text-blue-500 transition-colors duration-200">
                نمایش همه
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => scrollByAmount("prev")}
              disabled={!canScrollLeft}
              aria-label="محصولات قبلی"
              className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 ease-out hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-800 disabled:hover:text-gray-600 dark:disabled:hover:text-gray-300 disabled:hover:border-gray-200 dark:disabled:hover:border-gray-700 disabled:hover:shadow-sm disabled:hover:translate-y-0"
            >
              <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollByAmount("next")}
              disabled={!canScrollRight}
              aria-label="محصولات بعدی"
              className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 ease-out hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-800 disabled:hover:text-gray-600 dark:disabled:hover:text-gray-300 disabled:hover:border-gray-200 dark:disabled:hover:border-gray-700 disabled:hover:shadow-sm disabled:hover:translate-y-0"
            >
              <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        <div className="curselCards relative">
          <div className="mx-auto mt-4">
            <div
              className={`pointer-events-none absolute right-0 top-0 bottom-4 w-16 z-10 hidden md:block bg-linear-to-l from-white dark:from-gray-900 to-transparent transition-opacity duration-300 ${
                canScrollLeft ? "opacity-100" : "opacity-0"
              }`}
            />

            <div
              className={`pointer-events-none absolute left-0 top-0 bottom-4 w-16 z-10 hidden md:block bg-linear-to-r from-white dark:from-gray-900 to-transparent transition-opacity duration-300 ${
                canScrollRight ? "opacity-100" : "opacity-0"
              }`}
            />

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products.map((product, index) => (
                <div
                  key={index}
                  data-animate
                  data-index={index}
                  className="min-w-[280px] shrink-0 will-change-transform"
                >
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
