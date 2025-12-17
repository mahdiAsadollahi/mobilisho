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

  // دریافت مقالات از بکند
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      // درخواست به API بکند
      const response = await fetch("/api/admin/articles");

      if (!response.ok) {
        throw new Error("خطا در دریافت مقالات");
      }

      const data = await response.json();
      setArticles(data);
      setFilteredArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
      // در صورت خطا، از داده‌های نمونه استفاده می‌کنیم (فقط برای توسعه)
      const sampleData = [
        {
          id: 1,
          title: "آموزش کامل React.js برای توسعه فرانت‌اند",
          summary: "یادگیری اصول و مفاهیم پیشرفته React.js در سال 2024",
          content: "<p>این یک مقاله آموزشی کامل درباره React.js است...</p>",
          mainImage: "/images/react-article.jpg",
          tags: ["React", "جاوااسکریپت", "فرانت‌اند"],
          author: "علیرضا محمدی",
          status: "published",
          category: "آموزش برنامه‌نویسی",
          createdAt: "2024-01-15T10:30:00Z",
          publishedAt: "2024-01-15T12:00:00Z",
          updatedAt: "2024-01-15T12:00:00Z",
        },
        {
          id: 2,
          title: "بررسی جدیدترین قابلیت‌های Next.js 14",
          summary: "آشنایی با امکانات جدید و بهره‌وری نسخه 14 Next.js",
          content: "<p>Next.js 14 تغییرات قابل توجهی داشته است...</p>",
          mainImage: "/images/nextjs-article.jpg",
          tags: ["Next.js", "React", "فریمورک"],
          author: "محمد رضایی",
          status: "published",
          category: "تکنولوژی",
          createdAt: "2024-01-10T09:15:00Z",
          publishedAt: "2024-01-10T11:00:00Z",
          updatedAt: "2024-01-10T11:00:00Z",
        },
        {
          id: 3,
          title: "بهینه‌سازی عملکرد در اپلیکیشن‌های React",
          summary: "تکنیک‌های پیشرفته برای بهبود performance",
          content:
            "<p>در این مقاله به بررسی روش‌های بهینه‌سازی می‌پردازیم...</p>",
          mainImage: "/images/performance-article.jpg",
          tags: ["React", "Performance", "بهینه‌سازی"],
          author: "سارا احمدی",
          status: "draft",
          category: "آموزش برنامه‌نویسی",
          createdAt: "2024-01-08T14:20:00Z",
          publishedAt: null,
          updatedAt: "2024-01-08T14:20:00Z",
        },
        {
          id: 4,
          title: "مقاله آرشیو شده نمونه",
          summary: "این مقاله آرشیو شده است",
          content: "<p>محتوای مقاله آرشیو شده...</p>",
          mainImage: "/images/archived.jpg",
          tags: ["آرشیو", "نمونه"],
          author: "مدیر سیستم",
          status: "archived",
          category: "اخبار",
          createdAt: "2023-12-01T08:00:00Z",
          publishedAt: "2023-12-01T10:00:00Z",
          updatedAt: "2023-12-20T16:30:00Z",
        },
      ];
      setArticles(sampleData);
      setFilteredArticles(sampleData);
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

  // عملیات حذف مقاله
  const handleDeleteArticle = async () => {
    if (!selectedArticle) return;

    try {
      setLoading(true);
      // درخواست حذف به بکند
      const response = await fetch(
        `/api/admin/articles/${selectedArticle.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("خطا در حذف مقاله");
      }

      // به‌روزرسانی لیست مقالات
      setArticles((prev) => prev.filter((a) => a.id !== selectedArticle.id));

      // بستن مودال و ریست کردن
      setIsDeleteModalOpen(false);
      setSelectedArticle(null);

      // نمایش پیام موفقیت
      alert("مقاله با موفقیت حذف شد");
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("خطا در حذف مقاله");
    } finally {
      setLoading(false);
    }
  };

  const openCreatePage = () => {
    router.push("/admin/articles/create");
  };

  const openEditPage = (article) => {
    router.push(`/admin/articles/edit/${article.id}`);
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
