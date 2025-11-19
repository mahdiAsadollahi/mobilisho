// app/layout.js
"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

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
