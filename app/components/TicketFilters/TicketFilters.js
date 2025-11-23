// app/components/TicketFilters/TicketFilters.js
import { FiSearch, FiFilter, FiX } from "react-icons/fi";

export default function TicketFilters({
  filters,
  onFilterChange,
  onResetFilters,
}) {
  const categories = [
    { value: "", label: "همه دسته‌بندی‌ها" },
    { value: "technical", label: "فنی" },
    { value: "financial", label: "مالی" },
    { value: "sales", label: "فروش" },
    { value: "general", label: "عمومی" },
  ];

  const priorities = [
    { value: "", label: "همه اولویت‌ها" },
    { value: "low", label: "کم" },
    { value: "medium", label: "متوسط" },
    { value: "high", label: "بالا" },
    { value: "urgent", label: "فوری" },
  ];

  const statuses = [
    { value: "", label: "همه وضعیت‌ها" },
    { value: "open", label: "باز" },
    { value: "answered", label: "پاسخ داده شده" },
    { value: "customer_reply", label: "در انتظار پاسخ" },
    { value: "closed", label: "بسته شده" },
  ];

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
          <FiFilter size={20} className="text-blue-600" />
          فیلترهای پیشرفته
        </h3>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg"
          >
            <FiX size={16} />
            پاک کردن فیلترها
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* جستجو */}
        <div className="relative">
          <FiSearch
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="جستجو موضوع، شماره تیکت یا مشتری..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full p-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* دسته‌بندی */}
        <select
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* اولویت */}
        <select
          value={filters.priority}
          onChange={(e) => onFilterChange("priority", e.target.value)}
          className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          {priorities.map((pri) => (
            <option key={pri.value} value={pri.value}>
              {pri.label}
            </option>
          ))}
        </select>

        {/* وضعیت */}
        <select
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
