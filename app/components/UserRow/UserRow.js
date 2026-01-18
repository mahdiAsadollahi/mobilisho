// app/admin/users/components/UserRow.js
"use client";
import {
  FiUser,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiLock,
  FiCheckCircle,
  FiUserCheck,
  FiShield,
  FiXCircle,
} from "react-icons/fi";
import { FaBan } from "react-icons/fa";

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
          <FaBan size={14} />
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
            <div className="text-xs text-gray-500">{user.phone}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col gap-2">{getRoleBadge(user.role)}</div>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col gap-2">{getStatusBadge(user)}</div>
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
              <FaBan size={16} />
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

export default UserRow;
