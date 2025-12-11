// components/Navbar.jsx
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
      {/* نوبار اصلی */}
      <header className="w-full bg-white z-50 shadow-sm relative">
        <div className="container text-gray-900 max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-5 lg:gap-10 py-4 md:py-4 pt-2 md:pt-4 px-4">
            {/* لوگو */}
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

            {/* نوار جستجو */}
            <div className="relative w-full max-w-2xl">
              <form
                onSubmit={handleSearch}
                className="px-3 w-full h-11 sm:h-12 lg:h-15 rounded-2xl border bg-white border-gray-300 transition-colors flex justify-center items-center hover:border-gray-400 focus-within:border-gray-600"
              >
                <div className="flex items-center flex-1 pr-2 sm:pr-4 h-full">
                  <button type="submit" className="h-full cursor-pointer">
                    <FaSearch className="text-gray-900 text-lg lg:text-xl" />
                  </button>
                  <input
                    placeholder="دنبال چی هستی؟..."
                    type="text"
                    className="w-full pl-2 pr-3 sm:px-4 outline-none text-black bg-transparent h-full rounded-full text-sm lg:text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="text-white hidden lg:block w-28 bg-gray-900 h-10 rounded-2xl hover:brightness-105 transition-all hover:bg-gray-800 cursor-pointer"
                >
                  جستجو
                </button>
              </form>
            </div>

            {/* بخش کاربر و سبد خرید - فقط در دسکتاپ */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8 mt-1">
              {/* حساب کاربری */}
              <a className="flex items-center gap-4 lg:gap-8" href="/login">
                <div className="text-gray-900 p-3 hover:bg-gray-50 rounded-2xl transition-all duration-200 hover:shadow-sm">
                  <div className="flex gap-4">
                    <div>
                      <LuUser className="mt-2 text-3xl" />
                    </div>
                    <div className="hidden sm:block">
                      <p className="font-thin text-xs text-gray-900">ورود به</p>
                      <p>حساب کاربری</p>
                    </div>
                  </div>
                </div>
              </a>

              {/* سبد خرید */}
              <div className="flex items-center gap-4 lg:gap-8 mt-1 cursor-pointer">
                <div className="text-gray-900 p-3 hover:bg-gray-50 rounded-2xl transition-all duration-200 hover:shadow-sm">
                  <div className="flex gap-4">
                    <div className="relative">
                      <p className="bg-gray-900 text-white rounded-full text-center w-4 text-xs absolute -top-1 -right-1">
                        {cartCount}
                      </p>
                      <LuShoppingCart className="text-2xl" />
                    </div>
                    <div className="hidden sm:block">
                      <p className="font-thin text-xs text-gray-900">مبلغ</p>
                      <p>۰ تومان</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* منوی اصلی - فقط در دسکتاپ */}
          <nav className="items-center pb-4 hidden md:flex px-4 relative">
            {/* دسته بندی ها */}
            <div className="hidden md:block relative" ref={categoryMenuRef}>
              <div
                className="flex bg-gray-50 w-48 rounded-2xl hover:shadow-lg transition-all duration-200 relative cursor-pointer border border-transparent hover:border-gray-200"
                onClick={toggleCategoryMenu}
                ref={categoryButtonRef}
              >
                <div className="flex w-full">
                  <button
                    type="button"
                    className="relative items-center box-border appearance-none select-none whitespace-nowrap font-normal overflow-hidden outline-none w-full py-4 flex justify-start gap-4 cursor-pointer px-4 rounded-2xl hover:rounded-b-none transition-all duration-200"
                  >
                    <FaBars className="text-lg" />
                    دسته بندی ها
                  </button>
                </div>
              </div>

              {/* منوی دسته بندی ها */}
              {isCategoryOpen && (
                <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 border-t-0">
                  <div className="py-2">
                    <a
                      href="/category/mobile"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all duration-200 hover:pr-6 text-gray-700 hover:text-gray-900"
                    >
                      <FaMobileAlt className="text-gray-600" />
                      گوشی موبایل
                    </a>
                    <a
                      href="/category/tablet"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all duration-200 hover:pr-6 text-gray-700 hover:text-gray-900"
                    >
                      <FaTabletAlt className="text-gray-600" />
                      تبلت
                    </a>
                    <a
                      href="/category/laptop"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all duration-200 hover:pr-6 text-gray-700 hover:text-gray-900"
                    >
                      <FaLaptop className="text-gray-600" />
                      لپ تاپ
                    </a>
                    <a
                      href="/category/accessories"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all duration-200 hover:pr-6 text-gray-700 hover:text-gray-900"
                    >
                      <HiOutlineShoppingBag className="text-gray-600" />
                      لوازم جانبی
                    </a>
                    <a
                      href="/category/headphone"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all duration-200 hover:pr-6 text-gray-700 hover:text-gray-900"
                    >
                      <LuHeadphones className="text-gray-600" />
                      هدفون و هندزفری
                    </a>
                    <a
                      href="/category/smartwatch"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all duration-200 hover:pr-6 text-gray-700 hover:text-gray-900"
                    >
                      <FaRegClock className="text-gray-600" />
                      ساعت هوشمند
                    </a>
                    <a
                      href="/category/electronics"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all duration-200 hover:pr-6 text-gray-700 hover:text-gray-900"
                    >
                      <HiOutlineChip className="text-gray-600" />
                      گجت و الکترونیک
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* لینک های منو */}
            <div className="pr-12 flex items-center justify-between gap-5">
              <div className="flex justify-between gap-5 pt-1">
                <a
                  className="px-3 py-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-all duration-200 hover:text-gray-900 text-gray-700"
                  href="/shop"
                >
                  فروشگاه
                </a>
                <a
                  className="px-3 py-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-all duration-200 hover:text-gray-900 text-gray-700"
                  href="/blog"
                >
                  بلاگ
                </a>
                <a
                  className="px-3 py-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-all duration-200 hover:text-gray-900 text-gray-700"
                  href="/career"
                >
                  موقعیت های شغلی
                </a>
                <a
                  className="px-3 py-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-all duration-200 hover:text-gray-900 text-gray-700"
                  href="/faq"
                >
                  سوالات متداول
                </a>
                <a
                  className="px-3 py-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-all duration-200 hover:text-gray-900 text-gray-700"
                  href="/contact-us"
                >
                  تماس با ما
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* نوبار پایین برای موبایل */}
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
              className="w-full focus:text-primary hover:text-primary justify-center inline-block text-center pt-2 pb-1 transition-all duration-200 active:scale-95"
              href="/"
            >
              <div className="py-1">
                <FaHome className="inline-block mb-1 text-lg" />
                <span className="tab tab-home block text-xs">خانه</span>
              </div>
            </a>

            <a
              className="w-full focus:text-primary hover:text-primary justify-center inline-block text-center pt-2 pb-1 transition-all duration-200 active:scale-95"
              href="/cats"
            >
              <div className="py-1">
                <FaList className="inline-block mb-1 text-lg" />
                <div className="tab tab-home block text-xs p-0.5">دسته ها</div>
              </div>
            </a>

            <div className="w-full focus:text-primary hover:text-primary justify-center inline-block text-center pt-2 pb-1 transition-all duration-200 active:scale-95">
              <div className="py-1">
                <LuShoppingCart className="inline-block mb-1 text-lg" />
                <div className="tab tab-home block text-xs p-0.5">سبد خرید</div>
              </div>
            </div>

            <a
              className="w-full focus:text-primary hover:text-primary justify-center inline-block text-center pt-2 pb-1 transition-all duration-200 active:scale-95"
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
