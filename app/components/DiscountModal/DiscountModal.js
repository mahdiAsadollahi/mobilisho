// app/admin/discounts/components/DiscountModal/DiscountModal.js
"use client";
import { useState, useEffect } from "react";
import {
  FiX,
  FiCalendar,
  FiPercent,
  FiDollarSign,
  FiSearch,
  FiUser,
  FiPackage,
} from "react-icons/fi";
import JalaliDatePicker from "@/app/components/JalaliDatePicker/JalaliDatePicker";

// داده‌های فیک برای نمایش
const fakeCustomers = [
  { id: 1, name: "محمد احمدی", email: "m.ahmadi@example.com" },
  { id: 2, name: "فاطمه محمدی", email: "f.mohammadi@example.com" },
  { id: 3, name: "علی رضایی", email: "a.rezaei@example.com" },
  { id: 4, name: "زهرا کریمی", email: "z.karimi@example.com" },
  { id: 5, name: "حسین نجفی", email: "h.najafi@example.com" },
];

const fakeProducts = [
  { id: 1, name: "گوشی موبایل سامسونگ", sku: "SM-A123" },
  { id: 2, name: "لپ تاپ ایسوس", sku: "AS-X456" },
  { id: 3, name: "هدفون سونی", sku: "SN-W789" },
  { id: 4, name: "ماوس لاجیتک", sku: "LG-M321" },
  { id: 5, name: "کیبورد مکانیکال", sku: "MK-C654" },
];

const DiscountModal = ({ isOpen, onClose, onSave, discount, loading }) => {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    type: "general",
    discountType: "percentage",
    value: "",
    maxUsage: "",
    usedCount: 0,
    minOrderAmount: "",
    expiresAt: "",
    status: "active",
    targetCustomers: [],
    targetProducts: [],
  });

  const [customerSearch, setCustomerSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  useEffect(() => {
    if (discount) {
      setFormData({
        ...discount,
        expiresAt: discount.expiresAt || "",
        targetCustomers: discount.targetCustomers || [],
        targetProducts: discount.targetProducts || [],
      });
    } else {
      setFormData({
        code: "",
        description: "",
        type: "general",
        discountType: "percentage",
        value: "",
        maxUsage: "",
        usedCount: 0,
        minOrderAmount: "",
        expiresAt: "",
        status: "active",
        targetCustomers: [],
        targetProducts: [],
      });
    }
  }, [discount]);

  const filteredCustomers = fakeCustomers.filter(
    (customer) =>
      customer.name.includes(customerSearch) ||
      customer.email.includes(customerSearch)
  );

  const filteredProducts = fakeProducts.filter(
    (product) =>
      product.name.includes(productSearch) ||
      product.sku.includes(productSearch)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.code.trim()) {
      alert("لطفا کد تخفیف را وارد کنید");
      return;
    }
    if (!formData.value || Number(formData.value) <= 0) {
      alert("لطفا مقدار تخفیف را وارد کنید");
      return;
    }

    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addCustomer = (customer) => {
    if (!formData.targetCustomers.find((c) => c.id === customer.id)) {
      handleChange("targetCustomers", [...formData.targetCustomers, customer]);
    }
    setCustomerSearch("");
    setShowCustomerDropdown(false);
  };

  const removeCustomer = (customerId) => {
    handleChange(
      "targetCustomers",
      formData.targetCustomers.filter((c) => c.id !== customerId)
    );
  };

  const addProduct = (product) => {
    if (!formData.targetProducts.find((p) => p.id === product.id)) {
      handleChange("targetProducts", [...formData.targetProducts, product]);
    }
    setProductSearch("");
    setShowProductDropdown(false);
  };

  const removeProduct = (productId) => {
    handleChange(
      "targetProducts",
      formData.targetProducts.filter((p) => p.id !== productId)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* هدر */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">
              {discount ? "ویرایش کد تخفیف" : "ایجاد کد تخفیف جدید"}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={loading}
            >
              <FiX size={20} />
            </button>
          </div>

          {/* فرم */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ردیف اول */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  کد تخفیف *
                </label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => handleChange("code", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: SUMMER20"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع تخفیف *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                >
                  <option value="general">عمومی</option>
                  <option value="product">محصول خاص</option>
                  <option value="customer">مشتری خاص</option>
                  <option value="event">رویداد</option>
                  <option value="first_order">اولین خرید</option>
                </select>
              </div>
            </div>

            {/* توضیحات */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                توضیحات
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={2}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="توضیح مختصر درباره تخفیف..."
                disabled={loading}
              />
            </div>

            {/* ردیف دوم */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع مقدار *
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleChange("discountType", "percentage")}
                    disabled={loading}
                    className={`flex items-center justify-center gap-2 flex-1 p-3 border-2 rounded-lg transition-all ${
                      formData.discountType === "percentage"
                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                        : "border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                    } ${
                      loading
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <FiPercent className="text-lg" />
                    <span>درصدی</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange("discountType", "fixed")}
                    disabled={loading}
                    className={`flex items-center justify-center gap-2 flex-1 p-3 border-2 rounded-lg transition-all ${
                      formData.discountType === "fixed"
                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                        : "border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                    } ${
                      loading
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <FiDollarSign className="text-lg" />
                    <span>مبلغ ثابت</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مقدار تخفیف *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  max={
                    formData.discountType === "percentage" ? "100" : undefined
                  }
                  value={formData.value}
                  onChange={(e) => handleChange("value", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={
                    formData.discountType === "percentage" ? "20" : "50000"
                  }
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  حداکثر استفاده
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.maxUsage}
                  onChange={(e) => handleChange("maxUsage", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="نامحدود"
                  disabled={loading}
                />
              </div>
            </div>

            {/* ردیف سوم */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  حداقل مبلغ سفارش
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.minOrderAmount}
                  onChange={(e) =>
                    handleChange("minOrderAmount", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="بدون محدودیت"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تاریخ انقضا
                </label>
                <JalaliDatePicker
                  value={formData.expiresAt}
                  onChange={(date) => handleChange("expiresAt", date)}
                  placeholder="انتخاب تاریخ"
                  outputFormat="jalali"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وضعیت
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                >
                  <option value="active">فعال</option>
                  <option value="inactive">غیرفعال</option>
                </select>
              </div>
            </div>

            {/* انتخاب مشتریان خاص */}
            {formData.type === "customer" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مشتریان هدف
                </label>
                <div className="space-y-3">
                  {/* جستجو و انتخاب مشتری */}
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={customerSearch}
                          onChange={(e) => setCustomerSearch(e.target.value)}
                          onFocus={() => setShowCustomerDropdown(true)}
                          placeholder="جستجوی مشتری..."
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setShowCustomerDropdown(!showCustomerDropdown)
                        }
                        className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FiUser />
                      </button>
                    </div>

                    {showCustomerDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                        {filteredCustomers.map((customer) => (
                          <div
                            key={customer.id}
                            onClick={() => addCustomer(customer)}
                            className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-gray-500">
                              {customer.email}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* لیست مشتریان انتخاب شده */}
                  <div className="flex flex-wrap gap-2">
                    {formData.targetCustomers.map((customer) => (
                      <div
                        key={customer.id}
                        className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{customer.name}</span>
                        <button
                          type="button"
                          onClick={() => removeCustomer(customer.id)}
                          className="hover:text-blue-600"
                        >
                          <FiX size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* انتخاب محصولات خاص */}
            {formData.type === "product" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  محصولات هدف
                </label>
                <div className="space-y-3">
                  {/* جستجو و انتخاب محصول */}
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={productSearch}
                          onChange={(e) => setProductSearch(e.target.value)}
                          onFocus={() => setShowProductDropdown(true)}
                          placeholder="جستجوی محصول..."
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setShowProductDropdown(!showProductDropdown)
                        }
                        className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FiPackage />
                      </button>
                    </div>

                    {showProductDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                        {filteredProducts.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => addProduct(product)}
                            className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">
                              SKU: {product.sku}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* لیست محصولات انتخاب شده */}
                  <div className="flex flex-wrap gap-2">
                    {formData.targetProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{product.name}</span>
                        <button
                          type="button"
                          onClick={() => removeProduct(product.id)}
                          className="hover:text-green-600"
                        >
                          <FiX size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* دکمه‌ها */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 transition-colors border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                انصراف
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    در حال ذخیره...
                  </>
                ) : (
                  <>
                    <FiCalendar />
                    {discount ? "بروزرسانی تخفیف" : "ایجاد تخفیف"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;
