// app/dashboard/layout.js
"use client";
import DashboardSidebar from "@/app/components/DashboardSidebar/DashboardSidebar";
import { useState, useEffect } from "react";

export default function DashboardLayout({ children }) {
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

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <main className={`flex-1 overflow-auto ${isMobile ? "pt-16" : ""}`}>
        {children}
      </main>
    </div>
  );
}
