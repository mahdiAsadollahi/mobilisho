// app/admin/articles/create/page.js
"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowRight,
  FiUpload,
  FiPlus,
  FiTrash2,
  FiTag,
  FiSave,
} from "react-icons/fi";
import CustomCKEditor from "@/app/components/ui/CKEditor/CKEditor";
import toast from "react-hot-toast";

const suggestedCategories = [
  "آموزش برنامه‌نویسی",
  "تکنولوژی",
  "اخبار",
  "طراحی وب",
  "هوش مصنوعی",
];

const fixedCategories = [
  "آموزش برنامه‌نویسی",
  "تکنولوژی",
  "اخبار",
  "طراحی وب",
  "هوش مصنوعی",
  "امنیت",
  "موبایل",
  "بازی‌سازی",
  "شبکه",
  "دیتابیس",
];

export default function CreateArticlePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    mainImage: "",
    tags: [],
    category: "",
    status: "draft",
    readTime: "",
    author: "مدیر سایت",
    seoTitle: "",
    seoDescription: "",
  });
  const [newTag, setNewTag] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleSubmit = async (e, status) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.title.trim());
    formDataToSend.append("summary", formData.summary.trim());
    formDataToSend.append("content", formData.content.trim());
    formDataToSend.append("category", formData.category.trim());
    formDataToSend.append("readingTime", formData.readTime);
    formDataToSend.append("author", formData.author.trim());
    formDataToSend.append("seoTitle", formData.seoTitle || formData.title);
    formDataToSend.append(
      "seoDescription",
      formData.seoDescription || formData.summary
    );
    formDataToSend.append("status", status);

    if (formData.tags.length > 0) {
      formDataToSend.append("tags", JSON.stringify(formData.tags));
    } else {
      formDataToSend.append("tags", JSON.stringify([]));
    }

    if (formData.mainImage) {
      if (typeof formData.mainImage === "object") {
        formDataToSend.append("image", formData.mainImage);
      } else if (
        typeof formData.mainImage === "string" &&
        formData.mainImage.startsWith("http")
      ) {
        formDataToSend.append("image", formData.mainImage);
      }
    }

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "خطا در ارسال اطلاعات");
      }

      if (result.success) {
        toast.success(
          "مقاله با موفقیت " +
            (status === "published" ? "منتشر" : "ذخیره") +
            " شد!"
        );
        router.push("/admin/articles");
      } else {
        if (result.errors && result.errors.length > 0) {
          toast.error("خطاهای اعتبارسنجی:\n" + result.errors.join("\n"));
        } else {
          toast.error(result.message || "خطایی رخ داده است");
        }
      }
    } catch (error) {
      console.error("Error submitting article:", error);
      toast.error("خطا در ارسال مقاله: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    handleSubmit(e, "draft");
  };

  const handlePublish = (e) => {
    e.preventDefault();
    handleSubmit(e, "published");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 pb-24">
      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            نوشتن مقاله جدید
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            مقاله جدید خود را بنویسید و منتشر کنید
          </p>
        </div>

        <div className="flex gap-3 mt-4 sm:mt-0">
          <button
            onClick={() => router.push("/admin/articles")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <FiArrowRight size={18} />
            بازگشت به لیست
          </button>
        </div>
      </div>

      <form className="max-w-6xl mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ستون اصلی */}
          <div className="lg:col-span-2 space-y-6">
            {/* عنوان */}
            <div className="bg-white rounded-xl p-6 shadow">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                عنوان مقاله *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                placeholder="عنوان جذاب و کامل مقاله را وارد کنید..."
                required
              />
            </div>

            {/* خلاصه */}
            <div className="bg-white rounded-xl p-6 shadow">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                خلاصه مقاله *
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) => handleChange("summary", e.target.value)}
                rows={3}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="خلاصه کوتاه و جذاب از محتوای مقاله"
                required
              />
            </div>

            {/* محتوای اصلی */}
            <div className="bg-white rounded-xl p-6 shadow">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                محتوای مقاله *
              </label>
              <CustomCKEditor
                value={formData.content}
                onChange={(data) => handleChange("content", data)}
                placeholder="محتوای کامل مقاله را اینجا بنویسید..."
              />
            </div>

            {/* سئو */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                تنظیمات سئو
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان سئو
                  </label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => handleChange("seoTitle", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="عنوان برای سئو"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    اگر خالی باشد، از عنوان مقاله استفاده می‌شود
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    توضیحات سئو
                  </label>
                  <textarea
                    value={formData.seoDescription}
                    onChange={(e) =>
                      handleChange("seoDescription", e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="توضیحات متا برای سئو"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    اگر خالی باشد، از خلاصه مقاله استفاده می‌شود
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ستون کناری */}
          <div className="space-y-6">
            {/* تنظیمات انتشار */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                تنظیمات انتشار
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وضعیت
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

                <div className="relative">
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
                    {fixedCategories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <p className="text-xs text-gray-500 mt-1">
                    فقط می‌توانید از دسته‌بندی‌های موجود انتخاب کنید
                  </p>
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
            </div>

            {/* تصویر اصلی */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                تصویر اصلی
              </h3>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {imagePreview ? (
                <div className="relative">
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
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-green-500 hover:bg-green-50 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FiUpload className="text-gray-400 text-2xl" />
                    <span className="text-sm text-gray-600">
                      آپلود تصویر اصلی
                    </span>
                    <span className="text-xs text-gray-500">
                      PNG, JPG, WEBP
                    </span>
                  </div>
                </button>
              )}
            </div>

            {/* هشتگ‌ها */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                هشتگ‌ها
              </h3>

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
                      ×
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
                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FiPlus size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* دکمه‌های اقدام */}
        <div className="fixed bottom-6 left-6 right-6 bg-white border-t border-gray-200 p-4 rounded-xl shadow-lg z-10">
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.push("/admin/articles")}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              انصراف
            </button>

            <div className="flex gap-3">
              <button
                type="button" // تغییر از type="submit" به type="button"
                onClick={handleSaveDraft}
                disabled={
                  loading ||
                  !formData.title ||
                  !formData.content ||
                  !formData.category
                }
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <FiSave size={18} />
                ذخیره پیش‌نویس
              </button>

              <button
                type="button"
                onClick={handlePublish}
                disabled={
                  loading ||
                  !formData.title ||
                  !formData.content ||
                  !formData.category
                }
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    در حال انتشار...
                  </>
                ) : (
                  <>انتشار مقاله</>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
