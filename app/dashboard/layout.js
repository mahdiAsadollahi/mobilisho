// app/dashboard/layout.js
"use client";
import DashboardSidebar from "@/app/components/DashboardSidebar/DashboardSidebar";
import { UserProvider, useUser } from "@/app/contexts/UserContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function AuthCheck({ children }) {
  const { userData, loading } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading) {
      if (!userData) {
        router.push("/login");
      }
    }
  }, [mounted, loading, userData, router]);

  if (!mounted || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return children;
}

function DashboardLayoutContent({ children, isMobile }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <main className={`flex-1 overflow-auto ${isMobile ? "pt-16" : ""}`}>
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }) {
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
    <UserProvider>
      <AuthCheck>
        <DashboardLayoutContent isMobile={isMobile}>
          {children}
        </DashboardLayoutContent>
      </AuthCheck>
    </UserProvider>
  );
}
