// app/admin/categories/page.js
"use client";
import { useState, useEffect } from "react";
import CategoriesTable from "@/app/components/CategoriesTable/CategoriesTable";
import CategoryModal from "@/app/components/CategoryModal/CategoryModal";
import DeleteModal from "@/app/components/DeleteModal/DeleteModal";
import { FiPlus } from "react-icons/fi";

// داده‌های نمونه با آیکون‌های مرتبط با فروشگاه موبایل
const initialCategories = [
  {
    id: 1,
    title: "گوشی موبایل",
    image: "/images/mobile-phones.jpg",
    icon: "FiSmartphone",
    isActive: true,
    createdAt: "2024-01-15",
    productCount: 45,
  },
  {
    id: 2,
    title: "لوازم جانبی",
    image: "/images/accessories.jpg",
    icon: "FiHeadphones",
    isActive: true,
    createdAt: "2024-01-10",
    productCount: 32,
  },
  {
    id: 3,
    title: "مقالات آموزشی",
    image: "/images/articles.jpg",
    icon: "FiBook",
    isActive: false,
    createdAt: "2024-01-05",
    productCount: 18,
  },
  {
    id: 4,
    title: "اخبار تکنولوژی",
    image: "/images/news.jpg",
    icon: "FiMonitor",
    isActive: true,
    createdAt: "2024-01-20",
    productCount: 25,
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  // عملیات افزودن دسته‌بندی
  const handleAddCategory = (categoryData) => {
    setLoading(true);
    // شبیه‌سازی درخواست API
    setTimeout(() => {
      const newCategory = {
        id: Math.max(...categories.map((c) => c.id)) + 1,
        ...categoryData,
        isActive: true,
        productCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setCategories((prev) => [newCategory, ...prev]);
      setLoading(false);
      setIsModalOpen(false);
    }, 1000);
  };

  // عملیات ویرایش دسته‌بندی
  const handleEditCategory = (categoryData) => {
    setLoading(true);
    setTimeout(() => {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === selectedCategory.id ? { ...cat, ...categoryData } : cat
        )
      );
      setLoading(false);
      setIsModalOpen(false);
      setSelectedCategory(null);
    }, 1000);
  };

  // عملیات حذف دسته‌بندی
  const handleDeleteCategory = () => {
    setLoading(true);
    setTimeout(() => {
      setCategories((prev) =>
        prev.filter((cat) => cat.id !== selectedCategory.id)
      );
      setLoading(false);
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
    }, 1000);
  };

  // عملیات تغییر وضعیت فعال/غیرفعال
  const handleToggleStatus = (categoryId) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, isActive: !cat.isActive } : cat
      )
    );
  };

  const openAddModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-4 md:p-6">
      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            مدیریت دسته‌بندی‌ها
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            سازماندهی دسته‌بندی‌های فروشگاه موبایل و لوازم جانبی
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus size={18} />
          افزودن دسته‌بندی
        </button>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow border-r-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">کل دسته‌بندی‌ها</p>
              <p className="text-2xl font-bold text-gray-800">
                {categories.length}
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiPlus className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow border-r-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">دسته‌بندی‌های فعال</p>
              <p className="text-2xl font-bold text-gray-800">
                {categories.filter((cat) => cat.isActive).length}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <FiPlus className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* جدول دسته‌بندی‌ها */}
      <CategoriesTable
        categories={categories}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
        onToggleStatus={handleToggleStatus}
        loading={loading}
      />

      {/* مودال افزودن/ویرایش */}
      {isModalOpen && (
        <CategoryModal
          category={selectedCategory}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCategory(null);
          }}
          onSubmit={selectedCategory ? handleEditCategory : handleAddCategory}
          loading={loading}
        />
      )}

      {/* مودال حذف */}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedCategory(null);
          }}
          onConfirm={handleDeleteCategory}
          title="حذف دسته‌بندی"
          message={`آیا از حذف دسته‌بندی "${selectedCategory?.title}" اطمینان دارید؟`}
          loading={loading}
        />
      )}
    </div>
  );
}
