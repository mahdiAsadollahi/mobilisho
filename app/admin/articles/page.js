// app/admin/articles/page.js - نسخه آپدیت شده برای اتصال به بکند
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ArticlesTable from "@/app/components/ArticlesTable/ArticlesTable";
import ArticlesSearchAndFilter from "@/app/components/ArticlesSearchAndFilter/ArticlesSearchAndFilter";
import DeleteModal from "@/app/components/DeleteModal/DeleteModal";
import { FiPlus, FiFileText, FiRefreshCw } from "react-icons/fi";

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

// وضعیت‌های ممکن
const statusOptions = {
  draft: "پیش‌نویس",
  published: "منتشر شده",
  archived: "آرشیو شده",
};

export default function ArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // دریافت مقالات از بکند - تغییر endpoint
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      // تغییر endpoint به /api/articles
      const response = await fetch("/api/articles");

      if (!response.ok) {
        throw new Error("خطا در دریافت مقالات");
      }

      const result = await response.json();

      // بررسی ساختار پاسخ
      if (result.success) {
        setArticles(result.data);
        setFilteredArticles(result.data);
      } else {
        throw new Error(result.message || "خطا در دریافت مقالات");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      // در صورت خطا، نمایش پیام
      alert(error.message || "خطا در دریافت مقالات از سرور");
      // می‌توانید داده‌های خالی قرار دهید
      setArticles([]);
      setFilteredArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async () => {
    if (!selectedArticle) return;

    try {
      setLoading(true);
      const response = await fetch(
        `/api/articles/${selectedArticle._id || selectedArticle.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("خطا در حذف مقاله");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "خطا در حذف مقاله");
      }

      // به‌روزرسانی لیست مقالات
      setArticles((prev) => prev.filter((a) => a._id !== selectedArticle._id));

      // بستن مودال و ریست کردن
      setIsDeleteModalOpen(false);
      setSelectedArticle(null);

      // نمایش پیام موفقیت
      alert("مقاله با موفقیت حذف شد");
    } catch (error) {
      console.error("Error deleting article:", error);
      alert(error.message || "خطا در حذف مقاله");
    } finally {
      setLoading(false);
    }
  };

  // فیلتر کردن مقالات بر اساس فیلترهای انتخاب شده
  useEffect(() => {
    let filtered = articles;

    // فیلتر بر اساس جستجو
    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (article.summary &&
            article.summary.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // فیلتر بر اساس دسته‌بندی (اگر انتخاب شده باشد)
    if (selectedCategory) {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory
      );
    }

    // فیلتر بر اساس وضعیت (اگر انتخاب شده باشد)
    if (statusFilter) {
      filtered = filtered.filter((article) => article.status === statusFilter);
    }

    setFilteredArticles(filtered);
  }, [articles, searchTerm, selectedCategory, statusFilter]);

  const openCreatePage = () => {
    router.push("/admin/articles/create");
  };

  const openEditPage = (article) => {
    router.push(`/admin/articles/edit/${article._id || article.id}`);
  };

  const openDeleteModal = (article) => {
    setSelectedArticle(article);
    setIsDeleteModalOpen(true);
  };

  // رفرش کردن مقالات
  const handleRefresh = async () => {
    await fetchArticles();
  };

  // آمار کلی
  const stats = {
    total: articles.length,
    published: articles.filter((a) => a.status === "published").length,
    draft: articles.filter((a) => a.status === "draft").length,
    archived: articles.filter((a) => a.status === "archived").length,
  };

  return (
    <div className="p-4 md:p-6">
      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            مدیریت مقالات
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            مدیریت و انتشار مقالات وبلاگ
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <FiRefreshCw size={18} className={loading ? "animate-spin" : ""} />
            بروزرسانی
          </button>

          <button
            onClick={openCreatePage}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus size={18} />
            نوشتن مقاله جدید
          </button>
        </div>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow border-r-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">کل مقالات</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiFileText className="text-blue-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow border-r-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">منتشر شده</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.published}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <FiFileText className="text-green-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow border-r-4 border-orange-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">پیش‌نویس</p>
              <p className="text-2xl font-bold text-gray-800">{stats.draft}</p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <FiFileText className="text-orange-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow border-r-4 border-gray-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">آرشیو شده</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.archived}
              </p>
            </div>
            <div className="p-2 bg-gray-100 rounded-lg">
              <FiFileText className="text-gray-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* جستجو و فیلترها */}
      <ArticlesSearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        categories={["همه دسته‌بندی‌ها", ...fixedCategories]} // مقدار اول برای "همه"
        statusOptions={["همه وضعیت‌ها", "draft", "published", "archived"]} // مقدار اول برای "همه"
        type="articles"
      />

      {/* جدول مقالات */}
      <ArticlesTable
        articles={filteredArticles}
        onEdit={openEditPage}
        onDelete={openDeleteModal}
        loading={loading}
        statusOptions={statusOptions}
      />

      {/* مودال حذف */}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedArticle(null);
          }}
          onConfirm={handleDeleteArticle}
          title="حذف مقاله"
          message={`آیا از حذف مقاله "${selectedArticle?.title}" اطمینان دارید؟`}
          loading={loading}
        />
      )}
    </div>
  );
}
