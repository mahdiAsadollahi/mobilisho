// app/admin/products/page.js
"use client";
import { useState, useEffect } from "react";
import ProductsTable from "@/app/components/ProductsTable/ProductsTable";
import ProductModal from "@/app/components/ProductModal/ProductModal";
import SearchAndFilters from "@/app/components/SearchAndFilters/SearchAndFilters";
import DeleteModal from "@/app/components/DeleteModal/DeleteModal";
import { FiPlus, FiPackage } from "react-icons/fi";

// داده‌های نمونه محصولات
const initialProducts = [
  {
    id: 1,
    title: "گوشی سامسونگ گلکسی S24",
    price: 25000000,
    stock: 15,
    category: "گوشی موبایل",
    images: ["/images/s24.jpg"],
    description: "<p>گوشی هوشمند سامسونگ با جدیدترین پردازنده</p>",
    specifications: [
      { name: "باتری", value: "5000mAh" },
      { name: "حافظه", value: "256GB" },
      { name: "RAM", value: "8GB" },
      { name: "رنگ", value: "مشکی" },
    ],
    variants: [
      {
        attribute: "رنگ",
        value: "مشکی",
        price: 23000000,
        stock: 8,
        sku: "SM-S24-BLK",
      },
      {
        attribute: "رنگ",
        value: "نقره‌ای",
        price: 23500000,
        stock: 7,
        sku: "SM-S24-SLV",
      },
    ],
    isActive: true,
    createdAt: "2024-01-15",
    sku: "SM-S24-256",
  },
  {
    id: 2,
    title: "هدفون بی‌سیم سونی",
    price: 4500000,
    stock: 25,
    category: "لوازم جانبی",
    images: ["/images/sony-headphone.jpg"],
    description: "<p>هدفون بی‌سیم با کیفیت صدای عالی</p>",
    specifications: [
      { name: "باتری", value: "30h" },
      { name: "اتصال", value: "Bluetooth 5.2" },
      { name: "رنگ", value: "مشکی" },
    ],
    variants: [],
    isActive: true,
    createdAt: "2024-01-10",
    sku: "SNY-WH-1000",
  },
  {
    id: 3,
    title: "کتاب آموزش React",
    price: 150000,
    stock: 0,
    category: "مقالات آموزشی",
    images: ["/images/react-book.jpg"],
    description: "<p>کاملترین منبع آموزش React.js</p>",
    specifications: [
      { name: "صفحات", value: "350" },
      { name: "زبان", value: "فارسی" },
      { name: "فرمت", value: "PDF" },
    ],
    variants: [],
    isActive: false,
    createdAt: "2024-01-05",
    sku: "BOOK-REACT-01",
  },
];

// دسته‌بندی‌های موجود
const categories = [
  "گوشی موبایل",
  "لوازم جانبی",
  "مقالات آموزشی",
  "اخبار تکنولوژی",
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [stockStatus, setStockStatus] = useState("همه");

  // فیلتر کردن محصولات
  useEffect(() => {
    let filtered = products;

    // فیلتر بر اساس جستجو
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // فیلتر بر اساس دسته‌بندی
    if (selectedCategory !== "همه") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // فیلتر بر اساس وضعیت موجودی
    if (stockStatus === "available") {
      filtered = filtered.filter((product) => product.stock > 0);
    } else if (stockStatus === "outofstock") {
      filtered = filtered.filter((product) => product.stock === 0);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, stockStatus]);

  // عملیات افزودن محصول
  const handleAddProduct = (productData) => {
    setLoading(true);
    setTimeout(() => {
      const newProduct = {
        id: Math.max(...products.map((p) => p.id)) + 1,
        ...productData,
        sku: `SKU-${Date.now()}`,
        createdAt: new Date().toISOString().split("T")[0],
        isActive: true,
      };
      setProducts((prev) => [newProduct, ...prev]);
      setLoading(false);
      setIsModalOpen(false);
    }, 1000);
  };

  // عملیات ویرایش محصول
  const handleEditProduct = (productData) => {
    setLoading(true);
    setTimeout(() => {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, ...productData }
            : product
        )
      );
      setLoading(false);
      setIsModalOpen(false);
      setSelectedProduct(null);
    }, 1000);
  };

  // عملیات حذف محصول
  const handleDeleteProduct = () => {
    setLoading(true);
    setTimeout(() => {
      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
      setLoading(false);
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    }, 1000);
  };

  // عملیات تغییر وضعیت
  const handleToggleStatus = (productId, field) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, [field]: !product[field] }
          : product
      )
    );
  };

  const openAddModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  // آمار کلی
  const stats = {
    total: products.length,
    active: products.filter((p) => p.isActive).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
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

        <button
          onClick={openAddModal}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus size={18} />
          افزودن محصول
        </button>
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
          message={`آیا از حذف محصول "${selectedProduct?.title}" اطمینان دارید؟`}
          loading={loading}
        />
      )}
    </div>
  );
}
