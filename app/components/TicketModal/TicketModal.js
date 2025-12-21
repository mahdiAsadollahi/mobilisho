// app/components/TicketModal/TicketModal.js
import { useState, useEffect, useCallback } from "react";
import { FiX, FiUser, FiSearch, FiLoader } from "react-icons/fi";
import debounce from "lodash/debounce";

export default function TicketModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    subject: "",
    category: "general",
    priority: "medium",
    message: "",
    customer: null,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showCustomerSearch, setShowCustomerSearch] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  // تابع برای دریافت کاربران از API
  const fetchUsers = useCallback(
    debounce(async (search) => {
      if (!search.trim() && !showCustomerSearch) return;

      setIsLoadingUsers(true);
      try {
        const params = new URLSearchParams();
        if (search.trim()) {
          params.append("search", search);
        }
        params.append("limit", "10");

        const response = await fetch(`/api/users?${params.toString()}`);
        const result = await response.json();

        if (response.ok && result.success) {
          setUsers(result.data);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setUsers([]);
      } finally {
        setIsLoadingUsers(false);
      }
    }, 500),
    [showCustomerSearch]
  );

  // هنگام تغییر عبارت جستجو، کاربران را دریافت کن
  useEffect(() => {
    if (showCustomerSearch && searchTerm !== "") {
      fetchUsers(searchTerm);
    } else if (showCustomerSearch) {
      // اگر جستجو خالی است، همه کاربران را بگیر
      fetchUsers("");
    }
  }, [searchTerm, showCustomerSearch, fetchUsers]);

  // وقتی مودال باز می‌شود، کاربران را بگیر
  useEffect(() => {
    if (isOpen && showCustomerSearch) {
      fetchUsers("");
    }
  }, [isOpen, showCustomerSearch, fetchUsers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // اعتبارسنجی‌ها
    if (!formData.customer) {
      setError("لطفاً یک مشتری انتخاب کنید");
      return;
    }

    if (!formData.subject.trim()) {
      setError("موضوع تیکت الزامی است");
      return;
    }

    if (!formData.message.trim()) {
      setError("متن پیام الزامی است");
      return;
    }

    if (formData.subject.trim().length < 3) {
      setError("موضوع تیکت باید حداقل ۳ کاراکتر باشد");
      return;
    }

    if (formData.message.trim().length < 10) {
      setError("متن تیکت باید حداقل ۱۰ کاراکتر باشد");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("ارسال داده‌ها به API:", {
        subject: formData.subject.trim(),
        category: formData.category,
        priority: formData.priority,
        content: formData.message.trim(),
        userId: formData.customer._id,
      });

      // ارسال به API سرور
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          subject: formData.subject.trim(),
          category: formData.category,
          priority: formData.priority,
          content: formData.message.trim(),
          userId: formData.customer._id,
        }),
      });

      console.log("پاسخ API:", response.status, response.statusText);

      const result = await response.json();
      console.log("نتیجه API:", result);

      if (!response.ok) {
        throw new Error(
          result.message || `خطا در ایجاد تیکت (${response.status})`
        );
      }

      if (result.success) {
        // ساخت تیکت جدید برای نمایش در فرانت‌اند
        const ticketData = result.data.ticket;
        const userData = ticketData.user;
        const senderData = ticketData.sender;

        const newTicket = {
          id: ticketData.id,
          ticketNumber: `TKT-${new Date().getFullYear()}-${String(
            ticketData.id || Date.now()
          ).slice(-4)}`,
          subject: ticketData.subject,
          category: ticketData.category,
          priority: ticketData.priority,
          status: ticketData.status,
          customer: {
            id: userData.id,
            name: userData.username,
            email: "",
            phone: userData.phone,
          },
          assignedTo: {
            id: null,
            name: "در انتظار تخصیص",
          },
          messages: [
            {
              id: Date.now(),
              sender: senderData.role === "ADMIN" ? "admin" : "customer",
              senderName: senderData.username,
              message: formData.message.trim(),
              createdAt:
                new Date(ticketData.createdAt).toLocaleDateString("fa-IR") +
                " " +
                new Date(ticketData.createdAt).toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              isRead: true,
            },
          ],
          createdAt:
            new Date(ticketData.createdAt).toLocaleDateString("fa-IR") +
            " " +
            new Date(ticketData.createdAt).toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          updatedAt:
            new Date(
              ticketData.updatedAt || ticketData.createdAt
            ).toLocaleDateString("fa-IR") +
            " " +
            new Date(
              ticketData.updatedAt || ticketData.createdAt
            ).toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          lastReplyAt:
            new Date(ticketData.createdAt).toLocaleDateString("fa-IR") +
            " " +
            new Date(ticketData.createdAt).toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          isArchived: false,
          createdByAdmin: ticketData.createdByAdmin,
        };

        console.log("تیکت جدید ایجاد شده:", newTicket);

        // ارسال تیکت به parent component
        onSubmit({
          ...formData,
          ticketData: newTicket,
          apiResponse: result,
        });

        // ریست فرم
        setFormData({
          subject: "",
          category: "general",
          priority: "medium",
          message: "",
          customer: null,
        });
        setSearchTerm("");
        setShowCustomerSearch(false);
        setUsers([]);

        // نمایش پیام موفقیت
        alert("تیکت با موفقیت ایجاد شد!");
      } else {
        throw new Error(result.message || "خطا در ایجاد تیکت");
      }
    } catch (err) {
      console.error("Error submitting ticket:", err);
      setError(err.message || "خطا در ارسال داده به سرور");
    } finally {
      setIsSubmitting(false);
    }
  };

  // تابع برای فرمت کردن شماره تلفن
  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    // فرمت: ۰۹۱۲ *** ۱۲۳۴
    return `${phone.substring(0, 4)} *** ${phone.substring(7)}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* هدر */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-bold text-gray-900">ایجاد تیکت جدید</h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
          >
            <FiX size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]"
        >
          {/* نمایش خطا */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* انتخاب مشتری */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              انتخاب مشتری
            </label>
            {!formData.customer ? (
              <div className="space-y-3">
                <div className="relative">
                  <FiSearch
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowCustomerSearch(true)}
                    placeholder="جستجوی مشتری با نام یا شماره تلفن..."
                    className="w-full p-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSubmitting}
                  />
                </div>

                {showCustomerSearch && (
                  <div className="border border-gray-200 rounded-xl bg-white shadow-lg max-h-60 overflow-y-auto">
                    {isLoadingUsers ? (
                      <div className="p-4 text-center">
                        <FiLoader className="animate-spin mx-auto" size={24} />
                        <p className="text-sm text-gray-500 mt-2">
                          در حال دریافت کاربران...
                        </p>
                      </div>
                    ) : users.length > 0 ? (
                      users.map((user) => (
                        <button
                          key={user._id}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              customer: user,
                            }));
                            setShowCustomerSearch(false);
                            setSearchTerm("");
                          }}
                          disabled={isSubmitting}
                          className="w-full p-4 text-right hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors disabled:opacity-50"
                        >
                          <div className="font-medium text-gray-900">
                            {user.username}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            شماره: {formatPhoneNumber(user.phone)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {user.role === "ADMIN" ? "ادمین" : "کاربر"}
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        {searchTerm.trim()
                          ? "کاربری با این مشخصات یافت نشد"
                          : "هیچ کاربری یافت نشد"}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div>
                  <div className="font-medium text-blue-900">
                    {formData.customer.username}
                  </div>
                  <div className="text-sm text-blue-700 mt-1">
                    شماره: {formatPhoneNumber(formData.customer.phone)}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    {formData.customer.role === "ADMIN" ? "ادمین" : "کاربر"}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, customer: null }))
                  }
                  disabled={isSubmitting}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  <FiX size={18} />
                </button>
              </div>
            )}
          </div>

          {/* موضوع */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              موضوع تیکت
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, subject: e.target.value }))
              }
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="موضوع تیکت را وارد کنید..."
              disabled={isSubmitting}
            />
          </div>

          {/* دسته‌بندی و اولویت */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                دسته‌بندی
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              >
                <option value="technical">فنی</option>
                <option value="financial">مالی</option>
                <option value="sales">فروش</option>
                <option value="general">عمومی</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                اولویت
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, priority: e.target.value }))
                }
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              >
                <option value="low">کم</option>
                <option value="medium">متوسط</option>
                <option value="high">بالا</option>
              </select>
            </div>
          </div>

          {/* پیام */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              پیام
            </label>
            <textarea
              required
              rows={6}
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="متن پیام خود را وارد کنید..."
              disabled={isSubmitting}
            />
          </div>

          {/* دکمه‌های اقدام */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin" size={20} />
                  <span>در حال ایجاد...</span>
                </>
              ) : (
                "ایجاد تیکت"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-4 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-all duration-200 font-medium disabled:opacity-50"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
