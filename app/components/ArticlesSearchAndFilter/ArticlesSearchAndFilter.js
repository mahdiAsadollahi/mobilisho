// app/components/ArticlesSearchAndFilter/ArticlesSearchAndFilter.js
"use client";

const ArticlesSearchAndFilter = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  statusFilter,
  onStatusFilterChange,
  categories = [],
  statusOptions = [],
  type = "articles"
}) => {
  const getStatusLabel = (status) => {
    const labels = {
      draft: "پیش‌نویس",
      published: "منتشر شده",
      archived: "آرشیو شده"
    };
    return labels[status] || status;
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* جستجو */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            جستجو
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`جستجو در ${type === "articles" ? "مقالات" : "مطالب"}`}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* فیلتر دسته‌بندی */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            دسته‌بندی
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category, index) => (
              <option key={index} value={category === "همه دسته‌بندی‌ها" ? "" : category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* فیلتر وضعیت */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            وضعیت
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map((status, index) => (
              <option key={index} value={status === "همه وضعیت‌ها" ? "" : status}>
                {status === "همه وضعیت‌ها" ? status : getStatusLabel(status)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ArticlesSearchAndFilter;