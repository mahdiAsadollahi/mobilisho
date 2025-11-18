// app/dashboard/page.js
"use client";
import {
  FiShoppingBag,
  FiHeadphones,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";

// داده‌های نمونه
const dashboardData = {
  orders: 12,
  supportTickets: 5,
  openTickets: 3,
  userSince: "1402/08/15",
};

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold text-black mb-4 md:mb-6">
        داشبورد کاربر
      </h1>

      {/* کارت‌های آمار */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {/* تعداد سفارشات */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6 border-r-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm">تعداد سفارشات</p>
              <p className="text-lg md:text-2xl font-bold text-black mt-1 md:mt-2">
                {dashboardData.orders}
              </p>
            </div>
            <div className="bg-blue-100 p-2 md:p-3 rounded-full">
              <FiShoppingBag className="text-blue-600 text-lg md:text-xl" />
            </div>
          </div>
        </div>

        {/* تیکت‌های پشتیبانی */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6 border-r-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm">
                تیکت‌های پشتیبانی
              </p>
              <p className="text-lg md:text-2xl font-bold text-black mt-1 md:mt-2">
                {dashboardData.supportTickets}
              </p>
            </div>
            <div className="bg-green-100 p-2 md:p-3 rounded-full">
              <FiHeadphones className="text-green-600 text-lg md:text-xl" />
            </div>
          </div>
        </div>

        {/* تیکت‌های باز */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6 border-r-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm">تیکت‌های باز</p>
              <p className="text-lg md:text-2xl font-bold text-black mt-1 md:mt-2">
                {dashboardData.openTickets}
              </p>
            </div>
            <div className="bg-orange-100 p-2 md:p-3 rounded-full">
              <FiMessageSquare className="text-orange-600 text-lg md:text-xl" />
            </div>
          </div>
        </div>

        {/* تاریخ عضویت */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6 border-r-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm">تاریخ عضویت</p>
              <p className="text-base md:text-lg font-bold text-black mt-1 md:mt-2">
                {dashboardData.userSince}
              </p>
            </div>
            <div className="bg-purple-100 p-2 md:p-3 rounded-full">
              <FiUser className="text-purple-600 text-lg md:text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* بخش اخیرا */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* آخرین سفارشات */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h3 className="text-base md:text-lg font-bold text-black mb-3 md:mb-4">
            آخرین سفارشات
          </h3>
          <div className="space-y-2 md:space-y-3">
            <div className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded">
              <span className="text-xs md:text-sm">سفارش #ORD-001</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                تحویل شده
              </span>
            </div>
            <div className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded">
              <span className="text-xs md:text-sm">سفارش #ORD-002</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                در حال ارسال
              </span>
            </div>
          </div>
        </div>

        {/* تیکت‌های اخیر */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h3 className="text-base md:text-lg font-bold text-black mb-3 md:mb-4">
            تیکت‌های اخیر
          </h3>
          <div className="space-y-2 md:space-y-3">
            <div className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded">
              <span className="text-xs md:text-sm">مشکل در پرداخت</span>
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                در حال بررسی
              </span>
            </div>
            <div className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded">
              <span className="text-xs md:text-sm">سوال درباره محصول</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                پاسخ داده شده
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
