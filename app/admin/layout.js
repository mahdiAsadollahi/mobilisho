// app/admin/layout.js
"use client";
import AdminSidebar from "@/app/components/AdminSidebar/AdminSidebar";
import { useState, useEffect } from "react";

export default function AdminLayout({ children }) {
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

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <main className={`flex-1 overflow-auto ${isMobile ? "pt-16" : ""}`}>
        {children}
      </main>
    </div>
  );
}
