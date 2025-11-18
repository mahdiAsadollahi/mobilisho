// app/dashboard/support/components/TicketDetails.jsx
"use client";

import { useState } from "react";
import {
  FiChevronRight,
  FiSend,
  FiPaperclip,
  FiUser,
  FiHeadphones,
  FiPhone,
} from "react-icons/fi";

const TicketDetails = ({ ticket, onBack, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    onSendMessage(ticket.id, newMessage);
    setNewMessage("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-yellow-100 text-yellow-800";
      case "answered":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* هدر */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
        >
          <FiChevronRight className="text-lg" />
          <span>بازگشت به لیست تیکت‌ها</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* بخش اصلی - تاریخچه مکالمات */}
        <div className="lg:col-span-3">
          {/* اطلاعات تیکت */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-black mb-2">
                  {ticket.subject}
                </h2>
                <p className="text-gray-500">شماره تیکت: {ticket.id}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    ticket.status
                  )}`}
                >
                  {ticket.status === "open" && "باز"}
                  {ticket.status === "answered" && "پاسخ داده شده"}
                  {ticket.status === "closed" && "بسته شده"}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                    ticket.priority
                  )}`}
                >
                  اولویت:{" "}
                  {(ticket.priority === "high" && "بالا") ||
                    (ticket.priority === "medium" && "متوسط") ||
                    (ticket.priority === "low" && "پایین")}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div>تاریخ ایجاد: {ticket.createdAt}</div>
              <div>آخرین بروزرسانی: {ticket.lastUpdate}</div>
            </div>
          </div>

          {/* تاریخچه مکالمات */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h3 className="font-semibold text-black mb-6">تاریخچه مکالمات</h3>

            <div className="space-y-6">
              {ticket.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* آواتار */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {message.sender === "user" ? <FiUser /> : <FiHeadphones />}
                  </div>

                  {/* محتوای پیام */}
                  <div
                    className={`flex-1 ${
                      message.sender === "user" ? "text-left" : "text-right"
                    }`}
                  >
                    <div
                      className={`inline-block p-4 rounded-2xl max-w-[80%] ${
                        message.sender === "user"
                          ? "bg-blue-50 border border-blue-200"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <p className="text-gray-800 whitespace-pre-wrap">
                        {message.message}
                      </p>

                      {/* فایل‌های پیوست */}
                      {message.attachments &&
                        message.attachments.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.attachments.map((attachment, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-sm text-gray-600 bg-white p-2 rounded border"
                              >
                                <FiPaperclip className="text-xs" />
                                <span>{attachment.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>

                    <div
                      className={`text-xs text-gray-500 mt-2 ${
                        message.sender === "user" ? "text-left" : "text-right"
                      }`}
                    >
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* فرم ارسال پیام جدید */}
            {ticket.status !== "closed" && (
              <form
                onSubmit={handleSendMessage}
                className="mt-8 pt-6 border-t border-gray-200"
              >
                <div className="flex gap-3">
                  <div className="flex-1">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="پیام خود را بنویسید..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows="3"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2 self-end"
                  >
                    <FiSend className="text-lg" />
                    <span className="hidden sm:block">ارسال</span>
                  </button>
                </div>

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <button
                    type="button"
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                  >
                    <FiPaperclip />
                    <span>افزودن فایل</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* سایدبار */}
        <div className="space-y-6">
          {/* اطلاعات تیکت */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h3 className="font-semibold text-black mb-4">اطلاعات تیکت</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">شماره تیکت:</span>
                <span className="font-mono">{ticket.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">وضعیت:</span>
                <span
                  className={
                    getStatusColor(ticket.status) +
                    " px-2 py-1 rounded-full text-xs"
                  }
                >
                  {ticket.status === "open" && "باز"}
                  {ticket.status === "answered" && "پاسخ داده شده"}
                  {ticket.status === "closed" && "بسته شده"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">اولویت:</span>
                <span
                  className={
                    getPriorityColor(ticket.priority) +
                    " px-2 py-1 rounded-full text-xs"
                  }
                >
                  {ticket.priority === "high" && "بالا"}
                  {ticket.priority === "medium" && "متوسط"}
                  {ticket.priority === "low" && "پایین"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">تاریخ ایجاد:</span>
                <span>{ticket.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">آخرین بروزرسانی:</span>
                <span>{ticket.lastUpdate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">تعداد پیام‌ها:</span>
                <span>{ticket.messages.length}</span>
              </div>
            </div>
          </div>

          {/* راهنمایی */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-3">راهنمایی</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• برای مشکلات فوری با پشتیبانی تلفنی تماس بگیرید</li>
              <li>• پیام‌های خود را واضح و کامل بنویسید</li>
              <li>• در صورت نیاز فایل پیوست کنید</li>
              <li>• معمولاً پاسخگویی کمتر از ۲۴ ساعت است</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
