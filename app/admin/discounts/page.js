// app/admin/discounts/page.js
"use client";
import { useState, useEffect } from "react";
import {
  FiPlus,
  FiTag,
  FiGrid,
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiEye,
} from "react-icons/fi";
import DiscountModal from "@/app/components/DiscountModal/DiscountModal";
import CampaignModal from "@/app/components/CampaignModal/CampaignModal";
import DeleteModal from "@/app/components/DeleteModal/DeleteModal";
import Swal from "sweetalert2";

export default function DiscountsManagement() {
  const [activeTab, setActiveTab] = useState("discounts");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    type: "",
    scope: "",
  });

  const [discounts, setDiscounts] = useState([]);

  const [campaigns, setCampaigns] = useState([]);

  const fetchData = async () => {
    const res = await fetch("/api/discounts");
    const data = await res.json();

    setDiscounts(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredDiscounts = discounts.filter((discount) => {
    if (
      filters.search &&
      !discount.code.toLowerCase().includes(filters.search.toLowerCase()) &&
      !discount.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    if (filters.status && discount.status !== filters.status) {
      return false;
    }
    if (filters.type && discount.type !== filters.type) {
      return false;
    }
    return true;
  });

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (
      filters.search &&
      !campaign.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !campaign.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    if (filters.status && campaign.status !== filters.status) {
      return false;
    }
    if (filters.scope && campaign.scope !== filters.scope) {
      return false;
    }
    return true;
  });

  const handleSaveDiscount = async (formData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (selectedItem) {
      setDiscounts(
        discounts.map((d) =>
          d.id === selectedItem.id ? { ...d, ...formData } : d
        )
      );
    } else {
      const newDiscount = {
        id: Math.max(...discounts.map((d) => d.id), 0) + 1,
        ...formData,
        usedCount: 0,
        createdAt: new Intl.DateTimeFormat("fa-IR").format(new Date()),
      };
      setDiscounts([...discounts, newDiscount]);
    }

    setLoading(false);
    setShowDiscountModal(false);
    setSelectedItem(null);
  };

  const handleSaveCampaign = async (formData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (selectedItem) {
      setCampaigns(
        campaigns.map((c) =>
          c.id === selectedItem.id ? { ...c, ...formData } : c
        )
      );
    } else {
      const newCampaign = {
        id: Math.max(...campaigns.map((c) => c.id), 0) + 1,
        ...formData,
        createdAt: new Intl.DateTimeFormat("fa-IR").format(new Date()),
      };
      setCampaigns([...campaigns, newCampaign]);
    }

    setLoading(false);
    setShowCampaignModal(false);
    setSelectedItem(null);
  };

  const openCreateModal = () => {
    setSelectedItem(null);
    if (activeTab === "discounts") {
      setShowDiscountModal(true);
    } else {
      setShowCampaignModal(true);
    }
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    if (activeTab === "discounts") {
      setShowDiscountModal(true);
    } else {
      setShowCampaignModal(true);
    }
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const item = selectedItem;

      setLoading(true);

      const result = await Swal.fire({
        title: "آیا مطمئن هستید؟",
        text: `کد تخفیف "${item.code}" حذف خواهد شد`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "بله، حذف کن",
        cancelButtonText: "لغو",
      });

      if (result.isConfirmed) {
        const response = await fetch(`/api/discounts/${item._id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setDiscounts(discounts.filter((d) => d._id !== item._id));

          Swal.fire({
            title: "حذف شد!",
            text: "تخفیف با موفقیت حذف شد.",
            icon: "success",
            timer: 1500,
          });
        } else {
          const data = await response.json();
          Swal.fire({
            title: "خطا",
            text: data.message || "خطا در حذف تخفیف",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error deleting discount:", error);
      Swal.fire({
        title: "خطا در ارتباط با سرور",
        icon: "error",
      });
    } finally {
      setLoading(false);
      setSelectedItem(null);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ search: "", status: "", type: "", scope: "" });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", text: "فعال" },
      inactive: { color: "bg-red-100 text-red-800", text: "غیرفعال" },
      expired: { color: "bg-gray-100 text-gray-800", text: "منقضی" },
      scheduled: { color: "bg-blue-100 text-blue-800", text: "زمان‌بندی شده" },
      draft: { color: "bg-yellow-100 text-yellow-800", text: "پیش‌نویس" },
    };
    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const typeConfig = {
      public: { color: "bg-blue-600 text-white", text: "عمومی" },
      specific_product: {
        color: "bg-purple-600 text-white",
        text: "محصول خاص",
      },
      specific_customer: {
        color: "bg-green-600 text-white",
        text: "مشتری خاص",
      },
      first_purchase: {
        color: "bg-pink-600 text-white",
        text: "اولین خرید",
      },
    };
    const config = typeConfig[type] || typeConfig.public;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            مدیریت تخفیف‌ها و کمپین‌ها
          </h1>
          <p className="text-gray-600 text-sm">
            مدیریت کدهای تخفیف و کمپین‌های فروشگاهی
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0"
        >
          <FiPlus size={18} />
          {activeTab === "discounts" ? "ایجاد کد تخفیف" : "ایجاد کمپین جدید"}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("discounts")}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
              activeTab === "discounts"
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FiTag size={18} />
            کدهای تخفیف
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {discounts.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("campaigns")}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
              activeTab === "campaigns"
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FiGrid size={18} />
            کمپین‌ها
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {campaigns.length}
            </span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FiFilter size={18} />
            فیلترها
          </h3>
          <button
            onClick={resetFilters}
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
              placeholder="جستجو..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">همه وضعیت‌ها</option>
            {activeTab === "discounts" ? (
              <>
                <option value="active">فعال</option>
                <option value="inactive">غیرفعال</option>
                <option value="expired">منقضی</option>
              </>
            ) : (
              <>
                <option value="active">فعال</option>
                <option value="scheduled">زمان‌بندی شده</option>
                <option value="draft">پیش‌نویس</option>
                <option value="expired">منقضی</option>
              </>
            )}
          </select>

          {activeTab === "discounts" ? (
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">همه انواع</option>
              <option value="public">عمومی</option>
              <option value="specific_product">محصول خاص</option>
              <option value="specific_customer">مشتری خاص</option>
              <option value="first_purchase">اولین خرید</option>
            </select>
          ) : (
            <select
              value={filters.scope}
              onChange={(e) => handleFilterChange("scope", e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">همه محدوده‌ها</option>
              <option value="all_products">همه محصولات</option>
              <option value="category">دسته‌بندی</option>
              <option value="specific_products">محصولات خاص</option>
              <option value="collection">مجموعه</option>
            </select>
          )}

          <div className="flex items-center justify-end">
            <span className="text-sm text-gray-600">
              {activeTab === "discounts"
                ? `${filteredDiscounts.length} مورد یافت شد`
                : `${filteredCampaigns.length} مورد یافت شد`}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {activeTab === "discounts" ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    کد تخفیف
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    توضیحات
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    نوع
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    مقدار
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    وضعیت
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    انقضا
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDiscounts.map((discount) => (
                  <tr key={discount._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">
                        {discount.code}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-600">
                        {discount.description}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {getTypeBadge(discount.discountType)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {discount.value_type === "percentage"
                          ? `${discount.value}%`
                          : `${discount.value.toLocaleString()} تومان`}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {getStatusBadge(discount.status)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-600">
                        {discount.expiry_date}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(discount)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(discount)}
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
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    نام کمپین
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    توضیحات
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    محدوده
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تخفیف
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    وضعیت
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    بازه زمانی
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">
                        {campaign.name}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-600">
                        {campaign.description}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        {campaign.scope === "all_products" && "همه محصولات"}
                        {campaign.scope === "category" && "دسته‌بندی"}
                        {campaign.scope === "specific_products" &&
                          "محصولات خاص"}
                        {campaign.scope === "collection" && "مجموعه"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {campaign.value_type === "percentage"
                          ? `${campaign.discountValue}%`
                          : `${campaign.discountValue.toLocaleString()} تومان`}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {getStatusBadge(campaign.status)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-600">
                        {campaign.startDate} تا {campaign.endDate}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(campaign)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(campaign)}
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
        )}
      </div>

      <DiscountModal
        isOpen={showDiscountModal}
        onClose={() => {
          setShowDiscountModal(false);
          setSelectedItem(null);
        }}
        onSave={(formData) => {
          Swal.fire({
            title: "تخفیف با موفقیت ذخیره شد",
            icom: "success",
          });
          setShowDiscountModal(false);
          setSelectedItem(null);
        }}
        discount={selectedItem}
        loading={loading}
      />

      <CampaignModal
        isOpen={showCampaignModal}
        onClose={() => {
          setShowCampaignModal(false);
          setSelectedItem(null);
        }}
        onSave={handleSaveCampaign}
        campaign={selectedItem}
        loading={loading}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedItem(null);
        }}
        onConfirm={handleDelete}
        title={`حذف ${activeTab === "discounts" ? "کد تخفیف" : "کمپین"}`}
        message={`آیا از حذف ${
          activeTab === "discounts"
            ? `کد تخفیف "${selectedItem?.code}"`
            : `کمپین "${selectedItem?.name}"`
        } اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        loading={loading}
      />
    </div>
  );
}
