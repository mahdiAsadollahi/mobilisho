// app/admin/discounts/components/CampaignTable/CampaignTable.js
"use client";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

const CampaignTable = ({ campaigns, onEdit, onDelete, onView }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: "bg-green-100 text-green-800",
      scheduled: "bg-blue-100 text-blue-800",
      expired: "bg-red-100 text-red-800",
      draft: "bg-gray-100 text-gray-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs ${statusConfig[status]}`}
      >
        {status === "active"
          ? "فعال"
          : status === "scheduled"
          ? "زمان‌بندی شده"
          : status === "expired"
          ? "منقضی"
          : "پیش‌نویس"}
      </span>
    );
  };

  const getScopeText = (scope) => {
    const scopeMap = {
      all_products: "همه محصولات",
      category: "دسته‌بندی",
      specific_products: "محصولات خاص",
    };
    return scopeMap[scope] || scope;
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                نام کمپین
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                محدوده
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                تخفیف
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                وضعیت
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                بازه زمانی
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                اقدامات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div>
                    <span className="font-medium text-gray-900">
                      {campaign.name}
                    </span>
                    <p className="text-sm text-gray-500">
                      {campaign.description}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {getScopeText(campaign.scope)}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {campaign.discountType === "percentage"
                    ? `${campaign.discountValue}%`
                    : `${campaign.discountValue.toLocaleString()} تومان`}
                </td>
                <td className="px-4 py-4">{getStatusBadge(campaign.status)}</td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  <div>
                    <div>از: {campaign.startDate}</div>
                    <div>تا: {campaign.endDate}</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onView(campaign)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <FiEye size={16} />
                    </button>
                    <button
                      onClick={() => onEdit(campaign)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(campaign)}
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

export default CampaignTable;
