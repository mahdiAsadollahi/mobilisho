// app/contexts/UserContext.js
"use client";
import { cookies } from "next/headers";
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
      const cookiesStore = cookies();
      const token = (await cookiesStore).get("token");

      if (!token) {
        redirect("/login");
      }

      setLoading(true);
      const response = await fetch("/api/user");
      const data = await response.json();

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
