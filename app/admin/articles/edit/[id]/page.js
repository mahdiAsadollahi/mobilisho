"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowRight,
  FiUpload,
  FiPlus,
  FiTrash2,
  FiTag,
  FiSave,
  FiEye,
  FiRefreshCw,
} from "react-icons/fi";
import CustomCKEditor from "@/app/components/ui/CKEditor/CKEditor";
import toast from "react-hot-toast";

// دسته‌بندی‌های ثابت
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

export default function EditArticlePage({ params }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    image: "", // تغییر از mainImage به image
    tags: [],
    category: "",
    status: "draft",
    readingTime: "",
    author: "",
    seoTitle: "",
    seoDescription: "",
  });
  const [newTag, setNewTag] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(null);
  const [fetching, setFetching] = useState(true);
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);

  // در useEffect دریافت مقاله، این تغییر را اعمال کنید:
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setFetching(true);
        const { id } = await params;

        const response = await fetch(`/api/articles/${id}`);

        if (!response.ok) {
          throw new Error("خطا در دریافت مقاله");
        }

        const result = await response.json();

        if (result.success && result.data) {
          const articleData = result.data;
          setArticle(articleData);

          // پر کردن فرم با داده‌های مقاله
          setFormData({
            title: articleData.title || "",
            summary: articleData.summary || "",
            content: articleData.content || "",
            image: articleData.image || "",
            tags: articleData.tags || [],
            category: articleData.category || "",
            status: articleData.status || "draft",
            readingTime: articleData.readingTime?.toString() || "5",
            author: articleData.author || "",
            seoTitle: articleData.seoTitle || "",
            seoDescription: articleData.seoDescription || "",
          });

          setImagePreview(articleData.image || "");
          // حذف این خط: setCategoryInput(articleData.category || "");
        } else {
          throw new Error(result.message || "مقاله یافت نشد");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        toast("خطا در دریافت مقاله: " + error.message);
        router.push("/admin/articles");
      } finally {
        setFetching(false);
      }
    };

    fetchArticle();
  }, [params, router]);

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
      setImageFile(file);
      // فقط فایل را ذخیره می‌کنیم، چون در ارسال فرم باید جداگانه ارسال شود
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImagePreview("");
    setImageFile(null);
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { id } = await params;

      // ایجاد FormData برای ارسال
      const formDataToSend = new FormData();

      // اضافه کردن فیلدهای متنی
      formDataToSend.append("title", formData.title);
      formDataToSend.append("summary", formData.summary);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("readingTime", formData.readingTime);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("seoTitle", formData.seoTitle);
      formDataToSend.append("seoDescription", formData.seoDescription);

      // اضافه کردن تگ‌ها
      formData.tags.forEach((tag, index) => {
        formDataToSend.append(`tags[${index}]`, tag);
      });

      // اگر تصویر جدید انتخاب شده
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      } else if (formData.image) {
        // اگر تصویر قدیمی باقی مانده
        formDataToSend.append("image", formData.image);
      }

      // ارسال درخواست PUT به API
      const response = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "خطا در ویرایش مقاله");
      }

      toast("مقاله با موفقیت ویرایش شد!");
      router.push("/admin/articles");
    } catch (error) {
      console.error("Error updating article:", error);
      alert("خطا در ویرایش مقاله: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    handleChange("status", "draft");
    handleSubmit(new Event("submit"));
  };

  const handlePublish = () => {
    handleChange("status", "published");
    handleSubmit(new Event("submit"));
  };

  const handlePreview = () => {
    if (article) {
      // باز کردن در تب جدید
      window.open(`/blog/${article.slug || article._id}`, "_blank");
    }
  };

  // نمایش لودینگ
  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری مقاله...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">مقاله یافت نشد</p>
          <button
            onClick={() => router.push("/admin/articles")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            بازگشت به لیست مقالات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 pb-24">
      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            ویرایش مقاله
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            ویرایش مقاله: {article.title}
          </p>
        </div>

        <div className="flex gap-3 mt-4 sm:mt-0">
          <button
            onClick={handlePreview}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiEye size={18} />
            پیش‌نمایش
          </button>
          <button
            onClick={() => router.push("/admin/articles")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <FiArrowRight size={18} />
            بازگشت به لیست
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto mb-32">
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
                    <option value="archived">آرشیو شده</option>
                  </select>
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
                    value={formData.readingTime}
                    onChange={(e) =>
                      handleChange("readingTime", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="5"
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
              <p className="text-xs text-gray-500 mt-2">
                اگر تصویر جدید انتخاب نکنید، تصویر قبلی باقی می‌ماند
              </p>
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

            {/* اطلاعات مقاله */}
            <div className="bg-gray-50 rounded-xl p-6 shadow border border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                اطلاعات مقاله
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>شناسه:</span>
                  <span className="font-mono">{article._id}</span>
                </div>
                <div className="flex justify-between">
                  <span>تاریخ ایجاد:</span>
                  <span className="font-medium">
                    {new Date(article.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>آخرین ویرایش:</span>
                  <span className="font-medium">
                    {new Date(article.updatedAt).toLocaleDateString("fa-IR")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Slug:</span>
                  <span className="font-mono text-xs truncate max-w-[150px]">
                    {article.slug}
                  </span>
                </div>
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
                type="button"
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
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                انتشار مقاله
              </button>

              <button
                type="submit"
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
                    <FiRefreshCw className="animate-spin" size={18} />
                    در حال ذخیره...
                  </>
                ) : (
                  <>ذخیره تغییرات</>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
