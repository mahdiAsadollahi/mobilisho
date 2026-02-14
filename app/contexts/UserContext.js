// app/contexts/UserContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data?._id) {
        setUserData(data);
      } else {
        setUserData(null);
        if (response.status === 401) {
          router.push("/login");
        }
      }
    } catch (error) {
      console.error("خطا در دریافت اطلاعات کاربر:", error);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUserData(null);
      router.push("/login");
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        loading,
        refetch: fetchUserData,
        logout,
        isAuthenticated: !!userData,
      }}
    >
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
