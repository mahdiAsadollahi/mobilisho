// app/admin/page.js
"use client";
import {
  FiShoppingBag,
  FiUsers,
  FiMessageSquare,
  FiTrendingUp,
  FiDollarSign,
  FiPackage,
  FiFileText,
  FiShoppingCart,
} from "react-icons/fi";

const statsData = {
  totalSales: "۱۲,۵۰۰,۰۰۰",
  totalOrders: 156,
  totalUsers: 892,
  pendingTickets: 8,
  totalProducts: 245,
  totalArticles: 34,
  todayOrders: 23,
  conversionRate: "۳.۲٪",
};

export default function AdminDashboard() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
        پیشخوان مدیریت
      </h1>

      {/* کارت‌های آمار کلی */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="فروش کل"
          value={statsData.totalSales}
          subtitle="تومان"
          icon={FiDollarSign}
          color="green"
        />
        <StatCard
          title="سفارشات"
          value={statsData.totalOrders}
          subtitle="سفارش"
          icon={FiShoppingBag}
          color="blue"
        />
        <StatCard
          title="کاربران"
          value={statsData.totalUsers}
          subtitle="نفر"
          icon={FiUsers}
          color="purple"
        />
        <StatCard
          title="تیکت‌های باز"
          value={statsData.pendingTickets}
          subtitle="تیکت"
          icon={FiMessageSquare}
          color="orange"
        />
      </div>

      {/* کارت‌های آمار جزئی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="محصولات"
          value={statsData.totalProducts}
          subtitle="کالا"
          icon={FiPackage}
          color="indigo"
          small
        />
        <StatCard
          title="مقالات"
          value={statsData.totalArticles}
          subtitle="مقاله"
          icon={FiFileText}
          color="teal"
          small
        />
        <StatCard
          title="نرخ تبدیل"
          value={statsData.conversionRate}
          subtitle="میانگین"
          icon={FiTrendingUp}
          color="red"
          small
        />
      </div>

      {/* بخش‌های سریع */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions />
        <RecentActivities />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  small = false,
}) {
  const colorClasses = {
    green: "border-green-500 bg-green-50",
    blue: "border-blue-500 bg-blue-50",
    purple: "border-purple-500 bg-purple-50",
    orange: "border-orange-500 bg-orange-50",
    indigo: "border-indigo-500 bg-indigo-50",
    teal: "border-teal-500 bg-teal-50",
    red: "border-red-500 bg-red-50",
  };

  const iconColors = {
    green: "text-green-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
    indigo: "text-indigo-600",
    teal: "text-teal-600",
    red: "text-red-600",
  };

  return (
    <div
      className={`bg-white rounded-xl shadow border-r-4 p-4 ${colorClasses[color]}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p
            className={`font-bold text-gray-800 ${
              small ? "text-xl" : "text-2xl"
            }`}
          >
            {value}
          </p>
          <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-full bg-white`}>
          <Icon className={`text-lg ${iconColors[color]}`} />
        </div>
      </div>
    </div>
  );
}

function QuickActions() {
  const actions = [
    { label: "افزودن محصول جدید", href: "/admin/products/new" },
    { label: "مدیریت سفارشات", href: "/admin/orders" },
    { label: "بررسی نظرات", href: "/admin/reviews" },
    { label: "افزودن مقاله", href: "/admin/articles/new" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">دسترسی سریع</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <a
            key={index}
            href={action.href}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm text-gray-700">{action.label}</span>
            <FiShoppingCart className="text-gray-400" />
          </a>
        ))}
      </div>
    </div>
  );
}

function RecentActivities() {
  const activities = [
    {
      action: "سفارش جدید",
      details: "#ORD-0156",
      time: "۵ دقیقه پیش",
      type: "order",
    },
    {
      action: "ثبت نظر جدید",
      details: "برای محصول آیفون",
      time: "۱۵ دقیقه پیش",
      type: "review",
    },
    {
      action: "تیکت جدید",
      details: "پشتیبانی",
      time: "۳۰ دقیقه پیش",
      type: "ticket",
    },
    {
      action: "کاربر جدید",
      details: "ثبت نام کرده",
      time: "۱ ساعت پیش",
      type: "user",
    },
  ];

  const typeColors = {
    order: "bg-blue-100 text-blue-800",
    review: "bg-green-100 text-green-800",
    ticket: "bg-orange-100 text-orange-800",
    user: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">فعالیت‌های اخیر</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`px-2 py-1 rounded text-xs ${
                  typeColors[activity.type]
                }`}
              >
                {activity.action}
              </div>
              <span className="text-sm text-gray-600">{activity.details}</span>
            </div>
            <span className="text-xs text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
