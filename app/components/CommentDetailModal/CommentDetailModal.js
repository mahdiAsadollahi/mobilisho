"use client";

import { useState, useEffect } from "react";
import {
  FiX,
  FiUser,
  FiCalendar,
  FiMessageSquare,
  FiCornerUpLeft,
  FiCheck,
  FiEyeOff,
  FiTrash2,
  FiSend,
  FiExternalLink,
  FiLoader,
} from "react-icons/fi";

// Helper function for consistent date formatting
const formatDateTime = (date) => {
  if (!date) return "";

  const dateObj = date instanceof Date ? date : new Date(date);

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
};

export default function CommentDetailModal({
  isOpen,
  onClose,
  comment,
  onStatusChange,
  onDelete,
  onReplySubmit,
  loading,
}) {
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setReplyText("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen || !comment || !isClient) return null;

  const handleSubmitReply = async () => {
    if (!replyText.trim() || !onReplySubmit) return;

    setIsSubmitting(true);
    try {
      await onReplySubmit(comment.id, replyText.trim());
      setReplyText("");
    } catch (error) {
      console.error("Error submitting reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmitReply();
    }
  };

  const renderRating = (rating) => {
    if (!rating) return null;

    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
        <span className="text-gray-600 mr-2 text-sm">({rating}/5)</span>
      </div>
    );
  };

  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "منتشر شده";
      case "pending":
        return "در انتظار بررسی";
      case "spam":
        return "اسپم";
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-50 border-green-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "spam":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* هدر */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <FiUser className="text-blue-600 text-xl" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-800 truncate">
                {comment.user.name}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {comment.user.email}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={loading || isSubmitting}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* محتوا */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* بخش اطلاعات کلی */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-gray-600">وضعیت:</div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2 border ${getStatusColor(
                  comment.status
                )}`}
              >
                {getStatusText(comment.status)}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-600">تاریخ ارسال:</div>
              <div className="flex items-center gap-2 text-gray-700">
                <FiCalendar size={14} />
                <span>{formatDateTime(comment.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* بخش پست */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">نظردهی شده برای:</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 truncate">
                  {comment.post.title}
                </div>
                <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <span className="px-2 py-1 bg-white rounded border text-xs">
                    {comment.post.type === "product"
                      ? "محصول"
                      : comment.post.type === "article"
                      ? "مقاله"
                      : comment.post.type === "blog"
                      ? "وبلاگ"
                      : comment.post.type}
                  </span>
                  {comment.rating && (
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span>{comment.rating}/5</span>
                    </span>
                  )}
                </div>
              </div>
              {comment.post.link && (
                <a
                  href={comment.post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 text-sm"
                  title="مشاهده محتوا"
                >
                  <FiExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          {/* بخش نظر اصلی */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiMessageSquare className="text-gray-500" />
              <span className="font-medium text-gray-800">نظر کاربر</span>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          </div>

          {/* بخش پاسخ‌ها */}
          {comment.replies && comment.replies.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FiCornerUpLeft className="text-gray-500" />
                <span className="font-medium text-gray-800">پاسخ‌ها</span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {comment.replies.length}
                </span>
              </div>
              <div className="space-y-3">
                {comment.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                          <FiUser className="text-green-600" size={14} />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">
                            {reply.admin}
                          </span>
                          <div className="text-xs text-gray-500">
                            مدیر سیستم
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDateTime(reply.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700 pr-10 whitespace-pre-wrap">
                      {reply.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* بخش ارسال پاسخ */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiCornerUpLeft className="text-gray-500" />
              <span className="font-medium text-gray-800">ارسال پاسخ جدید</span>
            </div>
            <div className="relative">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="پاسخ خود را اینجا بنویسید... (Ctrl+Enter برای ارسال)"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors pr-12"
                disabled={isSubmitting || loading}
              />
              <div className="absolute left-3 bottom-3 flex items-center gap-2">
                <button
                  onClick={handleSubmitReply}
                  disabled={!replyText.trim() || isSubmitting || loading}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="ارسال پاسخ"
                >
                  {isSubmitting ? (
                    <FiLoader className="animate-spin" size={18} />
                  ) : (
                    <FiSend size={18} />
                  )}
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
              <span>پاسخ شما با نام "مدیر سیستم" نمایش داده خواهد شد</span>
            </div>
          </div>
        </div>

        {/* فوتر با دکمه‌های عملیات */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {comment.status === "pending" && (
                <button
                  onClick={() => onStatusChange(comment.id, "approved")}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  <FiCheck />
                  تایید و انتشار
                </button>
              )}

              {comment.status === "approved" && (
                <button
                  onClick={() => onStatusChange(comment.id, "pending")}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  <FiEyeOff />
                  لغو انتشار
                </button>
              )}

              <button
                onClick={() => onStatusChange(comment.id, "spam")}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <FiX />
                علامت‌گذاری اسپم
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  onDelete(comment);
                  onClose();
                }}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <FiTrash2 />
                حذف نظر
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
