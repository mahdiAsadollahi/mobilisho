// app/admin/users/components/StatsCards.js
"use client";
import { FiUser, FiUserCheck, FiUserX, FiShield } from "react-icons/fi";

function StatsCards({ users }) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">کل کاربران</p>
            <p className="text-2xl font-bold text-gray-800">
              {getTotalUsersCount()}
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <FiUser className="text-blue-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">کاربران عادی</p>
            <p className="text-2xl font-bold text-green-600">
              {getRoleCount("USER")}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <FiUserCheck className="text-green-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">ادمین‌ها</p>
            <p className="text-2xl font-bold text-purple-600">
              {getRoleCount("ADMIN")}
            </p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <FiShield className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">کاربران مسدود</p>
            <p className="text-2xl font-bold text-red-600">
              {getBannedUsersCount()}
            </p>
          </div>
          <div className="p-3 bg-red-100 rounded-lg">
            <FiUserX className="text-red-600" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
