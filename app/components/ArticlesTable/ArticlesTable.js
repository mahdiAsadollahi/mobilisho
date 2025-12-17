// app/components/ArticlesTable/ArticlesTable.js
"use client";
import { FiEdit, FiTrash2, FiEye, FiCalendar } from "react-icons/fi";
import Link from "next/link";

const ArticlesTable = ({
  articles,
  onEdit,
  onDelete,
  loading,
  statusOptions = {},
}) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      published: {
        label: statusOptions.published || "منتشر شده",
        color: "bg-green-100 text-green-800",
      },
      draft: {
        label: statusOptions.draft || "پیش‌نویس",
        color: "bg-orange-100 text-orange-800",
      },
      archived: {
        label: statusOptions.archived || "آرشیو شده",
        color: "bg-gray-100 text-gray-800",
      },
    };

    const config = statusConfig[status] || {
      label: status,
      color: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const formatDate = (date) => {
    if (!date) return "-";
    try {
      return new Date(date).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return date;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-500">در حال بارگذاری مقالات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                عکس
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                عنوان مقاله
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                دسته‌بندی
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                وضعیت
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                تاریخ ایجاد
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
                  <img
                    src={article.mainImage || "/images/default-article.jpg"}
                    alt={article.title}
                    className="w-16 h-16 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "/images/default-article.jpg";
                    }}
                  />
                </td>

                <td className="px-4 py-4">
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                      {article.title}
                    </h3>
                    {article.summary && (
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {article.summary}
                      </p>
                    )}
                  </div>
                </td>

                <td className="px-4 py-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                    {article.category || "بدون دسته‌بندی"}
                  </span>
                </td>

                <td className="px-4 py-4">{getStatusBadge(article.status)}</td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <FiCalendar size={14} />
                    <span className="whitespace-nowrap">
                      {formatDate(article.createdAt)}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-1 justify-end">
                    {article.status === "published" && (
                      <Link
                        href={`/blog/${article.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="مشاهده"
                        target="_blank"
                      >
                        <FiEye size={16} />
                      </Link>
                    )}
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

        {articles.length === 0 && !loading && (
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
