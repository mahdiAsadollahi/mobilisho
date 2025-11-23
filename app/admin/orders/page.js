// app/admin/orders/page.js
"use client";
import { useState, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiEye,
  FiCalendar,
  FiPackage,
  FiShoppingBag,
  FiTruck,
  FiArchive,
  FiDollarSign,
  FiBox,
} from "react-icons/fi";
import { FiX } from "react-icons/fi";
import OrderModal from "@/app/components/OrderModal/OrderModal";
import DeleteModal from "@/app/components/DeleteModal/DeleteModal";
import OrderDetailsModal from "@/app/components/OrderDetailsModal/OrderDetailsModal";

// کامپوننت آمارها
function StatsCards({ orders, viewMode }) {
  const getStatusCount = (status) => {
    return orders.filter(
      (order) =>
        order.status === status &&
        (viewMode === "active" ? !order.isArchived : order.isArchived)
    ).length;
  };

  const getTotalOrdersCount = () => {
    return orders.filter((order) =>
      viewMode === "active" ? !order.isArchived : order.isArchived
    ).length;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">کل سفارشات</p>
            <p className="text-2xl font-bold text-gray-800">
              {getTotalOrdersCount()}
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <FiShoppingBag className="text-blue-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">در انتظار تایید</p>
            <p className="text-2xl font-bold text-yellow-600">
              {getStatusCount("pending")}
            </p>
          </div>
          <div className="p-3 bg-yellow-100 rounded-lg">
            <FiPackage className="text-yellow-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">ارسال شده</p>
            <p className="text-2xl font-bold text-purple-600">
              {getStatusCount("shipped")}
            </p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <FiTruck className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">تحویل شده</p>
            <p className="text-2xl font-bold text-green-600">
              {getStatusCount("delivered")}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <FiBox className="text-green-600" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

// کامپوننت تب‌ها
function OrderTabs({ activeTab, setActiveTab, orders, viewMode }) {
  const getStatusCount = (status) => {
    return orders.filter(
      (order) =>
        order.status === status &&
        (viewMode === "active" ? !order.isArchived : order.isArchived)
    ).length;
  };

  const getTotalOrdersCount = () => {
    return orders.filter((order) =>
      viewMode === "active" ? !order.isArchived : order.isArchived
    ).length;
  };

  return (
    <div className="bg-white rounded-xl shadow mb-6">
      <div className="flex border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "all"
              ? "border-blue-500 text-blue-600 bg-blue-50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FiShoppingBag size={18} />
          همه سفارشات
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
            {getTotalOrdersCount()}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "pending"
              ? "border-blue-500 text-blue-600 bg-blue-50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FiPackage size={18} />
          در انتظار تایید
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
            {getStatusCount("pending")}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("confirmed")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "confirmed"
              ? "border-blue-500 text-blue-600 bg-blue-50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FiCheck size={18} />
          تایید شده
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
            {getStatusCount("confirmed")}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("shipped")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "shipped"
              ? "border-blue-500 text-blue-600 bg-blue-50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FiTruck size={18} />
          ارسال شده
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
            {getStatusCount("shipped")}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("delivered")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "delivered"
              ? "border-blue-500 text-blue-600 bg-blue-50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FiBox size={18} />
          تحویل شده
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
            {getStatusCount("delivered")}
          </span>
        </button>
      </div>
    </div>
  );
}

// کامپوننت فیلترها
function OrderFilters({ filters, onFilterChange, onResetFilters }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <FiFilter size={18} />
          فیلترهای پیشرفته
        </h3>
        <button
          onClick={onResetFilters}
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          پاک کردن فیلترها
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو شماره سفارش، کد فاکتور، مشتری یا تلفن..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">همه وضعیت‌ها</option>
          <option value="pending">در انتظار تایید</option>
          <option value="confirmed">تایید شده</option>
          <option value="shipped">ارسال شده</option>
          <option value="delivered">تحویل شده</option>
          <option value="cancelled">لغو شده</option>
        </select>

        <select
          value={filters.paymentMethod}
          onChange={(e) => onFilterChange("paymentMethod", e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">همه روش‌های پرداخت</option>
          <option value="online">پرداخت آنلاین</option>
          <option value="cash">پرداخت در محل</option>
          <option value="bank">کارت به کارت</option>
        </select>

        <div className="relative">
          <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="از تاریخ (1402/12/01)"
            value={filters.dateFrom}
            onChange={(e) => onFilterChange("dateFrom", e.target.value)}
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}

// کامپوننت ردیف جدول
function OrderRow({
  order,
  onEdit,
  onDelete,
  onViewDetails,
  onConfirm,
  onShip,
  onDeliver,
  onArchive,
  onRestore,
  statusConfig,
  paymentMethodConfig,
}) {
  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${config.color}`}
      >
        <IconComponent size={14} />
        {config.text}
      </span>
    );
  };

  const getPaymentMethodBadge = (method) => {
    const config = paymentMethodConfig[method] || paymentMethodConfig.online;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  return (
    <tr key={order.id} className="hover:bg-gray-50">
      <td className="px-4 py-4">
        <div className="flex flex-col gap-1">
          <div className="font-medium text-gray-900">#{order.orderNumber}</div>
          <div className="text-sm text-gray-600">{order.invoiceCode}</div>
          <div className="text-xs text-gray-500">
            {order.createdAt} - {order.createdTime}
          </div>
          <div className="text-xs text-gray-500">
            {order.items.length} قلم کالا
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col gap-1">
          <div className="font-medium text-gray-900">{order.customer.name}</div>
          <div className="text-sm text-gray-600">{order.customer.phone}</div>
          <div className="text-xs text-gray-500 truncate max-w-[200px]">
            {order.customer.address}
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col gap-1">
          <div className="font-medium text-gray-900">
            {order.finalAmount.toLocaleString()} تومان
          </div>
          <div className="text-sm text-gray-600">
            {getPaymentMethodBadge(order.paymentMethod)}
          </div>
          <div className="text-xs text-gray-500">
            {order.paymentStatus === "paid" ? "پرداخت شده" : "در انتظار پرداخت"}
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col gap-2">
          {getStatusBadge(order.status)}
          <div className="text-xs text-gray-500">آپدیت: {order.updatedAt}</div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-1 flex-wrap">
          <button
            onClick={() => onViewDetails(order)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="مشاهده جزئیات"
          >
            <FiEye size={16} />
          </button>
          <button
            onClick={() => onEdit(order)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="ویرایش"
          >
            <FiEdit2 size={16} />
          </button>

          {order.status === "pending" && (
            <button
              onClick={() => onConfirm(order)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="تایید سفارش"
            >
              <FiCheck size={16} />
            </button>
          )}

          {order.status === "confirmed" && (
            <button
              onClick={() => onShip(order)}
              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              title="ثبت ارسال"
            >
              <FiTruck size={16} />
            </button>
          )}

          {order.status === "shipped" && (
            <button
              onClick={() => onDeliver(order)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="ثبت تحویل"
            >
              <FiBox size={16} />
            </button>
          )}

          {!order.isArchived ? (
            <button
              onClick={() => onArchive(order)}
              className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              title="بایگانی"
            >
              <FiArchive size={16} />
            </button>
          ) : (
            <button
              onClick={() => onRestore(order)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="بازیابی"
            >
              <FiArchive size={16} />
            </button>
          )}

          <button
            onClick={() => onDelete(order)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="حذف"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function OrdersManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("active");

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    dateFrom: "",
    dateTo: "",
    paymentMethod: "",
    shippingMethod: "",
  });

  const [orders, setOrders] = useState([
    // داده‌های نمونه (همان داده‌های قبلی)
    {
      id: 1,
      orderNumber: "ORD-2024-1001",
      invoiceCode: "INV-2024-001",
      createdAt: "1402/12/15",
      createdTime: "14:30",
      updatedAt: "1402/12/15",
      status: "pending",
      totalAmount: 1250000,
      shippingCost: 50000,
      discount: 100000,
      finalAmount: 1200000,
      paymentMethod: "online",
      paymentStatus: "paid",
      customer: {
        name: "محمد احمدی",
        phone: "09123456789",
        email: "m.ahmadi@example.com",
        address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
        postalCode: "1234567890",
      },
      items: [
        {
          id: 1,
          name: "گوشی موبایل سامسونگ گلکسی S24",
          price: 800000,
          quantity: 1,
          total: 800000,
          variants: { color: "مشکی", storage: "256GB" },
        },
        {
          id: 2,
          name: "قاب محافظ گلس",
          price: 150000,
          quantity: 2,
          total: 300000,
          variants: { color: "شفاف" },
        },
      ],
      shipping: {
        method: "express",
        cost: 50000,
        trackingCode: "TRK123456789",
        estimatedDelivery: "1402/12/18",
      },
      timeline: {
        created: { date: "1402/12/15", time: "14:30" },
        confirmed: null,
        shipped: null,
        delivered: null,
      },
      notes: "مشتری درخواست تحویل در صبح را دارد",
      isArchived: false,
    },
    // ... سایر داده‌ها
  ]);

  const statusConfig = {
    pending: {
      color: "bg-yellow-100 text-yellow-800",
      text: "در انتظار تایید",
      icon: FiPackage,
    },
    confirmed: {
      color: "bg-blue-100 text-blue-800",
      text: "تایید شده",
      icon: FiCheck,
    },
    shipped: {
      color: "bg-purple-100 text-purple-800",
      text: "ارسال شده",
      icon: FiTruck,
    },
    delivered: {
      color: "bg-green-100 text-green-800",
      text: "تحویل شده",
      icon: FiBox,
    },
    cancelled: { color: "bg-red-100 text-red-800", text: "لغو شده", icon: FiX },
  };

  const paymentMethodConfig = {
    online: { text: "آنلاین", color: "bg-green-100 text-green-800" },
    cash: { text: "پرداخت در محل", color: "bg-orange-100 text-orange-800" },
    bank: { text: "کارت به کارت", color: "bg-blue-100 text-blue-800" },
  };

  const filteredOrders = orders.filter((order) => {
    if (viewMode === "active" && order.isArchived) return false;
    if (viewMode === "archived" && !order.isArchived) return false;

    if (activeTab !== "all" && order.status !== activeTab) {
      return false;
    }

    if (
      filters.search &&
      !order.orderNumber.toLowerCase().includes(filters.search.toLowerCase()) &&
      !order.invoiceCode.toLowerCase().includes(filters.search.toLowerCase()) &&
      !order.customer.name
        .toLowerCase()
        .includes(filters.search.toLowerCase()) &&
      !order.customer.phone.includes(filters.search)
    ) {
      return false;
    }

    if (filters.status && order.status !== filters.status) {
      return false;
    }

    if (
      filters.paymentMethod &&
      order.paymentMethod !== filters.paymentMethod
    ) {
      return false;
    }

    if (filters.dateFrom && order.createdAt < filters.dateFrom) {
      return false;
    }
    if (filters.dateTo && order.createdAt > filters.dateTo) {
      return false;
    }

    return true;
  });

  const handleSaveOrder = async (formData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (selectedOrder) {
      setOrders(
        orders.map((order) =>
          order.id === selectedOrder.id
            ? {
                ...order,
                ...formData,
                updatedAt: new Date().toLocaleDateString("fa-IR"),
              }
            : order
        )
      );
    } else {
      const newOrder = {
        id: Math.max(...orders.map((o) => o.id), 0) + 1,
        ...formData,
        orderNumber: `ORD-2024-${1000 + orders.length + 1}`,
        invoiceCode: `INV-2024-00${orders.length + 1}`,
        createdAt: new Date().toLocaleDateString("fa-IR"),
        createdTime: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        updatedAt: new Date().toLocaleDateString("fa-IR"),
        isArchived: false,
        timeline: {
          created: {
            date: new Date().toLocaleDateString("fa-IR"),
            time: new Date().toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
          confirmed: null,
          shipped: null,
          delivered: null,
        },
      };
      setOrders([...orders, newOrder]);
    }

    setLoading(false);
    setShowOrderModal(false);
    setSelectedOrder(null);
  };

  const handleDelete = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setOrders(orders.filter((order) => order.id !== selectedOrder.id));

    setLoading(false);
    setShowDeleteModal(false);
    setSelectedOrder(null);
  };

  const handleConfirmOrder = async (order) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setOrders(
      orders.map((o) =>
        o.id === order.id
          ? {
              ...o,
              status: "confirmed",
              updatedAt: new Date().toLocaleDateString("fa-IR"),
              timeline: {
                ...o.timeline,
                confirmed: {
                  date: new Date().toLocaleDateString("fa-IR"),
                  time: new Date().toLocaleTimeString("fa-IR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              },
            }
          : o
      )
    );

    setLoading(false);
  };

  const handleShipOrder = async (order) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setOrders(
      orders.map((o) =>
        o.id === order.id
          ? {
              ...o,
              status: "shipped",
              updatedAt: new Date().toLocaleDateString("fa-IR"),
              timeline: {
                ...o.timeline,
                shipped: {
                  date: new Date().toLocaleDateString("fa-IR"),
                  time: new Date().toLocaleTimeString("fa-IR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              },
            }
          : o
      )
    );

    setLoading(false);
  };

  const handleDeliverOrder = async (order) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setOrders(
      orders.map((o) =>
        o.id === order.id
          ? {
              ...o,
              status: "delivered",
              updatedAt: new Date().toLocaleDateString("fa-IR"),
              timeline: {
                ...o.timeline,
                delivered: {
                  date: new Date().toLocaleDateString("fa-IR"),
                  time: new Date().toLocaleTimeString("fa-IR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              },
            }
          : o
      )
    );

    setLoading(false);
  };

  const handleArchiveOrder = async (order) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setOrders(
      orders.map((o) =>
        o.id === order.id
          ? {
              ...o,
              isArchived: true,
              updatedAt: new Date().toLocaleDateString("fa-IR"),
            }
          : o
      )
    );

    setLoading(false);
  };

  const handleRestoreOrder = async (order) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setOrders(
      orders.map((o) =>
        o.id === order.id
          ? {
              ...o,
              isArchived: false,
              updatedAt: new Date().toLocaleDateString("fa-IR"),
            }
          : o
      )
    );

    setLoading(false);
  };

  const openEditModal = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const openDeleteModal = (order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const openDetailsModal = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      status: "",
      dateFrom: "",
      dateTo: "",
      paymentMethod: "",
      shippingMethod: "",
    });
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            مدیریت سفارشات
          </h1>
          <p className="text-gray-600 text-sm">
            مشاهده و مدیریت تمام سفارشات فروشگاه
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <button
            onClick={() => setViewMode("active")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === "active"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            سفارشات فعال
          </button>
          <button
            onClick={() => setViewMode("archived")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === "archived"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <FiArchive className="inline ml-1" />
            بایگانی شده
          </button>
          <button
            onClick={() => setShowOrderModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <FiShoppingBag size={18} />
            سفارش جدید
          </button>
        </div>
      </div>

      <StatsCards orders={orders} viewMode={viewMode} />
      <OrderTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        orders={orders}
        viewMode={viewMode}
      />
      <OrderFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
      />

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  اطلاعات سفارش
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  مشتری
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  اطلاعات مالی
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  وضعیت
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onEdit={openEditModal}
                  onDelete={openDeleteModal}
                  onViewDetails={openDetailsModal}
                  onConfirm={handleConfirmOrder}
                  onShip={handleShipOrder}
                  onDeliver={handleDeliverOrder}
                  onArchive={handleArchiveOrder}
                  onRestore={handleRestoreOrder}
                  statusConfig={statusConfig}
                  paymentMethodConfig={paymentMethodConfig}
                />
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              هیچ سفارشی یافت نشد
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <OrderModal
        isOpen={showOrderModal}
        onClose={() => {
          setShowOrderModal(false);
          setSelectedOrder(null);
        }}
        onSave={handleSaveOrder}
        order={selectedOrder}
        loading={loading}
      />

      <OrderDetailsModal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedOrder(null);
        }}
        onConfirm={handleDelete}
        title="حذف سفارش"
        message={`آیا از حذف سفارش شماره ${selectedOrder?.orderNumber} اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        loading={loading}
      />
    </div>
  );
}
