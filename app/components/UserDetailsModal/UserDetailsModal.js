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
                  alt={user.username}
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <FiUser className="text-gray-500" size={32} />
              )}
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800">
                {user.username}
              </h4>
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
                    {user.role === "ADMIN" ? "ادمین" : "کاربر عادی"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">وضعیت:</span>
                  <span
                    className={`font-medium ${
                      user.isBan ? "text-red-600" : "text-green-500"
                    }`}
                  >
                    {user.isBan ? "مسدود شده" : "فعال"}
                  </span>
                </div>
              </div>
            </div>

            {/* آمار خرید */}
            <div className="space-y-4">
              <h5 className="font-bold text-gray-800 border-b pb-2">
                آمار خرید
              </h5>
              <div className="space-y-2">
                {/* <div className="flex justify-between">
                  <span className="text-gray-600">تعداد سفارشات:</span>
                  <span className="font-medium">10 سفارش</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">مجموع خرید:</span>
                  <span className="font-medium">10,000,000 تومان</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">میانگین خرید:</span>
                  <span className="font-medium">2,100,000 تومان</span>
                </div> */}

                <div className="flex justify-between">
                  <span className="text-gray-700 font-bold text-xl">
                    در حال توسعه ...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsModal;
