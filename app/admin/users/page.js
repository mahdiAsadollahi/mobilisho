// app/admin/users/page.js
"use client";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import StatsCards from "@/app/components/StatsCards/StatsCards";
import UserTabs from "@/app/components/UserTabs/UserTabs";
import UserFilters from "@/app/components/UserFilters/UserFilters";
import UserRow from "@/app/components/UserRow/UserRow";
import EditUserModal from "@/app/components/EditUserModal/EditUserModal";
import UserDetailsModal from "@/app/components/UserDetailsModal/UserDetailsModal";
import DeleteModal from "@/app/components/DeleteModal/DeleteModal";

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
      icon: () => <FiUser size={14} />, // در اینجا باید یک آیکون مناسب استفاده شود
    },
    admin: {
      color: "bg-blue-100 text-blue-800",
      text: "ادمین",
      icon: () => <FiUser size={14} />, // در اینجا باید یک آیکون مناسب استفاده شود
    },
  };

  const statusConfig = {
    active: {
      color: "bg-green-100 text-green-800",
      text: "فعال",
      icon: () => <FiUser size={14} />, // در اینجا باید یک آیکون مناسب استفاده شود
    },
    inactive: {
      color: "bg-yellow-100 text-yellow-800",
      text: "غیرفعال",
      icon: () => <FiUser size={14} />, // در اینجا باید یک آیکون مناسب استفاده شود
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
