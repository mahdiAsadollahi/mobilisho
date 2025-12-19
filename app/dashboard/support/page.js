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
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("تیکت با موفقیت ایجاد شد");
        setCreateModalOpen(false);

        // رفرش لیست تیکت‌ها
        fetchTickets(filter, 1);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error("خطا در ایجاد تیکت");
    }
  };

  const handleSendMessage = (ticketId, message) => {
    setTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.id === ticketId) {
          const newMessage = {
            id: ticket.messages.length + 1,
            sender: "user",
            message: message,
            timestamp:
              new Date().toLocaleDateString("fa-IR") +
              " - " +
              new Date().toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            attachments: [],
          };

          return {
            ...ticket,
            status: "open",
            lastUpdate:
              new Date().toLocaleDateString("fa-IR") +
              " - " +
              new Date().toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            messages: [...ticket.messages, newMessage],
          };
        }
        return ticket;
      })
    );

    // اگر در صفحه جزئیات هستیم، تیکت انتخاب شده رو هم آپدیت کنیم
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket((prev) => ({
        ...prev,
        status: "open",
        lastUpdate:
          new Date().toLocaleDateString("fa-IR") +
          " - " +
          new Date().toLocaleTimeString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        messages: [
          ...prev.messages,
          {
            id: prev.messages.length + 1,
            sender: "user",
            message: message,
            timestamp:
              new Date().toLocaleDateString("fa-IR") +
              " - " +
              new Date().toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            attachments: [],
          },
        ],
      }));
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
