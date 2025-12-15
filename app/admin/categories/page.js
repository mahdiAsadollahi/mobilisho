"use client";
import { useState, useEffect } from "react";
import CategoriesTable from "@/app/components/CategoriesTable/CategoriesTable";
import CategoryModal from "@/app/components/CategoryModal/CategoryModal";
import DeleteModal from "@/app/components/DeleteModal/DeleteModal";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // دریافت دسته‌بندی‌ها از API
  const fetchCategories = async () => {
    try {
      setInitialLoading(true);
      const response = await fetch("/api/categories");

      if (!response.ok) {
        throw new Error("خطا در دریافت دسته‌بندی‌ها");
      }

      const result = await response.json();
      setCategories(result.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("خطا در دریافت دسته‌بندی‌ها");
    } finally {
      setInitialLoading(false);
    }
  };

  // دریافت اولیه دسته‌بندی‌ها
  useEffect(() => {
    fetchCategories();
  }, []);

  // عملیات افزودن دسته‌بندی
  const handleAddCategory = async (categoryData) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", categoryData.title);
      formData.append("icon", categoryData.icon);

      if (categoryData.image && typeof categoryData.image !== "string") {
        formData.append("img", categoryData.image);
      }

      const response = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "خطا در افزودن دسته‌بندی");
      }

      toast.success("دسته‌بندی با موفقیت افزوده شد");
      await fetchCategories(); // دریافت مجدد لیست
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(error.message || "خطا در افزودن دسته‌بندی");
    } finally {
      setLoading(false);
    }
  };

  // عملیات ویرایش دسته‌بندی
  const handleEditCategory = async (categoryData) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("id", selectedCategory._id);
      formData.append("title", categoryData.title);
      formData.append("icon", categoryData.icon);

      // اگر عکس جدید انتخاب شده
      if (categoryData.image && typeof categoryData.image !== "string") {
        formData.append("img", categoryData.image);
      }

      const response = await fetch("/api/categories", {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "خطا در ویرایش دسته‌بندی");
      }

      toast.success("دسته‌بندی با موفقیت ویرایش شد");
      await fetchCategories(); // دریافت مجدد لیست
      setIsModalOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error editing category:", error);
      toast.error(error.message || "خطا در ویرایش دسته‌بندی");
    } finally {
      setLoading(false);
    }
  };

  // عملیات حذف دسته‌بندی
  const handleDeleteCategory = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/categories?id=${selectedCategory._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "خطا در حذف دسته‌بندی");
      }

      toast.success("دسته‌بندی با موفقیت حذف شد");
      await fetchCategories(); // دریافت مجدد لیست
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(error.message || "خطا در حذف دسته‌بندی");
    } finally {
      setLoading(false);
    }
  };

  // عملیات تغییر وضعیت فعال/غیرفعال
  const handleToggleStatus = async (categoryId) => {
    try {
      const category = categories.find((cat) => cat._id === categoryId);
      if (!category) return;

      const response = await fetch("/api/categories", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: categoryId,
          isActive: !category.isActive,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "خطا در تغییر وضعیت");
      }

      toast.success(`دسته‌بندی ${!category.isActive ? "فعال" : "غیرفعال"} شد`);
      await fetchCategories(); // دریافت مجدد لیست
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error(error.message || "خطا در تغییر وضعیت");
    }
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

  // محاسبه آمار
  const activeCategoriesCount = categories.filter((cat) => cat.isActive).length;

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال دریافت دسته‌بندی‌ها...</p>
        </div>
      </div>
    );
  }

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
                {activeCategoriesCount}
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
      {isDeleteModalOpen && selectedCategory && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedCategory(null);
          }}
          onConfirm={handleDeleteCategory}
          title="حذف دسته‌بندی"
          message={`آیا از حذف دسته‌بندی "${selectedCategory.title}" اطمینان دارید؟`}
          loading={loading}
        />
      )}
    </div>
  );
}
