// app/contexts/UserContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // const response = await fetch("/api/user");
      // const data = await response.json();

      // داده‌های نمونه
      const data = {
        id: 1,
        name: "کاربر نمونه",
        email: "user@example.com",
        orders: 12,
        supportTickets: 5,
        openTickets: 3,
        userSince: "1402/08/15",
        role: "user",
        permissions: ["view_orders", "create_ticket"],
      };

      setUserData(data);
    } catch (error) {
      console.error("خطا در دریافت اطلاعات کاربر:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ userData, loading, refetch: fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser باید داخل UserProvider استفاده شود");
  }
  return context;
}
