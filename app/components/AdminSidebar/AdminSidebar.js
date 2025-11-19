// app/components/AdminSidebar/AdminSidebar.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiGrid,
  FiShoppingBag,
  FiFileText,
  FiTag,
  FiShoppingCart,
  FiMessageSquare,
  FiUsers,
  FiStar,
  FiBarChart2,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState, useEffect } from "react";

const menuItems = [
  { href: "/admin", icon: FiHome, label: "پیشخوان" },
  { href: "/admin/categories", icon: FiGrid, label: "دسته‌بندی‌ها" },
  { href: "/admin/products", icon: FiShoppingBag, label: "محصولات" },
  { href: "/admin/articles", icon: FiFileText, label: "مقالات" },
  { href: "/admin/discounts", icon: FiTag, label: "تخفیف‌ها" },
  { href: "/admin/orders", icon: FiShoppingCart, label: "سفارشات" },
  { href: "/admin/tickets", icon: FiMessageSquare, label: "تیکت‌ها" },
  { href: "/admin/users", icon: FiUsers, label: "کاربران" },
  { href: "/admin/reviews", icon: FiStar, label: "نظرات" },
  { href: "/admin/reports", icon: FiBarChart2, label: "گزارشات" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const handleLinkClick = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {isMobile && (
        <button
          className="fixed top-4 right-4 z-50 bg-white p-2 rounded-lg shadow-md"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      )}

      <div
        className={`
          ${isMobile ? "fixed inset-y-0 right-0 z-40 transform" : "relative"} 
          ${
            isMobile && !isMobileMenuOpen ? "translate-x-full" : "translate-x-0"
          }
          transition-transform duration-300 ease-in-out
          w-64 bg-white shadow-lg border-l border-gray-200 h-screen
          flex flex-col
        `}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">پنل مدیریت</h1>
          <p className="text-sm text-gray-500 mt-1">فروشگاه اینترنتی</p>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                  >
                    <item.icon className="text-lg" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* بخش دکمه‌های پایینی */}
        <div className="mt-auto p-4 border-t border-gray-200 space-y-2">
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 w-full p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            <FiHome className="text-lg" />
            <span className="text-sm font-medium">بازگشت به سایت</span>
          </Link>

          <button className="flex items-center gap-3 w-full p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
            <FiLogOut />
            <span className="text-sm font-medium">خروج از پنل</span>
          </button>
        </div>
      </div>

      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
