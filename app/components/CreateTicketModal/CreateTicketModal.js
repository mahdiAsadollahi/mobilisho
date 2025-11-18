// app/dashboard/support/components/CreateTicketModal.jsx
"use client";

import { useState } from "react";
import {
  FiX,
  FiPaperclip,
  FiUpload,
  FiAlertCircle,
  FiTool,
  FiCreditCard,
  FiPackage,
  FiSmartphone,
  FiUser,
  FiHelpCircle,
} from "react-icons/fi";

const CreateTicketModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    subject: "",
    priority: "medium",
    category: "technical",
    description: "",
    attachments: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "technical", label: "مشکل فنی", icon: FiTool },
    { value: "payment", label: "پرداخت و مالی", icon: FiCreditCard },
    { value: "order", label: "سفارش و ارسال", icon: FiPackage },
    { value: "product", label: "محصول و گارانتی", icon: FiSmartphone },
    { value: "account", label: "حساب کاربری", icon: FiUser },
    { value: "other", label: "سایر", icon: FiHelpCircle },
  ];

  const priorities = [
    {
      value: "low",
      label: "پایین",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      value: "medium",
      label: "متوسط",
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    { value: "high", label: "بالا", color: "text-red-600", bg: "bg-red-100" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    }));

    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }));
  };

  const removeAttachment = (attachmentId) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((att) => att.id !== attachmentId),
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subject.trim() || !formData.description.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      // ریست فرم
      setFormData({
        subject: "",
        priority: "medium",
        category: "technical",
        description: "",
        attachments: [],
      });
    } catch (error) {
      console.error("Error creating ticket:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      subject: "",
      priority: "medium",
      category: "technical",
      description: "",
      attachments: [],
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* هدر */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiAlertCircle className="text-blue-600 text-lg" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black">
                ایجاد تیکت جدید
              </h3>
              <p className="text-gray-600 text-sm">
                پشتیبانی در کمتر از ۲۴ ساعت پاسخ می‌دهد
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* بدنه */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
        >
          <div className="space-y-6">
            {/* موضوع تیکت */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                موضوع تیکت *
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="موضوع مشکل یا سوال خود را بنویسید..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* دسته‌بندی و اولویت */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* دسته‌بندی */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  دسته‌بندی
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      );
                    })}
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    {(() => {
                      const selectedCategory = categories.find(
                        (cat) => cat.value === formData.category
                      );
                      const IconComponent = selectedCategory
                        ? selectedCategory.icon
                        : FiHelpCircle;
                      return (
                        <IconComponent className="text-gray-400 text-lg" />
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* اولویت */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  سطح اولویت
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    handleInputChange("priority", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priorities.map((priority) => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* توضیحات */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                توضیحات کامل *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="مشکل یا سوال خود را به طور کامل شرح دهید. هرچه اطلاعات بیشتری ارائه دهید، پاسخ سریع‌تر و دقیق‌تری دریافت خواهید کرد..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="6"
                required
              />
            </div>

            {/* آپلود فایل */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                فایل‌های پیوست (اختیاری)
              </label>

              {/* دکمه آپلود */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <FiUpload className="text-gray-400 text-2xl" />
                  <div>
                    <p className="text-gray-600 font-medium">
                      برای آپلود فایل کلیک کنید
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      JPG, PNG, PDF, DOC (حداکثر ۱۰ مگابایت)
                    </p>
                  </div>
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    انتخاب فایل
                  </span>
                </label>
              </div>

              {/* لیست فایل‌های آپلود شده */}
              {formData.attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">فایل‌های انتخاب شده:</p>
                  {formData.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <FiPaperclip className="text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {attachment.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(attachment.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(attachment.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                      >
                        <FiX className="text-lg" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* راهنمایی */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="text-blue-500 mt-0.5 shrink-0" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">
                    راهنمایی برای دریافت پاسخ سریع‌تر:
                  </p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>مشکل خود را به طور کامل و واضح شرح دهید</li>
                    <li>در صورت امکان، تصویر یا فایل مربوطه را پیوست کنید</li>
                    <li>شماره سفارش یا تراکنش مربوطه را ذکر کنید</li>
                    <li>برای مشکلات فوری با پشتیبانی تلفنی تماس بگیرید</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* دکمه‌ها */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={
                !formData.subject.trim() ||
                !formData.description.trim() ||
                isSubmitting
              }
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>در حال ایجاد...</span>
                </>
              ) : (
                <>
                  <FiAlertCircle />
                  <span>ایجاد تیکت</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketModal;
