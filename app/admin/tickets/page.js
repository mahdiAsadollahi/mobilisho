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
import Swal from "sweetalert2";

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

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/tickets`);
        const result = await response.json();

        console.log("TICKETS ->", result.data);

        if (result.data) {
          setTickets(result.data);
        } else {
          Swal.fire({
            icon: "error",
            title: "خطا در دریاقت تیکت ها",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "خطا در دریاقت تیکت ها",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [activeTab, filters]);

  const handleCreateTicket = async (ticketData) => {
    try {
      console.log("تیکت دریافتی:", ticketData);

      if (ticketData.apiResponse && ticketData.apiResponse.success) {
        console.log("تیکت جدید ایجاد شده:", newTicket);

        setTickets([newTicket, ...tickets]);
        setShowTicketModal(false);

        alert("تیکت با موفقیت ایجاد شد!");
      } else {
        console.error("پاسخ API نامعتبر:", ticketData.apiResponse);
        alert("خطا در ایجاد تیکت. لطفاً دوباره تلاش کنید.");
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("خطا در ایجاد تیکت. لطفاً دوباره تلاش کنید.");
    }
  };

  const handleSendMessage = async (ticketId, messageData) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          content: messageData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // ریفرش تیکت‌ها
        await fetchTickets();

        // اگر تیکت انتخاب شده است، آن را آپدیت کن
        if (selectedTicket && selectedTicket.id === ticketId) {
          const ticketResponse = await fetch(`/api/tickets/${ticketId}`);
          const ticketResult = await ticketResponse.json();

          if (ticketResult.success) {
            setSelectedTicket(ticketResult.data.ticket);
          }
        }
      } else {
        alert(result.message || "خطا در ارسال پیام");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("خطا در ارسال پیام");
    }
  };

  const handleUpdateTicketStatus = async (ticketId, status) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (result.success) {
        // آپدیت لیست تیکت‌ها
        setTickets((prev) =>
          prev.map((ticket) =>
            ticket.id === ticketId
              ? {
                  ...ticket,
                  status,
                  updatedAt: new Date().toLocaleString("fa-IR"),
                }
              : ticket
          )
        );
      } else {
        alert(result.message || "خطا در به‌روزرسانی وضعیت");
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
      alert("خطا در به‌روزرسانی وضعیت");
    }
  };

  const handleArchiveTicket = async (ticketId) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ isArchived: true }),
      });

      const result = await response.json();

      if (result.success) {
        // حذف تیکت از لیست
        setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId));
      } else {
        alert(result.message || "خطا در بایگانی تیکت");
      }
    } catch (error) {
      console.error("Error archiving ticket:", error);
      alert("خطا در بایگانی تیکت");
    }
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
