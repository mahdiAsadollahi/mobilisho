// app/components/TicketDetailsModal/TicketDetailsModal.js
import { useState, useRef, useEffect } from "react";
import {
  FiX,
  FiPaperclip,
  FiDownload,
  FiUser,
  FiMessageSquare,
  FiClock,
  FiCheckCircle,
  FiArchive,
  FiSend,
  FiEdit3,
  FiTrash2,
  FiArrowRight,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";

function MessageBubble({ message, isCustomer }) {
  return (
    <div
      className={`flex gap-3 sm:gap-4 mb-6 last:mb-0 ${
        isCustomer ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* آواتار */}
      <div
        className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
          isCustomer ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
        }`}
      >
        <FiUser size={16} className="sm:size-[18px]" />
      </div>

      {/* محتوای پیام */}
      <div
        className={`flex-1 flex flex-col ${
          isCustomer ? "items-end" : "items-start"
        }`}
      >
        {/* حباب پیام */}
        <div
          className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-3 max-w-full sm:max-w-[85%] lg:max-w-[80%] ${
            isCustomer
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          }`}
        >
          <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap wrap-break-words">
            {message.message}
          </p>
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
              {message.attachments.map((file, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-1 sm:gap-2 p-2 rounded-lg ${
                    isCustomer ? "bg-blue-400" : "bg-gray-200"
                  }`}
                >
                  <FiPaperclip size={12} className="sm:size-3.5" />
                  <span className="text-xs flex-1 truncate">{file.name}</span>
                  <button
                    className={`p-1 rounded ${
                      isCustomer ? "hover:bg-blue-300" : "hover:bg-gray-300"
                    }`}
                  >
                    <FiDownload size={10} className="sm:size-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* اطلاعات پیام */}
        <div
          className={`flex flex-wrap items-center gap-1 sm:gap-2 mt-1 sm:mt-2 text-xs text-gray-500 ${
            isCustomer ? "justify-end" : "justify-start"
          }`}
        >
          <span className="font-medium">{message.senderName}</span>
          <span className="hidden sm:inline">•</span>
          <span>{message.createdAt}</span>
          {message.isRead && !isCustomer && (
            <>
              <span className="hidden sm:inline">•</span>
              <FiCheckCircle
                size={10}
                className="sm:size-3 text-green-500"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TicketHeader({ ticket, onUpdateStatus, onArchive, onClose }) {
  const getStatusConfig = (status) => {
    const configs = {
      open: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: FiClock,
        text: "باز",
      },
      answered: {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: FiCheckCircle,
        text: "پاسخ داده شده",
      },
      customer_reply: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: FiUser,
        text: "در انتظار پاسخ",
      },
      closed: {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        icon: FiArchive,
        text: "بسته شده",
      },
    };
    return configs[status] || configs.open;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      low: { color: "bg-gray-100 text-gray-800", text: "کم" },
      medium: { color: "bg-blue-100 text-blue-800", text: "متوسط" },
      high: { color: "bg-orange-100 text-orange-800", text: "بالا" },
      urgent: { color: "bg-red-100 text-red-800", text: "فوری" },
    };
    return configs[priority] || configs.medium;
  };

  const statusConfig = getStatusConfig(ticket.status);
  const priorityConfig = getPriorityConfig(ticket.priority);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="border-b border-gray-200 bg-white p-4 sm:p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
              {ticket.subject}
            </h2>
            <span
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 border ${statusConfig.color}`}
            >
              <StatusIcon size={14} className="sm:size-[18px]" />
              {statusConfig.text}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
            <span className="flex items-center gap-1 sm:gap-2">
              <FiMessageSquare size={14} className="sm:size-4" />
              شماره:{" "}
              <strong className="font-mono">{ticket.ticketNumber}</strong>
            </span>
            <span className="hidden sm:flex items-center gap-2">
              <FiUser size={16} />
              مشتری: <strong>{ticket.customer.name}</strong>
            </span>
            <span
              className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${priorityConfig.color}`}
            >
              اولویت: {priorityConfig.text}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {!ticket.isArchived && (
            <button
              onClick={() => onArchive(ticket.id)}
              className="p-1 sm:p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="بایگانی تیکت"
            >
              <FiArchive size={16} className="sm:size-[18px]" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 sm:p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={18} className="sm:size-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-1 sm:gap-2">
            <FiClock size={14} className="sm:size-4" />
            <span>ایجاد شده: {ticket.createdAt}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <FiMessageSquare size={14} className="sm:size-4" />
            <span>{ticket.messages.length} پیام</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
          <select
            value={ticket.status}
            onChange={(e) => onUpdateStatus(ticket.id, e.target.value)}
            className="w-full sm:w-auto text-sm border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="open">باز</option>
            <option value="answered">پاسخ داده شده</option>
            <option value="customer_reply">در انتظار پاسخ</option>
            <option value="closed">بسته شده</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function MessagesSection({
  ticket,
  newMessage,
  setNewMessage,
  onSendMessage,
  fileInputRef,
  attachments,
  setAttachments,
}) {
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket.messages]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() && attachments.length === 0) return;

    onSendMessage(ticket.id, {
      sender: "admin",
      senderName: "اپراتور پشتیبانی",
      message: newMessage,
      attachments: attachments,
    });

    setNewMessage("");
    setAttachments([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-0">
      {/* لیست پیام‌ها */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6"
      >
        {ticket.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <FiMessageSquare size={48} className="mb-4" />
            <p className="text-lg">هنوز پیامی وجود ندارد</p>
            <p className="text-sm mt-2">اولین پاسخ را ارسال کنید</p>
          </div>
        ) : (
          ticket.messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isCustomer={message.sender === "customer"}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* بخش ارسال پیام جدید */}
      {ticket.status !== "closed" && !ticket.isArchived && (
        <div className="border-t border-gray-200 bg-white p-4 sm:p-6">
          {/* نمایش فایل‌های انتخاب شده */}
          {attachments.length > 0 && (
            <div className="mb-4 space-y-2">
              <p className="text-sm font-medium text-gray-700 mb-2">
                فایل‌های پیوست:
              </p>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-blue-50 border border-blue-200 p-2 sm:p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <FiPaperclip
                        size={14}
                        className="sm:size-4 text-blue-600 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-xs sm:text-sm font-medium text-blue-800 block truncate">
                          {file.name}
                        </span>
                        <span className="text-xs text-blue-600">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeAttachment(index)}
                      className="p-1 text-red-600 hover:text-red-800 transition-colors shrink-0"
                    >
                      <FiX size={14} className="sm:size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* آپلود فایل */}
            <div className="flex gap-2 sm:gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 sm:p-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors shrink-0 border border-gray-300"
                title="افزودن فایل"
              >
                <FiPaperclip size={18} className="sm:size-5" />
              </button>

              <input
                type="file"
                ref={fileInputRef}
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* فیلد متن پیام */}
            <div className="flex-1 relative min-w-0">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="پیام خود را وارد کنید..."
                rows={3}
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-20"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.ctrlKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <div className="absolute left-2 sm:left-3 bottom-2 sm:bottom-3 text-xs text-gray-500 bg-white px-2 py-1 rounded hidden sm:block">
                Ctrl + Enter برای ارسال
              </div>
            </div>

            {/* دکمه ارسال */}
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() && attachments.length === 0}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium"
            >
              <FiSend size={16} className="sm:size-[18px]" />
              <span className="hidden sm:inline">ارسال</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TicketInfoSidebar({ ticket, isSidebarOpen, toggleSidebar }) {
  const getCategoryText = (category) => {
    const categories = {
      technical: "فنی",
      financial: "مالی",
      sales: "فروش",
      general: "عمومی",
    };
    return categories[category] || category;
  };

  const timelineEvents = [
    { event: "ایجاد تیکت", date: ticket.createdAt, icon: FiMessageSquare },
    ...ticket.messages.slice(-3).map((msg) => ({
      event: `پیام از ${msg.senderName}`,
      date: msg.createdAt,
      icon: msg.sender === "customer" ? FiUser : FiMessageSquare,
    })),
  ];

  return (
    <>
      {/* دکمه باز/بستن سایدبار در موبایل */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed right-4 bottom-4 z-10 p-3 bg-blue-600 text-white rounded-full shadow-lg"
      >
        {isSidebarOpen ? (
          <FiChevronRight size={20} />
        ) : (
          <FiChevronLeft size={20} />
        )}
      </button>

      {/* سایدبار اطلاعات */}
      <div
        className={`fixed lg:relative inset-y-0 right-0 w-full sm:w-96 lg:w-80 bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out z-40 lg:z-auto ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* اطلاعات مشتری */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-base sm:text-lg">
              <FiUser size={18} className="sm:size-5" />
              اطلاعات مشتری
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">نام:</span>
                <span className="font-medium text-sm sm:text-base truncate ml-2">
                  {ticket.customer.name}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">ایمیل:</span>
                <span className="font-medium text-xs sm:text-sm truncate ml-2 text-blue-600">
                  {ticket.customer.email}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">تلفن:</span>
                <span className="font-medium text-sm sm:text-base">
                  {ticket.customer.phone}
                </span>
              </div>
            </div>
          </div>

          {/* اطلاعات تیکت */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-base sm:text-lg">
              <FiMessageSquare size={18} className="sm:size-5" />
              اطلاعات تیکت
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">دسته‌بندی:</span>
                <span className="font-medium text-sm sm:text-base">
                  {getCategoryText(ticket.category)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">اولویت:</span>
                <span className="font-medium text-sm sm:text-base capitalize">
                  {ticket.priority}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">وضعیت:</span>
                <span className="font-medium text-sm sm:text-base capitalize">
                  {ticket.status}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">آخرین بروزرسانی:</span>
                <span className="font-medium text-xs sm:text-sm">
                  {ticket.updatedAt}
                </span>
              </div>
            </div>
          </div>

          {/* تاریخچه */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-base sm:text-lg">
              <FiClock size={18} className="sm:size-5" />
              تاریخچه اخیر
            </h3>
            <div className="space-y-3">
              {timelineEvents.slice(-4).map((event, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {event.event}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay برای موبایل */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  );
}

export default function TicketDetailsModal({
  isOpen,
  onClose,
  ticket,
  onSendMessage,
  onUpdateStatus,
  onArchiveTicket,
}) {
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Close sidebar when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsSidebarOpen(false);
    }
  }, [isOpen]);

  if (!isOpen || !ticket) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[95vh] sm:h-[90vh] flex flex-col overflow-hidden">
        {/* هدر تیکت */}
        <TicketHeader
          ticket={ticket}
          onUpdateStatus={onUpdateStatus}
          onArchive={onArchiveTicket}
          onClose={onClose}
        />

        {/* محتوای اصلی */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* بخش پیام‌ها */}
          <div className="flex-1 flex flex-col min-w-0">
            <MessagesSection
              ticket={ticket}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              onSendMessage={onSendMessage}
              fileInputRef={fileInputRef}
              attachments={attachments}
              setAttachments={setAttachments}
            />
          </div>

          {/* سایدبار اطلاعات */}
          <TicketInfoSidebar
            ticket={ticket}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
      </div>
    </div>
  );
}
