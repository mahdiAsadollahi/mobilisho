// app/dashboard/support/page.js
"use client";
import { useState } from "react";
import SupportTicketList from "@/app/components/SupportTicketList/SupportTicketList";
import TicketDetails from "@/app/components/TicketDetails/TicketDetails";
import CreateTicketModal from "@/app/components/CreateTicketModal/CreateTicketModal";
import { FiPhone, FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";

// داده‌های نمونه
const sampleTickets = [
  {
    id: "TKT-001",
    subject: "مشکل در پرداخت",
    status: "open",
    priority: "high",
    createdAt: "1402/10/15 - 14:30",
    lastUpdate: "1402/10/15 - 14:30",
    messages: [
      {
        id: 1,
        sender: "user",
        message: 'سلام، من هنگام پرداخت با خطای "تراکنش ناموفق" مواجه شدم.',
        timestamp: "1402/10/15 - 14:30",
        attachments: [],
      },
      {
        id: 2,
        sender: "support",
        message:
          "سلام وقت بخیر. لطفاً شماره تراکنش و تاریخ دقیق رو ارسال کنید تا بررسی کنیم.",
        timestamp: "1402/10/15 - 15:45",
        attachments: [],
      },
    ],
  },
  {
    id: "TKT-002",
    subject: "سوال درباره گارانتی محصول",
    status: "answered",
    priority: "medium",
    createdAt: "1402/10/10 - 09:15",
    lastUpdate: "1402/10/12 - 11:20",
    messages: [
      {
        id: 1,
        sender: "user",
        message: "گارانتی گوشی سامسونگ که خریدم چند ساله؟",
        timestamp: "1402/10/10 - 09:15",
        attachments: [],
      },
      {
        id: 2,
        sender: "support",
        message:
          "گارانتی محصولات سامسونگ 18 ماهه هست. مدارک گارانتی هم براتون ایمیل شد.",
        timestamp: "1402/10/12 - 11:20",
        attachments: [],
      },
    ],
  },
  {
    id: "TKT-003",
    subject: "پیگیری سفارش",
    status: "closed",
    priority: "low",
    createdAt: "1402/10/05 - 16:40",
    lastUpdate: "1402/10/08 - 10:15",
    messages: [
      {
        id: 1,
        sender: "user",
        message: "سفارش من کی ارسال میشه؟",
        timestamp: "1402/10/05 - 16:40",
        attachments: [],
      },
      {
        id: 2,
        sender: "support",
        message: "سفارش شما ارسال شده و فردا به دستتون میرسه.",
        timestamp: "1402/10/06 - 09:30",
        attachments: [],
      },
      {
        id: 3,
        sender: "user",
        message: "ممنون، دریافت شد.",
        timestamp: "1402/10/08 - 10:15",
        attachments: [],
      },
    ],
  },
];

export default function SupportPage() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState(sampleTickets);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleBackToList = () => {
    setSelectedTicket(null);
  };

  const handleCreateTicket = async (newTicketData) => {
    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          subject: newTicketData.subject,
          category: newTicketData.category,
          priority: newTicketData.priority,
          content: newTicketData.description,
          // userId ارسال نمی‌شود تا تیکت از طرف کاربر ایجاد شود
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("تیکت با موفقیت ایجاد شد");
        setCreateModalOpen(false);

        // ساخت تیکت جدید با استفاده از داده‌های API
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
          status: ticketData.status || "open",
          createdAt:
            new Date(ticketData.createdAt).toLocaleDateString("fa-IR") +
            " - " +
            new Date(ticketData.createdAt).toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          lastUpdate:
            new Date(
              ticketData.updatedAt || ticketData.createdAt
            ).toLocaleDateString("fa-IR") +
            " - " +
            new Date(
              ticketData.updatedAt || ticketData.createdAt
            ).toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          messages: [
            {
              id: Date.now(),
              sender: senderData.role === "ADMIN" ? "admin" : "user",
              senderName: senderData.username,
              message: newTicketData.description,
              timestamp:
                new Date(ticketData.createdAt).toLocaleDateString("fa-IR") +
                " - " +
                new Date(ticketData.createdAt).toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              attachments: [],
            },
          ],
          customer: {
            id: userData.id,
            name: userData.username,
            phone: userData.phone,
          },
          isArchived: false,
          createdByAdmin: ticketData.createdByAdmin || false,
        };

        // اضافه کردن تیکت جدید به لیست
        setTickets([newTicket, ...tickets]);

        // ریست فرم
        if (setFormData) {
          setFormData({
            subject: "",
            priority: "medium",
            category: "technical",
            description: "",
          });
        }
      } else {
        throw new Error(result.message || "خطا در ایجاد تیکت");
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error(error.message || "خطا در ایجاد تیکت");
    }
  };

  const handleSendMessage = async (ticketId, messageContent) => {
    try {
      // ۱. اول به API سرور ارسال کن
      const response = await fetch(`/api/tickets/${ticketId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          content: messageContent,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "خطا در ارسال پیام");
      }

      // ۲. بعد از موفقیت API، UI رو آپدیت کن
      const newMessage = {
        id: Date.now(), // یا از API بگیر
        sender: "user",
        senderName: "شما", // یا نام کاربر از API
        message: messageContent,
        timestamp:
          new Date().toLocaleDateString("fa-IR") +
          " - " +
          new Date().toLocaleTimeString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        attachments: [],
      };

      // آپدیت لیست تیکت‌ها
      setTickets((prev) =>
        prev.map((ticket) => {
          if (ticket.id === ticketId) {
            return {
              ...ticket,
              status: "customer_reply", // وضعیت به "در انتظار پاسخ" تغییر کند
              lastUpdate: newMessage.timestamp,
              messages: [...ticket.messages, newMessage],
            };
          }
          return ticket;
        })
      );

      // آپدیت تیکت انتخاب شده (اگر در صفحه جزئیات هستیم)
      if (selectedTicket && selectedTicket.id === ticketId) {
        setSelectedTicket((prev) => ({
          ...prev,
          status: "customer_reply",
          lastUpdate: newMessage.timestamp,
          messages: [...prev.messages, newMessage],
        }));
      }

      // نمایش موفقیت
      toast.success("پیام با موفقیت ارسال شد");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("خطا در ارسال پیام");
    }
  };

  // فیلتر کردن تیکت‌ها
  const filteredTickets =
    filter === "all"
      ? tickets
      : tickets.filter((ticket) => ticket.status === filter);

  if (selectedTicket) {
    return (
      <TicketDetails
        ticket={selectedTicket}
        onBack={handleBackToList}
        onSendMessage={handleSendMessage}
      />
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* هدر صفحه */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-black mb-2">
            پشتیبانی
          </h1>
          <p className="text-gray-600">مدیریت تیکت‌های پشتیبانی و تماس با ما</p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <span>تیکت جدید</span>
          <FiPlus className="text-lg" />
        </button>
      </div>

      {/* شماره تماس فوری */}
      <div className="bg-linear-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <FiPhone className="text-white text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                پشتیبانی تلفنی فوری
              </h3>
              <p className="text-gray-600 text-sm">
                برای مشکلات فوری با شماره زیر تماس بگیرید
              </p>
            </div>
          </div>
          <div className="text-left">
            <a
              href="tel:02112345678"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              ۰۲۱-۱۲۳۴۵۶۷۸
            </a>
            <p className="text-gray-500 text-sm mt-1">
              شنبه تا پنجشنبه، ۸ صبح تا ۵ عصر
            </p>
          </div>
        </div>
      </div>

      {/* فیلترها */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: "all", label: "همه تیکت‌ها", count: tickets.length },
          {
            key: "open",
            label: "باز",
            count: tickets.filter((t) => t.status === "open").length,
          },
          {
            key: "answered",
            label: "پاسخ داده شده",
            count: tickets.filter((t) => t.status === "answered").length,
          },
          {
            key: "closed",
            label: "بسته شده",
            count: tickets.filter((t) => t.status === "closed").length,
          },
        ].map((filterItem) => (
          <button
            key={filterItem.key}
            onClick={() => setFilter(filterItem.key)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === filterItem.key
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filterItem.label}
            <span className="mr-2 text-xs bg-white text-black bg-opacity-20 px-2 py-1 rounded-full">
              {filterItem.count}
            </span>
          </button>
        ))}
      </div>

      {/* لیست تیکت‌ها */}
      <SupportTicketList
        tickets={filteredTickets}
        onTicketSelect={handleTicketSelect}
      />

      {/* مودال ایجاد تیکت جدید */}
      <CreateTicketModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateTicket}
      />
    </div>
  );
}
