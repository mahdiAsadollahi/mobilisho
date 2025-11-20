// app/admin/articles/page.js - نسخه آپدیت شده
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ArticlesTable from "@/app/components/ArticlesTable/ArticlesTable";
import SearchAndFilters from "@/app/components/SearchAndFilters/SearchAndFilters";
import DeleteModal from "@/app/components/DeleteModal/DeleteModal";
import { FiPlus, FiFileText } from "react-icons/fi";

// داده‌های نمونه مقالات
const initialArticles = [
  {
    id: 1,
    title: "آموزش کامل React.js برای توسعه فرانت‌اند",
    summary: "یادگیری اصول و مفاهیم پیشرفته React.js در سال 2024",
    content: "<p>این یک مقاله آموزشی کامل درباره React.js است...</p>",
    mainImage: "/images/react-article.jpg",
    tags: ["React", "جاوااسکریپت", "فرانت‌اند"],
    author: "علیرضا محمدی",
    status: "published",
    readTime: 8,
    views: 1245,
    likes: 89,
    createdAt: "2024-01-15",
    publishedAt: "2024-01-15",
    isActive: true,
    category: "آموزش برنامه‌نویسی",
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
    readTime: 6,
    views: 892,
    likes: 45,
    createdAt: "2024-01-10",
    publishedAt: "2024-01-10",
    isActive: true,
    category: "تکنولوژی",
  },
  {
    id: 3,
    title: "بهینه‌سازی عملکرد در اپلیکیشن‌های React",
    summary: "تکنیک‌های پیشرفته برای بهبود performance",
    content: "<p>در این مقاله به بررسی روش‌های بهینه‌سازی می‌پردازیم...</p>",
    mainImage: "/images/performance-article.jpg",
    tags: ["React", "Performance", "بهینه‌سازی"],
    author: "سارا احمدی",
    status: "draft",
    readTime: 10,
    views: 0,
    likes: 0,
    createdAt: "2024-01-08",
    publishedAt: null,
    isActive: true,
    category: "آموزش برنامه‌نویسی",
  },
];

// دسته‌بندی‌های مقالات
const categories = [
  "آموزش برنامه‌نویسی",
  "تکنولوژی",
  "اخبار",
  "طراحی وب",
  "هوش مصنوعی",
];

export default function ArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState(initialArticles);
  const [filteredArticles, setFilteredArticles] = useState(initialArticles);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [statusFilter, setStatusFilter] = useState("همه");

  // فیلتر کردن مقالات
  useEffect(() => {
    let filtered = articles;

    // فیلتر بر اساس جستجو
    if (searchTerm) {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // فیلتر بر اساس دسته‌بندی
    if (selectedCategory !== "همه") {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory
      );
    }

    // فیلتر بر اساس وضعیت
    if (statusFilter !== "همه") {
      filtered = filtered.filter((article) => article.status === statusFilter);
    }

    setFilteredArticles(filtered);
  }, [articles, searchTerm, selectedCategory, statusFilter]);

  // عملیات حذف مقاله
  const handleDeleteArticle = () => {
    setLoading(true);
    setTimeout(() => {
      setArticles((prev) => prev.filter((a) => a.id !== selectedArticle.id));
      setLoading(false);
      setIsDeleteModalOpen(false);
      setSelectedArticle(null);
    }, 1000);
  };

  // عملیات تغییر وضعیت
  const handleToggleStatus = (articleId, field) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === articleId
          ? { ...article, [field]: !article[field] }
          : article
      )
    );
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

  // آمار کلی
  const stats = {
    total: articles.length,
    published: articles.filter((a) => a.status === "published").length,
    draft: articles.filter((a) => a.status === "draft").length,
  };

  return (
    <div className="p-4 md:p-6">
      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            مدیریت مقالات
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            مدیریت و انتشار مقالات وبلاگ
          </p>
        </div>

        <button
          onClick={openCreatePage}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus size={18} />
          نوشتن مقاله جدید
        </button>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow border-r-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">کل مقالات</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiFileText className="text-blue-600" />
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
              <FiFileText className="text-green-600" />
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
              <FiFileText className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* جستجو و فیلترها */}
      <SearchAndFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        categories={["همه", ...categories]}
        type="articles"
      />

      {/* جدول مقالات */}
      <ArticlesTable
        articles={filteredArticles}
        onEdit={openEditPage}
        onDelete={openDeleteModal}
        onToggleStatus={handleToggleStatus}
        loading={loading}
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
