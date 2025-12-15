// app/components/CategoriesTable/CategoriesTable.js
"use client";
import {
  FiEdit2,
  FiTrash2,
  FiToggleLeft,
  FiToggleRight,
  FiImage,
  FiPackage,
} from "react-icons/fi";
import * as Icons from "react-icons/fi";

const CategoriesTable = ({
  categories,
  onEdit,
  onDelete,
  onToggleStatus,
  loading,
}) => {
  // تابع برای گرفتن آیکون از react-icons
  const getIconComponent = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? (
      <IconComponent className="text-lg" />
    ) : (
      <FiImage className="text-lg" />
    );
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700 whitespace-nowrap">
                اطلاعات دسته‌بندی
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700 whitespace-nowrap">
                آیکون
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700 whitespace-nowrap">
                تعداد محصولات
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700 whitespace-nowrap">
                وضعیت
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700 whitespace-nowrap">
                تاریخ ایجاد
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700 whitespace-nowrap">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr
                key={category._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <FiImage className="text-gray-500" size={20} />
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <h3 className="text-base font-medium text-gray-900 mb-1">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        شناسه: {category._id.substring(0, 8)}...
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end">
                    <div className="p-3 bg-gray-100 rounded-lg border border-gray-200">
                      {getIconComponent(category.icon)}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <FiPackage className="text-gray-400" size={16} />
                    <span className="text-sm font-medium text-gray-700">
                      {category.productCount || 0}
                    </span>
                    <span className="text-sm text-gray-500">محصول</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end">
                    <button
                      onClick={() => onToggleStatus(category._id)}
                      disabled={loading}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      } ${
                        category.isActive
                          ? "bg-green-100 text-green-800 hover:bg-green-200 border border-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200 border border-red-200"
                      }`}
                    >
                      {category.isActive ? (
                        <FiToggleRight className="text-lg" />
                      ) : (
                        <FiToggleLeft className="text-lg" />
                      )}
                      {category.isActive ? "فعال" : "غیرفعال"}
                    </button>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-700 block">
                      {new Date(category.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(category.createdAt).toLocaleTimeString("fa-IR")}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => onEdit(category)}
                      disabled={loading}
                      className={`flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      title="ویرایش"
                    >
                      <FiEdit2 size={16} />
                      <span className="text-sm">ویرایش</span>
                    </button>

                    <button
                      onClick={() => onDelete(category)}
                      disabled={loading}
                      className={`flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      title="حذف"
                    >
                      <FiTrash2 size={16} />
                      <span className="text-sm">حذف</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categories.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FiPackage className="mx-auto text-gray-400 mb-3" size={48} />
            <p className="text-lg">هیچ دسته‌بندی‌ای یافت نشد</p>
            <p className="text-sm mt-1">
              برای شروع یک دسته‌بندی جدید اضافه کنید
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesTable;
