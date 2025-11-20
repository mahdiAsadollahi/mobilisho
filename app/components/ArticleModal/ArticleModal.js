// app/components/ArticleModal/ArticleModal.js
"use client";
import { useState, useEffect, useRef } from "react";
import { FiX, FiUpload, FiPlus, FiTrash2, FiTag } from "react-icons/fi";
import dynamic from "next/dynamic";

// بارگذاری CKEditor به صورت داینامیک
const AdvancedCKEditor = dynamic(
  () => import("@/app/components/ui/AdvancedCKEditor/AdvancedCKEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600">در حال بارگذاری ویرایشگر...</p>
        </div>
      </div>
    ),
  }
);

const ArticleModal = ({ article, categories, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    mainImage: "",
    tags: [],
    category: "",
    status: "draft",
    readTime: "",
    author: "",
    seoTitle: "",
    seoDescription: "",
  });

  const [newTag, setNewTag] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || "",
        summary: article.summary || "",
        content: article.content || "",
        mainImage: article.mainImage || "",
        tags: article.tags || [],
        category: article.category || "",
        status: article.status || "draft",
        readTime: article.readTime || "",
        author: article.author || "",
        seoTitle: article.seoTitle || "",
        seoDescription: article.seoDescription || "",
      });
      setImagePreview(article.mainImage || "");
    } else {
      setFormData((prev) => ({
        ...prev,
        category: categories[0] || "",
        author: "مدیر سایت",
      }));
    }
  }, [article, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      readTime: parseInt(formData.readTime) || 0,
    };

    onSubmit(submitData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData((prev) => ({
        ...prev,
        mainImage: file,
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImagePreview("");
    setFormData((prev) => ({ ...prev, mainImage: "" }));
  };

  const tabs = [
    { id: "basic", label: "اطلاعات پایه" },
    { id: "content", label: "محتوای مقاله" },
    { id: "seo", label: "تنظیمات سئو" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-6xl my-8">
        {/* هدر مودال */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-gray-800">
            {article ? "ویرایش مقاله" : "نوشتن مقاله جدید"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* تب‌ها */}
        <div className="border-b border-gray-200 sticky top-16 bg-white z-10">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-0 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-green-500 text-green-600 bg-green-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* بدنه مودال */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* تب اطلاعات پایه */}
          {activeTab === "basic" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان مقاله *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="عنوان جذاب و کامل مقاله"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    خلاصه مقاله *
                  </label>
                  <textarea
                    value={formData.summary}
                    onChange={(e) => handleChange("summary", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="خلاصه کوتاه و جذاب از محتوای مقاله"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    دسته‌بندی *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">انتخاب دسته‌بندی</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وضعیت انتشار
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="draft">پیش‌نویس</option>
                    <option value="published">منتشر شده</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    زمان مطالعه (دقیقه) *
                  </label>
                  <input
                    type="number"
                    value={formData.readTime}
                    onChange={(e) => handleChange("readTime", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="8"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نویسنده
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleChange("author", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="نام نویسنده"
                  />
                </div>
              </div>

              {/* آپلود تصویر اصلی */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تصویر اصلی مقاله
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="relative max-w-md">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="w-full max-w-md border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FiUpload className="text-gray-400 text-2xl" />
                      <span className="text-sm text-gray-600">
                        آپلود تصویر اصلی مقاله
                      </span>
                      <span className="text-xs text-gray-500">
                        PNG, JPG, WEBP (حداکثر 5MB)
                      </span>
                    </div>
                  </button>
                )}
              </div>

              {/* هشتگ‌ها */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  هشتگ‌ها
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      <FiTag size={12} />
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), handleAddTag())
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="افزودن هشتگ جدید"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <FiPlus size={16} />
                    افزودن
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* تب محتوای مقاله */}
          {activeTab === "content" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                محتوای مقاله *
              </label>
              <AdvancedCKEditor
                value={formData.content}
                onChange={(data) => handleChange("content", data)}
                placeholder="محتوای کامل مقاله را اینجا بنویسید..."
              />
            </div>
          )}

          {/* تب تنظیمات سئو */}
          {activeTab === "seo" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان سئو (SEO Title)
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => handleChange("seoTitle", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="عنوان بهینه برای موتورهای جستجو"
                />
                <p className="text-xs text-gray-500 mt-1">
                  در صورت خالی بودن، از عنوان مقاله استفاده می‌شود
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات متا (Meta Description)
                </label>
                <textarea
                  value={formData.seoDescription}
                  onChange={(e) =>
                    handleChange("seoDescription", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="توضیحات مختصر و جذاب برای نمایش در نتایج جستجو"
                />
                <p className="text-xs text-gray-500 mt-1">
                  در صورت خالی بودن، از خلاصه مقاله استفاده می‌شود
                </p>
              </div>
            </div>
          )}
        </form>

        {/* فوتر مودال */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
          <div className="flex items-center gap-3">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {index + 1}. {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              انصراف
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={
                loading ||
                !formData.title ||
                !formData.summary ||
                !formData.content ||
                !formData.category ||
                !formData.readTime
              }
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {article ? "در حال ویرایش..." : "در حال انتشار..."}
                </>
              ) : (
                <>
                  {formData.status === "published"
                    ? "انتشار مقاله"
                    : "ذخیره پیش‌نویس"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
