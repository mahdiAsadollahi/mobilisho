// app/layout.js
"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isDashboard, setIsDashboard] = useState(true);

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

        {/* کامپوننت Toaster برای نمایش پیام‌ها */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
              fontFamily: "Vazirmatn, sans-serif",
              fontSize: "14px",
              borderRadius: "8px",
              padding: "12px 16px",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
            loading: {
              duration: Infinity,
              iconTheme: {
                primary: "#3b82f6",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
