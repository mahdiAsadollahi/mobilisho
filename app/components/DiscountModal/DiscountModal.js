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
import Swal from "sweetalert2";

const DiscountModal = ({ isOpen, onClose, onSave, discount, loading }) => {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "public",
    value_type: "percentage",
    value: "",
    max_usage: "",
    min_order_amount: "",
    expiry_date: "",
    status: "active",
    specific_products: [],
    specific_customers: [],
  });

  const [customerSearch, setCustomerSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [fetchingCustomers, setFetchingCustomers] = useState(false);
  const [fetchingProducts, setFetchingProducts] = useState(false);

  useEffect(() => {
    if (discount) {
      setFormData({
        code: discount.code || "",
        description: discount.description || "",
        discountType: discount.discountType || "public",
        value_type: discount.value_type || "percentage",
        value: discount.value || "",
        max_usage: discount.max_usage || "",
        min_order_amount: discount.min_order_amount || "",
        expiry_date: discount.expiry_date || "",
        status: discount.status || "active",
        specific_products: discount.specific_products || [],
        specific_customers: discount.specific_customers || [],
      });
    } else {
      setFormData({
        code: "",
        description: "",
        discountType: "public",
        value_type: "percentage",
        value: "",
        max_usage: "",
        min_order_amount: "",
        expiry_date: "",
        status: "active",
        specific_products: [],
        specific_customers: [],
      });
    }
  }, [discount]);

  useEffect(() => {
    if (showCustomerDropdown && customers.length === 0) {
      fetchCustomers();
    }
  }, [showCustomerDropdown]);

  useEffect(() => {
    if (showProductDropdown && products.length === 0) {
      fetchProducts();
    }
  }, [showProductDropdown]);

  const fetchCustomers = async () => {
    try {
      setFetchingCustomers(true);
      const response = await fetch("/api/discounts/users");
      const data = await response.json();
      if (data.data) {
        setCustomers(data.data);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setFetchingCustomers(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setFetchingProducts(true);
      const response = await fetch("/api/discounts/products");
      const data = await response.json();
      if (data.data) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setFetchingProducts(false);
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.username?.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer._id?.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
      product._id?.toLowerCase().includes(productSearch.toLowerCase())
  );

  // 🔴 تغییر در تابع handleSubmit (قسمت ارسال درخواست):
  const handleSubmit = async (e) => {
    e.preventDefault();

    // اعتبارسنجی فیلدها
    if (!formData.code.trim()) {
      Swal.fire({
        title: "لطفا کد تخفیف را وارد کنید",
        icon: "error",
      });
      return;
    }
    if (!formData.value || Number(formData.value) <= 0) {
      Swal.fire({
        title: "لطفا مقدار تخفیف را وارد کنید",
        icon: "error",
      });
      return;
    }

    try {
      const url = discount
        ? `/api/discounts/${discount._id}`
        : "/api/discounts";

      const method = discount ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: discount ? "ویرایش موفق" : "ایجاد موفق",
          text: discount ? "تخفیف با موفقیت ویرایش شد" : "تخفیف جدید ایجاد شد",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          onSave(result.data);

          if (!discount) {
            setFormData({
              code: "",
              description: "",
              discountType: "public",
              value_type: "percentage",
              value: "",
              max_usage: "",
              min_order_amount: "",
              expiry_date: "",
              status: "active",
              specific_products: [],
              specific_customers: [],
            });
          }

          onClose();
        });
      } else {
        Swal.fire({
          title: "خطا",
          text: result.message || "خطایی رخ داده است",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error saving discount:", error);
      Swal.fire({
        title: "خطا در ارتباط با سرور",
        icon: "error",
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // اضافه کردن مشتری
  const addCustomer = (customer) => {
    if (!formData.specific_customers.find((c) => c._id === customer._id)) {
      handleChange("specific_customers", [
        ...formData.specific_customers,
        { _id: customer._id, username: customer.username },
      ]);
    }
    setCustomerSearch("");
    setShowCustomerDropdown(false);
  };

  const removeCustomer = (customerId) => {
    handleChange(
      "specific_customers",
      formData.specific_customers.filter((c) => c._id !== customerId)
    );
  };

  const addProduct = (product) => {
    if (!formData.specific_products.find((p) => p._id === product._id)) {
      handleChange("specific_products", [
        ...formData.specific_products,
        { _id: product._id, name: product.name },
      ]);
    }
    setProductSearch("");
    setShowProductDropdown(false);
  };

  const removeProduct = (productId) => {
    handleChange(
      "specific_products",
      formData.specific_products.filter((p) => p._id !== productId)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
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
                  onChange={(e) =>
                    handleChange("code", e.target.value.toUpperCase())
                  }
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
                  value={formData.discountType}
                  onChange={(e) => handleChange("discountType", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                >
                  <option value="public">عمومی</option>
                  <option value="specific_product">محصول خاص</option>
                  <option value="specific_customer">مشتری خاص</option>
                  <option value="first_purchase">اولین خرید</option>
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
                    onClick={() => handleChange("value_type", "percentage")}
                    disabled={loading}
                    className={`flex items-center justify-center gap-2 flex-1 p-3 border-2 rounded-lg transition-all ${
                      formData.value_type === "percentage"
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
                    onClick={() => handleChange("value_type", "fixed")}
                    disabled={loading}
                    className={`flex items-center justify-center gap-2 flex-1 p-3 border-2 rounded-lg transition-all ${
                      formData.value_type === "fixed"
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
                  max={formData.value_type === "percentage" ? "100" : undefined}
                  value={formData.value}
                  onChange={(e) => handleChange("value", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={
                    formData.value_type === "percentage" ? "20" : "50000"
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
                  value={formData.max_usage}
                  onChange={(e) => handleChange("max_usage", e.target.value)}
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
                  value={formData.min_order_amount}
                  onChange={(e) =>
                    handleChange("min_order_amount", e.target.value)
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
                  value={formData.expiry_date}
                  onChange={(date) => handleChange("expiry_date", date)}
                  placeholder="انتخاب تاریخ"
                  outputFormat="gregorian"
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
            {formData.discountType === "specific_customer" && (
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
                        {fetchingCustomers ? (
                          <div className="p-3 text-center text-gray-500">
                            در حال دریافت لیست کاربران...
                          </div>
                        ) : filteredCustomers.length === 0 ? (
                          <div className="p-3 text-center text-gray-500">
                            کاربری یافت نشد
                          </div>
                        ) : (
                          filteredCustomers.map((customer) => (
                            <div
                              key={customer._id}
                              onClick={() => addCustomer(customer)}
                              className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            >
                              <div className="font-medium">
                                {customer.username}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {customer._id}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  {/* لیست مشتریان انتخاب شده */}
                  <div className="flex flex-wrap gap-2">
                    {formData.specific_customers.map((customer) => (
                      <div
                        key={customer._id}
                        className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{customer.username}</span>
                        <button
                          type="button"
                          onClick={() => removeCustomer(customer._id)}
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
            {formData.discountType === "specific_product" && (
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
                        {fetchingProducts ? (
                          <div className="p-3 text-center text-gray-500">
                            در حال دریافت لیست محصولات...
                          </div>
                        ) : filteredProducts.length === 0 ? (
                          <div className="p-3 text-center text-gray-500">
                            محصولی یافت نشد
                          </div>
                        ) : (
                          filteredProducts.map((product) => (
                            <div
                              key={product._id}
                              onClick={() => addProduct(product)}
                              className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            >
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-gray-500">
                                ID: {product._id}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  {/* لیست محصولات انتخاب شده */}
                  <div className="flex flex-wrap gap-2">
                    {formData.specific_products.map((product) => (
                      <div
                        key={product._id}
                        className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{product.name}</span>
                        <button
                          type="button"
                          onClick={() => removeProduct(product._id)}
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
