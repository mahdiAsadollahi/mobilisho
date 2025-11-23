// app/admin/support/page.js
"use client";
import { useState, useEffect } from "react";
import {
  FiMessageSquare,
  FiPlus,
  FiFilter,
  FiSearch,
  FiClock,
  FiCheckCircle,
  FiArchive,
  FiUsers,
} from "react-icons/fi";
import SupportStats from "@/app/components/SupportStats/SupportStats";
import TicketFilters from "@/app/components/TicketFilters/TicketFilters";
import TicketList from "@/app/components/TicketList/TicketList";
import TicketModal from "@/app/components/TicketModal/TicketModal";
import TicketDetailsModal from "@/app/components/TicketDetailsModal/TicketDetailsModal";

export default function SupportTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    priority: "",
    status: "",
  });

  // داده‌های نمونه بهبود یافته
  useEffect(() => {
    const sampleTickets = [
      {
        id: 1,
        ticketNumber: "TKT-2024-001",
        subject: "مشکل در پرداخت آنلاین",
        category: "financial",
        priority: "high",
        status: "open",
        customer: {
          id: 1,
          name: "محمد احمدی",
          email: "m.ahmadi@example.com",
          phone: "09123456789",
        },
        assignedTo: {
          id: 1,
          name: "پشتیبانی فروش",
        },
        messages: [
          {
            id: 1,
            sender: "customer",
            senderName: "محمد احمدی",
            message: "هنگام پرداخت آنلاین خطای 500 دریافت می‌کنم",
            attachments: [],
            createdAt: "1402/12/15 14:30",
            isRead: true,
          },
          {
            id: 2,
            sender: "admin",
            senderName: "پشتیبانی فروش",
            message: "لطفاً تصویر خطا را ارسال کنید تا بررسی کنیم",
            attachments: [],
            createdAt: "1402/12/15 15:45",
            isRead: true,
          },
        ],
        createdAt: "1402/12/15 14:30",
        updatedAt: "1402/12/15 15:45",
        lastReplyAt: "1402/12/15 15:45",
        isArchived: false,
      },
      {
        id: 2,
        ticketNumber: "TKT-2024-002",
        subject: "سوال درباره محصول جدید",
        category: "sales",
        priority: "medium",
        status: "answered",
        customer: {
          id: 2,
          name: "فاطمه زارعی",
          email: "f.zarei@example.com",
          phone: "09129876543",
        },
        assignedTo: {
          id: 2,
          name: "پشتیبانی فروش",
        },
        messages: [
          {
            id: 1,
            sender: "customer",
            senderName: "فاطمه زارعی",
            message: "آیا محصول جدید شما قابلیت ... را دارد؟",
            attachments: [],
            createdAt: "1402/12/16 10:20",
            isRead: true,
          },
          {
            id: 2,
            sender: "admin",
            senderName: "پشتیبانی فروش",
            message: "بله، محصول جدید تمام قابلیت‌های مورد نظر شما را دارد",
            attachments: [],
            createdAt: "1402/12/16 11:30",
            isRead: true,
          },
        ],
        createdAt: "1402/12/16 10:20",
        updatedAt: "1402/12/16 11:30",
        lastReplyAt: "1402/12/16 11:30",
        isArchived: false,
      },
    ];
    setTickets(sampleTickets);
  }, []);

  const handleCreateTicket = (ticketData) => {
    const newTicket = {
      id: Math.max(...tickets.map((t) => t.id), 0) + 1,
      ...ticketData,
      ticketNumber: `TKT-2024-${String(tickets.length + 1).padStart(3, "0")}`,
      status: "open",
      messages: [
        {
          id: 1,
          sender: "admin",
          senderName: "اپراتور پشتیبانی",
          message: ticketData.message,
          attachments: ticketData.attachments || [],
          createdAt:
            new Date().toLocaleDateString("fa-IR") +
            " " +
            new Date().toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          isRead: true,
        },
      ],
      createdAt:
        new Date().toLocaleDateString("fa-IR") +
        " " +
        new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      updatedAt:
        new Date().toLocaleDateString("fa-IR") +
        " " +
        new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      lastReplyAt:
        new Date().toLocaleDateString("fa-IR") +
        " " +
        new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      isArchived: false,
    };
    setTickets([newTicket, ...tickets]);
    setShowTicketModal(false);
  };

  const handleSendMessage = (ticketId, messageData) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              messages: [
                ...ticket.messages,
                {
                  id: Math.max(...ticket.messages.map((m) => m.id), 0) + 1,
                  ...messageData,
                  createdAt:
                    new Date().toLocaleDateString("fa-IR") +
                    " " +
                    new Date().toLocaleTimeString("fa-IR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  isRead: true,
                },
              ],
              status:
                messageData.sender === "admin" ? "answered" : "customer_reply",
              updatedAt:
                new Date().toLocaleDateString("fa-IR") +
                " " +
                new Date().toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              lastReplyAt:
                new Date().toLocaleDateString("fa-IR") +
                " " +
                new Date().toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
            }
          : ticket
      )
    );
  };

  const handleUpdateTicketStatus = (ticketId, status) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              status,
              updatedAt:
                new Date().toLocaleDateString("fa-IR") +
                " " +
                new Date().toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
            }
          : ticket
      )
    );
  };

  const handleArchiveTicket = (ticketId) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, isArchived: true } : ticket
      )
    );
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (activeTab === "archived" && !ticket.isArchived) return false;
    if (
      activeTab !== "all" &&
      activeTab !== "archived" &&
      ticket.status !== activeTab
    )
      return false;
    if (ticket.isArchived && activeTab !== "archived") return false;

    if (
      filters.search &&
      !ticket.subject.toLowerCase().includes(filters.search.toLowerCase()) &&
      !ticket.ticketNumber
        .toLowerCase()
        .includes(filters.search.toLowerCase()) &&
      !ticket.customer.name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    if (filters.category && ticket.category !== filters.category) return false;
    if (filters.priority && ticket.priority !== filters.priority) return false;
    if (filters.status && ticket.status !== filters.status) return false;

    return true;
  });

  const tabs = [
    { id: "all", name: "همه تیکت‌ها", icon: FiMessageSquare },
    { id: "open", name: "باز", icon: FiClock },
    { id: "answered", name: "پاسخ داده شده", icon: FiCheckCircle },
    { id: "customer_reply", name: "در انتظار پاسخ", icon: FiUsers },
    { id: "closed", name: "بسته شده", icon: FiArchive },
    { id: "archived", name: "بایگانی", icon: FiArchive },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* هدر */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              سیستم پشتیبانی
            </h1>
            <p className="text-gray-600">مدیریت تیکت‌های پشتیبانی مشتریان</p>
          </div>
          <button
            onClick={() => setShowTicketModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <FiPlus size={20} />
            <span className="font-medium">تیکت جدید</span>
          </button>
        </div>

        {/* آمار */}
        <div className="mb-8">
          <SupportStats tickets={tickets} />
        </div>

        {/* تب‌ها */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const count =
                tab.id === "all"
                  ? tickets.filter((t) => !t.isArchived).length
                  : tab.id === "archived"
                  ? tickets.filter((t) => t.isArchived).length
                  : tickets.filter((t) => t.status === tab.id && !t.isArchived)
                      .length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 border-b-2 transition-all duration-200 whitespace-nowrap flex-1 justify-center min-w-[140px] ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 bg-blue-50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="font-medium">{tab.name}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activeTab === tab.id
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* فیلترها */}
        <div className="mb-6">
          <TicketFilters
            filters={filters}
            onFilterChange={(key, value) =>
              setFilters((prev) => ({ ...prev, [key]: value }))
            }
            onResetFilters={() =>
              setFilters({
                search: "",
                category: "",
                priority: "",
                status: "",
              })
            }
          />
        </div>

        {/* لیست تیکت‌ها */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <TicketList
            tickets={filteredTickets}
            onViewDetails={(ticket) => {
              setSelectedTicket(ticket);
              setShowDetailsModal(true);
            }}
            onUpdateStatus={handleUpdateTicketStatus}
            onArchiveTicket={handleArchiveTicket}
          />
        </div>

        {/* مدال‌ها */}
        <TicketModal
          isOpen={showTicketModal}
          onClose={() => setShowTicketModal(false)}
          onSubmit={handleCreateTicket}
        />

        <TicketDetailsModal
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedTicket(null);
          }}
          ticket={selectedTicket}
          onSendMessage={handleSendMessage}
          onUpdateStatus={handleUpdateTicketStatus}
          onArchiveTicket={handleArchiveTicket}
        />
      </div>
    </div>
  );
}
