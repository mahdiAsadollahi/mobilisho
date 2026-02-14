// app/components/TicketDetailsModal/TicketDetailsModal.js
import { useState, useEffect } from "react";
import {
  FiX,
  FiUser,
  FiMessageSquare,
  FiClock,
  FiCheckCircle,
  FiArchive,
  FiCalendar,
  FiTag,
  FiAlertCircle,
} from "react-icons/fi";

// تبدیل وضعیت به فارسی
const getStatusText = (status) => {
  const statusMap = {
    open: "باز",
    answered: "پاسخ داده شده",
    closed: "بسته شده",
    customer_reply: "پاسخ مشتری",
    waiting: "در انتظار",
    resolved: "حل شده",
  };
  return statusMap[status] || status;
};

// تبدیل اولویت به فارسی
const getPriorityText = (priority) => {
  const priorityMap = {
    low: "کم",
    medium: "متوسط",
    high: "بالا",
    urgent: "فوری",
  };
  return priorityMap[priority] || priority;
};

// تبدیل دسته‌بندی به فارسی
const getCategoryText = (category) => {
  const categoryMap = {
    technical: "فنی",
    financial: "مالی",
    sales: "فروش",
    general: "عمومی",
    payment: "پرداخت",
    order: "سفارش",
    product: "محصول",
    account: "حساب کاربری",
    other: "سایر",
  };
  return categoryMap[category] || category;
};

// تابع فرمت تاریخ شمسی
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// کامپوننت حباب پیام
function MessageBubble({ message, isCustomer }) {
  // استخراج نام فرستنده
  const getSenderName = () => {
    if (message.sender?.username) {
      return message.sender.username;
    }
    return isCustomer ? "کاربر" : "پشتیبان";
  };

  return (
    <div
      className={`flex gap-3 mb-4 ${
        isCustomer ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* آواتار */}
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isCustomer
            ? "bg-blue-100 text-blue-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        <FiUser size={16} />
      </div>

      {/* محتوای پیام */}
      <div
        className={`flex-1 flex flex-col ${
          isCustomer ? "items-start" : "items-end"
        }`}
      >
        <div
          className={`rounded-2xl px-4 py-2 max-w-[85%] ${
            isCustomer
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap warp-break-words">
            {message.content}
          </p>
        </div>

        {/* اطلاعات پیام */}
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
          <span className="font-medium">{getSenderName()}</span>
          <span>•</span>
          <span>{formatDate(message.createdAt)}</span>
          {message.readBy?.length > 0 && (
            <>
              <span>•</span>
              <FiCheckCircle size={12} className="text-green-500" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// کامپوننت هدر تیکت
function TicketHeader({ ticket, onClose }) {
  // وضعیت و اولویت با کلاس‌های رنگی
  const statusColors = {
    open: "bg-yellow-100 text-yellow-800",
    answered: "bg-blue-100 text-blue-800",
    closed: "bg-gray-100 text-gray-800",
    customer_reply: "bg-purple-100 text-purple-800",
    waiting: "bg-orange-100 text-orange-800",
    resolved: "bg-green-100 text-green-800",
  };

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-orange-100 text-orange-800",
    urgent: "bg-red-100 text-red-800",
  };

  // استخراج اطلاعات کاربر
  const getUserInfo = () => {
    if (ticket.user) {
      return {
        name: ticket.user.username || "کاربر",
        phone: ticket.user.phone,
        email: ticket.user.email,
      };
    }
    return { name: "کاربر", phone: "", email: "" };
  };

  const userInfo = getUserInfo();

  return (
    <div className="border-b border-gray-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-xl font-bold text-gray-900">
              {ticket.subject}
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[ticket.status] || "bg-gray-100 text-gray-800"
              }`}
            >
              {getStatusText(ticket.status)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <FiTag size={14} />
              <span>دسته‌بندی: {getCategoryText(ticket.category)}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiAlertCircle size={14} />
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  priorityColors[ticket.priority] || "bg-gray-100"
                }`}
              >
                اولویت: {getPriorityText(ticket.priority)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FiCalendar size={14} />
              <span>ایجاد: {formatDate(ticket.createdAt)}</span>
            </div>
          </div>

          {/* اطلاعات کاربر */}
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600 border-t pt-3">
            <div className="flex items-center gap-1">
              <FiUser size={14} />
              <span>کاربر: {userInfo.name}</span>
            </div>
            {userInfo.phone && (
              <div className="flex items-center gap-1">
                <span>تلفن: {userInfo.phone}</span>
              </div>
            )}
            {ticket.assignedTo && (
              <div className="flex items-center gap-1">
                <FiUser size={14} />
                <span>مسئول: {ticket.assignedTo?.username || "نامشخص"}</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiX size={20} />
        </button>
      </div>
    </div>
  );
}

export default function TicketDetailsModal({
  isOpen,
  onClose,
  ticket: initialTicket,
  onSendMessage,
  onUpdateStatus,
  onArchiveTicket,
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      if (!isOpen || !initialTicket?._id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/tickets/${initialTicket._id}`);
        const result = await response.json();

        console.log("API Response:", result); // برای دیباگ

        if (!response.ok) {
          throw new Error(result.message || "خطا در دریافت اطلاعات");
        }

        // ساختار response: { message: "...", data: [ticket, messages] }
        if (result.data && Array.isArray(result.data)) {
          const [ticket, ticketMessages] = result.data;
          setTicketData(ticket);
          setMessages(ticketMessages || []);
        } else {
          console.warn("Unexpected response structure:", result);
          // اگر ساختار متفاوت بود، از initialTicket استفاده کن
          setTicketData(initialTicket);
          setMessages([]);
        }
      } catch (err) {
        console.error("Error fetching ticket:", err);
        setError(err.message);
        // در صورت خطا، حداقل اطلاعات اولیه رو نشون بده
        setTicketData(initialTicket);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [isOpen, initialTicket]);

  // لاگ برای دیباگ
  useEffect(() => {
    if (ticketData || messages.length > 0) {
      console.log("Ticket Data:", ticketData);
      console.log("Messages:", messages);
    }
  }, [ticketData, messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {loading ? (
          // حالت لودینگ
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">در حال دریافت اطلاعات...</p>
            </div>
          </div>
        ) : error ? (
          // حالت خطا - ولی still نمایش اطلاعات اولیه
          ticketData ? (
            <>
              <TicketHeader ticket={ticketData} onClose={onClose} />
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                <div className="text-center text-yellow-600 mb-4 p-4 bg-yellow-50 rounded-lg">
                  <p>خطا در دریافت پیام‌ها: {error}</p>
                  <p className="text-sm mt-2">نمایش اطلاعات اولیه تیکت</p>
                </div>
                {/* نمایش پیام‌ها اگر وجود داشته باشند */}
                {messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <MessageBubble
                        key={message._id}
                        message={message}
                        isCustomer={message.senderType === "USER"}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    <FiMessageSquare
                      size={48}
                      className="mx-auto mb-4 opacity-50"
                    />
                    <p>هنوز پیامی برای این تیکت وجود ندارد</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64 text-red-600">
              <p>{error}</p>
            </div>
          )
        ) : ticketData ? (
          // نمایش اطلاعات تیکت
          <>
            {/* هدر */}
            <TicketHeader ticket={ticketData} onClose={onClose} />

            {/* لیست پیام‌ها */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <FiMessageSquare
                    size={48}
                    className="mx-auto mb-4 opacity-50"
                  />
                  <p>هنوز پیامی برای این تیکت وجود ندارد</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <MessageBubble
                      key={message._id}
                      message={message}
                      isCustomer={message.senderType === "USER"}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* فوتر - اطلاعات تکمیلی */}
            <div className="border-t border-gray-200 bg-white p-4">
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FiArchive size={16} />
                  <span>
                    وضعیت بایگانی:{" "}
                    {ticketData.isArchived ? "بایگانی شده" : "موجود"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock size={16} />
                  <span>
                    آخرین فعالیت:{" "}
                    {formatDate(
                      ticketData.lastActivityAt || ticketData.updatedAt
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMessageSquare size={16} />
                  <span>تعداد پیام‌ها: {messages.length}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          // حالت عدم وجود دیتا
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-600">اطلاعاتی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
}
