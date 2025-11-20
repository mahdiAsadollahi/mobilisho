// app/components/ArticlesTable/ArticlesTable.js
"use client";
import { FiEdit, FiTrash2, FiEye, FiCalendar } from "react-icons/fi";
import Link from "next/link";

const ArticlesTable = ({
  articles,
  onEdit,
  onDelete,
  onToggleStatus,
  loading,
}) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      published: {
        label: "منتشر شده",
        color: "bg-green-100 text-green-800 w-fit",
      },
      draft: {
        label: "پیش‌نویس",
        color: "bg-orange-100 text-orange-800 w-fit",
      },
    };

    const config = statusConfig[status] || {
      label: status,
      color: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("fa-IR");
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                عنوان مقاله
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                وضعیت
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                تاریخ ایجاد
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                تاریخ انتشار
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr
                key={article.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={article.mainImage}
                      alt={article.title}
                      className="w-12 h-12 object-cover rounded-lg shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                        {article.title}
                      </h3>
                      <div className="text-xs text-gray-500">
                        {article.category}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex flex-col gap-2">
                    {getStatusBadge(article.status)}
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={article.isActive}
                        onChange={() => onToggleStatus(article.id, "isActive")}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="mr-3 text-sm font-medium text-gray-900">
                        {article.isActive ? "فعال" : "غیرفعال"}
                      </span>
                    </label>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <FiCalendar size={14} />
                    {formatDate(article.createdAt)}
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <FiCalendar size={14} />
                    {formatDate(article.publishedAt) || "-"}
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-1 justify-end">
                    <Link
                      href={`/blog/preview/${article.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="پیش‌نمایش"
                      target="_blank" // باز شدن در تب جدید
                    >
                      <FiEye size={16} />
                    </Link>
                    <button
                      onClick={() => onEdit(article)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="ویرایش"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(article)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="حذف"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-4">📝</div>
            <p className="text-gray-500">مقاله‌ای یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesTable;
