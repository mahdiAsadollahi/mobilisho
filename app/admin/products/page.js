"use client";
import { useState, useEffect } from "react";
import ProductsTable from "@/app/components/ProductsTable/ProductsTable";
import ProductModal from "@/app/components/ProductModal/ProductModal";
import SearchAndFilters from "@/app/components/SearchAndFilters/SearchAndFilters";
import DeleteModal from "@/app/components/DeleteModal/DeleteModal";
import { FiPlus, FiPackage, FiRefreshCw } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stockStatus, setStockStatus] = useState("all");
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    outOfStock: 0,
  });

  // تابع fetch برای دریافت محصولات
  const fetchProducts = async () => {
    try {
      setLoading(true);

      // ساخت query parameters
      const params = new URLSearchParams();
      if (selectedCategory !== "all" && selectedCategory) {
        params.append("categoryId", selectedCategory);
      }
      if (searchTerm) {
        params.append("search", searchTerm);
      }
      if (stockStatus === "available") {
        params.append("hasStock", "true");
      } else if (stockStatus === "outofstock") {
        params.append("hasStock", "false");
      }

      const url = `/api/products?${params}`;
      console.log("Fetching products from:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`خطا در دریافت محصولات: ${response.status}`);
      }

      const data = await response.json();
      console.log("Products fetched:", data.data?.length || 0, "items");

      if (data.success) {
        const productsData = data.data || [];
        setProducts(productsData);
        setFilteredProducts(productsData);

        // محاسبه آمار
        const activeCount = productsData.filter((p) => p.isActive).length;
        const outOfStockCount = productsData.filter(
          (p) => p.stock === 0
        ).length;

        setStats({
          total: productsData.length,
          active: activeCount,
          outOfStock: outOfStockCount,
        });
      } else {
        toast.error(data.message || "خطا در دریافت محصولات");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("خطا در دریافت محصولات");
    } finally {
      setLoading(false);
    }
  };

  // تابع fetch برای دریافت دسته‌بندی‌ها
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const data = await response.json();
        console.log("Categories fetched:", data.data?.length || 0, "items");
        setCategories(data.data || []);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // بارگذاری اولیه
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // فیلتر کردن محصولات
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, stockStatus, searchTerm]);

  // تابع کمکی برای تبدیل آرایه به فرمت FormData
  const appendArrayToFormData = (formData, array, baseKey) => {
    if (!array || !Array.isArray(array)) return;

    array.forEach((item, index) => {
      Object.keys(item).forEach((key) => {
        if (item[key] !== undefined && item[key] !== null) {
          formData.append(`${baseKey}[${index}][${key}]`, item[key].toString());
        }
      });
    });
  };

  // تابع اضافه کردن محصول
  const handleAddProduct = async (productData) => {
    try {
      setLoading(true);

      console.log("Adding Product Data:", productData);

      // ساخت FormData
      const formData = new FormData();

      // 1. اطلاعات اصلی
      formData.append("name", productData.name);
      formData.append("description", productData.description || "");
      formData.append("price", productData.price.toString());
      formData.append("stock", productData.stock.toString());
      formData.append("categoryId", productData.categoryId);
      formData.append("isActive", "true");

      // 2. مشخصات فنی
      if (productData.specifications && productData.specifications.length > 0) {
        formData.append(
          "specifications",
          JSON.stringify(productData.specifications)
        );
        // همچنین به صورت آرایه نیز اضافه کن
        appendArrayToFormData(
          formData,
          productData.specifications,
          "specifications"
        );
      } else {
        formData.append("specifications", JSON.stringify([]));
      }

      // 3. تنوع‌ها
      if (productData.variations && productData.variations.length > 0) {
        formData.append("variations", JSON.stringify(productData.variations));
        // همچنین به صورت آرایه نیز اضافه کن
        appendArrayToFormData(formData, productData.variations, "variations");
      } else {
        formData.append("variations", JSON.stringify([]));
      }

      // 4. عکس‌ها
      if (productData.images && productData.images.length > 0) {
        // فیلتر کردن فقط فایل‌های جدید
        const newImages = productData.images.filter(
          (img) => img instanceof File
        );
        console.log("New images to upload:", newImages.length);

        newImages.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      } else {
        console.log("No images to upload");
      }

      // دیباگ
      console.log("Add FormData contents:");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(key, "File:", value.name, "Size:", value.size);
        } else {
          console.log(key, "Value:", value);
        }
      }

      // ارسال درخواست
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Add product response:", result);

      if (!response.ok) {
        throw new Error(
          result.message || `خطا در ایجاد محصول: ${response.status}`
        );
      }

      if (result.success) {
        toast.success("محصول با موفقیت ایجاد شد");
        setIsModalOpen(false);
        await fetchProducts();
        return result.data;
      } else {
        throw new Error(result.message || "خطا در ایجاد محصول");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.message || "خطا در ایجاد محصول");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // تابع ویرایش محصول
  const handleEditProduct = async (productData) => {
    try {
      setLoading(true);

      if (!selectedProduct?._id) {
        throw new Error("شناسه محصول الزامی است");
      }

      console.log("Editing Product ID:", selectedProduct._id);
      console.log("Edit Product Data:", productData);

      const formData = new FormData();

      // 1. اطلاعات اصلی
      formData.append("name", productData.name);
      formData.append("description", productData.description || "");
      formData.append("price", productData.price.toString());
      formData.append("stock", productData.stock.toString());
      formData.append("categoryId", productData.categoryId);
      formData.append("isActive", "true");

      // 2. مشخصات فنی
      if (productData.specifications && productData.specifications.length > 0) {
        formData.append(
          "specifications",
          JSON.stringify(productData.specifications)
        );
      } else {
        formData.append("specifications", JSON.stringify([]));
      }

      // 3. تنوع‌ها
      if (productData.variations && productData.variations.length > 0) {
        formData.append("variations", JSON.stringify(productData.variations));
      } else {
        formData.append("variations", JSON.stringify([]));
      }

      // 4. عکس‌ها - مهم: تفکیک عکس‌های قدیمی و جدید
      const existingImages = selectedProduct.images || [];
      const newImages = productData.images.filter((img) => img instanceof File);
      const oldImageUrls = productData.images.filter(
        (img) => typeof img === "string"
      );

      console.log("Image handling:", {
        existingImages: existingImages.length,
        newImages: newImages.length,
        oldImageUrls: oldImageUrls.length,
      });

      // عکس‌های قدیمی که باید نگه داشته شوند
      formData.append("keepImages", oldImageUrls.join(","));

      // عکس‌های جدید
      newImages.forEach((image, index) => {
        formData.append(`newImages[${index}]`, image);
      });

      // دیباگ
      console.log("Edit FormData contents:");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(key, "File:", value.name, "Size:", value.size);
        } else {
          console.log(key, "Value:", value);
        }
      }

      const response = await fetch(`/api/products/${selectedProduct._id}`, {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();
      console.log("Edit product response:", result);

      if (!response.ok) {
        throw new Error(
          result.message || `خطا در ویرایش محصول: ${response.status}`
        );
      }

      if (result.success) {
        toast.success("محصول با موفقیت ویرایش شد");
        setIsModalOpen(false);
        setSelectedProduct(null);
        await fetchProducts();
        return result.data;
      } else {
        throw new Error(result.message || "خطا در ویرایش محصول");
      }
    } catch (error) {
      console.error("Error editing product:", error);
      toast.error(error.message || "خطا در ویرایش محصول");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // تابع حذف محصول
  const handleDeleteProduct = async () => {
    try {
      setLoading(true);

      if (!selectedProduct?._id) {
        throw new Error("شناسه محصول الزامی است");
      }

      console.log("Deleting product ID:", selectedProduct._id);

      const response = await fetch(`/api/products/${selectedProduct._id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      console.log("Delete response:", result);

      if (!response.ok) {
        throw new Error(
          result.message || `خطا در حذف محصول: ${response.status}`
        );
      }

      if (result.success) {
        toast.success("محصول با موفقیت حذف شد");
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
        await fetchProducts();
      } else {
        throw new Error(result.message || "خطا در حذف محصول");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(error.message || "خطا در حذف محصول");
    } finally {
      setLoading(false);
    }
  };

  // تابع تغییر وضعیت فعال/غیرفعال
  const handleToggleStatus = async (productId, field) => {
    try {
      console.log("Toggling status for product ID:", productId);

      const product = products.find((p) => p._id === productId);
      if (!product) {
        toast.error("محصول یافت نشد");
        return;
      }

      const newStatus = !product[field];
      console.log("New status:", newStatus);

      const response = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: newStatus }),
      });

      const result = await response.json();
      console.log("Toggle response:", result);

      if (!response.ok) {
        throw new Error(
          result.message || `خطا در تغییر وضعیت: ${response.status}`
        );
      }

      if (result.success) {
        // آپدیت local state
        setProducts((prev) =>
          prev.map((product) =>
            product._id === productId
              ? { ...product, [field]: newStatus }
              : product
          )
        );
        setFilteredProducts((prev) =>
          prev.map((product) =>
            product._id === productId
              ? { ...product, [field]: newStatus }
              : product
          )
        );

        toast.success(`محصول ${newStatus ? "فعال" : "غیرفعال"} شد`);
      } else {
        throw new Error(result.message || "خطا در تغییر وضعیت محصول");
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error(error.message || "خطا در تغییر وضعیت محصول");
    }
  };

  // رفرش دستی
  const handleRefresh = () => {
    fetchProducts();
    fetchCategories();
    toast.success("لیست محصولات بروزرسانی شد");
  };

  const openAddModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = async (product) => {
    try {
      console.log("Opening edit modal for product ID:", product._id);

      setLoading(true);
      const response = await fetch(`/api/products/${product._id}`);

      console.log("Fetch product details response status:", response.status);

      if (!response.ok) {
        throw new Error(`خطا در دریافت اطلاعات محصول: ${response.status}`);
      }

      const result = await response.json();
      console.log("Product details response:", result);

      if (result.success && result.data) {
        console.log("Product details fetched successfully:", {
          hasSpecifications: !!result.data.specifications,
          hasVariations: !!result.data.variations,
          specificationsCount: result.data.specifications?.length || 0,
          variationsCount: result.data.variations?.length || 0,
        });

        setSelectedProduct(result.data);
        setIsModalOpen(true);
      } else {
        throw new Error(result.message || "خطا در دریافت اطلاعات محصول");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("خطا در دریافت اطلاعات محصول");

      // اگر خطا خورد، حداقل اطلاعات موجود رو نشون بده
      console.log("Using existing product data as fallback");
      setSelectedProduct(product);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (product) => {
    console.log("Opening delete modal for product:", product.name);
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-4 md:p-6">
      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            مدیریت محصولات
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            مدیریت و سازماندهی محصولات فروشگاه
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={loading}
          >
            <FiRefreshCw size={18} className={loading ? "animate-spin" : ""} />
            بروزرسانی
          </button>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus size={18} />
            افزودن محصول
          </button>
        </div>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow border-r-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">کل محصولات</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiPackage className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow border-r-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">فعال</p>
              <p className="text-2xl font-bold text-gray-800">{stats.active}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <FiPackage className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow border-r-4 border-red-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">ناموجود</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.outOfStock}
              </p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <FiPackage className="text-red-600" />
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
        stockStatus={stockStatus}
        onStockStatusChange={setStockStatus}
        categories={categories}
      />

      {/* جدول محصولات */}
      <ProductsTable
        products={filteredProducts}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
        onToggleStatus={handleToggleStatus}
        loading={loading}
      />

      {/* مودال افزودن/ویرایش */}
      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          categories={categories}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
          loading={loading}
        />
      )}

      {/* مودال حذف */}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedProduct(null);
          }}
          onConfirm={handleDeleteProduct}
          title="حذف محصول"
          message={`آیا از حذف محصول "${selectedProduct?.name}" اطمینان دارید؟`}
          loading={loading}
        />
      )}
    </div>
  );
}
