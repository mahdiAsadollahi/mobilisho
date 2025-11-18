// app/components/DashboardSidebar/DashboardSidebar.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiShoppingBag,
  FiHeadphones,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
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
          w-64 bg-white shadow-lg border-l border-gray-200 h-screen
        `}
      >
        {/* Logo */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h1 className="text-lg md:text-xl font-bold text-black">
            پنل کاربری
          </h1>
        </div>

        {/* Menu */}
        <nav className="p-4">
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

        {/* Logout */}
        <div className="absolute cursor-pointer bottom-4 right-4 left-4">
          <button className="flex items-center cursor-pointer font-bold gap-3 w-full p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
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
