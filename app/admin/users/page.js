// app/admin/users/page.js
"use client";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import StatsCards from "@/app/components/StatsCards/StatsCards";
import UserTabs from "@/app/components/UserTabs/UserTabs";
import UserFilters from "@/app/components/UserFilters/UserFilters";
import UserRow from "@/app/components/UserRow/UserRow";
import EditUserModal from "@/app/components/EditUserModal/EditUserModal";
import UserDetailsModal from "@/app/components/UserDetailsModal/UserDetailsModal";
import DeleteModal from "@/app/components/DeleteModal/DeleteModal";
import Swal from "sweetalert2";

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

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();

      setUsers(data.data);
    };

    getUsers();
  }, []);

  const roleConfig = {
    USER: {
      color: "bg-green-100 text-green-800",
      text: "کاربر عادی",
      icon: FiUser,
    },
    ADMIN: {
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
      console.log("im in save user in page.js ->", formData);
      const user = {
        username: formData.username,
        phone: formData.phone,
        role: formData.role,
        password: formData.password,
      };

      if (!formData.username || formData.username.length < 3) {
        Swal.fire({
          icon: "warning",
          title: "نام کاربری نامعتبر",
          text: "نام کاربری باید حداقل ۳ کاراکتر داشته باشد",
          confirmButtonColor: "#3b82f6",
        });

        setLoading(false);

        return;
      }

      if (
        !formData.phone ||
        !/^(\+98|0)?9\d{9}$/.test(formData.phone.replace(/\s+/g, ""))
      ) {
        Swal.fire({
          icon: "warning",
          title: "شماره تلفن نامعتبر",
          text: "لطفا شماره تلفن معتبر وارد کنید (مانند 09123456789)",
          confirmButtonColor: "#3b82f6",
        });

        setLoading(false);

        return;
      }

      if (formData.password.length < 8) {
        Swal.fire({
          icon: "warning",
          title: "رمز عبور کوتاه",
          text: "رمز عبور باید حداقل ۸ کاراکتر داشته باشد",
          confirmButtonColor: "#3b82f6",
        });

        setLoading(false);

        return;
      }

      if (
        !/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/.test(
          formData.password
        )
      ) {
        Swal.fire({
          icon: "warning",
          title: "رمز عبور ضعیف",
          text: "رمز عبور باید شامل حروف بزرگ، کوچک، عدد و کاراکتر ویژه باشد",
          confirmButtonColor: "#3b82f6",
        });

        setLoading(false);

        return;
      }

      try {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const data = await res.json();

        if (res.ok) {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: "ثبت نام موفق",
            text: data.message || "حساب کاربری با موفقیت ایجاد شد",
          });

          const getUsers = async () => {
            const res = await fetch("/api/users");
            const data = await res.json();

            setUsers(data.data);
          };

          getUsers();
        } else {
          Swal.fire({
            icon: "error",
            title: "خطا در ثبت نام",
            text: data.message || "خطایی رخ داده است",
            confirmButtonColor: "#ef4444",
          });

          setLoading(false);
        }
      } catch (error) {
        console.error("Register error:", error);
        Swal.fire({
          icon: "error",
          title: "خطای ارتباط",
          text: "خطا در ارتباط با سرور. لطفا دوباره تلاش کنید",
          confirmButtonColor: "#ef4444",
        });

        setLoading(false);
      }
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
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <UserRow
                  key={user._id}
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
