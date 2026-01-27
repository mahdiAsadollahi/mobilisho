// app/admin/users/components/UserTabs.js
"use client";
import { FiUser, FiUserCheck, FiUserX, FiShield } from "react-icons/fi";

function UserTabs({ activeTab, setActiveTab, users }) {
  const getRoleCount = (role) => {
    return users.filter((user) => user.role === role && !user.isBan).length;
  };

  const getTotalUsersCount = () => {
    return users.filter((user) => !user.isBan).length;
  };

  const getBannedUsersCount = () => {
    return users.filter((user) => user.isBan).length;
  };

  return (
    <div className="bg-white rounded-xl shadow mb-6">
      <div className="flex border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "all"
              ? "border-blue-500 text-blue-600 bg-blue-50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FiUser size={18} />
          همه کاربران
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
            {getTotalUsersCount()}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("USER")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "USER"
              ? "border-blue-500 text-blue-600 bg-blue-50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FiUserCheck size={18} />
          کاربران عادی
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
            {getRoleCount("USER")}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("ADMIN")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "ADMIN"
              ? "border-blue-500 text-blue-600 bg-blue-50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FiShield size={18} />
          ادمین‌ها
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
            {getRoleCount("ADMIN")}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("banned")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "banned"
              ? "border-blue-500 text-blue-600 bg-blue-50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FiUserX size={18} />
          کاربران مسدود
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
            {getBannedUsersCount()}
          </span>
        </button>
      </div>
    </div>
  );
}

export default UserTabs;
