"use client";
import { useState, useEffect } from "react";
import {
  FiX,
  FiCalendar,
  FiPercent,
  FiDollarSign,
  FiSearch,
  FiGrid,
  FiFolder,
  FiPackage,
  FiBox,
} from "react-icons/fi";
import JalaliDatePicker from "@/app/components/JalaliDatePicker/JalaliDatePicker";
import Swal from "sweetalert2";

const CampaignModal = ({ isOpen, onClose, onSave, campaign, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    scope: "all_products",
    discountType: "percentage",
    discountValue: "",
    startDate: "",
    endDate: "",
    status: "draft",
    max_usage: "",
    min_order_amount: "",
    targetCategories: [],
    targetProducts: [],
    targetCollections: [],
  });

  const [categorySearch, setCategorySearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [collectionSearch, setCollectionSearch] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showCollectionDropdown, setShowCollectionDropdown] = useState(false);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const [fetchingProducts, setFetchingProducts] = useState(false);
  const [fetchingCollections, setFetchingCollections] = useState(false);

  useEffect(() => {
    if (campaign) {
      setFormData({
        name: campaign.name || "",
        description: campaign.description || "",
        scope: campaign.scope || "all_products",
        discountType: campaign.discountType || "percentage",
        discountValue: campaign.discountValue || "",
        startDate: campaign.startDate || "",
        endDate: campaign.endDate || "",
        status: campaign.status || "draft",
        max_usage: campaign.max_usage || "",
        min_order_amount: campaign.min_order_amount || "",
        targetCategories: campaign.targetCategories || [],
        targetProducts: campaign.targetProducts || [],
        targetCollections: campaign.targetCollections || [],
      });
    } else {
      setFormData({
        name: "",
        description: "",
        scope: "all_products",
        discountType: "percentage",
        discountValue: "",
        startDate: "",
        endDate: "",
        status: "draft",
        max_usage: "",
        min_order_amount: "",
        targetCategories: [],
        targetProducts: [],
        targetCollections: [],
      });
    }
  }, [campaign]);

  useEffect(() => {
    if (showCategoryDropdown && categories.length === 0) {
      fetchCategories();
    }
  }, [showCategoryDropdown]);

  useEffect(() => {
    if (showProductDropdown && products.length === 0) {
      fetchProducts();
    }
  }, [showProductDropdown]);

  useEffect(() => {
    if (showCollectionDropdown && collections.length === 0) {
      fetchCollections();
    }
  }, [showCollectionDropdown]);

  const fetchCategories = async () => {
    try {
      setFetchingCategories(true);
      const response = await fetch("/api/categories");
      const data = await response.json();
      if (data.data) {
        setCategories(data.data);
      } else {
        // داده فیک برای نمایش
        setCategories([
          { _id: "cat1", name: "الکترونیک", slug: "electronics" },
          { _id: "cat2", name: "لباس", slug: "clothing" },
          { _id: "cat3", name: "کفش", slug: "shoes" },
          { _id: "cat4", name: "لوازم خانگی", slug: "home-appliances" },
          { _id: "cat5", name: "کتاب", slug: "books" },
        ]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      // داده فیک در صورت خطا
      setCategories([
        { _id: "cat1", name: "الکترونیک", slug: "electronics" },
        { _id: "cat2", name: "لباس", slug: "clothing" },
        { _id: "cat3", name: "کفش", slug: "shoes" },
        { _id: "cat4", name: "لوازم خانگی", slug: "home-appliances" },
        { _id: "cat5", name: "کتاب", slug: "books" },
      ]);
    } finally {
      setFetchingCategories(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setFetchingProducts(true);
      const response = await fetch("/api/discounts/products");
      const data = await response.json();
      if (data.data) {
        setProducts(data.data);
      } else {
        // داده فیک برای نمایش
        setProducts([
          { _id: "prod1", name: "لپ‌تاپ اپل", price: 50000000 },
          { _id: "prod2", name: "گوشی سامسونگ", price: 20000000 },
          { _id: "prod3", name: "هدفون سونی", price: 5000000 },
          { _id: "prod4", name: "تلویزیون ال جی", price: 30000000 },
          { _id: "prod5", name: "کتاب توسعه وب", price: 150000 },
        ]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // داده فیک در صورت خطا
      setProducts([
        { _id: "prod1", name: "لپ‌تاپ اپل", price: 50000000 },
        { _id: "prod2", name: "گوشی سامسونگ", price: 20000000 },
        { _id: "prod3", name: "هدفون سونی", price: 5000000 },
        { _id: "prod4", name: "تلویزیون ال جی", price: 30000000 },
        { _id: "prod5", name: "کتاب توسعه وب", price: 150000 },
      ]);
    } finally {
      setFetchingProducts(false);
    }
  };

  const fetchCollections = async () => {
    try {
      setFetchingCollections(true);
      const response = await fetch("/api/collections");
      const data = await response.json();
      if (data.data) {
        setCollections(data.data);
      } else {
        // داده فیک برای نمایش
        setCollections([
          { _id: "col1", name: "پرفروش‌ترین‌ها", slug: "best-sellers" },
          { _id: "col2", name: "جدیدترین‌ها", slug: "new-arrivals" },
          { _id: "col3", name: "شگفت‌انگیزها", slug: "special-offers" },
          { _id: "col4", name: "تابستانه", slug: "summer-collection" },
        ]);
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
      // داده فیک در صورت خطا
      setCollections([
        { _id: "col1", name: "پرفروش‌ترین‌ها", slug: "best-sellers" },
        { _id: "col2", name: "جدیدترین‌ها", slug: "new-arrivals" },
        { _id: "col3", name: "شگفت‌انگیزها", slug: "special-offers" },
        { _id: "col4", name: "تابستانه", slug: "summer-collection" },
      ]);
    } finally {
      setFetchingCollections(false);
    }
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name?.toLowerCase().includes(categorySearch.toLowerCase()) ||
      category.slug?.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
      product._id?.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredCollections = collections.filter(
    (collection) =>
      collection.name?.toLowerCase().includes(collectionSearch.toLowerCase()) ||
      collection.slug?.toLowerCase().includes(collectionSearch.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    text;
    // اعتبارسنجی فیلدها
    if (!formData.name.trim()) {
      Swal.fire({
        title: "لطفا نام کمپین را وارد کنید",
        icon: "error",
      });
      return;
    }

    if (!formData.discountValue || Number(formData.discountValue) <= 0) {
      Swal.fire({
        title: "لطفا مقدار تخفیف را وارد کنید",
        icon: "error",
      });
      return;
    }

    if (
      formData.discountType === "percentage" &&
      formData.discountValue > 100
    ) {
      Swal.fire({
        title: "تخفیف درصدی نمی‌تواند بیشتر از ۱۰۰٪ باشد",
        icon: "error",
      });
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      Swal.fire({
        title: "لطفا تاریخ شروع و پایان را وارد کنید",
        icon: "error",
      });
      return;
    }

    // بررسی محدوده خاص
    if (
      formData.scope === "category" &&
      formData.targetCategories.length === 0
    ) {
      Swal.fire({
        title: "برای کمپین دسته‌بندی خاص، حداقل یک دسته‌بندی انتخاب کنید",
        icon: "error",
      });
      return;
    }

    if (
      formData.scope === "specific_products" &&
      formData.targetProducts.length === 0
    ) {
      Swal.fire({
        title: "برای کمپین محصولات خاص، حداقل یک محصول انتخاب کنید",
        icon: "error",
      });
      return;
    }

    if (
      formData.scope === "collection" &&
      formData.targetCollections.length === 0
    ) {
      Swal.fire({
        title: "برای کمپین مجموعه خاص، حداقل یک مجموعه انتخاب کنید",
        icon: "error",
      });
      return;
    }

    try {
      const url = campaign
        ? `/api/campaigns/${campaign._id}`
        : "/api/campaigns";

      const method = campaign ? "PUT" : "POST";

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
          title: campaign ? "ویرایش موفق" : "ایجاد موفق",
          text: campaign ? "کمپین با موفقیت ویرایش شد" : "کمپین جدید ایجاد شد",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          onSave(result.data);

          if (!campaign) {
            // ریست فرم در صورت ایجاد جدید
            setFormData({
              name: "",
              description: "",
              scope: "all_products",
              discountType: "percentage",
              discountValue: "",
              startDate: "",
              endDate: "",
              status: "draft",
              max_usage: "",
              min_order_amount: "",
              targetCategories: [],
              targetProducts: [],
              targetCollections: [],
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
      console.error("Error saving campaign:", error);
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

  // اضافه کردن دسته‌بندی
  const addCategory = (category) => {
    if (!formData.targetCategories.find((c) => c._id === category._id)) {
      handleChange("targetCategories", [
        ...formData.targetCategories,
        { _id: category._id, name: category.name, slug: category.slug },
      ]);
    }
    setCategorySearch("");
    setShowCategoryDropdown(false);
  };

  const removeCategory = (categoryId) => {
    handleChange(
      "targetCategories",
      formData.targetCategories.filter((c) => c._id !== categoryId)
    );
  };

  // اضافه کردن محصول
  const addProduct = (product) => {
    if (!formData.targetProducts.find((p) => p._id === product._id)) {
      handleChange("targetProducts", [
        ...formData.targetProducts,
        { _id: product._id, name: product.name, price: product.price },
      ]);
    }
    setProductSearch("");
    setShowProductDropdown(false);
  };

  const removeProduct = (productId) => {
    handleChange(
      "targetProducts",
      formData.targetProducts.filter((p) => p._id !== productId)
    );
  };

  // اضافه کردن مجموعه
  const addCollection = (collection) => {
    if (!formData.targetCollections.find((c) => c._id === collection._id)) {
      handleChange("targetCollections", [
        ...formData.targetCollections,
        { _id: collection._id, name: collection.name, slug: collection.slug },
      ]);
    }
    setCollectionSearch("");
    setShowCollectionDropdown(false);
  };

  const removeCollection = (collectionId) => {
    handleChange(
      "targetCollections",
      formData.targetCollections.filter((c) => c._id !== collectionId)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">
              {campaign ? "ویرایش کمپین" : "ایجاد کمپین جدید"}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={loading}
            >
              <FiX size={20} />
            </button>
          </div>
          text
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ردیف اول */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نام کمپین *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: تخفیف تابستانه"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  محدوده اعمال *
                </label>
                <select
                  value={formData.scope}
                  onChange={(e) => handleChange("scope", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                >
                  <option value="all_products">همه محصولات</option>
                  <option value="category">دسته‌بندی خاص</option>
                  <option value="specific_products">محصولات خاص</option>
                  <option value="collection">مجموعه محصولات</option>
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
                placeholder="توضیح درباره کمپین و اهداف آن..."
                disabled={loading}
              />
            </div>

            {/* ردیف دوم - نوع و مقدار تخفیف */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع تخفیف *
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
                  value={formData.discountValue}
                  onChange={(e) =>
                    handleChange("discountValue", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={
                    formData.discountType === "percentage" ? "15" : "100000"
                  }
                  disabled={loading}
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
                  <option value="draft">پیش‌نویس</option>
                  <option value="scheduled">زمان‌بندی شده</option>
                  <option value="active">فعال</option>
                  <option value="inactive">غیرفعال</option>
                </select>
              </div>
            </div>

            {/* ردیف سوم - محدودیت‌ها */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <div className="md:col-span-1">
                {/* فضای خالی برای تراز کردن */}
              </div>
            </div>

            {/* ردیف چهارم - تاریخ‌ها */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تاریخ شروع *
                </label>
                <JalaliDatePicker
                  value={formData.startDate}
                  onChange={(date) => handleChange("startDate", date)}
                  placeholder="انتخاب تاریخ شروع"
                  outputFormat="gregorian"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تاریخ پایان *
                </label>
                <JalaliDatePicker
                  value={formData.endDate}
                  onChange={(date) => handleChange("endDate", date)}
                  placeholder="انتخاب تاریخ پایان"
                  outputFormat="gregorian"
                />
              </div>
            </div>

            {/* انتخاب دسته‌بندی‌ها */}
            {formData.scope === "category" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  دسته‌بندی‌های هدف *
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={categorySearch}
                          onChange={(e) => setCategorySearch(e.target.value)}
                          onFocus={() => setShowCategoryDropdown(true)}
                          placeholder="جستجوی دسته‌بندی..."
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setShowCategoryDropdown(!showCategoryDropdown)
                        }
                        className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FiFolder />
                      </button>
                    </div>

                    {showCategoryDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                        {fetchingCategories ? (
                          <div className="p-3 text-center text-gray-500">
                            در حال دریافت لیست دسته‌بندی‌ها...
                          </div>
                        ) : filteredCategories.length === 0 ? (
                          <div className="p-3 text-center text-gray-500">
                            دسته‌بندی یافت نشد
                          </div>
                        ) : (
                          filteredCategories.map((category) => (
                            <div
                              key={category._id}
                              onClick={() => addCategory(category)}
                              className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            >
                              <div className="font-medium">{category.name}</div>
                              <div className="text-sm text-gray-500">
                                {category.slug}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.targetCategories.map((category) => (
                      <div
                        key={category._id}
                        className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{category.name}</span>
                        <button
                          type="button"
                          onClick={() => removeCategory(category._id)}
                          className="hover:text-purple-600"
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
            {formData.scope === "specific_products" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  محصولات هدف *
                </label>
                <div className="space-y-3">
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
                                {product.price?.toLocaleString()} تومان
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.targetProducts.map((product) => (
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

            {/* انتخاب مجموعه‌ها */}
            {formData.scope === "collection" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مجموعه‌های هدف *
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={collectionSearch}
                          onChange={(e) => setCollectionSearch(e.target.value)}
                          onFocus={() => setShowCollectionDropdown(true)}
                          placeholder="جستجوی مجموعه..."
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setShowCollectionDropdown(!showCollectionDropdown)
                        }
                        className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FiGrid />
                      </button>
                    </div>

                    {showCollectionDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                        {fetchingCollections ? (
                          <div className="p-3 text-center text-gray-500">
                            در حال دریافت لیست مجموعه‌ها...
                          </div>
                        ) : filteredCollections.length === 0 ? (
                          <div className="p-3 text-center text-gray-500">
                            مجموعه‌ای یافت نشد
                          </div>
                        ) : (
                          filteredCollections.map((collection) => (
                            <div
                              key={collection._id}
                              onClick={() => addCollection(collection)}
                              className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            >
                              <div className="font-medium">
                                {collection.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {collection.slug}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.targetCollections.map((collection) => (
                      <div
                        key={collection._id}
                        className="flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{collection.name}</span>
                        <button
                          type="button"
                          onClick={() => removeCollection(collection._id)}
                          className="hover:text-orange-600"
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
                    {campaign ? "بروزرسانی کمپین" : "ایجاد کمپین"}
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

export default CampaignModal;
