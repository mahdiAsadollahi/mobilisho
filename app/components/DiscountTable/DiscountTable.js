// app/admin/discounts/components/DiscountTable/DiscountTable.js
"use client";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

const DiscountTable = ({ discounts, onEdit, onDelete, onView }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      expired: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs ${statusConfig[status]}`}
      >
        {status === "active"
          ? "فعال"
          : status === "inactive"
          ? "غیرفعال"
          : "منقضی"}
      </span>
    );
  };

  const getTypeText = (type) => {
    const typeMap = {
      product: "محصول خاص",
      customer: "مشتری خاص",
      event: "رویداد",
      general: "عمومی",
    };
    return typeMap[type] || type;
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                کد تخفیف
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                نوع
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                مقدار
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                وضعیت
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                تاریخ انقضا
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                اقدامات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {discounts.map((discount) => (
              <tr key={discount.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div>
                    <span className="font-medium text-gray-900">
                      {discount.code}
                    </span>
                    <p className="text-sm text-gray-500">
                      {discount.description}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {getTypeText(discount.type)}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {discount.discountType === "percentage"
                    ? `${discount.value}%`
                    : `${discount.value.toLocaleString()} تومان`}
                </td>
                <td className="px-4 py-4">{getStatusBadge(discount.status)}</td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {discount.expiresAt}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onView(discount)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <FiEye size={16} />
                    </button>
                    <button
                      onClick={() => onEdit(discount)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(discount)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiscountTable;
