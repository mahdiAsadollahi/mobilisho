// app/admin/users/components/UserDetailsModal.js
"use client";
import { FiUser, FiXCircle } from "react-icons/fi";

function UserDetailsModal({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">جزئیات کاربر</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiXCircle size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* اطلاعات پایه */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <FiUser className="text-gray-500" size={32} />
              )}
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800">{user.name}</h4>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-500 text-sm">{user.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* اطلاعات حساب */}
            <div className="space-y-4">
              <h5 className="font-bold text-gray-800 border-b pb-2">
                اطلاعات حساب
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">نقش:</span>
                  <span className="font-medium">
                    {user.role === "admin"
                      ? "ادمین"
                      : user.role === "moderator"
                      ? "مدیر محتوا"
                      : "کاربر عادی"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">وضعیت:</span>
                  <span
                    className={`font-medium ${
                      user.isBanned
                        ? "text-red-600"
                        : user.status === "active"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {user.isBanned
                      ? "مسدود شده"
                      : user.status === "active"
                      ? "فعال"
                      : "غیرفعال"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">تاریخ عضویت:</span>
                  <span className="font-medium">{user.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">آخرین فعالیت:</span>
                  <span className="font-medium">{user.lastActivity}</span>
                </div>
              </div>
            </div>

            {/* آمار خرید */}
            <div className="space-y-4">
              <h5 className="font-bold text-gray-800 border-b pb-2">
                آمار خرید
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">تعداد سفارشات:</span>
                  <span className="font-medium">{user.ordersCount} سفارش</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">مجموع خرید:</span>
                  <span className="font-medium">
                    {user.totalSpent.toLocaleString()} تومان
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">میانگین خرید:</span>
                  <span className="font-medium">
                    {user.averageOrderValue?.toLocaleString()} تومان
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* اطلاعات تماس */}
          <div className="space-y-4">
            <h5 className="font-bold text-gray-800 border-b pb-2">
              اطلاعات تماس
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">آدرس</label>
                <p className="text-gray-800">{user.address || "ثبت نشده"}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  کد پستی
                </label>
                <p className="text-gray-800">{user.postalCode || "ثبت نشده"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsModal;
