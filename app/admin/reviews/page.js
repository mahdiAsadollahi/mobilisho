// app/admin/comments/page.js
"use client";
import { useState, useEffect, useMemo } from "react";
import {
  FiMessageSquare,
  FiCheck,
  FiX,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiFilter,
  FiSearch,
  FiUser,
  FiCalendar,
  FiRefreshCw,
  FiExternalLink,
} from "react-icons/fi";

import DatePicker from "@/app/components/DatePicker/DatePicker";
import CommentDetailModal from "@/app/components/CommentDetailModal/CommentDetailModal";
import DeleteModal from "@/app/components/DeleteModal/DeleteModal";

// Helper function for consistent date formatting
const formatDate = (date) => {
  if (!date) return "";

  // Ensure date is a Date object
  const dateObj = date instanceof Date ? date : new Date(date);

  // Use a fixed format to avoid hydration mismatch
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(dateObj);
};

export default function CommentsManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    dateFrom: null,
    dateTo: null,
  });

  // Mock data - move outside component or fetch from API
  const initialComments = [
    {
      id: 1,
      user: {
        id: 1,
        name: "محمد احمدی",
        email: "m.ahmadi@example.com",
      },
      content: "این محصول واقعا عالی بود. کیفیت ساخت بسیار خوبی دارد.",
      post: {
        id: 101,
        title: "گوشی موبایل سامسونگ گلکسی S24",
        type: "product",
        link: "/products/samsung-galaxy-s24",
      },
      rating: 5,
      status: "approved",
      replies: [],
      createdAt: new Date("2024-01-20T10:30:00"),
    },
    {
      id: 2,
      user: {
        id: 2,
        name: "فاطمه محمدی",
        email: "f.mohammadi@example.com",
      },
      content: "سرویس دهی بدی داشتید. دیر رسید محصول.",
      post: {
        id: 102,
        title: "مقاله: راهنمای خرید لپ‌تاپ",
        type: "article",
        link: "/articles/laptop-buying-guide",
      },
      rating: 2,
      status: "pending",
      replies: [],
      createdAt: new Date("2024-01-15T14:45:00"),
    },
    {
      id: 3,
      user: {
        id: 3,
        name: "علی رضایی",
        email: "a.rezaei@example.com",
      },
      content: "بسیار عالی! ممنون از مقاله خوبتون.",
      post: {
        id: 103,
        title: "وبلاگ: نکات نگهداری از خودرو",
        type: "blog",
        link: "/blog/car-maintenance-tips",
      },
      rating: 5,
      status: "approved",
      replies: [
        {
          id: 1,
          admin: "مدیر سیستم",
          content: "ممنون از نظر لطف شما!",
          createdAt: new Date("2024-01-20T11:00:00"),
        },
      ],
      createdAt: new Date("2024-01-14T09:15:00"),
    },
    {
      id: 4,
      user: {
        id: 4,
        name: "سارا کریمی",
        email: "s.karimi@example.com",
      },
      content: "این یک کامنت تست اسپم است.",
      post: {
        id: 104,
        title: "گوشی موبایل سامسونگ گلکسی S24",
        type: "product",
        link: "/products/samsung-galaxy-s24",
      },
      rating: null,
      status: "spam",
      replies: [],
      createdAt: new Date("2024-01-17T16:20:00"),
    },
  ];

  const [comments, setComments] = useState(initialComments);

  // Set isClient after mount to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // آمار - useMemo برای بهینه‌سازی
  const stats = useMemo(() => {
    return {
      all: comments.length,
      pending: comments.filter((c) => c.status === "pending").length,
      approved: comments.filter((c) => c.status === "approved").length,
      spam: comments.filter((c) => c.status === "spam").length,
    };
  }, [comments]);

  // فیلتر نظرات - useMemo برای بهینه‌سازی
  const filteredComments = useMemo(() => {
    return comments.filter((comment) => {
      // فیلتر تب
      if (activeTab !== "all" && comment.status !== activeTab) return false;

      // فیلتر جستجو
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchableText = `
          ${comment.user.name}
          ${comment.user.email}
          ${comment.content}
          ${comment.post.title}
        `.toLowerCase();

        if (!searchableText.includes(searchTerm)) {
          return false;
        }
      }

      // فیلتر وضعیت
      if (filters.status && comment.status !== filters.status) return false;

      // فیلتر تاریخ
      if (filters.dateFrom) {
        const dateFrom = new Date(filters.dateFrom);
        dateFrom.setHours(0, 0, 0, 0);
        if (new Date(comment.createdAt) < dateFrom) return false;
      }

      if (filters.dateTo) {
        const dateTo = new Date(filters.dateTo);
        dateTo.setHours(23, 59, 59, 999);
        if (new Date(comment.createdAt) > dateTo) return false;
      }

      return true;
    });
  }, [comments, activeTab, filters]);

  // تغییر وضعیت
  const toggleStatus = async (id, newStatus) => {
    setLoading(true);

    // شبیه‌سازی درخواست API
    await new Promise((resolve) => setTimeout(resolve, 300));

    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );

    setLoading(false);
  };

  // حذف
  const handleDelete = async () => {
    if (!selectedComment) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setComments((prev) => prev.filter((c) => c.id !== selectedComment.id));

    setLoading(false);
    setShowDeleteModal(false);
    setSelectedComment(null);
  };

  // بازنشانی فیلتر
  const resetFilters = () => {
    setFilters({ search: "", status: "", dateFrom: null, dateTo: null });
  };

  // نمایش وضعیت
  const getStatusBadge = (status) => {
    const config = {
      approved: { color: "bg-green-100 text-green-800", text: "منتشر شده" },
      pending: { color: "bg-yellow-100 text-yellow-800", text: "در انتظار" },
      spam: { color: "bg-red-100 text-red-800", text: "اسپم" },
    };

    const { color, text } = config[status] || config.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-xs ${color}`}>{text}</span>
    );
  };

  // نمایش امتیاز
  const renderRating = (rating) => {
    if (!rating) return null;

    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-sm ${
              i < rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // Handle view details
  const handleViewDetails = (comment) => {
    setSelectedComment(comment);
    setShowDetailModal(true);
  };

  // Handle delete click
  const handleDeleteClick = (comment) => {
    setSelectedComment(comment);
    setShowDeleteModal(true);
  };

  // Handle reply submission from detail modal
  const handleReplySubmit = async (commentId, replyText) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          const newReply = {
            id: Date.now(), // در واقعیت باید از سرور بیاید
            admin: "مدیر سیستم",
            content: replyText,
            createdAt: new Date(),
          };
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        return comment;
      })
    );

    setLoading(false);
  };

  // Don't render until client-side to avoid hydration issues
  if (!isClient) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-12 bg-gray-200 rounded mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* هدر */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">مدیریت نظرات</h1>
          <p className="text-gray-600 mt-1">مدیریت و بررسی نظرات کاربران</p>
        </div>
      </div>

      {/* تب‌ها */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: "all", label: "همه", count: stats.all, icon: FiMessageSquare },
          {
            id: "pending",
            label: "در انتظار",
            count: stats.pending,
            icon: FiEyeOff,
          },
          {
            id: "approved",
            label: "منتشر شده",
            count: stats.approved,
            icon: FiCheck,
          },
          { id: "spam", label: "اسپم", count: stats.spam, icon: FiX },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? "bg-white/20" : "bg-gray-200"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* فیلترها */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-500" />
            <span className="font-medium">فیلترها</span>
          </div>
          <button
            onClick={resetFilters}
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 transition-colors"
            disabled={loading}
          >
            <FiRefreshCw size={14} />
            بازنشانی
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <FiSearch className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="جستجو در نام، ایمیل، متن یا عنوان..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={loading}
            />
          </div>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            disabled={loading}
          >
            <option value="">همه وضعیت‌ها</option>
            <option value="approved">منتشر شده</option>
            <option value="pending">در انتظار</option>
            <option value="spam">اسپم</option>
          </select>

          <DatePicker
            selected={filters.dateFrom}
            onSelect={(date) => setFilters({ ...filters, dateFrom: date })}
            placeholder="از تاریخ"
            disabled={loading}
          />

          <DatePicker
            selected={filters.dateTo}
            onSelect={(date) => setFilters({ ...filters, dateTo: date })}
            placeholder="تا تاریخ"
            disabled={loading}
          />
        </div>
      </div>

      {/* جدول نظرات */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                  کاربر
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                  محتوا
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                  وضعیت
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredComments.map((comment) => (
                <tr
                  key={comment.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <FiUser className="text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {comment.user.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {comment.user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                          {comment.post.title}
                        </div>
                        <a
                          href={comment.post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 text-sm"
                          title="مشاهده محتوا"
                        >
                          <FiExternalLink size={12} />
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                          {comment.post.type}
                        </span>
                        {renderRating(comment.rating)}
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="space-y-2">
                      {getStatusBadge(comment.status)}
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FiCalendar size={12} />
                        <span>{formatDate(comment.createdAt)}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleViewDetails(comment)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="مشاهده جزئیات و پاسخ"
                        disabled={loading}
                      >
                        <FiEye size={18} />
                      </button>

                      {comment.status === "pending" && (
                        <button
                          onClick={() => toggleStatus(comment.id, "approved")}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="تایید و انتشار"
                          disabled={loading}
                        >
                          <FiCheck size={18} />
                        </button>
                      )}

                      {comment.status === "approved" && (
                        <button
                          onClick={() => toggleStatus(comment.id, "pending")}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="لغو انتشار"
                          disabled={loading}
                        >
                          <FiEyeOff size={18} />
                        </button>
                      )}

                      <button
                        onClick={() => toggleStatus(comment.id, "spam")}
                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="علامت‌گذاری به عنوان اسپم"
                        disabled={loading}
                      >
                        <FiX size={18} />
                      </button>

                      <button
                        onClick={() => handleDeleteClick(comment)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف نظر"
                        disabled={loading}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredComments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FiMessageSquare className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-lg font-medium mb-2">نظری یافت نشد</p>
            <p className="text-sm">
              {Object.values(filters).some((val) => val)
                ? "فیلترهای اعمال شده را تغییر دهید"
                : "هنوز نظری ثبت نشده است"}
            </p>
          </div>
        )}

        {filteredComments.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 text-sm text-gray-600">
            نمایش {filteredComments.length} نظر از {comments.length} نظر
          </div>
        )}
      </div>

      {/* مودال جزئیات */}
      <CommentDetailModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedComment(null);
        }}
        comment={selectedComment}
        onStatusChange={toggleStatus}
        onDelete={handleDeleteClick}
        onReplySubmit={handleReplySubmit}
        loading={loading}
      />

      {/* مودال حذف */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedComment(null);
        }}
        onConfirm={handleDelete}
        title="حذف نظر"
        message={
          selectedComment
            ? `آیا از حذف نظر کاربر "${selectedComment.user.name}" اطمینان دارید؟ این عمل غیرقابل بازگشت است.`
            : "آیا از حذف این نظر اطمینان دارید؟"
        }
        loading={loading}
      />
    </div>
  );
}
