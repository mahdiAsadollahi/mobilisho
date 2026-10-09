"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Slider = ({
  products = [],
  productComponent: ProductComponent,
  className = "",
  slidesPerView = "auto",
  variant = "default",
  showNavigation = true,
  showEdgeFade = true,
  animateOnView = true,
  staggerDelay = 120,
}) => {
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(!animateOnView);

  const goNext = () => swiperRef.current?.slideNext();
  const goPrev = () => swiperRef.current?.slidePrev();

  const soft = variant === "soft";

  useEffect(() => {
    if (!animateOnView) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHasAnimated(entry.isIntersecting);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animateOnView]);

  const btnBase =
    "w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-xl transition-all duration-300 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm";

  const btnStyle = soft
    ? "bg-white/50 border-white/70 text-gray-700 hover:bg-gray-900/90 hover:text-white hover:border-gray-900/50 hover:shadow-lg hover:shadow-gray-900/25 disabled:hover:bg-white/50 disabled:hover:text-gray-700 disabled:hover:border-white/70 disabled:hover:shadow-sm"
    : "bg-white/80 border-gray-200 text-gray-600 hover:bg-gray-900 hover:text-white hover:border-gray-900 disabled:hover:bg-white/80 disabled:hover:text-gray-400 disabled:hover:border-gray-200";

  const edgeFadeStyle = soft
    ? "from-gray-100/95 via-gray-100/50 to-transparent"
    : "from-white/95 via-white/50 to-transparent";

  const getItemStyle = (index) => {
    if (!animateOnView) return undefined;
    return {
      opacity: hasAnimated ? 1 : 0,
      transform: hasAnimated
        ? "translateY(0) scale(1)"
        : "translateY(40px) scale(0.94)",
      transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${
        index * staggerDelay
      }ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${
        index * staggerDelay
      }ms`,
      willChange: "opacity, transform",
    };
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {showNavigation && (
        <div className="hidden md:flex items-center gap-2 absolute -top-14 left-0 z-20">
          <button
            type="button"
            onClick={goPrev}
            disabled={isBeginning}
            aria-label="قبلی"
            className={`${btnBase} ${btnStyle}`}
          >
            <FaChevronRight className="text-xs" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={isEnd}
            aria-label="بعدی"
            className={`${btnBase} ${btnStyle}`}
          >
            <FaChevronLeft className="text-xs" />
          </button>
        </div>
      )}

      {showEdgeFade && (
        <>
          <div
            className={`absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none hidden md:block bg-linear-to-l ${edgeFadeStyle}`}
          />
          <div
            className={`absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none hidden md:block bg-linear-to-r ${edgeFadeStyle}`}
          />
        </>
      )}

      <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory py-5 px-1 scrollbar-hide max-w-full relative md:hidden">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="snap-start shrink-0"
            style={getItemStyle(index)}
          >
            <ProductComponent product={product} />
          </div>
        ))}
      </div>

      <div className="max-w-full relative max-md:hidden">
        <Swiper
          dir="rtl"
          spaceBetween={16}
          slidesPerView={slidesPerView}
          className="py-4! px-2!"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onReachBeginning={() => setIsBeginning(true)}
          onReachEnd={() => setIsEnd(true)}
        >
          {products.map((product, index) => (
            <SwiperSlide key={product.id} className="w-auto! h-auto!">
              <div style={getItemStyle(index)}>
                <ProductComponent product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
