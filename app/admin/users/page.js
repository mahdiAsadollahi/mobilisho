// app/admin/users/page.js
"use client";
import { useState, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiUser,
  FiUserCheck,
  FiUserX,
  FiShield,
  FiMail,
  FiCalendar,
  FiEye,
  FiLock,
  FiBan,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

// کامپوننت آمارها
function StatsCards({ users }) {
  const getRoleCount = (role) => {
    return users.filter((user) => user.role === role && !user.isBanned).length;
  };

  const getTotalUsersCount = () => {
    return users.filter((user) => !user.isBanned).length;
  };

  const getBannedUsersCount = () => {
    return users.filter((user) => user.isBanned).length;
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
              {getRoleCount("user")}
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
              {getRoleCount("admin")}
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

// کامپوننت تب‌ها
function UserTabs({ activeTab, setActiveTab, users }) {
  const getRoleCount = (role) => {
    return users.filter((user) => user.role === role && !user.isBanned).length;
  };

  const getTotalUsersCount = () => {
    return users.filter((user) => !user.isBanned).length;
  };

  const getBannedUsersCount = () => {
    return users.filter((user) => user.isBanned).length;
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
          onClick={() => setActiveTab("user")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "user"
              ? "border-blue-500 text-blue-600 bg-blue-50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FiUserCheck size={18} />
          کاربران عادی
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
            {getRoleCount("user")}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("admin")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "admin"
              ? "border-blue-500 text-blue-600 bg-blue-50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FiShield size={18} />
          ادمین‌ها
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
            {getRoleCount("admin")}
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

// کامپوننت فیلترها
function UserFilters({ filters, onFilterChange, onResetFilters }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <FiFilter size={18} />
          فیلترهای پیشرفته
        </h3>
        <button
          onClick={onResetFilters}
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          پاک کردن فیلترها
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو نام، ایمیل یا شماره تلفن..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={filters.role}
          onChange={(e) => onFilterChange("role", e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">همه نقش‌ها</option>
          <option value="user">کاربر عادی</option>
          <option value="admin">ادمین</option>
          <option value="moderator">مدیر محتوا</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">همه وضعیت‌ها</option>
          <option value="active">فعال</option>
          <option value="inactive">غیرفعال</option>
          <option value="banned">مسدود</option>
        </select>

        <div className="relative">
          <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="از تاریخ (1402/12/01)"
            value={filters.dateFrom}
            onChange={(e) => onFilterChange("dateFrom", e.target.value)}
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}

// کامپوننت ردیف جدول
function UserRow({
  user,
  onEdit,
  onDelete,
  onViewDetails,
  onBan,
  onUnban,
  onResetPassword,
  onRoleChange,
  roleConfig,
  statusConfig,
}) {
  const getRoleBadge = (role) => {
    const config = roleConfig[role] || roleConfig.user;
    const IconComponent = config.icon;
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${config.color}`}
      >
        <IconComponent size={14} />
        {config.text}
      </span>
    );
  };

  const getStatusBadge = (user) => {
    if (user.isBanned) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex items-center gap-1 w-fit">
          <FiBan size={14} />
          مسدود شده
        </span>
      );
    }

    const config = statusConfig[user.status] || statusConfig.active;
    const IconComponent = config.icon;
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${config.color}`}
      >
        <IconComponent size={14} />
        {config.text}
      </span>
    );
  };

  return (
    <tr key={user.id} className="hover:bg-gray-50">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <FiUser className="text-gray-500" size={20} />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-600">{user.email}</div>
            <div className="text-xs text-gray-500">{user.phone}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col gap-2">
          {getRoleBadge(user.role)}
          <div className="text-xs text-gray-500">عضویت: {user.joinDate}</div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col gap-2">
          {getStatusBadge(user)}
          <div className="text-xs text-gray-500">
            آخرین فعالیت: {user.lastActivity}
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col gap-1">
          <div className="text-sm text-gray-900">{user.ordersCount} سفارش</div>
          <div className="text-xs text-gray-500">
            مجموع خرید: {user.totalSpent.toLocaleString()} تومان
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-1 flex-wrap">
          <button
            onClick={() => onViewDetails(user)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="مشاهده جزئیات"
          >
            <FiEye size={16} />
          </button>
          <button
            onClick={() => onEdit(user)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="ویرایش"
          >
            <FiEdit2 size={16} />
          </button>

          {user.role !== "admin" && (
            <select
              value={user.role}
              onChange={(e) => onRoleChange(user, e.target.value)}
              className="p-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              title="تغییر نقش"
            >
              <option value="user">کاربر</option>
              <option value="moderator">مدیر محتوا</option>
              <option value="admin">ادمین</option>
            </select>
          )}

          <button
            onClick={() => onResetPassword(user)}
            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
            title="ریست پسوورد"
          >
            <FiLock size={16} />
          </button>

          {!user.isBanned ? (
            <button
              onClick={() => onBan(user)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="مسدود کردن"
            >
              <FiBan size={16} />
            </button>
          ) : (
            <button
              onClick={() => onUnban(user)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="رفع مسدودیت"
            >
              <FiCheckCircle size={16} />
            </button>
          )}

          <button
            onClick={() => onDelete(user)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="حذف"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

// کامپوننت مودال ویرایش کاربر
function EditUserModal({ isOpen, onClose, user, onSave, loading }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    status: "active",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "user",
        status: user.status || "active",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "user",
        status: "active",
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">
            {user ? "ویرایش کاربر" : "کاربر جدید"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiXCircle size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نام کامل
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ایمیل
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              شماره تلفن
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نقش
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="user">کاربر عادی</option>
              <option value="moderator">مدیر محتوا</option>
              <option value="admin">ادمین</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              وضعیت
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">فعال</option>
              <option value="inactive">غیرفعال</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "در حال ذخیره..." : "ذخیره"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// کامپوننت مودال حذف
function DeleteModal({ isOpen, onClose, onConfirm, title, message, loading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              انصراف
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? "در حال حذف..." : "حذف"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// کامپوننت مودال جزئیات کاربر
function UserDetailsModal({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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

export default function UsersManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    role: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "محمد احمدی",
      email: "m.ahmadi@example.com",
      phone: "09123456789",
      role: "admin",
      status: "active",
      isBanned: false,
      joinDate: "1402/10/15",
      lastActivity: "1402/12/20 - 14:30",
      ordersCount: 12,
      totalSpent: 12500000,
      averageOrderValue: 1041666,
      address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
      postalCode: "1234567890",
      avatar: null,
    },
    {
      id: 2,
      name: "فاطمه محمدی",
      email: "f.mohammadi@example.com",
      phone: "09129876543",
      role: "user",
      status: "active",
      isBanned: false,
      joinDate: "1402/11/20",
      lastActivity: "1402/12/19 - 09:15",
      ordersCount: 5,
      totalSpent: 3200000,
      averageOrderValue: 640000,
      address: "اصفهان، خیابان چهارباغ، پلاک ۴۵",
      postalCode: "9876543210",
      avatar: null,
    },
    {
      id: 3,
      name: "رضا کریمی",
      email: "r.karimi@example.com",
      phone: "09351234567",
      role: "user",
      status: "inactive",
      isBanned: true,
      joinDate: "1402/09/10",
      lastActivity: "1402/11/25 - 16:45",
      ordersCount: 2,
      totalSpent: 850000,
      averageOrderValue: 425000,
      address: "مشهد، بلوار وکیل آباد، پلاک ۷۸",
      postalCode: "4567891230",
      avatar: null,
    },
    {
      id: 4,
      name: "سارا نوروزی",
      email: "s.noroozi@example.com",
      phone: "09107654321",
      role: "moderator",
      status: "active",
      isBanned: false,
      joinDate: "1402/12/01",
      lastActivity: "1402/12/21 - 11:20",
      ordersCount: 8,
      totalSpent: 5600000,
      averageOrderValue: 700000,
      address: "شیراز، خیابان زند، پلاک ۳۴",
      postalCode: "7891234560",
      avatar: null,
    },
  ]);

  const roleConfig = {
    user: {
      color: "bg-green-100 text-green-800",
      text: "کاربر عادی",
      icon: FiUser,
    },
    moderator: {
      color: "bg-purple-100 text-purple-800",
      text: "مدیر محتوا",
      icon: FiShield,
    },
    admin: {
      color: "bg-blue-100 text-blue-800",
      text: "ادمین",
      icon: FiShield,
    },
  };

  const statusConfig = {
    active: {
      color: "bg-green-100 text-green-800",
      text: "فعال",
      icon: FiCheckCircle,
    },
    inactive: {
      color: "bg-yellow-100 text-yellow-800",
      text: "غیرفعال",
      icon: FiUserX,
    },
  };

  const filteredUsers = users.filter((user) => {
    if (activeTab === "banned" && !user.isBanned) return false;
    if (
      activeTab !== "all" &&
      activeTab !== "banned" &&
      user.role !== activeTab
    ) {
      return false;
    }
    if (activeTab !== "banned" && user.isBanned) return false;

    if (
      filters.search &&
      !user.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !user.email.toLowerCase().includes(filters.search.toLowerCase()) &&
      !user.phone.includes(filters.search)
    ) {
      return false;
    }

    if (filters.role && user.role !== filters.role) {
      return false;
    }

    if (filters.status && user.status !== filters.status) {
      return false;
    }

    if (filters.dateFrom && user.joinDate < filters.dateFrom) {
      return false;
    }
    if (filters.dateTo && user.joinDate > filters.dateTo) {
      return false;
    }

    return true;
  });

  const handleSaveUser = async (formData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                ...formData,
                lastActivity:
                  new Date().toLocaleDateString("fa-IR") +
                  " - " +
                  new Date().toLocaleTimeString("fa-IR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
              }
            : user
        )
      );
    } else {
      const newUser = {
        id: Math.max(...users.map((u) => u.id), 0) + 1,
        ...formData,
        isBanned: false,
        joinDate: new Date().toLocaleDateString("fa-IR"),
        lastActivity:
          new Date().toLocaleDateString("fa-IR") +
          " - " +
          new Date().toLocaleTimeString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        ordersCount: 0,
        totalSpent: 0,
        averageOrderValue: 0,
        address: "",
        postalCode: "",
        avatar: null,
      };
      setUsers([...users, newUser]);
    }

    setLoading(false);
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleDelete = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setUsers(users.filter((user) => user.id !== selectedUser.id));

    setLoading(false);
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleBanUser = async (user) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setUsers(
      users.map((u) =>
        u.id === user.id
          ? {
              ...u,
              isBanned: true,
              lastActivity:
                new Date().toLocaleDateString("fa-IR") +
                " - " +
                new Date().toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
            }
          : u
      )
    );

    setLoading(false);
  };

  const handleUnbanUser = async (user) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setUsers(
      users.map((u) =>
        u.id === user.id
          ? {
              ...u,
              isBanned: false,
              lastActivity:
                new Date().toLocaleDateString("fa-IR") +
                " - " +
                new Date().toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
            }
          : u
      )
    );

    setLoading(false);
  };

  const handleResetPassword = async (user) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // در اینجا معمولا ایمیل ریست پسوورد ارسال می‌شود
    alert(`لینک ریست پسوورد برای کاربر ${user.name} ارسال شد`);

    setLoading(false);
  };

  const handleRoleChange = async (user, newRole) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setUsers(
      users.map((u) =>
        u.id === user.id
          ? {
              ...u,
              role: newRole,
              lastActivity:
                new Date().toLocaleDateString("fa-IR") +
                " - " +
                new Date().toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
            }
          : u
      )
    );

    setLoading(false);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const openDetailsModal = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      role: "",
      status: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            مدیریت کاربران
          </h1>
          <p className="text-gray-600 text-sm">
            مشاهده و مدیریت کاربران فروشگاه
          </p>
        </div>
        <button
          onClick={() => setShowEditModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mt-4 sm:mt-0"
        >
          <FiUser size={18} />
          کاربر جدید
        </button>
      </div>

      <StatsCards users={users} />
      <UserTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        users={users}
      />
      <UserFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
      />

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  اطلاعات کاربر
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  نقش و عضویت
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  وضعیت
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  آمار خرید
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onEdit={openEditModal}
                  onDelete={openDeleteModal}
                  onViewDetails={openDetailsModal}
                  onBan={handleBanUser}
                  onUnban={handleUnbanUser}
                  onResetPassword={handleResetPassword}
                  onRoleChange={handleRoleChange}
                  roleConfig={roleConfig}
                  statusConfig={statusConfig}
                />
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              هیچ کاربری یافت نشد
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <EditUserModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedUser(null);
        }}
        onSave={handleSaveUser}
        user={selectedUser}
        loading={loading}
      />

      <UserDetailsModal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDelete}
        title="حذف کاربر"
        message={`آیا از حذف کاربر "${selectedUser?.name}" اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        loading={loading}
      />
    </div>
  );
}
