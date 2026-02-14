// app/components/DashboardSidebar/DashboardSidebar.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/app/contexts/UserContext";
import {
  FiHome,
  FiShoppingBag,
  FiHeadphones,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiStar,
} from "react-icons/fi";
import { useState, useEffect } from "react";

const menuItems = [
  { href: "/dashboard", icon: FiHome, label: "داشبورد" },
  { href: "/dashboard/orders", icon: FiShoppingBag, label: "سفارشات" },
  { href: "/dashboard/support", icon: FiHeadphones, label: "پشتیبانی" },
  { href: "/dashboard/profile", icon: FiUser, label: "پروفایل" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { userData, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // تشخیص اندازه صفحه
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // بستن منو هنگام کلیک روی لینک در موبایل
  const handleLinkClick = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  // دریافت نقش به فارسی
  const getRoleLabel = (role) => {
    switch (role) {
      case "ADMIN":
        return "مدیر سیستم";
      case "USER":
        return "کاربر عادی";
      default:
        return role || "کاربر";
    }
  };

  return (
    <>
      {/* دکمه منو برای موبایل */}
      {isMobile && (
        <button
          className="fixed top-4 right-4 z-50 bg-white p-2 rounded-lg shadow-md"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      )}

      {/* سایدبار */}
      <div
        className={`
          ${isMobile ? "fixed inset-y-0 right-0 z-40 transform" : "relative"} 
          ${
            isMobile && !isMobileMenuOpen ? "translate-x-full" : "translate-x-0"
          }
          transition-transform duration-300 ease-in-out
          w-64 bg-white shadow-lg border-l border-gray-200 h-screen flex flex-col
        `}
      >
        {/* Header با اطلاعات کاربر */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg md:text-xl font-bold text-black mb-3">
            پنل کاربری
          </h1>

          {/* اطلاعات کاربر */}
          {userData && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiUser className="text-blue-600 text-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-black text-sm truncate">
                    {userData.username || "کاربر"}
                  </p>
                  <p className="text-xs text-gray-600 truncate direction-ltr text-left">
                    {userData.phone}
                  </p>
                </div>
              </div>

              {/* نقش کاربر */}
              <div className="flex items-center gap-1 text-xs">
                <FiStar className="text-yellow-500" size={12} />
                <span className="text-gray-700">
                  {getRoleLabel(userData.role)}
                </span>
              </div>

              {/* وضعیت حساب */}
              {userData.isBan ? (
                <div className="mt-2 text-xs text-red-600 bg-red-50 p-1 rounded text-center">
                  حساب کاربری مسدود است
                </div>
              ) : (
                <div className="mt-2 text-xs text-green-600 bg-green-50 p-1 rounded text-center">
                  حساب فعال
                </div>
              )}
            </div>
          )}
        </div>

        {/* Menu - با flex-grow برای پر کردن فضا */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`flex font-bold items-center gap-3 p-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-gray-100 text-black border-r-2 border-black"
                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
                    }`}
                  >
                    <item.icon className="text-lg" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* لینک بازگشت به سایت */}
        <div className="p-4 border-t border-gray-200">
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 w-full p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all mb-2"
          >
            <FiHome className="text-lg" />
            <span className="font-bold">بازگشت به سایت</span>
          </Link>

          {/* دکمه خروج */}
          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer font-bold gap-3 w-full p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            <FiLogOut />
            <span>خروج از اکانت</span>
          </button>
        </div>
      </div>

      {/* Overlay برای موبایل */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
