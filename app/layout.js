// app/layout.js
"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isDashboard, setIsDashboard] = useState(true); // مقدار پیش‌فرض true

  useEffect(() => {
    // این کد فقط در کلاینت اجرا می‌شود
    const dashboardCheck =
      pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");
    setIsDashboard(dashboardCheck);
  }, [pathname]);

  return (
    <html lang="fa" dir="rtl">
      <body>
        {!isDashboard && <Navbar />}
        {children}
        {!isDashboard && <Footer />}
      </body>
    </html>
  );
}
