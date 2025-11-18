"use client";

// app/components/ui/FilterPanel/FilterPanel.js
import { useState, useEffect } from "react";
import { FiX, FiSliders } from "react-icons/fi";

const FilterPanel = ({
  showFilter,
  setShowFilter,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
  searchQuery,
  setSearchQuery,
}) => {
  const categories = ["لپ تاپ", "ایرپاد", "هدست"];
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const resetFilters = () => {
    setSortBy("default");
    setPriceRange([0, 300000000]);
    setLocalPriceRange([0, 300000000]);
    setSelectedCategories([]);
    setSearchQuery("");
  };

  const applyFilters = () => {
    setPriceRange(localPriceRange);
    setShowFilter(false);
  };

  // همگام‌سازی local state با props
  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  // جلوگیری از اسکرول بدنه وقتی فیلتر باز است
  useEffect(() => {
    if (showFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showFilter]);

  return (
    <>
      {/* Backdrop با شفافیت کمتر */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          showFilter
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowFilter(false)}
      />

      {/* پنل فیلتر */}
      <div
        className={`fixed right-0 top-0 h-full w-80 sm:w-96 bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 z-50 ${
          showFilter ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* هدر پنل */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <FiSliders className="text-gray-600 dark:text-gray-400" />
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              فیلتر محصولات
            </h2>
          </div>
          <button
            onClick={() => setShowFilter(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* محتوای پنل */}
        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-120px)]">
          {/* جستجوی متنی */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              جستجوی محصولات
            </h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="نام محصول را جستجو کنید..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* مرتب‌سازی */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              مرتب‌سازی بر اساس
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="default">پیش‌فرض</option>
              <option value="price-low">قیمت: کم به زیاد</option>
              <option value="price-high">قیمت: زیاد به کم</option>
              <option value="rating">بالاترین امتیاز</option>
            </select>
          </div>

          {/* محدوده قیمت */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              محدوده قیمت
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">
                  حداقل: {localPriceRange[0].toLocaleString()} تومان
                </label>
                <input
                  type="range"
                  min="0"
                  max="300000000"
                  step="1000000"
                  value={localPriceRange[0]}
                  onChange={(e) =>
                    setLocalPriceRange([
                      parseInt(e.target.value),
                      localPriceRange[1],
                    ])
                  }
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">
                  حداکثر: {localPriceRange[1].toLocaleString()} تومان
                </label>
                <input
                  type="range"
                  min="0"
                  max="300000000"
                  step="1000000"
                  value={localPriceRange[1]}
                  onChange={(e) =>
                    setLocalPriceRange([
                      localPriceRange[0],
                      parseInt(e.target.value),
                    ])
                  }
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                />
              </div>
            </div>
          </div>

          {/* دسته‌بندی */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              دسته‌بندی
            </h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 ml-3 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* دکمه‌های اعمال و بازنشانی */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex gap-3">
            <button
              onClick={resetFilters}
              className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              بازنشانی
            </button>
            <button
              onClick={applyFilters}
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              اعمال فیلتر
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
