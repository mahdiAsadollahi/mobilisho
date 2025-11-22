// app/admin/discounts/components/CampaignModal/CampaignModal.js
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
} from "react-icons/fi";
import JalaliDatePicker from "@/app/components/JalaliDatePicker/JalaliDatePicker";

// داده‌های فیک برای نمایش
const fakeCategories = [
  { id: 1, name: "الکترونیک", slug: "electronics" },
  { id: 2, name: "لباس", slug: "clothing" },
  { id: 3, name: "کفش", slug: "shoes" },
  { id: 4, name: "لوازم خانگی", slug: "home-appliances" },
  { id: 5, name: "کتاب", slug: "books" },
];

const fakeCollections = [
  { id: 1, name: "پرفروش‌ترین‌ها", slug: "best-sellers" },
  { id: 2, name: "جدیدترین‌ها", slug: "new-arrivals" },
  { id: 3, name: "شگفت‌انگیزها", slug: "special-offers" },
  { id: 4, name: "تابستانه", slug: "summer-collection" },
];

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

  useEffect(() => {
    if (campaign) {
      setFormData({
        ...campaign,
        startDate: campaign.startDate || "",
        endDate: campaign.endDate || "",
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
        targetCategories: [],
        targetProducts: [],
        targetCollections: [],
      });
    }
  }, [campaign]);

  const filteredCategories = fakeCategories.filter((category) =>
    category.name.includes(categorySearch)
  );

  const filteredCollections = fakeCollections.filter((collection) =>
    collection.name.includes(collectionSearch)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("لطفا نام کمپین را وارد کنید");
      return;
    }
    if (!formData.discountValue || Number(formData.discountValue) <= 0) {
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

  const addCategory = (category) => {
    if (!formData.targetCategories.find((c) => c.id === category.id)) {
      handleChange("targetCategories", [
        ...formData.targetCategories,
        category,
      ]);
    }
    setCategorySearch("");
    setShowCategoryDropdown(false);
  };

  const removeCategory = (categoryId) => {
    handleChange(
      "targetCategories",
      formData.targetCategories.filter((c) => c.id !== categoryId)
    );
  };

  const addCollection = (collection) => {
    if (!formData.targetCollections.find((c) => c.id === collection.id)) {
      handleChange("targetCollections", [
        ...formData.targetCollections,
        collection,
      ]);
    }
    setCollectionSearch("");
    setShowCollectionDropdown(false);
  };

  const removeCollection = (collectionId) => {
    handleChange(
      "targetCollections",
      formData.targetCollections.filter((c) => c.id !== collectionId)
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

          {/* فرم */}
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

            {/* ردیف دوم */}
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

            {/* ردیف سوم - تاریخ‌ها */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تاریخ شروع *
                </label>
                <JalaliDatePicker
                  value={formData.startDate}
                  onChange={(date) => handleChange("startDate", date)}
                  placeholder="انتخاب تاریخ شروع"
                  outputFormat="jalali"
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
                  outputFormat="jalali"
                />
              </div>
            </div>

            {/* انتخاب دسته‌بندی‌ها */}
            {formData.scope === "category" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  دسته‌بندی‌های هدف
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
                        {filteredCategories.map((category) => (
                          <div
                            key={category.id}
                            onClick={() => addCategory(category)}
                            className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium">{category.name}</div>
                            <div className="text-sm text-gray-500">
                              {category.slug}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.targetCategories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{category.name}</span>
                        <button
                          type="button"
                          onClick={() => removeCategory(category.id)}
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

            {/* انتخاب مجموعه‌ها */}
            {formData.scope === "collection" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مجموعه‌های هدف
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
                        {filteredCollections.map((collection) => (
                          <div
                            key={collection.id}
                            onClick={() => addCollection(collection)}
                            className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium">{collection.name}</div>
                            <div className="text-sm text-gray-500">
                              {collection.slug}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.targetCollections.map((collection) => (
                      <div
                        key={collection.id}
                        className="flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{collection.name}</span>
                        <button
                          type="button"
                          onClick={() => removeCollection(collection.id)}
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
