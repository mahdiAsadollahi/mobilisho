"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaSearch,
  FaHome,
  FaList,
  FaBars,
  FaMobileAlt,
  FaTabletAlt,
  FaRegClock,
  FaLaptop,
} from "react-icons/fa";
import { HiOutlineChip, HiOutlineShoppingBag } from "react-icons/hi";
import { LuShoppingCart, LuUser, LuHeadphones } from "react-icons/lu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const categoryMenuRef = useRef(null);
  const categoryButtonRef = useRef(null);

  const toggleCategoryMenu = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target) &&
        categoryButtonRef.current &&
        !categoryButtonRef.current.contains(event.target)
      ) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("جستجو برای:", searchQuery);
  };

  return (
    <>
      <header className="w-full bg-white z-50 shadow-sm relative border-b border-gray-100">
        <div className="container text-gray-900 max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-5 lg:gap-10 py-4 md:py-4 pt-2 md:pt-4 px-4">
            <div>
              <a
                className="text-gray-900 flex justify-center items-center"
                href="/"
              >
                <img
                  loading="lazy"
                  className="hidden md:block h-12"
                  src="/img/logo.png"
                  alt="فروشگاه موبایلی شو"
                />
                <img
                  loading="lazy"
                  className="block md:hidden h-10"
                  src="/img/logo.png"
                  alt="فروشگاه موبایلی شو"
                />
              </a>
            </div>

            <div className="relative w-full max-w-2xl">
              <form
                onSubmit={handleSearch}
                className="pl-3 pr-1 w-full h-11 sm:h-12 lg:h-14 rounded-2xl border border-gray-200 bg-gray-50 transition-all duration-300 flex justify-center items-center hover:border-gray-300 focus-within:border-gray-400 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-center flex-1 pr-2 sm:pr-4 h-full">
                  <button
                    type="submit"
                    className="h-full cursor-pointer text-gray-400 hover:text-gray-700 transition-colors duration-200"
                  >
                    <FaSearch className="text-base lg:text-lg" />
                  </button>
                  <input
                    placeholder="دنبال چی هستی؟..."
                    type="text"
                    className="w-full pl-2 pr-3 sm:px-4 outline-none text-black bg-transparent h-full text-sm lg:text-base placeholder:text-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="text-gray-700 hidden lg:block w-24 bg-gray-100 border border-gray-200 h-9 rounded-xl hover:bg-gray-200 hover:text-gray-900 hover:border-gray-300 transition-all duration-200 cursor-pointer text-sm font-medium active:scale-[0.98]"
                >
                  جستجو
                </button>
              </form>
            </div>

            <div className="hidden md:flex items-center gap-3 lg:gap-5 mt-1">
              <a
                className="group flex items-center gap-3 px-4 py-3 rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98]"
                href="/login"
              >
                <div className="relative">
                  <LuUser className="text-2xl group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="hidden sm:block leading-tight">
                  <p className="text-[11px] text-emerald-50/90 font-light">
                    خوش آمدید
                  </p>
                  <p className="font-semibold text-sm">ورود | ثبت نام</p>
                </div>
              </a>

              <div className="group flex items-center gap-3 px-4 py-3 rounded-2xl bg-linear-to-br from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.98] cursor-pointer">
                <div className="relative">
                  <p className="bg-white text-orange-500 rounded-full text-center w-5 h-5 text-[10px] font-bold absolute -top-2 -right-2 flex items-center justify-center shadow-sm">
                    {cartCount}
                  </p>
                  <LuShoppingCart className="text-2xl group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="hidden sm:block leading-tight">
                  <p className="text-[11px] text-orange-50/90 font-light">
                    سبد خرید
                  </p>
                  <p className="font-semibold text-sm">۰ تومان</p>
                </div>
              </div>
            </div>
          </div>

          <nav className="items-center pb-4 hidden md:flex px-4 relative">
            <div className="hidden md:block relative" ref={categoryMenuRef}>
              <div
                className="flex bg-gray-50 w-48 rounded-2xl hover:shadow-md transition-all duration-200 relative cursor-pointer border border-transparent hover:border-gray-200"
                onClick={toggleCategoryMenu}
                ref={categoryButtonRef}
              >
                <div className="flex w-full">
                  <button
                    type="button"
                    className="relative items-center box-border appearance-none select-none whitespace-nowrap font-normal overflow-hidden outline-none w-full py-4 flex justify-start gap-4 cursor-pointer px-4 rounded-2xl hover:rounded-b-none transition-all duration-200"
                  >
                    <FaBars className="text-lg text-gray-700" />
                    <span className="font-medium text-gray-700">
                      دسته بندی ها
                    </span>
                  </button>
                </div>
              </div>

              {isCategoryOpen && (
                <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 border-t-0 rounded-t-none">
                  <div className="py-2">
                    <a
                      href="/category/mobile"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-900 hover:text-white transition-all duration-200 hover:pr-6 text-gray-700"
                    >
                      <FaMobileAlt className="text-gray-600 group-hover:text-white" />
                      گوشی موبایل
                    </a>
                    <a
                      href="/category/tablet"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-900 hover:text-white transition-all duration-200 hover:pr-6 text-gray-700"
                    >
                      <FaTabletAlt className="text-gray-600" />
                      تبلت
                    </a>
                    <a
                      href="/category/laptop"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-900 hover:text-white transition-all duration-200 hover:pr-6 text-gray-700"
                    >
                      <FaLaptop className="text-gray-600" />
                      لپ تاپ
                    </a>
                    <a
                      href="/category/accessories"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-900 hover:text-white transition-all duration-200 hover:pr-6 text-gray-700"
                    >
                      <HiOutlineShoppingBag className="text-gray-600" />
                      لوازم جانبی
                    </a>
                    <a
                      href="/category/headphone"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-900 hover:text-white transition-all duration-200 hover:pr-6 text-gray-700"
                    >
                      <LuHeadphones className="text-gray-600" />
                      هدفون و هندزفری
                    </a>
                    <a
                      href="/category/smartwatch"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-900 hover:text-white transition-all duration-200 hover:pr-6 text-gray-700"
                    >
                      <FaRegClock className="text-gray-600" />
                      ساعت هوشمند
                    </a>
                    <a
                      href="/category/electronics"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-900 hover:text-white transition-all duration-200 hover:pr-6 text-gray-700 rounded-b-2xl"
                    >
                      <HiOutlineChip className="text-gray-600" />
                      گجت و الکترونیک
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="pr-12 flex items-center justify-between gap-5">
              <div className="flex justify-between gap-5 pt-1">
                <a
                  className="px-3 py-2 hover:bg-gray-100 rounded-xl cursor-pointer transition-all duration-200 text-gray-700 hover:text-gray-900"
                  href="/shop"
                >
                  فروشگاه
                </a>
                <a
                  className="px-3 py-2 hover:bg-gray-100 rounded-xl cursor-pointer transition-all duration-200 text-gray-700 hover:text-gray-900"
                  href="/blog"
                >
                  بلاگ
                </a>
                <a
                  className="px-3 py-2 hover:bg-gray-100 rounded-xl cursor-pointer transition-all duration-200 text-gray-700 hover:text-gray-900"
                  href="/career"
                >
                  موقعیت های شغلی
                </a>
                <a
                  className="px-3 py-2 hover:bg-gray-100 rounded-xl cursor-pointer transition-all duration-200 text-gray-700 hover:text-gray-900"
                  href="/faq"
                >
                  سوالات متداول
                </a>
                <a
                  className="px-3 py-2 hover:bg-gray-100 rounded-xl cursor-pointer transition-all duration-200 text-gray-700 hover:text-gray-900"
                  href="/contact-us"
                >
                  تماس با ما
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <section
        id="bottom-navigation"
        className="block fixed inset-x-0 bottom-0 md:hidden m-2 mr-0 p-1 z-50 w-full"
      >
        <div
          id="tabs"
          className="flex justify-between mx-2 bg-white z-50 rounded-3xl shadow-lg p-1 mr-5 items-center md:hidden border border-gray-200"
        >
          <div className="md:hidden flex justify-between w-full items-center">
            <a
              className="w-full focus:text-gray-900 hover:text-gray-900 justify-center inline-block text-center pt-2 pb-1 transition-all duration-200 active:scale-95 text-gray-600"
              href="/"
            >
              <div className="py-1">
                <FaHome className="inline-block mb-1 text-lg" />
                <span className="tab tab-home block text-xs">خانه</span>
              </div>
            </a>

            <a
              className="w-full focus:text-gray-900 hover:text-gray-900 justify-center inline-block text-center pt-2 pb-1 transition-all duration-200 active:scale-95 text-gray-600"
              href="/cats"
            >
              <div className="py-1">
                <FaList className="inline-block mb-1 text-lg" />
                <div className="tab tab-home block text-xs p-0.5">دسته ها</div>
              </div>
            </a>

            <div className="w-full focus:text-gray-900 hover:text-gray-900 justify-center inline-block text-center pt-2 pb-1 transition-all duration-200 active:scale-95 text-gray-600 relative">
              <div className="py-1">
                <div className="relative inline-block">
                  <p className="bg-orange-500 text-white rounded-full text-center w-4 h-4 text-[10px] font-bold absolute -top-1 -right-2 flex items-center justify-center">
                    {cartCount}
                  </p>
                  <LuShoppingCart className="inline-block mb-1 text-lg" />
                </div>
                <div className="tab tab-home block text-xs p-0.5">سبد خرید</div>
              </div>
            </div>

            <a
              className="w-full focus:text-gray-900 hover:text-gray-900 justify-center inline-block text-center pt-2 pb-1 transition-all duration-200 active:scale-95 text-gray-600"
              href="/login"
            >
              <div className="py-1">
                <LuUser className="inline-block mb-1 text-lg" />
                <div className="tab tab-home block text-xs p-0.5">
                  ورود | ثبت نام
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
