// app/admin/products/components/SearchAndFilters.js
"use client";
import { FiSearch, FiFilter } from "react-icons/fi";

const SearchAndFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  stockStatus,
  onStockStatusChange,
  categories,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* جستجو */}
        <div className="flex-1 w-full lg:w-auto">
          <div className="relative">
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="جستجو بر اساس نام محصول یا SKU..."
              className="w-full lg:w-80 pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* فیلتر دسته‌بندی */}
        <div className="w-full lg:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full lg:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="همه">همه دسته‌بندی‌ها</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* فیلتر وضعیت موجودی */}
        <div className="w-full lg:w-auto">
          <select
            value={stockStatus}
            onChange={(e) => onStockStatusChange(e.target.value)}
            className="w-full lg:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="همه">همه وضعیت‌ها</option>
            <option value="available">موجود</option>
            <option value="outofstock">ناموجود</option>
          </select>
        </div>

        {/* نمایش آیکون فیلتر */}
        <div className="p-2 bg-gray-100 rounded-lg">
          <FiFilter className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;
