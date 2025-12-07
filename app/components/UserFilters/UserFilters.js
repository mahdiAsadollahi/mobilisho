// app/admin/users/components/UserFilters.js
"use client";
import { FiSearch, FiFilter, FiCalendar } from "react-icons/fi";

function UserFilters({ filters, onFilterChange, onResetFilters }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <FiFilter size={18} />
          فیلترهای پیشرفته
        </h3>
        <button
          onClick={onResetFilters}
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          پاک کردن فیلترها
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو نام، ایمیل یا شماره تلفن..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={filters.role}
          onChange={(e) => onFilterChange("role", e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">همه نقش‌ها</option>
          <option value="user">کاربر عادی</option>
          <option value="admin">ادمین</option>
          <option value="moderator">مدیر محتوا</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">همه وضعیت‌ها</option>
          <option value="active">فعال</option>
          <option value="inactive">غیرفعال</option>
          <option value="banned">مسدود</option>
        </select>

        <div className="relative">
          <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="از تاریخ (1402/12/01)"
            value={filters.dateFrom}
            onChange={(e) => onFilterChange("dateFrom", e.target.value)}
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}

export default UserFilters;
