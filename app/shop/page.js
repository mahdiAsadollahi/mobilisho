"use client";

// app/products/page.js
import ProductCard from "@/app/components/ui/ProductCard/ProductCard";
import FilterPanel from "@/app/components/ui/FilterPanel/FilterPanel";
import { useState } from "react";
import { FiFilter, FiChevronRight, FiChevronLeft } from "react-icons/fi";

export default function ProductsPage() {
  // داده‌های نمونه برای محصولات
  const products = [
    {
      id: 1,
      name: "ایرپاد پرو ۲ اورجینال اپل - نات اکتیو",
      price: 16499000,
      originalPrice: 17500000,
      discount: "۶%",
      rating: 4.8,
      image: "https://tec.shuner.ir/wp-content/uploads/2025/07/1-min-1.webp",
      href: "https://tec.shuner.ir/product/airpods-pro-2nd-generation/",
    },
    {
      id: 2,
      name: "هدست پلی استیشن سونی اسلیم چریکی",
      price: 4750000,
      originalPrice: 4900000,
      discount: "۳%",
      rating: 4.5,
      image: "https://tec.shuner.ir/wp-content/uploads/2025/07/1-min.png",
      href: "https://tec.shuner.ir/product/%d9%87%d8%af%d8%b3%d8%aa-%d9%be%d9%84%db%8c-%d8%a7%d8%b3%d8%aa%db%8c%d8%b4%d9%86-%d8%b3%d9%88%d9%86%db%8c-%d8%a7%d8%b3%d9%84%db%8c%d9%85-%da%86%d8%b1%db%8c%da%a9%db%8c-%d9%85%d8%af%d9%84-pulse-elite-w/",
    },
    {
      id: 3,
      name: "لپ تاپ مک بوک پرو ام ۵ مدل 16.2 اینچی اپل",
      price: 252000000,
      rating: 4.9,
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/52911bcdb01c4122759b430697732b2bf538c784_1731164433-1-2.webp",
      href: "https://tec.shuner.ir/product/%d9%84%d9%be-%d8%aa%d8%a7%d9%be-16-2-%d8%a7%db%8c%d9%86%da%86%db%8c-%d8%a7%d9%be%d9%84-%d9%85%d8%af%d9%84-macbook-pro-mx2y3-2024-zpa-m4-pro-48gb-ram-512gb-ssd-2/",
    },
    {
      id: 4,
      name: "لپ تاپ مک بوک ایر ام ۴ مدل ۱۳.۶ اینچی اپل",
      price: 83190000,
      rating: 4.7,
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/bc162fabead2355d769663c0553b534383f4bd79_1746277321.webp",
      href: "https://tec.shuner.ir/product/%d9%84%d9%be-%d8%aa%d8%a7%d9%be-13-6-%d8%a7%db%8c%d9%86%da%86%db%8c-%d8%a7%d9%be%d9%84-%d9%85%d8%af%d9%84-macbook-air-mw0y3-2025-lla-m4-16gb-ram-256gb-ssd-2/",
    },
    {
      id: 5,
      name: "لپ تاپ مک بوک پرو ام ۴ ۲۵۶ گیگ 13.6 اینچی اپل",
      price: 83960000,
      originalPrice: 84000000,
      discount: "۱%",
      rating: 4.6,
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/52911bcdb01c4122759b430697732b2bf538c784_1731164433-1.webp",
      href: "https://tec.shuner.ir/product/%d9%84%d9%be-%d8%aa%d8%a7%d9%be-13-6-%d8%a7%db%8c%d9%86%da%86%db%8c-%d8%a7%d9%be%d9%84-%d9%85%d8%af%d9%84-macbook-air-mc6t4-2025-lla-m4-16gb-ram-256gb-ssd/",
    },
    {
      id: 6,
      name: "لپ تاپ ۱۳.۶ اینچی اپل مدل مک بوک ایر ام ۴ ۲۵۶ گیگ",
      price: 24000000,
      rating: 4.4,
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/c0238c1d2491297411616a5324d47f5bd5ec34d7_1746262597.webp",
      href: "https://tec.shuner.ir/product/th-2/",
    },
    {
      id: 7,
      name: "مک بوک پرو ام ۴ پرو مدل 16.2 اینچی اپل",
      price: 244500000,
      originalPrice: 252000000,
      discount: "۳%",
      rating: 4.9,
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/52911bcdb01c4122759b430697732b2bf538c784_1731164433.webp",
      href: "https://tec.shuner.ir/product/%d9%84%d9%be-%d8%aa%d8%a7%d9%be-16-2-%d8%a7%db%8c%d9%86%da%86%db%8c-%d8%a7%d9%be%d9%84-%d9%85%d8%af%d9%84-macbook-pro-mx2y3-2024-zpa-m4-pro-48gb-ram-512gb-ssd/",
    },
    {
      id: 8,
      name: "لپ تاپ ایر ام ۴ مدل 13.6 اینچی اپل ۲۵۶ گیگ",
      price: 83190000,
      rating: 4.7,
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/bc162fabead2355d769663c0553b534383f4bd79_1746277321.webp",
      href: "https://tec.shuner.ir/product/%d9%84%d9%be-%d8%aa%d8%a7%d9%be-13-6-%d8%a7%db%8c%d9%86%da%86%db%8c-%d8%a7%d9%be%d9%84-%d9%85%d8%af%d9%84-macbook-air-mw0y3-2025-lla-m4-16gb-ram-256gb-ssd/",
    },
    {
      id: 9,
      name: "مک بوک ایر ام ۴ مدل 13.6 اینچی اپل",
      price: 150000000,
      rating: 4.8,
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/c64f6922df52730d343321e396179726f47a7eaf_1746276188-3.webp",
      href: "https://tec.shuner.ir/product/th/",
    },
    {
      id: 10,
      name: "لپ تاپ مک بوک ایر ام ۴ مدل 13.6 اینچی اپل",
      price: 103900000,
      rating: 4.6,
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/c0238c1d2491297411616a5324d47f5bd5ec34d7_1746262597.webp",
      href: "https://tec.shuner.ir/product/pr/",
    },
  ];

  // حالت‌ها برای فیلتر و صفحه‌بندی
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 300000000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // تنظیمات صفحه‌بندی
  const itemsPerPage = 8;

  // فیلتر و مرتب‌سازی محصولات
  const filteredProducts = [...products]
    .filter((product) => {
      if (searchQuery && !product.name.includes(searchQuery)) {
        return false;
      }

      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      if (selectedCategories.length > 0) {
        const productCategory = product.name.includes("ایرپاد")
          ? "ایرپاد"
          : product.name.includes("هدست")
          ? "هدست"
          : "لپ تاپ";
        return selectedCategories.includes(productCategory);
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price;
      } else if (sortBy === "price-high") {
        return b.price - a.price;
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  // محاسبه تعداد صفحات
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // محاسبه محصولات برای صفحه جاری
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // تغییر صفحه
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ساخت لیست صفحات برای Pagination
  const getPaginationItems = () => {
    const items = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      // اگر تعداد صفحات کم است، همه را نمایش بده
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      // همیشه صفحه اول را نمایش بده
      items.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // تنظیم بازه برای نزدیک شدن به ابتدا یا انتها
      if (currentPage <= 3) {
        start = 2;
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }

      // اضافه کردن ... در ابتدا
      if (start > 2) {
        items.push("ellipsis-start");
      }

      // اضافه کردن صفحات میانی
      for (let i = start; i <= end; i++) {
        items.push(i);
      }

      // اضافه کردن ... در انتها
      if (end < totalPages - 1) {
        items.push("ellipsis-end");
      }

      // همیشه صفحه آخر را نمایش بده
      items.push(totalPages);
    }

    return items;
  };

  // کامپوننت صفحه‌بندی
  const Pagination = () => {
    const paginationItems = getPaginationItems();

    return (
      <div className="flex flex-col items-center gap-4 mt-12 mb-8">
        {/* اطلاعات نمایش */}
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          نمایش{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            {startIndex + 1}
          </span>{" "}
          تا{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            {Math.min(startIndex + itemsPerPage, filteredProducts.length)}
          </span>{" "}
          از{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            {filteredProducts.length}
          </span>{" "}
          محصول
        </p>

        {/* دکمه‌های صفحه‌بندی */}
        <nav
          className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center"
          aria-label="صفحه‌بندی"
        >
          {/* دکمه قبلی */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="صفحه قبلی"
            className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 ease-out hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-800 disabled:hover:text-gray-600 dark:disabled:hover:text-gray-300 disabled:hover:border-gray-200 dark:disabled:hover:border-gray-700 disabled:hover:shadow-sm disabled:hover:translate-y-0"
          >
            <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>

          {/* شماره صفحات */}
          {paginationItems.map((item, index) => {
            if (typeof item === "string") {
              return (
                <span
                  key={item}
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-gray-400 dark:text-gray-500 text-sm select-none"
                >
                  …
                </span>
              );
            }

            const isActive = currentPage === item;

            return (
              <button
                key={item}
                onClick={() => handlePageChange(item)}
                aria-label={`صفحه ${item}`}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-sm font-medium transition-all duration-300 ease-out ${
                  isActive
                    ? "bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-900/40 scale-105"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                }`}
              >
                {item}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/80" />
                )}
              </button>
            );
          })}

          {/* دکمه بعدی */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="صفحه بعدی"
            className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 ease-out hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-800 disabled:hover:text-gray-600 dark:disabled:hover:text-gray-300 disabled:hover:border-gray-200 dark:disabled:hover:border-gray-700 disabled:hover:shadow-sm disabled:hover:translate-y-0"
          >
            <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </nav>
      </div>
    );
  };

  return (
    <main className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* هدر صفحه */}
        <div className="flex justify-between items-center mb-6 md:mb-8 mx-2 sm:mx-3">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            محصولات ({filteredProducts.length} محصول)
          </h1>

          {/* دکمه فیلتر */}
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center justify-center gap-2 transition-all cursor-pointer text-xs sm:text-sm btn-outlined btn-lg rounded-xl py-2 sm:py-3 border-2 border-transparent bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 px-3 sm:px-4 shadow-sm hover:shadow-md"
          >
            <span>فیلتر محصولات</span>
            <FiFilter className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* گرید محصولات */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 px-1 sm:px-2">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="w-full"
            />
          ))}
        </div>

        {/* پیام خالی بودن */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <FiFilter className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              محصولی با فیلترهای انتخاب‌شده یافت نشد
            </p>
          </div>
        )}

        {/* صفحه‌بندی */}
        {totalPages > 1 && <Pagination />}
      </div>

      {/* پنل فیلتر */}
      <FilterPanel
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </main>
  );
}
